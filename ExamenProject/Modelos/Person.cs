using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Modelos
{
    public class Person
    {
       

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "The Name shouldn't have more than 50 characters.")]
        public string Name { get; set; }

        [Required]
        public DateTime birthDate { get; set; }

        [Required]
        [MaxLength(25, ErrorMessage = "The Phone Number shouldn't have more than 25 characters.")]
        public string phoneNumber { get; set; }

        public Person(string name, DateTime BirthDate, string PhoneNumber)
        {
            Name = name;
            birthDate = BirthDate;
            phoneNumber = PhoneNumber;
        }

        public Person()
        {

        }
    }
}
