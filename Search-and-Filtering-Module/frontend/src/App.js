// src/App.js
import React, { useState, useEffect } from "react";
import ExerciseGrid from "./components/ExerciseGrid/ExerciseGrid";
import SearchBar from "./components/SearchBar/SearchBar";
import ExerciseDetailModal from "./components/ExerciseDetailModal/ExerciseDetailModal";

// Determine environment: use mock JSON files in production, real API in development.
const isProduction = process.env.NODE_ENV === "production";
// Use a relative path so it resolves within your GitHub Pages subfolder.
const apiBaseUrl = isProduction ? "mock" : "http://localhost:8080/api";
const tagsEndpoint = isProduction ? `${apiBaseUrl}/tags.json` : `${apiBaseUrl}/tags`;
const exercisesEndpoint = isProduction ? `${apiBaseUrl}/exercises.json` : `${apiBaseUrl}/exercises`;

function App() {
  const [exercises, setExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]); // preserve original list
  const [trendingExercises, setTrendingExercises] = useState([]);
  const [featuredExercises, setFeaturedExercises] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tags on mount
  useEffect(() => {
    fetch(tagsEndpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok for tags");
        }
        return res.json();
      })
      .then((data) => setTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  // Fetch exercises (filtered if tags selected) and store in both exercises & allExercises
  useEffect(() => {
    setLoading(true);
    let url = exercisesEndpoint;
    if (selectedTags.length > 0) {
      const queryParam = selectedTags.join(",");
      url += `?tags=${queryParam}`;
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok for exercises");
        }
        return response.json();
      })
      .then((data) => {
        setExercises(data);
        setAllExercises(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching exercises:", err);
        setError(err);
        setLoading(false);
      });
  }, [selectedTags]);

  // Compute trending and featured only when no tags are selected.
  useEffect(() => {
    if (selectedTags.length === 0 && allExercises.length > 0) {
      const trending = [...allExercises]
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 6);
      setTrendingExercises(trending);

      let remaining = allExercises.filter(
        (ex) => !trending.find((t) => t.id === ex.id)
      );
      remaining.sort(() => 0.5 - Math.random());
      setFeaturedExercises(remaining.slice(0, 6));
    }
  }, [allExercises, selectedTags]);

  // Client-side filtering logic:
  // Filter allExercises so that each exercise must contain every selected tag.
  const filteredExercises =
    selectedTags.length > 0
      ? allExercises.filter((exercise) =>
          selectedTags.every((tag) =>
            exercise.tags &&
            exercise.tags.some(
              (t) => t.name.toLowerCase() === tag.toLowerCase()
            )
          )
        )
      : allExercises;

  // When tags are selected, sort the filtered exercises by likeCount descending for search results.
  const searchResults = [...filteredExercises].sort((a, b) => b.likeCount - a.likeCount);

  return (
    <div style={{ padding: "1rem", background: "#000", minHeight: "100vh", color: "#fff" }}>
      {/* Header with Home Button and Custom Font for Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "1.8rem",
            cursor: "pointer",
          }}
          onClick={() => {}}
        >
          🏠
        </button>
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            flexGrow: 1,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: "2.5rem",
          }}
        >
          Exercise Explorer
        </h1>
        <div style={{ width: "40px" }}></div>
      </div>

      <SearchBar
        allTags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      {loading && <p>Loading exercises...</p>}
      {error && <p>Error loading exercises: {error.message}</p>}
      {!loading && !error && allExercises.length > 0 && (
        <>
          {selectedTags.length === 0 ? (
            <>
              {/* Trending Section with Fire Symbol */}
              <section style={{ marginBottom: "2rem" }}>
                <h2>
                  <span role="img" aria-label="trending">
                    🔥
                  </span>{" "}
                  Trending
                </h2>
                <ExerciseGrid
                  exercises={trendingExercises}
                  onSelectExercise={setSelectedExercise}
                />
              </section>

              {/* Featured Section with Star Symbol */}
              <section>
                <h2>
                  <span role="img" aria-label="featured">
                    ⭐
                  </span>{" "}
                  Featured
                </h2>
                <ExerciseGrid
                  exercises={featuredExercises}
                  onSelectExercise={setSelectedExercise}
                />
              </section>
            </>
          ) : (
            // When tags are selected, show a single "Search Results" section, sorted by highest likes.
            <section>
              <h2>Search Results</h2>
              <ExerciseGrid
                exercises={searchResults}
                onSelectExercise={setSelectedExercise}
              />
            </section>
          )}
        </>
      )}

      {/* Modal for full exercise details */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}

export default App;
