import { useState } from "react";
import { useNavigate, useParams } from "react-router";

function ResetPassword() {
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      "https://goodday-back.onrender.com/api/auth/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token, senha }),
      },
    );

    const data = await response.json();
    setMessage(data.message);

    if (data.success) {
      setTimeout(() => navigate("/login"), 1500);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] max-w-[420px] flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-black/40 p-6 text-white backdrop-blur-md shadow-2xl shadow-black/60 sm:p-8"
    >
      <h1 className="font-silkscreen text-2xl">Nova senha</h1>

      {message && <p className="text-center text-sm text-red-100">{message}</p>}

      <input
        type="password"
        placeholder="Digite sua nova senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white outline-none placeholder:text-slate-400 focus:border-red-500/60 focus:ring-2 focus:ring-red-900/40"
      />

      <button className="w-full rounded-xl border border-red-700/40 bg-gradient-to-b from-red-800/70 to-red-950/80 px-6 py-3 text-red-100 shadow-lg shadow-red-950/40 transition duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:text-white">
        Redefinir senha
      </button>
    </form>
  );
}

export default ResetPassword;
