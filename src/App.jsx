import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("uploadfile", form.file);

    try {
      const res = await fetch(
        "http://localhost/backend/api/products.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.status === "success") {
        alert("Product Added ✔");
      } else {
        alert("Error ❌");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          onChange={handleChange}
        ></textarea>

        <input
          type="file"
          name="file"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button className="bg-black text-white p-2 w-full">
          Upload
        </button>
      </form>
    </div>
  );
}

export default App;