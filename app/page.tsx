"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "./apis/axiosClient";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let response = await axiosClient.post("/login", {
        account_id: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/account");
    } catch (error: any) {
      if (error.response) {
        // Server trả về lỗi HTTP
        console.log("Error response:", error.response.data);
      } else {
        console.log("Error:", error.message);
      }
      return null;
    }
    // if(response.status ==)

    // // Gọi API login (giả lập)
    // if (username === "admin" && password === "123456") {
    //   localStorage.setItem("token", "fake-jwt-token");
    //   router.push("/dashboard");
    // } else {
    //   setError("Sai username hoặc password");
    // }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
