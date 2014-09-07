$(document).ready(function(){
  $('body').on("click", ".confirmActivation", function(){
    var username = $('#username').val(),
        password = $('#password').val(),
        email = $('#email').val();

    removeAlerts();
    $.get('/login/checkUsername/'+username, function(result) {//check if username is available
      if(result){
        $.post("/login/activate", {'username':username,'password':password,'email':email}, function(data, textStatus, jqXHR){
          if(data==true){
            $('#alertBlock').append('<div id ="registerSuccess" class="alert alert-success alert-dismissible" role="alert">'+
                              '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                              'You have activated successfully please login to list your Cadeau/x</div>');
          }
        });
      } else {
        //do Somthing
      }
    });
  });

  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  
  function removeAlerts(){
    if($('#emailExistAlert').length){
      $('#emailExistAlert').remove();
    }
  }

});