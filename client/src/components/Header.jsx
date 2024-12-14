import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-slate-100 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-slate-500">Gd</span>
                        <span className="text-slate-700">-Groups</span>
                    </h1>
                </Link>
                <form className="bg-sky-50 p-2 rounded-full flex items-center shadow-md shadow-gray-400">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-24 sm:w-64 px-3"
                        aria-label="Search"
                    />
                    <FaSearch className="text-slate-600" />
                </form>
                <ul className="flex gap-6 items-center">
                    <li>
                        <Link to="/" className="hidden sm:inline text-lg text-slate-700 hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hidden sm:inline text-lg text-slate-700 hover:underline">About</Link>
                    </li>
                    <li>
                        <button 
                            className="text-lg text-white bg-blue-500 rounded-full px-4 py-1.5 outline outline-1 outline-blue-300 transition duration-300 hover:bg-blue-600 hover:outline-blue-400 focus:outline-none">
                            Sign in
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
