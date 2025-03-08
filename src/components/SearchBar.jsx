import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { useCallback, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 500),
    []
  );

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); 
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center bg-gray-800 text-white rounded-lg shadow-md p-2 w-full max-w-md"
    >
      <div className="flex items-center gap-2 flex-grow">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Escape" && handleClear()}
          className="bg-transparent outline-none text-white flex-grow placeholder-gray-400"
        />
        {searchTerm && (
          <button type="button" onClick={handleClear} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
