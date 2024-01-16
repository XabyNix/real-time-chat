"use server";

import prisma from "../../lib/db";

const getMessages = async (conversationId: string) => {
	"use server";

	const messages = await prisma.message.findMany({
		where: {
			conversationId: conversationId,
		},
	});
	return messages;
};
export default getMessages;
