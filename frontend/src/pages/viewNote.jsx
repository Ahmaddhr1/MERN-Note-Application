import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import DeleteIcon from "../../imgs/trash.png";
import EditIcon from "../../imgs/file-edit.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Usercontext } from "../App";
import Loading from "../components/Loading";

const viewNote = () => {
  const { id, nid } = useParams();
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { userAuth } = useContext(Usercontext);

  const fetchNote = async (nid) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_ROUTE}note/${nid}`
      );
      setNote(response.data);
      setLoading(false);
    } catch (e) {
      navigate(`/user/${id}`);
      toast.error("An error occured " + e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote(nid);
  }, [nid]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_ROUTE}user/${userAuth.id}/note/${nid}`
      );
      navigate(`/user/${id}`);
      toast.success(response.data);
      setLoading(false);
    } catch (e) {
      navigate(`/user/${id}`);
      toast.error("An error occured " + e.message);
      setLoading(false);
    }
  };

  return (
    <div className="containerrr">
      <Header h1={"Your Note"} span={"Details"} p={"View Note"}></Header>
      <div
        className={`w-full flex flex-col gap-3  ${
          loading ? "items-center justify-center" : "justify-start"
        }  px-5 py-3 md:px-14 bg-gray-50 mb-9 rounded-md min-h-fit`}
      >
        {loading ? (
          <Loading />
        ) : note ? (
          <>
            <div className="flex items-center justify-between border-b border-black mb-5">
              <h1 className="md:text-2xl text-lg font-semibold h-fit ">
                {note.title}
              </h1>
              <p className="text-gray-600 text-sm md:text-lg">
                <span className="text-black">Created At: </span>
                {new Date(note.createdAt).toLocaleDateString("en-CA") || ""}
              </p>
            </div>
            <div
              className="md:text-xl text-md "
              dangerouslySetInnerHTML={{ __html: note.description }}
            ></div>
            {note.createdAt !== note.updatedAt && (
              <p className="text-gray-600 border-t border-black mt-5">
                <span className="text-black">Last Update was at :</span>
                {new Date(note.updatedAt).toLocaleDateString("en-CA") || ""}
              </p>
            )}
          </>
        ) : (
          <p>
            <Loading />
          </p>
        )}
      </div>
      <div className="w-full flex gap-4 justify-center items-center">
        {note && (
          <>
            <button disabled={loading} className="md:w-[120px] w-1/2 md:px-4 py-2 px-2 rounded cursor-pointer bg-green-100">
              <Link
                to={`/user/${userAuth.id}/note/${note._id}/edit`}
                className="flex gap-3 center"
              >
                <p className="text-my-green">Edit</p>
                <img src={EditIcon} alt="edit icon" className="w-[20px]" />
              </Link>
            </button>
            <button disabled={loading} className="md:w-[120px] w-1/2  bg-red-200 center text-red-600  md:px-4 py-2 px-2 rounded cursor-pointer">
              <div onClick={handleDelete} className="flex gap-3 center">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <p className="text-red-600">Delete</p>
                    <img
                      src={DeleteIcon}
                      alt="delete icon"
                      className="w-[20px]"
                    />
                  </>
                )}
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default viewNote;
