// src/components/ExerciseDetailModal/ExerciseDetailModal.js

import React from "react";

function ExerciseDetailModal({ exercise, onClose }) {
  if (!exercise) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#222",
          color: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "90%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        {/* Image Container */}
        <div
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#000",
            alignSelf: "center", // Center the image horizontally
          }}
        >
          <img
            src={exercise.imageUrl}
            alt={exercise.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain", // Prevent harsh cropping
            }}
          />
        </div>

        {/* Exercise Title */}
        <h2 style={{ margin: 0, textAlign: "center" }}>{exercise.title}</h2>

        {/* Description */}
        <p style={{ margin: 0 }}>
          {exercise.description}
        </p>

        {/* Posted By */}
        <p style={{ fontStyle: "italic", color: "#aaa", margin: "0.5rem 0" }}>
          {exercise.postedBy
            ? `Posted by ${exercise.postedBy.name}`
            : "Posted by Unknown"}
        </p>

        {/* Likes */}
        <p style={{ margin: 0 }}>
          <strong>Likes:</strong> {exercise.likeCount}
        </p>

        {/* Tags */}
        {exercise.tags && exercise.tags.length > 0 && (
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center", // Center the tags horizontally
            }}
          >
            {exercise.tags.map((tag) => (
              <span
                key={tag.id}
                style={{
                  background: "#333",
                  padding: "6px 10px",
                  borderRadius: "16px",
                  fontSize: "0.9rem",
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseDetailModal;
