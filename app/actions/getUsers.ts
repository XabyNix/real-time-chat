"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

const getUsers = async () => {
	"use server";
	const session = await getServerSession(authOptions);
	const data = await prisma.user.findMany({
		where: {
			NOT: {
				email: session?.user?.email,
			},
		},
	});

	return data;
};
export default getUsers;
