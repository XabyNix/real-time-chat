"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";

type Data = {
	id: string;
	message: string;
	createdAt: Date;
	senderEmail: string;
	conversationId: string;
};

type Props = {
	data: Data[];
	chatId: string;
};

const Messages = ({ data, chatId }: Props) => {
	const [messages, setMessages] = useState<Data[]>(data);

	const session = useSession();

	useEffect(() => {
		const channel = pusherClient.subscribe(chatId);
		channel.bind("message", (data: any) => {
			console.log(data);

			setMessages((prev) => [data, ...prev]);
		});
		return () => pusherClient.unsubscribe(chatId);
	}, []);

	return (
		<div className="flex flex-col-reverse flex-1 gap-2 overflow-y-auto scroll-smooth p-4">
			{messages.map(({ message, createdAt, senderEmail }, key) => {
				const isSent = senderEmail === session.data?.user?.email ? true : false;
				return (
					<div
						key={key}
						className={cn(
							"border-1 w-max p-2 rounded-md shadow-md bg-teal-50",
							isSent ? "ml-auto bg-teal-700 text-white" : ""
						)}
					>
						<p className="max-w-md break-words">{message}</p>
						<span className="font-light text-xs">
							{createdAt.toLocaleString("it-IT", { hour: "2-digit", minute: "2-digit" })}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default Messages;
