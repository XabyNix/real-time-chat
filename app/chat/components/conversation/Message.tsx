import { cn } from "@/lib/utils";
import React from "react";

const Message = ({
	date,
	children,
	className,
}: {
	date: Date;
	children: string;
	className?: string;
}) => (
	<div className={cn("border-1 w-max p-2 rounded-md shadow-md bg-white", className)}>
		<p className="max-w-md break-words">{children}</p>
		<span className="font-light text-xs">
			{date.toLocaleString("it-IT", { hour: "2-digit", minute: "2-digit" })}
		</span>
	</div>
);
export default Message;
