import { useState, useEffect } from "react";
import { obterAbastecimentoAnterior } from "../utils/calculations";
import "../styles/FormAbastecimento.css";

function FormAbastecimento({
  abastecimentos,
  onSubmit,
  abastecimentoEditando,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split("T")[0],
    quilometragem: "",
    litros: "",
    valorTotal: "",
    tipoCombustivel: "Gasolina",
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (abastecimentoEditando) {
      setFormData({
        data: abastecimentoEditando.data,
        quilometragem: abastecimentoEditando.quilometragem.toString(),
        litros: abastecimentoEditando.litros.toString(),
        valorTotal: abastecimentoEditando.valorTotal.toString(),
        tipoCombustivel: abastecimentoEditando.tipoCombustivel,
      });
    } else {
      // Ao adicionar novo, preencher com quilometragem sugerida
      const anterior = obterAbastecimentoAnterior(abastecimentos, 999999999);
      if (anterior) {
        setFormData((prev) => ({
          ...prev,
          quilometragem: (anterior.quilometragem + 100).toString(),
        }));
      }
    }
  }, [abastecimentoEditando, abastecimentos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpa erro do campo ao digitar
    if (erros[name]) {
      setErros((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.data) {
      novosErros.data = "Data é obrigatória";
    }

    if (!formData.quilometragem || formData.quilometragem <= 0) {
      novosErros.quilometragem = "Quilometragem deve ser maior que zero";
    } else {
      const kmAtual = parseFloat(formData.quilometragem);

      // Se não estiver editando, verifica se km é maior que o último
      if (!abastecimentoEditando) {
        const anterior = obterAbastecimentoAnterior(
          abastecimentos,
          kmAtual + 1
        );
        if (anterior && kmAtual <= anterior.quilometragem) {
          novosErros.quilometragem = `Quilometragem deve ser maior que ${anterior.quilometragem} km`;
        }
      } else {
        // Se estiver editando, verifica se km é maior que o anterior (excluindo o próprio registro)
        const abastecimentosSemAtual = abastecimentos.filter(
          (a) => a.id !== abastecimentoEditando.id
        );
        const anterior = obterAbastecimentoAnterior(
          abastecimentosSemAtual,
          kmAtual + 1
        );
        if (anterior && kmAtual <= anterior.quilometragem) {
          novosErros.quilometragem = `Quilometragem deve ser maior que ${anterior.quilometragem} km`;
        }
      }
    }

    if (!formData.litros || formData.litros <= 0) {
      novosErros.litros = "Quantidade deve ser maior que zero";
    }

    if (!formData.valorTotal || formData.valorTotal <= 0) {
      novosErros.valorTotal = "Valor total deve ser maior que zero";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const dados = {
      ...formData,
      quilometragem: parseFloat(formData.quilometragem),
      litros: parseFloat(formData.litros),
      valorTotal: parseFloat(formData.valorTotal),
    };

    onSubmit(dados);

    // Limpa o formulário se não estiver editando
    if (!abastecimentoEditando) {
      setFormData({
        data: new Date().toISOString().split("T")[0],
        quilometragem: "",
        litros: "",
        valorTotal: "",
        tipoCombustivel: "Gasolina",
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setFormData({
      data: new Date().toISOString().split("T")[0],
      quilometragem: "",
      litros: "",
      valorTotal: "",
      tipoCombustivel: "Gasolina",
    });
    setErros({});
  };

  const getUnidadeMedida = () => {
    return formData.tipoCombustivel === "GNV" ? "m³" : "L";
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-abastecimento">
        <div className="form-group">
          <label htmlFor="data">Data do Abastecimento</label>
          <input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            className={erros.data ? "input-error" : ""}
          />
          {erros.data && <span className="error-message">{erros.data}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="quilometragem">Quilometragem Atual (km)</label>
          <input
            type="number"
            id="quilometragem"
            name="quilometragem"
            value={formData.quilometragem}
            onChange={handleChange}
            step="1"
            min="0"
            className={erros.quilometragem ? "input-error" : ""}
          />
          {erros.quilometragem && (
            <span className="error-message">{erros.quilometragem}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tipoCombustivel">Tipo de Combustível</label>
          <select
            id="tipoCombustivel"
            name="tipoCombustivel"
            value={formData.tipoCombustivel}
            onChange={handleChange}
          >
            <option value="Gasolina">Gasolina</option>
            <option value="Etanol">Etanol</option>
            <option value="Diesel">Diesel</option>
            <option value="GNV">GNV</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="litros">Quantidade ({getUnidadeMedida()})</label>
          <input
            type="number"
            id="litros"
            name="litros"
            value={formData.litros}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={erros.litros ? "input-error" : ""}
          />
          {erros.litros && (
            <span className="error-message">{erros.litros}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="valorTotal">Valor Total (R$)</label>
          <input
            type="number"
            id="valorTotal"
            name="valorTotal"
            value={formData.valorTotal}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={erros.valorTotal ? "input-error" : ""}
          />
          {erros.valorTotal && (
            <span className="error-message">{erros.valorTotal}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {abastecimentoEditando
              ? "Salvar Alterações"
              : "Adicionar Abastecimento"}
          </button>
          {abastecimentoEditando && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormAbastecimento;
