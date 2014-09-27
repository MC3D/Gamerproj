//console.log('The Iron Yard Rocks');

// $(function(){
// 		setTimeout(function(){
// 		$(".letter").css({position: 'absolute'});
// 	},3000);
// });

function Template(options){
	this.id = options.id;
	this.where = options.where;
	this.method = options.method || "append";
}

Template.prototype.render = function(data){
	var template = _.template($("#"+this.id).text());
	$("."+this.where)[this.method](template(data));
};


$("#play").on('click', function(e){
	$(".main-wrap").removeClass("hide");
	$("#home").addClass("hide");
	e.preventDefault();
});
