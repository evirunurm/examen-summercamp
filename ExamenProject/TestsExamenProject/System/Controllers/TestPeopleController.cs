using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace TestsExamenProject.System.Controllers
{
    internal class TestPeopleController
    {
        [Fact]
        public async void GetAll_ShouldReturn200Status()
        {
            /// Arrange
            var repositoryService = new Mock<IRepositoryOld>();
            var nomicsService = new Mock<INomics>();


            //repositoryService.Setup(_ => _.GetAllCurrencies()).Returns(await CurrencyMockData.GetAll());
            var sut = new CurrenciesController(null, nomicsService.Object, repositoryService.Object, null);

            /// Act
            var result = await sut.GetAll();
            var okObjectResult = result as OkObjectResult;

            // /// Assert
            okObjectResult.StatusCode.Should().Be(200);
        }
    }
}
