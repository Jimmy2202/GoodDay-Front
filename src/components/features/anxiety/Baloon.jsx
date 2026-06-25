import { AnimatePresence, motion } from "motion/react";
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
        if (prev === 10) {
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
      }, 6500);

      setTimeout(() => {
        setShowMsg2(true);
      }, 7000);

      setTimeout(() => {
        setShowMsg2(false);
      }, 13000);

      setTimeout(() => {
        setShowDiv(false);
      }, 13600);
    }

    aparecerTemporariamente();
  }, []);

  return (
    <>
      <AnimatePresence initial={false}>
        {showDiv && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="
              fixed inset-0
              z-50
              flex items-center justify-center
              bg-black/70
              backdrop-blur-md
              px-6
              text-center
            "
          >
            <AnimatePresence mode="wait">
              {showMsg1 && (
                <motion.div
                  key="msg1"
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="
                    w-full max-w-md
                    rounded-3xl
                    border border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    px-8 py-7
                    shadow-2xl shadow-black/50
                  "
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-red-300/20 bg-red-950/30 text-3xl">
                    🌬️
                  </div>

                  <p className="mb-3 font-viaoda text-3xl text-white">
                    Respire com calma
                  </p>

                  <p className="text-sm leading-relaxed text-gray-300">
                    Inspire e expire acompanhando o movimento do desenho na
                    tela.
                  </p>

                  <div className="mt-6 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="h-full w-full bg-gradient-to-r from-transparent via-red-300/70 to-transparent"
                    />
                  </div>
                </motion.div>
              )}

              {showMsg2 && (
                <motion.div
                  key="msg2"
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="
                    w-full max-w-md
                    rounded-3xl
                    border border-red-300/10
                    bg-gradient-to-b from-red-950/30 to-black/40
                    backdrop-blur-xl
                    px-8 py-7
                    shadow-2xl shadow-red-950/30
                  "
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl">
                    🫧
                  </div>

                  <p className="mb-3 font-viaoda text-3xl text-white">
                    Sem pressa
                  </p>

                  <p className="text-sm leading-relaxed text-gray-300">
                    Deixe o ritmo guiar sua respiração. Só acompanhe o fluxo.
                  </p>

                  <div className="mt-6 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 5.5, ease: "linear" }}
                      className="h-full w-full bg-gradient-to-r from-transparent via-red-300/70 to-transparent"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-screen bg-black/[0.4] backdrop-blur-sm flex flex-col gap-10 justify-center items-center p-3">
        <motion.div
          initial={{ scale: 3 }}
          animate={{
            scale:
              timer === 0
                ? 3
                : timer <= 4 && timer > 0
                  ? 7
                  : timer <= 6 && timer > 3
                    ? 7
                    : 5,
          }}
          className="h-5 w-5 bg-gradient-to-br from-white to-slate-500 rounded-[150%] shadow-lg shadow-white/20"
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        />

        <p className="mt-10 text-[40px] font-silkscreen text-white">{timer}</p>

        {timer === 0 ? (
          ""
        ) : timer <= 3 && timer > 0 ? (
          <p className="text-white font-viaoda text-2xl">Inspire</p>
        ) : timer <= 6 && timer > 3 ? (
          <p className="text-white font-viaoda text-2xl">Segure</p>
        ) : (
          <p className="text-white font-viaoda text-2xl">Solte devagar</p>
        )}

        <AnimatePresence initial={false}>
          {show && (
            <motion.button
              onClick={() => {
                setActivated(true);
                setShow(false);
                count();
              }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                bg-gradient-to-b from-red-800/70 to-red-950/80
                border border-red-700/40
                px-6 py-3
                rounded-xl
                text-red-100
                shadow-lg shadow-red-950/50
                hover:border-red-500/60
                hover:text-white
                transition duration-300
              "
            >
              Começar
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {timer === 10 && show2 && (
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-gradient-to-b from-red-800/70 to-red-950/80
                  border border-red-700/40
                  px-6 py-3
                  rounded-xl
                  text-red-100
                  shadow-lg shadow-red-950/50
                  hover:border-red-500/60
                  hover:text-white
                  transition duration-300
                "
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
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Baloon;