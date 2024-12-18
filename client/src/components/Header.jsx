import { FaSearch } from "react-icons/fa";
import { Link, NavLink , useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
         navigate(`/search?${searchQuery}`);
    }
//const urlParams = new URLSearchParams(window.location.search)  is used to extract query parameters from the current page's URL in JavaScript.

// window.location.search: This gives the query string part of the URL, including the ? symbol. For example, if the URL is
// http://example.com/page?name=John&age=30
// window.location.search will return:
// "?name=John&age=30"
// new URLSearchParams(): This constructor allows you to parse the query string and work with the parameters easily.

useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
   
    <header className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 text-white shadow-2xl">
    <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto p-4">
      <NavLink to="/" className="font-bold text-xl flex flex-wrap sm:mb-0 mb-4" end>
        <span className="text-sky-400">Gd</span>
        <span className="text-slate-200">-Groups</span>
      </NavLink>
      
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-2 rounded-full flex items-center shadow-lg shadow-gray-600 sm:block hidden sm:mr-4 w-full sm:w-auto mb-4 sm:mb-0"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent focus:outline-none w-full sm:w-64 px-3 text-white"
          aria-label="Search"
        />
        <button>
          <FaSearch className="text-white" />
        </button>
      </form>
  
      {/* Navigation Links */}
      <ul className="flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto sm:justify-start">
        <li>
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
        </li>
        <li>
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
        </li>
        <Link to="/profile">
          {currentUser ? (
            <img
              className="rounded-full h-10 w-10 object-cover"
              src={currentUser.avatar}
              alt="profile"
            />
          ) : (
            <li>
              <button className="text-lg text-white bg-slate-800 rounded-full px-4 py-1.5 outline outline-1 outline-blue-300 transition duration-300 hover:bg-blue-600 hover:outline-blue-400 focus:outline-none">
                Sign in
              </button>
            </li>
          )}
        </Link>
      </ul>
    </div>
  </header>
  

  );
}

export default Header;
