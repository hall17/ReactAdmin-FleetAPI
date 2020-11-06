using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetAPI.Models;

namespace FleetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AircraftTypesController : ReactAdminController<AircraftType>
    {
        public AircraftTypesController(AppDbContext context) : base(context)
        {
            _table = context.AircraftTypes;
        }
    }
}
