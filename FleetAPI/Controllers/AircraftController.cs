using FleetAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace FleetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AircraftController : ReactAdminController<Aircraft>
    {
        public AircraftController(AppDbContext context) : base(context)
        {
            _table = context.Aircrafts;
        }
    }
}
