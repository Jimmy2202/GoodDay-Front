import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Neutral() {
  const [movie, setMovie] = useState({});
  const [book, setBook] = useState({});
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    async function getMovie(text) {
      const link = "https://goodday-back.onrender.com/api/movie";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      };

      const response = await fetch(link, options);
      const data = await response.json();
      console.log(data);

      const foundMovie = data.results.find((object) => object.title === text);

      if (!foundMovie) {
        console.log("Filme não encontrado");
        return;
      }

      setMovie({
        title: foundMovie.title,
        path: foundMovie.poster_path,
        overview: foundMovie.overview,
      });
    }

    async function getMain() {
      const text = localStorage.getItem("text");
      console.log(text);

      const link = "https://goodday-back.onrender.com/api/ia/getmovie";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      };

      const response = await fetch(link, options);
      const data = await response.json();
      const info = JSON.parse(data.message.content);

      const movie = info.movie;
      const book = info.book;

      setBook(book);
      await getMovie(movie);
    }

    getMain();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen flex flex-col gap-8 p-6 items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
          Recomendações para agora
        </p>

        <h1 className="text-3xl md:text-5xl font-bold mt-3">
          Algo leve para acompanhar seu momento
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 120,
        }}
        whileHover={{
          scale: 1.03,
          rotate: 1,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-[280px] md:w-[340px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md"
      >
        {movie.path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.path}`}
            className="w-full h-[520px] object-cover"
            alt={movie.title}
          />
        ) : (
          <div className="w-full h-[520px] flex items-center justify-center bg-slate-800 text-slate-300">
            Carregando filme...
          </div>
        )}

        <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent">
          <h2 className="text-xl font-bold text-center">
            {movie.title ? "Filme: " + movie.title : "Buscando recomendação..."}
          </h2>
        </div>

        <AnimatePresence>
          {hovered && movie.overview && (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-0 left-0 w-full max-h-[70%] overflow-y-auto bg-black/75 backdrop-blur-md p-4 text-sm text-center"
            >
              {movie.overview}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          type: "spring",
        }}
        whileHover={{
          scale: 1.05,
        }}
        className="max-w-xl bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 text-center shadow-xl"
      >
        <p className="text-slate-400 text-sm mb-2">Recomendação de livro</p>

        <p className="text-xl font-semibold">
          {typeof book === "string"
            ? book
            : book?.title
              ? book.title
              : "Buscando livro..."}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Neutral;
