import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const storeContext = createContext();

function StoreProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // ✅ ADD THIS (VERY IMPORTANT)
  const [todos, setTodos] = useState([]);

  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // ✅ AUTO LOGIN CHECK
  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (!localToken) {
      setIsAuth(false);
      return;
    }

    try {
      const decoded = jwtDecode(localToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        setIsAuth(false);
        localStorage.removeItem("token");
      } else {
        setIsAuth(true);
      }
    } catch (error) {
      console.log("Invalid Token:", error);
    }
  }, []);

  // ✅ ADD THIS FUNCTION (CRITICAL)
  async function getAlltodos() {
    try {
      setIsLoading(true);

      const res = await fetch(`${apiurl}/todos/alltodos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("TODOS:", data);

      // handle both formats
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        setTodos(data.todos || []);
      }
    } catch (err) {
      console.log(err);
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  }

  const contextObj = {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    isAuth,
    setIsAuth,
    apiurl,
    todos,
    setTodos,
    getAlltodos,
    token,
  };

  return (
    <storeContext.Provider value={contextObj}>
      {children}
    </storeContext.Provider>
  );
}

export default StoreProvider;