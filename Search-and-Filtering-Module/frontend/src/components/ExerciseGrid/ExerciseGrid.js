import React from "react";
import ExerciseTile from "../ExerciseTile/ExerciseTile";

function ExerciseGrid({ exercises, onSelectExercise }) {
  if (!exercises || exercises.length === 0) {
    return <p style={{ color: "#fff" }}>No exercises found.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      {exercises.map((exercise) => (
        <ExerciseTile
          key={exercise.id}
          exercise={exercise}
          onClick={() => onSelectExercise(exercise)}
        />
      ))}
    </div>
  );
}

export default ExerciseGrid;
