import { useEffect, useState } from "react";
import Search from "./Search";
import { motion } from "framer-motion";
import { X } from "lucide-react";

function Gallery({ refresh, onDelete, isAdmin, search, isSearchPage, setSearch }) {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [liked, setLiked] = useState({});
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState("");

  // ✅ NEW (edit preview)
  const [editPreview, setEditPreview] = useState(null);
  const [editFileName, setEditFileName] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost/backend/api/csrf.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((csrfData) => {
        setCsrfToken(csrfData.csrf_token);

        return fetch("http://localhost/backend/api/products.php", {
          credentials: "include",
        });
      })
      .then((res) => res.json())
      .then((productData) => {
        setProducts(productData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refresh]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!loading && products.length === 0)
    return <p className="text-center">No products found</p>;

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProducts = products.filter((p) => {
    const terms = search.toLowerCase().split(" ");
    return terms.every((term) =>
      (p.name + p.description + p.price).toLowerCase().includes(term)
    );
  });

  const handleDelete = async (id) => {
    if (!csrfToken) {
      alert("Security token not ready ❌");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("delete", true);
    formData.append("csrf_token", csrfToken);

    const res = await fetch(
      "http://localhost/backend/api/products.php",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data.status === "csrf_invalid") {
      alert("Security error ❌");
      return;
    }

    if (data.status === "deleted") {
      alert("Deleted ✔");
      onDelete();
    }
  };

  const handleUpdate = async (product) => {
    if (!csrfToken) {
      alert("Security token not ready ❌");
      return;
    }

    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("update", true);
    formData.append("csrf_token", csrfToken);

    if (product.file) {
      formData.append("uploadfile", product.file);
    }

    const res = await fetch(
      "http://localhost/backend/api/products.php",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data.status === "csrf_invalid") {
      alert("Security error ❌");
      return;
    }

    if (data.status === "updated") {
      alert("Updated ✔");
      setEditProduct(null);
      setEditPreview(null);
      setEditFileName("");
      onDelete();
    } else {
      alert("Update failed ❌");
    }
  };

  // ✅ handle edit file
  const handleEditFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEditProduct({ ...editProduct, file });
      setEditPreview(URL.createObjectURL(file));
      setEditFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen p-6 pb-20 md:pt-0 pt-6">

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-5 space-y-5">

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="break-inside-avoid bg-white rounded-2xl shadow hover:shadow-xl transition duration-300"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                onClick={() =>
                  setSelectedImage(`http://localhost/backend/public/${product.image}`)
                }
                src={`http://localhost/backend/public/${product.image}`}
                className="cursor-pointer"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>

              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-black">₹{product.price}</span>
                <button
                  onClick={() => toggleLike(product.id)}
                  className={`text-xl transition-all duration-300
    ${liked[product.id]
                      ? "text-red-500 scale-125 animate-bounce"
                      : "text-gray-400"}
  `}
                >
                  ♥
                </button>

                {isAdmin && (
                  <>
                    <button
                      onClick={() => setEditProduct(product)}
                      className="relative text-blue-500 text-sm group"
                    >
                      Edit
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 text-sm transition-all duration-300
             hover:text-red-700 hover:animate-[wiggle_0.3s_ease-in-out]"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ✅ EDIT MODAL */}
        {editProduct && isAdmin && (
          <div className="fixed top-0  left-0 w-full h-full bg-black/50 flex justify-center items-center px-6">

            <div className="login-card bg-white p-5 rounded w-96 relative">

              <button
                onClick={() => setEditProduct(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full 
             bg-gray-100 flex items-center justify-center 
             transition-all duration-300 group hover:bg-red-100 hover:scale-110"
              >
                <span className="absolute w-5 h-[2px] bg-gray-700 rotate-45 
                   transition-all duration-300 
                   group-hover:bg-red-500 group-hover:rotate-[135deg]" />

                <span className="absolute w-5 h-[2px] bg-gray-700 -rotate-45 
                   transition-all duration-300 
                   group-hover:bg-red-500 group-hover:-rotate-[135deg]" />
              </button>

              <h1 className="txt-style font-bold text-center mb-6 bg-linear-to-r from-[#0d253f] to-[#686b74] 
          bg-clip-text text-transparent">
                Edit Product
              </h1>
              <input
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                className="i-form border p-2 w-full mb-2"
              />

              <input
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
                className="i-form border p-2 w-full mb-2"
              />

              <textarea
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
                className="i-form border p-2 w-full mb-2"
              />

              {/* ✅ Upload + Preview */}
              <div className="flex items-center gap-4 mb-2">

                <label className="cursor-pointer bg-linear-to-r from-[#15304d] to-[#676b76] text-white px-4 py-2 rounded">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditFile}
                    className="hidden"
                  />
                </label>

                <div className="w-50 h-50  rounded overflow-hidden flex items-center justify-center">
                  {editPreview ? (
                    <img src={editPreview} className="w-full h-full object-contain" />
                  ) : (
                    <img
                      src={`http://localhost/backend/public/${editProduct.image}`}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

              </div>

              {editFileName && (
                <p className="text-xs text-gray-500 mb-2">{editFileName}</p>
              )}

              <button
                onClick={() => handleUpdate(editProduct)}
                className="btn-design bg-[linear-gradient(90deg,rgba(21,48,77,1)_0%,rgba(103,107,118,1)_100%)] text-white w-full py-2 rounded"
              >
                Update
              </button>
            </div>


          </div>
        )}

        {/* Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center"
          >
            <img src={selectedImage} className="max-h-[90%] rounded" />
          </div>
        )}

      </div>
    </div>
  );
}

export default Gallery;