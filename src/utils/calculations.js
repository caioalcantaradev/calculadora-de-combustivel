/**
 * Calcula o consumo de combustível entre dois abastecimentos
 * @param {number} kmAtual - Quilometragem atual
 * @param {number} kmAnterior - Quilometragem do abastecimento anterior
 * @param {number} litros - Quantidade de litros ou m³ abastecidos
 * @returns {number|null} Consumo em km/L ou km/m³, ou null se não houver abastecimento anterior
 */
export function calcularConsumo(kmAtual, kmAnterior, litros) {
  if (!kmAnterior || kmAtual <= kmAnterior || !litros || litros <= 0) {
    return null;
  }
  const kmRodados = kmAtual - kmAnterior;
  return kmRodados / litros;
}

/**
 * Calcula o custo por quilômetro rodado
 * @param {number} valorTotal - Valor total pago no abastecimento
 * @param {number} kmRodados - Quilômetros rodados entre dois abastecimentos
 * @returns {number|null} Custo por km em R$/km, ou null se não houver quilometragem anterior
 */
export function calcularCustoPorKm(valorTotal, kmRodados) {
  if (!kmRodados || kmRodados <= 0 || !valorTotal || valorTotal <= 0) {
    return null;
  }
  return valorTotal / kmRodados;
}

/**
 * Calcula a média geral de consumo considerando todos os abastecimentos
 * Calcula a média ponderada entre cada par de abastecimentos consecutivos
 * @param {Array} abastecimentos - Array de abastecimentos ordenados por data
 * @returns {number|null} Média geral de consumo, ou null se não houver dados suficientes
 */
export function calcularMediaGeral(abastecimentos) {
  if (!abastecimentos || abastecimentos.length < 2) {
    return null;
  }

  const consumos = [];

  // Ordena por data (mais antigo primeiro)
  const ordenados = [...abastecimentos].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  for (let i = 1; i < ordenados.length; i++) {
    const atual = ordenados[i];
    const anterior = ordenados[i - 1];

    const kmRodados = atual.quilometragem - anterior.quilometragem;
    const consumo = calcularConsumo(
      atual.quilometragem,
      anterior.quilometragem,
      atual.litros
    );

    if (consumo && consumo > 0) {
      consumos.push(consumo);
    }
  }

  if (consumos.length === 0) {
    return null;
  }

  const soma = consumos.reduce((acc, consumo) => acc + consumo, 0);
  return soma / consumos.length;
}

/**
 * Calcula o custo médio por km considerando todos os abastecimentos
 * @param {Array} abastecimentos - Array de abastecimentos ordenados por data
 * @returns {number|null} Custo médio por km, ou null se não houver dados suficientes
 */
export function calcularCustoMedioPorKm(abastecimentos) {
  if (!abastecimentos || abastecimentos.length < 2) {
    return null;
  }

  const custos = [];

  // Ordena por data (mais antigo primeiro)
  const ordenados = [...abastecimentos].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  for (let i = 1; i < ordenados.length; i++) {
    const atual = ordenados[i];
    const anterior = ordenados[i - 1];

    const kmRodados = atual.quilometragem - anterior.quilometragem;
    const custo = calcularCustoPorKm(atual.valorTotal, kmRodados);

    if (custo && custo > 0) {
      custos.push(custo);
    }
  }

  if (custos.length === 0) {
    return null;
  }

  const soma = custos.reduce((acc, custo) => acc + custo, 0);
  return soma / custos.length;
}

/**
 * Ordena abastecimentos por data (mais recente primeiro)
 * @param {Array} abastecimentos - Array de abastecimentos
 * @returns {Array} Array ordenado por data (descendente)
 */
export function ordenarPorData(abastecimentos) {
  if (!abastecimentos || abastecimentos.length === 0) {
    return [];
  }

  return [...abastecimentos].sort((a, b) => {
    const dataA = new Date(a.data);
    const dataB = new Date(b.data);

    // Se as datas forem iguais, ordena por quilometragem (maior primeiro)
    if (dataA.getTime() === dataB.getTime()) {
      return b.quilometragem - a.quilometragem;
    }

    return dataB - dataA;
  });
}

/**
 * Obtém o último abastecimento com base na quilometragem
 * @param {Array} abastecimentos - Array de abastecimentos ordenados
 * @param {number} kmAtual - Quilometragem atual
 * @returns {Object|null} Último abastecimento antes da quilometragem atual
 */
export function obterAbastecimentoAnterior(abastecimentos, kmAtual) {
  if (!abastecimentos || abastecimentos.length === 0) {
    return null;
  }

  // Ordena por quilometragem (menor primeiro)
  const ordenados = [...abastecimentos]
    .filter((a) => a.quilometragem < kmAtual)
    .sort((a, b) => b.quilometragem - a.quilometragem);

  return ordenados.length > 0 ? ordenados[0] : null;
}
