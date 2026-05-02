using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace MyApi.Models;

public class TaskItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [Required]
    [MinLength(1)]
    [StringLength(120)]
    public string Title { get; set; } = null!;
    public bool IsCompleted { get; set; } = false;
}
