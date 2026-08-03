import { useEffect, useState } from "react";

function Upload({ onUpload, goToGallery }) {


  const [csrfToken, setCsrfToken] = useState("");
  
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    file: null,
  });

  useEffect(() => {
  fetch("http://localhost/backend/api/csrf.php", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => setCsrfToken(data.csrf_token));
}, []);


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
    formData.append("csrf_token", csrfToken);

    try {
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

if (data.status === "success") {
  alert("Product Added ✔");
   onUpload();     
  goToGallery();   
} else {
  alert("Error ❌");
}
    } catch (err) {
      console.log(err);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">

  <form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4"
>

  <h2 className="text-xl font-bold text-center">
    Add Product
  </h2>

  <input
    name="name"
    value={form.name}
    onChange={handleChange}
    className="border p-2 w-full rounded"
    placeholder="Name"
  />

  <input
    name="price"
    value={form.price}
    onChange={handleChange}
    className="border p-2 w-full rounded"
    placeholder="Price"
  />

  <textarea
    name="description"
    value={form.description}
    onChange={handleChange}
    className="border p-2 w-full rounded"
    placeholder="Description"
  />

  <input
    name="file"
    type="file"
    onChange={handleChange}
    className="w-full"
  />

  <button
    type="submit"
    className="bg-black text-white w-full py-2 rounded"
  >
    Upload
  </button>

</form>
</div>
  );
}

export default Upload;