"use client";

import React, { useEffect, useState } from "react";
import Message from "./Message";
import Pusher from "pusher-js";

interface prop {
	data: {
		message: string;
		id: string;
	}[];
}

const Chat = ({ data }: prop) => {
	const [messages, setMessages] = useState(data);

	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLOUSTER as string,
		});

		const channel = pusher.subscribe("orazio");
		channel.bind("mess", (data: any) => {
			console.log(data);

			setMessages((prev) => [...prev, data]);
		});
		return () => pusher.unsubscribe("orazio");
	}, []);

	return (
		<div className=" flex flex-col gap-2 overflow-y-scroll max-h-[500px]">
			{messages.map(({ message, id }, key) => (
				<Message variant="send" key={key}>
					{message}
				</Message>
			))}
		</div>
	);
};

export default Chat;
