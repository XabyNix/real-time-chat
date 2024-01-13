import getMessages from "@/app/actions/getMessages";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Chat from "../../../components/conversation/Chat";
import ChatBottomBar from "../../../components/conversation/ChatBottomBar";

const page = async () => {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");

	const data = await getMessages();
	return (
		<div className="flex flex-col flex-1">
			<Chat data={data} />
			<ChatBottomBar />
		</div>
	);
};

export default page;
