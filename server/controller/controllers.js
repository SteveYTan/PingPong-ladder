var mongoose = require('mongoose');

var UsersModel = mongoose.model('Users');
var GamesModel = mongoose.model("Games");
var dGamesModel = mongoose.model("dGames");

var PingPongController = {}


PingPongController.show = function(request, response){

	UsersModel.find({}, function(err, users){

		GamesModel.find({},function(err,games){
			


			response.render('index', {x:users , y : games})


		})


	}).sort({ rating: -1} )
	
}

PingPongController.showD = function(request, response){

	UsersModel.find({}, function(err, users){

		dGamesModel.find({},function(err,games){
			

			response.render('doubles', {x:users , y : games})


		})


	}).sort({ drating: -1} )
	
}



PingPongController.info = function(request, response){

	UsersModel.find({}, function (err, everyone){
		UsersModel.findOne({_id: request.params.id}, function(err,user){

			response.render('profile', {x : user, everyone : everyone})

		})
	})
	
}
PingPongController.search = function(request, response){

	UsersModel.find({}, function (err, everyone){
		UsersModel.findOne({_id: request.body['id']}, function(err,user){

			var string = user._id;
			response.redirect("/" + string);

		})
	})
	
}
PingPongController.add = function(request, response){

	var user = new UsersModel({name : request.body.name, cohort: request.body.cohort, })
	user.save(function(err){
		if(err) {
			console.log('something went wrong');
    	} else { // else console.log that we did well and then redirect to the root route
    		console.log('successfully added a User!');
    	}
    })

	response.redirect('/');

}
PingPongController.kill = function(request, response){
	if (request.body.pw == 'codingdojo12') {

		UsersModel.remove({_id: request.body.id}, function(err,squirrel){
			response.redirect('/')
		})

	};
	

}
PingPongController.confirm = function(request, response){

	
	UsersModel.findOne({_id: request.params.id}, function (err, user){
        // loads a view called 'user.ejs' and passed the user object to the view!
        response.render('confirm', {x: user});
    })
	

}

PingPongController.report = function(request, response){

	if ((request.body['winner'] == request.body['loser'])
		||( (request.body['winner'] ==   ''   )
			||( request.body['loser'] ==   '' ) ))

	{
		response.redirect('/');
	}

	else{

		UsersModel.findOne({_id: request.body['winner']}, function (err, winner){
			UsersModel.findOne({_id: request.body['loser']}, function (err, loser){

				var game = new GamesModel({player1 : winner.name, player2: loser.name, winner: winner.name});
				game.save(function(err){
				if(err) {} else { // else console.log that we did well and then redirect to the root route
				}
			});
				
				var newgame = {
					type: "single",
					player1 : winner.name,
					player2 : loser.name,
					winner : winner.name,
					date : new Date().toLocaleString()
				}
				UsersModel.update({_id: request.body['winner']}, {$push: {games: newgame}}, function (err,user){})
				UsersModel.update({_id: request.body['loser']}, {$push: {games: newgame}}, function (err,user){})

				var wRating = winner.rating;
				var lRating = loser.rating;
				var cons = 0;

				difference = Math.abs(wRating - lRating);

				if (difference < 400 )
					{ cons = .97;}
				if (difference < 300 )
					{ cons = .93;}
				if (difference < 200 )
					{ cons = .84;}
				if (difference < 180 )
					{ cons = .82;}
				if (difference < 160 )
					{ cons = .79;}
				if (difference < 140 )
					{ cons = .76;}
				if (difference < 120 )
					{ cons = .73;}
				if (difference < 100 )
					{ cons = .69;}
				if (difference < 80 )
					{ cons = .66;}
				if (difference < 60 )
					{ cons = .62;}
				if (difference < 40 )
					{ cons = .58;}
				if (difference < 20 )
					{ cons = .53;}
				if (wRating == lRating)
					{ cons = .5;}

				var x = Math.floor(30 * ( 1- cons) + .5 )

				if (wRating > lRating)
				{
					wRating +=x;
					lRating -=x;
				}
				else{
					wRating += (30-x);
					lRating -= (30-x);
				}

				UsersModel.update({_id: request.body['winner']}, { $inc: { wins : 1} }, function (err, winner){})
				UsersModel.update({_id: request.body['loser']}, { $inc: { loses : 1} }, function (err, winner){})
				UsersModel.update({_id: request.body['winner']}, {  rating : wRating }, function (err, winner){})
				UsersModel.update({_id: request.body['loser']}, { rating :  lRating }, function (err, winner){})

				response.redirect('/');
			})
})


}

}


PingPongController.reportd = function(request, response){
	console.log(request.body)

	if ( ( (request.body['winner1'] ==   ''   )
		||( request.body['loser1'] ==   '' ) )
		||( (request.body['loser2'] ==   '' ))
		||(request.body['winner2'] ==   '' ))

	{
		response.redirect('/doubles/landing');
	}
	else if ( (request.body['winner1'] ==  request.body['winner2'])
		|| (request.body['loser1'] ==  request.body['loser2']) )
	{
		response.redirect('/doubles/landing');
	}
	else{

		UsersModel.findOne({_id: request.body['winner1']}, function (err, winners1){
			UsersModel.findOne({_id: request.body['loser1']}, function (err, losers1){
				UsersModel.findOne({_id: request.body['winner2']}, function (err, winners2){
					UsersModel.findOne({_id: request.body['loser2']}, function (err, losers2){

						var game = new dGamesModel(
						{
							player1 : winners1.name,  
							player2: losers1.name,
							player3: winners2.name,
							player4: losers2.name,
							winners: winners1.name + " + " + winners2.name,
							date : new Date().toLocaleString()}

							);
				// console.log(game)

				game.save(function(err){
				if(err) { } else { // else console.log that we did well and then redirect to the root route
				}
			});
				
				var newgame = {
					type: "doubles",
					player1 : winners1.name,
					player2 : losers1.name,
					player3 : winners2.name,
					player4 : losers2.name,
					winners : winners1.name + " + " + winners2.name,
					date : new Date().toLocaleString()
				}
				UsersModel.update({_id: request.body['winner1']}, {$push: {games: newgame}}, function (err,user){})
				UsersModel.update({_id: request.body['loser1']}, {$push: {games: newgame}}, function (err,user){})
				UsersModel.update({_id: request.body['winner2']}, {$push: {games: newgame}}, function (err,user){})
				UsersModel.update({_id: request.body['loser2']}, {$push: {games: newgame}}, function (err,user){})

				var wRating = (winners1.drating + winners2.drating)/2;
				var lRating = (losers1.drating + losers2.drating)/2;
				var cons = 0;

				difference = Math.abs(wRating - lRating);

				if (difference < 400 )
					{ cons = .97;}
				if (difference < 300 )
					{ cons = .93;}
				if (difference < 200 )
					{ cons = .84;}
				if (difference < 180 )
					{ cons = .82;}
				if (difference < 160 )
					{ cons = .79;}
				if (difference < 140 )
					{ cons = .76;}
				if (difference < 120 )
					{ cons = .73;}
				if (difference < 100 )
					{ cons = .69;}
				if (difference < 80 )
					{ cons = .66;}
				if (difference < 60 )
					{ cons = .62;}
				if (difference < 40 )
					{ cons = .58;}
				if (difference < 20 )
					{ cons = .53;}
				if (wRating == lRating)
					{ cons = .5;}

				var x = Math.floor(30 * ( 1- cons) + .5 )

				if (wRating > lRating)
				{
					w1New = winners1.drating +=x;
					w2New = winners2.drating +=x;
					l1New = losers1.drating -=x;
					l2New = losers2.drating -=x;
				}
				else{
					w1New = winners1.drating += 	(30-x);
					w2New = winners2.drating += 	(30-x);
					l1New = losers1.drating -= 	(30-x);
					l2New = losers2.drating -=	(30-x);
				}

				UsersModel.update({_id: request.body['winner1']}, { $inc: { dwins : 1} }, function (err, winner){})
				UsersModel.update({_id: request.body['winner2']}, { $inc: { dwins : 1} }, function (err, winner){})
				UsersModel.update({_id: request.body['loser1']}, { $inc: { dloses : 1} }, function (err, winner){})
				UsersModel.update({_id: request.body['loser2']}, { $inc: { dloses : 1} }, function (err, winner){})
				UsersModel.update({_id: request.body['winner1']}, {  drating : w1New }, function (err, winner){})
				UsersModel.update({_id: request.body['loser1']}, { drating :  l1New }, function (err, winner){})
				UsersModel.update({_id: request.body['winner2']}, {  drating : w2New }, function (err, winner){})
				UsersModel.update({_id: request.body['loser2']}, { drating :  l2New }, function (err, winner){})
				response.redirect('/doubles/landing');
			})
})
})
})


}

}

module.exports = PingPongController;