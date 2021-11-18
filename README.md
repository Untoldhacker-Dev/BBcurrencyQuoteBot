# BBcurrencyQuoteBot - chat bot
It is repository for chat bot: BBcurrencyQuoteBot 
<hr>

# ⁪⁬⁮⁮           ⁪⁬⁮⁮           ⁪⁬⁮⁮     🎉 Powered by - [Bots.Business](https://Bots.Business)

<hr>

### © AdityaKp (UntoldHacker), not for sale 
<p align="left"> <img src="https://github.com/Untoldhacker-Dev/pictoQue/blob/main/20211017_175229.png" alt="untoldhacker-dev" ; size = 1/> </p>



## What it is?
This repository can be imported to [Bots.Business](https://bots.business) as a worked chat bot.

[Bots.Business](https://bots.business) - it is probably the first CBPaaS - Chat Bot Platform as a Service.

A CBPaaS is a cloud-based platform that enables developers to create chatbots without needing to build backend infrastructure.

## Create your own bot for Telegram from this Git repo

How to create bot?
1. Create bot with [@BotFather](https://telegram.me/BotFather) and take Secret Token
2. Create bot in App and add Secret Token
3. Add Public Key from App as [Deploy key](https://developer.github.com/v3/guides/managing-deploy-keys/#deploy-keys) with read access (and write access for bot exporting if you need it)
4. Do import for this git repo

Now you can talk with yours new Telegram Bot

See [more](https://help.bots.business/getting-started)

## Commands - in commands folder
File name - it is command name (Bot it can be rewritten in command description)

Command can have: `name`, `help`, `aliases` (second names), `answer`, `keyboard`, `scnarios` (for simple logic) and other options.

### Command description
It is file header:

    /*CMD
      command: /test
      help: this is help for ccommand
      need_reply: [ true or false here ]
      auto_retry_time: [ time in sec ]
      answer: it is example answer for /test command
      keyboard: button1, button2
      aliases: /test2, /test3
    CMD*/

See [more](https://help.bots.business/commands)

### Command body
It is command code in JavaScript.
Use Bot Java Script for logic in command.

For example:
> Bot.sendMessage(2+2);

See [more](https://help.bots.business/scenarios-and-bjs)


## Libraries - in libs folder
You can store common code in the libs folder. File name - it is library name.

For example code in myLib.js:

    function hello(){ Bot.sendMessage("Hello from lib!") }
    function goodbye(name){ Bot.sendMessage("Goodbye, " + name) }

    publish({
      sayHello: hello,
      sayGoodbyeTo: goodbye
    })

then you can run in any bot's command:

    Libs.myLib.hello()
    Libs.myLib.sayGoodbyeTo("Alice")

See [more](https://help.bots.business/git/library)

## Other bots example
See other bots examples in the [github](https://github.com/bots-business?utf8=✓&tab=repositories&q=&type=public&language=javascript) or in the [Bot Store](https://bots.business/)


## Other help
[Help.bots.business](https://help.bots.business)

## API
See [API](https://api.bots.business/docs#/docs/summary)


![](https://bots.business/images/web-logo.png)


## Libs 
This bot involved the usage of currencyQuote inbuilt Lib, So you don't need to install any extra lib in this bot.
<br> [Read More About CurrencyQuote](https://help.bots.business/libs/lang)

## Usage
You can use this bot to get Crypto/Currencies prices, you can convert a Currency to INR and USD Prices, 

Live Price: `@botusername BTC INR`
Conversion: `@botusername convert 1 BTC INR`<br>
<b> Yes! you got it right! it can be used in inline mode! </b>

### System modifications 

• We have: CurrencyQuote lib explained how to use<br>
• Idea of Using catch and try functions in different way <br>
• Introduction in complete for inline queries and much more <br>
    
## Setting it up.

    Import the bot to your Account > Enable inline mode from botfather > Launch bot > that's it!
