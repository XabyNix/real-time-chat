import { cn } from "@/lib/utils";
import React from "react";

type props = {
	variant: "send" | "recived";
	children: string;
};
const Message = ({ variant, children }: props) => {
	if (variant === "send") {
		return <MessageBase className=" self-end">{children}</MessageBase>;
	} else {
		return <MessageBase>{children}</MessageBase>;
	}
};

export default Message;

const MessageBase = ({ className, children }: { className?: string; children: string }) => (
	<div className={cn("border-1 w-max p-2 rounded-md shadow-md", className)}>
		<p>{children}</p>
	</div>
);
