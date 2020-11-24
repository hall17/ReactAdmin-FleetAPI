using System;
using FleetAPI.DataAccess;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace FleetAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
                //.Run();
                using (var serviceScope = host.Services.CreateScope())
                {
                try
                {
                    var context = serviceScope.ServiceProvider.GetService<AppDbContext>();
                    // context.Database.EnsureDeleted(); delete the database each time application runs.
                    context.Database.Migrate();
                    DbInitializer.Initialize(context);

                }
                catch (Exception ex)
                {
                    // if it goes wrong, we can see where it went wrong.
                    var logger = serviceScope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while migration was in progress.");
                }
                }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
