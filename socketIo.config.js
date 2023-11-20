import { Server } from 'socket.io';

export default function injectSocketIO(server) {
	const io = new Server(server.httpServer);
	io.on('connection', (socket) => {
		socket.on('join_room', (room_id, name, done) => {
			socket.join(room_id);
			done();
			socket.to(room_id).emit('welcome', { name });
		});
		socket.on('exit_room', (room_id) => {
			socket.to(room_id).emit('bye');
		});
		socket.on('new_message', (message, room_id, name, member_id, user_image, done) => {
			socket.to(room_id).emit('new_message', {
				room_id,
				member_id,
				name,
				user_image,
				contents: message,
				create_date: new Date().toString(),
			});
			done();
		});
		socket.on('refetch_room_list', () => {
			io.emit('refetch_room_list');
		});
	});

	console.log('SocketIO injected');
}
