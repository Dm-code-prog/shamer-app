import {NextRequest, NextResponse} from "next/server";
import TelegramBot, {SendMessageOptions} from "node-telegram-bot-api";


const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, {webHook: true});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log("Received body:", body);
  const chatID = body.message.chat.id;
  await startHandler(chatID);
  return NextResponse.json({ok: true})
}


const startHandler = async (chatID: string) => {
  const opts = {
    reply_markup: {
      keyboard: [
        [{web_app: {url: process.env.WEB_APP_URL!}, text: 'Open the Shamer app'}],
      ],
    },
  } satisfies SendMessageOptions
  
  await bot.sendMessage(chatID, 'Shamer: Ignite your fitness journey with playful nudges and tough love. Celebrate progress, push limits, and remember—respect comes with dedication. Because, in the end, yes, you can. #RespectThroughChallenge', opts);
}