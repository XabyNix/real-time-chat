"use server";

import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const postData = async (formData: FormData) => {
	"use server";

	const Pusher = require("pusher");

	const session = await getServerSession(authOptions);
	const data = await prisma.message.create({
		data: {
			message: formData.get("message") as string,
			email: session?.user?.email,
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
