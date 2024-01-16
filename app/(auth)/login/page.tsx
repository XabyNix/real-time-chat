"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { FormEvent } from "react";
import bcrypt from "bcrypt";

const page = () => {
	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const email = formData.get("email");
		const password = formData.get("password");
		console.log(password);
		signIn("credentials", {
			email: email,
			password: password,

			callbackUrl: "/chat",
		});
	};

	return (
		<form className="max-w-xl mx-auto p-9 border-1" onSubmit={submitHandler}>
			<div className="flex flex-col gap-2">
				<Input type="email" name="email" label="Email" />
				<Input type="password" name="password" label="Password" />

				<Link href="/register" className="self-end">
					<Button variant="light" size="md">
						Sei gia registrato? Log In.
					</Button>
				</Link>
				<Button size="lg" type="submit">
					Entra
				</Button>
				<div>
					<Button onClick={() => signIn("github", { redirect: true, callbackUrl: "/chat" })}>
						GitHub
					</Button>
					<Button onClick={() => signIn("google", { redirect: true, callbackUrl: "/chat" })}>
						Google
					</Button>
				</div>
			</div>
		</form>
	);
};

export default page;
