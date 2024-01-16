import getConversations from "../actions/getConversations";
import AddConversationModal from "./components/contacts/addConversationModal";
import getUsers from "../actions/getUsers";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import SignOutButton from "./components/SignOutButton";
import Contact from "./components/contacts/Contact";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const chats = await getConversations();
	const session = await getServerSession();
	const users = await getUsers();

	return (
		<main className="h-screen">
			<div className="flex h-full">
				<div className="flex flex-col p-1 max-w-xs w-full gap-1 border-r-1">
					<AddConversationModal data={users} />
					<ul className="flex-grow">
						{chats?.map((chat) => {
							const user = chat.User[0];
							return (
								<li key={chat.id}>
									<Contact id={chat.id} user={user} />
								</li>
							);
						})}
					</ul>
					<div className="flex flex-grow-0 items-center justify-center gap-2 my-3 ">
						<Image
							className="aspect-square rounded-full"
							src={session?.user?.image || "/test.jpg"}
							alt=""
							width={30}
							height={30}
						/>
						<span>{session?.user?.name}</span>
					</div>
					<SignOutButton />
				</div>

				{children}
			</div>
		</main>
	);
};

export default layout;
