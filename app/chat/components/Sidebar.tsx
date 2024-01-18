"use client";

import Image from "next/image";
import React, { ReactNode } from "react";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";
import AddConversationModal from "./contacts/addConversationModal";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Sidebar = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	const session = useSession();
	const regex = /^.*\/conversation\/\w*$/g;

	return (
		<div
			className={cn("flex flex-col p-1 md:max-w-xs w-full gap-1 border-r-1", {
				"hidden md:flex": regex.test(pathname) === true,
			})}
		>
			<AddConversationModal />
			{children}
			<div className="flex flex-grow-0 items-center justify-center gap-2 my-3 ">
				<Image
					className="aspect-square rounded-full"
					src={session.data?.user?.image || "/test.jpg"}
					alt=""
					width={30}
					height={30}
				/>
				<span>{session.data?.user?.name}</span>
			</div>
			<SignOutButton />
		</div>
	);
};

export default Sidebar;
