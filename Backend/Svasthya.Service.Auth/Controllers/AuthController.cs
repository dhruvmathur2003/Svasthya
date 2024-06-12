using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Svasthya.Service.Auth.Dtos;
namespace Svasthya.Service.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]

        public IActionResult Register(RegisterDto registerDto)
        {
            
            return Ok();
        }
    }
}
