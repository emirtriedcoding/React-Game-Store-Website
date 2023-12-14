import { useState, useEffect, useContext } from "react";
import headerLinks from "../../data/headerLinks";
import { Link, NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

import "./header.css";
import  { AppContext } from "../../App";

export default function Header() {
  const [links, setLinks] = useState(headerLinks);
  const [isValid, setIsValid] = useState(false);
  const { addedGames, setAddedGames } = useContext(AppContext);
  const { favorites, setFavorites } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsValid(scrollY > 125);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isValid
          ? "bg-[rgb(0,0,0)] h-[65px]"
          : "h-[80px] bg-[rgb(0,0,0)] lg:bg-transparent"
      } duration-200 p-7 fixed bottom-0 lg:top-0 w-full flex justify-around items-center bg-transparent z-50 text-white`}
    >
      <div className="left-side hidden lg:block">
        <a href="" className="text-3xl font-bold text-gray-200">
          Gaming Shop
        </a>
      </div>
      <div className="middle flex gap-1 lg:gap-10">
        {links &&
          links.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className="header-links hover:-translate-y-1 duration-200 px-4 py-2 rounded-lg"
            >
              {link.name}
            </NavLink>
          ))}
      </div>
      <div className="right-side flex items-center gap-5">
        <Link to="/cart" className="relative cursor-pointer ">
          <IoCartOutline className="cursor-pointer" size={25} />
          <div
            to="/cart"
            className="badge absolute -top-1 -right-1 flex items-center justify-center p-1 w-4 h-4 text-[10px] text-white rounded-full bg-red-600"
          >
            <span>{addedGames.length}</span>
          </div>
        </Link>
        <Link to="/favorites" className="relative cursor-pointer ">
          <IoMdHeartEmpty className="cursor-pointer" size={25} />
          <div className="badge absolute -top-1 -right-1 flex items-center justify-center p-1 w-4 h-4 text-[10px] text-white rounded-full bg-red-600">
            <span>{favorites.length}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
