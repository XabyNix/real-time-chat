"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
	return (
		<Button
			color="danger"
			onClick={() => {
				signOut({ callbackUrl: "/" });
			}}
		>
			Log Out
		</Button>
	);
};

export default SignOutButton;
