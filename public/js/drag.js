var dragged = '';
var dragTo = '';

function startDrag(zis){
  var arrStr = zis.getAttribute('onclick');
  dragged = arrStr.split(/['']/)[1];

  drop_pre_box();
}

function dropHere(zis){
  var arrStr = zis.getAttribute('onclick');
  dragTo = arrStr.split(/['']/)[1];
  if (typeof dragTo == 'undefined'){
    dragTo = false;
  }
  actDrag();
}
function allowDrop(e){
  e.preventDefault();
}

function stopDrag(){
  if (dragTo === ''){
    start();
  }
}




function actDrag(){
  var data = {
    arr_loc: arr_loc,
    start: dragged,
    stop: dragTo
  };
  $.ajax({
    url: '/actDrag',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function(response) {
      if (response){
        dragged = '';
        dragTo = '';
        set_pro0();
      } else {
        start();
      }
    }
  });
}






function drop_pre_box(){
  if (arr_loc.length > 2){
    var cat = document.getElementById('catt');
    cat.innerHTML =
    '<i class="gene-icon fas fa-angle-double-right" style="color: rgb(33, 150, 243);"></i>' +
    '<h5>העבר אחורה</h5>';
  }
}
