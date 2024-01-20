"use client";
import React, { useRef } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IoSend } from "react-icons/io5";
import { sendMessage } from "@/app/actions/action";

const MessagesBottomSection = ({ conversationId }: { conversationId: string }) => {
	const formRef = useRef<HTMLFormElement>(null);

	const actionHandler = async (formData: FormData) => {
		await sendMessage(formData, conversationId);
		formRef.current?.reset();
	};

	return (
		<form ref={formRef} action={actionHandler} className="">
			<div className="flex items-center bg-white p-3">
				<Input placeholder="Scrivi il tuo messaggio qui..." name="message" radius="sm" />
				<Button isIconOnly type="submit" radius="full" className="ml-2 bg-teal-500 text-white">
					<IoSend />
				</Button>
			</div>
		</form>
	);
};

export default MessagesBottomSection;
