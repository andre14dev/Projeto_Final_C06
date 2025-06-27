import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Enviando login:", email, password); // <-- Aqui!
      
      const response = await axios.post("http://localhost:3001/login", {
        username: email,
        password: password,
      });

      console.log(response.data);
      setUser(response.data);
      navigate("/device");

    } catch (error) {
      if (!error?.response) {
        setError("Erro ao acessar o servidor");
      } else if (error.response.status === 400 || error.response.status === 401) {
        setError("Usuário ou senha inválidos");
      } else {
        setError("Erro inesperado");
      }
    }
  };



  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-lg rounded-2xl">
      {user == null ? (
        <div>
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="w-64 h-86" />
          </div>
          <p className="text-xs font-semibold text-center mb-2 text-gray-600">
            Olá! Insira suas credenciais para continuar ...
          </p>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Login
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-center font-semibold mt-4">
              {error}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Login;
