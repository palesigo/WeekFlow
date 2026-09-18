# WeekFlow — Package 5

**Versão:** 0.5.0

## Objetivos
- Tornar explícita a eliminação de uma série recorrente.
- Permitir definir uma ou várias pessoas numa atividade e tornar essa informação visível nas principais vistas.

## Alterações
- Ao eliminar uma atividade recorrente, é apresentada uma confirmação específica informando que a ação elimina **todas as ocorrências da série**.
- Mantém-se a lógica de recorrências dinâmicas: as ocorrências não são duplicadas no IndexedDB.
- O formulário de atividade permite selecionar nenhuma, uma ou várias pessoas.
- O formulário indica quantas pessoas estão selecionadas.
- A criação e gestão de pessoas passa a ser feita em **Definições → Pessoas**, evitando criar pessoas acidentalmente dentro de uma atividade.
- É possível ativar/desativar pessoas; a desativação mantém o histórico das atividades.
- Pessoas associadas passam a aparecer no calendário semanal, vista mensal, Hoje e impressão.
- Impressão semanal em A4 horizontal; mensal e anual em A4 vertical.
- Workflow de GitHub Pages incluído, com Node 24.

## Nota sobre pessoas
O modelo `Activity` já utiliza `personIds: string[]`, pelo que não é necessária uma migração estrutural da IndexedDB para suportar seleção múltipla.

## Versão
`0.5.0`

## Experiência mobile — v0.5.0
A interface foi adaptada para utilização confortável em telemóveis:
- vista semanal mobile centrada num dia, com faixa de 7 dias e navegação anterior/seguinte;
- gesto de deslize horizontal para mudar de dia;
- toque num horário para criar uma atividade;
- cartões de atividade maiores e legíveis, com pessoas, categoria, local e recorrência;
- vista mensal com detalhe das atividades do dia selecionado;
- vista anual compacta em duas colunas;
- formulário de atividade em painel inferior quase em ecrã completo;
- áreas de toque maiores e suporte para áreas seguras do iPhone;
- experiência desktop preservada e regras de impressão A4 mantidas.
