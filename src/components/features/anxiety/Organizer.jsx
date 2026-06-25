import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DragDropProvider } from "@dnd-kit/react";
import ThoughtCard from "./ThoughtCard";
import Droppable from "./Droppable";
import BalloonThought from "./BalloonThought";
import StarThought from "./StarThought";
import PoppingThought from "./PoppingThought";
import { useNavigate } from "react-router";

function Organizer() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  const [showMsg1, setShowMsg1] = useState(false);
  const [showMsg2, setShowMsg2] = useState(false);
  const [showDiv, setShowDiv] = useState(true);

  const navigate = useNavigate();
  const array = [
    { id: "very", text: "Muito Importante", count: 0 },
    { id: "medium", text: "Posso pensar depois", count: 0 },
    { id: "low", text: "Não é tão assustador", count: 0 },
  ];

  const organizedCount = items.length - count;
  const progress =
    items.length > 0 ? Math.round((organizedCount / items.length) * 100) : 0;

  useEffect(() => {
    setShowMsg1(true);

    setTimeout(() => setShowMsg1(false), 7000);
    setTimeout(() => setShowMsg2(true), 7600);
    setTimeout(() => setShowMsg2(false), 14000);
    setTimeout(() => setShowDiv(false), 14200);
  }, []);

  useEffect(() => {
    async function organizerFunc() {
      const text = localStorage.getItem("text");

      const response = await fetch("https://goodday-back.onrender.com/api/ia/organizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      const thoughts = data.message.content
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((word) => word.trim());

      const formattedItems = thoughts.map((word, index) => ({
        id: `item-${index}`,
        text: word,
        target: null,
      }));

      setItems(formattedItems);
      setCount(formattedItems.length);
    }

    organizerFunc();
  }, []);

  function handleDragEnd(event) {
    if (event.canceled) return;

    const draggedId = event.operation.source?.id;
    const draggedItem = items.find((item) => item.id === draggedId);
    const previousTarget = draggedItem.target;
    const targetId = event.operation.target?.id ?? null;

    if (previousTarget === targetId) return;

    if (targetId === null) {
      setCount((prev) => prev + 1);
    } else if (previousTarget === null && targetId != null) {
      setCount((prev) => prev - 1);
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === draggedId ? { ...item, target: targetId } : item,
      ),
    );
  }

  return (
    <>
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
                >
                  Organize seus pensamentos por prioridade...
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
                >
                  Nem tudo precisa ser resolvido agora.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main
        className="
        min-h-screen w-full
        overflow-y-auto
        bg-black/40 backdrop-blur-sm
        px-4 py-6
        sm:px-6 lg:px-10
      "
      >
        <DragDropProvider onDragEnd={handleDragEnd}>
          <section
            className="
            mx-auto
            flex w-full max-w-7xl
            flex-col gap-5
          "
          >
            <div
              className="
              rounded-3xl
              border border-red-900/40
              bg-black/50
              p-5
              backdrop-blur-md
              shadow-2xl shadow-black/60
            "
            >
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="font-viaoda text-3xl text-red-100 sm:text-5xl">
                    Organizador
                  </h1>

                  <p className="mt-1 text-sm text-slate-300">
                    Separe seus pensamentos por prioridade. Arraste cada
                    pensamento até a categoria mais adequada.
                  </p>
                </div>

                <p className="text-sm text-slate-300">{progress}% organizado</p>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-red-900 to-red-400"
                />
              </div>
            </div>

            <div
              className="
              grid w-full gap-5
              lg:grid-cols-[280px_1fr]
            "
            >
              <aside
                className="
                rounded-3xl
                border border-white/10
                bg-black/50
                p-4
                backdrop-blur-md
                shadow-xl shadow-black/50

                lg:sticky lg:top-6
                lg:max-h-[calc(100vh-3rem)]
                lg:overflow-y-auto
              "
              >
                <h2 className="mb-2 text-lg font-semibold text-red-100">
                  Pensamentos
                </h2>

                <p className="mb-4 text-sm text-slate-300">
                  {count}/{items.length} ainda precisam ser organizados
                </p>

                <AnimatePresence>
                  {count === 0 && items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="
                      mb-4 rounded-2xl
                      border border-emerald-400/20
                      bg-emerald-500/10
                      p-3
                      text-sm text-emerald-100
                    "
                    >
                      Tudo organizado. Agora sua mente tem um mapa mais claro.
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-3">
                  {items
                    .filter((item) => item.target === null)
                    .map((item) => (
                      <ThoughtCard
                        key={item.id}
                        id={item.id}
                        text={item.text}
                      />
                    ))}
                </div>
              </aside>

              <section
                className="
                grid gap-5
                md:grid-cols-3
              "
              >
                {array.map((item) => (
                  <div
                    key={item.id}
                    className="
                    min-h-[260px]
                    rounded-3xl
                    border border-red-900/30
                    bg-black/40
                    p-3
                    backdrop-blur-md
                    shadow-xl shadow-black/50
                  "
                  >
                    <div className="mb-3 px-2">
                      <h3 className="text-lg font-semibold text-red-100">
                        {item.text}
                      </h3>

                      <p className="text-xs text-slate-400">
                        {
                          items.filter((thought) => thought.target === item.id)
                            .length
                        }{" "}
                        pensamento(s)
                      </p>
                    </div>

                    <Droppable id={item.id}>
                      {items
                        .filter((thought) => thought.target === item.id)
                        .map((thought) => {
                          return count === 0 && thought.target === "very" ? (
                            <StarThought key={thought.id} id={thought.id} />
                          ) : count === 0 && thought.target === "medium" ? (
                            <BalloonThought
                              key={thought.id}
                              id={thought.id}
                              text={thought.text}
                            />
                          ) : count === 0 && thought.target === "low" ? (
                            <PoppingThought
                              key={thought.id}
                              id={thought.id}
                              text={thought.text}
                            />
                          ) : (
                            <ThoughtCard
                              key={thought.id}
                              id={thought.id}
                              text={thought.text}
                            />
                          );
                        })}

                      {items.filter((thought) => thought.target === item.id)
                        .length === 0 && (
                        <span className="text-sm text-slate-300">
                          Arraste aqui: {item.text}
                        </span>
                      )}
                    </Droppable>
                  </div>
                ))}
              </section>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => {
                  const zeroTarget = items.map((item) => ({
                    ...item,
                    target: null,
                  }));
                  setItems(zeroTarget);
                  setCount(items.length);
                }}
                className="
                rounded-xl
                border border-red-700/40
                bg-gradient-to-b from-red-800/70 to-red-950/80
                px-6 py-3
                text-red-100
                shadow-lg shadow-red-950/40
                transition duration-300
                hover:-translate-y-1
                hover:border-red-500/60
                hover:text-white
              "
              >
                Refazer
              </button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/main/neutral")}
                className="
                rounded-xl
                border border-white/15
                bg-white/5
                px-6 py-3
                text-white
                backdrop-blur-md
                shadow-lg shadow-black/40
                transition duration-300
                hover:bg-white/10
              "
              >
                🎬 Descobrir um filme e um livro
              </motion.button>
            </div>
          </section>
        </DragDropProvider>
      </main>
    </>
  );
}

export default Organizer;
