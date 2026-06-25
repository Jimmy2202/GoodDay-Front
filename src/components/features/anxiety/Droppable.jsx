import { useDroppable } from "@dnd-kit/react";

function Droppable({ id, children }) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className="p-2 bg-slate-500/[0.4] rounded-md backdrop-blur-sm shadow-inner shadow-white flex text-center justify-center items-center flex-col gap-4 min-w-40 min-h-40"
    >
      {children}
    </div>
  );
}

export default Droppable;
