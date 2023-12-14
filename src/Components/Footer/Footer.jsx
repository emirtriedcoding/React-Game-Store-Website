export default function Footer() {
  return (
    <div className="bg-black border-t border-solid border-gray-800 flex justify-center items-center">
      <div className="bg-transparent p-10 text-white flex flex-col justify-center gap-8">
        <h2 className="text-3xl font-bold text-center">Gaming Shop</h2>
        <div className="flex justify-between">
          <span className="hover:-translate-y-1 duration-200 cursor-pointer">
            Contact Us
          </span>
          <span className="hover:-translate-y-1 duration-200 cursor-pointer">
            About us
          </span>
        </div>
        <span className="text-sm text-gray-400 text-center">
          gamingshop291@gmail.com
        </span>
        <h4 className="text-center mt-10 font-bold text-xl text-[#00CED1] ">
          Designed By Amirjtt ❤️{" "}
        </h4>
        <div className="flex justify-between">
          <a href="https://github.com/Amirjt">Github</a>
          <a href="https://www.linkedin.com/in/amirjtt/" className="pb-10">
            Linkedin
          </a>
        </div>
      </div>
    </div>
  );
}
