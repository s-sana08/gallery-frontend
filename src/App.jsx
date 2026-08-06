import { useState, useEffect } from "react";

import Gallery from "./components/Gallery";
import Upload from "./components/Upload";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import SearchBox from "./components/Search";

function App() {
  const [page, setPage] = useState("gallery");
  const [refresh, setRefresh] = useState(false);

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("role") === "admin"
  );

  const [role, setRole] = useState(localStorage.getItem("role"));
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // 🔥 CHECK USER ROLE
  useEffect(() => {
    fetch("http://localhost/backend/api/me.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.role === "admin");
      });
  }, [page]);

  // 🔥 LOGOUT
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
      <div className="md:ml-20 flex-1">

        {/* LOGIN */}
        {page === "login" && (
          <Login setPage={setPage} setRole={setRole} />
        )}

        {/* 🔥 DESKTOP SEARCH (ONLY ON GALLERY) */}
        {page === "gallery" && (
          <div className="hidden md:block">
            <SearchBox
              value={search}
              onChange={setSearch}
              onSubmit={() => {}}
            />
          </div>
        )}

        {/* GALLERY */}
        {page === "gallery" && (
          <Gallery
            refresh={refresh}
            onDelete={() => setRefresh(!refresh)}
            isAdmin={isAdmin}
            search={search}
          />
        )}

        {/* UPLOAD */}
        {page === "upload" && isAdmin && (
          <Upload
            onUpload={() => setRefresh(!refresh)}
            goToGallery={() => setPage("gallery")}
          />
        )}

        {/* 🔥 MOBILE SEARCH MODAL (FIXED) */}
        {showSearch && (
          <div className="fixed top-0 left-0 w-full h-[calc(100%-60px)] bg-white z-40 p-4 md:hidden">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="i-gallery p-2 w-full rounded border"
              autoFocus
            />

          </div>
        )}

      </div>
    </div>
  );
}

export default App;