import { useEffect, useState } from "react";

function Upload({ onUpload, goToGallery }) {

  const [fileName, setFileName] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [preview, setPreview] = useState(null);
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
      const file = e.target.files[0];
      setForm({ ...form, file });

      if (file) {
        setPreview(URL.createObjectURL(file)); // ✅ preview set
        setFileName(file.name);
      }
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
   <div className="min-h-screen flex items-center justify-center">

  <form
  onSubmit={handleSubmit}
  className="login-card  mx-5  bg-white p-6 rounded-xl shadow w-full max-w-md shadow-[0_3px_8px_rgba(0,0,0,0.24)] space-y-4"
>

  <h1 className="txt-style font-bold text-center mb-6 bg-linear-to-r from-[#0d253f] to-[#686b74] 
          bg-clip-text text-transparent">
          Add Product
        </h1>

  <input
    name="name"
    value={form.name}
    onChange={handleChange}
    className="i-form border p-2 w-full rounded"
    placeholder="Name"
  />

  <input
    name="price"
    value={form.price}
    onChange={handleChange}
    className="i-form border p-2 w-full rounded"
    placeholder="Price"
  />

  <textarea
    name="description"
    value={form.description}
    onChange={handleChange}
    className="i-form border p-2 w-full rounded"
    placeholder="Description"
  />
 <div className="flex items-center gap-4">

          <label className="cursor-pointer bg-linear-to-r from-[#15304d] to-[#676b76] text-white px-4 py-2 rounded">
            Upload File
            <input
              name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {/* Preview box */}
          <div className="w-20 h-20 rounded flex items-center justify-center overflow-hidden">
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-contain" />
            ) : (
              <span className="text-xs "></span>
            )}
          </div>

        </div>

        {/* File name (optional) */}
        {fileName && (
          <p className="text-xs text-gray-500">{fileName}</p>
        )}
  <button
    type="submit"
     className="btn-design bg-[linear-gradient(90deg,rgba(21,48,77,1)_0%,rgba(103,107,118,1)_100%)] text-white w-full py-2 rounded">
    Upload
  </button>

</form>
</div>
  );
}

export default Upload;