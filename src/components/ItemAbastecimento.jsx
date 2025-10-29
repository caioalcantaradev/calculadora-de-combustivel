import {
  calcularConsumo,
  calcularCustoPorKm,
  obterAbastecimentoAnterior,
} from "../utils/calculations";
import "../styles/ItemAbastecimento.css";

function ItemAbastecimento({
  abastecimento,
  abastecimentos,
  onEdit,
  onDelete,
}) {
  const anterior = obterAbastecimentoAnterior(
    abastecimentos.filter((a) => a.id !== abastecimento.id),
    abastecimento.quilometragem + 1
  );

  const kmRodados = anterior
    ? abastecimento.quilometragem - anterior.quilometragem
    : null;
  const consumo = calcularConsumo(
    abastecimento.quilometragem,
    anterior?.quilometragem,
    abastecimento.litros
  );
  const custoPorKm = calcularCustoPorKm(abastecimento.valorTotal, kmRodados);

  const formatarData = (data) => {
    const date = new Date(data + "T00:00:00");
    return date.toLocaleDateString("pt-BR");
  };

  const getUnidadeMedida = () => {
    return abastecimento.tipoCombustivel === "GNV" ? "m³" : "L";
  };

  const getPrecoPorLitro = () => {
    return (abastecimento.valorTotal / abastecimento.litros).toFixed(3);
  };

  return (
    <div className="item-abastecimento">
      <div className="item-header">
        <div className="item-data">
          <span className="item-data-text">
            {formatarData(abastecimento.data)}
          </span>
        </div>
        <div className="item-actions">
          <button
            onClick={() => onEdit(abastecimento)}
            className="btn-icon btn-edit"
            title="Editar"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(abastecimento.id)}
            className="btn-icon btn-delete"
            title="Excluir"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="item-content">
        <div className="item-row">
          <div className="item-info">
            <span className="info-label">Quilometragem:</span>
            <span className="info-value">
              {abastecimento.quilometragem.toLocaleString("pt-BR")} km
            </span>
          </div>
          {kmRodados && (
            <div className="item-info">
              <span className="info-label">Km rodados:</span>
              <span className="info-value">
                {kmRodados.toLocaleString("pt-BR")} km
              </span>
            </div>
          )}
        </div>

        <div className="item-row">
          <div className="item-info">
            <span className="info-label">Combustível:</span>
            <span className="info-value">{abastecimento.tipoCombustivel}</span>
          </div>
          <div className="item-info">
            <span className="info-label">Quantidade:</span>
            <span className="info-value">
              {abastecimento.litros.toFixed(2)} {getUnidadeMedida()}
            </span>
          </div>
        </div>

        <div className="item-row">
          <div className="item-info">
            <span className="info-label">Valor Total:</span>
            <span className="info-value price">
              R$ {abastecimento.valorTotal.toFixed(2)}
            </span>
          </div>
          <div className="item-info">
            <span className="info-label">Preço por {getUnidadeMedida()}:</span>
            <span className="info-value">R$ {getPrecoPorLitro()}</span>
          </div>
        </div>

        {consumo !== null && (
          <div className="item-highlight">
            <div className="highlight-item">
              <span className="highlight-label">Consumo:</span>
              <span className="highlight-value">
                {consumo.toFixed(2)} km/{getUnidadeMedida()}
              </span>
            </div>
            {custoPorKm !== null && (
              <div className="highlight-item">
                <span className="highlight-label">Custo por km:</span>
                <span className="highlight-value">
                  R$ {custoPorKm.toFixed(3)}
                </span>
              </div>
            )}
          </div>
        )}

        {consumo === null && anterior && (
          <div className="item-warning">
            ⚠️ Não foi possível calcular o consumo (quilometragem inválida)
          </div>
        )}

        {!anterior && (
          <div className="item-info-message">
            ℹ️ Primeiro abastecimento registrado
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemAbastecimento;
