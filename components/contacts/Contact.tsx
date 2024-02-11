import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";

const Contact = ({ id, user }: { id: string; user: User }) => {
	return (
		<Link href={`/chat/${id}`}>
			<div className="flex items-center lg:hover:bg-slate-100 gap-2 transition-all">
				<Image
					className="aspect-square rounded-full p-1"
					src={user?.image || "/test.jpg"}
					alt=""
					width={50}
					height={50}
				/>
				<h3 className="font-medium">{user?.name}</h3>
			</div>
		</Link>
	);
};

export default Contact;
