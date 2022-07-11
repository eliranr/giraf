//jshint esversion:6
var myArray = [];
var cablan_selected = '';
var arr_opt = ["אגרונום", "אדריכל", "אלישר", "יועץ איטום", "יועץ אנסטלציה", "יועץ חשמל", "יועץ מיזוג אויר", "כללי", "ספק ברזל", "פיקוח", "ק. איטום", "ק. אינסטלציה", "ק. אלומיניום", "ק. גיזום", "ק. גינון", "ק. חשמל", "ק. מיזוג אויר", "ק. מסגרות", "ק. מסגרות חרש", "ק. מסננים", "ק. מעליות", "ק. נגרות", "ק. עבודות אבן", "ק. עבודות עפר", "ק. פיתוח", "ק. שלד + בלוק", "קונסטרוקטור"];


function start_cablanim(){
  var con0 = document.createElement('div');
  con0.setAttribute('class', 'contenier_tab cablan_top');

  var main_inp = document.createElement('input');
  main_inp.setAttribute('autocomplete' , 'off');
  main_inp.setAttribute('class' , 'inp');
  main_inp.setAttribute('id', 'search_input');
  main_inp.setAttribute('placeholder', 'חיפוש');

  var sel = document.createElement('select');
  sel.setAttribute('class', 'inp inp_add_tab');
  sel.setAttribute('id', 'search_sub');

  var opt0 = document.createElement('option');
  opt0.value = '';
  opt0.innerHTML = 'הכל';
  opt0.selected = true;
  sel.append(opt0);
  for (var i=0; i<arr_opt.length; i++){
    var opt = document.createElement('option');
    opt.value = arr_opt[i];
    opt.innerHTML = arr_opt[i];
    sel.append(opt);
  }

  var but_add = document.createElement('button');
  but_add.setAttribute('class', 'btn btn-primary');
  but_add.setAttribute('onclick', 'arr_loc.push(\'create_cablan\'); start();');
  but_add.innerHTML = 'הוסף';




  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab');

  var create_tab = document.createElement('table');
  create_tab.setAttribute('class', 'tab_cablan');
  create_tab.innerHTML =
  '<tr style="background-color: #dddddd; height: 53px;">' +
    '<th>שם מלא</th>' +
    '<th>מקצוע</th>' +
    '<th>נייד</th>' +
    '<th>מאייל</th>' +
    '<th>ח.פ</th>' +
    '<th class="td_rate">דירוג</th>' +
  '</tr>' +
  '<tbody id="myTable">' +
  '</tbody>';

  var bod = document.getElementById('bod');
  bod.innerHTML = '';

  con0.append(main_inp, sel, but_add);
  con.append(create_tab);

  bod.append(con0, con);

  buildTable(myArray);


  $('#search_input').on('keyup', function(){
    var value = $(this).val();
    console.log(value);
    var new_data = searchTable(value, myArray);
    buildTable(new_data);
    var sel = document.getElementById('search_sub');
    sel.selectedIndex = 0;

  });
  $('#search_sub').on('change', function(){
    var value = $(this).val();
    var new_data = searchTable2(value, myArray);
    buildTable(new_data);
    var inp = document.getElementById('search_input');
    inp.value = '';
  });

}



// בנייה מחדש של הטבלה
function buildTable(data){

  var loc_line = 'סה"כ ' + data.length;
  document.getElementById('loc').innerHTML = loc_line;
  var table = document.getElementById('myTable');
  table.innerHTML = '';
  for (var i = 0; i < data.length; i++){
    var row = document.createElement('tr');
      row.setAttribute('onclick', 'cablan_selected =\''+data[i].id+'\';arr_loc.push(\'show_cablan\'); start();');
      row.setAttribute('class', 'tr_row');
      row.innerHTML =
                  '<td>'+data[i].full_name+'</td>'+
                  '<td>'+data[i].profession+'</td>'+
                  '<td>' + data[i].mobile + '</td>'+
                  '<td>'+data[i].email+'</td>'+
                  '<td>'+data[i].company_num+'</td>';

      var td = document.createElement('td');
      td.innerHTML = inner_stars(data[i].rate).innerHTML;
      row.append(td);

      table.append(row);
  }
}
//

// פילטור לפי קטגוריה
function searchTable(value, data){
  var filterData = [];
  for (var i=0; i < data.length; i++){
    value = value;
    var name = data[i].full_name;
    if (name.includes(value)){
      filterData.push(data[i]);
    }
  }
  return filterData;
}
// פילטור לפי קטגוריה
function searchTable2(value, data){
  var filterData = [];
  for (var i=0; i < data.length; i++){
    value = value;
    var profession = data[i].profession;
    if (profession.includes(value)){
      filterData.push(data[i]);
    }
  }
  return filterData;
}


// פונקציה שמחזירה HTML של כמה כוכבים
function inner_stars(num){
  num = Number(num);
  var emp = 5 - num;

  var div0 = document.createElement('div');

  for (var i=1; i<=num; i++){
    var i0 = document.createElement('i');
    i0.setAttribute('class', 'star8 startfull8');
    i0.innerHTML = '★ ';
    div0.append(i0);
  }
  for (var w=1; w<=emp; w++){
    var w0 = document.createElement('i');
    w0.setAttribute('class', 'star8');
    w0.innerHTML = '★ ';
    div0.append(w0);
  }

  return div0;
}

// מחיזרה קלט של כמה כוכבים
function inner_stars0(num){
  num = Number(num);

  var div_rate = document.createElement('div');
  div_rate.setAttribute('class', 'rate');
  div_rate.innerHTML =
    '<input type="radio" id="star5" name="rate" value="5" class="inp_chan"/>'+
    '<label for="star5">5 stars</label>'+
    '<input type="radio" id="star4" name="rate" value="4" class="inp_chan"/>'+
    '<label for="star4" >4 stars</label>'+
    '<input type="radio" id="star3" name="rate" value="3" class="inp_chan"/>'+
    '<label for="star3">3 stars</label>'+
    '<input type="radio" id="star2" name="rate" value="2" class="inp_chan"/>'+
    '<label for="star2">2 stars</label>'+
    '<input type="radio" id="star1" name="rate" value="1" class="inp_chan"/>'+
    '<label for="star1">1 star</label>';

  var inputs = div_rate.getElementsByTagName('input');
  for (var i=0; i<inputs.length; i++){
    if (inputs[i].value == num){
      inputs[i].setAttribute('checked', 'checked');
    }
  }

  return div_rate;

}


// יצירת עמוד הוספת קבלן
function add_cablan(){
  var con00 = document.createElement('div');
  con00.setAttribute('class', 'cablan_all');

  var con0 = document.createElement('div');
  con0.setAttribute('class', 'contenier_tab add_cablan add_cablan0');

  var inp_arr = ['שם מלא', 'נייד', 'תחום'];
  var inp_arr_en = ['full_name', 'mobile', 'profession'];
  var t = 0;
  inp_arr.forEach(function(inps){
    if (inps != 'תחום'){
      var inp = document.createElement('input');
      inp.setAttribute('autocomplete' , 'off');
      inp.setAttribute('placeholder', inps);
      inp.setAttribute('class', 'inp');
      inp.setAttribute('name', inp_arr_en[t]);
      con0.append(inp);
    } else {
      var sel = document.createElement('select');
      sel.setAttribute('class', 'inp inp_add_tab');
      sel.setAttribute('name', inp_arr_en[t]);

      for (var i=0; i<arr_opt.length; i++){
        var opt = document.createElement('option');
        opt.value = arr_opt[i];
        opt.innerHTML = arr_opt[i];
        sel.append(opt);
      }

      con0.append(sel);
    }
    t++;
  });

  var div_rate = document.createElement('div');
  div_rate.setAttribute('class', 'rate rate2');
  div_rate.innerHTML =
    '<input type="radio" id="star5" name="rate" value="5" />'+
    '<label for="star5">5 stars</label>'+
    '<input type="radio" id="star4" name="rate" value="4" />'+
    '<label for="star4" >4 stars</label>'+
    '<input type="radio" id="star3" name="rate" value="3" />'+
    '<label for="star3">3 stars</label>'+
    '<input type="radio" id="star2" name="rate" value="2" />'+
    '<label for="star2">2 stars</label>'+
    '<input type="radio" id="star1" name="rate" value="1" />'+
    '<label for="star1">1 star</label>';

    con0.append(div_rate);


  var con1 = document.createElement('div');
  con1.setAttribute('class', 'contenier_tab add_cablan');

  var inp_arr1 = ['מייל', 'פקס', 'ח.פ'];
  var inp_arr_en1 = ['email', 'fax', 'company_num'];
  var z = 0;
  inp_arr1.forEach(function(inps){
    var inp = document.createElement('input');
    inp.setAttribute('autocomplete' , 'off');
    inp.setAttribute('placeholder', inps);
    inp.setAttribute('class', 'inp');
    inp.setAttribute('name', inp_arr_en1[z]);
    con1.append(inp);
    z++;
  });


  var text_area = document.createElement('textarea');
  text_area.setAttribute('placeholder', 'חוות דעת');

  var but_create = document.createElement('button');
  but_create.setAttribute('class', 'btn btn-primary');
  but_create.setAttribute('onclick', 'create_cablan()');
  but_create.innerHTML = 'הוסף קבלן';

  con1.append(text_area, but_create);





  var loc_line = 'הוסף קבלן חדש';
  document.getElementById('loc').innerHTML = loc_line;
  var left_ar = document.getElementById('left_ar');
  left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="arr_loc=[\'contacts\']; start();"></i>';


  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  con00.append(con0, con1);
  bod.append(con00);

}
//




// הוספה של קבלן למסד נתונים
function create_cablan(){
  var data = {};
  var cablan_all = document.getElementsByClassName('cablan_all')[0];
  var inputs = cablan_all.getElementsByTagName('input');
  for (var i=0; i<inputs.length; i++){
    if (inputs[i].name == 'rate'){
      if (inputs[i].checked == true){
        data.rate = inputs[i].value;
      }
    } else {
      data[inputs[i].name] = inputs[i].value;
    }
  }
  var sel = cablan_all.getElementsByTagName('select')[0];
  data.profession = sel.value;

  var textarea = cablan_all.getElementsByTagName('textarea')[0];
  data.opinion = textarea.value;

  if (data.full_name == '' || data.mobile == ''){
    // במקרה שחסרים נתונים
    alert('חסר מידע');
  } else {
    $.ajax({
      url: '/add_cablan',
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      success: function(response) {
        if (response == true){
          arr_loc.splice(-1,1);
          load_contact(true);
        } else {
          alert('יש שגיאה');
        }
      }
    });
  }
}


// צפייה בקבלן הנבחר
function show_cablan(){
  var cab_sel = {};

  myArray.forEach(function(arr){
    if (arr.id == cablan_selected){
      cab_sel = arr;
    }
  });

    var con0 = document.createElement('div');
    con0.setAttribute('class', 'contenier_tab profile_cablan');

    var arr = ['full_name', 'profession', 'mobile', 'email', 'fax', 'company_num'];
    var arr1 = ['שם מלא', 'תחום', 'פלאפון', 'מייל', 'פקס', 'ח.פ'];
    var tab_card = document.createElement('table');
    tab_card.setAttribute('class', 'tab_card');
    var div_stars = document.createElement('div');
    var div_opinion = document.createElement('div');

    if (edit_mode === true){
      // עריכת כרטיס קבלן
      for (var i=0; i<arr.length; i++){
        var tr1 = document.createElement('tr');
        tr1.innerHTML = '<td class="tab_fon">'+arr1[i]+': </td>';
        var inp = document.createElement('input');
        inp.setAttribute('class', 'inp inp_chan');
        if (arr[i] == 'profession'){
          inp = document.createElement('select');
          inp.setAttribute('class', 'inp inp_chan');
          inp.setAttribute('style', 'width: 100%;');
          for (var z=0; z<arr_opt.length; z++){
            var opt = document.createElement('option');
            opt.value = arr_opt[z];
            opt.innerHTML = arr_opt[z];
            if (cab_sel.profession == arr_opt[z]){
              opt.selected = 'selected';
            }
            inp.append(opt);
          }

        } else {
          inp.setAttribute('autocomplete', 'off');
          inp.value = cab_sel[arr[i]];
        }
        inp.setAttribute('name', arr[i]);
        var td_inp = document.createElement('td');
        td_inp.append(inp);
        tr1.append(td_inp);
        tab_card.append(tr1);
      }


      div_stars.setAttribute('class', 'div_stars rate');
      div_stars.innerHTML = inner_stars0(cab_sel.rate).innerHTML;


      div_opinion.setAttribute('class', 'div_opinion');
      div_opinion.innerHTML = '<font>חוות דעת: </font>' +
      '<textarea name="opinion" class="inp_chan" >'+cab_sel.opinion+'</textarea>';

      var del_but = document.createElement('button');
      del_but.setAttribute('class', 'btn btn-light del_but');
      del_but.setAttribute('onclick', 'remove_cablan_pop(\''+ cab_sel.id +'\', \''+ cab_sel.full_name +'\')');
      del_but.innerHTML = 'X';

      con0.append(tab_card, div_stars, div_opinion, del_but);

    } else {
      // קריאה של כרטיס קבלן
      for (var s=0; s<arr.length; s++){
        var tr = document.createElement('tr');
        if (arr1[s] == 'פלאפון'){
          tr.innerHTML = '<td class="tab_fon">'+arr1[s]+': </td>' +
          '<td>'+'<a href="tel:'+cab_sel[arr[s]]+'">'+cab_sel[arr[s]]+'</a>' +
          '<a href="https://wa.me/972'+cab_sel[arr[s]]+'"><i class="fab fa-whatsapp tab_what"></i></a>' + '</td>';
        } else if (arr1[s] == 'מייל'){
          tr.innerHTML = '<td class="tab_fon">'+arr1[s]+': </td> <td>'+'<a href="mailto:'+cab_sel[arr[s]]+'">'+cab_sel[arr[s]]+'</a>'+'</td>';
        } else {
          tr.innerHTML = '<td class="tab_fon">'+arr1[s]+': </td> <td>'+cab_sel[arr[s]]+'</td>';
        }

        tab_card.append(tr);
      }

      div_stars.setAttribute('class', 'div_stars');
      div_stars.innerHTML = inner_stars(cab_sel.rate).innerHTML;


      div_opinion.setAttribute('class', 'div_opinion');
      div_opinion.innerHTML = '<font>חוות דעת: </font>'+cab_sel.opinion;

      con0.append(tab_card, div_stars, div_opinion);
    }



  var loc_line = 'כרטיס קבלן';
  document.getElementById('loc').innerHTML = loc_line;
  var left_ar = document.getElementById('left_ar');
  left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="arr_loc=[\'contacts\']; start();"></i>';

  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(con0);
}





// עדכון שינויים במצב עריכה
$(document).on("change", ".inp_chan", function() {
  var data = {
    name: this.name,
    value: this.value,
    ids: cablan_selected
  };
  console.log(data);

  $.ajax({
    url: '/change_cablan',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function(response) {
      load_contact();
    }
  });

});
//








// מחיקת קבלן
function remove_cablan_pop(id, name){
  var bod = document.getElementsByTagName("BODY")[0];
  var back = document.createElement('div');
  back.setAttribute('class', 'back_pop');

  var win = document.createElement('div');
  win.setAttribute('class', 'win_pop');

  var user_name = $('#user_name').val();
  var text =  "<h4>" + user_name + " היקר!</h4>" +
  "<p>שים לב,<br> הינך צעד אחד לפני מחיקת איש הקשר - "+ name +"</p>";
  win.innerHTML = '<button class="close" onclick="close_pop()">×</button>'+ text;

    var but_agree = document.createElement('button');
    but_agree.setAttribute('class', 'btn btn-danger btn-danger2');
    but_agree.setAttribute('onclick', 'remove_cablan(\''+id+'\')');
    but_agree.innerHTML = 'אישור';

    var but_del = document.createElement('button');
    but_del.setAttribute('class', 'btn btn-light btn-light2');
    but_del.setAttribute('onclick', 'close_pop(); start();');
    but_del.innerHTML = 'ביטול';
  win.append(but_agree, but_del);

  back.append(win);
  bod.append(back);
}

function remove_cablan(id){
  $.ajax({
    url: '/remove_cablan',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({id: id}),
    success: function(response) {
      if (response == true){
        arr_loc.splice(-1,1);
        close_pop();
        load_contact(true);
      }
    }
  });
}
