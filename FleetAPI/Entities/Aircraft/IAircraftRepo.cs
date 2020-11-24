using System.Linq;
using System.Threading.Tasks;

namespace FleetAPI.Entities
{
    public interface IAircraftRepo
    {
        //Task<IEnumerable<FleetStatusdto>> GetFleetStatus();
        Task<Aircraft> GetAircraft(int id);
        Task<Aircraft> GetAircraftByRegistration(string reg);

        IQueryable<Aircraft> GetAircrafts();
        Task<Aircraft> AddAircraft(Aircraft ac);
        Task<Aircraft> UpdateAircraft(Aircraft ac);
        Task<Aircraft> DeleteAircraft(int id);
        Task<bool> SaveChangesAsync();

        //  bool AircraftExists(int id);
    }
}
