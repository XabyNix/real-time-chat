import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Login = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<p>Devi essere registrato per usare la chat</p>
			<Link href={"/api/auth/signin"}>
				<Button>Log In</Button>
			</Link>
		</div>
	);
};

export default Login;
