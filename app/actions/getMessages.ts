"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import prisma from "../../lib/db";

const getMessages = async () => {
	"use server";
	const session = await getServerSession(authOptions);
	const messages = await prisma.message.findMany({
		select: {
			message: true,
			id: true,
		},
		where: {
			senderEmail: session?.user?.email as string,
		},
	});
	return messages;
};
export default getMessages;
