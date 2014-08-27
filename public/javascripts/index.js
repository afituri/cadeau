$(document).ready(function(){
  
  $('#showRegister').click(function(){
  	$('#loginForm').hide();
  	$('#registerForm').removeClass( "hide");
  });
  $('#showLogin').click(function(){
  	$('#registerForm').addClass( "hide");
  	$('#loginForm').show();
  });

});