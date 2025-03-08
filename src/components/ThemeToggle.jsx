import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider.jsx";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-90"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span
        className="transition-transform duration-300 ease-in-out flex items-center justify-center"
        style={{ transform: `rotate(${isDark ? "180deg" : "0deg"})` }}
      >
        {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-400" />}
      </span>
    </button>
  );
};

export default ThemeToggle;
