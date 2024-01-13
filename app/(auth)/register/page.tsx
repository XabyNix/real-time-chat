"use client";

import { registerUser } from "@/app/actions/action";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { FormEvent } from "react";

const actionHandler = async (data: FormData) => {
	const register = await registerUser(data);
	if (register?.error) {
		console.error(register.error);
	}
};

const page = () => {
	return (
		<form className="max-w-xl mx-auto" action={actionHandler}>
			<div className="flex flex-col gap-2 p-9">
				<Input label="Nome" name="name" />
				<Input type="email" name="email" label="Email" />
				<Input type="password" name="password" label="Password" />
				<div className="col-span-2 text-end mt-3">
					<Link href={"/login"}>
						<Button variant="light" size="md">
							Sei gia registrato? Log In.
						</Button>
					</Link>
				</div>

				<Button className="col-span-2" size="lg" type="submit">
					Registrati
				</Button>
			</div>
		</form>
	);
};

export default page;
