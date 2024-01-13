import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
const getConversations = async () => {
	"use server";
	const session = await getServerSession(authOptions);
	try {
		const data = await prisma.user.findFirst({
			select: {
				conversations: {
					select: {
						User: {
							select: {
								image: true,
								name: true,
							},
							where: { NOT: { name: session?.user?.name } },
						},
						id: true,
					},
				},
			},
			where: {
				email: session?.user?.email,
			},
		});

		return data?.conversations;
	} catch (error) {
		console.log(error);
		return null;
	}
};
export default getConversations;
