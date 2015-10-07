//Table of Contents
//1A. Math Functions
//2B. Array Functions
//3C. Misc Functions
//4D. Helper Functions
console.log('hello');
var Steve = {
//
// 1A. --------MATH FUNCTIONS------------
//
    random: function(x,y) {
   	//randoms a number between numbers x and y
	    var x = Math.floor(Math.random() * (y-x + 1) + x );
	 	return x;
    },
//
// 2B. --------ARRAY FUNCTIONS------------
//
	p : function(arr){
	//I WILL NEVER TYPE A PRINT FUNCTION AGAIN
		for (var i = 0; i < arr.length; i++) {
    	console.log(arr[i]);
    	}

	},
	getMin: function(arr) {
	//returns min of an array\
	    var min = arr[0];
	    for (var i = 0; i < arr.length; i++) {
	    	if (min > arr[i])
	    	{
	    		min = arr[i];
	    	}
	    };
    return min;
	},
	getMax: function(arr) {
	//returns max of an array
	    var max = arr[0];
	    for (var i = 0; i < arr.length; i++) {
	    	if (max < arr[i])
	    	{
	    		max = arr[i];
	    	}
	    };
    return max;
	},
	getMinByKey: function(arr, key){
		var max = arr[0][key]
		for (var i = 0; i < arr.length; i++) {
	    	if (max < arr[i])
	    	{
	    		max = arr[i];
	    	}
	    };
    return max;
	


	},



	sort: function(arr){
		//sort using Radix
		var temp = arr;
		var maxDigits = Steve.intLength(Steve.getMax(arr));
		var min = Steve.getMin(arr);

		for (var i = 0; i < temp.length; i++) {
			temp[i] += Math.abs(min);
		}

		for (i = 0 ; i< maxDigits; i++)
		{
			temp = Steve.rad(temp, i);
		}

		for (var i = 0; i < temp.length; i++) {
			temp[i] -= Math.abs(min);
		}

	return temp;
	},
	sortByKey: function(arr, key){



	},

	reverse: function(arr){
	//reverses an array
		var arrnew =[];
		for (var i = arr.length-1; i >= 0; i--) {
			arrnew.push(arr[i]);
		}
	return arrnew;
	},
	deleteThing: function(arr, thing){
	//deletes the "thing" from an array if it exists
		var i = 0;
		while (i < arr.length ){
			if (arr[i] == thing)
			{
				arr.splice(i, 1);
			}else{ 
				i++; 
			}
			
		}
	},

//
// 3C.-------------MISC FUNCTIONS----------------
//
	intLength: function(str){
	//returns the length of an int
		var num = str + " ";
		num = num.length;
		return num;
	},
	wait: function(ms) {
    //wait # of seconds (ms/1000) before continuing
		ms += new Date().getTime();
		while (new Date() < ms){}
	},
	randomFill: function()
	{
	//recieve a Random color Code
		var arr = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
		var output = '#';
		for(var i=0;i<6;i++)
		{
			var t = Math.floor(Math.random()*arr.length);
			output += arr[t];
		}
		return output;
	},
	rainbow: function()
	{
		var style = "Style = 'background-image: -webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) ); background-image: gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) ); color:transparent; -webkit-background-clip: text; background-clip: text;'";
		return style;
	},

//
//4D.------------HELPER FUNCTIONS----------------
//
	merge: function(arr){
	//Helper for Sort
	//merges an array of arrays into a single array
		var newarr = [];

		for (var i = 0; i < arr.length; i++)
			for (var j = 0; j < arr[i].length; j++)
			{
				newarr.push(arr[i][j]);
			}
		return newarr;
	},
	rad: function(array, int){
	//Helper for sort
	//Does Counting sort by int* digit's place
		arrNew = [];
		tens = Math.pow(10, (int-1));

		for ( var i = 0; i < 10; i++)
		{
			var temp = [];
			for ( var j = 0; j< array.length; j++)
				{
					digit1 = array[j];
					digit2 =  Math.floor(digit1/tens);
					if (digit2 % 10 == i)
					{
						temp.push(digit1);
					}
				}
			arrNew.push(temp);
		}
		arrNew =  Steve.merge(arrNew);
		return arrNew;
	}
 }


