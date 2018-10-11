const Alexa = require('ask-sdk')
// const Comm = require('./communicationHelper')

// const data = {
//   messages: {
//     INITIAL_MESSAGE: 'Hello Bogdan, how can I help you? Would you like some trivia?',
//     GRETTING_MESSAGE: 'Hello everyone and welcome to Geeks on tour 2018! Bogdan totally has an idea what he\'s talking about and is not just winging it! Would you like to hear some trivia?',
//     FALLOWUP_MESSAGE: '. Would you like to hear more trivia?',
//     HELP_MESSAGE: 'This skill can tell you some trivia if you ask for trivia. It can also say hello to the public. Would you like to hear some trivia?',
//     GOODBYE_MESSAGE: 'Goodbye everyone! See you at the next event!'
//   }
// }

const StartHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'LaunchRequest'
  },
  async handle(handlerInput) {
    const speachText = data.messages.INITIAL_MESSAGE

    return handlerInput.responseBuilder
			.speak(speachText)
			.reprompt()
      .getResponse()
  },
}

// const SayHelloHandler = {
//   canHandle(handlerInput) {
//     const request = handlerInput.requestEnvelope.request
//     return request.type === 'IntentRequest'
//         && request.intent.name === 'SayHelloIntent'
//   },
//   handle(handlerInput) {
//     const speachText = data.messages.GRETTING_MESSAGE

//     return handlerInput.responseBuilder
// 			.speak(speachText)
// 			.reprompt()
//       .getResponse()
//   },
// }

// const TellTriviaHandler = {
// 	canHandle(handlerInput) {
// 		const request = handlerInput.requestEnvelope.request
// 		return request.type === 'IntentRequest'
// 			&& ( request.intent.name === 'TellTriviaIntent'
// 			|| request.intent.name === 'AMAZON.YesIntent' )
// 	},
// 	async handle(handlerInput) {
// 		const message = await Comm.getTrivia()
// 		const speachText = message + data.messages.FALLOWUP_MESSAGE

// 		return handlerInput.responseBuilder
// 			.speak(speachText)
// 			.reprompt()
// 			.getResponse()
// 	},
// }

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
			.speak(data.messages.HELP_MESSAGE)
			.reprompt()
      .getResponse()
  },
}

const FallbackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
			.speak(data.messages.INITIAL_MESSAGE)
			.reprompt()
      .getResponse()
  },
}

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
				|| request.intent.name === 'AMAZON.NoIntent'
				|| request.intent.name === 'AMAZON.StopIntent')
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
			.speak(data.messages.GOODBYE_MESSAGE)
			.withShouldEndSession(true)
      .getResponse()
  },
}

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'SessionEndedRequest'
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`)
    return handlerInput.responseBuilder.getResponse()
  },
}

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
		StartHandler,
    // SayHelloHandler,
    // TellTriviaHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .lambda()
