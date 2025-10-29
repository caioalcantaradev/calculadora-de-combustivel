import { ordenarPorData } from "../utils/calculations";
import ItemAbastecimento from "./ItemAbastecimento";
import "../styles/ListaAbastecimentos.css";

function ListaAbastecimentos({ abastecimentos, onEdit, onDelete }) {
  const abastecimentosOrdenados = ordenarPorData(abastecimentos);

  if (abastecimentosOrdenados.length === 0) {
    return (
      <div className="lista-abastecimentos">
        <h2 className="lista-title">Histórico de Abastecimentos</h2>
        <div className="lista-vazia">
          <p>Nenhum abastecimento registrado ainda.</p>
          <p>Adicione seu primeiro abastecimento usando o formulário acima.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-abastecimentos">
      <h2 className="lista-title">Histórico de Abastecimentos</h2>
      <div className="lista-content">
        {abastecimentosOrdenados.map((abastecimento) => (
          <ItemAbastecimento
            key={abastecimento.id}
            abastecimento={abastecimento}
            abastecimentos={abastecimentos}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ListaAbastecimentos;
