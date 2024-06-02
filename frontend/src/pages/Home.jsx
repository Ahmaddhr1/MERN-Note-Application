import { useContext, useEffect, useState } from "react";
import { Usercontext } from "../App";
import { Link, useParams,Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import SearchIcon from "../../imgs/search.png";
import notFound from "../../imgs/no-results.png";
import Loading2 from "../components/Loading2";

const Home = () => {
  const { userAuth } = useContext(Usercontext);
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchNotes = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_ROUTE}user/${id}/notes`
      );
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching notes:", error);
      setLoading(false);
    }
    finally { 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(id);
  }, []);
  if (userAuth.id == id) {
  return (
    <section
    className="containerrr"
    >
      <Header h1={"Welcome"} p={"Home"} span={userAuth.name.split(" ")[0]} />
      <div className="w-full flex justify-between items-center px-5 py-3 md:px-14 bg-gray-50 mb-9 rounded-md">
        <Link
          to={"/user/" + userAuth.id + "/createNote"}
          className="btn2 text-my-green"
        >
          <p>Add Note +</p>
        </Link>
        <p>{`Number of Notes:` + notes.length}</p>
      </div>
      {loading ? (
        <div className="center h-[300px]">
          <Loading2 />
        </div>
      ) : (
        <section className="w-full flex gap-4 flex-wrap overflow-hidden">
          {notes
            .slice()
            .reverse()
            .map((note) => (
              <Link
                key={note._id}
                to={"/user/" + userAuth.id + "/note/" + note._id}
                className="bg-gradient-to-t from-green-200 to-gray-100 py-4 px-4 rounded-md w-full md:w-[300px] transition duration-300 hover:shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <h1 className="text-xl font-semibold line-clamp-1 text-clip">
                      {note.title && note.title.length > 10
                        ? note.title.substring(0, 10) + "..."
                        : note.title}
                    </h1>
                    <p className="text-sm text-gray-400">
                      {note.createdAt &&
                        new Date(note.createdAt).toLocaleDateString("en-CA")}
                    </p>
                  </div>
                  <div
                    className="line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: note.description }}
                  ></div>
                </div>
              </Link>
            ))}

          {notes.length === 0 && (
            <div className="w-full flex flex-col justify-center items-center">
              {/* <img src={notFound} alt="not found" className="w-[170px] mb-4" /> */}
              <p className="text-gray-400 mb-4">
                No Notes Found, Create Yours Now!
              </p>
              <Link
                to={"/user/" + userAuth.id + "/createNote"}
                className="btn2"
              >
                <p className="text-my-green">Create</p>
              </Link>
            </div>
          )}
        </section>
      )}
    </section>
  );
  }else {
  return <Navigate to={`/`} />;
}
};

export default Home;
