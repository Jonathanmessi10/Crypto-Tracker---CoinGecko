import { useEffect, useState } from "react";
import axios from "axios";

 function useFetchCoinSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don’t trigger for short queries
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${query}`
        );

        setSuggestions(data.coins.slice(0, 6)); // Limit to 6 suggestions
      } catch (err) {
        console.error("Coin search error:", err);
        setError("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCoins, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  return {
    query,
    setQuery,
    suggestions,
    loading,
    error,
  };
}

export default useFetchCoinSearch;
