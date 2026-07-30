import { useState, useEffect } from "react";
import Gallery from "./components/Gallery";
import Upload from "./components/Upload";
import Login from "./components/Login";

function App() {
  const [page, setPage] = useState("gallery"); // 🔥 always gallery first
  const [refresh, setRefresh] = useState(false);
 const [isAdmin, setIsAdmin] = useState(
  localStorage.getItem("role") === "admin"
);


const [role, setRole] = useState(localStorage.getItem("role"));
const [csrfToken, setCsrfToken] = useState("");


useEffect(() => {
  fetch("http://localhost/backend/api/me.php", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      setIsAdmin(data.role === "admin");
    });
}, [page]);


useEffect(() => {
  fetch("http://localhost/backend/api/csrf.php", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      setCsrfToken(data.csrf_token);
    });
}, []);

  return (
    <div>

      {/* 🔥 NAVBAR */}
      <div className="flex gap-4 p-3 bg-gray-200 items-center">

        <button onClick={() => setPage("gallery")}>
          Gallery
        </button>

        {/* 🔐 ADMIN ONLY */}
       {isAdmin && role === "admin" && (
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
    onClick={async () => {
  await fetch("http://localhost/backend/api/logout.php", {
    credentials: "include",
  });

  localStorage.removeItem("role");

  setRole(null);
  setIsAdmin(false);   // ⭐ IMPORTANT LINE

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
          isAdmin={isAdmin}  
        />
      )}

      {page === "upload" && isAdmin  && (
        <Upload
          onUpload={() => setRefresh(!refresh)}
          goToGallery={() => setPage("gallery")}
        />
      )}

    </div>
  );
}

export default App;