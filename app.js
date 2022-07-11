//jshint esversion:8

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require("express-session");
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('bacon', 10);
const upload = require('express-fileupload');

const puppeteer = require('puppeteer');
const hbs = require('handlebars');
const path = require('path');
const fs = require('fs-extra');

const compile = async function(templateName, data){
  const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
  const html = await fs.readFile(filePath, 'utf-8');
  return hbs.compile(html)(data);
};


var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use(session({
  secret: "the cat",
  resave: false,
  saveUninitialized: false
}));

var User = require('./model.js').User;
var Pro = require('./model.js').Pro;
var System = require('./model.js').System;


var tab_plan = require('./obj.js').tab_plan;
var contact_tab = require('./obj.js').contact_tab;
var tab_beton = require('./obj.js').tab_beton;
var fold_rfi = require('./obj.js').fold_rfi;
var win_file = require('./obj.js').win_file;


///////////////////// function next /////////////////////

function isGod(req, res, next){
  if (req.user.management == 1){
    next();
  } else {
    res.redirect('/');
  }
}

// בדיקה אם לקוח מחובר
function log(req, res, next){
  if (typeof req.session.user_id == 'string'){
    if (req.url == '/home'){
      next();
    } else {
      res.redirect('/home');
    }
  } else {
    if (req.url == '/'){
      next();
    } else {
      res.redirect('/');
    }
  }
}
// פרויקט ספציפי
function pro_one_ex(req, res, next){
  Pro.findOne({_id: req.session.pro._id}, function(err, project){
    if (!err){
      req.project = project;
      next();
    } else {
      console.log("didnt found a pro");
      next();
    }
  });
}
// פרטים של הלקוח המחובר
function model(req, res, next){
  User.findOne({_id: req.session.user_id}, function(err, user){
    if (!err){
      req.user = user;
      next();
    } else {
      console.log("didnt found a user");
      next();
    }
  });
}
// כל הפרויקטים הקיימים
function pro_ex(req, res, next){
  Pro.find({}, function(err, projects){
    if (!err){
      req.projects = projects;
      next();
    } else {
      console.log("didnt found a pro");
      next();
    }
  });
}

// מצא פרויקט על פי שם
function proName(req, res, next){
  Pro.findOne({name_pro: req.body.pro_name}, function(err, pro){
    if(!err){
      req.pro = pro;
      next();
    } else {
      console.log('didnt found a project by name');
      next();
    }
  });
}


// מצא את טבלת קבצים
function file_tab(req, res, next){
  System.find({}, function(err, file){
    if (!err){
      req.file = file[0];
      next();
    } else {
      console.log("didnt found a file table");
      next();
    }
  });
}
// תמיד המתמש מנחם בגין מחובר
function login_on(req, res, next){
  req.session.user_id = '5eb90247ba3cd4284c0dd7ad';
  next();
}

app.use(upload());
app.use(login_on);


///////////////////// כללי /////////////////////

// עמוד התחברות
app.get('/', log, function (req, res) {

  res.render('login');
});


// ajax התחברות משתמש
app.post('/login_user', function (req, res) {
  User.findOne({mobile: req.body.mob}, function(err, user){
    if (!err){
      if (user != null){
        var pas = bcrypt.compareSync(req.body.pass, user.password);
        if (pas == true){
          req.session.user_id = user._id;
          User.updateOne({_id: user._id}, {edit_mode: false}, function(err){
            if (!err){
              res.send(true);
            } else res.send(err);
          });
        } else res.send(false);
      } else res.send(false);
    } else res.send(false);
  });
});

// עמוד ראשי לאחר התחברות
app.get('/home', log, model, function(req, res){
  User.updateOne({_id: req.user._id}, {last_login: new Date()}, function(err){
    if (!err){
        res.render('home', {user: req.user});
    } else res.send(err);
  });
});

// מערכת העלת קבצים
app.post('/upload', file_tab, function(req, res){
  var file = req.files.post_file;
  var random_ids = Math.random().toString(36).substr(2, 9);

  var list_ids = req.file.list_ids;
  if (list_ids.includes(random_ids) === true){
    while (list_ids.includes(random_ids) != false){
      random_ids = Math.random().toString(36).substr(2, 9);
    }
  }

  System.updateOne({_id: req.file._id}, { $push: {list_ids: random_ids} }, function(err){
    if (!err){
      var end_name = file.name.split(".")[1];
      file.mv(__dirname + '/public/uploads/'+random_ids+ '.' +end_name, function(err, result){
        if (err){
          res.send(err);
        } else {
          console.log('update success');
          res.send({file_name: random_ids+ '.' + end_name});
        }
      });
    } else res.send(err);
  });
});

// עדכון שינויים במסד
app.post('/master_update', pro_one_ex, function (req, res) {
  var arr_loc = req.body.arr_loc;
  var obj = req.body.new_obj;

  Pro.updateOne({_id: req.project._id}, {[get_str_loc(arr_loc)]: obj}, function(err){
    if (!err){
      res.send(true);
    } else res.send(false);
  });
});

// הזזה של קבצים בין תיקיות
app.post('/actDrag', pro_one_ex, function (req, res) {
  var arr_loc = req.body.arr_loc;
  var start = req.body.start;
  var stop = req.body.stop;

  var obj = req.project;
  var obj1 = req.project;

  for (var i=1; i<arr_loc.length; i++){
    obj = obj[(arr_loc[i])];
  }

  if (stop == false){
    for (var z=1; z<arr_loc.length-1; z++){
      obj1 = obj1[(arr_loc[z])];
    }

    if (typeof obj1[start] == 'undefined'){
      obj1[start] = obj[start];
    } else {
      obj1[start + '1'] = obj[start];
    }

    delete obj[start];

    arr_loc.pop();
    Pro.updateOne({_id: req.project._id}, {[get_str_loc(arr_loc)]: obj1}, function(err){
      if (!err){
        res.send(true);
      } else res.send(false);
    });
  }
  else if (obj[stop].type == 'folder' && start != stop){
    if (typeof obj[stop][start] == 'undefined'){
      obj[stop][start] = obj[start];
    } else {
      obj[stop][start + '1'] = obj[start];
    }

    delete obj[start];

    Pro.updateOne({_id: req.project._id}, {[get_str_loc(arr_loc)]: obj}, function(err){
      if (!err){
        res.send(true);
      } else res.send(false);
    });
  } else {
    res.send(false);
  }


});

///////////////////// \כללי /////////////////////

//////////////////// ניהול ממשק ////////////////

// עמוד ניהול
//צריך להפעיל בדיקה אם יש הרשאות
app.get('/admin', model, isGod, function(req, res){
  res.render('admin', {user: req.user});
});





app.get('/add_fold0', model, file_tab, function(req, res){
  var arr = [contact_tab, fold_rfi];
  System.updateOne({_id: req.file._id}, {folds: arr}, function(err){
    if (!err){
      res.send('work');
    } else {
      res.send('err');
    }
  });
});

app.get('/get_folds', file_tab, function(req, res){
  Pro.find({}, function(err, pro){
    if (!err){
      var arr = [];
      for(var i=0; i<pro.length; i++){
        arr.push(pro[i].name_pro);
      }

      var list_obj = [];
      pro.forEach((item, i) => {
        var obj = {};
        obj.name_pro = item.name_pro;
        obj.folds = item.folds;
        list_obj.push(obj)
      });

      res.send({folds: req.file.folds, pros: arr, obj_pros: list_obj});
    } else res.send(err);
  });
});

app.post('/get_pro', file_tab, function(req, res){
  Pro.findOne({name_pro: req.body.name}, function(err, pro){
    if (!err){
      res.send({pro: pro});
    } else res.send(err);
  });
});

// הוספה של פולד לפרויקט ספציפי

app.post('/add_fold_pro', proName, function(req, res){
  arr_fol = req.pro.folds;
  if (arr_fol.includes(req.body.fold_name)){
    res.send(true);
  } else {
    Pro.updateOne({name_pro: req.body.pro_name}, { $push: {folds: req.body.fold_name}}, function(err){
      if (!err){
        res.send(true);
      } else res.send(false);
    });
  }
});



// הסרה של פולד מפרויקט ספציפי
app.post('/rem_fold_pro', file_tab, proName, function(req, res){
  arr_fol = req.pro.folds;
  arr_fol = arr_fol.filter(e => e !== req.body.fold_name);
  if (req.pro.folds.length == arr_fol.length){
    res.send(true);
  } else {
    Pro.updateOne({name_pro: req.body.pro_name}, {folds: arr_fol}, function(err){
      if (!err){
        res.send(true);
      } else res.send(false);
    });
  }
});




//////////////////// /ניהול ממשק ////////////////

///////////////////// ניהול פרויקטים /////////////////////

// ajax קבל את כל הפרויקטים
app.get('/get_all_projects', function (req, res) {
  Pro.find({}, function(err, projects){
    if (!err){
      res.send({projects: projects});
    } else res.send(false);
  });
});

// ajax הגדר עוגייה לפרויקט הנצפה
app.post('/set_view_pro', function (req, res) {
  Pro.findOne({_id: req.body.pro_id}, function(err, project){
    if (!err){
      req.session.pro = project;
      res.send(true);
    } else res.send(false);
  });
});

// הוספה של פרויקט חדש ajax
app.post('/new_project', model, pro_ex, function (req, res) {
  var arr0 = ['אי התאמות', 'פיקוח', 'היתרים', 'בקרת איכות', 'הזמני ברזל', 'בטיחות', 'דואר יוצא', 'טופס 4', 'יומן עבודה'];
  var arr = ['אדריכלות', 'פיתוח חצרות', 'אגרונום', 'תכניות חשמל', 'מעליות', 'תנועה'];
  var icons = ['fab fa-audible', 'fab fa-atlassian', 'fab fa-canadian-maple-leaf', 'fas fa-candy-cane'];

  var ico;
  if (req.projects.length < icons.length){
    ico = icons[req.projects.length];
  } else {
    ico = icons[req.projects.length - icons.length];
  }

  var obj0 = {type: 'folder'};
  arr0.forEach(function(ar){  // קבצים בתיקייה הראשונה
    obj0[ar] = {type: 'folder'};
  });

  var obj = {type: 'folder'};
  arr.forEach(function(li){       // arr זה רשימה של בתוך תוכניות
    obj[li] = tab_plan;
  });

  obj0['תוכניות'] = obj;
  obj0['אנשי קשר'] = contact_tab;
  obj0['בקרת איכות'] = {
    "type" : "folder",
    "בטון" : {
        "type" : "folder",
        "קיר צפוני" : tab_beton,
        "קיר מערבי" : tab_beton
    }
  };
  obj0.RFI = fold_rfi;

  const newpro = new Pro({
    create_details: { name: req.user.full_name, id: req.user._id, date_create: new Date()},
    name_pro: req.body.name,
    folder_system: obj0,
    icon: ico
  });
  newpro.save(function(err){
    if (!err){
      console.log("Successfully save new project");
      res.send(true);
    } else {
      console.log('err save new project');
      res.send(false);
    }
  });
});


// ajax עדכן פרויקו pro0
app.post('/update_pro', function (req, res) {
  Pro.findOne({_id: req.body.pro_id}, function(err, project){
    if (!err){
      req.session.pro = project;
      res.send(project);
    } else res.send(false);
  });
});

// ajax מחיקת פרויקט
app.post('/remove_pro', function (req, res) {
  Pro.deleteMany({name_pro: req.body.name_pro}, function(err){
    if (!err){
      res.send(true);
    } else res.send(false);
  });
});

// ajax שינוי שם של פרויקט
app.post('/change_pro_name', function (req, res) {
  Pro.updateOne({name_pro: req.body.old_name}, {name_pro: req.body.new_name}, function(err){
    if (!err){
      res.send(true);
    } else res.send(false);
  });
});

///////////////////// \ניהול פרויקטים /////////////////////

///////////////////// FOLD /////////////////////

// ajax מחיקת קטגוריה
app.post('/remove_category', pro_one_ex, function (req, res) {
  var arr_loc = req.body.arr_loc;
  var obj = req.project;
  for (var i=1; i<arr_loc.length; i++){
    obj = obj[(arr_loc[i])];
  }
  delete obj[req.body.fold];
  Pro.updateOne({_id: req.project._id}, {[get_str_loc(arr_loc)]: obj}, function(err){
    if (!err){
      res.send(true);
    } else res.send(false);
  });
});

// ajax עדכון קטגוריה
app.post('/update_fold', pro_one_ex, function (req, res) {
  var arr_loc = req.body.arr_loc;
  var obj = req.project;
  var parent = req.project;

  for (var i=1; i<arr_loc.length; i++){
    obj = obj[(arr_loc[i])];
  }

  var list_folds = Object.keys(obj);
  var isNameEx = false;
  list_folds.forEach((item, i) => {
    if (item == req.body.new_name) {
      isNameEx = true;
    }
  });


  if (isNameEx) {
    res.send(false)
  } else {
    obj[req.body.new_name] = obj[req.body.old_name];
    delete obj[req.body.old_name];

    Pro.updateOne({_id: req.project._id}, {[get_str_loc(arr_loc)]: obj}, function(err){
      if (!err){
        res.send(true);
      } else res.send(false);
    });
  }
});



// ajax הוספה של קטגוריה לפרויקט
app.post('/add_fold', pro_one_ex, function (req, res) {
  var obj = req.project;
  var arr_loc = req.body.arr_loc;
  for (var i=1; i<arr_loc.length; i++){
    obj = obj[(arr_loc[i])];
  }

  if (typeof obj == 'string'){
    obj = {};
  }
  if (req.body.name in obj == false){
    if (req.body.type == 'folder'){
      obj[req.body.name] = {type: "folder"};
    } else if (req.body.type == 'table'){
      obj[req.body.name] = {
        type: 'table',
          coteret: {},
          new: []
      };
    } else if (req.body.type == 'table_plan'){
      obj[req.body.name] = tab_plan;
    } else if (req.body.type == 'table_beton'){
      obj[req.body.name] = tab_beton;
    } else if (req.body.type == 'contact_tab'){
      obj[req.body.name] = contact_tab;
    } else if (req.body.type == 'fold_rfi'){
      obj[req.body.name] = fold_rfi;
    } else if (req.body.type == 'win_file'){
      obj[req.body.name] = win_file;
    }

    Pro.updateOne({_id: req.session.pro}, {[get_str_loc(arr_loc)]: obj}, function(err){
      if (!err){
        res.send(true);
      } else res.send(false);
    });
  } else {
    res.send(false);
  }
});
///////////////////// \FOLD /////////////////////



///////////////////// אנשי קשר - fold /////////////////////
//עדכון אנשי קשר להצגה
app.post('/update_contact_fold', pro_one_ex, function (req, res) {
  var arr_loc = req.body.arr_loc;
  var obj = req.project;
  for (var i=1; i<arr_loc.length; i++){
    obj = obj[(arr_loc[i])];
  }

  obj.list_contact = req.body.list;

  Pro.updateOne({_id: req.project._id}, {[get_str_loc(arr_loc)]: obj}, function(err){
    if (!err){
      res.send(true);
    } else {
      res.send(err);
    }
  });

});



///////////////////// \אנשי קשר - fold /////////////////////

///////////////////// קבלני משנה /////////////////////

// לקחת מהמסד את כל הקבלנים הקיימים
app.get('/get_cablanim', file_tab, function(req, res){
  res.send(req.file.cablanim);
});



// הוספה של קבלן חדש
app.post('/add_cablan', file_tab, function(req, res){
  req.body.id = Math.random().toString(36).substr(2, 9);
  System.updateOne({_id: req.file._id}, { $push: {cablanim: req.body} }, function(err){
    if (!err){
      res.send(true);
    } else res.send(false);
  });

});


// שינוי של קבלן
app.post('/change_cablan', file_tab, function(req, res){
  var arr = req.file.cablanim;
  arr.forEach(function(ar){
    if (ar.id == req.body.ids){
      ar[req.body.name] = req.body.value;
    }
  });

  System.updateOne({_id: req.file._id}, {cablanim: arr}, function(err){
    if (!err){
      res.send(true);
    } else res.send(false);
  });

});

// שינוי של קבלן
app.post('/remove_cablan', file_tab, function(req, res){
  var arr = req.file.cablanim;
  var new_arr = [];
  arr.forEach(function(ar){
    if (ar.id != req.body.id){
      new_arr.push(ar);
    }
  });

  System.updateOne({_id: req.file._id}, {cablanim: new_arr}, function(err){
    if (!err){
      res.send(true);
    } else res.send(false);
  });

});

///////////////////// \קבלני משנה /////////////////////



///////////////////// RFI /////////////////////
app.post('/create_rfi', pro_one_ex, function (req, res) {
  var bol = false;

  var arr_loc = req.body.arr_loc;
  var obj = req.project;
  for (var i=1; i<arr_loc.length; i++){
    obj = obj[(arr_loc[i])];
  }
  req.body.num = obj.list_files.length + 1;
  var random = Math.random().toString(36).substr(2, 9);

  (async function() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile('tofes', req.body);
    await page.setContent(content);
    await page.emulateMedia('screen');
    await page.pdf({path: 'public/rfi/'+random+'.pdf', format: 'A4', printBackground: true});
    bol = true;
    await browser.close();
    // process.exit();
  })();

  var details = {
    num: req.body.num,
    explan: req.body.rfi,
    status: 'נשלח',
    file_name: random,
    date_start: req.body.date,
    date_stop: '',
    note: ''
  };

  obj.list_files.push(details);

  var interval;
  function check() {
    if (bol == true) {
      res.send(true);
      clearInterval(interval);
    }
  }

  Pro.updateOne({_id: req.project._id}, {[get_str_loc(arr_loc)]: obj}, function(err){
    if (!err){
      interval = setInterval(check, 500);
    } else {
      res.send(err);
    }
  });

});

///////////////////// \RFI /////////////////////


///////////////////// כללי /////////////////////
// בדיקה אם משתמש הוא במצב קריאה או עריכה
app.get('/check_mode', model, function(req, res){
  res.send({edit_mode: req.user.edit_mode, manage: true});
});
// שינוי מצב קריאה/עריכה למשתמש
app.get('/change_mode', model, function(req, res){
  User.updateOne({_id: req.user._id}, {edit_mode: !req.user.edit_mode}, function(err){
    if (!err){
      res.send(!req.user.edit_mode);
    } else res.send(err);
  });
});

// הרשמה של משתמש חדש
app.get('/new_user', function(req, res){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash('33', salt, function(err, hash) {
      const newuser = new User({
        full_name: 'תכניתן ראשי',
        mobile: 33,
        email: 'lolo@gmail.com',
        edit_mode: false,
        management: 1,
        password: hash
      });
      newuser.save(function(err){
        if (!err){
          console.log("Successfully save new user");
          res.send('user has saved');
        } else {
          console.log('err save user');
          res.send(err);
        }
      });
    });
  });
});

// יצירת מסד של כללי
app.get('/new_system', function(req, res){
  const newsystem = new System({
    list_ids: [],
  });
  newsystem.save(function(err){
    if (!err){
      console.log("Successfully save new user");
      res.send('newsystem has saved');
    } else {
      console.log('err save system');
      res.send(err);
    }
  });
});


// התנתקות מהמערכת
app.get('/last_login', function(req, res){
  User.find({}, function(err, user){
    if (!err){
      res.send(user);
    } else res.send('its go worng');
  });
});




// התנתקות מהמערכת
app.get('/logout', function(req, res){
  delete req.session.user_id;

  res.send(true);
});


///////////////////// \כללי /////////////////////





// app.listen(process.env.PORT);

app.listen(8000, function(){
  console.log("server has started successfully");
});














// שינויים בטבלה - פונקציה מחזירה את המיקום שבו צריך לעדכן
function get_str_loc(list_loc){
  var field = "";
  for (var i=1; i<list_loc.length; i++){
    if (i == list_loc.length - 1){
      field = field + list_loc[i];
    } else {
      field = field + list_loc[i] + '.';
    }
  }
  return field;
}
