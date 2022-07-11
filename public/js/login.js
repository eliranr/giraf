function login(){
  var mob = document.getElementById('mob').value;
  var pass = document.getElementById('pass').value;
  $.ajax({
    url: '/login_user',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ mob: mob, pass: pass }),
    success: function(response) {
      if (response == true){
        location.reload();
      } else {
        var err_log = document.getElementById('err_log');
        err_log.setAttribute('style', 'color: white;');
        setTimeout(function () {
          err_log.setAttribute('style', 'color: red;');
        }, 300);
        err_log.innerHTML = '**הוזנו נתונים שגויים';
      }
    }
  });
}


var input0 = document.getElementById("pass");
var mob0 = document.getElementById('mob');

input0.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("log_but").click();
  }
});
mob0.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("log_but").click();
  }
});
