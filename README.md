# Calculadora de Consumo de Combustível

Aplicação web em React para gerenciar abastecimentos de veículo e calcular automaticamente a média de consumo (km/L), custo por km e histórico de abastecimentos.

## Funcionalidades

- ✅ Registro de abastecimentos com data, quilometragem, quantidade e valor
- ✅ Suporte para múltiplos tipos de combustível (Gasolina, Etanol, Diesel, GNV)
- ✅ Cálculo automático de consumo entre abastecimentos consecutivos
- ✅ Cálculo de custo por quilômetro rodado
- ✅ Dashboard com métricas gerais e resumo dos últimos abastecimentos
- ✅ Histórico completo de abastecimentos em ordem cronológica
- ✅ Edição e exclusão de registros
- ✅ Persistência de dados no LocalStorage
- ✅ Interface responsiva e moderna

## Tecnologias

- **React** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server
- **JavaScript** - Linguagem de programação
- **CSS** - Estilização pura com CSS modular
- **LocalStorage** - Persistência de dados no navegador

## Instalação

1. Clone o repositório ou baixe os arquivos
2. Instale as dependências:

```bash
npm install
```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Header.jsx
│   ├── Dashboard.jsx
│   ├── FormAbastecimento.jsx
│   ├── ListaAbastecimentos.jsx
│   └── ItemAbastecimento.jsx
├── utils/               # Funções utilitárias
│   └── calculations.js
├── styles/              # Arquivos CSS
│   ├── Header.css
│   ├── Dashboard.css
│   ├── FormAbastecimento.css
│   ├── ItemAbastecimento.css
│   └── ListaAbastecimentos.css
├── App.jsx              # Componente principal
├── App.css
├── index.css            # Estilos globais
└── main.jsx             # Ponto de entrada
```

## Como Usar

1. **Adicionar Abastecimento**: Preencha o formulário com os dados do abastecimento e clique em "Adicionar Abastecimento"
2. **Visualizar Métricas**: O dashboard mostra automaticamente a média de consumo, custo médio por km e total de abastecimentos
3. **Editar Registro**: Clique no ícone de editar (✏️) em qualquer abastecimento para modificar seus dados
4. **Excluir Registro**: Clique no ícone de excluir (🗑️) e confirme a exclusão

## Cálculos

- **Consumo**: Calculado entre cada par de abastecimentos consecutivos (km rodados ÷ litros/m³)
- **Média Geral**: Média aritmética de todos os consumos calculados
- **Custo por Km**: Valor total pago ÷ quilômetros rodados entre abastecimentos

## Dados Salvos

Todos os dados são salvos automaticamente no LocalStorage do navegador. Não é necessário conexão com internet após o carregamento inicial.

## Licença

Este projeto é de código aberto e está disponível para uso livre.
