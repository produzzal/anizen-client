"use client";

import { toast, ToastContainer } from "react-toastify";

const DeleteButton = ({ animeId }) => {
  const handleDelete = async () => {
    if (!animeId) return toast.error("Invalid anime ID!");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this anime?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://anizen-server.onrender.com/api/anime/${animeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Anime deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Failed to delete anime.");
      }
    } catch (error) {
      console.error("Error deleting anime:", error);
      toast.error("An error occurred while deleting anime.");
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="text-sm md:text-md delete-btn bg-red-500 mt-1 text-white px-4 py-1 md:py-2 rounded"
      >
        Delete
      </button>
      <ToastContainer />
    </div>
  );
};

export default DeleteButton;
