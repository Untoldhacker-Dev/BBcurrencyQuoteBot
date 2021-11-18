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

function validateData() {
  //Amount sometimes can be entered which is not numeric!
  if (isNaN(amount_data) == true) {
    return "no"
  }
  return Math.round(amount_data)
}

function invalidAmount() {
  results.push({
    type: "article",
    id: totalResult,
    title: "Illegal Statement",
    input_message_content: {
      message_text:
        "Convert_to data isn't numeric! please ensure you enter convert.amount.from.to\n\nexample for 1 BitCoin to iNR, Enter: convert.1.BTC.INR "
    },
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "New Query",
            switch_inline_query_current_chat: "convert.1.BTC.INR"
          }
        ]
      ]
    }
  })
}
function invalidExchangeData(err) {
  results.push({
    type: "article",
    id: totalResult,
    title: "⚠️ No Data!",
    input_message_content: {
      message_text:
        "⚠️ Couldn't Convert coin1  (" +
        from_currency.toUpperCase() +
        ") to coin2 " +
        to_currency.toUpperCase() +
        "\n" +
        err +
        "\n\n👁️‍🗨️Possibly the error came because you entered an unknown Currency name or you have entered currency's full name, make sure you enter short form of the Currency, example for 1 BitCoin to iNR, enter: convert.1.BTC.INR "
    },
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "New Query",
            switch_inline_query_current_chat: "convert.1.BTC.INR"
          }
        ]
      ]
    }
  })
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
    title:
      "💱 Conveted " +
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
        final_data +
        " " +
        to_currency
    },
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "New Query",
            switch_inline_query_current_chat: "convert.1.BTC.INR"
          }
        ]
      ]
    }
  })
}
function invalidPriceData(err) {
  results.push({
    type: "article",
    id: totalResult,
    title: "⚠️ No Data!",
    input_message_content: {
      message_text:
        "⚠️ Data of Coin (" +
        req.toUpperCase() +
        ") is not Found!\n" +
        err +
        "\n\n👁️‍🗨️Possibly the error came because you entered an unknown Currency name or you have entered currency's full name, make sure you enter short form of the Currency, example for BitCoin, enter: BTC "
    },
    reply_markup: {
      inline_keyboard: [
        [{ text: "New Query", switch_inline_query_current_chat: "BTC" }]
      ]
    }
  })
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
    input_message_content: {
      message_text:
        "💰 Price of " +
        req.toUpperCase() +
        " is:\n\nUSD: " +
        usd_price.toFixed(5) +
        "\nINR: " +
        inr_price.toFixed(5)
    },
    reply_markup: {
      inline_keyboard: [
        [{ text: "New Query", switch_inline_query_current_chat: "BTC" }]
      ]
    }
  })
}
// result.query - it is query from inline searching
if (!request.query) {
  return
}
var req = request.query
var results
var totalResult
results = []
totalResult = 0

// it is array of results.
// we have InlineQueryResultArticle
// core.telegram.org/bots/api#inlinequeryresultarticle
// another types: https://core.telegram.org/bots/api#inlinequeryresult
if (req.includes("convert")) {
  var total_data = req.split("convert ")[1] //Amount.Cur1.cur2
  var amount_data = total_data.split(" ")[0] //Amount
  var from_currency = total_data.split(" ")[1].toUpperCase() //Cur1
  var to_currency = total_data.split(" ")[2].toUpperCase() //Cur2
  if (validateData() == "no") {
    //We have error: Amount is not a number
    //We can show it to person using the bot
    invalidAmount()
    Api.answerInlineQuery({
      // see another fields at:
      // core.telegram.org/bots/api#answerinlinequery
      inline_query_id: request.id,
      results: results,
      cache_time: 3 // cache time in sec
    })
  }
  var check_bjs =
    "CurrencyQuote.convert({amount: amount_data,from: from_currency.toUpperCase(),to: to_currency.toUpperCase()})"
  try {
    var result = eval(check_bjs)
  } catch (err) {
    //CurrencyQuote Lib returns error if the currency symbol entered is incorrect!
    // We can inform user:
    invalidExchangeData(err)
    Api.answerInlineQuery({
      // see another fields at:
      // core.telegram.org/bots/api#answerinlinequery
      inline_query_id: request.id,
      results: results,
      cache_time: 3 // cache time in sec
    })
    return
  }
  finalSituation()
  Api.answerInlineQuery({
    // see another fields at:
    // core.telegram.org/bots/api#answerinlinequery
    inline_query_id: request.id,
    results: results,
    cache_time: 3 // cache time in sec
  })
}
var bjs = 'CurrencyQuote.convert({amount: 1,from: req.toUpperCase(),to: "USD"})'
//Ut us for Live price
try {
  var result = eval(bjs)
} catch (err) {
  //CurrencyQuote Lib returns error if the currency symbol entered is incorrect!
  // We can inform user:
  invalidPriceData(err)
  Api.answerInlineQuery({
    // see another fields at:
    // core.telegram.org/bots/api#answerinlinequery
    inline_query_id: request.id,
    results: results,
    cache_time: 3 // cache time in sec
  })

  return
}
finalPriceData()
Api.answerInlineQuery({
  // see another fields at:
  // core.telegram.org/bots/api#answerinlinequery
  inline_query_id: request.id,
  results: results,
  cache_time: 3 // cache time in sec
})

