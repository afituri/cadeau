$(document).ready(function(){

  $('.usStates').hide();
  getListings();
  $.get('/world/getCountries', function(result) {
    var country = $("#country");
    for (co in result) {
      country.append($("<option/>").val(result[co].iso).text(result[co].local_name));
    }
    $("#country").val($('#iso').val());

    if($('#iso').val()){
      if($('#iso').val()=='US'){
        getStates();
      } else {
        getCities($('#iso').val());
      }
    }
  });

  $('#country').on('change', function() {
    if($('#country').val()=='US'){
      getStates();
    } else {
      $('.usStates').hide();
      getCities($('#country').val());
    }
  });

  $('#state').on('change', function() {
    getUsCities($('#state').val());
  });

  function getCities(country){
    $.get('/world/getCities/'+country, function(result) {
      var city = $("#city");
      city.empty();
      for (ci in result) {
        city.append($("<option/>").val(result[ci].id).text(result[ci].local_name));
        if(result[ci].local_name == $('#iso_city').val()){
          $('#city').val(result[ci].id);
        }
      }
    });
  }

  function getListings(){
    $.get('/getListings/', function(result) {
      var listing = $("#listing");
      for (item in result){
        listing.append($("<option/>").val(result[item].idlisting).text(result[item].name));
      }
    });
  }

  function getStates(){
    $.get('/world/getStates/', function(result) {
      $('.usStates').show();
      var state = $('#state');
      for (st in result) {
        state.append($("<option/>").val(result[st].state).text(result[st].state));
      }
      $('#state').val($('#iso_state').val());
      getUsCities($('#iso_state').val());
    });
  }

  function getUsCities(state){
    $.get('/world/getUsCities/'+state, function(result) {
      var city = $("#city");
      city.empty();
      for (ci in result) {
        city.append($("<option/>").val(result[ci].id).text(result[ci].local_name));
        if(result[ci].local_name == $('#iso_city').val()){
          $('#city').val(result[ci].id);
        }
      }
    });
  }
});