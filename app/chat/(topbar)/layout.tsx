import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import image from "next/image";
import TopBar from "../components/TopBar";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	return (
		<div className="flex-1 flex flex-col bg-slate-100">
			<TopBar name={session.user?.name as string} image={session.user?.image || "/test.jpg"} />
			{children}
		</div>
	);
};

export default layout;
