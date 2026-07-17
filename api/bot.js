const { Telegraf } = require('telegraf');
const Anthropic = require('@anthropic-ai/sdk');

// Vercel-dagi maxfiy kalitlarni o'qiymiz
const bot = new Telegraf(process.env.BOT_TOKEN);
const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

// Botga /start buyrug'i berilganda salomlashish xabari va Mini App tugmasi
bot.start((ctx) => {
  return ctx.reply('Salom! Evolution Logistics botiga xush kelibsiz. Quyidagi tugma orqali ilovani ochishingiz mumkin:', {
    reply_markup: {
      inline_keyboard: [
                [{ text: "📦 Ilovani ochish", web_app: { url: "https://vercel.app" } }]
      ]
    }
  });
});

// Foydalanuvchi botga matn yozganda Claude (AI) orqali javob qaytarish logikasi
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;
  
  try {
    // Claude API ga so'rov yuboramiz
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307', // Tezkor va arzon logistika modeli
      max_tokens: 1000,
      system: "Sen Evolution Logistics kompaniyasining aqlli AI yordamchisisan. Foydalanuvchilarga yuk tashish, tariflar va logistika bo'yicha professional, do'stona unda aniq javob ber. Faqat o'zbek, rus va ingliz tillarida javob qaytar.",
      messages: [{ role: 'user', content: userMessage }],
    });

    const aiReply = response.content.text;
    await ctx.reply(aiReply);
  } catch (error) {
    console.error('Claude API Error:', error);
    await ctx.reply('Kechirasiz, tizimda kichik nosozlik yuz berdi. Birozdan so\'ng qayta urinib ko\'ring.');
  }
});

// Vercel Serverless Function sifatida ishlashi uchun eksport qilamiz
module.exports = async (req, res) => {
  try {
    if (req.method === 'POST') {
      await bot.handleUpdate(req.body);
      res.status(200).send('OK');
    } else {
      res.status(200).send('Bot server is running...');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
};
