var g_slideHeight = 400;

function _donk() {

  var s = Reveal.getCurrentSlide();
  Reveal.sync();
  handleSlideScrolling(s); 
}

// https://stackoverflow.com/a/2117523
// by user [broofa]
//
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function utc2str(s) {
  var d = new Date(s);
  return d.toDateString();
}

// ---
// ---
//

var uiData = {
  "calendar":null,
  "edit": {
    "type": "none",
    "active":false,
    "activity_id":"",
    "icon_id":"",
    "undo_data":""
  },
  "pageTransitionDelay" : 200,
  "focus" : "",
  "calendar" : {},
  "calendarModal": {},
  "timelineModal": {},
  "pageIndex": {

    "ui-mood-daily" : 0,

    "ui-entry" : 1,
    "ui-activity-add" : 2,

    "ui-timeline" : 3,

    "ui-calendar" : 4,

    "ui-stats" : 5,
    "ui-config" : 6,
    "ui-about" : 7
  },

  "timeline": {
    "display":false,
    "start" : null,
    "end" : null
  },

  "chart":{
    "weekday_average":{},
    "weekday_single_average":{},
    "month_average":{}
  },

  "mood-color": {
    "mood-0":'#214969',
    'mood-1':'#387db3',
    'mood-2':'#d6c33f',
    'mood-3':'#61cb9b',
    'mood-4':'#ff7f7a'
  },

  "activeEntry": {
    "ui_moodId": null,
    "ui_activityId": null
  }

};

// Log entries consist of:
// * log_uuid
// * entry_uuid
// * mood (id)
// * activitie(s) (id(s))
// * note
// * entry timestamp
// * modified timestamp
//
// Log entries should be append only, with the valid
// log entry being the one with the most recent modified timestamp.
// As a later feature, there can be a facility to remove entries
// completely, but for now, append only.
// log_uuid will remain the same and is the uuid to tie modified entries
// to one another.
// entry_uuid is the unique id for the entry and should be completely unique for
// all entries.
//
// Example:
//
// { "log_uuid":"baecafe", "entry_uuid":"000cafe", "mood":"mood-3", "activity":["activity-120000"], "note":"feeling meh", "entry_date":"2020-02-25 10:00 UTC", "modified_date":2020-02-25 10:00 UTC" }
// { "log_uuid":"dabcafe", "entry_uuid":"001cafe", "mood":"mood-4", "activity":["activity-120000"], "note":"feeling meh", "entry_date":"2020-02-25 12:00 UTC", "modified_date":2020-02-25 12:00 UTC" }
// { "log_uuid":"baecafe", "entry_uuid":"002cafe", "mood":"mood-4", "activity":["activity-120000"], "note":"feeling ok",  "entry_date":"2020-02-25 10:00 UTC", "modified_date":2020-02-25 13:00 UTC" }
//

// The system provides 'standard' activities, which have codes that are predefined.
// Users will be able to add new activities with their own names.
// Newly added activities can have the same icon but a different name.
// To further differentiate, icons can be color coded.
//

// appData is the global object that holds
// state information, icon information, etc.
//
// data: current data for user
//   activeEntry: current setting for mood and activity
//
// default: default value for activities (icons, values, etc.)
//   

var appData = {
  "db_ctx":null,
  "data" : {

    "activeEntry" : {
      "entry_uuid": null,
      "log_uuid": null,
      "entry_timestamp": 0,
      "modified_timestamp": 0,
      "state":"none",
      "mood": null,
      "activity" : [],
      "note":""
    },

    "timeline": {
      "start":null,
      "end":null
    },

    "log" : { },

    // TODO: school, travel

    // placeholder for default values
    //
    "activity_option": [
      { "activity_id": "activity-050101",  "name": "work" ,       "icon_id":"icon-work" },
      //{ "activity_id": "activity-120300",  "name": "relax" ,      "icon_id":"icon-relax" },
      { "activity_id": "activity-120000",  "name": "friends" ,    "icon_id":"icon-friends" },
      { "activity_id": "activity-120100",  "name": "date" ,       "icon_id":"icon-date" },
      { "activity_id": "activity-120312",  "name": "read" ,    "icon_id":"icon-read" },
      { "activity_id": "activity-600058",  "name": "game" ,     "icon_id":"icon-game" },
      { "activity_id": "activity-070000",  "name": "shop" ,   "icon_id":"icon-shop" },
      //{ "activity_id": "activity-180000",  "name": "travel" ,     "icon_id":"icon-travel" },
      { "activity_id": "activity-110100",  "name": "meal" ,       "icon_id":"icon-meal" },
      { "activity_id": "activity-020101",  "name": "clean" ,   "icon_id":"icon-clean" },
      //{ "activity_id": "activity-600016",  "name": "school" ,     "icon_id":"icon-school" },

      { "activity_id": "custom-show",      "name": "show" ,       "icon_id":"icon-show" },
      { "activity_id": "custom-internet",  "name": "web" ,   "icon_id":"icon-internet" },
      { "activity_id": "custom-music",   "name": "music" ,      "icon_id":"icon-music" },
      { "activity_id": "activity-010100",  "name": "sleep" ,      "icon_id":"icon-sleep" },

      { "activity_id": "activity-020102",  "name": "laundry" ,    "icon_id":"icon-laundry" },
      { "activity_id": "activity-600025",  "name": "tv" ,         "icon_id":"icon-tv" },
      { "activity_id": "custom-movie",     "name": "movie" ,      "icon_id":"icon-movie" },
      { "activity_id": "custom-medication","name": "meds" , "icon_id":"icon-medication" }
    ],

    "activity" : { },
    "custom-activity": { },
    "survey": { },
    "config" : { }

  },

  "default": {
    "activity": [
      { "activity_id": "activity-050101",  "name": "work" ,       "icon_id":"icon-work" },
      { "activity_id": "activity-120300",  "name": "relax" ,      "icon_id":"icon-relax" },
      { "activity_id": "activity-120000",  "name": "friends" ,    "icon_id":"icon-friends" },
      { "activity_id": "activity-120100",  "name": "date" ,       "icon_id":"icon-date" },
      { "activity_id": "activity-120312",  "name": "read" ,    "icon_id":"icon-read" },
      { "activity_id": "activity-600058",  "name": "gam" ,     "icon_id":"icon-game" },
      { "activity_id": "activity-070000",  "name": "shop" ,   "icon_id":"icon-shop" },
      //{ "activity_id": "activity-180000",  "name": "travel" ,     "icon_id":"icon-travel" },
      { "activity_id": "activity-110100",  "name": "meal" ,       "icon_id":"icon-meal" },
      { "activity_id": "activity-020101",  "name": "clean" ,   "icon_id":"icon-clean" },
      //{ "activity_id": "activity-600016",  "name": "school" ,     "icon_id":"icon-school" },

      { "activity_id": "custom-show",      "name": "show" ,       "icon_id":"icon-show" },
      { "activity_id": "custom-internet",  "name": "internet" ,   "icon_id":"icon-internet" },
      { "activity_id": "custom-music",   "name": "music" ,      "icon_id":"icon-music" },
      { "activity_id": "activity-010100",  "name": "sleep" ,      "icon_id":"icon-sleep" },

      { "activity_id": "activity-020102",  "name": "laundry" ,    "icon_id":"icon-laundry" },
      { "activity_id": "activity-600025",  "name": "tv" ,         "icon_id":"icon-tv" },
      { "activity_id": "custom-movie",     "name": "movie" ,      "icon_id":"icon-movie" },
      { "activity_id": "custom-medication","name": "medication" , "icon_id":"icon-medication" }
    ],

    "config": { }

  },

  // users activity list.
  // populated with default values but overwritten depending on user
  // specified activity list.
  //
  "activity_list" : [
    { "id": "xxx", "name":"yyy" }

  ],

  "icon" : {

    "mood" : {
      "mood-0": { "id":"mood-0", "name":"horrible", "img": { "active": "asset/mood/face-horrible-color-active.svg", "inactive":"asset/mood/face-horrible-color.svg" } },
      "mood-1": { "id":"mood-1", "name":"sad",      "img": { "active": "asset/mood/face-sad-color-active.svg",      "inactive":"asset/mood/face-sad-color.svg" } },
      "mood-2": { "id":"mood-2", "name":"average",  "img": { "active": "asset/mood/face-average-color-active.svg",  "inactive":"asset/mood/face-average-color.svg" } },
      "mood-3": { "id":"mood-3", "name":"happy",    "img": { "active": "asset/mood/face-happy-color-active.svg",    "inactive":"asset/mood/face-happy-color.svg" } },
      "mood-4": { "id":"mood-4", "name":"awesome",  "img": { "active": "asset/mood/face-awesome-color-active.svg",  "inactive":"asset/mood/face-awesome-color.svg" } }
    },

    "action": {
      "confirm": { "id":"action-0", "name":"confirm",  "img":{ "active": "asset/action/checkmark-active.svg", "inactive":"asset/action/checkmark.svg" } },
      "cancel":  { "id":"action-1", "name":"cancel",   "img":{ "active": "asset/action/cancel-active.svg",    "inactive":"asset/action/cancel.svg" } },
      "add":     { "id":"action-2", "name":"add",      "img":{ "active": "asset/action/plus-active.svg",      "inactive":"asset/action/plus.svg" } },
      "subtract":{ "id":"action-3", "name":"subtract", "img":{ "active": "asset/action/minus-active.svg",     "inactive":"asset/action/minus.svg" } },
      "back":    { "id":"action-4", "name":"back",     "img":{ "active": "asset/action/back-active.svg",      "inactive":"asset/action/back.svg" } }
    },

    // mean to be immutable
    //
    "activity": {


      // standard activities
      //
      "icon-work": { "type":"standard", "name":"work","activity_id":"activity-050101", "icon_id":"icon-work", "img":{"active":"asset/activities-main/office-active.svg","inactive":"asset/activities-main/office.svg"} },
      "icon-friends": { "type":"standard", "name":"friends","activity_id": "activity-120000",  "icon_id":"icon-friends", "img":{"active":"asset/activities-main/group-active.svg","inactive":"asset/activities-main/group.svg"} },
      "icon-date": { "type":"standard", "name":"date","activity_id": "activity-120100",  "icon_id":"icon-date", "img":{"active":"asset/activities-main/heart-active.svg","inactive":"asset/activities-main/heart.svg"} },
      "icon-read": { "type":"standard", "name":"read","activity_id": "activity-120312",  "icon_id":"icon-read", "img":{"active":"asset/activities-main/book-active.svg","inactive":"asset/activities-main/book.svg"} },
      "icon-game": { "type":"standard", "name":"game","activity_id": "activity-600058",  "icon_id":"icon-game", "img":{"active":"asset/activities-main/gamecontroller-active.svg","inactive":"asset/activities-main/gamecontroller.svg"} },
      "icon-shop": { "type":"standard", "name":"shop","activity_id": "activity-070000",  "icon_id":"icon-shop", "img":{"active":"asset/activities-main/shoppingbag-active.svg","inactive":"asset/activities-main/shoppingbag.svg"} },
      "icon-meal": { "type":"standard", "name":"meal","activity_id": "activity-110100",  "icon_id":"icon-meal", "img":{"active":"asset/activities-main/food-active.svg","inactive":"asset/activities-main/food.svg"} },
      "icon-clean": { "type":"standard", "name":"clean","activity_id": "activity-020101",  "icon_id":"icon-clean", "img":{"active":"asset/activities-main/broom-active.svg","inactive":"asset/activities-main/broom.svg"} },
      //"icon-show": { "type":"standard", "activity_id": "custom-show",    "icon_id":"icon-show", "img":{"active":"asset/activities-main/speaker-active.svg","inactive":"asset/activities-main/speaker.svg"} },
      //"icon-music": { "type":"standard", "activity_id": "activity-music", "icon_id":"icon-music", "img":{"active":"asset/activities-main/music-active.svg","inactive":"asset/activities-main/music.svg"} },
      "icon-sleep": { "type":"standard", "name":"sleep","activity_id": "activity-010100","icon_id":"icon-sleep", "img":{"active":"asset/activities-main/sleep-active.svg","inactive":"asset/activities-main/sleep.svg"} },
      "icon-laundry": { "type":"standard", "name":"laundry","activity_id": "activity-020102",  "icon_id":"icon-laundry", "img":{"active":"asset/activities-main/laundry-active.svg","inactive":"asset/activities-main/laundry.svg"} },
      "icon-tv": { "type":"standard", "name":"tv", "activity_id": "activity-600025",  "icon_id":"icon-tv", "img":{"active":"asset/activities-main/tv-active.svg","inactive":"asset/activities-main/tv.svg"} },
      //"icon-movie": { "type":"standard", "activity_id": "custom-movie",     "icon_id":"icon-movie", "img":{"active":"asset/activities-main/movie-active.svg","inactive":"asset/activities-main/movie.svg"} },
      //"icon-medication": { "type":"standard", "activity_id": "custom-medication","icon_id":"icon-meds", "img":{"active":"asset/activities-main/pill-active.svg","inactive":"asset/activities-main/pill.svg"} }

      // custom activities
      //
      "icon-book": { "type":"custom", "name":"book","activity_id":"custom-book", "icon_id":"icon-book", "img":{"active":"asset/activities-custom/book-active.svg", "inactive":"asset/activities-custom/book.svg" } },
      "icon-briefcase": { "type":"custom", "name":"briefcase","activity_id":"custom-briefcase", "icon_id":"icon-briefcase", "img":{"active":"asset/activities-custom/briefcase-active.svg", "inactive":"asset/activities-custom/briefcase.svg" } },
      "icon-broom": { "type":"custom", "name":"broom","activity_id":"custom-broom", "icon_id":"icon-broom", "img":{"active":"asset/activities-custom/broom-active.svg", "inactive":"asset/activities-custom/broom.svg" } },
      "icon-calendar": { "type":"custom", "name":"calendar","activity_id":"custom-calendar", "icon_id":"icon-calendar", "img":{"active":"asset/activities-custom/calendar-active.svg", "inactive":"asset/activities-custom/calendar.svg" } },
      "icon-coffee1": { "type":"custom", "name":"coffee","activity_id":"custom-coffee1", "icon_id":"icon-coffee1", "img":{"active":"asset/activities-custom/coffee1-active.svg", "inactive":"asset/activities-custom/coffee1.svg" } },
      "icon-coffee": { "type":"custom", "name":"coffee","activity_id":"custom-coffee", "icon_id":"icon-coffee", "img":{"active":"asset/activities-custom/coffee-active.svg", "inactive":"asset/activities-custom/coffee.svg" } },
      "icon-fastfood": { "type":"custom", "name":"fastfood","activity_id":"custom-fastfood", "icon_id":"icon-fastfood", "img":{"active":"asset/activities-custom/fastfood-active.svg", "inactive":"asset/activities-custom/fastfood.svg" } },
      "icon-food": { "type":"custom", "name":"food","activity_id":"custom-food", "icon_id":"icon-food", "img":{"active":"asset/activities-custom/food-active.svg", "inactive":"asset/activities-custom/food.svg" } },
      "icon-gamecontroller": { "type":"custom", "name":"game","activity_id":"custom-gamecontroller", "icon_id":"icon-gamecontroller", "img":{"active":"asset/activities-custom/gamecontroller-active.svg", "inactive":"asset/activities-custom/gamecontroller.svg" } },
      "icon-group": { "type":"custom", "name":"group","activity_id":"custom-group", "icon_id":"icon-group", "img":{"active":"asset/activities-custom/group-active.svg", "inactive":"asset/activities-custom/group.svg" } },
      "icon-heart": { "type":"custom", "name":"date","activity_id":"custom-heart", "icon_id":"icon-heart", "img":{"active":"asset/activities-custom/heart-active.svg", "inactive":"asset/activities-custom/heart.svg" } },
      "icon-internet": { "type":"custom", "name":"web","activity_id":"custom-internet", "icon_id":"icon-internet", "img":{"active":"asset/activities-main/wifi-active.svg","inactive":"asset/activities-main/wifi.svg"} },
      //"icon-laundry": { "type":"custom", "icon_id":"icon-laundry", "img":{"active":"asset/activities-custom/laundry-active.svg", "inactive":"asset/activities-custom/laundry.svg" } },
      "icon-luggage": { "type":"custom", "name":"travel","activity_id":"custom-luggage", "icon_id":"icon-luggage", "img":{"active":"asset/activities-custom/luggage-active.svg", "inactive":"asset/activities-custom/luggage.svg" } },
      "icon-medication": { "type":"custom", "name":"meds", "activity_id":"custom-medication", "icon_id":"icon-medication", "img":{"active":"asset/activities-main/pill-active.svg","inactive":"asset/activities-main/pill.svg"} },
      "icon-movie": { "type":"custom", "name":"movie","activity_id":"custom-movie", "icon_id":"icon-movie", "img":{"active":"asset/activities-custom/movie-active.svg", "inactive":"asset/activities-custom/movie.svg" } },
      "icon-music": { "type":"custom", "name":"music","activity_id":"custom-music", "icon_id":"icon-music", "img":{"active":"asset/activities-custom/music-active.svg", "inactive":"asset/activities-custom/music.svg" } },
      "icon-office": { "type":"custom", "name":"office","activity_id":"custom-office", "icon_id":"icon-office", "img":{"active":"asset/activities-custom/office-active.svg", "inactive":"asset/activities-custom/office.svg" } },
      "icon-pill": { "type":"custom", "name":"meds","activity_id":"custom-pill", "icon_id":"icon-pill", "img":{"active":"asset/activities-custom/pill-active.svg", "inactive":"asset/activities-custom/pill.svg" } },
      "icon-shoppingbag": { "type":"custom", "name":"shopping","activity_id":"custom-shoppingbang", "icon_id":"icon-shoppingbag", "img":{"active":"asset/activities-custom/shoppingbag-active.svg", "inactive":"asset/activities-custom/shoppingbag.svg" } },
      "icon-show": { "type":"custom", "name":"show","activity_id":"custom-show", "icon_id":"icon-show", "img":{"active":"asset/activities-main/speaker-active.svg","inactive":"asset/activities-main/speaker.svg"} },
      //"icon-sleep": { "type":"custom", "icon_id":"icon-sleep", "img":{"active":"asset/activities-custom/sleep-active.svg", "inactive":"asset/activities-custom/sleep.svg" } },
      "icon-speaker": { "type":"custom", "name":"speaker","activity_id":"custom-speaker", "icon_id":"icon-speaker", "img":{"active":"asset/activities-custom/speaker-active.svg", "inactive":"asset/activities-custom/speaker.svg" } },
      "icon-sports": { "type":"custom", "name":"sports","activity_id":"custom-sports", "icon_id":"icon-sports", "img":{"active":"asset/activities-custom/sports-active.svg", "inactive":"asset/activities-custom/sports.svg" } },
      //"icon-tv": { "type":"custom", "icon_id":"icon-tv", "img":{"active":"asset/activities-custom/tv-active.svg", "inactive":"asset/activities-custom/tv.svg" } },
      "icon-wifi": { "type":"custom", "name":"web","activity_id":"custom-wifi", "icon_id":"icon-wifi", "img":{"active":"asset/activities-custom/wifi-active.svg", "inactive":"asset/activities-custom/wifi.svg" } }

    }

  }
};


function _click() {
  console.log("ok");
  return false;
}

// --
// --
function saveActivityOptionToDB() {
  var db = appData.db_ctx.db;

  db.run("delete from activity_convenient");

  var aopt = appData.data.activity_option;
  for (var ii=0; ii<aopt.length; ii++) {
    var vals = [ aopt[ii].activity_id, aopt[ii].name, aopt[ii].icon_id ];
    db.run("insert into activity_convenient (activity_id, name, icon_id) values (?, ?, ?)", vals);
  }

  saveDBToLocalStorage(appData.db_ctx.db_name, appData.db_ctx.db);
}

function addActivityOption(activity_id) {
  var cur_opt = appData.data.activity_option;

  for (var ii=0; ii<cur_opt.length; ii++) {

    // ignore if already present
    //
    if (activity_id == cur_opt[ii].activity_id) {
      console.log("WARNING: activity_id:", activity_id, "already present in current activity list, ignoring");
      return;
    }
  }

  var act_icon_obj = appData.icon.activity;
  var add_act_id = "";
  for (var x in act_icon_obj) {
    if (activity_id == act_icon_obj[x].activity_id) {
      console.log(">>", x, act_icon_obj[x]);
      add_act_id = x;
      break;
    }
  }

  if (add_act_id.length==0) {
    console.log("WARNING: activity", activity_id, "not found");
    return;
  }

  var z = act_icon_obj[add_act_id];

  var ent = { "activity_id": activity_id, "icon_id": z.icon_id, "name": "test" };

  appData.data.activity_option.push(ent);
  populateActivityGrid(undefined, appData.data.activity_option);

  //saveActivityOptionToDB();
}

function updateActivityName(activity_id, new_name) {
  for (var ii=0; ii<appData.data.activity_option.length; ii++) {
    if (appData.data.activity_option[ii].activity_id == activity_id) {
      appData.data.activity_option[ii].name = new_name;
      break;
    }
  }

  for (var icon_id in appData.icon.activity) {
    if (appData.icon.activity[icon_id].activity_id == activity_id) {
      appData.icon.activity[icon_id].name = new_name;
    }
  }

  var db = appData.db_ctx.db;
  db.run("update activity set name = ? where activity_id = ?", [new_name, activity_id]);

  populateActivityGrid(undefined, appData.data.activity_option);
  saveActivityOptionToDB();
}


// --

function clearUIEdit() {
  uiData.edit.type = "none";
  uiData.edit.active = false;
  uiData.activity_id = "";
  uiData.icon_id = "";
  uiData.undo_data = "";
}

function isActivityActive(aid, a_opt_list) {
  for (var ii=0; ii<a_opt_list.length; ii++) {
    if (aid == a_opt_list[ii].activity_id) { return true; }
  }
  return false;
}

function delActivity(obj, a_opt_list) {

  for (var ii=0; ii<a_opt_list.length; ii++) {
    if (a_opt_list[ii].activity_id == obj.activity_id) {
      a_opt_list.splice(ii,1);
      return;
    }
  }

}

function ui_clickAddActivityEdit(activity_id) {

  if (uiData.edit.type != "ui-add-activity_edit-activity-name") {
    clearUIEdit();
    uiData.edit.type = "ui-add-activity_edit-activity-name";
    uiData.edit.active = false;
    uiData.edit.activity_id = activity_id;
  }

  if (activity_id != uiData.edit.activity_id) {

    console.log("switched....", uiData.edit);

    // stop editing prev selected....
    //
    var prev_act_id = uiData.edit.activity_id;
    var ele = document.getElementById("ui-activity-add_name-" + prev_act_id);
    ele.value = uiData.edit.undo_data;
    ele.setAttribute("readonly", "readonly");
    ele.style.background = "none";
    var div_ele = _gebi("ui-activity-add_div-name-"+prev_act_id);
    div_ele.style.background = "none";

    ele = _gebi("ui-activity-add_name-" + activity_id);

    uiData.edit.active = false;
    uiData.edit.activity_id = activity_id;
    uiData.edit.undo_data = ele.value;
  }

  if (uiData.edit.active) {
    var ele = document.getElementById("ui-activity-add_name-" + activity_id);
    ele.setAttribute("readonly", "readonly");
    ele.style.background = "none";
    uiData.edit.active = false;

    var div_ele = _gebi("ui-activity-add_div-name-"+activity_id);
    div_ele.style.background = "none";

    //committing change
    //

    var new_name = ele.value;
    updateActivityName(activity_id, new_name);
  }
  else {
    var ele = document.getElementById("ui-activity-add_name-" + activity_id);
    ele.removeAttribute("readonly");
    ele.focus();
    uiData.edit.active = true;
    uiData.edit.undo_data = ele.value;

    var div_ele = _gebi("ui-activity-add_div-name-"+activity_id);
    div_ele.style.background = "#aaaaaa";
  }

}

function ui_clickAddActivity(activity_id) {
  var is_active = isActivityActive(activity_id, appData.data.activity_option);

  var d = _activity_icon(activity_id);

  var ele_item = _gebi("ui-activity-add_item-" + activity_id);
  var ele_icon = _gebi("ui-activity-add_icon-" + activity_id);
  //var ele_plusminus = _gebi("ui-activity-add_pm-" + activity_id);
  if (is_active) {
    ele_item.style = "background:none;";
    ele_icon.src = d.img.inactive;
    //ele_plusminus.src = "asset/action/minus.svg";

    var xx = delActivity(d, appData.data.activity_option);
  }
  else {
    ele_item.style = "background:#ffffee;";
    ele_icon.src = d.img.active;
    //ele_plusminus.src = "asset/action/plus.svg";

    appData.data.activity_option.push({
      "activity_id":activity_id,
      "name":d.name,
      "icon_id":d.icon_id
    });

  }

  populateActivityGrid(undefined, appData.data.activity_option);

  console.log(">>> saving activity_convenient");
  saveActivityOptionToDB();
}

function populateAddActivity(activity_list_id) {
  if (typeof activity_list_id === "undefined") { activity_list_id = "ui-activity-add-activity-grid"; }

  var add_activity_order = [];
  for (var icon_id in appData.icon.activity) {
    add_activity_order.push({
      "activity_id": appData.icon.activity[icon_id].activity_id,
      "icon_id":icon_id,
      "name":appData.icon.activity[icon_id].name,
      "type":appData.icon.activity[icon_id].type
    });
  }


  // we replace the whole grid with a new one contructed below
  //
  old_activity_list = document.getElementById(activity_list_id);

  var activity_list = _div(["ui", "divided", "items"]);
  activity_list.id = activity_list_id;

  for (var ii=0; ii<add_activity_order.length; ii++) {
    var icon_id = add_activity_order[ii].icon_id;
    var activity_id = add_activity_order[ii].activity_id;
    var name = add_activity_order[ii].name;
    var activity_type = add_activity_order[ii].type;

    var is_active = isActivityActive(activity_id, appData.data.activity_option);

    var activity_icon = appData.icon.activity[icon_id];

    var custom_entry = activity_icon;
    var custom_img = custom_entry.img;

    var item = _div(["item"]);
    if (is_active) {
      item.style = "background:#ffffee;";
    }
    item.id = "ui-activity-add_item-" + activity_id;

    var div_img = _div(["ui","tiny", "image"]);

    var img = null;
    if (is_active) {
      img = _img(custom_img.active);
    }
    else {
      img = _img(custom_img.inactive);
    }
    img.id = "ui-activity-add_icon-" + activity_id;
    img.onclick = (function(aid) {
      return function() {
        ui_clickAddActivity(aid);
        return false;
      };
    })(activity_id);

    div_img.appendChild(img);

    var div_content = _div(["middle","aligned","tiny","content"]);

    /*
    var div_content_name = _div(["description"], "font-size:10vh;");
    div_content_name.id = "ui-activity-add_name-" + activity_id;
    div_content_name.innerHTML = name;
    */
    var div_content_name = document.createElement("div");
    div_content_name.classList.add("ui");
    div_content_name.classList.add("transparent");
    div_content_name.classList.add("input");
    div_content_name.id = "ui-activity-add_div-name-" + activity_id;

    var input_content_name = document.createElement("input");
    input_content_name.id = "ui-activity-add_name-" + activity_id;
    input_content_name.setAttribute("type", 'text');
    input_content_name.setAttribute("value", name);
    input_content_name.setAttribute("readonly", "readonly");

    div_content_name.appendChild(input_content_name);

    //div_content_name.innerHTML = name;

    var div_content_name_button = _div(["ui", "right", "floated", "secondary", "button"], "background:none;");

    var img_btn = null;

    if (activity_type != "standard") {
      img_btn = _img("asset/action/edit.svg", "height:10vh;");
      img_btn.id = "ui-activity-add_edit-" + activity_id;
      img_btn.onclick = (function(aid) {
        return function() {
          //ui_clickAddActivity(aid);
          ui_clickAddActivityEdit(aid);
          return false;
        };
      })(activity_id);
    }

    div_content_name.appendChild(div_content_name_button);

    div_content.appendChild(div_content_name);

    item.appendChild(div_img);
    item.appendChild(div_content);

    if (activity_type != "standard") {
      item.appendChild(img_btn);
    }

    activity_list.appendChild(item);

  }

  old_activity_list.parentNode.replaceChild(activity_list, old_activity_list);

}


function populateActivityGrid(grid_id, activity_option) {

  // default to daily activity grid
  //
  //if (typeof grid_id === "undefined") { grid_id = "activity-daily-activity-grid"; }
  if (typeof grid_id === "undefined") { grid_id = "ui-entry-activity-grid"; }

  var sztxt = '80%';
  var row = null;

  // we replace the whole grid with a new one contructed below
  //
  old_grid_ad = document.getElementById(grid_id);

  grid_ad = document.createElement('div');
  grid_ad.id = grid_id;
  grid_ad.className = "ui five column grid";
  grid_ad.align = "center";
  grid_ad.style = "width:100%; ";
  var row_ele_count=0;

  for (var ii=0; ii<activity_option.length; ii++) {

    var activity_id = activity_option[ii].activity_id;
    var icon_id = activity_option[ii].icon_id;
    var activity_name = activity_option[ii].name;

    // Five activity elements on a row in the grid
    //
    if ( (ii%5) == 0 ) {
      if (ii>0) { grid_ad.appendChild(row); }
      row = document.createElement("div");
      row.className = "row";
      row_ele_count=0;
    }

    var img_id = grid_id + "_" + activity_id

    var img = document.createElement('img');

    var activity_icon = appData.icon.activity[icon_id];

    img.src = activity_icon.img.inactive;

    img.id = img_id;
    img.style.width = '10vh';

    img.onclick = (function(x) {
      return function() { ui_onClickActivity(x); };
    })(img_id);

    // Disable html image drag weirdness
    //
    img.ondragstart = (function(x) {
      return function() { ui_onClickActivity(x); return false; };
    })(img_id);

    var txtdiv = document.createElement("div");
    //txtdiv.innerHTML= appData.icon.activity.standard[ii].name;
    txtdiv.innerHTML= activity_name;

    var celldiv = document.createElement("div");
    celldiv.className = "column";
    celldiv.appendChild(img);
    celldiv.appendChild(txtdiv);

    row.appendChild(celldiv);
    row_ele_count++;
  }

  if ((row_ele_count) && (row)) {
    grid_ad.appendChild(row);
  }

  old_grid_ad.parentNode.replaceChild(grid_ad, old_grid_ad);
}

function createNewActiveEntry(entryDate, state) {
  var ae = appData.data.activeEntry;

  ae.uuid = uuidv4();
  ae.entryDate = entryDate;
  ae.modifiedDate = Date.now();
  ae.state = state;
  ae.mood = null;
  ae.activity = [];
  ae.note = "";

  return ae;
}



function populateMoodGrid(grid_id) {

  old_grid_ad = document.getElementById(grid_id);
  grid_ad = document.createElement('div');
  grid_ad.className = "ui five column grid";
  grid_ad.align = "center";
  grid_ad.style = "width:100%; ";
  grid_ad.id = old_grid_ad.id;

  var row = document.createElement("div");
  row.className = "row";
  for (var ii=0; ii<5; ii++) {

    var mood_id = 'mood-' + ii.toString();

    var img_id = grid_id + "_" + appData.icon.mood[mood_id].activity_id;
    var img = document.createElement('img');
    img.src = appData.icon.mood[mood_id].img.inactive;
    img.id = img_id;
    img.style.width = '10vh';

    img.onclick = (function(x) {
       return function() { console.log(">>>", x); ui_onClickMood(x); };
     })(img_id);
    img.ondragstart = (function(x) {
      return function() { ui_onClickMood(x); return false; };
    })(img_id);

    var txtdiv = document.createElement("div");
    txtdiv.innerHTML= appData.icon.mood[mood_id].name;

    var br = document.createElement("br");

    var celldiv = document.createElement("div");
    celldiv.className = "column";
    celldiv.appendChild(img);
    //celldiv.appendChild(br);
    //celldiv.appendChild(txtdiv);

    //console.log(">>>", img, txtdiv, celldiv);

    row.appendChild(celldiv);

  }

  grid_ad.appendChild(row);
  old_grid_ad.parentNode.replaceChild(grid_ad, old_grid_ad);
}



// handle the need for scrollable content
// https://stackoverflow.com/questions/35237862/best-way-to-handle-overflowing-reveal-js-slide
//

function resetSlideScrolling(slide) {
  slide.classList.remove('scrollable-slide');
}

function handleSlideScrolling(slide) {
  if (slide.scrollHeight >= g_slideHeight) {

    slide.classList.add('scrollable-slide');
    var ele = document.getElementById('slide-container');
    ele.style.width = '100%';
    ele.style.height= '100%';
  }
}

Reveal.addEventListener('ready', function (event) {
  handleSlideScrolling(event.currentSlide);
});

Reveal.addEventListener('slidechanged', function (event) {
  Reveal.sync();
  if (event.previousSlide) {
    resetSlideScrolling(event.previousSlide);
  }
  handleSlideScrolling(event.currentSlide);

  var x = event.currentSlide;

  // timeline
  //
  if (event.indexh == uiData.pageIndex["ui-timeline"]) {
    setupTimeline();
  }
});

// ---
// ---
//

function confirmEdit(info) {
  var ele;

  ele = document.getElementById("ui-entry_note");

  var entry_id = appData.data.activeEntry.entry_uuid;
  var user_id = null;
  var mood = appData.data.activeEntry.mood;
  var activity = appData.data.activeEntry.activity.join(",");
  var note = ele.value;
  var create_date = moment().utc().format("YYYY-MM-DD HH:mm:ss");
  var modify_date = create_date;

  if (appData.data.activeEntry.state == "edit") {
    create_date = appData.data.activeEntry.entry_timestamp;
    modify_date = moment().utc().format("YYYY-MM-DD HH:mm:ss");
  }

  var entry_row = [ entry_id, user_id, mood, activity, note, create_date, modify_date ];

  insertEntry(entry_row);
}

function _set_mood(ui_id) {
}

// toggle mood icon
//
function ui_onClickMood(ui_moodId) {
  var active_entry = appData.data.activeEntry;

  var tok = ui_moodId.split("_");
  var mood_page_id = tok[0];
  var mood_val = tok[1];

  var mood_icon_ele = {};
  var mood_icon = appData.icon.mood;
  if (mood_val in mood_icon) {
    mood_icon_ele = mood_icon[mood_val];
  }
  else { return; }

  if (active_entry.mood) {
    $("#" + mood_page_id + "_" + active_entry.mood ).attr("src", mood_icon[active_entry.mood].img["inactive"]);
  }
  active_entry.mood = mood_val;
  $("#" + ui_moodId ).attr("src", mood_icon_ele.img["active"]);

}


function __onClickActivity(activityId, uiSubId) {
  if (typeof uiSubId === "undefined") { uiSubId = "daily"; }

  var active_entry = appData.data.activeEntry;

  var icon_state = "active";
  var ii=0;
  for (ii=0; ii<active_entry.activity.length; ii++) {
    if (activityId == active_entry.activity[ii]) {
      icon_state = "inactive";
      break;
    }
  }
  if (icon_state == "inactive") {
    active_entry.activity.splice(ii,1);
  }
  else {
    active_entry.activity.push(activityId);
  }

  var aicon = appData.icon.activity.standard;
  for (var ii=0; ii<aicon.length; ii++) {
    if (aicon[ii].activity_id == activityId) {
      var ele = aicon[ii];
      $("#" + activityId + "-" + uiSubId).attr("src", ele.img[icon_state]);
    }
  }

}

function ui_onClickActivity(activityId) {
  var active_entry = appData.data.activeEntry;

  var tok = activityId.split("_");
  var page_id = tok[0];
  var activity_val = tok[1];

  var icon_id = false;
  var activity_option = appData.data.activity_option;
  for (var ii=0; ii<activity_option.length; ii++) {
    if (activity_option[ii].activity_id == activity_val) {
      icon_id = activity_option[ii].icon_id;
      break;
    }
  }
  if (icon_id === false) { return; }
  var activity_icon = appData.icon.activity[icon_id];

  var icon_state = "active";
  var ii=0;
  for (ii=0; ii<active_entry.activity.length; ii++) {
    if (activity_val == active_entry.activity[ii]) {
      icon_state = "inactive";
      break;
    }
  }
  if (icon_state == "inactive") {
    active_entry.activity.splice(ii,1);
  }
  else {
    active_entry.activity.push(activity_val);
  }

  //var aicon = appData.icon.activity.standard;
  //for (var ii=0; ii<aicon.length; ii++) {
  //  if (aicon[ii].id == activity_val) {
  //    var ele = aicon[ii];
  //    $("#" + activityId).attr("src", ele.img[icon_state]);
  //  }
  //}

  $("#" + activityId).attr("src", activity_icon.img[icon_state]);

}

// create element (opt)
//
function _ele(v, opt) {
  var r = document.createElement(v);

  if (typeof opt !== "undefined") {

    if (typeof opt.class !== "undefined") {

      for (var idx=0; idx < opt.class.length; idx++) {
        r.classList.add(opt.class[idx]);
      }

    }

    if (typeof opt.src !== "undefined") {
      r.src = opt.src;
    }
    
    if (typeof opt.style !== "undefined") {
      r.style = opt.style;
    }
  }

  return r;
}

// create div (with opt class)
//
function _div(_class, _style) {
  return _ele("div", {"class":_class, "style":_style});
}

function _img(_src,_style) {
  return _ele("img", {"src":_src, "style":_style});
}

//function _input(_class, _style) { }


function _text(v) {
  var r  = document.createTextNode(v);
  return r;
}

function _ac(id,v) {
  document.getElementById(id).appendChild(v);
}

function _gebi(v) {
  return document.getElementById(v);
}

function _activity_icon(activity_id) {
  for (var x in appData.icon.activity) {
    if (appData.icon.activity[x].activity_id == activity_id) {
      return appData.icon.activity[x];
    }
  }
  return null;
}

function _activity_icon_img(activity_id) {
  for (var x in appData.icon.activity) {
    if (appData.icon.activity[x].activity_id == activity_id) {
      return appData.icon.activity[x].img.inactive;
    }
  }
  return null;
}

function _mood_icon(id) {
  for (var x in appData.icon.mood) {
    if (appData.icon.mood[x].id == id) {
      return appData.icon.mood[x].img.active;
    }
  }
}

function setupActiveEntry(uuid) {
  var db = g_ctx.db;
  var ent = db.exec("select uuid, user_uuid, mood, activity, note, entry_date, modified_date from entry where uuid = ?", [uuid]);
  if (ent.length==0) { return; }

  var db_uuid           = ent[0].values[0][0];
  var db_user_uuid      = ent[0].values[0][1];
  var db_mood           = ent[0].values[0][2];
  var db_activity       = ent[0].values[0][3];
  var db_note           = ent[0].values[0][4];
  var db_entry_date     = ent[0].values[0][5];
  var db_modified_date  = ent[0].values[0][6];

  appData.data.activeEntry.entry_uuid = db_uuid;
  appData.data.activeEntry.entry_timestamp = db_entry_date;
  appData.data.activeEntry.modified_timestamp = db_modified_date;
  appData.data.activeEntry.mood = db_mood;;
  appData.data.activeEntry.note = db_note;

  appData.data.activeEntry.activity = [];
  var a = db_activity.split(",");
  for (var ii=0; ii<a.length; ii++) {
    if (a[ii].length==0) { continue; }
    appData.data.activeEntry.activity.push(a[ii]);
  }

  appData.data.activeEntry.state = "edit";
}

function setupTimeline() {
  var db = g_ctx.db;
  var additional_query_count = 0;

  var query_str = "select mood, activity, note, entry_date, uuid from entry ";
  if (appData.data.timeline.start) {
    if (additional_query_count == 0) {
      query_str += " where date(entry_date) >= '" + appData.data.timeline.start + "'";
      additional_query_count++;
    }
  }
  if (appData.data.timeline.end) {
    if (additional_query_count == 0) {
      query_str += " where date(entry_date) <= '" + appData.data.timeline.end + "'";
      additional_query_count++;
    }
    else {
      query_str += " and date(entry_date) <= '" + appData.data.timeline.end + "'";
      additional_query_count++;
    }
  }
  query_str += " order by entry_date desc";

  var ent = db.exec(query_str);

  var ui_entry_list = _gebi("ui-timeline_entry-list");
  ui_entry_list.innerHTML = "";

  if (ent.length == 0) { return; }


  // Database is (meant to be) append only,
  // so to get the most current entry, we deduplicate by entry uuid.
  //
  var dedup_row = [];
  var seen_uuid = {};
  for (var ii=0; ii<ent[0].values.length; ii++) {
    var db_uuid = ent[0].values[ii][4];
    if (db_uuid in seen_uuid) { continue; }
    seen_uuid[db_uuid] = true;
    dedup_row.push(ent[0].values[ii]);
  }

  for (var ii=0; ii<dedup_row.length; ii++) {

    var db_mood       = dedup_row[ii][0];
    var db_activity   = dedup_row[ii][1];
    var db_note       = dedup_row[ii][2];
    var db_entry_date = dedup_row[ii][3];
    var db_uuid       = dedup_row[ii][4];

    var item = _div(["item"]);

      var lface = _div(["ui", "tiny", "image"]);
      item.appendChild(lface);
        var im = _mood_icon(db_mood);
        lface.appendChild( _img(im) );

      var content = _div(["middle", "aligned", "tiny", "content"]);
      item.appendChild(content);
        var hdr = _div(["header"], "font-size:7vh; opacity:0.8;");
        content.appendChild(hdr);

          var entry_date = db_entry_date.split(" ")[0];
          hdr.appendChild( _text(entry_date + " \u00A0 \u00A0 \u00A0 \u00A0" ) );

          var a = db_activity.split(",");

          for (var jj=0; jj<a.length; jj++) {
            if (a[jj].length==0) { continue; }

            var im = _activity_icon_img(a[jj]);

            hdr.appendChild( _img(im, "height:8vh;") );
            hdr.appendChild( _text(" ") );
          }

        var descr = _div(["description"], "font-size:6vh;");
        content.appendChild(descr);
          descr.appendChild( _text(db_note) );
          var descr_0 = _div(["ui", "right", "floated", "secondary", "button"], "background: none;");
          var im = _img("asset/noun_edit_2490873.svg", "height:10vh; opacity:0.8;");
          im.onclick = (function(x) {
            return function() {
              setupActiveEntry(x);
              uiEntryFill();
              uiEntryMoodShow();
              uiEntryTitle("Editing " + appData.data.activeEntry.entry_timestamp);
              setTimeout( function() {
                Reveal.slide( uiData.pageIndex["ui-entry"] );
              }, 200);
              
            };
          })(db_uuid);
          descr_0.appendChild( im );

          descr.appendChild(descr_0);

    ui_entry_list.appendChild(item);
  }

}

function uiEntryMoodHide() {
  var ele = document.getElementById("ui-entry_mood-hideshow");
  ele.style.display = "none";
}


function uiEntryMoodShow() {
  var ele = document.getElementById("ui-entry_mood-hideshow");
  ele.style.display = "block";
}

function uiEntryTitle(txt) {
  var ele = document.getElementById("ui-entry_title");
  ele.innerHTML = txt;
}

function uiEntryClear() {
  for (var ii=0; ii<5; ii++) {
    var mood_id = "mood-" + ii.toString();
    var ui_mood_id = "ui-entry_mood-" + ii.toString();
    $("#" + ui_mood_id).attr("src", appData.icon.mood[mood_id].img["inactive"]);
  }

  var aopt = appData.data.activity_option;

  for (var ii=0; ii<aopt.length; ii++) {
    var aid = "ui-entry-activity-grid_" + aopt[ii].activity_id;
    var icon_id = aopt[ii].icon_id;
    $("#" + aid).attr("src", appData.icon.activity[icon_id].img["inactive"]);
  }
}


function uiEntryFill(opt) {
  var ae = appData.data.activeEntry;

  populateActivityGrid(undefined, appData.data.activity_option);
  uiEntryClear();

  var mood_id = ae.mood;

  $("#" + "ui-entry_" + mood_id).attr("src", appData.icon.mood[mood_id].img["active"]);

  console.log("??", ae.activity, ae.activity.length);

  for (var ii=0; ii<ae.activity.length; ii++) {
    var aid = ae.activity[ii];
    var icon_info = _activity_icon(aid);
    console.log(">>>", aid, icon_info);
    $("#" + "ui-entry-activity-grid_" + aid).attr("src", icon_info.img.active);
  }

  var ele = _gebi("ui-entry_note");
  ele.value = ae.note;

}

function iso_date_tokenize(dt) {
  var a = dt.split("T");
  var ymd = a[0].split("-");
  var hms = a[1].split("Z")[0].split(":");

  return [ ymd[0], ymd[1], ymd[2], hms[0], hms[1], hms[2] ];
}

function _sql_exec(db, query, param) {
  var _res = { "column": [], "values":[]},
      res = [];
  var q = db.prepare(query, param);

  while (q.step()) {
    if (res.length==0) {
      res.push(_res);
      _res.column = q.getColumnNames();
    }
    _res.values.push( q.get() );
  }
  q.free();

  console.log(res);
  return res;
}

function calendarDayCallback(date, ele, info) {
  var dt_iso = date.toISOString();
  var dt_a = iso_date_tokenize(dt_iso);
  var ymd = dt_a[0] + "-" + dt_a[1] + "-" + dt_a[2];

  var row = g_ctx.db.exec("select entry_date, mood from entry where date(entry_date) = '" + ymd + "' order by id desc");

  if (row.length == 0) { return; }

  var mood = row[0].values[0][1];

  if (info.isCurrentMonth) {
    ele.style["border-radius"] = "50%";
    if (mood=='mood-4') { ele.style["background-color"] = 'rgb(255,127,122,0.5)'; }
    if (mood=='mood-3') { ele.style["background-color"] = '#61cb9b77'; }
    if (mood=='mood-2') { ele.style["background-color"] = '#d6c33f77'; }
    if (mood=='mood-1') { ele.style["background-color"] = '#387db377'; }
    if (mood=='mood-0') { ele.style["background-color"] = '#21496977'; }
  }

}

function calendarDayClickCallback(event, date) {
  var start_img = "<img id='ui-timeline_end' src='asset/start.svg' style='opacity:0.5; width:3vw;' >"
  var end_img = "<img id='ui-timeline_end' src='asset/end.svg' style='opacity:0.5; width:3vw;' >"



  var dt_iso = date.toISOString();
  var dt_a = iso_date_tokenize(dt_iso);
  var ymd = dt_a[0] + "-" + dt_a[1] + "-" + dt_a[2];

  appData.data.timeline.start = ymd;
  appData.data.timeline.end = ymd;

  var x = document.getElementById("ui-timeline_start-display");
  x.innerHTML = " <div style='font-size:4vh; opacity:0.8;'>" + ymd + "</div>";

  var x = document.getElementById("ui-timeline_end-display");
  x.innerHTML = "<div style='font-size:4vh; opacity:0.8;'>" + ymd + "</div> ";

  setTimeout( function() {
    Reveal.slide( uiData.pageIndex["ui-timeline"] );
  }, 20);


}

function _setup_callbacks() {

  // "mood-landing" page
  //
  for (var ii=0; ii<5; ii++) {
    var mood_id = "ui-mood-daily_mood-" + ii.toString();
    var pfx = "ui-mood-daily";
    var sfx = "mood-" + ii.toString();
    $("#" + mood_id).click(
        (function(x,y) {
          return function() {
            var t = x + "_" + y;
            ui_onClickMood(t);
            ui_onClickMood("ui-entry_" + y);

            uiEntryMoodHide();
            setTimeout( function() {
              Reveal.slide( uiData.pageIndex["ui-entry"] );
            }, 200);
          };
        })(pfx, sfx)
    );
  }

  // "ui-entry" (edit) page
  //
  for (var ii=0; ii<5; ii++) {
    var mood_id = "ui-entry_mood-" + ii.toString();
    $("#" + mood_id).click(
        (function(x) {
          return function() {
            ui_onClickMood(x);
          };
        })(mood_id)
    );
  }

  // "activity-daily" page
  //
  $("#ui-entry_add").click(
      (function(x) {
        return function() {
          var active_img = appData.icon.action.add.img.active;
          $("#ui-entry_add").attr("src", active_img);
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-activity-add"] );
            $("#ui-entry_add").attr("src", appData.icon.action.add.img.inactive);
          }, 200);
        };
      })()
  );

  $("#ui-entry_confirm").click(
      (function(x) {
        return function() {
          var active_img = appData.icon.action.confirm.img.active;
          $("#ui-entry_confirm").attr("src", active_img);
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-timeline"] );
            $("#ui-entry_confirm").attr("src", appData.icon.action.confirm.img.inactive);
          }, 200);
          confirmEdit();

          setupTimeline();
        };
      })()
  );

  // "activity-daily-add" page
  //

  $("#ui-activity-add_back").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-entry"] );
          }, 20);
        };
      })()
  );

  $("#ui-activity-add_back1").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-entry"] );
          }, 20);
        };
      })()
  );

  $("#ui-activity-add_add").click(
      (function(x) {
        return function() {
          var active_img = appData.icon.action.add.img.active;
          $("#ui-activity-add_add").attr("src", active_img);
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-entry"] );
            $("#ui-activity-add_add").attr("src", appData.icon.action.add.img.inactive);
          }, 20);
        };
      })()
  );

  $("#ui-activity-add_confirm").click(
      (function(x) {
        return function() {
          var active_img = appData.icon.action.confirm.img.active;
          $("#ui-activity-add_confirm").attr("src", active_img);
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-entry"] );
            $("#ui-activity-add_confirm").attr("src", appData.icon.action.confirm.img.inactive);
          }, 200);
        };
      })()
  );

  //---

  $("#ui-mood-daily_config").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-config"] );
          }, 20);
        };
      })()
  );

  $("#ui-mood-daily_about").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-about"] );
          }, 20);
        };
      })()
  );

  //---

  $("#ui-config_back").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-timeline"] );
          }, 20);
        };
      })()
  );

  $("#ui-config_about").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-about"] );
          }, 20);
        };
      })()
  );

  //---

  $("#ui-timeline_config").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-config"] );
          }, 20);
        };
      })()
  );

  $("#ui-timeline_stats").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-stats"] );
          }, 200);
        };
      })()
  );

  $("#ui-timeline_calendar").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            uiData.calendar.refresh();
            Reveal.slide( uiData.pageIndex["ui-calendar"] );
          }, 20);
        };
      })()
  );

  $("#ui-stats_back").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-timeline"] );
          }, 20);
        };
      })()
  );

  $("#ui-calendar_back").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-timeline"] );
          }, 20);
        };
      })()
  );

  //---

  $("#ui-about_back").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-timeline"] );
          }, 20);
        };
      })()
  );



}

function uiTimeline(f) {
  var x = document.getElementById("ui-timeline_start-end-display");

  if (uiData.timeline.display) {
    x.style.display = 'none';
    uiData.timeline.display = false;
  }
  else {
    x.style.display = 'block';
    uiData.timeline.display = true;
  }

  Reveal.sync();
  handleSlideScrolling(Reveal.getCurrentSlide());
}

function populateTestDB() {
  var today = moment().format("YYYY-MM-DD");
  var tok = today.split("-");
  var today_yr = parseInt(tok[0]);
  var today_mo = parseInt(tok[1]);
  var today_dy = parseInt(tok[2]);

  var db = appData.db_ctx.db;

  var mood_choice = ["mood-0", "mood-1", "mood-2", "mood-3", "mood-4"];
  var activity_choice = [];
  for (var icon_id in appData.icon.activity) {
    activity_choice.push(appData.icon.activity[icon_id].activity_id);
  }


  console.log(today);
  for (var mo=1; mo<=today_mo; mo++) {
    var max_day = 28;
    if (mo == today_mo) { max_day = today_dy; }

    for (var dy=1; dy<=max_day; dy++) {

      var uuid = uuidv4();
      var mood = mood_choice[ Math.floor(Math.random()*(mood_choice.length)) ];
      var n_a = Math.floor(Math.random()*5);
      var activity_ids = [];
      for (var jj=0; jj<n_a; jj++) {
        activity_ids.push(activity_choice[ Math.floor(Math.random()*activity_choice.length) ]);
      }
      var note = "test " + mo + "_" + dy;

      var str_mo = "" + mo;
      if (mo < 10) { str_mo = "0" + mo; }
      var str_day = "" + dy;
      if (dy < 10) { str_day = "0" + dy; }
      var dt = today_yr + "-" + str_mo + "-" + str_day;

      db.run("insert into entry (mood, activity, note, entry_date, uuid) values(?,?,?,?,?)",
          [ mood, activity_ids.join(","), note, dt, uuid ]);

    }
  }

  saveDBToLocalStorage( appData.db_ctx.db_name, appData.db_ctx.db );
}

function populateDefaultDB() {
  var db = appData.db_ctx.db;

  var icons = appData.icon.activity;
  for (var icon_id in icons) {
    var vals = [ icons[icon_id].activity_id, icons[icon_id].name, icons[icon_id].icon_id , icons[icon_id].type];
    db.run("insert into activity (activity_id, name, icon_id, type) values (?, ?, ?, ?)", vals);
  }

  saveActivityOptionToDB();
}

function loadDBData() {
  var db = appData.db_ctx.db;
  var query_str = "select activity_id, icon_id, name, id from activity_convenient order by id asc";
  var ent = db.exec(query_str);

  if (ent.length==0) {
    console.log("ERROR: loadDBData: could not get activity_convenient");
    return;
  }

  appData.data.activity_option = [];
  for (var ii=0; ii<ent[0].values.length; ii++) {
    var act_id = ent[0].values[ii][0];
    var ico_id = ent[0].values[ii][1];
    var act_name = ent[0].values[ii][2];
    appData.data.activity_option.push({"activity_id":act_id, "icon_id":ico_id, "name":act_name});
  }

  populateActivityGrid(undefined, appData.data.activity_option);
  populateAddActivity();
}

function db_init(db_ctx) {

  appData.db_ctx = db_ctx;
  uiData.calendar.refresh();

  if (db_ctx.db_init) {
    console.log("db was init");
    populateDefaultDB();
  }

  loadDBData();

  ui_chartInit();
}

function ui_clickCreateEntry() {
  console.log("click create");
}

//---

function ui_chartMoodAverage(start_date,end_date) {

  var filter_str = " where 1 ";
  var filter_vals = [];
  if (typeof start_date !== "undefined") {
    filter_str += " and entry_date >= ? ";
    filter_vals.push(start_date);
  }

  if (typeof end_date !== "undefined") {
    filter_str += " and entry_date <= ? ";
    filter_vals.push(end_date);
  }

  var sqlstr = 
    "select mood mood, count(uuid) from entry " + filter_str + " group by mood";

  console.log(sqlstr);

  var db = appData.db_ctx.db;
  var res = db.exec(sqlstr, filter_vals);
  if ((!res) || (res.length==0)) { return; }

  console.log(res);

  var hash_data = {};
  for (var ii=0; ii<res[0].values.length; ii++) {
    var mood_id = res[0].values[ii][0];
    var freq = res[0].values[ii][1];
    hash_data[mood_id] = freq;
  }

  console.log(hash_data);
 
  var ui_chart = uiData.chart.mood_average;
  var chart_data = ui_chart.data;

  var bgc = [
    uiData["mood-color"]['mood-0'] + "a7",
    uiData["mood-color"]['mood-1'] + "a7",
    uiData["mood-color"]['mood-2'] + "a7",
    uiData["mood-color"]['mood-3'] + "a7",
    uiData["mood-color"]['mood-4'] + "a7"
  ];

  var labels = [ "horrible", "bad", "average", "good", "awesome" ];

  chart_data.datasets = [];

  var dat = [];
  var dat_bgc = [];
  var dat_label = [];
  for (var mood_idx=0; mood_idx<5; mood_idx++) {
    var mood_id = "mood-" + mood_idx;
    if (!(mood_id in hash_data)) { continue; }
    dat.push(hash_data[mood_id]);
    dat_bgc.push(bgc[mood_idx]);
    dat_label.push(labels[mood_idx]);
  }
  chart_data.datasets.push({"data":dat, "backgroundColor":dat_bgc});
  chart_data.labels = dat_label;

  ui_chart.update();

}

// Mood averaged over weekday (M,T,W,R,F,S,S)
//
function ui_chartWeekdayAverage( filter_mood ) {

  var filter_str = "";
  if (typeof filter_mood !== "undefined") {
    filter_str = " where mood in ('" + filter_mood.join("','") +  "') ";
  }
  var sqlstr = 
    "select mood mood, strftime('%w', entry_date) dow, count(uuid) from entry " + filter_str + " group by mood, dow";

  console.log(">>", sqlstr);

  var db = appData.db_ctx.db;
  //var res = db.exec("select mood mood, strftime('%w', entry_date) dow, count(uuid) from entry " + filter_str + " group by mood, dow");
  var res = db.exec(sqlstr);
  if ((!res) || (res.length==0)) { return; }

  console.log(res);

  var ds = [];

  var hash_data = {};
  for (var ii=0; ii<res[0].values.length; ii++) {
    var mood_id = res[0].values[ii][0];
    var dow = res[0].values[ii][1];
    var freq = res[0].values[ii][2];

    if (!(mood_id in hash_data)) { hash_data[mood_id] = {}; }
    if (!(dow in hash_data[mood_id])) { hash_data[mood_id][dow] = 0; }
    hash_data[mood_id][dow] += freq;
  }
 
  var ui_chart = uiData.chart.weekday_average;
  var chart_data = ui_chart.data;

  var bgc = [
    uiData["mood-color"]['mood-0'] + "a7",
    uiData["mood-color"]['mood-1'] + "a7",
    uiData["mood-color"]['mood-2'] + "a7",
    uiData["mood-color"]['mood-3'] + "a7",
    uiData["mood-color"]['mood-4'] + "a7"
  ];

  var mood_label = [
    "horrible",
    "bad",
    "ok",
    "good",
    "awesome"
  ];

  chart_data.labels = ["S", "M", "T", "W", "R", "F", "S"];
  chart_data.datasets = [];

  for (var mood_idx=0; mood_idx<5; mood_idx++) {
    var mood_id = "mood-" + mood_idx;
    if (!(mood_id in hash_data)) { continue; }
    var dat = {
      "label": mood_label[mood_idx],
      backgroundColor: bgc[mood_idx],
      data : []
    };

    for (var dow_idx=0; dow_idx<7; dow_idx++) {
      dat.data.push(hash_data[mood_id][dow_idx]);
    }

    chart_data.datasets.push(dat);

    console.log("pushing:", dat);

  }
  ui_chart.update();

}

function ui_chartMoodActivity(activities,start_date,end_date) {
  var filter_str = " where 1 ";
  var filter_vals = [];
  if (typeof start_date !== "undefined") {
    filter_str += " and entry_date >= ? ";
    filter_vals.push(start_date);
  }

  if (typeof end_date !== "undefined") {
    filter_str += " and entry_date <= ? ";
    filter_vals.push(end_date);
  }

  var sqlstr = 
    "select mood mood, activity from entry " + filter_str + " ";

  var db = appData.db_ctx.db;
  var res = db.exec(sqlstr, filter_vals);
  if ((!res) || (res.length==0)) { return; }


  var moodval_lookup = { "mood-0":0, "mood-1":1, "mood-2":2, "mood-3":3, "mood-4":4 };

  var h_activity_rating = {};
  for (var ii=0; ii<res[0].values.length; ii++) {
    var mood_id = res[0].values[ii][0];
    var activity_str = res[0].values[ii][1];
    var act = activity_str.split(",");

    if (activity_str == "") {
      act = ["_"];
    }



    for (var jj=0; jj<act.length; jj++) {
      if (!(act[jj] in h_activity_rating)) {
        h_activity_rating[act[jj]] = [];
      }
      h_activity_rating[act[jj]].push( moodval_lookup[mood_id] );
    }
  }

  console.log(h_activity_rating);

  var activity_score = [];
  var labels = [];
  for (var activity in h_activity_rating) {
    var s = bayesian_approximation(h_activity_rating[activity]);
    var u = bayesian_approximation_uncertainty(h_activity_rating[activity]);
    activity_score.push({"activity_id":activity, "score":s, "u":u});
    labels.push(activity);
  }
  console.log(activity_score);


  var ui_chart = uiData.chart.mood_average;
  var chart_data = ui_chart.data;

  return;

  /*
  var bgc = [
    uiData["mood-color"]['mood-0'] + "a7",
    uiData["mood-color"]['mood-1'] + "a7",
    uiData["mood-color"]['mood-2'] + "a7",
    uiData["mood-color"]['mood-3'] + "a7",
    uiData["mood-color"]['mood-4'] + "a7"
  ];
  */

  //var labels = [ "horrible", "bad", "average", "good", "awesome" ];

  chart_data.datasets = [];

  var dat = [];
  var dat_bgc = [];
  var dat_label = [];
  for (var mood_idx=0; mood_idx<5; mood_idx++) {
    var mood_id = "mood-" + mood_idx;
    if (!(mood_id in hash_data)) { continue; }
    dat.push(hash_data[mood_id]);
    dat_bgc.push(bgc[mood_idx]);
    dat_label.push(labels[mood_idx]);
  }
  chart_data.datasets.push({"data":dat, "backgroundColor":dat_bgc});
  chart_data.labels = dat_label;

  ui_chart.update();


}

function ui_chartMonth() {
}

function ui_chartInit() {
  var ele, ctx, ui_chart;

  ele = _gebi("ui-chart_week-average");
  ctx = ele.getContext('2d');
  ui_chart = new Chart(ctx, {
    type: 'bar',
    'min':0,
    data: {
      labels: ["S", "M", "T", "W", "R", "F", "S"],
      datasets: [ ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: { beginAtZero: true }
        }]
      }
    }

  });
  uiData.chart.weekday_average = ui_chart;

  //--

  ele = _gebi("ui-chart_mood-average");
  ctx = ele.getContext('2d');
  ui_chart = new Chart(ctx, {
    type: 'doughnut',
    'min':0,
    data: {
      datasets: [],
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Mood'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });
  uiData.chart.mood_average = ui_chart;


  //--

  ele = _gebi("ui-chart_mood-activity");
  ctx = ele.getContext('2d');
  ui_chart = new Chart(ctx, {
    type: 'bar',
    'min':0,
    data: { labels: [], datasets: [] },
    options: {
      scales: {
        yAxes: [{
          ticks: { beginAtZero: true }
        }]
      }
    }

  });
  uiData.chart.mood_activity = ui_chart;


  // update charts
  //

  ui_chartWeekdayAverage();
  ui_chartMoodAverage();
  ui_chartMoodActivity()
}

//---

function ui_init() {

  // More info about config & dependencies:
  // - https://github.com/hakimel/reveal.js#configuration
  // - https://github.com/hakimel/reveal.js#dependencies
  //
  Reveal.initialize({
    width: '100%',
    height: '100%',
    hash: false,
    controls: false,
    progress: false,
    history: false,
    dependencies: [ ]
  });

  var activity_option = appData.data.activity_option;

  populateActivityGrid(undefined, activity_option);
  populateAddActivity();

  _setup_callbacks();

  appData.data.activeEntry.entry_uuid = uuidv4();
  appData.data.activeEntry.state = "daily"; 


  // import functionality
  //
  var ul_fn = document.getElementById("ui_import_db");
  ul_fn.onchange = function() {
    var ul_fn = document.getElementById("ui_import_db");
    var f = ul_fn.files[0];
    var r = new FileReader();
    r.onload = function() {
      var ctx = appData.db_ctx;
      if (!ctx) {
        console.log("ERROR: DB import: could not find DB ctx");
        return;
      }
      var ab = new Uint8Array(r.result);
      var db = new ctx.SQL.Database(ab);
      ctx.db = db;
    };
    r.readAsArrayBuffer(f);
  };

  // calendar
  //
  var cal = new jsCalendar("#ui-calendar_calendar");
  cal.onDateRender( calendarDayCallback );
  cal.onDateClick( calendarDayClickCallback );
  uiData.calendar = cal;

  var cal = new jsCalendar("#ui-timeline_start-calendar");
  cal.onDateClick( function(ele, date, info) {
    var start_img = "<img id='ui-timeline_end' src='asset/start.svg' style='opacity:0.5; width:3vw;' >"

    var dt_iso = date.toISOString();
    var dt_a = iso_date_tokenize(dt_iso);
    var ymd = dt_a[0] + "-" + dt_a[1] + "-" + dt_a[2];
    var x = document.getElementById("ui-timeline_start-display");
    //x.innerHTML = ymd;
    x.innerHTML = " <div style='font-size:4vh; opacity:0.8;'>" + ymd + "</div>";

    appData.data.timeline.start = ymd;
    setupTimeline();
  });
  uiData.calendar_timeline_start = cal;

  var cal = new jsCalendar("#ui-timeline_end-calendar");
  cal.onDateClick( function(ele, date, info) {
    var end_img = "<img id='ui-timeline_end' src='asset/end.svg' style='opacity:0.5; width:3vw;' >"

    var dt_iso = date.toISOString();
    var dt_a = iso_date_tokenize(dt_iso);
    var ymd = dt_a[0] + "-" + dt_a[1] + "-" + dt_a[2];
    var x = document.getElementById("ui-timeline_end-display");
    //x.innerHTML = ymd;
    //x.innerHTML = " <div class='title' style='font-size:4vh; opacity:0.8;'>" + ymd + " " + end_img + "</div>";
    x.innerHTML = " <div style='font-size:4vh; opacity:0.8;'>" + ymd + " </div>";

    appData.data.timeline.end = ymd;
    setupTimeline();
  });
  uiData.calendar_timeline_end = cal;

}



(function ($) {
  $(document).ready(function() {
    ui_init();
  });
})(jQuery);
