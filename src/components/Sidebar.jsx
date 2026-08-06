import { Image, Plus, LogIn, LogOut } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import logo from "../assets/ss_logo.png";
import { LayoutGrid } from "lucide-react";

function Sidebar({ page, setPage, isAdmin, handleLogout, setShowSearch  }) {

  const active = "bg-gray-200";
  const normal = "hover:bg-gray-200";

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex w-20 h-screen border-r border-[#c8c8c1] bg-white flex-col items-center py-6 fixed z-50">

        <div className="mb-8 text-2xl cursor-pointer"
             onClick={() => setPage("gallery")}>
          <img src={logo} alt="logo" className="px-4" />
        </div>

        <div className="flex flex-col gap-8 items-center">

         <button
  onClick={() => setPage("gallery")}
  className={`p-3 rounded transition-all duration-300 group
    ${page === "gallery"
      ? "bg-gradient-to-r from-[#15304d] to-[#676b76] text-white scale-110 shadow-md"
      : "text-gray-500 hover:bg-gray-100 hover:scale-110"}
  `}
>
  <LayoutGrid
    size={22}
    className="transition-all duration-300 
               group-hover:rotate-90 group-hover:scale-110"
  />
</button>
          {isAdmin && (
<button
  onClick={() => setPage("upload")}
  className={`p-3 rounded transition-all duration-300 group
    ${page === "upload"
      ? "bg-gradient-to-r from-[#15304d] to-[#676b76] text-white scale-110 shadow-md"
      : "text-gray-500 hover:bg-gray-100 hover:scale-110"}
  `}
>
  <Plus
    size={22}
    className="transition-all duration-300 group-hover:rotate-90"
  />
</button>
          )}

          {!isAdmin && (
          <button
  onClick={() => setPage("login")}
  className={`p-3 rounded transition-all duration-300 group flex items-center justify-center
    ${page === "login"
      ? "bg-gradient-to-r from-[#15304d] to-[#676b76] text-white scale-110"
      : "text-gray-500 hover:bg-gray-100 hover:scale-110"}
  `}
>
  <LogIn
    size={22}
    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
  />
</button>
          )}

          {isAdmin && (
          
<button
  onClick={handleLogout}
  className="p-3 rounded transition-all duration-300 group flex items-center justify-center
             text-gray-500 hover:bg-gray-100 hover:scale-110"
>
  <LogOut
    size={22}
    className="transition-transform duration-300 
               group-hover:-translate-x-1 group-hover:scale-110"
  />
</button>
          )}
        </div>
      </div>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="fixed bottom-0 left-0 w-full border-[#c8c8c1] bg-white border-t flex justify-around items-center py-2 md:hidden z-50">

      
         <button
  onClick={() => setPage("gallery")}
  className={`p-3 rounded transition-all duration-300 group
    ${page === "gallery"
      ? "bg-gradient-to-r from-[#15304d] to-[#676b76] text-white scale-110 shadow-md"
      : "text-gray-500 hover:bg-gray-100 hover:scale-110"}
  `}
>
  <LayoutGrid
    size={22}
    className="transition-all duration-300 
               group-hover:rotate-90 group-hover:scale-110"
  />
</button>

        {isAdmin && (
          <button
  onClick={() => setPage("upload")}
  className={`p-3 rounded transition-all duration-300 group
    ${page === "upload"
      ? "bg-gradient-to-r from-[#15304d] to-[#676b76] text-white scale-110 shadow-md"
      : "text-gray-500 hover:bg-gray-100 hover:scale-110"}
  `}
>
  <Plus
    size={22}
    className="transition-all duration-300 group-hover:rotate-90"
  />
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
  className={`p-3 rounded transition-all duration-300 group flex items-center justify-center
    ${page === "login"
      ? "bg-gradient-to-r from-[#15304d] to-[#676b76] text-white scale-110"
      : "text-gray-500 hover:bg-gray-100 hover:scale-110"}
  `}
>
  <LogIn
    size={22}
    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
  />
</button>
        )}

        {isAdmin && (
          
<button
  onClick={handleLogout}
  className="p-3 rounded transition-all duration-300 group flex items-center justify-center
             text-gray-500 hover:bg-gray-100 hover:scale-110"
>
  <LogOut
    size={22}
    className="transition-transform duration-300 
               group-hover:-translate-x-1 group-hover:scale-110"
  />
</button>
        )}
      </div>
    </>
  );
}

export default Sidebar;