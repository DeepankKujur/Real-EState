import { FaSearch } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 text-white shadow-2xl">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <NavLink to="/" className="font-bold text-xl flex items-center" end>
          <span className="text-sky-400">Gd</span>
          <span className="text-slate-200">-Groups</span>
        </NavLink>

        {/* Hamburger Icon for Mobile */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-6">
          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-2 rounded-full flex items-center shadow-lg shadow-gray-600"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-64 px-3 text-white"
              aria-label="Search"
            />
            <button>
              <FaSearch className="text-white" />
            </button>
          </form>

          {/* Nav Links */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-lg text-slate-200 border-b-2 border-sky-400 pb-2 transition duration-300"
                : "text-lg text-slate-200 hover:text-sky-400 transition duration-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-lg text-slate-200 border-b-2 border-sky-400 pb-2 transition duration-300"
                : "text-lg text-slate-200 hover:text-sky-400 transition duration-300"
            }
          >
            About
          </NavLink>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <button className="text-lg text-white bg-slate-800 rounded-full px-4 py-1.5 outline outline-1 outline-blue-300 hover:bg-blue-600">
                Sign in
              </button>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-4 bg-gray-800 text-white">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-700 p-2 rounded-full flex items-center shadow"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full px-3 text-white"
            />
            <button>
              <FaSearch className="text-white" />
            </button>
          </form>

          <NavLink
            to="/"
            end
            className="text-lg text-slate-200 hover:text-sky-400"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-lg text-slate-200 hover:text-sky-400"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <button className="text-lg text-white bg-slate-800 rounded-full px-4 py-1.5 outline outline-1 outline-blue-300 hover:bg-blue-600">
                Sign in
              </button>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
