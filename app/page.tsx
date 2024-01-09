import Chat from "@/components/chat/Chat";
import ChatBottomBar from "@/components/chat/ChatBottomBar";
import TopBar from "@/components/chat/TopBar";
import Login from "@/components/Login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

const getData = async () => {
	const session = await getServerSession(authOptions);
	const messages = await prisma.message.findMany({
		select: {
			message: true,
			id: true,
		},
		where: {
			email: session?.user?.email as string,
		},
	});
	return messages;
};

const Home = async () => {
	const session = await getServerSession(authOptions);
	if (!session) return <Login />;

	const image = session.user?.image as string;
	const name = session.user?.name as string;
	const data = await getData();

	return (
		<div className="w-full max-w-md mx-auto flex flex-col gap-2">
			<TopBar name={name} image={image} />
			<Chat data={data} />
			<ChatBottomBar />
		</div>
	);
};
export default Home;
