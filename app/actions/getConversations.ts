import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
const getConversations = async () => {
	"use server";
	const session = await getServerSession(authOptions);
	try {
		const data = await prisma.conversation.findMany({
			select: {
				User: {
					where: {
						NOT: {
							email: session?.user?.email,
						},
					},
				},
				id: true,
			},
			where: {
				User: { some: { email: session?.user?.email } },
			},
		});
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
export default getConversations;
