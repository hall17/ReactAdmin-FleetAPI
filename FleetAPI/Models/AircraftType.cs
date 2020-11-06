using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FleetAPI.Models
{
    public class AircraftType
    {
        [Key]
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        [Display(Name = "Model Type")]
        public string ModelType { get; set; }
        public string Engine { get; set; }
    }
}
