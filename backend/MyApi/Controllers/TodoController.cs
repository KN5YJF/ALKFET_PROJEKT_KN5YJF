using Microsoft.AspNetCore.Mvc;
using MyApi.Models;
using MyApi.Services;

namespace MyApi.Controllers;

//API controller
[ApiController]
[Route("api/todo")]
public class TodoController : ControllerBase
{
    private readonly TodoService _todoService;

    //service injektálása
    public TodoController(TodoService todoService)
    {
        _todoService = todoService;
    }

    //összes feladat lekérése
    [HttpGet]
    public async Task<ActionResult<List<TaskItem>>> Get()
    {
        var tasks = await _todoService.GetAsync();
        return Ok(tasks);
    }

    //konkrét feladat lekérése id alapján
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> Get(string id)
    {
        var task = await _todoService.GetAsync(id);

        //feltételes, nincs ilyen feladat
        if (task is null)
            return NotFound();

        return Ok(task);
    }

    //feladat létrehozása
    [HttpPost]
    public async Task<IActionResult> Post(TaskItem newTask)
    {
        //szóközök levágása
        newTask.Title = (newTask.Title ?? string.Empty).Trim();

        //cím ellenőrzés, nem lehet üres
        if (string.IsNullOrWhiteSpace(newTask.Title))
            return BadRequest("A feladat címe nem lehet üres.");

        //mentés adatbázisba
        await _todoService.CreateAsync(newTask);

        //visszatérés a létrehozott task-al
        return CreatedAtAction(nameof(Get), new { id = newTask.Id }, newTask);
    }

    //meglévő módosítása
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, TaskItem updatedTask)
    {
        //elem lekérése
        var task = await _todoService.GetAsync(id);

        //ha nincs ilyen
        if (task is null)
            return NotFound();

        //tisztítása
        updatedTask.Title = (updatedTask.Title ?? string.Empty).Trim();

        //üres cím ellenőrzés
        if (string.IsNullOrWhiteSpace(updatedTask.Title))
            return BadRequest("A feladat címe nem lehet üres.");

        //id rögzítés
        updatedTask.Id = task.Id;

        //frissítés
        await _todoService.UpdateAsync(id, updatedTask);

        return NoContent();
    }

    //feladat törlése
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        //ellenőrzés
        var task = await _todoService.GetAsync(id);

        if (task is null)
            return NotFound();

        //törlés
        await _todoService.RemoveAsync(id);

        return NoContent();
    }
}