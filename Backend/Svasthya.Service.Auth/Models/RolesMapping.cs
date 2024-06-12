using System.ComponentModel.DataAnnotations;

namespace Svasthya.Service.Auth.Models
{
    public class RolesMapping
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int RoleId { get; set; }
        [Required]
        public int AppUserId { get; set; }
    }
}
