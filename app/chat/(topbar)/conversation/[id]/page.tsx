import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import getMessages from "@/app/actions/getMessages";
import Messages from "../../../components/conversation/Messages";
import MessagesBottomSection from "@/app/chat/components/conversation/MessagesBottomSection";

const page = async ({ params }: { params: { id: string } }) => {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");

	const data = await getMessages(params.id);
	return (
		<div className="flex flex-col flex-1 bg-slate-100">
			<Messages data={data} conversationId={params.id} />
			<MessagesBottomSection conversationId={params.id} />
		</div>
	);
};

export default page;
