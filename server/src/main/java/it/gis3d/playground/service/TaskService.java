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
        if (task.getPriority() < 1 || task.getPriority() > 3) {
            throw new IllegalArgumentException("Priority deve essere 1-3");
        }
        return repo.save(task);
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task getTaskById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Task non trovato"));
        
        task.setName(taskDetails.getName());
        task.setDescription(taskDetails.getDescription());
        task.setPriority(taskDetails.getPriority());
        task.setExpirationDate(taskDetails.getExpirationDate());
        task.setChecked(taskDetails.isChecked());
        task.setLat(taskDetails.getLat());
        task.setLon(taskDetails.getLon());
        
        if (task.getPriority() < 1 || task.getPriority() > 3) {
            throw new IllegalArgumentException("Priority deve essere 1-3");
        }
        
        return repo.save(task);
    }
    
    public Task toggleTask(Long id) {
        Task task = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Task non trovato"));
        task.setChecked(!task.isChecked());
        return repo.save(task);
    }
    
    public void deleteTask(Long id) {
        Task task = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Task non trovato"));
        repo.delete(task);
    }
}
