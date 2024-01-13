import getConversations from "../actions/getConversations";
import AddConversationModal from "./components/contacts/addConversationModal";
import getUsers from "../actions/getUsers";
import Image from "next/image";
import Link from "next/link";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const conversations = await getConversations();
	conversations?.forEach((c) => console.log(c));

	const users = await getUsers();

	return (
		<main className="h-screen">
			<div className="flex h-full">
				<div className="flex flex-col p-1 max-w-xs w-full gap-1">
					<AddConversationModal data={users} />

					{conversations?.map((conversation) => {
						const user = conversation.User[0];
						return (
							<Link href={`/chat/conversation/${conversation.id}`} key={conversation.id}>
								<div className="flex items-center lg:hover:bg-slate-100 gap-2 transition-all">
									<Image
										className="aspect-square rounded-full p-1"
										src={user.image || "/test.jpg"}
										alt=""
										width={50}
										height={50}
									/>
									<h3>{user.name}</h3>
								</div>
							</Link>
						);
					})}
				</div>

				{children}
			</div>
		</main>
	);
};

export default layout;
