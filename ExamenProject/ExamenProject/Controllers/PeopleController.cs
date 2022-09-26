using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExamenProject.Data;
using Modelos;
using Microsoft.Data.SqlClient;

namespace ExamenProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly ExamenProjectContext _context;

        public PeopleController(ExamenProjectContext context)
        {
            _context = context;
        }

        // GET: api/People
        [HttpGet]
        public async Task<IActionResult> GetPerson()
        {
            return Ok(await _context.Person.ToListAsync());
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var person = await _context.Person.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        // PUT: api/People/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(int id, Person person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/People
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            _context.Person.Add(person);
            await _context.SaveChangesAsync();

            return Created("api/People/", person);
        }

        // DELETE: api/People/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {

            /*
            var person = await _context.Person.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }
            
            _context.Person.Remove(person);

            await _context.SaveChangesAsync();
            */

            string sql = "EXEC [dbo].DeletePerson @ID";
            List<SqlParameter> parms = new List<SqlParameter>
            {
                // Create parameter(s)    
                new SqlParameter { ParameterName = "@ID", Value = id }
            };

            _context.Person.FromSqlRaw<Person>(sql, parms.ToArray());

            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool PersonExists(int id)
        {
            return _context.Person.Any(e => e.Id == id);
        }
    }
}
