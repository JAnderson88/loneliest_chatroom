$(document).ready(function(){
	var username = "Me";

	$("#new-message-button").click(function(){
		sendMessage('', username);
		username = setAuthor(username);
	});
	$("#new-message-body").keydown(function(event){
		if( event.which === 13){
			event.preventDefault();
			// alert("Enter was pressed");
			sendMessage('', username);
			username = setAuthor(username);
		}
	});

	$('#conversation').on('click', '.delete', function(){
		$(this).parent().remove();
	});

	$("#lonely").on('click', function(){
		$.ajax({
			url: 'http://api.icndb.com/jokes/random',
			context: document.body
		}).done(function(data){
			sendMessage(data['value']['joke'], 'Internet');
		});
	});

	function sendMessage(mes, person){
		if(mes === ''){
			var message = $("#new-message-body").val();
		} else {
			var message = mes;
		}
		var author = person;
		var dt = new Date();
		var time = dt.getHours()+ ":" + dt.getMinutes();
		$('#conversation').append("<li class='message'><a class='delete' href='#'>Delete</a><h3 class='author'>"+author+"</h3><p class='message-body'>"+message+"</p><span class='timestamp'>"+time+"</span></li>");
		$("#new-message-body").val('');
	}

	function setAuthor(username){
		switch(username){
			case "Me":
				return "Myself";
			case "Myself":
				return "I";
			case "I":
				return "Me";
		}
	}	
});

// function setHumanMessage(person) {
// 	sendMessage($('#new-message-body').val());
// }
// function sendAPIMessage(messsage) {

// }

