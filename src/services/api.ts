import axios from "axios";

const BASE_URL = "http://localhost:3000";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function createPlayer(name: string) {
    const response = await api.post("/players", {
        player: { name },
    });
    return response.data;
}

export async function getPlayer(playerId: number) {
    const response = await api.get(`/players/${playerId}`);
    return response.data;
}

export async function createRoom(name: string) {
    const response = await api.post("/rooms", { name });
    return response.data;
}

export async function joinRoom(roomId: number, playerId: number) {
    const response = await api.post(`/rooms/${roomId}/join`, {
        player_id: playerId,
    });
    return response.data;
}

export async function leaveRoom(roomId: number, playerId: number) {
    const response = await api.post(`/rooms/${roomId}/leave`, {
        player_id: playerId,
    });
    return response.data;
}

export async function startGame(roomId: number) {
    const response = await api.post(`/rooms/${roomId}/start`);
    return response.data;
}

export async function getGameState(gameId: number, playerId: number) {
    const res = await fetch(`${BASE_URL}/games/${gameId}?player_id=${playerId}`);

    if (!res.ok) {
        throw new Error("Erro ao buscar estado do jogo");
    }

    return res.json();
}

export async function sendAction(
    gameId: number,
    playerId: number,
    actionType: "call" | "raise" | "fold",
    amount: number = 0
) {
    const response = await api.post(`/games/${gameId}/action`, {
        player_id: playerId,
        action_type: actionType,
        amount,
    });
    return response.data;
}

export async function nextPhase(gameId: number) {
    const response = await api.post(`/games/${gameId}/next_phase`);
    return response.data;
}

export async function finishGame(gameId: number) {
    const response = await api.post(`/games/${gameId}/finish`);
    return response.data;
}

export async function getPlayerHistory(playerId: number) {
    const res = await api.get(`/game_results?player_id=${playerId}`);
    return res.data;
}


export async function evaluateHand(cards: string[]) {
    const response = await api.post(`/evaluate_hand`, { cards });
    return response.data;
}

export async function getRooms() {
    const res = await fetch("http://localhost:3000/rooms");

    if (!res.ok) {
        throw new Error("Erro ao buscar salas disponíveis");
    }

    return res.json();
}


export default api;
