using Microsoft.EntityFrameworkCore;
using Svasthya.Service.Auth.Models;
using System.Reflection.Emit;

namespace Svasthya.Service.Auth.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :base(options)
        {
            
        }

        DbSet<AppUsers> AppUsers { get; set; }
        DbSet<Roles> Roles { get; set; }
        DbSet<RolesMapping> RolesMappings { get; set; }
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);
            modelbuilder.Entity<Roles>().HasData(
                new Roles { Id = 1, Role="Admin" },
                new Roles { Id = 2, Role = "Hospital" },
                new Roles { Id = 3, Role = "Doctor" },
                new Roles { Id = 4, Role = "Patient" }
                );

        }

    }
}
