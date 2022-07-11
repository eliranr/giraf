var add_tab_was_plan = false;



function table_plan_edit(){
  add_tab_was_plan = false;

  var all = document.createElement('div');

  var main_icon = document.getElementById('main_icon').getElementsByTagName('i')[0];
  if (main_icon.style.color != 'orange'){
    var left_ar = document.getElementById('left_ar');
    left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="arr_loc.splice(-1,1); set_pro0();"></i>' +
     '<i class="fas fa-plus-circle arr arr_cir" onclick="create_tab_plan()"></i>';
  }

  var cotarot = old_obj.new;

  if (old_obj.tables.length == 0){
    create_tab_plan();
  }

// הדפסה של כל הטבלאות
  for (var d=old_obj.tables.length-1; d!=-1; d--){

    var but_del_table = document.createElement('button');
    but_del_table.setAttribute('class', 'btn btn-light but_del_table');
    but_del_table.setAttribute('title', 'מחק טבלה');
    but_del_table.setAttribute('onclick', 'del_tab_plan('+d+')');
    but_del_table.innerHTML = 'X';

    var con = document.createElement('div');
    con.setAttribute('class', 'contenier_tab con_tab_beton');

    var h4 = document.createElement('h4');
    h4.innerHTML = 'עדכון ' + (Number(d)+1);
    h4.setAttribute('style', 'margin-bottom: 10px;');
    con.append(h4);

    var table = document.createElement('table');
    table.setAttribute('class', 'tab_plan');

// יצירת כותרת טבלה
    var tr = document.createElement('tr');
    for (var z=0; z<cotarot.length; z++){
      var th = document.createElement('th');
      th.innerHTML = cotarot[z];
      tr.append(th);
    }
    table.append(tr);


// צור את כל השורות
    var lines = old_obj.tables[d];
    for (var a=0; a<lines.length;a++){
      var tr0 = document.createElement('tr');

      for (var c=0; c<cotarot.length; c++){

        var td0 = document.createElement('td');
        var inp0 = document.createElement('input');


        inp0.setAttribute('class', 'tab_inp');
        inp0.setAttribute('onchange', 'change_line_multi_tab(this, \''+d+'\', \''+a+'\', \''+cotarot[c]+'\')');
        inp0.value = lines[a][cotarot[c]];
        if (cotarot[c] == 'תאריך עדכון'){
          inp0.setAttribute('type', 'date');
          td0.setAttribute('style', 'width: 110px;');
          td0.append(inp0);
        }
        else if (cotarot[c] == 'קובץ'){
          inp0.setAttribute('type', 'file');
          inp0.setAttribute('onchange', 'update_file_line(this, \''+d+'\', \''+a+'\', \''+cotarot[c]+'\')');
          td0.setAttribute('class', 'td_upload');
          var ico_down = document.createElement('i');
          if (lines[a][cotarot[c]] == ''){
            ico_down.style.color = '#ffff48db';
            ico_down.setAttribute('class', 'fas fa-file-upload');
            ico_down.setAttribute('onclick', 'click_upload(this)');
          } else {
            ico_down.style.color = 'mediumseagreen';
            ico_down.setAttribute('class', 'fas fa-file-upload file-bot');
          }

          td0.append(ico_down, inp0);
        } else if (cotarot[c] == 'שינוי אחרון'){
          if (typeof lines[a][cotarot[c]].time == 'undefined'){
            td0.innerHTML = '';
          } else {
            td0.innerHTML = lines[a][cotarot[c]].name;
            td0.setAttribute('title', get_full_time(lines[a][cotarot[c]].time));
          }
        } else {
          td0.append(inp0);
        }

        if (cotarot[c] == 'קוד'){
          td0.setAttribute('style', 'width: 80px;');
        } else if (cotarot[c] == 'מספר עותקים' || cotarot[c] == 'סטטוס' || cotarot[c] == 'שינוי אחרון'){
          td0.setAttribute('style', 'width: 10%;');
        } else if (cotarot[c] == 'מהדורה אחרונה'){
          td0.setAttribute('style', 'width: 13%;');
        } else if (cotarot[c] == 'תאריך עדכון'){
          td0.setAttribute('style', 'width: 13%;');
        }


        tr0.append(td0);
      }
      var td1 = document.createElement('td');
      td1.setAttribute('class', 'del_tr');
      var but_del = document.createElement('button');
      but_del.setAttribute('class', 'btn btn-light');
      but_del.setAttribute('onclick', 'del_line_plan(\''+d+'\', \''+a+'\');');
      but_del.innerHTML = 'X';
      td1.append(but_del);
      tr0.append(td1);


      table.append(tr0);
    }

// שורת צור שורה חדשה
    var tr_new = document.createElement('tr');
    var td = document.createElement('th');
    td.setAttribute('class', 'th_');

    var inp = document.createElement('input');
    inp.setAttribute('class', 'tab_inp');
    inp.setAttribute('onchange', 'add_line_multi_tab(this, \''+d+'\')');
    inp.setAttribute('placeholder', 'הוסף שורה');

    td.append(inp);
    tr_new.append(td);
    table.append(tr_new);

    con.append(table);
    all.append(but_del_table, con);

  }
  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(all);
}
////////////////////




// הוספת שורה לטבלה
function add_line_multi_tab(zis, num){
  set_orange();
  var data = {
    value: zis.value,
    num: num,
    arr_loc: arr_loc
  };

  var obj0 = {
    'שם התוכנית': data.value,
    'קוד': '',
    'סטטוס': '',
    'מהדורה אחרונה': '',
    'תאריך עדכון': '',
    'מספר עותקים': '',
    'קובץ': '',
    'שינוי אחרון': ''
  };
  old_obj.tables[data.num].push(obj0);

  table_plan_edit();

}
//

// שינוי ערך בשורה בטבלה כפולה
function change_line_multi_tab(zis, num, line, cot, bol){
  set_orange();
  data = {
    value: zis.value,
    num: num,
    cot: cot,
    line: line,
    arr_loc: arr_loc
  };

  var user_name = $('#user_name').val();

  if (old_obj.new.includes('שינוי אחרון')){
    old_obj.tables[data.num][data.line]['שינוי אחרון'] = {name: user_name, time: new Date()};
  }

  old_obj.tables[data.num][data.line][data.cot] = data.value;

  if (bol === true){
    table_plan_edit();
  }
}
//

// העלה קובץ לשרת
function update_file_line(zis, num, line, cot){
  if (zis.value != ''){
    var zis0 = zis;
    var file = zis.files[0];
    var formData = new FormData();
      formData.append("post_file", file);
    $.ajax({
      url: '/upload',
      type: 'POST',
      processData: false,
      contentType: false,
      data: formData,
      success: function(response) {
        var inp = document.createElement('input');
        inp.value = response.file_name;
        change_line_multi_tab(inp, num, line, cot, true);

      }
    });
  } else {
    zis.setAttribute('type', 'file');
    change_line_multi_tab(zis, num, line, cot, true);
  }
}
//


// מחיקה של שורה קיימת
function del_line_plan(tab, line){
  set_orange();
  var data = {
    table: tab,
    line: line,
    arr_loc: arr_loc
  };

  old_obj.tables[data.table].splice(data.line, 1);
  table_plan_edit();
}
//



// יצירת טבלה חדשה
function create_tab_plan(){
  set_orange();
  var data = {
    arr_loc: arr_loc
  };
  old_obj.tables.push([]);
  table_plan_edit();
}
//

// מחיקת תת טבלה
function del_tab_plan(num){
  set_orange();
  var data = {
    num: num,
    arr_loc: arr_loc
  };

  old_obj.tables.splice(data.num, 1);
  table_plan_edit();
}
//












// מצב קריאה
function table_plan_read(){
  var all = document.createElement('div');

  var cotarot = old_obj.new;

  if (old_obj.tables.length == 0){
    create_tab_plan();
  }

// צור את כל הטבלאות
  for (var d=old_obj.tables.length-1; d!=-1; d--){

    var con = document.createElement('div');
    con.setAttribute('class', 'contenier_tab con_tab_beton');

    var h4 = document.createElement('h4');
    h4.innerHTML = 'עדכון ' + (Number(d)+1);
    h4.setAttribute('style', 'margin-bottom: 10px;');
    con.append(h4);

    var table = document.createElement('table');
    table.setAttribute('class', 'tab_plan');

// יצירת כותרת טבלה
    var tr = document.createElement('tr');
    for (var z=0; z<cotarot.length; z++){
      var th = document.createElement('th');
      th.innerHTML = cotarot[z];
      tr.append(th);
    }
    table.append(tr);


    // צור את כל השורות
        var lines = old_obj.tables[d];
        for (var a=0; a<lines.length;a++){
          var tr0 = document.createElement('tr');
          for (var c=0; c<cotarot.length; c++){
            var td0 = document.createElement('td');
            if (cotarot[c] == 'קובץ'){
              td0.setAttribute('class', 'td_upload');
              if (lines[a][cotarot[c]] != ''){
                td0.innerHTML = '<a href="/uploads/'+lines[a][cotarot[c]]+'" download><i class="fas fa-file-download ico_tab_down"></i></a>';
              } else {
                td0.innerHTML = '';
              }
            }
            else if (cotarot[c] == 'שינוי אחרון'){
              if (typeof lines[a][cotarot[c]].time == 'undefined'){
                td0.innerHTML = '';
              } else {
                td0.innerHTML = lines[a][cotarot[c]].name;
                td0.setAttribute('title', get_full_time(lines[a][cotarot[c]].time));
              }
            } else if (cotarot[c] == 'תאריך עדכון'){
              if (lines[a][cotarot[c]] != ''){
                td0.innerHTML = get_date(lines[a][cotarot[c]]);
              } else {
                td0.innerHTML = lines[a][cotarot[c]];
              }
            } else {
              td0.innerHTML = lines[a][cotarot[c]];
            }
            if (cotarot[c] == 'קוד' || cotarot[c] == 'קובץ'){
              td0.setAttribute('style', 'width: 80px;');
            } else if (cotarot[c] == 'מספר עותקים' || cotarot[c] == 'סטטוס' || cotarot[c] == 'שינוי אחרון'){
              td0.setAttribute('style', 'width: 10%;');
            } else if (cotarot[c] == 'מהדורה אחרונה' || cotarot[c] == 'תאריך עדכון'){
              td0.setAttribute('style', 'width: 13%;');
            }



            tr0.append(td0);
          }
          table.append(tr0);
        } // סיום יצירת שורות


    con.append(table);
    all.append(con);
  }

  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(all);




}
