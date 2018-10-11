require('dotenv').config()

const http = require('http')

async function getTrivia() {
	return new Promise((resolve, reject) => {
		const options = {
			host: process.env.TRIVIA_URL,
			port: 3000,
			path: '/api'
		}
		http.get(options, (res) => {
			// Continuously update stream with data
			let body = ''
			res.on('data', function(d) {
				body += d
			});
			res.on('end', function() {
				// Data reception is done, do whatever with it!
				const parsed = JSON.parse(body)
				const message = JSON.stringify(parsed.message)
				console.log('===== message : ' + message)
				resolve(message)
			}).on('error', (e) => {
				console.log('\nError at get request: ' + e)
				return reject( 'Couldn\'t connect to the trivia server. Please try again.')
			})
		})
	})
}

module.exports.getTrivia = getTrivia;
