import prisma from "@/lib/db";

const getMessages = async (conversationId: string) => {
	const messages = await prisma.message.findMany({
		where: {
			conversationId: conversationId,
		},
	});
	return messages;
};
export default getMessages;
