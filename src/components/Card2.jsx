import * as motion from "motion/react-client";
import { useState } from "react";

function Card2({ hueA, hueB, i, text, mode, feeling, date }) {
  const hue = (h) => `hsl(${h}, 100%, 50%)`;
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  const cardVariants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: 50,
      rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const cardContainer = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -120,
  };

  const splash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
  };

  const card = {
    fontSize: 12,
    width: 300,
    height: 430,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    boxShadow:
      "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
  };

  return (
    <motion.div
      className={`card-container-${i} relative w-full max-w-[620px] h-[500px] overflow-hidden flex justify-center items-end`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6 }}
    >
      <div
        style={{ background }}
        className="absolute left-1/2 bottom-0 h-[180px] w-[90vw] max-w-[550px] -translate-x-1/2 rounded-2xl"
      >
        <p className="absolute font-silkscreen left-2 text-white text-[10px] bottom-4">
          {date}
        </p>
      </div>
      <motion.div
        variants={cardVariants}
        placeholder="Como está se sentindo hoje?"
        className="relative z-10 mb-0 w-[78vw] max-w-[340px] h-[390px] sm:h-[430px] resize-none rounded-2xl bg-black/80 p-4 text-center text-white text-sm sm:text-base shadow-2xl outline-none"
        style={{
          transformOrigin: "10% 60%",
        }}
        transition={{ duration: 0.4 }}
      >
        <p>
          Sentimento: <span className="animate-ping">{feeling}</span>
        </p>
        <br />
        <p>
          {" "}
          Pensamento:{" "}
          <span className="shadow-md shadow-cyan-300">{text}</span>{" "}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Card2;
