import prisma from "@/lib/db";

const createConversation = async (email: string) => {
	"use server";
	try {
		const conversation = await prisma.user.update({
			where: {
				email: email,
			},
			data: {
				conversations: {
					create: { name: "ciao" },
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
