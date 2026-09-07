# WeekFlow — Pacote de Desenvolvimento 2

Pacote 2 continua diretamente o Pacote 1 e transforma o protótipo num MVP navegável.

## Incluído
- CRUD real de atividades: criar, editar, eliminar e marcar como concluída.
- ActivityForm em bottom-sheet responsivo.
- Validação de título e horários.
- Categorias e pessoas carregadas da IndexedDB.
- Navegação funcional: Semana, Hoje, Períodos e Definições.
- Vista Hoje com lista ordenada e conclusão rápida.
- Repositories para atividades, categorias, pessoas e períodos.
- Zustand para estado de UI/dados carregados.
- Double-click numa célula da semana para criar atividade nesse dia.
- Dados continuam locais e offline via IndexedDB.

## Executar
```bash
npm install
npm run dev
```
Abrir o endereço indicado pelo Vite, normalmente http://localhost:5173/

## Build
```bash
npm run build
```

## Próximo pacote sugerido
Pacote 3: recorrências, deteção visual de conflitos, gestão completa de categorias/pessoas/períodos, drag & drop, melhoria mobile e backup/importação JSON.
