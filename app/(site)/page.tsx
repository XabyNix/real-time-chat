import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";

const Page = async () => {
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
