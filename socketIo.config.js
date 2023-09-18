import { Server } from 'socket.io';

export default function injectSocketIO(server) {
	const wsServer = new Server(server.httpServer);
	wsServer.on('connection', (socket) => {
		socket.on('join_room', (roomId, name, done) => {
			socket.join(roomId);
			done();
			socket.to(roomId).emit('welcome', { name });
		});
		socket.on('exit_room', () => {
			socket.rooms.forEach((room_id) => socket.to(room_id).emit('bye'));
		});
		socket.on('new_message', (message, room_id, name, user_id,user_image, done) => {
			socket.to(room_id).emit('new_message', {
				room_id: room_id,
				user_id: user_id,
				name: name,
				user_image: user_image,
				contents: message,
				create_date: new Date().toString(),
			});
			done();
		});
	});

	console.log('SocketIO injected');
}
