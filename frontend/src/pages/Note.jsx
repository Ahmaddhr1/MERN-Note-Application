import React, { useContext, useState } from "react";
import Header from "../components/Header";
import AddIcon from "../../imgs/add.png";
import axios from "axios";
import { Usercontext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Note = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userAuth } = useContext(Usercontext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_ROUTE}/user/${userAuth.id}`,
        { title, description }
      );
      setTitle("");
      setDescription("");
      navigate(`/user/${userAuth.id}`);
      toast.success(response.data);
    } catch (error) {
      navigate(`/user/${userAuth.id}/createNote`);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const handleform = (e) => {
    if (!title.length) {
      toast.error("Title is required");
      return;
    }
    if (title.length < 2 || title.length >30) {
      toast.error("Title should be atleast 2 characters long and at most 30 characters");
      return;
    }
    if (!description.length) {
      toast.error("Note Details field is required");
      return;
    }
    handleSubmit(e);
  };
  return (
    <section
    className="containerrr"
    >
      <Toaster />
      <Header
        h1={"Write down before you"}
        p={"Add Note"}
        span={"forget"}
      ></Header>
      <form className="flex flex-col gap-2">
        <h1 className="text-xl">
          Title <span className="text-red-500">*</span>
        </h1>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="py-2 pl-4 border  border-black focus:border-my-green rounded-sm w-full  focus:outline-none mb-5"
        />
        <h1 className="text-xl">
          Note Details <span className="text-red-500">*</span>
        </h1>
        {/* <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="py-2 pl-4 border border-black focus:border-my-green rounded-sm w-full h-[150px] focus:outline-none mb-5"
        /> */}
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className="w-full h-[150px] focus:outline-none mb-[80px] rounded-sm focus:border-my-green"
        />
      </form>
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
              <p>Add</p>
              <img src={AddIcon} alt="add Icon" className="w-[20px]" />
            </>
          )}
        </div>
      </button>
    </section>
  );
};

export default Note;
