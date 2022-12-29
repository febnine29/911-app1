import { createContext } from 'react';
import { io } from 'socket.io-client';
import env from '@env'

export const socket = io(env.SOCKET_URL, { transports: ['websocket'], withCredentials: true });
export const SocketContext = createContext(socket);