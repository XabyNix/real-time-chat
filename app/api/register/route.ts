import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
	const { name, email, password } = await req.json();
	if (!name || !email || !password) {
		return new NextResponse("Missing fields", { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 12);
	const data = await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: hashedPassword,
		},
	});
	return NextResponse.json(data);
};
