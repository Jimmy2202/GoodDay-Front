import { AnimatePresence, motion } from "motion/react";
import { div, p } from "motion/react-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Baloon() {
  const [activated, setActivated] = useState(false);
  const [timer, setTimer] = useState(0);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
  const [showMsg1, setShowMsg1] = useState(false);
  const [showMsg2, setShowMsg2] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const navigate = useNavigate();

  function count() {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev == 10) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    setTimer(0);
  }

  useEffect(() => {
    function aparecerTemporariamente() {
      setShowMsg1(true);

      setTimeout(() => {
        setShowMsg1(false);
      }, 8000);

      setTimeout(() => {
        setShowMsg2(true);
      }, 8600);

      setTimeout(() => {
        setShowMsg2(false);
      }, 15600);

      setTimeout(() => {
        setShowDiv(false);
      }, 15800);
    }

    aparecerTemporariamente();
  }, []);

  return (
    <>
      <AnimatePresence initial={false}>
        {showDiv ? (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 4 }}
            className="absolute text-white z-50 bg-black/[0.5] backdrop-blur-sm border w-screen h-screen flex items-center justify-center text-center"
          >
            <AnimatePresence>
              {showMsg1 ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 2 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 4 }}
                  className="absolute"
                  key="msg1"
                >
                  Inspire e expire no tempo conforme o desenho na tela...
                </motion.p>
              ) : null}
            </AnimatePresence>
            <AnimatePresence>
              {showMsg2 ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 4 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 4 }}
                  className="text-[10px] absolute"
                  key="msg2"
                >
                  Mantenha a calma...
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="w-full h-screen bg-black/[0.4] backdrop-blur-sm flex flex-col gap-10 justify-center items-center p-3">
        <motion.div
          initial={{ scale: 3 }}
          animate={{
            scale:
              timer == 0
                ? 3
                : timer <= 4 && timer > 0
                  ? 7
                  : timer <= 6 && timer > 3
                    ? 7
                    : 5,
          }}
          className="h-5 w-5 bg-gradient-to-br from-white to-slate-500 rounded-[150%]"
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        ></motion.div>
        <p className="mt-10 text-[40px] font-silkscreen text-white">{timer}</p>
        {timer == 0 ? (
          ""
        ) : timer <= 3 && timer > 0 ? (
          <p className="text-white font-viaoda">Inspire</p>
        ) : timer <= 6 && timer > 3 ? (
          <p className="text-white font-viaoda">Segure</p>
        ) : (
          <p className="text-white font-viaoda">Solte Devagar</p>
        )}
        <AnimatePresence initial={false}>
          {show ? (
            <motion.button
              onClick={() => {
                setActivated(true);
                setShow(false);
                count();
              }}
              exit={{ opacity: 0, scale: 0 }}
              className="bg-slate-900 p-3 rounded-sm text-white hover:scale-105 hover:bg-white hover:text-slate-900 transition duration-300"
            >
              Começar
            </motion.button>
          ) : null}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {timer == 10 && show2 ? (
            <div className="flex flex-col gap-2">
              <motion.button
                onClick={() => {
                  setActivated(true);
                  setShow(true);
                  setTimer(0);
                }}
                exit={{ opacity: 0, scale: 0 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 p-3 rounded-sm text-white hover:scale-105 hover:bg-white hover:text-slate-900 transition duration-300"
              >
                Repetir
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/main/neutral")}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-2xl shadow-lg"
              >
                🎬 Descobrir um filme e um livro
              </motion.button>
            </div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Baloon;
