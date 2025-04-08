import { useEffect } from "react";
import cable from "@/lib/cable";

interface UsePokerSocketProps {
  onStateUpdate: (data: any) => void;
  playerId: string;
  name: string;
}

export function usePokerSocket({
  onStateUpdate,
  playerId,
  name,
}: UsePokerSocketProps) {
  useEffect(() => {
    if (!playerId || !name) return;

    const subscription = cable.subscriptions.create(
      { channel: "RoomChannel", room_id: 1 },
      {
        connected() {
          console.log("conectado ao RoomChannel");

          subscription.send({
            type: "join",
            playerId,
            name,
          });
        },

        received(data: { type: string; payload: any }) {
          console.log("Mensagem recebida:", data);

          if (data.type === "state") {
            onStateUpdate(data.payload);
          }
        },

        disconnected() {
          console.log("Desconectado do canal");
        },
      }
    );

    return () => {
      cable.subscriptions.remove(subscription);
    };
  }, [playerId, name, onStateUpdate]);
}
