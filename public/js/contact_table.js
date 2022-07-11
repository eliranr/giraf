var myArray2 = [];
var myArray2_read = [];
var list_saved = [];

function list_saves(){
  var pro1 = pro0;
  for(var i=1; i<arr_loc.length; i++){
    pro1 = pro1[arr_loc[i]];
  }
  list_saved = pro1.list_contact;
}

// התנעה ראשונה של טבלת אנשי קשר - מצב עריכה
function contact_tab_edit(){
  list_saves();
  load_contact();
  var con0 = document.createElement('div');
  con0.setAttribute('class', 'contenier_tab cablan_top');

  var main_inp = document.createElement('input');
  main_inp.setAttribute('autocomplete' , 'off');
  main_inp.setAttribute('class' , 'inp');
  main_inp.setAttribute('id', 'search_contacts');
  main_inp.setAttribute('placeholder', 'חיפוש');

  var sel = document.createElement('select');
  sel.setAttribute('class', 'inp inp_add_tab');
  sel.setAttribute('id', 'search_sub_con');

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

  con0.append(main_inp, sel);


  var create_tab = document.createElement('table');
  create_tab.setAttribute('class', 'tab_cablan');
  create_tab.setAttribute('id', 'create_tab');
  create_tab.innerHTML =
  '<tr style="background-color: #dddddd; height: 53px;">' +
    '<th></th>' +
    '<th>שם מלא</th>' +
    '<th>מקצוע</th>' +
    '<th>נייד</th>' +
    '<th>מאייל</th>' +
    '<th>ח.פ</th>' +
    '<th class="td_rate">דירוג</th>' +
  '</tr>' +
  '<tbody id="myTable">' +
  '</tbody>';

  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab con_contacts');

  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  con.append(create_tab);
  bod.append(con0, con);

  buildTable2(myArray);
}



// עדכון שינויים בלקוחות הנבחרים
function update_contact(zis, id){
  if (zis.checked == true){
    list_saved.push(id);
  } else {
    list_saved.splice(list_saved.indexOf(id), 1);
  }


  var data = {
    arr_loc: arr_loc,
    list: list_saved
  };

  $.ajax({
    url: '/update_contact_fold',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function(response) {

    }
  });

}




// חיפוש בתוך הרשימה
$(document).on("keyup", "#search_contacts", function() {
  var value = $(this).val();
  var new_data = searchBox(value);
  buildTable2(new_data);
  var sel = document.getElementById('search_sub_con');
  sel.selectedIndex = 0;
});

$(document).on("change", "#search_sub_con", function() {
  var value = $(this).val();
  var new_data = searchBox2(value);
  buildTable2(new_data);

  var inp = document.getElementById('search_contacts');
  inp.value = '';
});
//


// פילטור לפי טקסט
function searchBox(value){
  data = myArray;
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
// לפי נושא
function searchBox2(value){
  data = myArray;
  var filterData = [];
  for (var i=0; i < data.length; i++){
    value = value;
    var name = data[i].profession;
    if (name.includes(value)){
      filterData.push(data[i]);
    }
  }
  return filterData;
}
/////


// בנייה מחדש של הטבלה
function buildTable2(data){

  var table = document.getElementById('myTable');
  table.innerHTML = '';
  for (var i = 0; i < data.length; i++){
    var row = document.createElement('tr');
      row.setAttribute('onclick', 'tr_clicked(this, event)');
      row.setAttribute('class', 'tr_row');

      if (list_saved.includes(data[i].id)){
        row.innerHTML =
          '<td><input type="checkbox" onchange="update_contact(this, \''+data[i].id+'\')" checked></td>'+
          '<td>'+data[i].full_name+'</td>'+
          '<td>'+data[i].profession+'</td>'+
          '<td>' + data[i].mobile + '</td>'+
          '<td>'+data[i].email+'</td>'+
          '<td>'+data[i].company_num+'</td>';
      } else {
        row.innerHTML =
          '<td><input type="checkbox" onchange="update_contact(this, \''+data[i].id+'\')"></td>'+
          '<td>'+data[i].full_name+'</td>'+
          '<td>'+data[i].profession+'</td>'+
          '<td>' + data[i].mobile + '</td>'+
          '<td>'+data[i].email+'</td>'+
          '<td>'+data[i].company_num+'</td>';
      }

      var td = document.createElement('td');
      td.innerHTML = inner_stars(data[i].rate).innerHTML;
      row.append(td);

      table.append(row);
  }
}
//

// לחיצה על שורה בתוך הטבלה
function tr_clicked(zis, e){
  if (e.target.tagName == 'INPUT'){
  } else {
    var inp = zis.getElementsByTagName('input')[0];
    if (inp.checked == true){
      inp.checked = false;
    } else {
      inp.checked = true;
    }
    var event = new Event('change');
    inp.dispatchEvent(event);
  }
}














// תצוגת מסך קריאה
function contact_tab_read(){
  list_saves();
  update_myArr();


  var con0 = document.createElement('div');
  con0.setAttribute('class', 'contenier_tab cablan_top');

  var main_inp = document.createElement('input');
  main_inp.setAttribute('autocomplete' , 'off');
  main_inp.setAttribute('class' , 'inp');
  main_inp.setAttribute('id', 'search_contacts_read');
  main_inp.setAttribute('placeholder', 'חיפוש');

  var sel = document.createElement('select');
  sel.setAttribute('class', 'inp inp_add_tab');
  sel.setAttribute('id', 'search_sub_con_read');

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

  con0.append(main_inp, sel);





  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab con_contacts');
  con.setAttribute('id', 'con_tab_contacts');

  var create_tab = document.createElement('table');
  create_tab.setAttribute('class', 'tab_cablan');
  create_tab.setAttribute('id', 'create_tab');
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
  con.append(create_tab);
  bod.append(con0, con);

  buildTable_read(update_myArr());
}
//

// סינון לפי מה שרק צריך
function update_myArr(){
  data = myArray;
  var filterData = [];

  for (var i=0; i < data.length; i++){
    var id = data[i].id;
    if (list_saved.includes(id)){
      filterData.push(data[i]);
    }
  }
  myArray2_read = filterData;

  return filterData;
}
//
// סינוון לפי הקלדה
function searchBox01(value){
  data = myArray2_read;
  var filterData = [];

  for (var i=0; i < data.length; i++){
    var name = data[i].full_name;
    if (name.includes(value)){
      filterData.push(data[i]);
    }
  }
  return filterData;
}
// סינון לפי נושא
function searchBox02(value){
  data = myArray2_read;
  var filterData = [];

  for (var i=0; i < data.length; i++){
    var name = data[i].profession;
    if (name.includes(value)){
      filterData.push(data[i]);
    }
  }
  return filterData;
}

// בניית טבלה במצב קריאה
function buildTable_read(data){
  var table = document.getElementById('myTable');
  if (data.length != 0){
    table.innerHTML = '';
    for (var i = 0; i < data.length; i++){
      var row = document.createElement('tr');
        row.setAttribute('onclick', 'tr_clicked_read(\''+data[i].id+'\')');
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
  } else {
    table.innerHTML = '';
    var h4 = document.createElement('h4');
    h4.innerHTML = 'לא נמצאו אנשי קשר';
    table.append(h4);
  }

}
//


function tr_clicked_read(id){
  var cab_sel = {};

  myArray.forEach(function(arr){
    if (id == arr.id){
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
  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(con0);

  var left_ar = document.getElementById('left_ar');
  left_ar.innerHTML = '<i class="far fa-arrow-alt-circle-right arr" onclick="start();"></i>';
}



// חיפוש בתוך הרשימה
$(document).on("keyup", "#search_contacts_read", function() {
  var value = $(this).val();
  var new_data = searchBox01(value);
  buildTable_read(new_data);
  var sel = document.getElementById('search_sub_con_read');
  sel.selectedIndex = 0;
});

$(document).on("change", "#search_sub_con_read", function() {
  var value = $(this).val();
  var new_data = searchBox02(value);
  buildTable_read(new_data);

  var inp = document.getElementById('search_contacts_read');
  inp.value = '';
});
//
