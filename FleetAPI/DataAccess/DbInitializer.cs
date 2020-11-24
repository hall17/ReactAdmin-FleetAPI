using FleetAPI.Entities;
using System.Collections.Generic;
using System.Linq;


namespace FleetAPI.DataAccess
{
    public class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            //if (context.Aircrafts.Any())
            //{
            //    return;
            //}

            var Aircrafts = new List<Aircraft>
            {
            new Aircraft { Id=111, Registration = "TC-JJE", Effectivity ="001", Model="B777",       ModelType ="B777-300ER", Engine="GE90-115BL", BodyNo="WE126", LineNo="895", SerialNo="40707", DeliveryDate = "2010" },
            new Aircraft { Id=211, Registration = "TC-JNA", Effectivity ="201", Model="A330",       ModelType ="A330-203", Engine="CF6-80E1A3", BodyNo="-", LineNo="-", SerialNo="697", DeliveryDate = "2010" },
            new Aircraft { Id=311, Registration=  "TC-JRA", Effectivity ="303", Model="A320 FAM",   ModelType ="A321", Engine="V2533-A5", BodyNo="-", LineNo="-", SerialNo="2823", DeliveryDate = "2010" },
            new Aircraft { Id=411, Registration = "TC-JYA", Effectivity ="201", Model="B737 NG",    ModelType ="B737-900ER", Engine="CFM56-7B27/F", BodyNo="YH611", LineNo="3669", SerialNo="40973", DeliveryDate = "2010" },
            new Aircraft { Id=511, Registration = "TC-LLA", Effectivity ="001", Model="B787",       ModelType ="B787-9", Engine="GENX-1B74/75", BodyNo="ZE220", LineNo="0865", SerialNo="65801", DeliveryDate = "2010" }            
            };
            
            var AircraftTypes = new List<AircraftType>
           {
            new AircraftType { Id=1, Manufacturer = "AIRBUS", Model="A320 FAM",    ModelType ="A321",        Engine="V2533-A5"},
            new AircraftType { Id=2, Manufacturer = "AIRBUS", Model="A330",        ModelType ="A330-203",    Engine="CF6-80E1A3"},
            new AircraftType { Id=3, Manufacturer = "BOEING", Model="B737 NG",     ModelType ="B737-700",    Engine="CFM56-7B24"},
            new AircraftType { Id=4, Manufacturer = "BOEING", Model="B737 NG",     ModelType ="B737-800",    Engine="CFM56-7B26"},
            new AircraftType { Id=5, Manufacturer = "BOEING", Model="B737 NG",     ModelType ="B737-900ER",  Engine="CFM56-7B27/F"},
            new AircraftType { Id=6, Manufacturer = "BOEING", Model="B777",        ModelType ="B777-300ER",  Engine="GE90-115BL"},
            new AircraftType { Id=7, Manufacturer = "BOEING", Model="B787",        ModelType ="B787-9",      Engine="GENX-1B74/75"}
           };
            //context.AddRange(Aircrafts);
            foreach (var ac in Aircrafts)
            {
                if (!context.Aircrafts.Any(act => act.Id == ac.Id))
                    context.Aircrafts.Add(ac);
            }
            foreach (var actype in AircraftTypes)
            {
                if (!context.AircraftTypes.Any(type => type.Id == actype.Id))
                    context.AircraftTypes.Add(actype);
            }
            context.SaveChanges();
        }
    }
}
