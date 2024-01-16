"use client";

import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import Pusher from "pusher-js";
import { Message as MessageType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";

const Messages = ({ data, conversationId }: { data: MessageType[]; conversationId: string }) => {
	const [messages, setMessages] = useState<MessageType[]>(data);
	const messagesToScroll = useRef<HTMLDivElement | null>(null);

	const session = useSession();

	useEffect(() => {
		const channel = pusherClient.subscribe(conversationId);
		channel.bind("message", (data: any) => {
			console.log(data);

			setMessages((prev) => [...prev, data]);
		});
		return () => pusherClient.unsubscribe(conversationId);
	}, []);

	useEffect(() => {
		if (messagesToScroll.current)
			messagesToScroll.current.scrollTop = messagesToScroll.current.scrollHeight;
	}, [messages]);

	return (
		<div
			className="flex flex-col flex-1 gap-2 overflow-y-auto scroll-smooth p-4"
			ref={messagesToScroll}
		>
			{messages.map(({ message, createdAt, senderEmail }, key) => {
				const isSent = senderEmail === session.data?.user?.email ? true : false;
				return (
					<Message className={isSent ? "ml-auto" : ""} date={createdAt} key={key}>
						{message}
					</Message>
				);
			})}
		</div>
	);
};

export default Messages;
