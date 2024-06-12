using System.ComponentModel.DataAnnotations;

namespace Svasthya.Service.Auth.Models
{
    public class RolesMapping
    {
        [Key]
        public int id { get; set; }
        [Required]
        public int roleid { get; set; }
        [Required]
        public int appuserid { get; set; }
    }
}
