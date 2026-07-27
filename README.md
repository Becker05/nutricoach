# NutriCoach

App de acompanhamento nutricional e de treino. Abre no navegador do celular, faz a anamnese, calcula dieta e treino, registra check-in diário e mostra a evolução. Cada aluno fica salvo no próprio aparelho; você exporta um arquivo `.json` por aluno para backup.

Não substitui avaliação clínica. Casos que exigem médico são sinalizados dentro do app.

## O que tem dentro

```
nutricionista-app/
├── index.html          página principal
├── styles.css          visual (tema escuro, mobile)
├── app.js              toda a lógica: anamnese, cálculos, planos, evolução
├── data.js             tabela de alimentos (macros por 100g) e suplementos
├── manifest.json       permite "instalar" no celular
├── sw.js               funciona offline
├── icon-192.png        ícones do app
├── icon-512.png
└── conhecimento/       os 13 módulos que definem o raciocínio
    ├── 01-persona.md
    ├── 02-fluxo-de-atendimento.md
    ├── 03-anamnese.md
    ├── 04-nutricao.md
    ├── 05-treino.md
    ├── 06-banco-de-exercicios.md
    ├── 07-acompanhamento.md
    ├── 08-regras-de-ajustes.md
    ├── 09-diario.md
    ├── 10-evidencias-cientificas.md
    ├── 11-casos-especiais.md
    ├── 12-comunicacao.md
    └── 13-sistema-de-evolucao.md
```

## Colocar no ar pelo GitHub Pages

Passo a passo, sem terminal.

1. Crie uma conta em github.com, se ainda não tiver.
2. Clique em **New repository**. Dê um nome, por exemplo `nutricoach`. Marque **Public**. Crie.
3. Na página do repositório, clique em **Add file → Upload files**.
4. Arraste **todos os arquivos desta pasta**, incluindo a pasta `conhecimento`. Confirme com **Commit changes**.
5. Vá em **Settings → Pages**.
6. Em **Source**, escolha **Deploy from a branch**. Em **Branch**, selecione `main` e a pasta `/ (root)`. Salve.
7. Espere um ou dois minutos. O endereço aparece no topo da mesma página, algo como `https://seu-usuario.github.io/nutricoach/`.
8. Abra esse endereço no celular.

## Instalar no celular (opcional)

Abra o endereço no navegador do celular e use "Adicionar à tela de início". O app passa a abrir como se fosse um aplicativo e funciona offline.

- iPhone (Safari): botão de compartilhar → "Adicionar à Tela de Início".
- Android (Chrome): menu de três pontos → "Adicionar à tela inicial".

## Como usar no dia a dia

1. **Novo aluno**: anamnese em seis etapas, incluindo meta de peso e suplementos. O app calcula as metas ao salvar.
2. **Resumo**: calorias, proteína, carbo, gordura, água e fibra, mais a projeção de prazo até o peso-alvo. Ajuste déficit, proteína e gordura se quiser.
3. **Dieta**: refeições coerentes com os gramas já calculados. Troque qualquer alimento nos menus e os gramas recalculam para bater a meta da refeição. Traz também os suplementos sugeridos e um cadastro de alimentos seus.
4. **Dia**: registre cada refeição do dia. Se comer diferente da meta, as refeições seguintes recalculam sozinhas para o dia fechar.
5. **Treino**: ficha com séries, repetições, descanso entre séries, cadência e volume semanal por grupo, evitando exercícios de risco pelas lesões.
6. **Check-in**: peso, sono, treino e demais campos, todo dia.
7. **Evolução**: gráfico de peso com média de 7 dias, tendência de 30 dias e a análise automática de ajustes.
8. **Dados → Exportar aluno**: baixe o `.json` de backup. Faça isso com frequência.

## Onde os dados ficam

Tudo é salvo no navegador do aparelho (localStorage). Trocar de celular, limpar os dados do navegador ou desinstalar apaga o histórico. Por isso: **exporte cada aluno com frequência**. Para levar para outro aparelho, use **Importar aluno** na tela inicial.

## Como os cálculos funcionam

- Metabolismo basal: fórmula de Mifflin-St Jeor.
- Gasto total: basal × fator de atividade.
- Calorias: déficit, manutenção ou superávit conforme o objetivo, com piso na taxa basal.
- Proteína e gordura por grama/kg; carboidrato preenche o restante das calorias.

A fundamentação está em `conhecimento/04-nutricao.md`, `05-treino.md` e `08-regras-de-ajustes.md`.

## Ajustar e evoluir o projeto

A arquitetura é modular. Para mudar uma regra de ajuste, edite `08-regras-de-ajustes.md` e a função correspondente em `app.js`. Para adicionar exercícios, siga o padrão do `06-banco-de-exercicios.md` e a lista `EXS` no `app.js`. Nenhum arquivo depende de outro para você editar.

## Aviso

Ferramenta de organização e educação. As recomendações são estimativas baseadas em consenso científico e não dispensam nutricionista e médico, em especial nos casos clínicos descritos em `conhecimento/11-casos-especiais.md`.
