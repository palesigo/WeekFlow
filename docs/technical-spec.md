# WeekFlow — Especificação Técnica V1

## Arquitetura

React + TypeScript + Vite + PWA + Dexie/IndexedDB.

A UI não acede diretamente à base de dados. A arquitetura prevê repositories e services como camada de isolamento.

## Persistência

IndexedDB através de Dexie.

Tabelas:
- activities
- people
- categories
- periods
- recurrences
- settings

## Estratégia

Offline-first. A V1 não necessita de backend ou autenticação.

## Evolução

A camada Repository deverá permitir uma futura implementação cloud/sync sem alterar os componentes de UI.
