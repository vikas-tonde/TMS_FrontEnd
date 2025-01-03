import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "./api";
import axios from "axios";
let AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const signin = async (values, actions) => {
    try {
      const response = await api.post(`/api/users/login`, values);
      const { data } = response.data;

      actions.resetForm();

      if (!data?.user) {
        setUser(null);
        navigate("/login", {
          replace: true,
          state: "Login failed. Check username or password.",
        });
        return;
      }

      setUser(data.user);

      const targetPath =
        data.user.role.name === "Admin"
          ? location.state?.from?.pathname || "/dashboard"
          : "/trainee";

      navigate(targetPath, { replace: true, state: "Login successful!" });
    } catch (error) {
      console.error("Login Error:", error);
      navigate("/login", { state: "An error occurred. Try again.", replace: true });
    }
  };

  const signout = async () => {
    try {
      await api.get(`/api/users/sign-out`);
      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Signout Error:", error);
      setUser(null);
      navigate("/", { replace: true });
    }
  };

  const value = { user, signin, signout, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
    const auth = useAuth();
    const navigate = useNavigate();
    const verifyUser = async () => {
      try {
        const response = await api.get("/api/users/");
        const { data } = response.data;
        auth.setUser(data.user);
      } catch (error) {
        navigate("/login", {
          state: "Please login again.",
          replace: true,
        });
      }
    };
    useEffect(() => {
      if (!auth.user) {
        verifyUser();
      }
    }, [auth, navigate]);
  
    if (!auth.user) {
      return null; // Render nothing while verifying user
    }
  
    return children;
  }

