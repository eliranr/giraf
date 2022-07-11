set_mode();

// ברענון דף - בדיקה אם משתמש במצב קריאה
function set_mode(){
  $.ajax({
    url: '/check_mode',
    success: function(response) {
      edit_mode = response.edit_mode;
      var main_icon = document.getElementById('main_icon').getElementsByTagName('i')[0];
      if (edit_mode === true){
        main_icon.style.color = '#2196F3';
      } else {
        main_icon.style.color = 'darkgray';
      }
    }
  });
}
//

// לחיצה יזומה על אלמנט לפי id
function click_id(ids){
  document.getElementById(ids).click();
}
//



// לחיצה על קטגוריה בתפריט
function active(zis){
  zis.style.color = "#0a6fc2";
}
//
// לחיצה על קטגוריה בתפריט
function active00(zis){
  zis.style.backgroundColor = "rgb(158, 209, 250)";
}
function onmouseup00(zis){
  var but_zix = $(zis).children('.gene-icon');
  zis.style.backgroundColor = "#ebeff8";
}
//


// יצירת התראה לכמה שניות
function pop_mes_sec(text){
  var pop_mes_main = document.getElementById('pop_mes_main');
  var pop_mes = document.createElement('div');

  pop_mes.innerHTML = text;
  pop_mes.setAttribute('class', 'pop_mes');
  pop_mes.setAttribute('id', 'pop_mes');
  pop_mes_main.append(pop_mes);

  $("#pop_mes").hide();
  $("#pop_mes").show(200);

  setTimeout(function () {
    pop_mes_del();
  }, 2000);
}
//

// יצירת ההתראה
  function pop_mes(text){
    var pop_mes_main = document.getElementById('pop_mes_main');
    var pop_mes = document.createElement('div');
    pop_mes.innerHTML = text;
    pop_mes.setAttribute('class', 'pop_mes');
    pop_mes.setAttribute('onclick', 'set_blue(); set_pro0(); start_fold();');

    pop_mes_main.append(pop_mes);
    $(pop_mes).hide();
    $(pop_mes).show(200);

  }
//

// מחיקת התראה
function pop_mes_del(){
  var pop_mes_main = document.getElementById('pop_mes_main');
  var div0 = pop_mes_main.getElementsByTagName('div')[0];

  $(div0).hide(200);
  setTimeout(function () {
    $(div0).remove();
  }, 200);
}
//



// תפריט יורד
  function dropList(bol){
    var user_head = document.getElementsByClassName('user_head')[0];
    var list = user_head.getElementsByClassName('list')[0];
    if (bol === true){
      list.style.display = 'block';
    } else {
      list.style.display = 'none';
    }
  }
//


// אייקון טעינה
function loading(){
  var bod = document.getElementById('bod');
  var div = document.createElement('div');
  div.setAttribute('class', 'div_load');

  var img = document.createElement('img');
  img.setAttribute('src', '/images/loading.gif');
  img.setAttribute('class', 'load_img');

  div.append(img);
  bod.innerHTML = '';
  bod.append(div);
}
//
