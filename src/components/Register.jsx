import ReactSlider from "react-slider";
import { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const link = "https://goodday-back.onrender.com/api/auth/register";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, senha, nome, idade }),
    };
    const response = await fetch(link, options);
    const data = await response.json();

    if (data.success) {
      navigate(`/login?verified=false`, { replace: true });
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="
      w-[90%]
      max-w-[440px]

      flex flex-col items-center justify-center
      gap-5

      rounded-2xl
      border border-white/10
      bg-black/40
      p-6
      backdrop-blur-md
      shadow-2xl shadow-black/60

      sm:p-8
      md:p-10
    "
    >
      <h1 className="font-silkscreen text-2xl text-white sm:text-3xl">
        Registrar
      </h1>

      <input
        type="text"
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
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <div className="w-full">
        <div className="mb-3 flex items-center justify-between text-white">
          <p>Idade</p>
          <span className="rounded-full bg-red-950/70 px-3 py-1 text-sm text-red-100">
            {idade}
          </span>
        </div>

        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          min={16}
          max={100}
          value={idade}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          onChange={(current) => setIdade(current)}
        />
      </div>

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
        Cadastrar
      </button>
    </form>
  );
}

export default Register;
