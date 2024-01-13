"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { postMessage } from "@/app/actions/action";

const ChatBottomBar = () => {
	return (
		<form action={async (formData) => await postMessage(formData)}>
			<div className="flex items-center">
				<Input placeholder="Scrivi il tuo messaggio qui..." name="message" radius="sm" />
				<Button type="submit" radius="full" className="p-2 ml-2 grow-0 bg-red-900">
					<PaperPlaneIcon width={30} height={30} color="white" />
				</Button>
			</div>
		</form>
	);
};

export default ChatBottomBar;
