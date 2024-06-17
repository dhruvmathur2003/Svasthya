using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Svasthya.Service.Auth.Dtos;
using Svasthya.Service.Auth.Models;
using Svasthya.Service.Auth.Repository.IRepository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Svasthya.Service.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            var userExisted = await _authRepository.GetAsync(registerModel.Email);
            if (!userExisted)
            {
                var appUsers = new AppUsers
                {
                    name = registerModel.Name,
                    email = registerModel.Email,
                    password = HashPassword(registerModel.Password)
                };

                var registeredUser = await _authRepository.AddAsync(appUsers);
                var rolesMapping = new RolesMapping
                {
                    roleid = await _authRepository.GetIdByRoleAsync(registerModel.Role),
                    appuserid = registeredUser.id
                };

                await _authRepository.AddRolesAsync(rolesMapping);
                return Ok();
            }
            else
            {
                return StatusCode(409, "User already exists.");
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            var userExist = await _authRepository.CheckLoginAsync(loginModel.Email, HashPassword(loginModel.Password));

            if (userExist)
            {
                var user = await _authRepository.GetByEmailAsync(loginModel.Email);
                var RoleId = await _authRepository.GetRoleByIdAsync(user.id);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.email),
                    new Claim(ClaimTypes.Name, user.name),
                    new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
                    new Claim(ClaimTypes.Role, RoleId.ToString())
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var jwtToken = GetToken(authClaims);

                // Return the token
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    expiration = jwtToken.ValidTo
                });
            }
            return Unauthorized();
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                expires: DateTime.Now.AddHours(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return token;
        }
    }
}
