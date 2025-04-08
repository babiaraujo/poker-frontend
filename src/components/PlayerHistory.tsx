import { useEffect, useState } from "react";
import { getPlayer } from "@/services/api";

interface PlayerHistoryProps {
  id: number;
}

export function PlayerHistory({ id }: PlayerHistoryProps) {
  const [playerData, setPlayerData] = useState<any>(null);

  useEffect(() => {
    getPlayer(id).then(setPlayerData);
  }, [id]);

  if (!playerData) return null;

  return (
    <div className="mt-8 p-4 border rounded bg-muted">
      <h2 className="text-lg font-semibold mb-2">Histórico do Jogador</h2>
      <p><strong>Nome:</strong> {playerData.name}</p>
      <p><strong>Fichas:</strong> {playerData.chips}</p>
      <p><strong>ID:</strong> {playerData.id}</p>
    </div>
  );
}
