"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { LoginFormData, LoginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = () => {
	const onSubmit = async (formData: LoginFormData) => {
		signIn("credentials", {
			...formData,
			callbackUrl: "/chat",
		});
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) });
	return (
		<form
			className="max-w-xl flex-1 p-9 py-14 border-1 rounded-sm bg-white"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col gap-4 justify-center items-center">
				<h2 className="mb-20 text-4xl font-bold tracking-wide">Login</h2>

				<Input
					{...register("email")}
					type="email"
					label="Email"
					isInvalid={!!errors.email}
					errorMessage={errors.email?.message}
					variant="bordered"
					radius="sm"
				/>
				<Input
					{...register("password")}
					type="password"
					label="Password"
					isInvalid={!!errors.password}
					errorMessage={errors.password?.message}
					variant="bordered"
					radius="sm"
				/>

				<Button variant="light" size="md" className="self-end mt-10">
					<Link prefetch={false} href="/register">
						Non sei ancora registrato?
					</Link>
				</Button>

				<Button
					type="submit"
					className="bg-teal-500 text-white font-bold"
					radius="sm"
					fullWidth
					size="lg"
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
	);
};

export default Form;
