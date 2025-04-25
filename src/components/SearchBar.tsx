import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  doctors: any[];
  onSearch: (query: string) => void;
}

const SearchBar = ({ doctors, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(query.toLowerCase())
        )
        .map(doctor => doctor.name)
        .slice(0, 3);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, doctors]);

  const handleSubmit = (selectedQuery: string) => {
    setQuery(selectedQuery);
    onSearch(selectedQuery);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-full mx-auto bg-white rounded-lg shadow-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          data-testid="autocomplete-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full pl-10 pr-4 py-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              data-testid="suggestion-item"
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleSubmit(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
