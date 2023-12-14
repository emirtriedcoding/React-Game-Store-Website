import React from "react";
import { useContext } from "react";
import { HomeContext } from "../../Pages/Home/Home";
import { AppContext } from "../../App";

import { FaComputer } from "react-icons/fa6";
import { FaXbox } from "react-icons/fa";
import { FaPlaystation } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

import "./banner.css";
import { Link } from "react-router-dom";

export default function Banner() {
  const { games, setGames } = useContext(HomeContext);
  const { favorites, setFavorites } = useContext(AppContext);

  const changeHandle = (id) => {
    let newGames = games.map((game) => {
      return {
        ...game,
        active: id === game.id,
      };
    });
    setGames(newGames);
  };

  const favoriteHandle = (game) => {
    const isAlreadyFavorited = favorites.some((fav) => fav.id === game.id);
    if (!isAlreadyFavorited) {
      setFavorites((prevGames) => [...prevGames, game]);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="banner relative w-full">
        {games &&
          games.map(
            (game) =>
              game.active && (
                <div
                  key={game.id}
                  className={`game relative before:block before:top-0 before:left-0 before:bg-[rgba(0,0,0,.5)] before:inset-1 before:w-full before:h-full before:absolute
                  ${game.active ? "animate-fade-in" : "animate-fade-out"} `}
                >
                  <img
                    src={game.bgImg}
                    alt=""
                    className={`w-full h-full
                    }`}
                  />
                </div>
              )
          )}
        <div className="absolute w-full top-3 lg:top-40 flex justify-around px-6 items-center">
          <div className="w-1/2 flex justify-center text-gray-200">
            {games &&
              games.map(
                (game) =>
                  game.active && (
                    <div
                      className={`w-full text-center flex flex-col gap-2 lg:gap-5 ${
                        game.active ? "left-fade-in" : "left-fade-out"
                      } `}
                      key={game.id}
                    >
                      <div className="flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-5">
                        <h2 className="text-lg lg:text-4xl italic font-bold drop-shadow-2xl">
                          {game.name}
                        </h2>
                        <span className="px-2 py-1 lg:px-4 lg:py-2 rounded-md text-[10px] lg:text-xl bg-[#00CED1] text-gray-800 italic font-bold">
                          {game.cat}
                        </span>
                      </div>
                      <p className="lg:leading-7 leading-3 text-gray-300 text-[8px] lg:text-base w-full">
                        {game.desc}
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <h4 className="text-[8px] lg:text-lg">Available For</h4>
                        <div className="flex gap-2 lg:gap-4 items-center">
                          <FaComputer className="w-3 lg:w-full" size={25} />
                          <FaXbox
                            className="text-green-500 w-3 lg:w-full"
                            size={21}
                          />
                          <FaPlaystation
                            className="text-blue-500 w-3 lg:w-full"
                            size={25}
                          />
                        </div>
                      </div>
                      <span className="text-[8px] lg:text-2xl font-bold text-green-500 animate-pulse">
                        ${game.price}
                      </span>
                      <div className="flex flex-row gap-1 justify-center items-center">
                        <Link
                          to={`/addingtocart/${game.id}`}
                          className="text-[8px] lg:text-base flex justify-center gap-4 bg-[#00CED1] text-gray-800 w-full lg:w-1/3 py-1 lg:py-3 font-bold rounded-md hover:-translate-y-1 duration-200 animate-bounce"
                        >
                          Shop Now
                          <CiShoppingTag
                            className="hidden lg:block"
                            size={18}
                          />
                        </Link>
                        <button
                          onClick={() => favoriteHandle(game)}
                          className="text-[8px] lg:text-base flex justify-center items-center gap-3 bg-red-500 text-white w-full  lg:w-1/3 p-1 lg:py-3 font-bold rounded-md hover:-translate-y-1 duration-200"
                        >
                          Add To Favorites
                          <IoMdHeartEmpty className="hidden lg:block" />
                        </button>
                      </div>
                    </div>
                  )
              )}
          </div>
          <div className={`w-1/4 lg:w-1/6 lg:self-start right-fade-in `}>
            <Swiper
              effect={"cards"}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              className="mySwiper"
            >
              {games &&
                games.map((game) => (
                  <SwiperSlide key={game.id}>
                    <img
                      src={game.prevImg}
                      className="h-full w-full cursor-pointer rounded-md"
                      onClick={() => changeHandle(game.id)}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
