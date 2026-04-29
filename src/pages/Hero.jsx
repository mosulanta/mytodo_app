import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden max-w-5xl w-full">

        {/* LEFT SIDE */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Manage Your Tasks Easily
          </h1>

          <p className="text-lg text-indigo-100">
            Stay organized, track progress, and boost your productivity with your personal todo manager.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Welcome to TodoApp
          </h2>

          <p className="text-gray-500 mb-6">
            Login or create an account to start managing your tasks.
          </p>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Hero;