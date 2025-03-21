import { debounce } from "lodash";
import { useEffect, useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import NewsItem from "./NewsItem";
import SearchBar from "./SearchBar";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("publishedAt");

  const fetchNews = async (pageNum, search) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY; // Make sure this is defined in .env
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${pageNum}&pageSize=6&apiKey=${apiKey}`;

      if (search) url += `&q=${search}`;
      if (sortBy === "relevancy") url += `&sortBy=relevancy`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
      });

      if (response.status === 426) {
        throw new Error("426 Upgrade Required: Your API key may need an upgrade.");
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Error fetching news: ${err.message}`);
    }
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNews(page, searchTerm);

        setArticles((prevArticles) => {
          const newArticles = page === 1 ? data.articles : [...prevArticles, ...data.articles];
          return newArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        });

        setHasMore(data.articles.length > 0);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category, page, searchTerm, sortBy]);

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
    setPage(1);
    setArticles([]);
  }, 500);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setPage(1);
    setArticles([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <SearchBar onSearch={handleSearch} />
        <select
          className="border border-gray-300 px-4 py-2 rounded-md mt-2 md:mt-0 cursor-pointer"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="publishedAt">Latest First</option>
          <option value="relevancy">Most Relevant</option>
        </select>
      </div>

      <h2 className="text-4xl font-bold mb-4 text-gray-700">
        {category.charAt(0).toUpperCase() + category.slice(1)} News
      </h2>

      {error && (
        <div className="text-red-500 bg-red-100 p-3 rounded-md mb-4">
          ⚠️ {error}
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((news, index) => (
          <NewsItem
            key={`${news.url}-${index}`}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
            publishedAt={news.publishedAt}
          />
        ))}
      </div>

      {loading && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsBoard;
