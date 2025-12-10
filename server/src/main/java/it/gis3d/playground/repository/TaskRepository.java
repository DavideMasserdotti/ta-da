package it.gis3d.playground.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import it.gis3d.playground.model.db.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{
}
