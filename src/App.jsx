import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";

import Gallery from "./components/Gallery";
import Upload from "./components/Upload";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import SearchBox from "./components/Search";

function App() {
  const [page, setPage] = useState("gallery");
  const [refresh, setRefresh] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
 const [isAdmin, setIsAdmin] = useState(
  localStorage.getItem("role") === "admin"
);


const handleSearchSubmit = (value) => {
  setSearch(value);

  // 🔥 IMPORTANT: next tick pe close karo
  setTimeout(() => {
    setShowSearch(false);
  }, 0);
};

const [role, setRole] = useState(localStorage.getItem("role"));
const [csrfToken, setCsrfToken] = useState("");
const [search, setSearch] = useState("");
const [showSearch, setShowSearch] = useState(false); // 🔥 NEW


useEffect(() => {
  fetch("http://localhost/backend/api/me.php", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      setIsAdmin(data.role === "admin");
    });
}, [page]);



const handleLogout = async () => {
  await fetch("http://localhost/backend/api/logout.php", {
    credentials: "include",
  });

  localStorage.removeItem("role");
  setRole(null);
  setIsAdmin(false);
  setPage("gallery");
};
 return (
  <div className="flex">

    <Sidebar
      page={page}
      setPage={setPage}
      isAdmin={isAdmin}
      handleLogout={handleLogout}
       setShowSearch={setShowSearch} 
    />

    {/* MAIN CONTENT */}
    <div className="md:ml-20 flex-1 p-6  pb-18  min-h-screen">

      {page === "login" && (
        <Login setPage={setPage} setRole={setRole} />
      )}

      <div className="hidden md:block mb-4">
  <SearchBox onSearch={setSearch} />
</div>

      {page === "gallery" && (
        <Gallery
          refresh={refresh}
          onDelete={() => setRefresh(!refresh)}
          role={role}
          search={search}
        />
      )}

      {page === "upload" && isAdmin && (
        <Upload
          onUpload={() => setRefresh(!refresh)}
          goToGallery={() => setPage("gallery")}
        />
      )}
      {showSearch && (
  <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50">

    <div className="bg-white w-full p-4 shadow-lg">
<input
  type="text"
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      setShowSearch(false); // 🔥 modal close
    }
  }}
  className="i-gallery  p-2 w-full rounded"
  autoFocus
/>

    </div>
  </div>
)}

    </div>

  </div>
);
}

export default App;