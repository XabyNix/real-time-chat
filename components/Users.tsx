import React, { ReactNode } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Login from "./Login";

const Users = async ({ items, children }: { items: User[]; children: ReactNode }) => {
	return (
		<div className="h-full lg:pl-80">
			{items.map((data) => (
				<Item key={data.id} data={data} />
			))}
			{children}
		</div>
	);
};

export default Users;

export const Item = ({ data }: { data: User }) => {
	return (
		<div>
			<Image src={data.image || ""} width={30} height={30} alt="image of the contact" />
			<span>{data.name}</span>
		</div>
	);
};
