import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/data/blogsData.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="bg-[#000] w-full p-10 flex flex-col gap-4 lg:gap-8 relative before:absolute before:-left-5  before:-top-10 before:lg:-top-20 before:w-[2100px] before:h-14 before:lg:h-44 before:bg-black before:blur-md">
      <h2 className="text-white text-xl lg:text-3xl font-bold italic z-50 relative before:absolute before:w-1/3 before:h-[10px] before:bg-gradient-to-r before:from-red-600 before:opacity-50 before:to-transparent before:top-1/3 before:-z-50 before:rounded-sm">
        Latest Blogs
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mt-5">
        {blogs &&
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="border border-solid border-gray-800 rounded-md flex flex-col justify-between cursor-pointer hover:hue-rotate-180 duration-200"
            >
              <img src={blog.img} className="rounded-t-md" alt="img" />
              <div className="p-4 flex flex-col gap-3">
                <h3 className="font-bold text-base text-white">{blog.title}</h3>
                <p className="text-sm text-justify leading-6 text-gray-400">
                  {blog.desc}
                </p>
              </div>
              <div className="flex justify-between w-full p-4">
                <div className="flex items-center gap-2">
                  <img
                    src={blog.authorAvatar}
                    className="w-[30px] rounded-full"
                    alt=""
                  />
                  <span className="text-sm text-[#00CED1]">{blog.author}</span>
                </div>
                <div className="flex items-center gap-2 text-red-600">
                  <CiCalendarDate size={20} />
                  <span className="text-sm">{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
