package com.FitToGo.backend.services;

import com.FitToGo.backend.models.Exercise;
import com.FitToGo.backend.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Comparator;
import java.util.List;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAllWithAssociations();
    }

    // Return exercises filtered by provided tag names.
    // If no tags provided, return all exercises.
    public List<Exercise> getExercisesByTags(List<String> tagNames) {
        if (tagNames == null || tagNames.isEmpty()) {
            return getAllExercises();
        }
        return exerciseRepository.findByTagsWithAssociations(tagNames, (long) tagNames.size());
    }

    public Exercise getExerciseById(Long id) {
        Optional<Exercise> exercise = exerciseRepository.findById(id);
        return exercise.orElse(null);
    }

    // Get trending exercises based on like count.
    public List<Exercise> getTrendingExercises() {
        List<Exercise> allExercises = getAllExercises();
        allExercises.sort(Comparator.comparingInt(Exercise::getLikeCount).reversed());
        return allExercises;
    }
}