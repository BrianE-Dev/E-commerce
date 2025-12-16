import React, { useEffect } from "react";
import { useState, useRef } from 'react';

function SearchFilter({ searchTerm, onSearchChange, searchRef }) {
  const [ myState, useMystate ] = useState();
  
  const stateRef = useRef(myState)

  useEffect (()=>{
    if (searchRef.current) {
      searchRef.current.focus();
    }
  },[])

  //const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="mb-8 w-full max-w-lg mx-auto">
      <input
        ref={searchRef}
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
