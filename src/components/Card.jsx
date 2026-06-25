import * as motion from "motion/react-client";

function Card({ hueA, hueB, i, text, setText }) {
  const cardVariants = {
    offscreen: {
      y: 220,
    },
    onscreen: {
      y: 40,
      rotate: -6,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      className={`card-container-${i} relative w-full max-w-[620px] h-[500px] overflow-hidden flex justify-center items-end`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6 }}
    >
      <div className="absolute left-1/2 bottom-0 h-[180px] w-[90vw] max-w-[550px] -translate-x-1/2 rounded-2xl bg-gradient-to-r from-red-800/60 to-red-950/60 backdrop-blur-xl" />

      <motion.textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        variants={cardVariants}
        transition={{ duration: 0.4 }}
        placeholder="Como está se sentindo hoje?"
        className="relative z-10 mb-0 w-[78vw] max-w-[340px] h-[390px] sm:h-[430px] resize-none rounded-2xl bg-black/80 p-4 text-center text-white text-sm sm:text-base shadow-2xl outline-none"
        style={{
          transformOrigin: "10% 60%",
        }}
      />
    </motion.div>
  );
}

export default Card;
