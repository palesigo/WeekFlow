# WeekFlow

PWA de planeamento semanal, offline-first, construída com React + TypeScript + Vite + Dexie/IndexedDB.

## Pacote 4 — v0.4.0

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

A versão deste pacote é `v0.3.0`. Recomenda-se criar um commit e uma tag Git com esse número depois de validar a aplicação localmente.

### Vistas e impressão
O calendário pode ser consultado nas vistas **Semana**, **Mês** e **Ano**. A partir da barra superior é possível imprimir diretamente a vista semanal, mensal ou anual. A impressão é preparada para papel A4, com calendário mensal e resumo anual compactos.
