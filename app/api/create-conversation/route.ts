import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	try {
		const session = await getServerSession(authOptions);
		const data = await req.json();

		const conversation = await prisma.conversation.create({
			data: {
				User: {
					connect: [
						{
							email: data.email,
						},
						{
							email: session?.user?.email,
						},
					],
				},
			},
		});

		return NextResponse.json(conversation);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ statusText: "Error" }, { status: 400 });
	}
};
