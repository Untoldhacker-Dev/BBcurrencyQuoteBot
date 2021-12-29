/*CMD
  command: /inlineQuery
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/
function pushCustomQuery(title, query){
  results.push({
    type: "article",
    id: totalResult,
    title: title,
    input_message_content: {
      message_text: query
           },
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "New Query",
            switch_inline_query_current_chat: "$ 1 BTC to INR"
          }
        ]
      ]
    }
  })
  Api.answerInlineQuery({
    inline_query_id: request.id,
    results: results,
    cache_time: 3 // cache time in sec
  })
}
function errorCheck(code){
var bjs = code
//it us for price
try {
  var result = eval(bjs)
} catch (err) {
  //CurrencyQuote Lib returns error if the currency symbol entered is incorrect!
  // We can inform user:
  return false //error - execute error function
}
  return true //is ok - proceed
}
function validateData() {
  //Amount sometimes can be entered which is not numeric!
  if (isNaN(amount_data) == true) {
    return false
  }
  return amount_data
}

function invalidAmount() {
  results.push({
    type: "article",
    id: totalResult,
    title: "Illegal Statement",
    input_message_content: {
      message_text:
        "Convert_to data isn't numeric! please ensure you enter $ amount from_currency to to_currency\n\nexample for 1 BitCoin to iNR, Enter: $ 1 BTC to INR "
    },
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "New Query",
            switch_inline_query_current_chat: "$ 1 BTC to INR"
          }
        ]
      ]
    }
  })
  Api.answerInlineQuery({
    inline_query_id: request.id,
    results: results,
    cache_time: 3 // cache time in sec
  })
}
function invalidExchangeData(err) {
  var title = "⚠️ No Data!"
  var query = "⚠️ Couldn't Convert coin1  (" +
        from_currency.toUpperCase() +
        ") to coin2 " +
        to_currency.toUpperCase() +
        "\n" +
        err +
        "\n\n👁️‍🗨️Possibly the error came because you entered an unknown Currency name or you have entered currency's full name, make sure you enter short form of the Currency, example for 1 BitCoin to iNR, enter:  $ 1 BTC to INR"
  pushCustomQuery(title, query)
}
function finalSituation() {
  var final_data = CurrencyQuote.convert({
    amount: validateData(),
    from: from_currency,
    to: to_currency
  })
  results.push({
    type: "article",
    id: totalResult,
    description:
      validateData() +
      " " +
      from_currency +
      " = " +
     Math.round( final_data ) +
      " " +
      to_currency,
    title:
      "💱 Converted " +
      validateData() +
      " " +
      from_currency +
      " to " +
      " " +
      to_currency,
    input_message_content: {
      message_text:
        "💱 Conversion \n" +
        validateData() +
        " " +
        from_currency +
        " = " +
        Math.round( final_data )+
        " " +
        to_currency
    },
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "New Query",
            switch_inline_query_current_chat: "$ 1 BTC to INR"
          }
        ]
      ]
    }
  })
  Api.answerInlineQuery({
    inline_query_id: request.id,
    results: results,
    cache_time: 3 // cache time in sec
  })
}
function invalidPriceData(err) {
  var head = "⚠️ No Data!"
  var body = "⚠️ Data of Coin (" +
        req.toUpperCase() +
        ") is not Found!\n" +
        err +
        "\n\n👁️‍🗨️Possibly the error came because you entered an unknown Currency name or you have entered currency's full name, make sure you enter short form of the Currency, example for BitCoin, enter: BTC "
  pushCustomQuery(head, body)
}
function finalPriceData() {
  var inr_price = CurrencyQuote.convert({
    //Data in INR
    amount: 1,
    from: req.toUpperCase(),
    to: "INR"
  })
  var usd_price = CurrencyQuote.convert({
    //Data in USD
    amount: 1,
    from: req.toUpperCase(),
    to: "USD"
  })
  //We send data of Live price of the coin
  results.push({
    type: "article",
    id: totalResult,
    title: "Price of 1 " + req.toUpperCase(),
    description: "1 " + req.toUpperCase() + " = $" + usd_price.toFixed(5),
    input_message_content: {
      message_text:
        "💰 Price of " +
        req.toUpperCase() +
        " is:\n\nUSD: " +
        usd_price.toFixed(5) +
        "\nINR: " +
        inr_price.toFixed(5) +
        "\n\n📊 Last Updated: " +
        last_updated +
        " Minutes Ago."
    },
    reply_markup: {
      inline_keyboard: [
        [{ text: "New Query", switch_inline_query_current_chat: "BTC" }]
      ]
    }
  })
  Api.answerInlineQuery({
    inline_query_id: request.id,
    results: results,
    cache_time: 3 // cache time in sec
  })
}
// result.query - it is query from inline searching
if (!request.query) {
  return
}
var case_raw = request.query
var req = case_raw.toLowerCase()
var results
var totalResult
results = []
totalResult = 0

// it is array of results.
// we have InlineQueryResultArticle
// core.telegram.org/bots/api#inlinequeryresultarticle
// another types: https://core.telegram.org/bots/api#inlinequeryresult
if (req.includes("$")) {
  //@bot # 1 BTC to INR
  var total_data = req.split("$ ")[1]//Amount Cur1 to cur2
  var amount_data = total_data.split(" ")[0] //Amount
  var from_currency = total_data.split(" ")[1].toUpperCase() //Cur1
  var to_currency = total_data.split("to ")[1].toUpperCase() //Cur2
  if (!validateData()) {
    //We have error: Amount is not a number
    //We can show it to person using the bot
    invalidAmount()
  }
  var check_bjs =
    "CurrencyQuote.convert({amount: amount_data,from: from_currency.toUpperCase(),to: to_currency.toUpperCase()})"
 if(!errorCheck(check_bjs)){
    //CurrencyQuote Lib returns error if the currency symbol entered is incorrect!
    // We can inform user:
    invalidExchangeData("` Cannot Find Symbol `")

    return
  }
  finalSituation()
}
var bjs = 'CurrencyQuote.convert({amount: 1,from: req.toUpperCase(),to: "USD"})'
if(!errorCheck(bjs)){
//it us for Live price
invalidPriceData("` Cannot Find Symbol `")
return
}

var last_updated
var currency_uppercase = req.toUpperCase()
var crypto_check = "CurrencyQuote.crypto.details[currency_uppercase]"
if(!errorCheck(crypto_check)){
//We just need crypto_check to track the currency is crypto or fiat
  var fiatData = CurrencyQuote.fiat.details[currency_uppercase]
  last_updated = CurrencyQuote.fiat.getCachingTime()
  finalPriceData()
  return
}
var Crypto_details = CurrencyQuote.crypto.details[currency_uppercase]
if (Crypto_details) {
  var last_updatedX = CurrencyQuote.crypto.getCachingTime()
  last_updated = (last_updatedX / 60).toFixed(0)

  finalPriceData()
}

