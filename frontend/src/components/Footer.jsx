import React, { useContext } from "react";
import Logo from "../../imgs/logo.png";
import { Link } from "react-router-dom";
import { Usercontext } from "../App";

const Footer = () => {
    const { userAuth } = useContext(Usercontext);
  return (
    <section className="bg-gray-50 w-full h-fit px-10 py-5  flex justify-between  gap-8  mt-20 flex-wrap">
      <div className="flex items-left gap-3 flex-col">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="logo" className="w-[10px]" />
          <h1 className="text-2xl">
            Note<span className="text-my-green">-It </span>
          </h1>
        </div>
        <p>Created By Ahmad Daher</p>
      </div>
      <div className="flex flex-col items-left">
        <h1 className="text-xl mb-2 font-medium">Links</h1>
        <ul className=" list-none flex items-left flex-col">
        <li className="hover:border-b border-black mb-2">
            <Link to={`/user/${userAuth.id}/createNote`}>Create Note</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-left">
        <h1 className="text-xl mb-2 font-medium">Social Links</h1>
        <ul className=" list-none flex items-left flex-col">
          <li className="hover:border-b border-black mb-2">
            <a href="https://github.com/Ahmaddhr1" target="_blank">
              Github
            </a>
          </li>
          <li className="hover:border-b border-black mb-2">
            <a target="_blank" href="https://www.linkedin.com/in/ahmaddhr1/">
              LinkedIn
            </a>
          </li>
          <li className="hover:border-b border-black mb-2">
            <a target="_blank" href="https://wa.me/+96176522837">
              Whatsapp
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
