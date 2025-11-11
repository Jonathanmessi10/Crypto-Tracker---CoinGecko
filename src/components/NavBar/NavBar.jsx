import { useNavigate } from "react-router-dom";
import { useState } from "react";
import currencyStore from "../../state/store";
import useFetchCoinSearch from "../../hooks/useFetchCoinSearch";

function NavBar() {
  const { setCurrency } = currencyStore();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const { query, setQuery, suggestions, loading, error } = useFetchCoinSearch();

  function goToHome() {
    navigate("/");
  }

  function handleSelectSuggestion(coinId) {
    navigate(`/details/${coinId}`);
    setQuery("");
    setSearchOpen(false);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/details/${query.trim().toLowerCase()}`);
    setQuery("");
    setSearchOpen(false);
  }

  return (
    <div className="navbar bg-base-100 px-5 shadow-md">
      {/* LEFT: Currency Switch */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><button onClick={() => setCurrency("inr")}>INR ₹</button></li>
            <li><button onClick={() => setCurrency("usd")}>USD $</button></li>
          </ul>
        </div>
      </div>

      {/* CENTER: Logo */}
      <div onClick={goToHome} className="navbar-center cursor-pointer">
        <a className="btn btn-ghost text-xl">Crypto Tracker</a>
      </div>

      {/* RIGHT: Search */}
      <div className="navbar-end relative">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setSearchOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {searchOpen && (
          <div className="absolute top-12 right-0 bg-base-200 rounded-lg p-3 shadow-lg w-64 z-50">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search coin..."
                className="input input-bordered input-sm w-full"
              />
              <button type="submit" className="btn btn-sm btn-primary">
                Go
              </button>
            </form>

            {loading && <p className="text-sm text-gray-400 mt-2">Searching...</p>}
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            {!loading && suggestions.length > 0 && (
              <ul className="mt-2 bg-base-100 rounded-lg shadow-inner">
                {suggestions.map((coin) => (
                  <li
                    key={coin.id}
                    onClick={() => handleSelectSuggestion(coin.id)}
                    className="flex items-center gap-2 p-2 hover:bg-base-300 cursor-pointer rounded-md"
                  >
                    <img src={coin.thumb} alt={coin.name} className="w-5 h-5" />
                    <span className="text-sm">
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {!loading && query.length >= 3 && suggestions.length === 0 && (
              <p className="text-sm text-gray-400 mt-2">No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
