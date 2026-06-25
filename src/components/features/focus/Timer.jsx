import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function Timer() {
  const [segundos1, setSegundos1] = useState(0);
  const [segundos2, setSegundos2] = useState(0);
  const [minutos1, setminutos1] = useState(0);
  const [minutos2, setminutos2] = useState(0);
  const [horas1, sethoras1] = useState(0);
  const [horas2, sethoras2] = useState(0);
  const [click, setClick] = useState(false);
  const [showMsg1, setShowMsg1] = useState(false);
  const [showMsg2, setShowMsg2] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const tempoRef = useRef({
    segundo1: 0,
    segundo2: 0,
    minuto1: 0,
    minuto2: 0,
    hora1: 0,
    hora2: 0,
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    setShowMsg1(true);

    setTimeout(() => setShowMsg1(false), 7000);
    setTimeout(() => setShowMsg2(true), 7600);
    setTimeout(() => setShowMsg2(false), 14000);
    setTimeout(() => setShowDiv(false), 14200);

    return () => {
      clearTimeout();
    };
  }, []);

  function pause() {
    clearInterval(intervalRef.current);
  }

  function count() {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const tempo = tempoRef.current;

      tempo.segundo2 = tempo.segundo2 + 1;

      if (tempo.segundo2 === 10) {
        tempo.segundo2 = 0;
        tempo.segundo1++;
      }

      if (tempo.segundo1 === 6) {
        tempo.segundo1 = 0;
        tempo.minuto2++;
      }

      if (tempo.minuto2 === 10) {
        tempo.minuto2 = 0;
        tempo.minuto1++;
      }

      if (tempo.minuto1 === 6) {
        tempo.minuto1 = 0;
        tempo.hora2++;
      }

      if (tempo.hora2 === 10) {
        tempo.hora2 = 0;
        tempo.hora1++;
      }

      setSegundos2(tempo.segundo2);
      setSegundos1(tempo.segundo1);
      setminutos2(tempo.minuto2);
      setminutos1(tempo.minuto1);
      sethoras2(tempo.hora2);
      sethoras1(tempo.hora1);
    }, 1000);
  }

  return (
    <div className="relative w-full h-screen bg-black/[0.3] backdrop-blur-lg flex flex-col gap-4 justify-center items-center">
      <AnimatePresence initial={false}>
        {showDiv ? (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/60 backdrop-blur-md
              px-6 text-center text-white
            "
          >
            <AnimatePresence>
              {showMsg1 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 2 }}
                  className="absolute max-w-[320px] text-2xl sm:max-w-[600px] sm:text-4xl font-viaoda text-red-100"
                  key="msg1"
                >
                  Tome seu tempo...
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showMsg2 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 2 }}
                  className="absolute max-w-[320px] text-2xl sm:max-w-[600px] sm:text-4xl font-viaoda text-red-100"
                  key="msg2"
                >
                  Inicie o relógio e faça alguma atividade...
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {click ? (
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 2 }}
            transition={{ duration: 4 }}
            key="timer"
            src={`${import.meta.env.BASE_URL}circle.gif`}
            width="100px"
            height="100px"
            alt=""
          />
        ) : null}
      </AnimatePresence>

      <p className="mt-14 text-[30px] text-white font-silkscreen">
        {horas1}
        {horas2}:{minutos1}
        {minutos2}:{segundos1}
        {segundos2}
      </p>

      <button
        onClick={() => {
          count();
          setClick(true);
          setIsPaused(false);
        }}
        className="bg-red-300 text-black p-3 rounded-lg hover:bg-red-800 hover:text-white hover:scale-105 transition duration-300"
      >
        {isPaused ? "Continuar" : "Começar"}
      </button>

      <button
        className="bg-red-300 text-black p-3 rounded-lg hover:bg-red-800 hover:text-white hover:scale-105 transition duration-300"
        onClick={() => {
          pause();
          setIsPaused(true);
        }}
      >
        Pausar
      </button>
    </div>
  );
}

export default Timer;
