
function start_page_pros(){
  var bod = document.getElementById('bod');
  var new_div = document.createElement('div');
  if (typeof pros != 'object'){
    setTimeout(function () {
      start_page_pros();
    }, 100);
  } else {
    if (pros.length > 0){
      pros.forEach(function(pro){
        var back_pro_box = document.createElement('div');
        back_pro_box.setAttribute('class', 'back_pro_box');
        var pro_box = document.createElement('div');
        pro_box.setAttribute('class', 'pro_box');
        pro_box.setAttribute('onclick', 'set_pro(\''+ pro._id +'\')');
        pro_box.setAttribute('onmouseover', 'por_box_hov0(this)');
        pro_box.setAttribute('onmouseout', 'por_box_hov02(this)');
        pro_box.setAttribute('onmousedown', 'por_box_hov03(this)');
        pro_box.setAttribute('onmouseup', 'por_box_hov04(this)');
        pro_box.innerHTML =
          '<i class="gene-icon ' + pro.icon+ '"></i>' +
          '<h4>' + pro.name_pro + '</h4>';
          if (edit_mode === true){
            //במקרה של מצב עריכה
            var icon = document.createElement('i');
            icon.setAttribute('class', 'far fa-edit fa-edit2');
            icon.setAttribute('onclick', 'edit_pro_box(this)');
            back_pro_box.append(icon);
          }
        back_pro_box.append(pro_box);
        new_div.append(back_pro_box);
      });
    }




    // במקרה של מצב עריכה
    if (edit_mode === true){
      (function(){
        var back_pro_box = document.createElement('div');
        back_pro_box.setAttribute('class', 'back_pro_box');
        var pro_box = document.createElement('div');
        pro_box.setAttribute('class', 'pro_box pro_box2');
        pro_box.setAttribute('onclick', 'create_pro(this)');
        pro_box.setAttribute('onmouseover', 'por_box_hov0(this)');
        pro_box.setAttribute('onmouseout', 'por_box_hov02(this)');
        pro_box.setAttribute('onmousedown', 'por_box_hov03(this)');
        pro_box.setAttribute('onmouseup', 'por_box_hov04(this)');
        pro_box.innerHTML =
          '<i class="gene-icon fab fa-accusoft"></i>' +
          '<h4>פרויקט חדש</h4>';
        back_pro_box.append(pro_box);
        new_div.append(back_pro_box);
      })();
    }

    bod.innerHTML = '';
    bod.innerHTML = new_div.innerHTML;
  }
}



// הכנס שם פרויקט חדש
function create_pro(zis){
  zis.setAttribute('onclick' , '');
  zis.setAttribute('onmouseover' , '');
  zis.setAttribute('onmouseout' , '');
  zis.setAttribute('onmousedown' , '');
  zis.setAttribute('onmouseup' , '');
  zis.setAttribute('style' , 'padding-top: 15px;');

  var new_div = document.createElement('div');
  new_div.setAttribute('class', 'lite_box');
  new_div.innerHTML =
  "<input class='inp inp_lite inp_lite_add' type='text' id='name_2_pro' placeholder='שם הפרויקט' autocomplete='off'>" +
  '<button type="button" name="button" onclick="new_pro()" class="btn btn-outline-primary">אישור</button>';
  zis.innerHTML = '';
  zis.append(new_div);
}
//
// הוספה של פרויקט חדש
function new_pro(){
  var name = $('#name_2_pro').val();
  if (name != ''){

    $.ajax({
      url: '/new_project',
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({name: name}),
      success: function(response) {
        if (response == true){
          updete_pro(true);
        } else {
          alert('הוזנו נתונים לא תקינים');
        }
      }
    });
  }
}
//





// עריכה שם של פרויקט
function edit_pro_box(zis){
  var x = zis.parentElement;
  zis.remove();
  zis = x.getElementsByClassName('pro_box')[0];
  var h4 = zis.getElementsByTagName('h4')[0].innerHTML;
  zis.setAttribute('onclick' , '');
  zis.setAttribute('onmouseover' , '');
  zis.setAttribute('onmouseout' , '');
  zis.setAttribute('onmousedown' , '');
  zis.setAttribute('onmouseup' , '');
  zis.setAttribute('style' , 'padding-top: 15px;');




  var new_div = document.createElement('div');
  new_div.setAttribute('class', 'lite_box lite_box2');
  new_div.innerHTML =
  // '<i class="add_cat_icon fas fa-edit"></i>' +
  "<input class='inp inp_lite' type='text' id='name_2_add' placeholder='שם הפרויקט' value='"+h4+"' style='margin: 40px 0 40px 0;' autocomplete='off'>" +
  '<button type="button" name="button" onclick="pop_win_del_pro(\''+h4+'\')" class="btn btn-outline-danger but_del_cate">מחק</button>' +
  '<button type="button" name="button" onclick="change_pro_name(this, \''+h4+'\')" class="btn btn btn-outline-primary">אישור</button>';
  zis.innerHTML = '';

  zis.append(new_div);
}
//


//// חלון קופץ במחיקת פרויקט
function pop_win_del_pro(str){


  var user_name = $('#user_name').val();
  var text =  "<h4>" + user_name + " היקר!</h4>" +
  "<p>שים לב,<br> הינך צעד אחד לפני מחיקת הפרויקט - "+ str +"</p>";

  var bod = document.getElementsByTagName("BODY")[0];
  var back = document.createElement('div');
  back.setAttribute('class', 'back_pop');

  var win = document.createElement('div');
  win.setAttribute('class', 'win_pop');
  win.innerHTML = '<button class="close" onclick="close_pop()">×</button>'+ text;

    var but_agree = document.createElement('button');
    but_agree.setAttribute('class', 'btn btn-danger btn-danger2');
    but_agree.setAttribute('onclick', 'remove_pro(\''+ str +'\')');
    but_agree.innerHTML = 'אישור';

    var but_del = document.createElement('button');
    but_del.setAttribute('class', 'btn btn-light btn-light2');
    but_del.setAttribute('onclick', 'close_pop()');
    but_del.innerHTML = 'ביטול';
  win.append(but_agree, but_del);

  back.append(win);
  bod.append(back);
}



// מחיקת פרויקט
function remove_pro(h4){
  $.ajax({
    url: '/remove_pro',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({name_pro: h4}),
    success: function(response) {
      if (response == true){
        updete_pro(true);
        close_pop();
      }
    }
  });
}
//

//שינוי שם של פרויקט
function change_pro_name(zis, h4){
  var new_name = $(zis.parentElement).find('input')[0].value;

  $.ajax({
    url: '/change_pro_name',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({old_name: h4, new_name: new_name}),
    success: function(response) {
      if (response === true){
        updete_pro(true);
      }
    }
  });
}
//
