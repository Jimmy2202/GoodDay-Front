import Card from "./Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Main({ setLink }) {
  const [text, setText] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user || {});
  }, []);

  async function saveHistory(text, user, analyze) {
    const link = "https://goodday-back.onrender.com/api/history";

    await fetch(link, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text, user, analyze }),
    });
  }

  async function getImage(feeling) {
    let q = "";

    feeling === "ansiedade"
      ? (q = "stars")
      : feeling === "overthinking"
        ? (q = "garden")
        : feeling === "falta_de_foco"
          ? (q = "black_gradient")
          : feeling === "tristeza"
            ? (q = "sunny")
            : (q = "river");

    const link = `https://goodday-back.onrender.com/api/image?q=${q}`;

    const response = await fetch(link, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    const linkimage = data.results[0].urls.full;
    setLink(linkimage);
  }

  async function handlePrompt() {
    if (text.trim() === "" || loading) return;

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);

      const link = "https://goodday-back.onrender.com/api/ia/fetchprompt";

      localStorage.setItem("text", text);

      const response = await fetch(link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      const analyze = JSON.parse(data);

      await getImage(analyze.feeling);
      await saveHistory(text, user, analyze);

      if (analyze.mode === "organizer") {
        navigate("/main/organizer");
      } else if (analyze.mode === "net") {
        navigate("/main/net");
      } else if (analyze.mode === "breath") {
        navigate("/main/baloon");
      } else {
        navigate("/main/timer");
      }
    } catch (error) {
      console.error("Erro ao analisar pensamento:", error);
      setLoading(false);
    }
  }

  const food = [["🍅", 340, 10]];

  return (
    <main className="relative min-h-screen w-full overflow-y-auto bg-black/40 backdrop-blur-sm px-4 py-6 sm:px-6 md:px-10 flex flex-col items-center justify-center gap-6">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-900/40 border-t-red-400" />

          <p className="mt-6 text-red-100 font-medium tracking-wide animate-pulse">
            Analisando seu pensamento...
          </p>
        </div>
      )}

      <p className="font-viaoda absolute top-16 w-full max-w-5xl text-white text-4xl sm:text-4xl md:text-5xl leading-none self-start">
        Olá,
        <br />
        {user?.name || "usuário"}!
      </p>

      <section className="w-full max-w-[650px] flex justify-center items-center overflow-visible">
        {food.map(([emoji, hueA, hueB], i) => (
          <Card
            i={i}
            hueA={hueA}
            hueB={hueB}
            key={i}
            text={text}
            setText={setText}
          />
        ))}
      </section>

      <button
        onClick={handlePrompt}
        disabled={loading}
        className="
          group
          relative
          overflow-hidden
          px-8 py-3
          rounded-xl
          border border-red-700/40
          bg-gradient-to-b from-red-800/70 to-red-950/80
          backdrop-blur-md
          text-red-100
          font-medium
          tracking-wide
          shadow-lg shadow-red-950/50
          transition-all duration-300
          hover:-translate-y-1
          hover:border-red-500/60
          hover:shadow-red-700/40
          hover:text-white
          active:translate-y-0
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:translate-y-0
        "
      >
        <span
          className="
            absolute inset-0
            opacity-0
            bg-gradient-to-r
            from-transparent
            via-red-300/10
            to-transparent
            -translate-x-full
            group-hover:translate-x-full
            group-hover:opacity-100
            transition-all duration-700
          "
        />

        <span className="relative z-10">
          {loading ? "Analisando..." : "Analisar Pensamento"}
        </span>
      </button>
    </main>
  );
}

export default Main;
