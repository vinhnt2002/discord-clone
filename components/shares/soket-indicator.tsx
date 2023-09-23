"use client";

import { useSocket } from "@/providers/socket-provider";
import { Badge } from "../ui/badge";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 border-none text-white">
        FallBack: Polling every 1s
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 border-none text-white">
      Live: Real-time updates
    </Badge>
  );
};

export default SocketIndicator;
