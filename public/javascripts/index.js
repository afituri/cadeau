$(document).ready(function(){

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#map-continents').cssMap({
      'size': 430,      // set map size to 430px wide;
      'visibleList': true    // show list of regions (customzied list shown);
    });
  } else {
    $('#map-continents').cssMap({
      'size': 850,      // set map size to 430px wide;
      'visibleList': true    // show list of regions (customzied list shown);
    });

  }

  $('body').on("click", ".confirmRegister", function(){
    var email = $('#remail').val();
    removeAlerts();
    if(IsEmail(email)){
      $.get('/login/checkEmail/'+email, function(result) {
        if(result){
          var msg='';
          switch(result){
            case 'INACTIVE' :
              msg = 'This email is registered and needs to be activated resend activation';
              break
            case 'ACTIVE' :
              msg = 'This email is registered and the account is already activated please Login';
              break

          }
          $('#alertBlock').append('<div id ="emailExistAlert" class="alert alert-danger alert-dismissible" role="alert">'+
                                  '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                                  msg+'<a href="#" class="alert-link">...</a></div>');
        } else {
          removeAlerts();
          $.post("/login/register", {'email':email}, function(data, textStatus, jqXHR){
            if(data==true){
              $('#alertBlock').append('<div id ="registerSuccess" class="alert alert-success alert-dismissible" role="alert">'+
                                  '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                                  'You have registered successfully please check your email to activate your account</div>');
              $('#registerForm').addClass( "hide");
              $('#loginForm').show();
            }
          });
        }
      });
    }
  });

  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  // function alertTimeout(wait){
  //   setTimeout(function(){
  //       $('#alertBlock').children('.alert:first-child').remove();
  //   }, wait);
  // }
  
  function removeAlerts(){
    if($('#emailExistAlert').length){
      $('#emailExistAlert').remove();
    }
  }

});