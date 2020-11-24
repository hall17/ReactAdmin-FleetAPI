using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FleetAPI.Entities
{
    public class AircraftTypeService : IAircraftTypeService
    {
        private readonly IAircraftTypeRepo _repository;

        public AircraftTypeService(IAircraftTypeRepo repository)
        {
            _repository = repository;
        }
        public async Task<AircraftType> GetAircraftType(int id)
        {
            return await _repository.GetAircraftType(id);
            //return new JsonResult(entity);
        }

        public IQueryable<AircraftType> GetAircraftTypes()
        {
            return _repository.GetAircraftTypes();
        }
        public async Task<AircraftType> AddAircraftType(AircraftType ac)
        {
            return await _repository.AddAircraftType(ac);
        }
        public async Task<AircraftType> UpdateAircraftType(AircraftType ac)
        {
            return await _repository.UpdateAircraftType(ac);
        }
        public async Task<AircraftType> DeleteAircraftType(int id)
        {
            return await _repository.DeleteAircraftType(id);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _repository.SaveChangesAsync();
        }
    }
}
