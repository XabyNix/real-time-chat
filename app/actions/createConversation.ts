"use server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";

const createConversation = async (email: string) => {
	const session = await getServerSession(authOptions);

	try {
		const conversation = await prisma.conversation.create({
			data: {
				User: {
					connect: [
						{
							email: email,
						},
						{
							email: session?.user?.email as string | undefined,
						},
					],
				},
			},
		});
		return conversation;
	} catch (error: any) {
		console.log(error.message);
		return null;
	}
};
export default createConversation;
