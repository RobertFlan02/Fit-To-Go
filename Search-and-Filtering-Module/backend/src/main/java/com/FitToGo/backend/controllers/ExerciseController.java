package com.FitToGo.backend.controllers;

import com.FitToGo.backend.models.Exercise;
import com.FitToGo.backend.services.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    // GET /api/exercises - Retrieve all exercises or filter by tags (comma-separated)
    @GetMapping
    public List<Exercise> getExercises(@RequestParam(value = "tags", required = false) List<String> tags) {
        return exerciseService.getExercisesByTags(tags);
    }

    // GET /api/exercises/{id} - Retrieve a specific exercise by ID
    @GetMapping("/{id}")
    public Exercise getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id);
    }

    // GET /api/exercises/trending - Retrieve trending exercises (e.g., highest like count)
    @GetMapping("/trending")
    public List<Exercise> getTrendingExercises() {
        return exerciseService.getTrendingExercises();
    }
}
