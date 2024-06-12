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

        DbSet<AppUsers> appusers { get; set; }
        DbSet<Roles> roles { get; set; }
        DbSet<RolesMapping> rolesmappings { get; set; }
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);
            modelbuilder.Entity<Roles>().HasData(
                new Roles { id = 1, role="Admin" },
                new Roles { id = 2, role = "Hospital" },
                new Roles { id = 3, role = "Doctor" },
                new Roles { id = 4, role = "Patient" }
                );

        }

    }
}
