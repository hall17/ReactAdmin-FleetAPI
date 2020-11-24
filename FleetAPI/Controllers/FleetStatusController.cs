using FleetAPI.Entities;
using FleetAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
namespace FleetAPI.Controllers
{
    [Route("api/[controller]")]
    //[Route("/")]
    [ApiController]
    public class FleetStatusController : ControllerBase
    {
        private readonly IAircraftRepo _acrepository;
        private readonly IAircraftTypeRepo _typerepository;

        public FleetStatusController(IAircraftRepo acrepository,IAircraftTypeRepo typerepository)
        {
            _acrepository = acrepository;
            _typerepository = typerepository;
        }

        [HttpGet]
        public IEnumerable<FleetStatusdto> GetStatus()
        {
            List<FleetStatusdto> models = new List<FleetStatusdto>();
            _typerepository.GetAircraftTypes().ToList().ForEach(type =>
            {
                FleetStatusdto dto = new FleetStatusdto(type);
                models.Add(dto);
            });
            models.ForEach(model =>
            {
               model.Quantity = _acrepository.GetAircrafts().Where(ac => ac.ModelType == model.ModelType).Count();
            });
            var count = _acrepository.GetAircrafts().Count();
            var range = JsonConvert.DeserializeObject<List<string>>((HttpContext.Request.Query["range"]));
            var from = Convert.ToInt32(range.First());
            var to = Convert.ToInt32(range.Last());
            Response.Headers.Add("Access-Control-Expose-Headers", "Content-Range");
            Response.Headers.Add("Content-Range", $"{typeof(Aircraft).Name.ToLower()} {from}-{to}/{count}");
            return models;
            //return new ReactAdminResult()
            //{
            //    items = models,
            //    totalCount = count
            //};
            

        }
    }
}
