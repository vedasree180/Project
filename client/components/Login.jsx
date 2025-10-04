import { useState } from "react";
import { loginUser } from "./api";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await loginUser({ email, password });
    if (!res.error) {
      setUser(res.user);
      alert("Login successful!");
    } else {
      alert(res.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
