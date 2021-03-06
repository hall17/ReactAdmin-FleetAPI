﻿using System.Linq;
using System.Threading.Tasks;

namespace FleetAPI.Entities
{
    public interface IAircraftTypeService
    {
        Task<AircraftType> GetAircraftType(int id);
        IQueryable<AircraftType> GetAircraftTypes();
        Task<AircraftType> AddAircraftType(AircraftType ac);
        Task<AircraftType> UpdateAircraftType(AircraftType ac);
        Task<AircraftType> DeleteAircraftType(int id);
        Task<bool> SaveChangesAsync();
    }
}
