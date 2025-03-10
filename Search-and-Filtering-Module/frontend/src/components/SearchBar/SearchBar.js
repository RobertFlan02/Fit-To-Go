// src/components/SearchBar/SearchBar.js
import React, { useState } from "react";
import TagDropdown from "./TagDropdown";

function SearchBar({ allTags, selectedTags, setSelectedTags }) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter tags based on the user's query
  const filteredTags = allTags.filter((tag) =>
    tag.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectTag = (tagName) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);
    }
    setQuery("");
    setShowDropdown(false);
  };

  const removeTag = (tagName) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        {/* Display currently selected tags as chips */}
        {selectedTags.map((tagName) => (
          <span
            key={tagName}
            onClick={() => removeTag(tagName)}
            style={{
              display: "inline-block",
              padding: "6px 12px",
              marginRight: "8px",
              backgroundColor: "#444",
              color: "#fff",
              borderRadius: "16px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            {tagName} &times;
          </span>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        {/* Input field for searching tags */}
        <input
          type="text"
          value={query}
          placeholder="Search or add tags..."
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          style={{
            flexGrow: 1,
            padding: "10px",
            backgroundColor: "#333",
            border: "1px solid #555",
            color: "#fff",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={clearAllTags}
          style={{
            marginLeft: "8px",
            padding: "10px 16px",
            backgroundColor: "#555",
            border: "none",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear All
        </button>
      </div>
      {/* Render the TagDropdown when the input is focused and query is non-empty */}
      {showDropdown && query && (
        <TagDropdown filteredTags={filteredTags} handleSelectTag={handleSelectTag} />
      )}
    </div>
  );
}

export default SearchBar;
