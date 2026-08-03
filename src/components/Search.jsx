import { Search as SearchIcon } from "lucide-react";

function Search({ onSearch }) {

  return (
    <div className="relative w-full mb-4">

      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <SearchIcon size={18} />
      </div>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="i-gallery w-full pl-10 pr-4 py-2  rounded"
      />
    </div>
  );
}

export default Search;