import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<form action="">
			<div className="grid grid-cols-2 gap-2 max-w-xl mx-auto p-9">
				<Input className="col-span-2" label="Nome Utente" />
				<Input className="col-span-2" label="Email" />
				<Input className="col-span-2" label="Ripeti Email" />
				<Input type="password" label="Password" />
				<Input type="password" label="Ripeti Password" />
				<div className="col-span-2 text-end m-3">
					<Link href={"/register"}>Non sei registrato?</Link>
				</div>

				<Button className="col-span-2" size="lg" type="submit">
					Entra
				</Button>
			</div>
		</form>
	);
};

export default page;
