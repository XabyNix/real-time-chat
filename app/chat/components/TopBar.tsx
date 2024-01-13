import Image from "next/image";
import React from "react";
import SignOutButton from "./conversation/SignOutButton";

const TopBar = ({ name, image }: { name: string; image: string }) => {
	return (
		<div className="p-3 border-b-1">
			<div className="flex justify-end items-center gap-2">
				<span>{name}</span>
				<Image className="aspect-square rounded-full" src={image} alt="" width={30} height={30} />

				<SignOutButton />
			</div>
		</div>
	);
};

export default TopBar;
