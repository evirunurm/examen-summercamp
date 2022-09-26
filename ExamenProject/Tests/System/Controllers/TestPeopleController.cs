using Xunit;
using Modelos;
using System;

namespace TestsExamenProject.System.Controllers
{
    public class TestPeopleController
    {

        [Fact]
        public void AssignedNameISCorrect()
        {
            Person person = new("Ana", new DateTime(), "123456789");
            Assert.True(person.Name == "Ana");
        }
    }
}
