import {NextRequest, NextResponse} from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log("Received body:", body);
  const chatID = body.message.chat.id;
  await startHandler(chatID);
  return NextResponse.json({ok: true})
}


const startHandler = (chatID: string) => {
  const webAppURL = process.env.WEB_APP_URL;
  if (!webAppURL) {
    throw new Error('WEB_APP_URL is not defined');
  }
  
  return fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatID,
      text: `Welcome to the Web App! Click [here](${webAppURL}) to start using the app.`
    })
  });
}