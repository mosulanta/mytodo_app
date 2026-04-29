
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";

  
  function Dashboard() {
    const { token, apiurl, todos, getAlltodos, isLoading, setIsLoading } =
      useContext(storeContext);
  
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [todoId, setTodoId] = useState("");
  
    function clearForm() {
      setTitle("");
      setPrice("");
      setDescription("");
      setAuthor("");
      setCategoryId("");
      setTodoId("");
      setEditMode(false);
    }
  
    async function createTodo() {
  try {
    setIsLoading(true);

    const res = await fetch(`${apiurl}/todos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        priceRequest: Number(price),
        description,
        author,
        categoryId: Number(categoryId),
      }),
    });

    const data = await res.json();

    
    if (!res.ok) {
      toast.error(data.message || "Something went wrong");
      return;
    }

    
    toast.success("Todo created");
    clearForm();
    getAlltodos();

  } catch (err) {
    console.log(err);
    toast.error("Error creating todo");
  } finally {
    setIsLoading(false);
  }
}
    
    async function updateTodo(e) {
      e.preventDefault();
  
      try {
        setIsLoading(true);
  
        const res = await fetch(`${apiurl}/todos/${todoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            priceRequest: Number(price),
            description,
            author,
            categoryId: Number(categoryId),
          }),
        });
  
        const data = await res.json();
  
        if (!res.ok) return toast.error(data.message);
  
        toast.success("Todo Updated successfully");
        clearForm();
        getAlltodos();
      } catch (err) {
        toast.error("Error updating todo");
      } finally {
        setIsLoading(false);
      }
    }
  
    
    async function deleteTodo(id) {
      if (!window.confirm("Delete this todo?")) return;
  
      try {
        setIsLoading(true);
  
        const res = await fetch(`${apiurl}/todos/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
  
        if (!res.ok) return toast.error(data.message);
  
        toast.success("Todo deleted successfully");
        getAlltodos();
      } catch (err) {
        toast.error("Error deleting todo");
      } finally {
        setIsLoading(false);
      }
    }
  
    function submitHandler(e) {
      e.preventDefault();
      createTodo();
    }
  
    useEffect(() => {
      getAlltodos();
    }, []);
  
    if (isLoading) return <Spinner />;
  
    
  
  
  
  
  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <form
        className="bg-white shadow-md mt-14 rounded px-8 pt-6 pb-8 mb-4 mx-auto w-1/2"
        onSubmit={editMode ? updateTodo : submitHandler}
      >
        <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Enter price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            placeholder="Enter author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            >
            <option value="">Select category</option>
            <option value="11">Home</option>
            <option value="12">Work</option>
            <option value="13">Personal</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className={
              editMode
                ? "text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            }
            type="submit"
          >
            {editMode ? "Update Todo" : "Add Todo"}
          </button>
        </div>
      </form>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-4">Todo List</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                key={todo.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-6">{todo.title}</td>
                <td className="py-4 px-6">{todo.priceRequest}</td>
                <td className="py-4 px-6">
                  <Link
                    to={`/todo/${todo.id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                  >
                    View more
                  </Link>

                  <button
                    onClick={() => {
                      setEditMode(true);
                        setTitle(todo.title);
                        setPrice(todo.priceRequest);
                        setDescription(todo.description);
                        setAuthor(todo.author);
                        setCategoryId(todo.categoryId);
                        setTodoId(todo.id);
                    }}
                    type="button"
                    className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Dashboard;