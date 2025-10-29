import { useState, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import FormAbastecimento from "./components/FormAbastecimento";
import ListaAbastecimentos from "./components/ListaAbastecimentos";
import "./App.css";

const LOCAL_STORAGE_KEY = "abastecimentos";

function App() {
  const { toggleTheme, isDark } = useTheme();
  const [abastecimentos, setAbastecimentos] = useState([]);
  const [abastecimentoEditando, setAbastecimentoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Carregar abastecimentos do LocalStorage ao inicializar
  useEffect(() => {
    const salvos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (salvos) {
      try {
        const abastecimentosSalvos = JSON.parse(salvos);
        setAbastecimentos(abastecimentosSalvos);
      } catch (error) {
        console.error(
          "Erro ao carregar abastecimentos do LocalStorage:",
          error
        );
      }
    }
  }, []);

  // Salvar abastecimentos no LocalStorage sempre que houver mudanças
  useEffect(() => {
    if (abastecimentos.length > 0 || localStorage.getItem(LOCAL_STORAGE_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(abastecimentos));
    }
  }, [abastecimentos]);

  const handleSubmit = (dados) => {
    if (abastecimentoEditando) {
      // Editar abastecimento existente
      setAbastecimentos((prev) =>
        prev.map((abastecimento) =>
          abastecimento.id === abastecimentoEditando.id
            ? { ...dados, id: abastecimentoEditando.id }
            : abastecimento
        )
      );
      setAbastecimentoEditando(null);
      setMostrarFormulario(false);
    } else {
      // Adicionar novo abastecimento
      const novoAbastecimento = {
        ...dados,
        id: Date.now(),
      };
      setAbastecimentos((prev) => [...prev, novoAbastecimento]);
      setMostrarFormulario(false);
    }
  };

  const handleEdit = (abastecimento) => {
    setAbastecimentoEditando(abastecimento);
    setMostrarFormulario(true);
    // Scroll para o formulário
    setTimeout(() => {
      const formElement = document.querySelector(".form-container");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este abastecimento?")) {
      setAbastecimentos((prev) =>
        prev.filter((abastecimento) => abastecimento.id !== id)
      );
      // Se estiver editando o item que foi excluído, cancela a edição
      if (abastecimentoEditando && abastecimentoEditando.id === id) {
        setAbastecimentoEditando(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setAbastecimentoEditando(null);
    setMostrarFormulario(false);
  };

  const handleNovoAbastecimento = () => {
    setAbastecimentoEditando(null);
    setMostrarFormulario(true);
    // Scroll para o formulário
    setTimeout(() => {
      const formElement = document.querySelector(".form-container");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Quando estiver editando, sempre mostra o formulário
  useEffect(() => {
    if (abastecimentoEditando) {
      setMostrarFormulario(true);
    }
  }, [abastecimentoEditando]);

  return (
    <div className="app">
      <Header onToggleTheme={toggleTheme} isDark={isDark} />
      <main className="app-main">
        <Dashboard abastecimentos={abastecimentos} />

        <div className="novo-abastecimento-btn-container">
          <button
            onClick={() => (mostrarFormulario ? handleCancelEdit() : handleNovoAbastecimento())}
            className="btn-novo-abastecimento"
            aria-label={mostrarFormulario ? "Recolher formulário" : "Abrir formulário de novo abastecimento"}
            title={mostrarFormulario ? "Recolher formulário" : "Abrir formulário de novo abastecimento"}
          >
            {mostrarFormulario ? (
              <svg
                className="icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                className="icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
            Novo Abastecimento
          </button>
        </div>

        {mostrarFormulario && (
          <FormAbastecimento
            abastecimentos={abastecimentos}
            onSubmit={handleSubmit}
            abastecimentoEditando={abastecimentoEditando}
            onCancel={handleCancelEdit}
          />
        )}

        <ListaAbastecimentos
          abastecimentos={abastecimentos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
