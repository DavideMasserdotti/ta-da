package it.gis3d.playground.controller;

import org.springframework.web.bind.annotation.RestController;

import it.gis3d.playground.model.db.Task;
import it.gis3d.playground.service.TaskService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/tasks")
public class TaskController {

@Autowired
  private TaskService service;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return service.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return service.getAllTasks(); 
    }

    @GetMapping("/{id}")
    public Task getTaskById(@RequestParam Long id) {
        return service.getTaskById(id);
    }

}
