"use client"
// SearchBox.tsx

import React, { useState } from 'react';
import { TiZoomOutline } from 'react-icons/ti';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mx-2 w-full flex items-center md:w-1/2 relative">
       <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 border"
      />
      {/* <button
        onClick={handleSearch}
        className="absolute top-1/2 left-1/2"
      >
        <div className="flex items-center ">
          <TiZoomOutline size={20} className="mx-auto" />
        </div>
      </button> */}
    </div>
  );
};

export default SearchBox;
