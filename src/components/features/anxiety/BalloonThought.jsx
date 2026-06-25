import { useDraggable } from "@dnd-kit/react";
import { AnimatePresence, motion } from "motion/react";

function BalloonThought({ id, text }) {
  const { ref } = useDraggable({
    id,
  });

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: -600, opacity: 0 }}
      transition={{ duration: 5, ease: "easeOut" }}
      ref={ref}
      className="relative bg-pink-300 text-black px-5 py-7 rounded-full shadow-lg"
    >
      {text}

      <div className="absolute left-1/2 top-full h-10 w-px bg-black" />
    </motion.div>
  );
}

export default BalloonThought;
