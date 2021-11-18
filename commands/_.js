/*CMD
  command: *
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

var key = [[{ text: "Select Chat", switch_inline_query: "BTC" }]]
Api.sendMessage({
  text:
    "_Hi👋\nYou can use me to get Crypto/Currencies prices, you can convert a Currency to INR and USD Prices, Press the button below and select a chat where to use me.._\n*Live Price:* `@" +
    bot.name +
    " BTC`\n*Conversion:* `@" +
    bot.name +
    " convert 1 BTC INR`",
  reply_markup: { inline_keyboard: key },
  parse_mode: "Markdown"
})

