import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}
function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <input
      className="border rounded-lg p-2 w-full"
      type="text"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
      }}
      placeholder="Search products..."
    />
  );
}
export default SearchBar;
