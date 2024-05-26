import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { Usercontext } from "../App";
import axios from "axios";
import EditIcon from "../../imgs/file-edit-black.png";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const EditNote = () => {
  const { id, nid } = useParams();
  const [note, setNote] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const { userAuth } = useContext(Usercontext);
  const navigate = useNavigate();
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
  const setTitle = (title) => {
    setNote((prevNote) => ({ ...prevNote, title }));
  };

  const setDescription = (description) => {
    setNote((prevNote) => ({ ...prevNote, description }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_ROUTE}user/${userAuth.id}/note/${
          note._id
        }`,
        { title: note.title, description: note.description }
      );
      navigate(`/user/${userAuth.id}`);
      toast.success(response.data);
    } catch (e) {
      navigate(`/user/${userAuth.id}/editNote/${nid}`);
      toast.error(e.response.data.message);
      setLoading(false);
    }
  };

  const handleform = (e) => {
    if (!note.title.length) {
      toast.error("Title is required");
      return;
    }
    if (note.title.length < 2 || note.title.length > 30) {
      toast.error(
        "Title should be atleast 2 characters long and at most 30 characters"
      );
      return;
    }
    if (note.description.length == 11) {
      note.description = "";
      if (!note.description.length) {
        toast.error("Note Details field is required");
        return;
      }
    }
    handleSubmit(e);
  };
  useEffect(() => {
    fetchNote(nid);
  }, [nid]);

  return (
    <section
      className="containerrr"
    >
      <Header h1={"Make the correct"} span={"Changes"} p={"Edit Note"}></Header>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">
          Title <span className="text-red-500">*</span>
        </h1>
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={(e) => setTitle(e.target.value)}
          className="py-2 pl-4 border  border-black focus:border-my-green rounded-sm w-full  focus:outline-none mb-5"
        />
        <h1 className="text-xl">
          Note Details <span className="text-red-500">*</span>
        </h1>
        <ReactQuill
          theme="snow"
          value={note.description}
          onChange={setDescription}
          className="w-full h-[150px] focus:outline-none mb-[80px] rounded-sm focus:border-my-green"
        />
      </div>
      <button
        className={`text-lg w-full md:w-[200px]  ${
          loading ? "bg-gray-100" : "bg-my-green"
        } py-2 rounded-md`}
        type="button"
        disabled={loading}
        onClick={handleform}
      >
        <div className="center">
          {loading ? (
            <Loading />
          ) : (
            <>
              <p>Edit</p>
              <img src={EditIcon} alt="add Icon" className="w-[17px]" />
            </>
          )}
        </div>
      </button>
    </section>
  );
};

export default EditNote;
