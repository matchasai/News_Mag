import { useContext, useState } from "react";
import Navbar from "./components/Navbar";
import NewsBoard from "./components/NewsBoard";
import { ThemeContext } from "./components/ThemeProvider"; // ✅ Import ThemeContext

const App = () => {
  const [category, setCategory] = useState("general");
  const { isDark } = useContext(ThemeContext); // ✅ Get theme state

  return (
    <div className={`${isDark ? "dark" : ""} app-wrapper`}>
      <Navbar setCategory={setCategory} />
      <NewsBoard category={category} />
    </div>
  );
};

export default App;
