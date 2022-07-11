var res;
var draged_fold;
var is_mes = false;
var bod = document.getElementById('bod');
var obj_pros;




function start_tableFactory(){

  $.ajax({
    url: '/get_folds',
    success: function(response) {
      res = response;
      obj_pros = response.obj_pros;

      var pros = response.pros;
      var con0 = document.createElement('div');
      con0.setAttribute('class', 'contenier_tab folds');
      con0.setAttribute('style', 'height: 80px; padding: 10px;');

      var sel = document.createElement('select');
      sel.setAttribute('class', 'inp inp_choose');
      sel.setAttribute('id', 'inp_choose');

      var opt0 = document.createElement('option');
      opt0.value = '0';
      opt0.innerHTML = 'כללי';
      opt0.selected = true;
      sel.append(opt0);
      for (var i=0; i<pros.length; i++){
        var opt = document.createElement('option');
        opt.value = pros[i];
        opt.innerHTML = pros[i];
        sel.append(opt);
      }
      con0.append(sel);

      var box = document.createElement('div');
      box.setAttribute('id', 'general_box');

      bod.innerHTML = '';
      bod.append(con0, box);
      var left_ar = document.getElementById('left_ar');
      left_ar.innerHTML = '';


      $('#inp_choose').on('change', async function() {
        loadingBox();
        var value = $(this).val();
        if (value == 0){
          generalFold();
        } else {
          // לעשות פונקציה שטוענת את הנתונים של הפרויקט הנכון
          proFold(value);
        }
      });
      $('#inp_choose').trigger('change');
    }
  });
}




function generalFold(){
  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab folds');
  con.setAttribute('id', 'box_fold');

  res.folds.forEach(function(fold){
    var fo = document.createElement('div');
    fo.setAttribute('class', 'fo');
    fo.innerHTML = fold.icon;
    var h5 = document.createElement('h6');
    h5.innerHTML = fold.name;
    fo.append(h5);
    con.append(fo);
  });

  var but_add = document.createElement('button');
  but_add.setAttribute('class', 'btn btn-primary');
  but_add.setAttribute('onclick', 'createFold()');
  but_add.innerHTML = 'צור תבנית חדשה';

  var general_box = document.getElementById('general_box');
  general_box.innerHTML = '';
  general_box.append(con, but_add);
}



function proFold(pro_name){

  var currect_pro;
  obj_pros.forEach((item, i) => {
    if (item.name_pro == pro_name){
      currect_pro = item;
    }
  });

  var con = document.createElement('div');
  con.setAttribute('class', 'contenier_tab folds folds2');
  con.setAttribute('ondrop', 'dropHere(this, \'' + pro_name + '\')');
  con.setAttribute('ondragover', 'allowDrop(event)');

  res.folds.forEach(function(fold){
    if (currect_pro.folds.includes(fold.name)){
      var fo = document.createElement('div');
      fo.setAttribute('class', 'fo');
      fo.setAttribute('id', fold.name);
      fo.setAttribute('draggable', 'true');
      fo.setAttribute('ondragstart', 'draged_fold = this');
      fo.innerHTML = fold.icon;
      var h5 = document.createElement('h6');
      h5.innerHTML = fold.name;
      fo.append(h5);
      con.append(fo);
    }
  });


  var con1 = document.createElement('div');
  con1.setAttribute('class', 'contenier_tab folds folds2');
  con1.setAttribute('style', 'float: left;');
  con1.setAttribute('ondrop', 'dropHere1(this, \'' + pro_name + '\')');
  con1.setAttribute('ondragover', 'allowDrop(event)');

  res.folds.forEach(function(fold){
    if (!currect_pro.folds.includes(fold.name)){
      var fo = document.createElement('div');
      fo.setAttribute('class', 'fo');
      fo.setAttribute('id', fold.name);
      fo.setAttribute('draggable', 'true');
      fo.setAttribute('ondragstart', 'draged_fold = this');
      fo.innerHTML = fold.icon;
      var h5 = document.createElement('h6');
      h5.innerHTML = fold.name;
      fo.append(h5);
      con1.append(fo);
    }
  });

  if (is_mes == true){
    pop_mes_del();
    is_mes = false;
  }

  var general_box = document.getElementById('general_box');
  general_box.innerHTML = '';
  general_box.append(con, con1);



}


function allowDrop(ev) {
  ev.preventDefault();
}

function dropHere(zis, pro_name){
  var data = {
    fold_name: draged_fold.id,
    pro_name: pro_name
  };
  obj_pros.forEach((item, i) => {
    if (item.name_pro == data.pro_name){
      if (!item.folds.includes(data.fold_name)) {
        item.folds.push(data.fold_name);
      }
    }
  });
  proFold($('#inp_choose').val());
  $.ajax({
    url: '/add_fold_pro',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function(response) {
      if (response == false){
        start_tableFactory();
        pop_mes_sec('שגיאה, שינויים לא נשמרו');
        is_mes = true;
      }
    }
  });
}

function dropHere1(zis, pro_name){
  var data = {
    fold_name: draged_fold.id,
    pro_name: pro_name
  };
  obj_pros.forEach((item, i) => {
    if (item.name_pro == data.pro_name){
      if (item.folds.includes(data.fold_name)) {
        var index = item.folds.indexOf(data.fold_name);
        item.folds.splice(index, 1);
      }
    }
  });
  proFold($('#inp_choose').val());
  $.ajax({
    url: '/rem_fold_pro',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function(response) {
      if (response === false){
        start_tableFactory();
        pop_mes_sec('שגיאה, שינויים לא נשמרו');
        is_mes = true;
      }
    }
  });
}






// אייקון טעינה
function loadingBox(){
  var bod = document.getElementById('general_box');
  bod.innerHTML = '';
  var div = document.createElement('div');
  div.setAttribute('class', 'div_load');

  var img = document.createElement('img');
  img.setAttribute('src', '/images/loading.gif');
  img.setAttribute('class', 'load_img');

  div.append(img);
  bod.append(div);
}
//
