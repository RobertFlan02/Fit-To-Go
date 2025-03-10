import React from "react";

function ExerciseTile({ exercise, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        backgroundImage: `url(${exercise.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: "1 / 1",
      }}
    >
      {/* Overlay for title, likes, and tags */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          padding: "8px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{exercise.title}</h3>
        <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
          Likes: {exercise.likeCount}
        </p>
        
      </div>
    </div>
  );
}

export default ExerciseTile;
