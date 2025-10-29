import "../styles/Header.css";

function Header({ onToggleTheme, isDark }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-text">
            <h1 className="header-title">Calculadora de Combustível</h1>
            <p className="header-subtitle">
              Gerencie seus abastecimentos e acompanhe o consumo
            </p>
          </div>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            title={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
