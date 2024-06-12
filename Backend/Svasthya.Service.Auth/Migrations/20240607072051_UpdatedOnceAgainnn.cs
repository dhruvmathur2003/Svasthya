using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Svasthya.Service.Auth.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedOnceAgainnn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "appusers",
                newName: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "appusers",
                newName: "Id");
        }
    }
}
