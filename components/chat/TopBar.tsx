import { getServerSession } from "next-auth/next";
import Image from "next/image";
import React from "react";

const TopBar = ({ name, image }: { name: string; image: string }) => {
	return (
		<div className="shadow-md p-3">
			<div className="flex justify-end align-middle gap-2">
				<span>{name}</span>
				<Image className=" rounded-full" src={image} alt="" width={30} height={30} />
			</div>
		</div>
	);
};

export default TopBar;
