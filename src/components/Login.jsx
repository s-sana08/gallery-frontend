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
      credentials: "include",
    }
  );

  const data = await res.json();

  if (data.status === "success") {
  localStorage.setItem("role", data.role);

  setRole(data.role);
 if (data.role === "admin") {
    setRole("admin");   
  }
  setTimeout(() => {
    setPage("gallery");
  }, 200);

  alert("Login Success ✔");
}else {
    alert("Invalid login ❌");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="login-card mx-5 bg-white p-6 rounded-xl shadow-[0_3px_8px_rgba(0,0,0,0.24)] w-80">

        <h1 className="txt-style font-bold text-center mb-6 bg-linear-to-r from-[#0d253f] to-[#686b74] 
          bg-clip-text text-transparent">
          Log In
        </h1>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="i-form border p-2 w-full mb-5 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="i-form border p-2 w-full mb-5 rounded"
        />

        <button
          onClick={handleLogin}
          className="btn-design bg-[linear-gradient(90deg,rgba(21,48,77,1)_0%,rgba(103,107,118,1)_100%)] text-white w-full py-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;