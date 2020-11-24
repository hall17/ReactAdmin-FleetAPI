using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FleetAPI.Models
{
    public class ReactAdminResult
    {
        public object items { get; set; }
        public int totalCount { get; set; }
    }
}
