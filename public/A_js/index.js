var bod = document.getElementById('bod');

click_id('tableFactory');

// לחיצה על קטגוריה בתפריט
function show2(zis){
var men = document.getElementsByClassName('men');
  for(var i = 0; i < men.length; i++){
    men[i].style.color = "darkgray";
  }
zis.style.color = "#2196F3";
arr_loc = [zis.id];
start2();
}
//

function start2(){
  loading();
  var hed_h3 = document.getElementById('hed').getElementsByTagName('h3')[0];
  if (arr_loc.length == 1){
    if (arr_loc[0] == 'tableFactory'){
      hed_h3.innerHTML = 'מפעל טבלאות';
      start_tableFactory();
    } else if (arr_loc[0] == ''){

    } else {
      hed_h3.innerHTML = 'כללי';
    }
  }
}

// מעבר בין מצב עריכה לקריאה
function change_mode2(){
  $.ajax({
    url: '/change_mode',
    success: function(response) {
      edit_mode = response;
      var main_icon = document.getElementById('main_icon').getElementsByTagName('i')[0];
      if (edit_mode === true){
        main_icon.style.color = '#2196F3';
        pop_mes_sec('מצב עריכה מופעל');
      } else {
        main_icon.style.color = 'darkgray';
        pop_mes_sec('מצב עריכה כבוי');
      }
      start2();
    }
  });
}
//
