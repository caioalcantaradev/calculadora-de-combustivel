import {
  calcularMediaGeral,
  calcularCustoMedioPorKm,
  ordenarPorData,
} from "../utils/calculations";
import { useMemo, useState } from "react";
import "../styles/Dashboard.css";

function Dashboard({ abastecimentos }) {
  const [periodo, setPeriodo] = useState("total"); // total | semanal | quinzenal | mensal

  const agora = useMemo(() => new Date(), []);

  const dataCorte = useMemo(() => {
    const base = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    if (periodo === "semanal") {
      base.setDate(base.getDate() - 7);
    } else if (periodo === "quinzenal") {
      base.setDate(base.getDate() - 15);
    } else if (periodo === "mensal") {
      base.setDate(base.getDate() - 30);
    } else {
      return null;
    }
    return base;
  }, [agora, periodo]);

  const abastecimentosFiltrados = useMemo(() => {
    if (!dataCorte) return abastecimentos;
    return abastecimentos.filter((a) => new Date(a.data + "T00:00:00") >= dataCorte);
  }, [abastecimentos, dataCorte]);

  const mediaGeral = calcularMediaGeral(abastecimentosFiltrados);
  const custoMedioPorKm = calcularCustoMedioPorKm(abastecimentosFiltrados);
  const abastecimentosOrdenados = ordenarPorData(abastecimentosFiltrados);
  const ultimosTres = abastecimentosOrdenados.slice(0, 3);

  const formatarData = (data) => {
    const date = new Date(data + "T00:00:00");
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Resumo</h2>

      <div className="dashboard-filters">
        <label htmlFor="periodo" className="filter-label">Período:</label>
        <select
          id="periodo"
          className="filter-select"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        >
          <option value="total">Total</option>
          <option value="semanal">Últimos 7 dias</option>
          <option value="quinzenal">Últimos 15 dias</option>
          <option value="mensal">Últimos 30 dias</option>
        </select>
      </div>

      <div className="dashboard-metrics">
        <div className="metric-card">
          <div className="metric-label">Média de Consumo</div>
          <div className="metric-value">
            {mediaGeral !== null ? `${mediaGeral.toFixed(2)} km/L` : "N/A"}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Custo Médio por Km</div>
          <div className="metric-value">
            {custoMedioPorKm !== null
              ? `R$ ${custoMedioPorKm.toFixed(3)}`
              : "N/A"}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total de Abastecimentos</div>
          <div className="metric-value">{abastecimentosFiltrados.length}</div>
        </div>
      </div>

      {ultimosTres.length > 0 && (
        <div className="dashboard-recent">
          <h3 className="recent-title">Últimos Abastecimentos</h3>
          <div className="recent-list">
            {ultimosTres.map((abastecimento) => (
              <div key={abastecimento.id} className="recent-item">
                <div className="recent-date">
                  {formatarData(abastecimento.data)}
                </div>
                <div className="recent-details">
                  <span>
                    {abastecimento.litros}{" "}
                    {abastecimento.tipoCombustivel === "GNV" ? "m³" : "L"}
                  </span>
                  <span className="recent-separator">•</span>
                  <span>R$ {abastecimento.valorTotal.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
