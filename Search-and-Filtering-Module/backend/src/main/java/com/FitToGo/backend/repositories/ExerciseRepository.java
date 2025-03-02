package com.FitToGo.backend.repositories;

import com.FitToGo.backend.models.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    // Returns exercises that match all the provided tag names.
    @Query("SELECT e FROM Exercise e JOIN e.tags t WHERE t.name IN :tagNames GROUP BY e.id HAVING COUNT(DISTINCT t.name) = :tagCount")
    List<Exercise> findByTags(@Param("tagNames") List<String> tagNames, @Param("tagCount") Long tagCount);
}