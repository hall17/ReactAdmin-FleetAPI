using System.Linq;
using System.Threading.Tasks;

namespace FleetAPI.Entities
{
    public class AircraftService : IAircraftService
    {
        private readonly IAircraftRepo _repository;

        public AircraftService(IAircraftRepo repository)
        {
            _repository = repository;
        }
        public async Task<Aircraft> GetAircraft(int id)
        {
            return await _repository.GetAircraft(id);
            //return new JsonResult(entity);
        }

        public IQueryable<Aircraft> GetAircrafts()
        {
            return _repository.GetAircrafts();         
        }
        public async Task<Aircraft> AddAircraft(Aircraft ac)
        {
            return await _repository.AddAircraft(ac);
        }
        public async Task<Aircraft> UpdateAircraft(Aircraft ac)
        {            
            return await _repository.UpdateAircraft(ac);
        }
        public async Task<Aircraft> DeleteAircraft(int id)
        {
            return await _repository.DeleteAircraft(id);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _repository.SaveChangesAsync();
        }
    }
}
