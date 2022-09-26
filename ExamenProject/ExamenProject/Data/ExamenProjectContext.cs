using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Modelos;

namespace ExamenProject.Data
{
    public class ExamenProjectContext : DbContext
    {
        public ExamenProjectContext (DbContextOptions<ExamenProjectContext> options)
            : base(options)
        {
        }

        public DbSet<Modelos.Person> Person { get; set; }
    }
}
