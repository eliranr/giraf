var data = {};
var inp_file_to_del;

function its_table_edit(){
  var plan = arr_loc[arr_loc.length-1];

// השורות שקיימות
  var lines = Object.keys(old_obj);

var cotarot = old_obj.coteret;

// הסדר שזה צריך לקרות
  var order = old_obj.new;

  // הגדרות כלליות
  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab');

  var h4 = document.createElement('h4');
  h4.innerHTML = plan;
  h4.setAttribute('style', 'margin-bottom: 10px;');
  con.append(h4);


  var tab = document.createElement('table');
  tab.setAttribute('class', 'tab_plan');


// שורת הכותרות
  var tr0 = document.createElement('tr');

  order.forEach(function(ord){
    var th = document.createElement('th');
    if (ord == 'שם התוכנית'){
      th.setAttribute('class', 'tab_name_tochnit');
    } else {
      th.setAttribute('class', 'th_');
    }

    var inp = document.createElement('input');
    inp.setAttribute('class', 'tab_inp');
    inp.setAttribute('onchange', 'val_update_cot(this, \'coteret\', \''+ ord +'\')');

    inp.value = ord;

    th.append(inp);
    tr0.append(th);
  });
  tab.append(tr0);


// יצירת כל השורות
  lines.forEach(function(line){
    var tr_line = document.createElement('tr');
    if (line != 'type' && line != 'coteret' && line != 'new'){
      order.forEach(function(ord){
        var type = cotarot[ord];
        var text = old_obj[line][ord];

        var td = document.createElement('td');
        td.setAttribute('class', '');

        var inp = document.createElement('input');
        inp.setAttribute('class', 'tab_inp');
        if (type == 'last_time'){
          if (typeof text.time == 'undefined'){
            td.innerHTML = '';
          } else {
            td.innerHTML = text.mi;
            td.setAttribute('title', get_full_time(text.time));
          }
        } else if (type == 'file'){

          td.setAttribute('class', 'td_upload');
          var ico_down = document.createElement('i');


          inp.setAttribute('onchange', 'update_file(this, \'' + line + '\', \''+ ord +'\')');
          inp.setAttribute('type', 'file');

          if (text == ''){
            ico_down.style.color = '#ffff48db';
            ico_down.setAttribute('class', 'fas fa-file-upload');
            ico_down.setAttribute('onclick', 'click_upload(this)');
          } else {
            ico_down.style.color = 'mediumseagreen';
            ico_down.setAttribute('class', 'fas fa-file-upload file-bot');
          }

          td.append(ico_down, inp);

        } else if (type == 'date'){
          inp.setAttribute('type', 'date');
          inp.setAttribute('onchange', 'val_update(this, \'' + line + '\', \''+ ord +'\')');
          inp.value = text;
          td.append(inp);
        } else if (type == 'time'){
          inp.setAttribute('type', 'time');
          inp.setAttribute('onchange', 'val_update(this, \'' + line + '\', \''+ ord +'\')');
          inp.value = text;
          td.append(inp);
        }
        else { // td רגילים
          inp.setAttribute('onchange', 'val_update(this, \'' + line + '\', \''+ ord +'\')');
          inp.value = text;
          td.append(inp);
        }
        tr_line.append(td);
      });
      var td0 = document.createElement('td');
      td0.setAttribute('class', 'del_tr');
      var but_del = document.createElement('button');
      but_del.setAttribute('class', 'btn btn-light');
      but_del.setAttribute('onclick', 'del_line(\''+line+'\');');
      but_del.innerHTML = 'X';
      td0.append(but_del);
      tr_line.append(td0);
      tab.append(tr_line);
    }
  });




// שורת צור שורה חדשה
  var tr_new = document.createElement('tr');
  var td = document.createElement('th');
  td.setAttribute('class', 'th_');

  var inp = document.createElement('input');
  inp.setAttribute('class', 'tab_inp');
  inp.setAttribute('onchange', 'add_line(this)');
  inp.setAttribute('placeholder', 'הוסף שורה');
  if (order.length == 0)
    inp.disabled = true;

  td.append(inp);
  tr_new.append(td);
  tab.append(tr_new);


//


  con.append(tab);


  // קונטנייר תחתון

  var con0 = document.createElement('div');
  con0.setAttribute('class', 'contenier_tab con_add_tab');

  var inp1 = document.createElement('input');
  inp1.setAttribute('class', 'inp inp_add_tab');
  inp1.setAttribute('placeholder', 'שם עמודה');

  var sel = document.createElement('select');
  sel.setAttribute('class', 'inp inp_add_tab');
  sel.innerHTML =
  '<option disabled>סוג עמודה</option>' +
  '<option value="normal" selected>רגילה</option>' +
  '<option value="file">קבצים</option>' +
  '<option value="mobile">נייד</option>' +
  '<option value="email">מאייל</option>' +
  '<option value="time">שעה</option>' +
  '<option value="date">תאריך</option>' +
  '<option value="last_time">שינוי אחרון</option>';
  if (typeof old_obj.coteret != 'undefined'){
    var types = Object.keys(old_obj.coteret);
    types.forEach(function(type){
      if (old_obj.coteret[type] == 'last_time'){
        sel.innerHTML =
        '<option disabled>סוג עמודה</option>' +
        '<option value="normal" selected>רגילה</option>' +
        '<option value="file">קבצים</option>' +
        '<option value="mobile">נייד</option>' +
        '<option value="email">מאייל</option>' +
        '<option value="time">שעה</option>' +
        '<option value="date">תאריך</option>' +
        '<option value="last_time" disabled>שינוי אחרון</option>';
      }
    });
  }

  var but = document.createElement('button');
  but.setAttribute('class', 'btn btn-primary');
  but.setAttribute('onclick', 'add_tur(this)');
  but.innerHTML = 'הוסף';


  con0.append(inp1, sel, but);

  // var con1 = document.createElement('div');
  // con1.setAttribute('style', 'margin-top: 20px;');
  // con1.innerHTML =
  // '<h4>מקרא</h4>' +
  // '<p class="p_mikra">' +
  // '<font>מחיקה של קובץ:</font> לחיצה ארוכה על האייקון' +
  // '</p>';
  //
  // con0.append(con1);
// סיום קונטנייר תחתון

  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(con, con0);

}

////////






// הוסף עמודה
function add_tur(zis){
  console.log(old_obj);
  set_orange();
  var name_tur = $(zis.parentElement).find('input')[0].value;
  var type_tur = $(zis.parentElement).find('select')[0].value;
  if (name_tur == ''){

  } else {
    var data = {
      name: name_tur,
      type: type_tur,
      arr_loc: arr_loc
    };


    if ('coteret' in old_obj) {

    } else {
      old_obj.coteret = {};
    }


    if (old_obj.new.includes(data.name)){
      data.name = data.name.slice(0, -1);
    }

    var keys = Object.keys(old_obj);

    keys.forEach(function(key){
      if (key != 'type'){
        if (key == 'new'){
          old_obj[key].push(data.name);
        }
        else if (key == 'coteret'){
          old_obj.coteret[data.name] = data.type;
        }
        else{
          old_obj[key][data.name] = '';
        }
      } else;
    });

    its_table_edit();

  }
}

// הוסף שורה חדשה
function add_line(zis){
  set_orange();
  var data = {
    new_val: zis.value,
    arr_loc: arr_loc
  };

  var cotarot = old_obj.new;

  var line = Object.keys(old_obj);  //השורות הקיימות
  var new_num = line;  // שם לשורה החדשה

  var arr_nums = [];
  new_num.forEach(function(le){
    if (isNaN(le) == false){
      arr_nums.push(Number(le));
    }
  });

  var num0 = arr_nums[arr_nums.length-1];
  arr_nums.forEach(function(num){
    if (num > num0){
      num0 = num;
    }
  });
  num0++;
  if (arr_nums.length == 0){
    num0 = 1;
  }
  var obj00 = {};
  for (i=0; i<cotarot.length; i++){
    if (i == 0){
      obj00[cotarot[i]] = data.new_val;
    } else {
      obj00[cotarot[i]] = '';
    }
  }
  old_obj[num0] = obj00;


  its_table_edit();
}
//


// שינוי ערכים בשורות
function val_update(zis, line, coteret, bol){
  set_orange();
  var user_name = $('#user_name').val();
  var data = {
    new_name: zis.value,
    arr_loc: arr_loc,
    line: line,
    coteret: coteret
  };

  var types = Object.keys(old_obj.new);
  types.forEach(function(type){
    if (old_obj.new[type] == 'שינוי אחרון'){
      old_obj[data.line]['שינוי אחרון'] = {time: new Date(), mi: user_name};
    }
  });

  old_obj[data.line][data.coteret] = data.new_name;

  if (bol == true){
    its_table_edit();
  }

}
//



// מחק סופית את השורה
function del_line(line){
  set_orange();
  var data = {
    line: line,
    arr_loc: arr_loc
  };

  delete old_obj[data.line];

  its_table_edit();
}
//



// שינוי ערכים בכותרת
function val_update_cot(zis, line, cot){
  set_orange();
  var new_array;
  var index;
  var lines;
  data = {
    new_name: zis.value,
    arr_loc: arr_loc,
    line: line,
    coteret: cot
  };
  if (zis.value == ''){
    lines = Object.keys(old_obj);
    lines.forEach(function(line){
      delete old_obj[line][data.coteret];
    });

    // שינוי ערך ברשימה של הסדר
    new_array = old_obj.new;
    index = new_array.indexOf(data.coteret);
    if (index !== -1) {
      new_array.splice(index, 1);
    }
    old_obj.new = new_array;

  } else {
    lines = Object.keys(old_obj);

    lines.forEach(function(line){
      var val;
      if (line != 'type' && line != 'new'){
        if (line == 'coteret'){
          val = old_obj[line][data.coteret];
        }
        else {
          val = old_obj[line][data.coteret];
        }
        delete old_obj[line][data.coteret];
        old_obj[line][data.new_name] = val;
      }
    });

    // שינוי ערך ברשימה של הסדר
    new_array = old_obj.new;
    index = new_array.indexOf(data.coteret);
    if (index !== -1) {
        new_array[index] = data.new_name;
    }
    old_obj.new = new_array;
  }
  its_table_edit();
}
//





// td לחיצה על קובץ
function click_upload(zis){
  zis = zis.parentElement;
  var input = zis.getElementsByTagName('input')[0];
  input.click();
}

// העלת קובץ לשרת
function update_file(zis, line, ord){
  set_orange();
  // עדכון של קובץ קיים
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

        var data = {
          new_name: response.file_name,
          arr_loc: arr_loc,
          line: line,
          coteret: ord
        };
        var inp = document.createElement('input');
        inp.value = response.file_name;
        val_update(inp, line, ord, true);
      }
    });
  } else {
    val_update(zis, line, ord, true);
  }
}














///////////////// מצב קריאה ///////////////

function its_table_read(){
  var plan = arr_loc[arr_loc.length-1];

  // השורות שקיימות
    var lines = Object.keys(old_obj);

    var cotarot = old_obj.coteret;

  // הסדר שזה צריך לקרות
    var order = old_obj.new;

  // הגדרות כלליות
  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab');

  var h4 = document.createElement('h4');
  h4.innerHTML = plan;
  h4.setAttribute('style', 'margin-bottom: 10px;');
  con.append(h4);


  var tab = document.createElement('table');
  tab.setAttribute('class', 'tab_plan');

  // שורת הכותרות
  var tr0 = document.createElement('tr');

  order.forEach(function(ord){
    var th = document.createElement('th');
    th.setAttribute('class', 'th_');
    th.innerHTML = ord;
    tr0.append(th);
  });
  tab.append(tr0);



// יצירת כל השורות
  lines.forEach(function(line){
    var tr_line = document.createElement('tr');
    if (line != 'type' && line != 'coteret' && line != 'new'){
      order.forEach(function(ord){
        var type = cotarot[ord];
        var text = old_obj[line][ord];

        var td = document.createElement('td');
        td.setAttribute('class', '');

        if (type == 'last_time'){

          if (typeof text.time == 'undefined'){
            td.innerHTML = '';
          } else {
            td.innerHTML = text.mi;
            td.setAttribute('title', get_full_time(text.time));
          }
        } else if (type == 'file'){
          td.setAttribute('class', 'td_upload');
          if (text != ''){
            td.innerHTML = '<a href="/uploads/'+text+'" download><i class="fas fa-file-download ico_tab_down"></i></a>';
          } else {
            td.innerHTML = '';
          }
        } else if (type == 'mobile'){
          if (text != ''){
            td.innerHTML = '<a href="tel:'+text+'">'+text+'</a>' +
            '<a href="https://wa.me/972'+text+'"><i class="fab fa-whatsapp tab_what"></i></a>';
          } else {
            td.innerHTML = '';
          }

        } else if (type == 'email'){
          td.innerHTML = '<a href="mailto:'+text+'">'+text+'</a>';
        } else if (type == 'date'){
          td.innerHTML = get_date(text);
        } else { // td רגילים
          td.innerHTML = text;
        }

        tr_line.append(td);
      });
      tab.append(tr_line);
    }
  });








  // סיום
  con.append(tab);
  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(con);

}






function get_full_time(time){
  if (time != ''){
    var time0 = new Date(time);
    var minu = time0.getMinutes();
    if (minu.toString().length == 1){
      minu = '0' + minu;
    }
    var time1 = time0.getHours() + ':' + minu;
    var date = time0.getDate() + '/' + (time0.getMonth()+1) + '/' + time0.getFullYear();

    return date + ' ' + time1;
  }
}
