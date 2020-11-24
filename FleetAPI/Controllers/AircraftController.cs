using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;
using Newtonsoft.Json;
using System.Linq.Dynamic.Core;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using FleetAPI.Entities;

namespace FleetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AircraftController : ControllerBase
    {
        private readonly IAircraftService _aircraftService;

        public AircraftController(IAircraftService aircraftService)
        {
            _aircraftService = aircraftService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var entityQuery = _aircraftService.GetAircrafts();

            var filter = HttpContext.Request.Query["filter"].ToString();
            if (!string.IsNullOrEmpty(filter) && filter != "{}")
            {
                var filterVals = (JObject)JsonConvert.DeserializeObject(HttpContext.Request.Query["filter"]);
                foreach (var f in filterVals)
                {
                    entityQuery = entityQuery.Where($"{f.Key}.Contains(@0)", f.Value.ToString());
                }
            }
            var count = entityQuery.Count();


            if (!string.IsNullOrEmpty((HttpContext.Request.Query["sort"])))
            {
                var sortVal = JsonConvert.DeserializeObject<List<string>>((HttpContext.Request.Query["sort"]));
                var condition = sortVal.First();
                var order = sortVal.Last() == "ASC" ? "" : "descending";
                entityQuery = entityQuery.OrderBy($"{condition} {order}");
            }

            var range = JsonConvert.DeserializeObject<List<string>>((HttpContext.Request.Query["range"]));
            var from = Convert.ToInt32(range.First());
            var to = Convert.ToInt32(range.Last());
            entityQuery = entityQuery.Skip(from).Take(to - from + 1);


            Response.Headers.Add("Access-Control-Expose-Headers", "Content-Range");
            Response.Headers.Add("Content-Range", $"{typeof(Aircraft).Name.ToLower()} {from}-{to}/{count}");
            //return new JsonResult(entityQuery.ToListAsync());
            return Ok(await entityQuery.ToListAsync());
        }

        [HttpGet("{id}")]
        //[HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var ac = await _aircraftService.GetAircraft(id);
            if (ac == null)
            {
                return NotFound();
            }
            return Ok(ac);
        }
        [HttpGet("{registration}")]
        //[HttpGet("{id:int}")]
        public async Task<IActionResult> GetByRegistration(string reg)
        {
            var ac = await _aircraftService.GetAircraft(id);
            if (ac == null)
            {
                return NotFound();
            }
            return Ok(ac);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Aircraft ac)
        {        
            return Ok(await _aircraftService.AddAircraft(ac));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,Aircraft ac)
        {
            if (id != ac.Id)
            {
                return BadRequest();
            }
            return Ok(await _aircraftService.UpdateAircraft(ac));
            //try
            //{
            //    await _repository.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!_repository.AircraftExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}
            //return Ok(ac);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _aircraftService.DeleteAircraft(id));
        }

    }
}
