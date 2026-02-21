import api from "../api/axios";

export default function NotesList({ notes, refresh }) {

  const del = async(id)=>{
    await api.delete(`/notes/${id}`);
    refresh();
  };

  return (
    <div className="space-y-4">
      {notes.map(n=>(
        <div
          key={n._id}
          className="bg-white border-l-4 border-indigo-500 shadow-md rounded-lg p-4 flex justify-between"
        >
          <div>
            <h4 className="font-semibold text-lg text-gray-800">{n.title}</h4>
            <p className="text-gray-600">{n.content}</p>

            <p className="text-xs text-gray-400 mt-2">
              Posted by: <span className="font-medium">{n.owner?.username || "Unknown"}</span>
            </p>
          </div>

          <button
            onClick={()=>del(n._id)}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}