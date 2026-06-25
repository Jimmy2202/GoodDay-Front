import * as motion from "motion/react-client";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card2 from "./Card2";

function History() {
  const [text, setText] = useState("");
  const [array, setArray] = useState([]);
  const navigate = useNavigate();

  const container = {
    margin: "40px auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "80%",
  };

  useEffect(() => {
    async function getHistory() {
      const user = JSON.parse(localStorage.getItem("user"));
      const id = user.id;

      const link = `https://goodday-back.onrender.com/api/history/${id}`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };

      const response = await fetch(link, options);
      const data = await response.json();

      const arrayx = data.result.map((prev) => ({
        ...prev,
        hueA: 200,
        hueB: 10,
      }));

      setArray(arrayx);
    }

    getHistory();
  }, []);

  return (
    <main className="min-h-screen w-full overflow-y-auto bg-black/40 backdrop-blur-sm px-4 py-6 sm:px-6 md:px-10 flex flex-col items-center justify-center gap-6">
      <section className="w-full max-w-[650px] flex flex-col justify-center items-center overflow-visible">
        <h1 className="absolute font-silkscreen top-4 left-5 text-white z-50">
          Histórico
        </h1>

        {array.length === 0 ? (
          <div className="mt-28 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-2xl">
            <div className="text-5xl mb-4">📝</div>

            <h2 className="text-2xl text-white font-semibold mb-2">
              Histórico vazio
            </h2>

            <p className="text-gray-300 leading-relaxed">
              Você ainda não analisou nenhum pensamento.
              <br />
              Quando fizer sua primeira análise, ela aparecerá aqui.
            </p>

            <button
              onClick={() => navigate("/main")}
              className="
                mt-6
                px-6 py-3
                rounded-xl
                border border-red-700/40
                bg-gradient-to-b
                from-red-800/70
                to-red-950/80
                text-red-100
                font-medium
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-red-500/60
                hover:text-white
              "
            >
              Fazer primeira análise
            </button>
          </div>
        ) : (
          array.map(
            (
              {
                id,
                user_id,
                text_content,
                intensity,
                feeling,
                hueA,
                hueB,
                mode,
                create_time,
              },
              i,
            ) => {
              const date = new Date(create_time);

              return (
                <Card2
                  key={id}
                  hueA={hueA + i * 20}
                  hueB={hueB + i * 100}
                  i={i}
                  text={text_content}
                  mode={mode}
                  setText={setText}
                  feeling={feeling}
                  date={date.toLocaleString()}
                />
              );
            },
          )
        )}
      </section>
    </main>
  );
}

export default History;
