import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";

const Contact = ({ data }: { data: User }) => {
	const { image, name, email } = data;

	return (
		<div className="flex items-center gap-3 transition-all p-2 rounded-lg cursor-pointer">
			<Image
				src={image || "/test.jpg"}
				alt="profile image"
				width={50}
				height={50}
				className="aspect-square"
			/>

			<div>
				<h3>{name}</h3>
				<h4 className="text-xs">{email}</h4>
			</div>
		</div>
	);
};

export default Contact;
