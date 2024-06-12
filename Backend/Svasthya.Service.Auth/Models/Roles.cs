using System.ComponentModel.DataAnnotations;

namespace Svasthya.Service.Auth.Models
{
    public class Roles
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Role { get; set; }

    }
}
