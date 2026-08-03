import { Image, Plus, LogIn, LogOut } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";

function Sidebar({ page, setPage, isAdmin, handleLogout, setShowSearch  }) {

  const active = "bg-gray-200";
  const normal = "hover:bg-gray-200";

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex w-20 h-screen border-r border-[#c8c8c1] bg-white flex-col items-center py-6 fixed z-50">

        <div className="mb-10 text-2xl cursor-pointer"
             onClick={() => setPage("gallery")}>
          📸
        </div>

        <div className="flex flex-col gap-6 items-center">

          <button
            onClick={() => setPage("gallery")}
            className={`p-3 rounded ${page === "gallery" ? active : normal}`}
          >
            <Image size={22} />
          </button>

          {isAdmin && (
            <button
              onClick={() => setPage("upload")}
              className={`p-3 rounded ${page === "upload" ? active : normal}`}
            >
              <Plus size={22} />
            </button>
          )}

          {!isAdmin && (
            <button
              onClick={() => setPage("login")}
              className={`p-3 rounded ${page === "login" ? active : normal}`}
            >
              <LogIn size={22} />
            </button>
          )}

          {isAdmin && (
            <button
              onClick={handleLogout}
              className="p-3 rounded hover:bg-gray-200"
            >
              <LogOut size={22} />
            </button>
          )}
        </div>
      </div>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="fixed bottom-0 left-0 w-full border-[#c8c8c1] bg-white border-t flex justify-around items-center py-2 md:hidden z-50">

        <button
          onClick={() => setPage("gallery")}
          className={`p-2 rounded ${page === "gallery" ? active : normal}`}
        >
          <Image size={22} />
        </button>

        {isAdmin && (
          <button
            onClick={() => setPage("upload")}
            className={`p-2 rounded ${page === "upload" ? active : normal}`}
          >
            <Plus size={22} />
          </button>
        )}

        <button
    onClick={() => setShowSearch(true)}
    className="p-2 rounded hover:bg-gray-200"
    >
    <SearchIcon size={22} />
    </button>

        {!isAdmin && (
          <button
            onClick={() => setPage("login")}
            className={`p-2 rounded ${page === "login" ? active : normal}`}
          >
            <LogIn size={22} />
          </button>
        )}

        {isAdmin && (
          <button
            onClick={handleLogout}
            className="p-2 rounded hover:bg-gray-200"
          >
            <LogOut size={22} />
          </button>
        )}
      </div>
    </>
  );
}

export default Sidebar;