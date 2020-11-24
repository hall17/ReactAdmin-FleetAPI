using FleetAPI.Entities;

namespace FleetAPI.Models
{
    public class FleetStatusdto
    {
        public FleetStatusdto(AircraftType t)
        {
            Id = ModelType;
            Model = t.Model;
            ModelType = t.ModelType;
            Quantity = 0;
        }
        public string Id { get; set; }
        public  string Model { get; set; }
        public  string ModelType { get; set; }
        public int Quantity { get; set; }
    }
}
