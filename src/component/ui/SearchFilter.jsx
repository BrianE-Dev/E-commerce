import React from "react";

function SearchFilter({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-8 w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Search Products ..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 transition duration-150"
      />
    </div>
  );
}

export default SearchFilter;
