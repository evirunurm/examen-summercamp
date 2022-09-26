using Microsoft.EntityFrameworkCore.Migrations;

namespace ExamenProject.Migrations
{
    public partial class initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "People");

            migrationBuilder.RenameTable(
                name: "Person",
                newName: "Person",
                newSchema: "People");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Person",
                schema: "People",
                newName: "Person");
        }
    }
}
