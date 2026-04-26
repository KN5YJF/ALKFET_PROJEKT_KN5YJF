using MyApi.Services;
using MyApi.Models;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// --- 1. SZOLGÁLTATÁSOK REGISZTRÁLÁSA ---

// CORS konfiguráció: Engedélyezzük az Angular-nak (localhost:4200), hogy elérje az API-t
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod(); // Ez KELL a PUT/DELETE-hez!
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Ez kényszeríti ki a kisbetűs (camelCase) neveket a JSON-ben
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// A TodoService regisztrálása, hogy a kontrollerek használhassák
builder.Services.AddSingleton<TodoService>();

var app = builder.Build();

// --- 2. MIDDLEWARE (A SORREND KRITIKUS!) ---

// A Swagger-t mindig elérhetővé tesszük a teszteléshez
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = "swagger";
});

// FONTOS: A UseCors-nak a UseSwagger után, de a MapControllers előtt KELL lennie!
app.UseCors("AllowAngular");

// Útvonalválasztás engedélyezése
app.MapControllers();

app.Run();