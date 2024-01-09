"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<NextUIProvider>
			<SessionProvider>{children}</SessionProvider>
		</NextUIProvider>
	);
};
export default Providers;
