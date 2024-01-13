"use server";

import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";

export const postMessage = async (formData: FormData) => {
	"use server";

	const Pusher = require("pusher");

	const session = await getServerSession(authOptions);
	const data = await prisma.message.create({
		data: {
			message: formData.get("message") as string,
			email: session?.user?.email as string,
			conversationId: "",
		},
		include: {
			user: {
				select: {
					name: true,
					image: true,
				},
			},
		},
	});

	const pusher = new Pusher({
		appId: process.env.PUSHER_APP_ID as string,
		key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
		secret: process.env.PUSHER_SECRET as string,
		cluster: process.env.NEXT_PUBLIC_PUSHER_CLOUSTER as string,
		useTLS: true,
	});
	pusher.trigger("orazio", "mess", data);
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
