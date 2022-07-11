var obj_fold = {
  // details: [],
  list_th: [
    {name: "aaa", type: "normal"},
    {name: "bbb", type: "normal"},
    {name: "זמן", type: "date"},
    {name: "ddd", type: "normal"},
    {name: "eee", type: "file"}
  ],
  tables: [
    {name: "ראשון",
    lines: [
      [{aaa: "השורה"}, {bbb: "2השורה"}],
      [{aaa: "השורה השנייה"}],
      [{aaa: "שלישית"}]
    ],
    name: "ראשון"
    }
  ],
  type: "universal_table"
}





function createFold() {
  if (obj_fold.type == null) {
    obj_fold = {
      // details: [],
      list_th: [],
      tables: [],
      type: 'universal_table'
    }
  }
  var left_ar = document.getElementById('left_ar');
  left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="start_tableFactory(); obj_fold = {}"></i>' +
   '<i class="fas fa-plus-circle arr arr_cir" onclick="create_new_tab()"></i>';

  // var con = document.createElement('div');
  // con.setAttribute('class', 'contenier_tab con_add_tab');
  // var inp1 = document.createElement('input');
  // inp1.setAttribute('class', 'inp inp_add_tab inp_create_fold');
  // inp1.setAttribute('placeholder', 'שם התבנית');
  // con.append(inp1);


  var con_tabs = document.createElement('div');
  obj_fold.tables.forEach((item, i) => {
    var inp1 = document.createElement('input');
    inp1.setAttribute('class', 'inp inp_add_tab inp_create_fold');
    inp1.setAttribute('placeholder', 'שם הטבלה');
    inp1.value = item.name;

    var con0 = document.createElement('div');
    con0.setAttribute('class', 'contenier_tab con_add_tab');

    var h4 = document.createElement('h6');
    h4.innerHTML = 'טבלה מוכנה';

    var table = document.createElement('table');
    table.setAttribute('class', 'tab_plan');
// יצירת כותרות
    var tr0 = document.createElement('tr');
    obj_fold['list_th'].forEach((item, w) => {
      var th = document.createElement('th');

      var inp = document.createElement('input');
      inp.setAttribute('class', 'tab_inp');
      inp.setAttribute('onchange', 'changeTh(this, '+i+', '+w+', \''+ item.name +'\')');
      inp.value = item.name;
      th.append(inp);
      tr0.append(th);
    });

    table.append(tr0);

// צור את כל השורות
    item.lines.forEach((item, p) => {
      var tr = document.createElement('tr');

      obj_fold.list_th.forEach((itemz, z) => {
        var line_loc = null;
        var text = '';
        for (var t=0; t<item.length; t++) {
          if (item[t][itemz.name] != null) {
            text = item[t][itemz.name];
            line_loc = t;
          }
        }
        var td = document.createElement('td');
        var inp = document.createElement('input');
        inp.setAttribute('class', 'tab_inp');
        inp.setAttribute('onchange', 'changeTd(this, '+i+', '+p+', '+line_loc+', \''+itemz.name+'\')');
        inp.value = text;

        if (itemz.type == 'date') {
          inp.setAttribute('type', 'date');
        } else if (itemz.type == 'time') {
          inp.setAttribute('type', 'time');
        } else if (itemz.type == 'last_time') {
          inp.disabled = true;
        } else if (itemz.type == 'file') {

          inp.setAttribute('type', 'file');
          inp.setAttribute('onchange', 'update_file_line(this, '+i+', '+p+', '+line_loc+', \''+itemz.name+'\')');
          td.setAttribute('class', 'td_upload');
          var ico_down = document.createElement('i');
          ico_down.setAttribute('onclick', 'click_upload(this)');
          if (text == ''){
            ico_down.style.color = '#ffff48db';
            ico_down.setAttribute('class', 'fas fa-file-upload');
          } else {
            ico_down.style.color = 'mediumseagreen';
            ico_down.setAttribute('class', 'fas fa-file-upload file-bot');
          }
          td.append(ico_down, inp);

        }





        td.append(inp);
        tr.append(td);
      });

      table.append(tr);
  });








// שורת צור שורה חדשה
    var tr_new = document.createElement('tr');
    var td = document.createElement('th');
    td.setAttribute('class', 'th_');

    var inp = document.createElement('input');
    inp.setAttribute('class', 'tab_inp');
    inp.setAttribute('onchange', 'create_line_tab(this, '+ i +')');
    inp.setAttribute('placeholder', 'הוסף שורה');
    if (obj_fold.list_th.length == 0) {
      inp.disabled = true;
    }
    // פונקציה הוספת שורה

    td.append(inp);
    tr_new.append(td);


    // append
    table.append(tr_new);

    con0.append(inp1, h4, table);
    con_tabs.append(con0);
  });





  var con1 = document.createElement('div');
  con1.setAttribute('id', 'add_tab_con');


  var con2 = document.createElement('div');
  con2.setAttribute('class', 'contenier_tab con_tab_beton');
  var con2 = document.createElement('div');
  con2.setAttribute('class', 'contenier_tab con_add_tab');
  var inp1 = document.createElement('input');
  inp1.setAttribute('class', 'inp inp_add_tab');
  inp1.setAttribute('placeholder', 'שם עמודה');
  var sel = document.createElement('select');
  sel.setAttribute('class', 'inp inp_add_tab');

  var is_lastTime = false;
  obj_fold.list_th.forEach((item_th, i_th) => {
    if (item_th.type == 'last_time'){
      is_lastTime = true;
    }
  });
  if (is_lastTime == false){
    sel.innerHTML =
    '<option disabled>סוג עמודה</option>' +
    '<option value="normal" selected>רגילה</option>' +
    '<option value="file">קבצים</option>' +
    '<option value="mobile">נייד</option>' +
    '<option value="email">מאייל</option>' +
    '<option value="time">שעה</option>' +
    '<option value="date">תאריך</option>' +
    '<option value="last_time">שינוי אחרון</option>';
  } else {
    sel.innerHTML =
    '<option disabled>סוג עמודה</option>' +
    '<option value="normal" selected>רגילה</option>' +
    '<option value="file">קבצים</option>' +
    '<option value="mobile">נייד</option>' +
    '<option value="email">מאייל</option>' +
    '<option value="time">שעה</option>' +
    '<option value="date">תאריך</option>';
  }

  var but = document.createElement('button');
  but.setAttribute('class', 'btn btn-primary');
  but.setAttribute('onclick', 'add_tur2(this)');
  but.innerHTML = 'הוסף';
  if (obj_fold.tables.length == 0) {
    but.disabled = true;
  }

  con2.append(inp1, sel, but);


  bod.innerHTML = '';
  bod.append(con_tabs, con1, con2);
}





// הוסף טבלה חדשה
function add_new_tab(zis){
  var name_tur = $(zis.parentElement).find('input')[0].value;
  if (obj_fold.list_th.includes(name_tur)){
    name_tur = name_tur.slice(0, -1);
  }
  obj_fold['tables'].push({
    name: name_tur,
    lines: []
  });
  var con1 = document.getElementById('add_tab_con');
  con1.innerHTML = '';
  createFold();
}
//


// הוסף עמודה
function add_tur2(zis){
  var name_tur = $(zis.parentElement).find('input')[0].value;
  var type_tur = $(zis.parentElement).find('select')[0].value;
  if (name_tur == ''){

  } else {
    var data = {
      name: name_tur,
      type: type_tur,
    };


    var isTurName = false;
    obj_fold.list_th.forEach((item, i) => {
      if (item.name == data.name) {
        isTurName = true;
      }
    });
    if (isTurName == false) {
      obj_fold['list_th'].push({
        name: data.name,
        type: data.type
      });

      createFold();
    } else {
      pop_mes_sec('שם עמודה כבר קיים, אנא בחר שם אחר')
    }

  }
}
//

// הוסף אופציה ליצירת טבלה חדשה
function create_new_tab() {
  var left_ar = document.getElementById('left_ar');
  left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="start_tableFactory(); obj_fold = {}"></i>' +
   '<i class="fas fa-plus-circle arr arr_cir" onclick="remove_new_tab()"></i>';

  var con1 = document.getElementById('add_tab_con');
  con1.setAttribute('class', 'contenier_tab con_add_tab');
  var inp1 = document.createElement('input');
  inp1.setAttribute('class', 'inp inp_add_tab inp_create_fold');
  inp1.setAttribute('placeholder', 'שם הטבלה');
  var but0 = document.createElement('button');
  but0.setAttribute('class', 'btn btn-primary');
  but0.setAttribute('onclick', 'add_new_tab(this)');
  but0.innerHTML = 'הוסף';
  con1.append(inp1, but0);
}
//
// מחיקת אופציה לטבלה חדשה
function remove_new_tab() {
  var con1 = document.getElementById('add_tab_con');
  con1.setAttribute('class', '');
  var left_ar = document.getElementById('left_ar');
  left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="start_tableFactory(); obj_fold = {}"></i>' +
   '<i class="fas fa-plus-circle arr arr_cir" onclick="create_new_tab()"></i>';


  con1.innerHTML = '';
}
//


// הוספת שורה לטבלה
function create_line_tab(zis, tab_num){
  var obj = [{
    [obj_fold.list_th[0].name]: zis.value
  }];
  obj_fold.tables[tab_num].lines.push(obj);

  createFold();

}
//

// שינוי ערך בתוך השורות
function changeTd(zis, tab_num, line_num, line_loc, th, isReload) {

  if (line_loc != null) {
    obj_fold.tables[tab_num].lines[line_num][line_loc][th] = zis.value;
  } else {
    obj_fold.tables[tab_num].lines[line_num].push({[th]: zis.value})
  }
  if (isReload == true){
    createFold();
  }
}
//
// שינוי ערך בכותרת
function changeTh(zis, tub_num, th_num, th_name) {
  obj_fold['list_th'][th_num].name = zis.value;

  obj_fold.tables.forEach((item, i) => {
    item.lines.forEach((itemz, z) => {
      itemz.forEach((itemw, w) => {
        if (itemw[th_name] != null) {
          var new_item = {
            [zis.value]: itemw[th_name]
          }
          itemz.splice(w, 1);
          itemz.push(new_item)
          var newObj = {[th_name]: zis.value}
        }
      });
    });
  });
  createFold();
}
//

// העלה קובץ לשרת
function update_file_line(zis, tab_num, line_num, line_loc, th){
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
        changeTd(zis, tab_num, line_num, line_loc, th, true);

      }
    });
  } else {
    zis.setAttribute('type', 'file');
    changeTd(zis, tab_num, line_num, line_loc, th, true);
  }
}
//

// td לחיצה על קובץ
function click_upload(zis){
  zis = zis.parentElement;
  var input = zis.getElementsByTagName('input')[0];
  input.click();
}
//


// לחיצה ממשוכת
$(window).mousedown(function(e) {
    clearTimeout(this.downTimer);
    this.downTimer = setTimeout(function() {
      if (e.target.className == 'fas fa-file-upload file-bot'){
        var td = e.target.parentElement;
        var inp = td.getElementsByTagName('input')[0];
        inp.setAttribute('type', 'text');
        $(inp).val('').change();

        if (obj_fold.type == 'universal_table'){
          createFold();
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
