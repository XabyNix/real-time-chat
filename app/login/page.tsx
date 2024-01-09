import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<form className=" max-w-xl mx-auto" action="">
			<div className=" flex flex-col gap-2 p-9">
				<Input className="col-span-2" label="Nome Utente" />
				<Input type="password" label="Password" />
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
