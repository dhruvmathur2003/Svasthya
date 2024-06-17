using Svasthya.Service.Auth.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Svasthya.Service.Auth.Repository.IRepository
{
    public interface IAuthRepository
    {
        Task<IEnumerable<AppUsers>> GetAllAsync();
        Task<bool> GetAsync(string email);
        Task<AppUsers> GetByEmailAsync(string email);
        Task<bool> CheckLoginAsync(string email, string password);
        Task<AppUsers> AddAsync(AppUsers entity);
        Task RemoveAsync(int id);
        Task<RolesMapping> AddRolesAsync(RolesMapping entity);
        Task<int> GetIdByRoleAsync(string role);
        Task<int> GetRoleByIdAsync(int id);

        Task<int> GetIdByEmailAsync(string email);
        Task<AppUsers> UpdateAsync(AppUsers entity);
    }
}

