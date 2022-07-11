var win_file = {
  "type" : "win_file",
  "file_name" : "",
  "last_up" : ""
};

var tab_plan = {
    "type" : "table_plan",
    "new" : [
        "שם התוכנית",
        "קוד",
        "סטטוס",
        "מהדורה אחרונה",
        "תאריך עדכון",
        "מספר עותקים",
        "קובץ",
        "שינוי אחרון"
    ],
    "tables": [
    ],
};


var tab_beton = {
  "type" : "table_beton",
  "new" : [
      "מס תעודה",
      "סוג בטון",
      "מס ערבל",
      "שעת הגעה",
      "תחילת פריקה",
      "סיום פריקה",
      "כמות בקוב",
      "הערות"
  ],
  "details": [
  ],
  "tables": [
  ],
};

var contact_tab = {
  "type" : "contact_tab",
  "list_contact" : [],
};

var fold_rfi = {
  "type" : "fold_rfi",
  "list_files": []
};



module.exports = {
  tab_plan: tab_plan,
  contact_tab: contact_tab,
  tab_beton: tab_beton,
  fold_rfi: fold_rfi,
  win_file: win_file
};
