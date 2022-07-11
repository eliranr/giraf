
// במצב עריכה
function rfi_edit(){

  var lines = old_obj.list_files;

  var left_ar = document.getElementById('left_ar');
  left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="arr_loc.splice(-1,1); set_pro0();"></i>' +
  '<i class="fas fa-plus-circle arr arr_cir" onclick="add_rfi()"></i>';

  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab');

  var table = document.createElement('table');
  table.setAttribute('class', 'tab_plan');

// צור כותרות
  var tr = document.createElement('tr');
  tr.setAttribute('style', 'background-color: #dddddd; height: 53px;');
  var cotarot = ['RFI', 'תיאור', 'סטטוס', 'תאריך התחלה', 'תאריך סיום', 'קובץ', 'הערה'];

  for (var z=0; z<cotarot.length; z++){
    var th = document.createElement('th');
    th.innerHTML = cotarot[z];
    if (cotarot[z] == 'RFI'){
      th.setAttribute('style', 'text-align: center;');
    }

    tr.append(th);
  }
  table.append(tr);


  // צור שורות
    var order = ['num', 'explan', 'status', 'date_start', 'date_stop', 'file_name', 'note'];
    for (var c=lines.length-1; c!=-1; c--){
      var tr0 = document.createElement('tr');
      for (var t=0; t<order.length; t++){
        var td0 = document.createElement('td');
        var inp = document.createElement('input');
        inp.setAttribute('autocomplete', 'off');
        inp.setAttribute('onchange', 'val_update_rfi(this, \'' + c + '\', \''+ order[t] +'\')');
        inp.setAttribute('class', 'tab_inp');
        if (order[t] == 'file_name'){
          td0.setAttribute('style', 'text-align: center;');
          td0.innerHTML = '<a href="/rfi/'+lines[c][order[t]]+'.pdf" download><i class="fas fa-file-download ico_tab_down"></i></a>';
        } else {
          inp.value = lines[c][order[t]];
          td0.append(inp);
        }
        if(order[t] == 'num'){
          td0.setAttribute('style', 'width: 50px; text-align: center;');
          td0.innerHTML = lines[c][order[t]];
        } else if (order[t] == 'date_start' || order[t] == 'date_stop'){
          inp.setAttribute('type', 'date');
        }
        tr0.append(td0);
      }
      var td1 = document.createElement('td');
      td1.setAttribute('class', 'del_tr');
      td1.setAttribute('style', 'border: 0;');
      var but_del = document.createElement('button');
      but_del.setAttribute('class', 'btn btn-light');
      but_del.setAttribute('onclick', 'del_line_rfi(\''+c+'\');');
      but_del.innerHTML = 'X';
      td1.append(but_del);
      tr0.append(td1);

      table.append(tr0);
    }

    if (old_obj.list_files.length == 0){
      con.innerHTML = '<h4>לא קיימים קבצים</h4>';
    } else {
      con.append(table);
    }

  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(con);
}
/////////////////////////////////////////////////////


// שינוי ערכים בתוך השורות
function val_update_rfi(zis, line, cot){
  set_orange();
  var data = {
    new_name: zis.value,
    arr_loc: arr_loc,
    line: line,
    coteret: cot
  };

  old_obj.list_files[data.line][data.coteret] = data.new_name;
}
//



// מחק סופית את השורה
function del_line_rfi(line){
  set_orange();
  var data = {
    line: line,
    arr_loc: arr_loc
  };
  old_obj.list_files.splice(data.line, 1);
  rfi_edit();
}
//










// טופס יצירת קובץ rfi
function add_rfi(){
  var left_ar = document.getElementById('left_ar');
  left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="arr_loc.splice(-1,1); set_pro0();"></i>' +
  '<i class="fas fa-plus-circle arr arr_cir" onclick="rfi_edit()"></i>';

  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab');
  con.setAttribute('id', 'add_rfi_con');

  var arr = ['שם הפרויקט', 'RFI', 'תאריך', 'מס חוזה', 'מזמין העבודה', 'ניהול פרויקט'];

  var arr_en = ['pro_name', 'rfi', 'date', 'num_contract', 'event_job', 'manage_pro'];

///////
  var div0 = document.createElement('div');
  div0.setAttribute('class', 'tables_rfi');

  var table_top0 = document.createElement('table');
  table_top0.setAttribute('class', 'rfi_tab rfi_tab0');
  for (var i=0; i<3; i++){
    var tr = document.createElement('tr');

    var td0 = document.createElement('td');
    td0.setAttribute('class', 'td_tab0');
    td0.innerHTML = arr[i] + ':';

    var td1 = document.createElement('td');
    td1.setAttribute('class', 'td_tab1');
    var inp = document.createElement('input');
    inp.setAttribute('autocomplete', 'off');
    inp.setAttribute('class', 'inp');
    inp.setAttribute('name', arr_en[i]);
    if (arr_en[i] == 'pro_name'){
      inp.value = pro0.name_pro;
      inp.disabled = true;
    } else if (arr_en[i] == 'date'){
      inp.setAttribute('type', 'date');
      inp.value = setDate(new Date());
    }

    td1.append(inp);

    tr.append(td0, td1);
    table_top0.append(tr);
  }

  var table_top1 = document.createElement('table');
  table_top1.setAttribute('class', 'rfi_tab rfi_tab1');
  for (var z=3; z<6; z++){
    var tr0 = document.createElement('tr');

    var td2 = document.createElement('td');
    td2.setAttribute('class', 'td_tab0');
    td2.innerHTML = arr[z] + ':';

    var td3 = document.createElement('td');
    td3.setAttribute('class', 'td_tab1');
    var inp3 = document.createElement('input');
    inp3.setAttribute('autocomplete', 'off');
    inp3.setAttribute('class', 'inp');
    inp3.setAttribute('name', arr_en[z]);
    td3.append(inp3);

    tr0.append(td2, td3);
    table_top1.append(tr0);
  }
  div0.append(table_top0, table_top1);

/////

  var tab_rfi1 = document.createElement('table');
  tab_rfi1.setAttribute('class', 'tab_rfi1');

  tab_rfi1.innerHTML =
  '<tr>' +
    '<td class="one">הבקשה מתייחסת לתוכניות:</td>' +
    '<td class="two"><input type="text" name="bakasa0" class="inp"></td>' +
  '</tr>';

////

  var tab_rfi2 = document.createElement('table');
  tab_rfi2.setAttribute('class', 'tab_rfi2 tab_plan');

  var arr_0 = ['תכנית', 'מהדורה', 'מבנה', 'מס גליון', 'נוסף'];
  var arr_0en = ['plan', 'mahadura', 'constract', 'num_gil', 'more'];

  var tr_0 = document.createElement('tr');
  for (var w=0; w<arr_0.length; w++){
    var th_0 = document.createElement('th');
    th_0.innerHTML = arr_0[w];
    tr_0.append(th_0);
  }

  var tr_1 = document.createElement('tr');
  for (var c=0; c<arr_0.length; c++){
    var td_1 = document.createElement('td');
    var inp_0 = document.createElement('input');
    inp_0.setAttribute('autocomplete', 'off');
    inp_0.setAttribute('class', 'inp');
    inp_0.setAttribute('name', arr_0en[c]);

    td_1.append(inp_0);
    tr_1.append(td_1);
  }
  tab_rfi2.append(tr_0, tr_1);


////

  var div1 = document.createElement('div');
  div1.setAttribute('class', 'div_rfi0');

  var font = document.createElement('font');
  font.innerHTML = 'פירוט מלא של הבקשה:';

  var textarea = document.createElement('textarea');
  textarea.setAttribute('name', 'req_text');
  div1.append(font, textarea);

////
  var user_name = $('#user_name').val();

  var tab_rfi5 = document.createElement('table');
  tab_rfi5.setAttribute('class', 'tab_rfi5');

  tab_rfi5.innerHTML =
  '<tr>' +
    '<td class="one">שם מגיש הבקשה:</td>' +
    '<td class="two"><input type="text" name="name_req" class="inp" value="'+ user_name +'"></td>' +
  '</tr>';

////
  var div_but = document.createElement('div');
  div_but.setAttribute('class', 'div_but_rfi');
  var but_send = document.createElement('button');
  but_send.setAttribute('class', 'btn btn-primary but_rfi');
  but_send.innerHTML = 'צור טופס RFI';
  but_send.setAttribute('onclick', 'create_RFI()');

  div_but.append(but_send);
////

  con.append(div0, tab_rfi1, tab_rfi2, div1, tab_rfi5, div_but);
  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(con);
}
//


// שליחת טוס לשרת
function create_RFI(){
  var div = document.getElementById('add_rfi_con');
  var inputs = div.getElementsByTagName('input');

  var data = {};

  for (var i=0; i<inputs.length; i++){
    if (inputs[i].name == 'date'){
      data[inputs[i].name] = get_date(inputs[i].value);
    } else {
      data[inputs[i].name] = inputs[i].value;
    }
  }

  var text_area = div.getElementsByTagName('textarea')[0];
  data[text_area.name] = text_area.value;

  data.arr_loc = arr_loc;
  loading();
  $.ajax({
    url: '/create_rfi',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function(response) {
      if (response == true){
        set_pro0();
      }
    }
  });
}
//
















// במצב קריאה
function rfi_read(){

  var lines = old_obj.list_files;

  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab');

  var table = document.createElement('table');
  table.setAttribute('class', 'tab_cablan');

// צור כותרות
  var tr = document.createElement('tr');
  tr.setAttribute('style', 'background-color: #dddddd; height: 53px;');
  var cotarot = ['RFI', 'תיאור', 'סטטוס', 'תאריך התחלה', 'תאריך סיום', 'קובץ', 'הערה'];

  for (var z=0; z<cotarot.length; z++){
    var th = document.createElement('th');
    th.innerHTML = cotarot[z];
    if (cotarot[z] == 'RFI'){
      th.setAttribute('style', 'text-align: center;');
    }

    tr.append(th);
  }
  table.append(tr);

// צור שורות
  var order = ['num', 'explan', 'status', 'date_start', 'date_stop', 'file_name', 'note'];
  for (var c=lines.length-1; c!=-1; c--){
    var tr0 = document.createElement('tr');
    for (var t=0; t<order.length; t++){
      var td0 = document.createElement('td');
      if (order[t] == 'file_name'){
        td0.setAttribute('style', 'text-align: center; width: 70px;');
        td0.innerHTML = '<a href="/rfi/'+lines[c][order[t]]+'.pdf" download><i class="fas fa-file-download ico_tab_down"></i></a>';
      } else {
        td0.innerHTML = lines[c][order[t]];
      }
      if(order[t] == 'num'){
        td0.setAttribute('style', 'width: 50px; text-align: center;');
      } else if (order[t] == 'date_start' || order[t] == 'date_stop' || order[t] == 'status'){
        td0.setAttribute('style', 'width: 13%;');
      }
      tr0.append(td0);
    }
    table.append(tr0);
  }

  if (old_obj.list_files.length == 0){
    con.innerHTML = '<h4>לא קיימים קבצים</h4>';
  } else {
    con.append(table);
  }

  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(con);
}
