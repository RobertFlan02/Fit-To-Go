package com.FitToGo.backend.repositories;

import com.FitToGo.backend.models.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    @Query("""
    SELECT DISTINCT e
    FROM Exercise e
    LEFT JOIN FETCH e.postedBy
    LEFT JOIN FETCH e.tags
    """)
    List<Exercise> findAllWithAssociations();

    @Query("""
    SELECT DISTINCT e
    FROM Exercise e
    LEFT JOIN FETCH e.postedBy
    LEFT JOIN FETCH e.tags t
    WHERE e.id IN (
        SELECT ex.id
        FROM Exercise ex
        JOIN ex.tags tg
        WHERE tg.name IN :tagNames
        GROUP BY ex.id
        HAVING COUNT(DISTINCT tg.name) = :tagCount
    )
    """)
    List<Exercise> findByTagsWithAssociations(
        @Param("tagNames") List<String> tagNames,
        @Param("tagCount") Long tagCount
    );
}
