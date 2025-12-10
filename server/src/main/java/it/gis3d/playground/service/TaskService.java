package it.gis3d.playground.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.gis3d.playground.model.db.Task;
import it.gis3d.playground.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired 
     
    private TaskRepository repo;
    
    public Task createTask(Task task) {
        if (task.getPriority() < 1 || task.getPriority() > 5) {
            throw new IllegalArgumentException("Priority deve essere 1-5");
        }
        return repo.save(task);
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task getTaskById(Long id) {
        return repo.findById(id).orElse(null);
    }
    
}
