import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";


function Register() {
   const { password , setPassword, email, setEmail, apiurl, isLoading, setIsLoading } = useContext(storeContext);
  const [showPassword, setShowPassword] = useState(false);

 const navigate = useNavigate();

   async function registerUser() {
  try {
    setIsLoading(true);
    const response = await fetch(`${apiurl}/user/register`, {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      setIsLoading(false);
      return;
    }

   toast.success("Registration successful. You can now login.");

   // Clear form fields
   setEmail("");
   setPassword("");

   // Redirect to login page
   navigate("/login");

    setIsLoading(false);
  } catch (error) {
    toast.error("Network error. Try Again.");
    console.log(error);
    setIsLoading(false);
  }
 }



  
  function submitHandler(e) {
    e.preventDefault(); // prevent from submitting the form
    registerUser(); // call the registerUser function
  } 

 function toggle() {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }

  
if (isLoading) {
  return <Spinner />
}


  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Register on our Todo App today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Register to start make a reservation for a Todo on our library.
          </p>

          
        <form
           onSubmit={submitHandler}
         className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
         >
     
            <p className="text-center text-lg font-medium">
              Create an account with us today
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gold-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />

                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                  onClick={toggle}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
              // className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200 px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-500">
              Have an account?{" "}
              <Link className="underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
    ); 
}
export default Register;