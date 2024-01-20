"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, RegisterSchema } from "@/lib/zod";
import { registerUser } from "@/app/actions/action";

const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({ resolver: zodResolver(RegisterSchema) });

	const actionHandler = async (data: RegisterFormData) => {
		const register = await registerUser(data);
		if (register?.error) {
			console.error(register.error);
		}
	};

	return (
		<form
			className="max-w-xl flex-1 p-9 py-14 border-1 rounded-sm bg-white"
			onSubmit={handleSubmit(actionHandler)}
		>
			<div className="flex flex-col gap-4 justify-center items-center">
				<h2 className="mb-20 text-4xl font-bold tracking-wide">Registrati</h2>

				<Input
					{...register("name")}
					isInvalid={!!errors.name}
					errorMessage={errors.name?.message}
					variant="bordered"
					radius="sm"
					label="Name"
				/>
				<Input
					{...register("email")}
					isInvalid={!!errors.email}
					errorMessage={errors.email?.message}
					variant="bordered"
					radius="sm"
					label="Email"
				/>
				<Input
					{...register("password")}
					isInvalid={!!errors.password}
					errorMessage={errors.password?.message}
					variant="bordered"
					radius="sm"
					type="password"
					label="Password"
				/>

				<Button variant="light" size="md">
					<Link prefetch={false} href="/login" className="self-end mt-10">
						Sei già registrato?
					</Link>
				</Button>
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
	);
};

export default Form;
