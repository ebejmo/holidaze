import { useEffect, useRef, useState } from 'react';
import { searchVenues } from '../../api/search';
import Spinner from '../ui/Spinner';

export default function Search({ onResultClick }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      setIsOpen(true);
      setIsSearching(true);
      try {
        const found = await searchVenues(value);
        setResults(found);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (id) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onResultClick(id);
  };

  return (
    <div className="search-wrapper" ref={searchRef}>
      <input
        type="text"
        className="form-control"
        placeholder="Search venues..."
        value={query}
        onChange={handleSearchChange}
      />

      {isOpen && (
        <ul className="search-dropdown list-group">
          {isSearching ? (
            <li className="list-group-item text-center text-muted">
              <Spinner small /> Searching...
            </li>
          ) : results.length > 0 ? (
            results.map((venue) => (
              <li
                key={venue.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(venue.id)}
              >
                {venue.name}
              </li>
            ))
          ) : (
            <li className="list-group-item text-center text-muted">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
