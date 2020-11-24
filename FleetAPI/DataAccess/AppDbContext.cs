using FleetAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace FleetAPI.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }
        // Super class constructor call. : base()

        public DbSet<Aircraft> Aircrafts { get; set; }
        public DbSet<AircraftType> AircraftTypes { get; set; }

        // overriding data
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Aircraft>().HasData(new Aircraft { Registration = "TC-JJE", Effectivity = "001", Model = "B777", ModelType = "B777-300ER", Engine = "GE90-115BL", BodyNo = "WE126", LineNo = "895", SerialNo = "40707", DeliveryDate = "2010" });

        //    base.OnModelCreating(modelBuilder);
        //}

    }
}
