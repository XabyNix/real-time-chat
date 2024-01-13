"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

const loginAction = (formData: FormData) => {
	const email = formData.get("email");
	const password = formData.get("password");
	signIn("credentials", {
		email: email,
		password: password,
		redirect: true,
		callbackUrl: "/chat",
	});
};

const page = () => {
	return (
		<form className="max-w-xl mx-auto" action={loginAction}>
			<div className="flex flex-col gap-2 p-9">
				<Input name="email" label="Email" />
				<Input name="password" type="password" label="Password" />
				<div className="col-span-2 text-end mt-3">
					<Link href={"/register"}>
						<Button variant="light" size="md">
							Non sei registrato?
						</Button>
					</Link>
				</div>

				<Button className="col-span-2" size="lg" type="submit">
					Entra
				</Button>
				<Button className="col-span-2" size="lg" type="submit">
					Entra con GitHub
				</Button>
			</div>
		</form>
	);
};

export default page;
