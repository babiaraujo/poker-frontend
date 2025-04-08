import api from "./api";

interface AddPlayerToRoomParams {
  roomId: number;
  playerId: number;
}

export async function addPlayerToRoom({
  roomId,
  playerId,
}: AddPlayerToRoomParams): Promise<void> {
  await api.post(`/rooms/${roomId}/join`, {
    player_id: playerId,
  });
}
