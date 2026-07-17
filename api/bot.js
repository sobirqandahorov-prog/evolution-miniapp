const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  return ctx.reply('👋 Salom! Evolution Logistics botiga xush kelibsiz.\n\n🚚 Yuk tashish tariflarini hisoblash va botdan foydalanish oson bo\'lishi uchun quyidagi tugmani bosing:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📦 Ilovani ochish (Mini App)", web_app: { url: "https://vercel.app" } }]
      ]
    }
  });
});

bot.on('text', async (ctx) => {
  const msg = ctx.message.text.toLowerCase();
  
  if (msg.includes('salom') || msg.includes('assalom') || msg.includes('privet')) {
    return ctx.reply('👋 Assalomu alaykum! Evolution Logistics kompaniyasining rasmiy botiga xush kelibsiz. Sizga qanday yordam bera olaman?\n\n💡 Tariflarni koʻrish uchun pastdagi "📦 Ilovani ochish" tugmasini bosing.');
  }
  
  if (msg.includes('tarif') || msg.includes('narx') || msg.includes('narxi') || msg.includes('dostavka')) {
    return ctx.reply('📊 Bizning yuk tashish tariflarimiz:\n\n🚛 Avto (12-18 kun): $4.20 - $4.80 / kg\n🚂 JD (22-28 kun): $2.80 - $3.40 / kg\n✈️ Avia (5-8 kun): $6.50 - $8.00 / kg\n\n🧮 Aniqlab hisoblash uchun pastdagi Mini App ilovamizni oching!');
  }

  return ctx.reply('📝 Sizning soʻrovingiz qabul qilindi! Logistika menejerimiz tez orada siz bilan bogʻlanadi.\n\nℹ️ Shuningdek, pastdagi tugma orqali Mini App ilovamizni ochib, tariflarni oʻzingiz ham hisoblashingiz mumkin.');
});

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
