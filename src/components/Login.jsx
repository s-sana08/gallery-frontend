import { useState } from "react";

function Login({ setPage, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const res = await fetch(
    "http://localhost/backend/api/login.php",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (data.status === "success") {
    localStorage.setItem("role", data.role); // frontend control
    alert("Login Success ✔");
    setRole(data.role);
    setPage("gallery");
  } else {
    alert("Invalid login ❌");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-80">

        <h2 className="text-xl font-bold text-center mb-4">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;