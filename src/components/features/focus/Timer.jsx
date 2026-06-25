import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function Timer() {
  const [timer, setTimer] = useState(0);
  const [segundos1, setSegundos1] = useState(0);
  const [segundos2, setSegundos2] = useState(0);
  const [minutos1, setminutos1] = useState(0);
  const [minutos2, setminutos2] = useState(0);
  const [horas1, sethoras1] = useState(0);
  const [horas2, sethoras2] = useState(0);
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
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

  function pause() {
    clearInterval(intervalRef.current);
  }

  function count() {
    intervalRef.current = setInterval(() => {
      const tempo = tempoRef.current;

      tempo.timerx = tempo.timerx + 1;
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
            transition={{ duration: 4 }}
            className="absolute bg-black/[0.5] backdrop-blur-sm w-screen h-screen flex items-center justify-center text-center"
          >
            <AnimatePresence>
              {showMsg1 ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 4 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 4 }}
                  className="absolute text-white"
                  key="msg1"
                >
                  Tome seu tempo...
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
                  className="text-[10px] absolute text-white"
                  key="msg2"
                >
                  Inicie o relógio e faça alguma atividade...
                </motion.p>
              ) : null}
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
            src="/circle.gif"
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
        }}
        className="bg-red-300 text-black p-3 rounded-lg hover:bg-red-800 hover:text-white hover:scale-105 transition duration-300"
      >
        {isPaused ? "Continuar" : "Começar"}
      </button>
      <button
        className="bg-red-300 text-black p-3 rounded-lg hover:bg-red-800 hover:text-white hover:scale-105 transition duration-300"
        onClick={() => {
          pause();
          isPaused ? null : setIsPaused(true);
        }}
      >
        Pausar
      </button>
    </div>
  );
}

export default Timer;
