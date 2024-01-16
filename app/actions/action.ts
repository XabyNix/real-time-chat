"use server";

import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";
import { pusherServer } from "@/lib/pusher";

export const sendMessage = async (formData: FormData, id: string) => {
	"use server";
	const message = formData.get("message") as string;

	const session = await getServerSession(authOptions);

	const data = await prisma.message.create({
		data: {
			message: message,
			senderEmail: session?.user?.email as string,
			conversationId: id,
		},
	});

	pusherServer.trigger(id, "message", data);
};

export const registerUser = async (formData: FormData) => {
	"use server";
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!name || !email || !password) {
		return { error: "Missing fields" };
	}

	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		const data = await prisma.user.create({
			data: {
				name: name,
				email: email,
				password: hashedPassword,
			},
		});
	} catch (error: any) {
		return { error: error.message as string };
	}
};
