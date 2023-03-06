/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-04 15:30:37
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-04 15:32:09
 * @FilePath: \chat-app\src\utils\server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8081 });

const users = new Set();
const recentMessages = [];

const sendMessage = (message) => {
	for (const user of users) {
		user.socket.send(JSON.stringify(message));
	}
};

server.on('connection', (socket) => {
	console.log('New user connected!');

	const userRef = {
		socket: socket,
		lastActiveAt: Date.now(),
	};
	users.add(userRef);

	socket.on('message', (message) => {
		try {
			const parsedMessage = JSON.parse(message);

			if (
				typeof parsedMessage.sender !== 'string' ||
				typeof parsedMessage.body !== 'string'
			) {
				console.error('Invalid message received!', message);
				return;
			}

			const numberOfRecentMessages = recentMessages
				.filter((message) => message.sender === parsedMessage.sender)
				.length;
			if (numberOfRecentMessages >= 30) {
				socket.close(4000, 'flooding the chat');
				return;
			}

			const verifiedMessage = {
				sender: parsedMessage.sender,
				body: parsedMessage.body,
				sentAt: Date.now(),
			}

			sendMessage(verifiedMessage);

			userRef.lastActiveAt = Date.now();

			recentMessages.push(verifiedMessage);
			setTimeout(() => recentMessages.shift(), 60000);
		} catch (error) {
			console.error('Error parsing message!', error);
		}
	});

	socket.on('close', (code, reason) => {
		console.log(`User disconnected with code ${code} and reason ${reason}!`);
		users.delete(userRef);
	});
});

setInterval(() => {
	const now = Date.now();

	for (const user of users) {
		if (user.lastActiveAt < now - 300000) {
			user.socket.close(4000, 'inactivity');
		}
	}
}, 10000);