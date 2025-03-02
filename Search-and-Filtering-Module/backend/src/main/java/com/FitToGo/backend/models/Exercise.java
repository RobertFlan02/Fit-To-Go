package com.FitToGo.backend.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exercises")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String imageUrl;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    // Relationship to the User who posted the exercise
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User postedBy;

    private int likeCount;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "exercise_tags",
        joinColumns = @JoinColumn(name = "exercise_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags = new ArrayList<>();
    
    public Exercise() {}

    public Exercise(String title, String imageUrl, String description, User postedBy, int likeCount) {
         this.title = title;
         this.imageUrl = imageUrl;
         this.description = description;
         this.postedBy = postedBy;
         this.likeCount = likeCount;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public User getPostedBy() { return postedBy; }
    public void setPostedBy(User postedBy) { this.postedBy = postedBy; }
    public int getLikeCount() { return likeCount; }
    public void setLikeCount(int likeCount) { this.likeCount = likeCount; }
    public List<Tag> getTags() { return tags; }
    public void setTags(List<Tag> tags) { this.tags = tags; }
    
    // Helper methods
    public void addTag(Tag tag) {
         this.tags.add(tag);
         tag.getExercises().add(this);
    }
    
    public void removeTag(Tag tag) {
         this.tags.remove(tag);
         tag.getExercises().remove(this);
    }
}