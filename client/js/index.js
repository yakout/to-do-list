$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});


// sign up validation  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#SIGNUP_SUBMIT').hide();
$('#SIGNUP').click(function() {
  console.log('SIGNIN clicked');

  var email = $('#EMAIL').val();
  var first = $('#FIRSTNAME').val();
  var last = $('#LASTNAME').val();
  var pass = $('#PASS').val();

        if(!validateEmail(email)) {
          alert('Invalid email');
        } else if (first.length == 0) {
          alert('please enter your first name');
        } else if (last.length == 0) {
          alert('please enter your last name');
        } else if (pass.length == 0) {
          alert('please enter your 8 charachters password');
        } else if (pass.length < 5) {
          alert('password must be longer or equal to 5 charachters!');
        } else {
              $.ajax({
                        type: 'POST',
                        data: JSON.stringify({EMAIL: email,PASS: pass,FIRSTNAME:first,LASTNAME:last}),
                        contentType: 'application/json',
                        url: '/signup',            
                        success: function(data) {
                          if(data == '1') {
                            alert('Email already registred!');
                          } else {
                              $('#SIGNUP_SUBMIT').click();                            
                          }
                       },
                       error: function(xhr, message, foo) {
                        console.log(message);
                        }
          });
        }

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// sign in validation  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#SIGNIN_SUBMIT').hide();

$('#SIGNIN').click(function(e) {
  e.preventDefault();
  console.log('SIGNIN clicked');

  var email = $('#EMAILLOGIN').val();
  var pass = $('#PASSLOGIN').val();

  $.ajax({
            type: 'POST',
            data: JSON.stringify({email: email,pass: pass}),
            contentType: 'application/json',
            url: '/login',            
            success: function(data) {
              if(data == '1') {
                alert('incorect email');
                console.log('login failed');
              } else if (data == '2') {
                alert('incorect password');
                console.log('login failed');
              } else {
                console.log('login success');
                $('#SIGNIN_SUBMIT').click();
              }
           },
           error: function(xhr, message, foo) {
            console.log(message);
            }

});


});


// sign in validation  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});