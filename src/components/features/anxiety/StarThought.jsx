import { useDraggable } from "@dnd-kit/react";
import { AnimatePresence, motion } from "motion/react";

function StarThought({ id }) {
  const { ref } = useDraggable({
    id,
  });
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.6, 1, 0.6],
      }}
      ref={ref}
      transition={{ duration: 1.8, repeat: Infinity }}
      className="text-4xl text-yellow-200"
    >
      ✦
    </motion.div>
  );
}

export default StarThought;
