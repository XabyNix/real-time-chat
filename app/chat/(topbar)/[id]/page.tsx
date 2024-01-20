import getMessages from "@/app/actions/getMessages";
import Messages from "@/components/conversation/Messages";
import MessagesBottomSection from "@/components/conversation/MessagesBottomSection";

const page = async ({ params }: { params: { id: string } }) => {
	const data = await getMessages(params.id);
	return (
		<div className="flex flex-col flex-1 bg-slate-100">
			<Messages data={data} chatId={params.id} />
			<MessagesBottomSection conversationId={params.id} />
		</div>
	);
};

export default page;
