import DeleteButton from "@/components/DeleteButton/AnimeDelete";
import Link from "next/link";

const page = async () => {
  const res = await fetch("https://anizen-server.onrender.com/api/all-anime", {
    next: { revalidate: 10 },
  });
  const animeData = await res.json();
  return (
    <div className="anime-management-container p-4">
      <h1 className="text-center text-2xl font-bold mb-6">Manage Anime</h1>

      {/* Anime Table/List */}
      <div className="anime-list overflow-x-auto">
        <table className="min-w-full table-auto text-left  border border-gray-200 rounded-lg shadow-md">
          <thead className="">
            <tr>
              <th className="px-4 py-2">Anime Title</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {animeData?.map((anime) => (
              <tr key={anime._id} className="border-t">
                <td className="px-4 py-2 text-sm md:text-md">{anime.title}</td>
                <td className="px-4 py-2">
                  <Link href={`/admin/update-anime/${anime._id}`}>
                    <button className="text-sm md:text-md edit-btn bg-blue-500 text-white px-4  py-1 md:py-2 rounded mr-2">
                      Edit
                    </button>
                  </Link>
                  <DeleteButton animeId={anime._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
