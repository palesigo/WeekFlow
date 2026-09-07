# WeekFlow

PWA de planeamento semanal, offline-first, construída com React + TypeScript + Vite + Dexie/IndexedDB.

## Pacote 3 — v0.3.0

Esta versão acrescenta recorrências, deteção de conflitos, drag & drop para reagendamento, gestão de períodos e backup/importação JSON.

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
