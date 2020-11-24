using FleetAPI.DataAccess;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace FleetAPI.Entities
{
    public class AircraftRepo : IAircraftRepo
    {
        private readonly AppDbContext _context;

        public AircraftRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Aircraft> GetAircraft(int id)
        {
            return await _context.Aircrafts.FindAsync(id);
        }
        public IQueryable<Aircraft> GetAircrafts()
        {
            return _context.Aircrafts.AsQueryable();
        }
        public async Task<Aircraft> AddAircraft(Aircraft ac)
        {
            _context.Aircrafts.Add(ac);
            await _context.SaveChangesAsync();
            return ac;
        }
        public async Task<Aircraft> UpdateAircraft(Aircraft ac)
        {
            _context.Entry(ac).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return ac;

        }
        public async Task<Aircraft> DeleteAircraft(int id)
        {
            var ac = await _context.Aircrafts.FindAsync(id);
            _context.Aircrafts.Remove(ac);
            await _context.SaveChangesAsync();
            return ac;
        }

        //public bool AircraftExists(int id)
        //{
        //    return _context.Aircrafts.Any(e => e.Id == id);
        //}

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() > 0);
        }
    }
}
