package it.gis3d.playground.model.db;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private int priority;
    private LocalDate expirationDate;
    private LocalDateTime creationDate;
    private boolean checked;
    private Double lat;
    private Double lon;

    public Task(String name, String description, int priority, LocalDate expirationDate, LocalDateTime creationDate, boolean checked, Double lat,
            Double lon) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.expirationDate = expirationDate;
        this.creationDate = creationDate;
        this.checked = checked;
        this.lat = lat;
        this.lon = lon;
    }

    public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public Task() {
    }
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getPriority() {
        return priority;
    }
    public void setPriority(int priority) {
        this.priority = priority;
    }
    public LocalDate getExpirationDate() {
        return expirationDate;
    }
    public void setExpirationDate(LocalDate expirationdate) {
        this.expirationDate = expirationdate;
    }
    public boolean isChecked() {
        return checked;
    }
    public void setChecked(boolean checked) {
        this.checked = checked;
    }
    public Double getLat() {
        return lat;
    }
    public void setLat(Double lat) {
        this.lat = lat;
    }
    public Double getLon() {
        return lon;
    }
    public void setLon(Double lon) {
        this.lon = lon;
    }
}
