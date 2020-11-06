﻿using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetAPI.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Reflection;
using System.Text.RegularExpressions;

namespace FleetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class ReactAdminController<T> : ControllerBase, IReactAdminController<T> where T : class, new()
    {
        private readonly AppDbContext _context;
        protected DbSet<T> _table;

        public ReactAdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<T>> Delete(int id)
        {
            var entity = await _table.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            _table.Remove(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<T>>> Get(string filter = "", string range = "", string sort = "")
        {
            var entityQuery = _table.AsQueryable();
            #region FILTERING DISABLED
            //if (!string.IsNullOrEmpty(filter))
            //{

            //    var filterVal = (JObject)JsonConvert.DeserializeObject(filter);
            //    var t = new T();
            //    foreach (var f in filterVal)
            //    {
            //        string sz = char.ToUpper(f.Key[0]) + f.Key.Substring(1); //
            //        if (t.GetType().GetProperty(sz).PropertyType == typeof(string) || t.GetType().GetProperty(sz).PropertyType == typeof(System.Int32))
            //        {

            //            Type myType = typeof(Int32);
            //            PropertyInfo myPropInfo = myType.GetProperty($"{f.Key}");
            //            if (sz == "Id")
            //            {
            //                string fval = f.Value.ToString();
            //                string newString = Regex.Replace(fval, "[^.0-9]", "");
            //                string fkey = f.Key.ToString();
            //                entityQuery = entityQuery.Where($"{fkey}.Contains(@0)", newString);
            //            }
            //            else
            //            {

            //                entityQuery = entityQuery.Where($"{f.Key}.Contains(@0)", f.Value.ToString());
            //            }



            //            //entityQuery = entityQuery.Where(e => e.myPro );

            //        }
            //        else
            //        {
            //            entityQuery = entityQuery.Where($"{f.Key} == @0", f.Value.ToString());
            //        }
            //    }
            //}

            #endregion
            var count = entityQuery.Count();

            if (!string.IsNullOrEmpty(sort))
            {
                var sortVal = JsonConvert.DeserializeObject<List<string>>(sort);
                var condition = sortVal.First();
                var order = sortVal.Last() == "ASC" ? "" : "descending";
                entityQuery = entityQuery.OrderBy($"{condition} {order}");
            }

            var from = 0;
            var to = 0;
            if (!string.IsNullOrEmpty(range))
            {
                var rangeVal = JsonConvert.DeserializeObject<List<int>>(range);
                from = rangeVal.First();
                to = rangeVal.Last();
                entityQuery = entityQuery.Skip(from).Take(to - from + 1);
            }

            Response.Headers.Add("Access-Control-Expose-Headers", "Content-Range");
            Response.Headers.Add("Content-Range", $"{typeof(T).Name.ToLower()} {from}-{to}/{count}");
            return await entityQuery.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<T>> Get(int id)
        {
            var entity = await _table.FindAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return entity;
        }

        [HttpPost]
        public async Task<ActionResult<T>> Post(T entity)
        {
            _table.Add(entity);
            await _context.SaveChangesAsync();
            var id = (int)typeof(T).GetProperty("Id").GetValue(entity);
            return Ok(await _table.FindAsync(id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, T entity)
        {
            var entityId = (int)typeof(T).GetProperty("Id").GetValue(entity);
            if (id != entityId)
            {
                return BadRequest();
            }

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(await _table.FindAsync(entityId));
        }

        private bool EntityExists(int id)
        {
            return _table.Any(e => (int)typeof(T).GetProperty("Id").GetValue(e) == id);
        }

    }
}