"use client";

import { registerUser } from "@/app/actions/action";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const actionHandler = async (data: FormData) => {
	const register = await registerUser(data);
	if (register?.error) {
		console.error(register.error);
	}
};

const page = () => {
	return (
		<section className="flex justify-center items-center h-screen bg-teal-600">
			<form
				className="max-w-xl flex-1 p-9 py-14 border-1 rounded-sm bg-white"
				action={actionHandler}
			>
				<div className="flex flex-col gap-4 justify-center items-center">
					<h2 className="mb-20 text-4xl font-bold tracking-wide">Registrati</h2>

					<Input variant="bordered" radius="sm" type="text" name="name" label="Name" />
					<Input variant="bordered" radius="sm" type="email" name="email" label="Email" />
					<Input variant="bordered" radius="sm" type="password" name="password" label="Password" />

					<Link href="/login" className="self-end mt-10">
						<Button variant="light" size="md">
							Sei già registrato?
						</Button>
					</Link>
					<Button
						radius="sm"
						className="bg-teal-500 text-white font-bold"
						fullWidth
						size="lg"
						type="submit"
					>
						Registrati
					</Button>
				</div>
			</form>
		</section>
	);
};

export default page;
