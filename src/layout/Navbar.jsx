//Navbar

import { useState ,  useContext} from "react"
import { Link, NavLink } from "react-router-dom"
import { storeContext } from "../context/storeContext";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
     const {isAuth} = useContext(storeContext);
  

    const toggleMenu = () => {
      if (isOpen) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };


  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <img
            // src="https://flowbite.com/docs/images/logo.svg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOUlsksuQqYKUXe33FGh71X2Nbj85nG8WBw&s"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            TodoApp
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li className="p-2">
              <Link to="/" className="text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white">
                Home
              </Link>
            </li>
            {isAuth ? (<>
            <li className="p-2">
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white">
                Dashboard
              </Link>
            </li>
            <li className="p-2">
              <Link to="/signout" className="text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white">
                Signout
              </Link>
            </li>
            </>):(<>
            <li className="p-2">
              <Link to="/login" className="text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white">
                Login
              </Link>
            </li>
            <li className="p-2">
              <Link to="/register" className="text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white">
                Register
              </Link>
            </li>
            </>)}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar