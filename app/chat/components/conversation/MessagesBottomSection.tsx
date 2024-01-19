"use client";
import React, { useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
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
				<Button isIconOnly type="submit" radius="full" className="ml-2 min-w-max bg-red-900">
					<PaperPlaneIcon width={30} height={30} color="white" />
				</Button>
			</div>
		</form>
	);
};

export default MessagesBottomSection;
