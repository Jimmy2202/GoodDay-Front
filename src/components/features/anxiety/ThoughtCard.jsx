import { useDraggable } from "@dnd-kit/react";

function ThoughtCard({ id, text }) {
  const { ref } = useDraggable({
    id,
  });

  return (
    <div
      ref={ref}
      className="bg-black p-3 rounded-lg text-white w-fit cursor-grab"
    >
      {text}
    </div>
  );
}

export default ThoughtCard;
