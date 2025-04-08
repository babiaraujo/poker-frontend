# Poker Game - Frontend

Este é o frontend do projeto **Texas Hold'em Poker**, desenvolvido em React + TypeScript com comunicação em tempo real com o backend via WebSocket (ActionCable/Rails).

## Tecnologias Utilizadas

- React 18 + TypeScript
- TailwindCSS + ShadCN
- Zustand (gerenciamento de estado)
- Axios (requisições HTTP)
- WebSocket (via ActionCable) – comunicação em tempo real com o backend Ruby on Rails

## Funcionalidades Implementadas

- ✅ Criação ou recuperação de jogador via nome ou ID
- ✅ Listagem de salas disponíveis
- ✅ Entrada em sala com validação
- ✅ Início automático do jogo ao entrar na sala
- ✅ Visualização das cartas do jogador e cartas comunitárias
- ✅ Exibição dos jogadores e posições na mesa
- ✅ Histórico de partidas do jogador
- ✅ Botões de ação: `Call`, `Raise`, `Fold`
- ✅ Avançar fases (`Flop`, `Turn`, `River`)
- ✅ Finalização da partida com avaliação da mão vencedora

## Comunicação com o Backend

O frontend consome uma API REST construída em Ruby on Rails, além de se conectar com o canal `RoomChannel` via WebSocket para atualizações em tempo real da sala e jogo.

## Próximos Passos / Pendências

- Melhorar layout responsivo e estilização da mesa
- Melhorar sincronização via WebSocket para múltiplos jogadores
- Exibir em tempo real o estado do jogo entre diferentes jogadores
- Mostrar mensagens de erro/sucesso para ações (feedback visual)
- Corrigir pequenos ajustes visuais na exibição do jogador atual

## Como Rodar Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

Certifique-se de que o backend esteja rodando em `http://localhost:3000`.

---
