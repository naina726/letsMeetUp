$(function(){
	$("button").on('click', function(){
		for( var i = 0; i < 5; i++ ){
			var newList = $("<div>").attr("id", "listResults");
			var container = $("#listContainer");
			newList.appendTo(container);	
		}
	})
})