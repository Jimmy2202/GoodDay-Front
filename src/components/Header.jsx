import { useNavigate } from "react-router";
import { IoMdExit } from "react-icons/io";
import { FiAlignJustify } from "react-icons/fi";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function Header({ func }) {
  const navigate = useNavigate();
  const [isclicked, setIsClicked] = useState(false);

  function handleDiv() {
    isclicked ? setIsClicked(false) : setIsClicked(true);
  }

  return (
    <header className="w-full flex justify-end items-center fixed text-white top-0 z-50 bg-black/[0.4] p-5">
      {!isclicked ? (
        <FiAlignJustify
          onClick={handleDiv}
          className="hover:cursor-pointer scale-[2] hover:scale-[2.5] transition duration-200"
        />
      ) : null}
      <AnimatePresence initial={false}>
        {isclicked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0, scale: 0 }}
            className="flex font-viaoda absolute top-10 right-10 text-[8px] gap-2 p-4 bg-white/[0.2] backdrop-blur-sm flex-col items-center justify-center"
          >
            <FiAlignJustify
              onClick={handleDiv}
              className="hover:cursor-pointer absolute top-4 right-20 scale-[2] hover:scale-[2.5] transition duration-200"
            />
            <a
              className="hover:cursor-pointer w-full rounded-2xl border p-1 hover:scale-125 hover:text-white transition duration-200 ease-in-out flex flex-col justify-center items-center"
              onClick={handleDiv}
              href="#/main"
            >
              Main
            </a>
            <a
              className="hover:cursor-pointer rounded-2xl w-full p-1 border hover:scale-125 hover:text-white transition duration-200 ease-in-out flex flex-col justify-center items-center"
              href="#/main/history"
              onClick={handleDiv}
            >
              Histórico
            </a>
            <button
              type="button"
              className="hover:cursor-pointer w-full rounded-2xl border p-1 hover:scale-125 hover:text-white transition duration-200 ease-in-out flex flex-col justify-center items-center"
              onClick={() => {
                func();
                handleDiv();
              }}
            >
              <IoMdExit className="scale-110" />
              Sair
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Header;

/*<div className="flex flex-row items-center justify-end gap-4">
        <a
          className="hover:cursor-pointer hover:scale-125 hover:text-white transition duration-200 ease-in-out flex flex-col justify-center items-center"
          href="#/main/history"
        >
          Histórico
        </a>
        <a
          className="hover:cursor-pointer hover:scale-125 hover:text-white transition duration-200 ease-in-out flex flex-col justify-center items-center"
          href="#"
        >
          Option
        </a>
        <a
          className="hover:cursor-pointer hover:scale-125 hover:text-white transition duration-200 ease-in-out flex flex-col justify-center items-center"
          href="#"
        >
          Option
        </a>
        <button
          type="button"
          className="hover:cursor-pointer hover:scale-125 hover:text-white transition duration-200 ease-in-out flex flex-col justify-center items-center"
          onClick={func}
        >
          <IoMdExit className="scale-110" />
          Sair
        </button>
      </div>*/
