using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using Newtonsoft.Json.Linq;
using System.Linq.Dynamic.Core;
using FleetAPI.Entities;

namespace FleetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AircraftTypesController : ControllerBase
    {
        private readonly IAircraftTypeService _service;

        public AircraftTypesController(IAircraftTypeService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetAircraftTypes()
        {
            var entityQuery = _service.GetAircraftTypes();

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

            return Ok(await entityQuery.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAircraftType(int id)
        {
            var type = await _service.GetAircraftType(id);
            if (type == null)
            {
                return NotFound();
            }
            return Ok(type);
        }
        [HttpPost]
        public async Task<IActionResult> AddAircraftType(AircraftType model)
        {
            return Ok(await _service.AddAircraftType(model));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, AircraftType model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }
            return Ok(await _service.UpdateAircraftType(model));
            //try
            //{
            //    await _repository.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!_repository.AircraftTypeExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _service.DeleteAircraftType(id));
        }
    }
}
