


function win_file_edit(){

  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab con_tab_beton con_files');


  var inp = document.createElement('input');
  inp.setAttribute('type', 'file');
  inp.setAttribute('onchange', 'update_file2(this)');

  var ico_down = document.createElement('i');
  if (old_obj.file_name == ''){
    ico_down.style.color = '#ffff48db';
    ico_down.setAttribute('class', 'fas fa-file-upload');
    ico_down.setAttribute('onclick', 'click_upload(this)');
  } else {
    ico_down.style.color = 'mediumseagreen';
    ico_down.setAttribute('class', 'fas fa-file-upload file-bot');
  }

  var div = document.createElement('div');
  div.setAttribute('class', 'files_line')
  div.innerHTML = '<span>הועלה על ידי: </span>' + old_obj.last_up.mi + ' <span>בתאריך: </span>' + get_full_time(old_obj.last_up.time);


  // con.append(inp);
  con.append(ico_down, inp, div)
  var bod = document.getElementById('bod');
  bod.innerHTML = '';
  bod.append(con);


}


// העלת קובץ לשרת
function update_file2(zis, line, ord){
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
        };
        var inp = document.createElement('input');
        inp.value = response.file_name;
        val_update2(inp, true);
      }
    });
  } else {
    val_update2(zis, true);
  }
}
//


// שינוי ערכים בשורות
function val_update2(zis, bol){
  set_orange();
  var user_name = $('#user_name').val();
  var data = {
    new_name: zis.value,
    arr_loc: arr_loc,
  };

  old_obj.file_name = data.new_name;
  old_obj.last_up = {time: new Date(), mi: user_name};

  if (bol == true){
    win_file_edit();
  }

}
//














function win_file_read(){

  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab con_tab_beton con_files');
  var div = document.createElement('div');
  div.setAttribute('class', 'files_line')

  if (old_obj.file_name != '') {
    div.innerHTML = '<a href="/uploads/'+old_obj.file_name+'" download><i class="fas fa-file-download ico_tab_down"></i></a>' +
    '<span>הועלה על ידי: </span>' + old_obj.last_up.mi + ' <span>בתאריך: </span>' + get_full_time(old_obj.last_up.time);
    con.append(div);

    var item = old_obj.file_name.split(".");
    var file_type = item[item.length-1]

    var em = document.createElement('embed');
    if (file_type == 'pdf') {
      em.setAttribute('src', '/uploads/' + old_obj.file_name);
      em.setAttribute('width', '700px');
      em.setAttribute('height', '1050px');
      em.setAttribute('style', 'outline: none;');
    }
    var bod = document.getElementById('bod');
    bod.innerHTML = '';
    bod.append(con, em);
  } else {
    div.innerHTML = 'לא קיים קובץ'
    con.append(div);
    var bod = document.getElementById('bod');
    bod.innerHTML = '';
    bod.append(con);
  }
}
