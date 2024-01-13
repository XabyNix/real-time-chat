import { authOptions } from "@/lib/auth";
import { Button } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
	const session = await getServerSession(authOptions);
	if (session) redirect("/chat");

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<p>Devi essere registrato per usare la chat</p>
			<Link href={"/login"}>
				<Button>Log In</Button>
			</Link>
		</div>
	);
};

export default Page;
