using System;
using System.ComponentModel.DataAnnotations;
namespace FleetAPI.Models
{
    public class Aircraft
    {
        [Key]
        public int Id { get; set; }
        public string Model { get; set; }
        public string ModelType { get; set; }
        public string Registration { get; set; }
        public string Effectivity { get; set; }
        public string BodyNo { get; set; }
        public string LineNo { get; set; }
        public string SerialNo { get; set; }
        public string Engine { get; set; }
        public string DeliveryDate { get; set; }

    }
}
