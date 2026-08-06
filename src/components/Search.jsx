import { useEffect, useState, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";

function Search({ onSearch }) {
  const [placeholder, setPlaceholder] = useState("");
  const typingRef = useRef(null);

  const text = "Search...";

  const startTyping = () => {
    if (typingRef.current) clearTimeout(typingRef.current);

    let i = 0;

    const type = () => {
      setPlaceholder(text.slice(0, i + 1));
      i++;

      if (i < text.length) {
        typingRef.current = setTimeout(type, 120); // 👈 smooth speed
      }
    };

    type();
  };

  useEffect(() => {
    // load pe start
    startTyping();

    // scroll pe restart (debounce)
    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        startTyping();
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  return (
    <div className="relative w-full p-6">
      {/* Icon */}
      <div className="absolute inset-y-0 left-10 flex items-center text-gray-500">
        <SearchIcon size={18} />
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="i-gallery w-full pl-10 pr-4 py-2 rounded"
      />
    </div>
  );
}

export default Search;