import { FaSearch } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

function Header() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <header className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 text-white shadow-2xl">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
                <NavLink
                    to="/"
                    className="font-bold text-xl flex flex-wrap"
                    end
                >
                    <span className="text-sky-400">Gd</span>
                    <span className="text-slate-200">-Groups</span>
                </NavLink>
                <form className="bg-gray-800 p-2 rounded-full flex items-center shadow-lg shadow-gray-600">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-24 sm:w-64 px-3 text-white"
                        aria-label="Search"
                    />
                    <FaSearch className="text-white" />
                </form>
                <ul className="flex gap-6 items-center">
                    <li>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-lg text-slate-200 border-b-2 border-sky-400 pb-2 transition duration-300'
                                    : 'text-lg text-slate-200 hover:text-sky-400 transition duration-300'
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
                                    ? 'text-lg text-slate-200 border-b-2 border-sky-400 pb-2 transition duration-300'
                                    : 'text-lg text-slate-200 hover:text-sky-400 transition duration-300'
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
                                <button
                                    className="text-lg text-white bg-slate-800 rounded-full px-4 py-1.5 outline outline-1 outline-blue-300 transition duration-300 hover:bg-blue-600 hover:outline-blue-400 focus:outline-none"
                                >
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
