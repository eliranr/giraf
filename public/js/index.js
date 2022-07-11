var bod = document.getElementById('bod');
var pros;
var pro0;
var edit_mode;
set_mode();
updete_pro();
load_contact();

updete_pro();
click_id('projects');

function start(){
  console.log(arr_loc);
  var left_ar = document.getElementById('left_ar');

  //שורת מיקומים
  if (arr_loc[1] == 'folder_system'){
    var loc_line = pro0.name_pro;
    for(var c=2; c<arr_loc.length; c++){
      if (c != 0){
        loc_line = loc_line + ' / ' + arr_loc[c];
      }
    }
    document.getElementById('loc').innerHTML = loc_line;

    left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="arr_loc.splice(-1,1); start();"></i>';

  }
  loading();
  if (arr_loc.length == 1){
    // שורת מיקומים וחץ אחורה נמחקים
    document.getElementById('loc').innerHTML = '';
    left_ar.innerHTML = '';

    var bod = document.getElementById('bod');

    var hed_h3 = document.getElementById('hed').getElementsByTagName('h3')[0];
    if (arr_loc[0] == 'projects'){
      hed_h3.innerHTML = 'פרויקטים';
      start_page_pros();
    } else if (arr_loc[0] == 'files'){
      hed_h3.innerHTML = 'ניהול איכות';
      bod.innerHTML = '';
    } else if (arr_loc[0] == 'contacts'){
      hed_h3.innerHTML = 'קבלני משנה';
      start_cablanim();
    } else if (arr_loc[0] == 'work_dates'){
      hed_h3.innerHTML = 'שעות עבודה';
      bod.innerHTML = '';
    }
  } else {
    if (arr_loc[1] == 'folder_system'){
      start_fold();
    } else if (arr_loc[0] == 'contacts'){
      if (arr_loc[1] == 'create_cablan'){
        add_cablan();
      } else if (arr_loc[1] == 'show_cablan') {
        show_cablan();
      }
    }


  }
}


// עדכון ערך הפרויקט שברקע
function set_pro0(bol, bol2){
  $.ajax({
    url: '/update_pro',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({pro_id: pro0._id}),
    success: function(response) {
      pro0 = response;
      if (bol === false){
        updete_pro();
      } else {
        start();
        updete_pro();
      }
      if (bol2 == true){
        close_pop();
      }
    }
  });
}

// שמירת הפרויקט הנצפה בתור עוגייה
function set_pro(ids){
  pros.forEach(function(pro){
    if (pro._id == ids){
      pro0 = pro;
    }
  });
  arr_loc.push('folder_system');
  start();
  $.ajax({
    url: '/set_view_pro',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({pro_id: pro0._id}),
    success: function(response) {

    }
  });
}





// עדכון כל הפרויקטים
function updete_pro(bol){
  $.ajax({
    url: '/get_all_projects',
    success: function(response) {
      pros = response.projects;
      if (bol === true){
        start();
      }
    }
  });
}
//


// חלון קופץ
function pop_win(text, func, str){

  var bod = document.getElementsByTagName("BODY")[0];
  var back = document.createElement('div');
  back.setAttribute('class', 'back_pop');

  var win = document.createElement('div');
  win.setAttribute('class', 'win_pop');
  win.innerHTML = '<button class="close" onclick="close_pop()">×</button>'+ text;

    var but_agree = document.createElement('button');
    but_agree.setAttribute('class', 'btn btn-danger btn-danger2');
    but_agree.setAttribute('onclick', func + '(\''+ str +'\')');
    but_agree.innerHTML = 'אישור';

    var but_del = document.createElement('button');
    but_del.setAttribute('class', 'btn btn-light btn-light2');
    but_del.setAttribute('onclick', 'close_pop()');
    but_del.innerHTML = 'ביטול';
  win.append(but_agree, but_del);

  back.append(win);
  bod.append(back);
}
// סגירת חלון קופץ
function close_pop(){
  var back_pop = document.getElementsByClassName('back_pop')[0];
  back_pop.remove();
}
//





// לחיצה על קטגוריה בתפריט
function show(zis){
var men = document.getElementsByClassName('men');
  for(var i = 0; i < men.length; i++){
    men[i].style.color = "darkgray";
  }
zis.style.color = "#2196F3";
arr_loc = [zis.id];
start();
}
//

// מעבר בין מצב עריכה לקריאה
function change_mode(){
  $.ajax({
    url: '/change_mode',
    success: function(response) {
      updete_pro();
      edit_mode = response;
      var main_icon = document.getElementById('main_icon').getElementsByTagName('i')[0];
      if (edit_mode === true){
        main_icon.style.color = '#2196F3';
        pop_mes_sec('מצב עריכה מופעל');
      } else {
        main_icon.style.color = 'darkgray';
        pop_mes_sec('מצב עריכה כבוי');
      }
      if (typeof pro0 != 'undefined'){
        set_pro0();
      } else {
        start();
      }
    }
  });
}
//


// אפקטים על אריחים (תיקיות וטבלאות) גם פרויקטים
function por_box_hov0(zis){
  var but_zix = $(zis).children('.gene-icon');
  but_zix[0].style.color = "rgb(10, 111, 194)";
}
function por_box_hov02(zis){
  var but_zix = $(zis).children('.gene-icon');
  but_zix[0].style.color = "#2196f3";
}
//רקע
function por_box_hov03(zis, event){
  zis.style.backgroundColor = "#9ed1fa";
}
function por_box_hov04(zis){
  var but_zix = $(zis).children('.gene-icon');
  zis.style.backgroundColor = "#f9f9f9";
}
//

// לחסום תווים
document.addEventListener('keydown', logKey);
function logKey(e) {
  if (e.code == 'Quote'){
    event.preventDefault();
  }
}
//

// בלחיצה על רקע של חלון קופץ
document.body.addEventListener('click', function (event) {
  event.stopPropagation();
    if (event.target.className === 'back_pop') {
      close_pop();
      start();
    }
});






// לחיצה ממשוכת
$(window).mousedown(function(e) {
    clearTimeout(this.downTimer);
    this.downTimer = setTimeout(function() {
      if (e.target.className == 'fas fa-file-upload file-bot'){
        var td = e.target.parentElement;
        var inp = td.getElementsByTagName('input')[0];
        inp.setAttribute('type', 'text');
        $(inp).val('').change();

        console.log(old_obj.type);

        if (old_obj.type == 'tab_plan'){
          table_plan_edit();
        } else if (old_obj.type == 'table'){
          its_table_edit();
        }




      }
    }, 2000);
}).mouseup(function(e) {
    clearTimeout(this.downTimer);
    if (e.target.className == 'fas fa-file-upload file-bot'){
      var td = e.target.parentElement;
      var inp = td.getElementsByTagName('input')[0];
      inp.click();
    }
});
//



// טעינה של אנשי קשר
function load_contact(bol){
  $.ajax({
    url: '/get_cablanim',
    success: function(response) {
      response.sort(function(a, b){
        if(a.full_name < b.full_name) { return -1; }
        if(a.full_name > b.full_name) { return 1; }
        return 0;
      });
      myArray = response;

      if (bol === true){
        start();
      }
    }
  });
}


// התנתקות
function logout(){
  $.ajax({
    url: '/logout',
    success: function(response) {
      location.reload();
    }
  });
}



// ביציאה ללא שמירת שינוים
function pop_win_if_save(){
  var user_name = $('#user_name').val();
  var text =  "<h4>" + user_name + " היקר!</h4>" +
  "<p>שים לב,<br> הינך עומד לצאת מבלי לשמור שינויים</p>";

  var bod = document.getElementsByTagName("BODY")[0];
  var back = document.createElement('div');
  back.setAttribute('class', 'back_pop');

  var win = document.createElement('div');
  win.setAttribute('class', 'win_pop');
  win.innerHTML = '<button class="close" onclick="close_pop()">×</button>'+ text;

  var but_agree = document.createElement('button');
  but_agree.setAttribute('class', 'btn btn-success btn-danger2');
  but_agree.setAttribute('onclick', 'master_update(true); arr_loc.splice(-1,1);');
  but_agree.innerHTML = 'שמור';

  var but_del = document.createElement('button');
  but_del.setAttribute('class', 'btn btn-light btn-light2');
  but_del.setAttribute('onclick', 'arr_loc.splice(-1,1); set_pro0(null, true); set_blue();');
  but_del.innerHTML = 'אל תשמור';
  win.append(but_agree, but_del);

  back.append(win);
  bod.append(back);
}
//


// אייקון כתום
function set_orange(){
  var main_icon = document.getElementById('main_icon').getElementsByTagName('i')[0];
  var bol = false;
  if (main_icon.style.color != 'orange'){
    bol = true;
  }
  main_icon.style.color = 'orange';
  document.getElementById('main_icon').setAttribute('onclick', 'master_update(); pop_mes_sec(\'שינויים נשמרו\');');

  var left_ar = document.getElementById('left_ar').getElementsByTagName('i')[0];
  left_ar.setAttribute('onclick', 'pop_win_if_save();');


  if (bol == true){
    pop_mes('שינויים בוצעו, לחץ כאן לביטול');
  }
}
// אייקון כחול
function set_blue(){
  var main_icon = document.getElementById('main_icon').getElementsByTagName('i')[0];
  main_icon.style.color = '#2196F3';
  document.getElementById('main_icon').setAttribute('onclick', 'change_mode()');

  var left_ar = document.getElementById('left_ar').getElementsByTagName('i')[0];
  left_ar.setAttribute('onclick', 'arr_loc.splice(-1,1); set_pro0();');
  pop_mes_del();
}
//









// מעדכן ראשי
function master_update(bol){
  var data = {
    arr_loc: arr_loc,
    new_obj: old_obj
  };

  $.ajax({
    url: '/master_update',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function(response) {
      set_pro0(null, bol);
      set_blue();

    }
  });
}
