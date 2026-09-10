# WeekFlow

PWA de planeamento semanal, offline-first, construída com React + TypeScript + Vite + Dexie/IndexedDB.

## Pacote 5 — v0.5.0

Esta versão acrescenta calendário configurável, tema claro/escuro/automático, pesquisa de atividades e gestão de categorias e pessoas, mantendo as funcionalidades do Pacote 3.

## Desenvolvimento

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

Testes:

```bash
npm run test
```

Typecheck:

```bash
npm run typecheck
```

## Dados

Os dados da aplicação são locais no dispositivo, através de IndexedDB. O backup pode ser exportado em **Definições → Backup**.

## Git

A versão deste pacote é `v0.5.0`. Recomenda-se criar um commit e uma tag Git com esse número depois de validar a aplicação localmente.

### Vistas e impressão
O calendário pode ser consultado nas vistas **Semana**, **Mês** e **Ano**. A partir da barra superior é possível imprimir diretamente a vista semanal, mensal ou anual. A impressão é preparada para papel A4, com calendário mensal e resumo anual compactos.


## Package 5
- Gestão explícita da eliminação de séries recorrentes.
- Seleção de uma ou várias pessoas numa atividade.
- Pessoas associadas visíveis nas vistas semanal, mensal, Hoje e impressão.
- Impressão semanal em A4 horizontal.

### Experiência mobile
- Interface adaptada a ecrãs de telemóvel, com navegação por dia e gesto de deslize na vista semanal.
- Criação de atividades por toque, sem depender de duplo clique.
- Vista mensal com detalhe do dia selecionado.
- Vista anual compacta em duas colunas.
- Formulário de atividade em painel de ecrã quase completo, com controlos touch-friendly.
- A experiência desktop e a impressão A4 mantêm-se disponíveis.
