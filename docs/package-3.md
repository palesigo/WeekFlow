# WeekFlow — Pacote 3

Versão `0.3.0`.

## Funcionalidades

- Recorrências diárias, semanais e mensais.
- Expansão das ocorrências apenas para o período visível.
- Indicador visual de atividades recorrentes.
- Deteção visual de conflitos de horário.
- Drag & drop para reagendar atividades não recorrentes.
- Criação, edição e remoção de períodos.
- Backup completo em JSON.
- Importação/restauro de backup com transação IndexedDB.
- Arquitetura separada entre UI, stores, services e repositories.

## Nota sobre recorrências

A atividade recorrente é guardada uma única vez. As ocorrências futuras são calculadas quando a semana é apresentada; não são criados centenas de registos duplicados.

Nesta versão, arrastar e largar está deliberadamente desativado nas ocorrências recorrentes para evitar alterar a regra inteira por acidente.
