var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: String,
	cohort : String,
	wins: {type : Number, default: 0 },
	dwins: {type : Number, default: 0 },
	loses: {type : Number, default: 0 },
	dloses: {type : Number, default: 0 },
	rating : {type : Number, default: 1500 },
	drating : {type : Number, default: 1500 },
	games : [ ]

})

var gameSchema = new mongoose.Schema({

	player1: String,
	player2: String,
	winner: String,
	date: {type: Date, default: Date.now }
})
var dgameSchema = new mongoose.Schema({

	player1: String,
	player2: String,
	player3: String,
	player4: String,
	winners: String,
	date: {type: Date, default: Date.now }
})


var User = mongoose.model('Users', userSchema);
var Game = mongoose.model('Games', gameSchema);
var dGame = mongoose.model('dGames', dgameSchema);