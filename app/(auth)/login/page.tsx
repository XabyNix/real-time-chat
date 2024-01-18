"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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
		<section className="flex justify-center items-center h-screen bg-teal-600">
			<form
				className="max-w-xl flex-1 p-9 py-14 border-1 rounded-sm bg-white"
				onSubmit={submitHandler}
			>
				<div className="flex flex-col gap-4 justify-center items-center">
					<h2 className="mb-20 text-4xl font-bold tracking-wide">Login</h2>

					<Input variant="bordered" radius="sm" type="email" name="email" label="Email" />
					<Input variant="bordered" radius="sm" type="password" name="password" label="Password" />

					<Link href="/register" className="self-end mt-10">
						<Button variant="light" size="md">
							Non sei ancora registrato?
						</Button>
					</Link>
					<Button
						radius="sm"
						className="bg-teal-500 text-white font-bold"
						fullWidth
						size="lg"
						type="submit"
					>
						Entra
					</Button>
					<div className="flex w-full gap-2">
						<Button
							size="lg"
							radius="sm"
							fullWidth
							className="bg-black text-white font-semibold text-lg"
							onClick={() => signIn("github", { redirect: true, callbackUrl: "/chat" })}
						>
							<FaGithub />
							GitHub
						</Button>
						<Button
							size="lg"
							radius="sm"
							fullWidth
							className="bg-blue-600 text-white font-semibold text-lg"
							onClick={() => signIn("google", { redirect: true, callbackUrl: "/chat" })}
						>
							<FcGoogle />
							Google
						</Button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default page;
