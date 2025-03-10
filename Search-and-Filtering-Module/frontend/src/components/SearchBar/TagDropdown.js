// src/components/SearchBar/TagDropdown.js
import React from "react";

function TagDropdown({ filteredTags, handleSelectTag }) {
  return (
    <div
      style={{
        border: "1px solid #555",
        backgroundColor: "#222",
        width: "100%",
        maxHeight: "200px",
        overflowY: "auto",
        marginTop: "4px",
        borderRadius: "4px",
        position: "absolute",
        zIndex: 100,
      }}
    >
      {filteredTags.length > 0 ? (
        filteredTags.map((tag) => (
          <div
            key={tag.id}
            onClick={() => handleSelectTag(tag.name)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #444",
              color: "#fff",
            }}
          >
            {tag.name}
          </div>
        ))
      ) : (
        <div style={{ padding: "10px", color: "#aaa" }}>No tags found</div>
      )}
    </div>
  );
}

export default TagDropdown;
