using System.ComponentModel.DataAnnotations;
namespace API.Dtos
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage = "Role name is required")] 
        public string RoleName { get; set; }   = null!;
    }
}