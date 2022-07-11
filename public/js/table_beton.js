var add_tab_was = false;


function table_beton_edit(){
  console.log(old_obj);
  add_tab_was = false;

  var bod = document.getElementById('bod');
  bod.innerHTML = '';

  var main_icon = document.getElementById('main_icon').getElementsByTagName('i')[0];
  if (main_icon.style.color != 'orange'){
    var left_ar = document.getElementById('left_ar');
    left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="arr_loc.splice(-1,1); set_pro0();"></i>' +
    '<i class="fas fa-plus-circle arr arr_cir" onclick="add_tab()"></i>';
  }

  var cotarot = old_obj.new;

  if (old_obj.tables.length == 0){
    add_tab();
  }

// הדפסה של כל הטבלאות
  for (var d=old_obj.tables.length-1; d!=-1; d--){
    var up_coteret = document.createElement('P');
    up_coteret.setAttribute('class', 'up_coteret');

    up_coteret.innerHTML =
    '<font>תיאור: </font><input type="text" value=\"'+old_obj.details[d].explan+'\" class="inp" onchange="change_up_bet(this, '+d+')">' +
    '<i><input type="date" value='+setDate(old_obj.details[d].date)+' class="inp" onblur="change_up_bet(this, '+d+')">'+'</i>';

    var but_del_table = document.createElement('button');
    but_del_table.setAttribute('class', 'btn btn-light but_del_table');
    but_del_table.setAttribute('title', 'מחק טבלה');
    but_del_table.setAttribute('onclick', 'del_tab_beton('+d+')');
    but_del_table.innerHTML = 'X';


    var total_beton = 0;
    var con = document.createElement('div');
    con.setAttribute('class', 'contenier_tab con_tab_beton');


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


// הדפסה של כל השורות
    var lines = old_obj.tables[d];
    for (var a=0; a<lines.length;a++){
      var tr0 = document.createElement('tr');

      for (var c=0; c<cotarot.length; c++){

        var td = document.createElement('td');
        var inp = document.createElement('input');

        if (cotarot[c] == 'כמות בקוב'){
          total_beton += Number(lines[a][cotarot[c]]);
          td.setAttribute('style', 'width: 100px;');
        }

        inp.setAttribute('class', 'tab_inp');
        inp.setAttribute('onchange', 'change_line_multi_tab(this, \''+d+'\', \''+a+'\', \''+cotarot[c]+'\')');
        inp.value = lines[a][cotarot[c]];
        if (cotarot[c] == 'שעת הגעה' || cotarot[c] == 'תחילת פריקה' || cotarot[c] == 'סיום פריקה'){
          inp.setAttribute('type', 'time');
          td.setAttribute('style', 'width: 110px;');
        } else if (cotarot[c] == 'מס ערבל' || cotarot[c] == 'סוג בטון' || cotarot[c] == 'מס תעודה'){
          td.setAttribute('style', 'width: 170px;');
        }

        td.append(inp);
        tr0.append(td);
      }
      var td0 = document.createElement('td');
      td0.setAttribute('class', 'del_tr');
      var but_del = document.createElement('button');
      but_del.setAttribute('class', 'btn btn-light');
      but_del.setAttribute('onclick', 'del_line_beton(\''+d+'\', \''+a+'\');');
      but_del.innerHTML = 'X';
      td0.append(but_del);
      tr0.append(td0);



      table.append(tr0);
    }


// הדפס שורה חדשה


    var tr5 = document.createElement('tr');
    var td5 = document.createElement('td');
    var inp5 = document.createElement('input');
    inp5.setAttribute('class', 'tab_inp');
    inp5.setAttribute('onchange', 'add_beton_line(this, \''+d+'\')');
    td5.append(inp5);
    tr5.append(td5);
    table.append(tr5);





// יצירה של טבלת סיכום קטנה
    var min_tab = document.createElement('table');
    min_tab.setAttribute('class', 'tab_plan mini_tab');

    var tr1 = document.createElement('tr');
    var arr = ['כמות בטון תאורטית', 'כמות בטון בפועל', 'אחוז הבטון שהוזמן'];

    for (var w=0; w<arr.length; w++){
      var td1 = document.createElement('td');
      td1.setAttribute('class', 'td_small td_small0');
      td1.innerHTML = arr[w];

      var td2 = document.createElement('td');
      td2.setAttribute('class', 'td_small0');

      if (w == 0){
        var inp1 = document.createElement('input');
        inp1.value = old_obj.details[d].teoreti;
        inp1.setAttribute('class', 'tab_inp');
        inp1.setAttribute('onchange', 'change_up_bet(this, '+d+', true)');
        td2.append(inp1);
      } else if (w == 1) {
        td2.innerHTML = total_beton;
      } else if (w == 2){
        var total = 100*(total_beton / old_obj.details[d].teoreti);
        if (isNaN(total_beton) || isNaN(Number(old_obj.details[d].teoreti)) || isFinite(total) == false){
          td2.innerHTML = "";
        } else {
          td2.innerHTML = Math.round(total) + '%';
        }
      }
      tr1.append(td1, td2);
    }
    min_tab.append(tr1);

    var hr = document.createElement('hr');
    hr.setAttribute('class', 'hr_beton');

    con.append(table, hr, min_tab);
    con.prepend(up_coteret);
    bod.append(but_del_table, con);

  }

}
////////////////////////


// יצירת שורה חדשה
function add_beton_line(zis, num){
  set_orange();
  var data = {
    value: zis.value,
    num: num,
    arr_loc: arr_loc
  };

  var obj0 = {
    'מס תעודה': data.value,
    'סוג בטון': '',
    'מס ערבל': '',
    'שעת הגעה': '',
    'תחילת פריקה': '',
    'סיום פריקה': '',
    'כמות בקוב': '',
    'הערות': ''
  };
  old_obj.tables[data.num].push(obj0);

  table_beton_edit();
}
//

// שינוי של תיאור או תריך שת תת טבלה
function change_up_bet(zis, num, bol){
  set_orange();
  var name = 'date';
  if (zis.type == 'text'){
    name = 'explan';
  }
  if (bol == true){
    name = 'teoreti';
  }

  var data = {
    arr_loc: arr_loc,
    num: num,
    name: name,
    value: zis.value
  };

  old_obj.details[data.num][data.name] = data.value;

}
//

// יצירת טבלה חדשה
function create_tab_beton(zis){
  set_orange();
  var mini_con = zis.parentElement;
  var inputs = mini_con.getElementsByTagName('input');

  var data = {
    explan: inputs[0].value,
    date: inputs[1].value,
    arr_loc: arr_loc
  };

  old_obj.details.push({date: new Date(data.date), explan: data.explan, teoreti: 0});
  old_obj.tables.push([]);

  table_beton_edit();
}
//

// מחיקת תת טבלה
function del_tab_beton(num){
  set_orange();
  var data = {
    num: num,
    arr_loc: arr_loc
  };

  old_obj.details.splice(data.num, 1);
  old_obj.tables.splice(data.num, 1);

  table_beton_edit();
}
//

// מחיקה של שורה קיימת
function del_line_beton(tab, line){
  set_orange();
  var data = {
    table: tab,
    line: line,
    arr_loc: arr_loc
  };

  old_obj.tables[data.table].splice(data.line, 1);

  table_beton_edit();
}
//

















// הוספת טבלה חדשה
function add_tab(){
  if (add_tab_was == false){
    var con = document.createElement('div');
    con.setAttribute('id', 'add_con_beton');
    con.setAttribute('class', 'contenier_tab con_add_tab');

    var inp1 = document.createElement('input');
    inp1.setAttribute('class', 'inp inp_add_tab');
    inp1.setAttribute('placeholder', 'תיאור');

    var inp2 = document.createElement('input');
    inp2.setAttribute('class', 'inp inp_add_tab');
    inp2.setAttribute('type', 'date');
    inp2.setAttribute('placeholder', 'תאריך');
    inp2.value = setDate(new Date());


    var but = document.createElement('button');
    but.setAttribute('class', 'btn btn-primary');
    but.setAttribute('onclick', 'create_tab_beton(this)');
    but.innerHTML = 'הוסף';

    con.append(inp1, inp2, but);

    var bod = document.getElementById('bod');
    bod.prepend(con);

    add_tab_was = true;
  } else {
      var con0 = document.getElementById('add_con_beton');
      con0.remove();

      add_tab_was = false;
    }
}
//



function get_date(time){
  if (time != ''){
    var time0 = new Date(time);
    var min = (time0.getMonth()+1);
    if (min.toString().length == 1){
      min = '0' + min;
    }
    var mon = time0.getDate();
    if (mon.toString().length == 1){
      mon  = '0' + mon;
    }

    var date = mon + '/' + min + '/' + time0.getFullYear();
    return date;
  } else {
    return '';
  }
}

function setDate(date){
  date = new Date(date);
  var mon = (date.getMonth()+1);
  if (mon.toString().length == 1){
    mon = '0' + mon;
  }
  var day = date.getDate();
  if (day.toString().length == 1){
    day = '0' + day;
  }


  var fin = date.getFullYear() + '-' + mon + '-' + day;
  return fin;
}








// טבלת בטון מצב קריאה
function table_beton_read(){
  var bod = document.getElementById('bod');
  bod.innerHTML = '';

  var cotarot = old_obj.new;

  if (old_obj.tables.length == 0){
    var h4 = document.createElement('h4');
    h4.innerHTML = 'אין מסמכים להצגה';
    bod.append(h4);
  }

  for (var d=old_obj.tables.length-1; d!=-1; d--){
    var up_coteret = document.createElement('P');
    up_coteret.setAttribute('class', 'up_coteret');

    up_coteret.innerHTML =
    '<font>תיאור: </font>' + old_obj.details[d].explan +
    '<i>'+get_date(old_obj.details[d].date)+'</i>';

    var total_beton = 0;
    var con = document.createElement('div');
    con.setAttribute('class', 'contenier_tab con_tab_beton');
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


// הדפסה של כל השורות
    var lines = old_obj.tables[d];
    for (var a=0; a<lines.length; a++){
      var tr0 = document.createElement('tr');
      for (var c=0; c<cotarot.length; c++){
        var td = document.createElement('td');

        if (cotarot[c] == 'שעת הגעה' || cotarot[c] == 'תחילת פריקה' || cotarot[c] == 'סיום פריקה'){
          td.setAttribute('style', 'width: 110px;');
        } else if (cotarot[c] == 'מס ערבל' || cotarot[c] == 'סוג בטון' || cotarot[c] == 'מס תעודה'){
          td.setAttribute('style', 'width: 170px;');
        }
        if (cotarot[c] == 'כמות בקוב'){
          total_beton += Number(lines[a][cotarot[c]]);
          td.setAttribute('style', 'width: 100px;');
        }


        td.innerHTML = lines[a][cotarot[c]];
        tr0.append(td);
      }
      table.append(tr0);
    }

// יצירה של טבלת סיכום קטנה
    var min_tab = document.createElement('table');
    min_tab.setAttribute('class', 'tab_plan mini_tab');

    var tr1 = document.createElement('tr');
    var arr = ['כמות בטון תאורטית', 'כמות בטון בפועל', 'אחוז הבטון שהוזמן'];

    for (var w=0; w<arr.length; w++){
      var td1 = document.createElement('td');
      td1.setAttribute('class', 'td_small0 td_small');
      td1.innerHTML = arr[w];

      var td2 = document.createElement('td');
      td2.setAttribute('class', 'td_small0');

      if (w == 0){
        td2.innerHTML = old_obj.details[d].teoreti;
      } else if (w == 1) {
        td2.innerHTML = total_beton;
      } else if (w == 2){
        var total = 100*(total_beton / Number(old_obj.details[d].teoreti));

        if (isNaN(total_beton) || isNaN(Number(old_obj.details[d].teoreti)) || isFinite(total) == false){
          td2.innerHTML = "";
        } else {
          td2.innerHTML = Math.round(total) + '%';
        }

      }
      tr1.append(td1, td2);
    }
    min_tab.append(tr1);


    var hr = document.createElement('hr');
    hr.setAttribute('class', 'hr_beton');



    con.append(up_coteret, table, hr, min_tab);

    bod.append(con);
  }




}
