import { useState } from "react";
import Gallery from "./components/Gallery";
import Upload from "./components/Upload";
import Login from "./components/Login";

function App() {
  const [page, setPage] = useState("gallery"); // 🔥 always gallery first
  const [refresh, setRefresh] = useState(false);

const [role, setRole] = useState(localStorage.getItem("role"));

  return (
    <div>

      {/* 🔥 NAVBAR */}
      <div className="flex gap-4 p-3 bg-gray-200 items-center">

        <button onClick={() => setPage("gallery")}>
          Gallery
        </button>

        {/* 🔐 ADMIN ONLY */}
        {role === "admin" && (
  <button onClick={() => setPage("upload")}>
    Add Product
  </button>
)}

        {/* 🔐 LOGIN / LOGOUT */}
        {!role ? (
  <button onClick={() => setPage("login")}>
    Login
  </button>
) : (
  <button
    onClick={() => {
      localStorage.removeItem("role");
      setRole(null);
      setPage("gallery");
    }}
  >
    Logout
  </button>
)}

      </div>

      {/* 🔥 PAGES */}

      {page === "login" && <Login setPage={setPage} setRole={setRole} />}

      {page === "gallery" && (
        <Gallery
          refresh={refresh}
          onDelete={() => setRefresh(!refresh)}
          role={role}  
        />
      )}

      {page === "upload" && role === "admin" && (
        <Upload
          onUpload={() => setRefresh(!refresh)}
          goToGallery={() => setPage("gallery")}
        />
      )}

    </div>
  );
}

export default App;