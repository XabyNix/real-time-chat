import PusherClient from "pusher-js";
import PusherServer from "pusher";

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
	cluster: process.env.NEXT_PUBLIC_PUSHER_CLOUSTER as string,
});
export const pusherServer = new PusherServer({
	appId: process.env.PUSHER_APP_ID as string,
	key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
	secret: process.env.PUSHER_SECRET as string,
	cluster: process.env.NEXT_PUBLIC_PUSHER_CLOUSTER as string,
	useTLS: true,
});
