import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";

function Node({ data }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [data.reloadKey]);

  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          exit={{ opacity: 0, scale: 2 }}
          onClick={() => {
            setShow(false);
            data.func((prev) => prev + 1);
          }}
          className="relative rounded-xl w-fit text-[30px] text-white bg-black p-2"
        >
          <img
            className="absolute bottom-0"
            src={`${import.meta.env.BASE_URL}bubble.gif`}
            alt=""
          />

          <Handle type="target" position={Position.Top} />
          {data.label}
          <Handle type="source" position={Position.Bottom} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Node;
