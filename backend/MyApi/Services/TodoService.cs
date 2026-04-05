using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MyApi.Models;

namespace MyApi.Services;

public class TodoService
{
    private readonly IMongoCollection<TaskItem> _todoCollection;

    public TodoService(IConfiguration configuration)
    {
var connectionString = configuration["MongoDbSettings:ConnectionString"] 
                          ?? "mongodb://mongodb:27017"; 
    var databaseName = configuration["MongoDbSettings:DatabaseName"] 
                      ?? "TodoDb";

    var mongoClient = new MongoClient(connectionString);
    var mongoDatabase = mongoClient.GetDatabase(databaseName);
    _todoCollection = mongoDatabase.GetCollection<TaskItem>("Tasks");
}

    public async Task<List<TaskItem>> GetAsync() =>
        await _todoCollection.Find(_ => true).ToListAsync();

    // Ez az ID alapú lekérdezés kell a Controllernek
    public async Task<TaskItem?> GetAsync(string id) =>
        await _todoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(TaskItem newTask) =>
        await _todoCollection.InsertOneAsync(newTask);

    // Ez kell a módosításhoz
    public async Task UpdateAsync(string id, TaskItem updatedTask) =>
        await _todoCollection.ReplaceOneAsync(x => x.Id == id, updatedTask);

    // Ez kell a törléshez
    public async Task RemoveAsync(string id) =>
        await _todoCollection.DeleteOneAsync(x => x.Id == id);
}