import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("verified") === "true") {
      setMessageLogin("✅ Conta verificada com sucesso. Faça login.");
    } else if (params.get("verified") === "false") {
      setMessageLogin(
        "Conta ainda não verificada, cheque o email(cheque também o spam)!",
      );
    } else {
      setMessageLogin("");
    }
  }, [location]);

  const handleLogin = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const link = "https://goodday-back.onrender.com/api/auth/login";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, senha }),
    };
    const response = await fetch(link, options);
    const data = await response.json();
    setMessageLogin(data.message);

    try {
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/main");
      } else {
        if (data.message === "Usuário não encontrado") {
          navigate("/register");
        }
      }
    } catch (error) {
      setError("Erro ao conectar");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="
      w-[90%]
      max-w-[420px]
      min-h-fit

      flex flex-col items-center justify-center
      gap-5

      rounded-2xl
      border border-white/10
      bg-black/40
      p-6
      text-white
      backdrop-blur-md
      shadow-2xl shadow-black/60

      sm:p-8
      md:p-10
    "
    >
      {messageLogin && (
        <p className="text-center text-sm text-red-100">{messageLogin}</p>
      )}

      <h1 className="font-silkscreen text-2xl sm:text-3xl">Login</h1>

      <input
        type="email"
        className="
        w-full
        rounded-xl
        border border-white/10
        bg-black/40
        p-3
        text-white
        outline-none
        placeholder:text-slate-400

        focus:border-red-500/60
        focus:ring-2
        focus:ring-red-900/40
      "
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="
        w-full
        rounded-xl
        border border-white/10
        bg-black/40
        p-3
        text-white
        outline-none
        placeholder:text-slate-400

        focus:border-red-500/60
        focus:ring-2
        focus:ring-red-900/40
      "
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button
        className="
        mt-2
        w-full
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

        active:translate-y-0
      "
      >
        Entrar
      </button>

      <div className="flex flex-col items-center gap-2 text-sm text-slate-300 sm:flex-row sm:gap-5">
        <a
          href="#/register"
          className="underline underline-offset-4 transition hover:text-red-100"
        >
          Cadastrar
        </a>

        <a
          href="#/forgotpassword"
          className="underline underline-offset-4 transition hover:text-red-100"
        >
          Esqueci a senha
        </a>
      </div>
    </form>
  );
}

export default Login;
