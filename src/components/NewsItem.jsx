import { motion } from "framer-motion";
import { Bookmark, Clock, Share2 } from "lucide-react";
import { useState } from "react";
import defaultImage from "../assets/image.png";

const NewsItem = ({ title, description, src, url, publishedAt }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = defaultImage;
    e.target.onerror = null;
  };

  const truncateText = (text, maxLength) =>
    text ? (text.length > maxLength ? text.substring(0, maxLength) + "..." : text) : "No description available";

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text?.split(/\s+/)?.length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleShare = async () => {
    if (!navigator.share) return;
    
    setIsSharing(true);
    try {
      await navigator.share({ title, text: description, url });
    } catch (err) {
      console.error("Error sharing:", err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.article
      className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transition-transform"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={imageError ? defaultImage : src || defaultImage}
          alt={title || "News image"}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">
          {truncateText(title, 80)}
        </h3>

        <p className="text-sm text-gray-300 mb-4">{truncateText(description, 150)}</p>

        <div className="flex justify-between text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {calculateReadingTime(description)} min read
          </span>
          <time>{new Date(publishedAt).toLocaleDateString()}</time>
        </div>

        <div className="flex justify-between items-center">
          <a
            href={url}
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>

          <div className="flex gap-2">
            <motion.button
              className="p-2 rounded-full hover:bg-gray-700 transition"
              onClick={() => setIsSaved((prev) => !prev)}
              aria-label={isSaved ? "Remove bookmark" : "Add bookmark"}
              animate={{ color: isSaved ? "#FACC15" : "#9CA3AF" }}
              transition={{ duration: 0.3 }}
            >
              <Bookmark size={16} />
            </motion.button>

            <motion.button
              className="p-2 rounded-full hover:bg-gray-700 transition"
              onClick={handleShare}
              aria-label="Share article"
              disabled={isSharing}
              title={isSharing ? "Sharing..." : "Share this article"}
              animate={{ opacity: isSharing ? 0.5 : 1 }}
            >
              <Share2 size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsItem;
