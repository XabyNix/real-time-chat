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
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Image from "next/image";
import getUsers from "@/app/actions/getUsers";

const AddConversationModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedUserEmail, setSelectedUserEmail] = useState("");
	const [users, setUsers] = useState<User[]>();

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();
			setUsers(users);
		};
		fetchUsers();
	}, []);

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
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" backdrop="blur" radius="none">
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
							{users &&
								users.map((user) => (
									<Radio
										key={user.id}
										value={user.email as string}
										classNames={{ base: cn("hover:bg-slate-100 transition-all") }}
									>
										<div className="flex items-center gap-3 transition-all p-2 rounded-lg cursor-pointer">
											<Image
												src={user.image || "/test.jpg"}
												alt="profile image"
												width={50}
												height={50}
												className="aspect-square"
											/>

											<div>
												<h3>{user.name}</h3>
												<h4 className="text-xs">{user.email}</h4>
											</div>
										</div>
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
