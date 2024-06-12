using Npgsql;
using Dapper;
using Svasthya.Service.Auth.Models;
using Svasthya.Service.Auth.Repository.IRepository;
using System.Data;
using System.Threading.Tasks;

namespace Svasthya.Service.Auth.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IDbConnection db;

        public AuthRepository(IConfiguration configuration)
        {
            this.db = new NpgsqlConnection(configuration.GetConnectionString("DefaultConnection"));
        }

        public async Task<AppUsers> AddAsync(AppUsers entity)
        {
            var sql = "INSERT INTO appusers (name, email, password) VALUES (@name, @Email, @Password) RETURNING id;";
            entity.id = await db.ExecuteScalarAsync<int>(sql, entity);
            return entity;
        }

        public async Task<bool> GetAsync(string email)
        {
            var sql = "SELECT COUNT(1) FROM appusers WHERE email = @Email";
            return await db.ExecuteScalarAsync<bool>(sql, new { email });
        }

        public async Task<IEnumerable<AppUsers>> GetAllAsync()
        {
            var sql = "SELECT * FROM appusers";
            return await db.QueryAsync<AppUsers>(sql);
        }

        public async Task<bool> CheckLoginAsync(string email, string password)
        {
            var sql = "SELECT COUNT(1) FROM appusers WHERE email = @Email AND password = @Password";
            return await db.ExecuteScalarAsync<bool>(sql, new { email, password });
        }

        public async Task RemoveAsync(int id)
        {
            var sql = "DELETE FROM appusers WHERE id = @Id";
            await db.ExecuteAsync(sql, new { id });
        }

        public async Task<AppUsers> UpdateAsync(AppUsers entity)
        {
            var sql = "UPDATE appusers SET name = @Name, email = @Email, password = @Password WHERE id = @Id";
            await db.ExecuteAsync(sql, entity);
            return entity;
        }

        public async Task<AppUsers> GetByEmailAsync(string email)
        {
            var sql = "SELECT * FROM appusers WHERE email = @Email";
            return await db.QuerySingleOrDefaultAsync<AppUsers>(sql, new { email });
        }

        public async Task<RolesMapping> AddRolesAsync(RolesMapping entity)
        {
            var sql = "INSERT INTO rolesmappings (roleid, appuserid) VALUES (@RoleId, @AppUserId)";
            await db.ExecuteAsync(sql, entity);
            return entity;
        }

        public async Task<int> GetIdByRoleAsync(string role)
        {
            var sql = "SELECT id FROM roles WHERE role = @Role";
            return await db.QuerySingleOrDefaultAsync<int>(sql, new { role });
        }

        public async Task<int> GetIdByEmailAsync(string email)
        {
            var sql = "SELECT id FROM appusers WHERE email = @Email";
            return await db.QuerySingleOrDefaultAsync<int>(sql, new { email });
        }
    }
}
