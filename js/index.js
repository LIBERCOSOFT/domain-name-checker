const checkDomain = () => {
    const url = $('#url').val();
    const loading = `<div class="progress col-md-8">
  <div class="progress-bar progress-bar-striped active" role="progressbar"
  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
  </div>
`;
    // Do your url validation here.
    if(url.length > 4) {
      $('#result').html(loading);
      $.ajax({
        url: `https://domaination.p.mashape.com/domains/${url}`,
        headers: {
        'X-Mashape-Key':'RnE8lbKPUXmshEPiP08yEa8GyXkXp1sZVnmjsnCY1EQPXDMLHd',
        Accept: 'application/json',
    },
    method: 'GET',
    success: function(data){
      const response = data["domain"]
      console.log(response, response.isAvailable);
      if(response.isAvailable) {
        const resultHTML = `
          <span class="domain-name"><a href="//${response.name}">${response.name}</a></span>
           <span class="domain-status text-success">Available <i class="glyphicon glyphicon-ok"></i> </span>`;
        $('#result').html(resultHTML);
        $( "#book" ).slideDown( "slow");
      }
      else {
       const resultHTML = `
          <span class="domain-name"><a href="//${response.name}">${response.name}</a></span>
          <span class="domain-status text-danger">Unavailable <i class="glyphicon glyphicon-remove"></i> </span>
          <span class="domain-reg"> Registered on ${response.creationDate} </span>
          <span class="domain-reg"> Expires on ${response.expirationDate} </span>`;
          $('#result').html(resultHTML);
          $( "#book" ).slideDown( "slow");
      }
    }
  });
    } else {
      alert('Enter a valid url')
    }
  }

$(document).ready(() => {
  $('#url').on('keyup', () => {
    $('#result').empty();
  });
  
  $('#search-btn').on('click', checkDomain)
  // Implement Enter to search
  $('#url').keypress((event) => {
    if(event.which == 13) {
      checkDomain();
    }
  })
})