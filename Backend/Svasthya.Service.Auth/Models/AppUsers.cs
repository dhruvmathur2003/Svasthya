using System.ComponentModel.DataAnnotations;

namespace Svasthya.Service.Auth.Models
{
    public class AppUsers
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        
        
    }
}
