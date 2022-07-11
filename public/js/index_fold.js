var old_obj = {};

function start_fold(){
    old_obj = pro0;
    for(var i=1; i<arr_loc.length; i++){
      old_obj = old_obj[arr_loc[i]];
    }

    if (old_obj.type == 'folder'){
      its_folder();
    } else if (old_obj.type == 'table'){
      if (edit_mode === true){
        its_table_edit();
      } else {
        its_table_read();
      }
    } else if (old_obj.type == 'table_beton'){
      if (edit_mode === true){
        table_beton_edit();
      } else {
        table_beton_read();
      }
    } else if (old_obj.type == 'contact_tab'){
      if (edit_mode === true){
        contact_tab_edit();
      } else {
        contact_tab_read();
      }
    } else if (old_obj.type == 'table_plan'){
      if (edit_mode === true){
        table_plan_edit();
      } else {
        table_plan_read();
      }
    } else if (old_obj.type == 'fold_rfi'){
      if (edit_mode === true){
        rfi_edit();
      } else {
        rfi_read();
      }
    } else if (old_obj.type == 'win_file'){
      if (edit_mode === true){
        win_file_edit();
      } else {
        win_file_read();
      }
    }
}



function its_folder(){
  var old_obj = pro0;
  for(var i=1; i<arr_loc.length; i++){
    old_obj = old_obj[arr_loc[i]];
  }
  var list_file = Object.keys(old_obj);
  list_file.sort();
  var bod = document.getElementById('bod');
  var div_all = document.createElement('div');

  list_file.forEach(function(fold){
    var ico;
    if (fold != 'type'){
      if (old_obj[fold].type == 'folder'){
        ico = '<i class="gene-icon fas fa-folder-open"></i>';
      } else if (old_obj[fold].type == 'table'){
        ico = '<i class="gene-icon fas fa-file-excel"></i>';
      } else if (old_obj[fold].type == 'table_beton') {
        ico = '<i class="gene-icon fas fa-pencil-ruler"></i>';
      } else if (old_obj[fold].type == 'contact_tab') {
        ico = '<i class="gene-icon fas fa-address-book"></i>';
      } else if (old_obj[fold].type == 'table_plan') {
        ico = '<i class="gene-icon fab fa-connectdevelop"></i>';
      }  else if (old_obj[fold].type == 'fold_rfi') {
        ico = '<i class="gene-icon fab fa-buffer"></i>';
      } else if (old_obj[fold].type == 'win_file') {
        ico = '<i class="gene-icon fas fa-file-pdf"></i>';
      }


      // אם זה טבלת בטון אז כמה בטון סך הכל יש
      var total_beton = 0;
      if (old_obj[fold].type == 'table_beton'){
        for (var i=0; i<old_obj[fold].tables.length; i++){
          for (var p=0; p<old_obj[fold].tables[i].length; p++){
            total_beton += Number(old_obj[fold].tables[i][p]['כמות בקוב']);
          }
        }
      }
      //



      var new_div2 = document.createElement('div');
      new_div2.setAttribute('class', 'back_cate_box');

      var pro_box = document.createElement('div');
      pro_box.setAttribute('class', 'pro_box cate_box');
      pro_box.setAttribute('onclick', 'arr_loc.push(\''+fold+'\'); start();');
      pro_box.setAttribute('onmouseover', 'por_box_hov0(this)');
      pro_box.setAttribute('onmouseout', 'por_box_hov02(this)');
      pro_box.setAttribute('onmousedown', 'por_box_hov03(this);');
      pro_box.setAttribute('onmouseup', 'por_box_hov04(this)');

      if (old_obj[fold].type == 'table_beton'){
        pro_box.innerHTML = ico + '<h5 style="display: inline">' + fold + '</h5><font class="total_beton_fold">[' + total_beton + ']</font>';
      } else {
        pro_box.innerHTML = ico + '<h5>' + fold + '</h5>';
      }

      if (edit_mode === true){
        // במקרה של מצב עריכה
        pro_box.setAttribute('draggable', 'true');
        pro_box.setAttribute('ondragstart', 'startDrag(this)');
        pro_box.setAttribute('ondragend', 'stopDrag(this)');

        pro_box.setAttribute('ondrop', 'dropHere(this)');
        pro_box.setAttribute('ondragover', 'allowDrop(event)');

        var icon = document.createElement('i');
        icon.setAttribute('class', 'far fa-edit fa-edit2');
        icon.setAttribute('onclick', 'edit_cate_box(this)');
        new_div2.append(icon);
      }


      new_div2.append(pro_box);
      div_all.append(new_div2);


    }
  });


  if (edit_mode === true){
    // במקרה של עריכה
    (function(){
      var new_div2 = document.createElement('div');
      new_div2.setAttribute('class', 'back_cate_box');

      var pro_box = document.createElement('div');
      pro_box.setAttribute('class', 'pro_box cate_box');
      pro_box.setAttribute('id', 'catt');
      pro_box.setAttribute('onclick', 'create_fold(this)');
      pro_box.setAttribute('onmouseover', 'por_box_hov0(this)');
      pro_box.setAttribute('onmouseout', 'por_box_hov02(this)');
      pro_box.setAttribute('onmousedown', 'por_box_hov03(this)');
      pro_box.setAttribute('onmouseup', 'por_box_hov04(this)');

      if (arr_loc.length > 2){
        pro_box.setAttribute('ondrop', 'dropHere(this)');
        pro_box.setAttribute('ondragover', 'allowDrop(event)');
      }

      pro_box.innerHTML =
        '<i class="gene-icon fas fa-plus-circle"></i>' +
        '<h5>קובץ חדש</h5>';
      new_div2.append(pro_box);
      div_all.append(new_div2);
    })();
  }

  bod.innerHTML = '';
  if (edit_mode === false) {
   if ((list_file.length-1) == 0){
     var no_fold = document.createElement('h4');
     no_fold.innerHTML = 'אין מסמכים להצגה';
     no_fold.setAttribute('style', 'margin-right: 10px');
     bod.append(no_fold);
   }
 }

  bod.append(div_all);
}








// בחר פרטים על מנת להוסיף קובץ חדש
function create_fold(zis){
  zis.setAttribute('onclick' , '');
  zis.setAttribute('onmouseover' , '');
  zis.setAttribute('onmouseout' , '');
  zis.setAttribute('onmousedown' , '');
  zis.setAttribute('onmouseup' , '');
  zis.setAttribute('style' , 'padding-top: 0;');

  var new_div = document.createElement('div');
  new_div.setAttribute('class', 'lite_box lite_box_add');

  new_div.innerHTML =
  "<input class='inp inp_lite' type='text' id='name_2_add' placeholder='שם קובץ' autocomplete='off'>" +
  '<select class="inp inp_lite" id="type_2_add" name="cars">'+
    '<option value="folder">תיקייה</option>'+
    '<option value="table">טבלה ריקה</option>'+
    '<option value="table_plan">טבלת תוכניות</option>'+
    '<option value="table_beton">טבלת בטון</option>'+
    '<option value="contact_tab">אנשי קשר</option>'+
    '<option value="fold_rfi">קובץ RFI</option>'+
    '<option value="win_file">קובץ Desktop</option>'+
  '</select>' +
  '<button type="button" name="button" onclick="add_fold()" class="btn btn-outline-primary">אישור</button>';
  zis.innerHTML = '';
  zis.append(new_div);
}
// שמור את הקובץ החדש
function add_fold(){
  var data = {
  name: $('#name_2_add').val(),
  type: $('#type_2_add').val(),
  arr_loc: arr_loc
};
$.ajax({
  url: '/add_fold',
  method: 'POST',
  contentType: "application/json; charset=utf-8",
  data: JSON.stringify(data),
  success: function(response) {
    if (response == true){
      set_pro0();
    } else {
      alert('שגיאה בנתונים');
    }
  }
});
}






// לחיצה על כפתור עריכה של קובץ
function edit_cate_box(zis, category, num){
  var x = zis.parentElement;
  zis.remove();
  zis = x.getElementsByClassName('pro_box')[0];
  var h4 = zis.getElementsByTagName('h5')[0].innerHTML;
  zis.setAttribute('onclick' , '');
  zis.setAttribute('onmouseover' , '');
  zis.setAttribute('onmouseout' , '');
  zis.setAttribute('onmousedown' , '');
  zis.setAttribute('onmouseup' , '');
  zis.setAttribute('style' , 'padding-top: 0;');

  var user_name = $('#user_name').val();
  var text =  "<h4>" + user_name + " היקר!</h4>" +
  "<p>שים לב,<br> הינך צעד אחד לפני מחיקת הקובץ - "+ h4 +"</p>";



  var new_div = document.createElement('div');
  new_div.setAttribute('class', 'lite_box');

  new_div.innerHTML =
  "<input class='inp inp_lite' type='text' id='name_2_add' placeholder='שם קובץ' value='"+h4+"' autocomplete='off'>" +
  '<button type="button" name="button" onclick="pop_win(\''+text+'\', \'remove_cate\', \''+h4+'\')" class="btn btn-outline-danger but_del_cate">מחק</button>' +
  '<button type="button" name="button" onclick="update_fold(this, \''+h4+'\')" class="btn btn btn-outline-primary">אישור</button>';
  zis.innerHTML = '';

  zis.append(new_div);
}
//

// מחיקת fold
var remove_cate = function (h4){
  $.ajax({
    url: '/remove_category',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({arr_loc: arr_loc, fold: h4}),
    success: function(response) {
      if (response == true){
        set_pro0();
        close_pop();
      } else {
        alert('שגיאה בנתונים');
      }
    }
  });
};
//


// עדכון קטגוריה
function update_fold(zis, h4){
    var new_name = $(zis.parentElement).find('input')[0].value;
     var data = {
       arr_loc: arr_loc,
       old_name: h4,
       new_name: new_name,
     };
     if (new_name != '' && new_name != h4){
     $.ajax({
       url: '/update_fold',
       method: 'POST',
       contentType: "application/json; charset=utf-8",
       data: JSON.stringify(data),
       success: function(response) {
         if (response == true){
           set_pro0();
         } else {
           alert('שגיאה בנתונים');
         }
       }
     });
  } else {
    start();
  }
}
//
