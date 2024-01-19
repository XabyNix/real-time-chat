import prisma from "./db";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "dahgdawdk@gmail.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) return null;

				const isValid = user.password && (await compare(credentials.password, user.password));
				console.log(isValid);
				return isValid ? user : null;
			},
		}),
	],

	pages: {
		signIn: "/login",
		newUser: "/register",
	},
	session: { strategy: "jwt" },
	debug: true,
	secret: process.env.NEXTAUTH_SECRET,
};
