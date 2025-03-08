import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const Navbar = ({ setCategory }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="bg-gray-900 text-white shadow-lg py-4 px-6 flex items-center justify-between fixed top-0 w-full z-50">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">NewsApp</div>

      {/* Navigation Links */}
      <div className="flex gap-6 text-lg">
        {["General", "Business", "Entertainment", "Health", "Science", "Sports", "Technology"].map((category) => (
          <button
            key={category}
            className="hover:text-blue-400 transition duration-300"
            onClick={() => setCategory(category.toLowerCase())}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-white shadow-md border border-gray-500"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={24} className="text-yellow-400 transition-transform duration-300 rotate-180" /> : <Moon size={24} className="text-blue-400 transition-transform duration-300 rotate-0" />}
      </button>
    </nav>
  );
};

export default Navbar;
