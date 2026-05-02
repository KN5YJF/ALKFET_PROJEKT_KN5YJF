using Microsoft.AspNetCore.Mvc;
using MyApi.Models;
using MyApi.Services;

namespace MyApi.Controllers;

[ApiController]
[Route("api/todo")]
public class TodoController : ControllerBase
{
    private readonly TodoService _todoService;

    public TodoController(TodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public async Task<ActionResult<List<TaskItem>>> Get()
    {
        var tasks = await _todoService.GetAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> Get(string id)
    {
        var task = await _todoService.GetAsync(id);

        if (task is null)
            return NotFound();

        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> Post(TaskItem newTask)
    {
        newTask.Title = (newTask.Title ?? string.Empty).Trim();
        if (string.IsNullOrWhiteSpace(newTask.Title))
            return BadRequest("A feladat címe nem lehet üres.");

        await _todoService.CreateAsync(newTask);
        return CreatedAtAction(nameof(Get), new { id = newTask.Id }, newTask);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, TaskItem updatedTask)
    {
        var task = await _todoService.GetAsync(id);

        if (task is null)
            return NotFound();

        updatedTask.Title = (updatedTask.Title ?? string.Empty).Trim();
        if (string.IsNullOrWhiteSpace(updatedTask.Title))
            return BadRequest("A feladat címe nem lehet üres.");

        updatedTask.Id = task.Id;
        await _todoService.UpdateAsync(id, updatedTask);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var task = await _todoService.GetAsync(id);

        if (task is null)
            return NotFound();

        await _todoService.RemoveAsync(id);

        return NoContent();
    }
}
