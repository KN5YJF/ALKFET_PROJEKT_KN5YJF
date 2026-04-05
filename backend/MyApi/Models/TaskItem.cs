using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyApi.Models;

public class TaskItem
{
    [BsonId]
[BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Title { get; set; } = null!;
    public bool IsCompleted { get; set; } = false;
}