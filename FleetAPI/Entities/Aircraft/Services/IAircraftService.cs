using System.Linq;
using System.Threading.Tasks;

namespace FleetAPI.Entities
{
    public interface IAircraftService
    {
        IQueryable<Aircraft> GetAircrafts();
        Task<Aircraft> GetAircraft(int id);
        Task<Aircraft> GetAircraftByRegistration(string reg);
        Task<Aircraft> AddAircraft(Aircraft ac);
        Task<Aircraft> UpdateAircraft(Aircraft ac);
        Task<Aircraft> DeleteAircraft(int id);
        Task<bool>     SaveChangesAsync();



    }
}
