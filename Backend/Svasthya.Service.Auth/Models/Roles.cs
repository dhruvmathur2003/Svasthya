﻿using System.ComponentModel.DataAnnotations;

namespace Svasthya.Service.Auth.Models
{
    public class Roles
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string role { get; set; }

    }
}
