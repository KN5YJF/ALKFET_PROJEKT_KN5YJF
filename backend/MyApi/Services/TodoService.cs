using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MyApi.Models;

namespace MyApi.Services;

//DB-vel kommunikáló szolgáltatás, feladat kezelés
public class TodoService
{
    private readonly IMongoCollection<TaskItem> _todoCollection;

    public TodoService(IConfiguration configuration)
    {
        //kapcsolat beállítás
        var connectionString = configuration["MongoDbSettings:ConnectionString"] 
                               ?? "mongodb://mongodb:27017";

        var databaseName = configuration["MongoDbSettings:DatabaseName"] 
                           ?? "TodoDb";

        //DB kliens, adatbázis létrehozás
        var mongoClient = new MongoClient(connectionString);
        var mongoDatabase = mongoClient.GetDatabase(databaseName);

        //task lista
        _todoCollection = mongoDatabase.GetCollection<TaskItem>("Tasks");
    }

    //feladat lekérés
    public async Task<List<TaskItem>> GetAsync() =>
        await _todoCollection.Find(_ => true).ToListAsync();

    //feladat lekérés id alapon
    public async Task<TaskItem?> GetAsync(string id) =>
        await _todoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    //feladat bevitel adatbázisba
    public async Task CreateAsync(TaskItem newTask) =>
        await _todoCollection.InsertOneAsync(newTask);

    //létező feladat módosítása
    public async Task UpdateAsync(string id, TaskItem updatedTask) =>
        await _todoCollection.ReplaceOneAsync(x => x.Id == id, updatedTask);

    //feladat törlése id alapon
    public async Task RemoveAsync(string id) =>
        await _todoCollection.DeleteOneAsync(x => x.Id == id);
}