"use client";

import {
	Modal,
	Button,
	ModalContent,
	ModalBody,
	useDisclosure,
	ModalHeader,
	ModalFooter,
	Input,
	RadioGroup,
	Radio,
	cn,
} from "@nextui-org/react";
import createConversation from "@/app/actions/createConversation";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Contact from "./Contact";

const AddConversationModal = ({ data }: { data: User[] }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedUserEmail, setSelectedUserEmail] = useState("");

	const clickHandler = async () => {
		const conversation = await fetch("/api/create-conversation", {
			body: JSON.stringify({ email: selectedUserEmail }),
			method: "POST",
			cache: "no-cache",
		});
		if (!conversation.ok) console.log("Qualcosa è andato storto nell'aggiunta del contatto");
		onOpenChange();
	};

	return (
		<>
			<Button
				className=" bg-white flex items-center justify-center hover:bg-slate-100 p-7"
				radius="none"
				onClick={onOpen}
			>
				<IoIosAdd />
				<span className="font-medium">Crea conversazione</span>
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size="2xl"
				isDismissable={false}
				backdrop="blur"
				radius="none"
			>
				<ModalContent>
					<ModalHeader>Crea nuova conversazione</ModalHeader>
					<ModalBody>
						<Input />
						<RadioGroup
							value={selectedUserEmail}
							onValueChange={setSelectedUserEmail}
							classNames={{
								wrapper: cn("grid grid-cols-1 sm:grid-cols-2 overflow-y-scroll"),
							}}
						>
							{data.map((user) => (
								<Radio
									key={user.id}
									value={user.email as string}
									classNames={{ base: cn("hover:bg-slate-100 transition-all") }}
								>
									<Contact data={user} />
								</Radio>
							))}
						</RadioGroup>
					</ModalBody>
					<ModalFooter>
						<Button onClick={clickHandler}>Conferma</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddConversationModal;
