using System.ComponentModel.DataAnnotations;

namespace FleetAPI.Entities
{
    public class AircraftType
    {
        [Key]
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string ModelType { get; set; }
        public string Engine { get; set; }
    }
}
