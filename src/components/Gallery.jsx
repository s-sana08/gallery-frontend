import { useEffect, useState } from "react";

import Search from "./Search";


function Gallery({ refresh, onDelete, isAdmin, search, isSearchPage, setSearch }) {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [liked, setLiked] = useState({});
  const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [loading, setLoading] = useState(true);
const [csrfToken, setCsrfToken] = useState("");



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

if (loading) {
  return <p className="text-center mt-10">Loading...</p>;
}

if (!loading && products.length === 0) {
  return <p className="text-center">No products found</p>;
}
  const toggleLike = (id) => {
  setLiked((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};
const filteredProducts = products.filter((p) => {
  const terms = search.toLowerCase().split(" ");

  return terms.every((term) =>
    (p.name + p.description + p.price)
      .toLowerCase()
      .includes(term)
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
    onDelete();            
  } else {
    alert("Update failed ❌");
    console.log("UPDATE RESPONSE:", data);
  }
};
 

  return (
   <div className="min-h-screen ">



  <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-5 space-y-5 ">
  



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
          <h3 className="font-semibold text-lg">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-black">
              ₹{product.price}
            </span>
            <button
                onClick={() => toggleLike(product.id)}
                className={`text-xl transition ${
                    liked[product.id] ? "text-red-500 scale-110" : "text-gray-400"
                }`}
                >
                ♥
                </button>

            {isAdmin && (
  <>
    <button
      onClick={() => setEditProduct(product)}
      className="text-blue-500 text-sm"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(product.id)}
      className="text-red-500 text-sm"
    >
      Delete
    </button>
  </>
)}
          </div>
        </div>

      </div>

    ))}

   

    {editProduct && isAdmin && (
  <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">

    <div className="bg-white p-5 rounded w-96">

      <h2 className="text-lg font-bold mb-3">Edit Product</h2>

      <input
        value={editProduct.name}
        onChange={(e) =>
          setEditProduct({ ...editProduct, name: e.target.value })
        }
        className="border p-2 w-full mb-2"
      />

      <input
        value={editProduct.price}
        onChange={(e) =>
          setEditProduct({ ...editProduct, price: e.target.value })
        }
        className="border p-2 w-full mb-2"
      />

      <textarea
        value={editProduct.description}
        onChange={(e) =>
          setEditProduct({
            ...editProduct,
            description: e.target.value,
          })
        }
        className="border p-2 w-full mb-2"
      />

      <input
        type="file"
        onChange={(e) =>
            setEditProduct({
            ...editProduct,
            file: e.target.files[0],
            })
        }
        className="border p-2 w-full mb-2"
        />

      <button
  type="button"   
  onClick={() => handleUpdate(editProduct)}
  className="bg-black text-white px-3 py-1"
>
  Save
</button>

      <button
        onClick={() => setEditProduct(null)}
        className="ml-2 text-red-500"
      >
        Cancel
      </button>

    </div>
  </div>
)}
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