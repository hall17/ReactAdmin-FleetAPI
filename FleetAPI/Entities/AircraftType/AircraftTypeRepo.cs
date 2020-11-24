using FleetAPI.DataAccess;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FleetAPI.Entities
{
    public class AircraftTypeRepo  : IAircraftTypeRepo
    {
        private readonly AppDbContext _context;
        public AircraftTypeRepo(AppDbContext context)
        {
            _context = context;
        }
        public async Task<AircraftType> GetAircraftType(int id)
        {
            return await _context.AircraftTypes.FindAsync(id);
        }
        public IQueryable<AircraftType> GetAircraftTypes()
        {
            return _context.AircraftTypes.AsQueryable();
        }
        public async Task<AircraftType> AddAircraftType(AircraftType actype)
        {
            _context.AircraftTypes.Add(actype);
            await _context.SaveChangesAsync();
            return actype;
        }
        public async Task<AircraftType> UpdateAircraftType(AircraftType actype)
        {
            _context.Entry(actype).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return actype;
        }
        public async Task<AircraftType> DeleteAircraftType(int id)
        {
            var actype = await _context.AircraftTypes.FindAsync(id);
            _context.AircraftTypes.Remove(actype);
            await _context.SaveChangesAsync();
            return actype;
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() > 0);
        }

        //public bool AircraftTypeExists(int id)
        //{
        //    return _context.AircraftTypes.Any(e => e.Id == id);
        //}



    }
}
