# WeekFlow — Pacote 2: escopo técnico

## Objetivo
Passar do calendário demonstrativo para um MVP funcional, mantendo a separação entre UI, serviços, repositories e IndexedDB.

## Fluxo de dados
UI → Zustand → Service → Repository → Dexie/IndexedDB

A UI não acede diretamente à base de dados para operações de negócio.

## CRUD de atividades
- Create: ActivityForm → Zod → activityService → activityRepository.
- Read: carregamento global para a semana e filtragem por data.
- Update: edição pelo clique no cartão.
- Delete: confirmação antes de remover.
- Complete: Today permite alternar o estado rapidamente.

## Preparação para V3
A camada de serviço permite adicionar recorrências e conflitos sem alterar a estrutura principal dos componentes. A futura sincronização cloud poderá introduzir um repository remoto sem ligar a UI diretamente ao backend.
