import React, { useState, createContext, useContext } from "react";
import { Sun, Moon, LogIn, LogOut, User } from "lucide-react";

// Theme Context
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"} min-h-screen transition-all duration-300`}>        
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);

// User Context
const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (name, email) => {
    setUser({ name, email });
  };
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
const useUser = () => useContext(UserContext);

// Components
const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button 
      onClick={toggleTheme} 
      className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
    >
      {theme === "light" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-white" />} 
      <span>Toggle Theme</span>
    </button>
  );
};

const UserProfile = () => {
  const { user, logout } = useUser();
  return user ? (
    <div className="flex items-center space-x-4 border p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <User className="w-6 h-6 text-black dark:text-white" />
      <p className="text-lg text-black dark:text-white">{user.name} ({user.email})</p>
      <button 
        onClick={logout} 
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-center">Logout</span>
      </button>
    </div>
  ) : (
    <p className="text-gray-500">Please log in.</p>
  );
};

const Login = () => {
  const { user, login } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { theme } = useTheme();
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
  };

  const handleLogin = () => {
    if (!name.trim() || !email.trim()) {
      setError("Both fields are required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    login(name, email);
    setName("");
    setEmail("");
    setError(""); // Clear errors on success
  };

  return !user ? (
    <div className="border p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 flex flex-col space-y-2">
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className={`p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}
      />
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className={`p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button 
        onClick={handleLogin} 
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
      >
        <LogIn className="w-5 h-5" />
        <span className="text-center">Log In</span>
      </button>
    </div>
  ) : null;
};


const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="p-6 space-y-6 flex flex-col items-center justify-center min-h-screen">
          <ThemeToggler />
          <UserProfile />
          <Login />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
