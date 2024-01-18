import Sidebar from "./components/Sidebar";
import { getServerSession } from "next-auth";
import Contact from "./components/contacts/Contact";
import getConversations from "../actions/getConversations";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const chats = await getConversations();

	return (
		<main className="h-screen">
			<div className="flex h-full">
				<Sidebar>
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
				</Sidebar>

				{children}
			</div>
		</main>
	);
};

export default layout;
