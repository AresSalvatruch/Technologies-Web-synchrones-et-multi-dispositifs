import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "./types";
declare const io: Server<ClientToServerEvents, ServerToClientEvents, import("socket.io").DefaultEventsMap, any>;
export { io };
//# sourceMappingURL=index.d.ts.map