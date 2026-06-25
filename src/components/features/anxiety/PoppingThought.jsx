import { useDraggable } from "@dnd-kit/react";
import { AnimatePresence, motion } from "motion/react";

function PoppingThought({ id, text }) {
  const { ref } = useDraggable({
    id,
  });
  return (
    <motion.div
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 2.5, opacity: 0 }}
      ref={ref}
      transition={{ duration: 2 }}
      className="bg-black text-white px-4 py-2 rounded-md"
    >
      {text}
    </motion.div>
  );
}

export default PoppingThought;
