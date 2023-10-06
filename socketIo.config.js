import { Server } from 'socket.io';

export default function injectSocketIO(server) {
	const wsServer = new Server(server.httpServer);
	wsServer.on('connection', (socket) => {
		socket.on('join_room', (room_id, name, done) => {
			socket.join(room_id);
			done();
			socket.to(room_id).emit('welcome', { name });
		});
		socket.on('exit_room', (room_id) => {
			socket.to(room_id).emit('bye');
		});
		socket.on('new_message', (message, room_id, name, user_id, user_image, done) => {
			socket.to(room_id).emit('new_message', {
				room_id,
				user_id,
				name,
				user_image,
				contents: message,
				create_date: new Date().toString(),
			});
			done();
		});
		socket.on('new_message_other_room', () => {
			socket.emit('new_message_other_room');
		});
	});

	console.log('SocketIO injected');
}
