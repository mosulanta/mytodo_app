import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/storeContext";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";

function Todo() {
  const { id } = useParams();

  // ✅ FIX: use correct variable name (apiurl)
  const { apiurl, token, setIsLoading, isLoading } =
    useContext(storeContext);

  const [todo, setTodo] = useState(null);

  useEffect(() => {
    getSingleTodo();
  }, []);

 async function getSingleTodo() {
  try {
    setIsLoading(true);

    const response = await fetch(`${apiurl}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json(); // ✅ no need for text + parse

    if (!response.ok) {
      toast.error(data.message || "Error fetching todo");
      return;
    }

    // ✅ ADD THIS LINE (THIS IS YOUR MAIN PROBLEM)
    toast.success(data.message || "Todo fetched successfully");

    // ✅ FIX DATA
    setTodo(data.todo || data);

  } catch (error) {
    console.log(error);
    toast.error("Error fetching todo");
  } finally {
    setIsLoading(false);
  }
}

  // loading state
  if (isLoading) {
    return <Spinner />;
  }

  // no todo found
  if (!todo) return <p className="text-center mt-10">Todo not found</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">{todo.title}</h1>

      <p className="text-lg mb-4">{todo.description}</p>

      <div className="mt-6 space-y-2">
        <p className="text-gray-600">Author: {todo.author}</p>
        <p className="text-gray-600">
          Price: ₦{todo.priceRequest}
        </p>
        <p className="text-gray-600">
          Category: {todo.category?.name}
        </p>
          <div className="mt-12 lg:mt-0 lg:col-start-2 lg:row-start-1">
        <img
          src="https://picsum.photos/500/300"
          alt="Todo cover"
          className="w-full h-full object-cover object-center"
        />
      </div>
      </div>
    </div>
  );
}

export default Todo;