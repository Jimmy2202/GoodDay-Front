import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from "motion/react";
import Node from "./Node";

function Net() {
  const [items, setItems] = useState([]);
  const [nodest, setNodest] = useState([]);
  const [connectionst, setConnectionst] = useState([]);
  const [close, setClose] = useState(false);
  const [count, setCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const nodeTypes = {
    node_thought: Node,
  };

  const [reloadKey, setReloadKey] = useState(0);

  async function netFunc() {
    setReloadKey((prev) => prev + 1);

    const text = localStorage.getItem("text");

    const radius = 250;
    const centerx = 500;
    const centery = 400;

    const response = await fetch("https://goodday-back.onrender.com/api/ia/net", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    const dataArray = JSON.parse(data.message.content);

    const thoughts = dataArray.thoughts;
    const connections = dataArray.connections;

    const newReloadKey = Date.now();

    const nodes = thoughts.map((word, index) => {
      const angle = (index / thoughts.length) * Math.PI * 2;

      return {
        id: `node-${index}-${newReloadKey}`,
        type: "node_thought",
        data: {
          label: word,
          reloadKey: newReloadKey,
          func: setCount,
        },
        position: {
          x: centerx + radius * Math.cos(angle),
          y: centery + radius * Math.sin(angle),
        },
      };
    });

    setNodest(nodes);

    const edges = connections
      .map((connection, index) => {
        const sourceNode = nodes.find(
          (node) => node.data.label === connection[0],
        );
        const targetNode = nodes.find(
          (node) => node.data.label === connection[1],
        );

        if (!sourceNode || !targetNode) return null;

        return {
          id: `edge-${index}-${newReloadKey}`,
          source: sourceNode.id,
          target: targetNode.id,
        };
      })
      .filter(Boolean);

    setConnectionst(edges);
  }

  useEffect(() => {
    setCount(0);
    netFunc();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <AnimatePresence initial={false}>
      {count < nodest.length ? (
        <motion.div
          key="mapa"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
          relative
          w-[92vw]
          max-w-[1050px]
          h-[70vh]
          min-h-[500px]

          overflow-hidden
          rounded-3xl

          border border-red-900/40
          bg-black/50
          backdrop-blur-md

          shadow-2xl shadow-black/70
          flex justify-center items-center
        "
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-950/30 via-black/20 to-blue-950/20" />

          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-900/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-950/30 blur-3xl" />

          {!close ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
              absolute inset-0 z-20
              flex flex-col justify-center items-center
              bg-black/60
              backdrop-blur-md
              px-6
              text-center text-white
            "
            >
              <button
                className="
                absolute top-5 right-5
                rounded-full
                border border-white/15
                bg-white/5
                px-4 py-2
                text-sm text-slate-200

                hover:bg-red-900/40
                hover:text-white
                hover:border-red-400/30

                transition duration-300
              "
                onClick={() => setClose(true)}
              >
                Fechar
              </button>

              <div className="max-w-[620px] rounded-3xl border border-red-900/30 bg-black/40 p-8 shadow-2xl shadow-black/60">
                <h2 className="mb-4 text-2xl sm:text-3xl font-viaoda text-red-100">
                  Rede de Pensamentos
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                  Este mapa serve para que você observe seus pensamentos como
                  uma rede. Clique em cada pensamento até que todos desapareçam,
                  trabalhando a ideia de visualização e interação com aquilo que
                  está passando pela sua mente. Você pode arrastar a rede para
                  qualquer direção.
                </p>
              </div>
            </motion.div>
          ) : null}

          <div className="relative z-10 h-full w-full">
            <ReactFlow
              nodes={nodest}
              edges={connectionst}
              nodeTypes={nodeTypes}
              fitView
            />
          </div>

          <div
            className="
            absolute bottom-5 right-5 z-10
            rounded-2xl
            border border-white/10
            bg-black/50
            backdrop-blur-md
            px-5 py-4
            text-center
            text-slate-200
            shadow-lg shadow-black/50
          "
          >
            <p className="text-4xl text-red-100">{count}</p>

            <p className="text-xs sm:text-sm">
              {count == 0
                ? "Nenhum pensamento foi embora ainda"
                : count == 1
                  ? "pensamento foi embora"
                  : "pensamentos foram embora"}
            </p>
          </div>
        </motion.div>
      ) : count === nodest.length && nodest.length > 0 ? (
        <motion.div
          key="final"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="
          relative
          w-full h-full
          min-h-screen
          flex flex-col justify-center items-center
          overflow-hidden
          px-4
          text-center
        "
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute -top-20 h-80 w-80 rounded-full bg-red-900/30 blur-3xl" />

          <img
            src="/conffeti.gif"
            width="1000px"
            height="1000px"
            className="absolute z-20 pointer-events-none opacity-80"
            alt=""
          />

          <div className="relative z-30 max-w-[720px] rounded-3xl border border-red-900/40 bg-black/60 backdrop-blur-md p-8 shadow-2xl shadow-black/70">
            <p className="text-2xl sm:text-4xl font-viaoda text-red-100">
              Meus parabéns.
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-200">
              Você retirou todos os seus pensamentos da rede.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
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
                onClick={() => {
                  netFunc();
                  setCount(0);
                }}
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
                backdrop-blur-md
                px-6 py-3
                text-white
                shadow-lg shadow-black/40
                transition duration-300
                hover:bg-white/10
              "
              >
                🎬 Descobrir um filme e um livro
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Net;
