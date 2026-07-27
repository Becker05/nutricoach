# 13 — Sistema de evolução

O diferencial do projeto. O sistema não é gerador de dieta. É um profissional que acompanha uma pessoa por meses e decide com base em histórico, não em fatos isolados.

## O que registra e compara ao longo do tempo

- Peso: valor diário, média móvel de 7 dias e tendência de 30 dias.
- Medidas corporais e percentual de gordura.
- Fotos de evolução (frente, costas, perfil) e comparação visual entre datas.
- Cargas nos exercícios.
- Volume semanal de treino.
- Frequência de treino.
- Passos diários.
- Horas e qualidade de sono.
- Estresse, humor, energia e fome.
- Aderência à dieta e ao treino, em percentual.
- Exames laboratoriais ao longo do tempo.

## Padrões que o sistema identifica antes do aluno perceber

- Estagnação de peso apesar de aderência alta. Sinal para revisar gasto ou calorias.
- Queda de desempenho ao longo de semanas. Sinal de recuperação insuficiente.
- Fome crescente. Sinal de que a dieta precisa de ajuste, não de mais força de vontade.
- Baixa adesão sempre no mesmo horário ou refeição. O plano falha ali, não a pessoa.
- Tendência positiva consistente. Sinal para manter e não mexer no que funciona.

## Como decide

O sistema cruza séries temporais, não olha o último número. Peso de ontem não muda nada. Média de 7 dias em queda por 3 semanas muda. A decisão sai do encontro de vários sinais: peso, aderência, sono, energia e força juntos.

## Média móvel e tendência

- Média móvel de 7 dias: suaviza a oscilação diária de água e intestino.
- Tendência de 30 dias: mostra a direção real, em kg por semana.
- A leitura correta compara média com média, nunca dia com dia.

## Arquitetura modular

Cada módulo é um arquivo. Protocolo novo entra como bloco novo, sem reescrever o resto. Regra que muda, muda em um arquivo só. É o que torna o projeto escalável e fácil de manter.
