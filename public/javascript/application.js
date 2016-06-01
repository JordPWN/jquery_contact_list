$(document).ready(function() {
	_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	var compiled = _.template($("#contact_template").html());

	var addContact = function(contact){
	  var compiled = _.template($("#contact_template").html());
		var loaded_contact = compiled({'contact': contact});
		$("<div>").html(loaded_contact).appendTo($(".contact_list"));
		$(".contact_list h4").hide();
	};

	$(".selected_contact").html($(".contact_list").first().html());

	$.getJSON("/api/contacts", function(data){
		data.forEach(function(contact){
			var loaded_contact = compiled({contact: contact});
			$("<div>").html(loaded_contact).appendTo($(".contact_list"));
		});
		$(".contact_list h4").hide();
	});

	$(".selected_contact").on('dblclick',function(e){
		e.stopPropagation();
		e.preventDefault();
    var currentEle = $(this);
    var value = $(this).text();
    $(this).attr('contenteditable', 'true');
    // updateVal(currentEle, value);
	});

	$(this).on('click', function(e){
		// e.stopPropagation();
		// e.preventDefault();
		console.log($(this).val());
	});

	var updateVal = function(currentEle, value){
    $(document).off('click');
    $(currentEle).html('<input class="thVal" type="text" value="' + value + '" />');
    $(".thVal").focus();
    $(".thVal").keyup(function (event) {
	    if (event.keyCode == 13) {
	    	$(currentEle).html($(".thVal").val().trim());
	    }
	  });
  };

	$(document).on('click', '.contact_list .card',function(){
		$(this).find("h4:first").show();
		$('.selected_contact').html($(this).parent().html()); //.removeClass("col-md-3")
		$(this).find("h4:first").hide();
	});

	$(document).on('click', '#new_contact',function(){
		$('.selected_contact').html(_.template($("#form_template").html()));
	});

	$(document).on('submit', '#contact_form', function (e) {
    e.preventDefault();
    var formValues = $(this).serializeArray();
    var dataForm = formValues.reduce(function (accumulator, currentPair) {
    	accumulator[currentPair.name] = currentPair.value;
    	return accumulator;
    }, {});
    $.ajax({
			type: "POST",
			url: "/api/contact/save",
			data: dataForm,
			success: function (contact, status) {
				addContact(JSON.parse(contact));
			},
			error: function (data) {
         alert('Save contact failed: ' + JSON.stringify(data));
			}   	
    })
	});


});
