var g_slideHeight = 800;

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
    "ui-config" : 6
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
      "icon-work": { "type":"standard", "id":"activity-050101", "icon_id":"icon-work", "img":{"active":"asset/activities-main/office-active.svg","inactive":"asset/activities-main/office.svg"} },
      "icon-friends": { "type":"standard", "id": "activity-120000",  "icon_id":"icon-friends", "img":{"active":"asset/activities-main/group-active.svg","inactive":"asset/activities-main/group.svg"} },
      "icon-date": { "type":"standard", "id": "activity-120100",  "icon_id":"icon-date", "img":{"active":"asset/activities-main/heart-active.svg","inactive":"asset/activities-main/heart.svg"} },
      "icon-read": { "type":"standard", "id": "activity-120312",  "icon_id":"icon-read", "img":{"active":"asset/activities-main/book-active.svg","inactive":"asset/activities-main/book.svg"} },
      "icon-game": { "type":"standard", "id": "activity-600058",  "icon_id":"icon-game", "img":{"active":"asset/activities-main/gamecontroller-active.svg","inactive":"asset/activities-main/gamecontroller.svg"} },
      "icon-shop": { "type":"standard", "id": "activity-070000",  "icon_id":"icon-shop", "img":{"active":"asset/activities-main/shoppingbag-active.svg","inactive":"asset/activities-main/shoppingbag.svg"} },
      "icon-meal": { "type":"standard", "id": "activity-110100",  "icon_id":"icon-meal", "img":{"active":"asset/activities-main/food-active.svg","inactive":"asset/activities-main/food.svg"} },
      "icon-clean": { "type":"standard", "id": "activity-020101",  "icon_id":"icon-clean", "img":{"active":"asset/activities-main/broom-active.svg","inactive":"asset/activities-main/broom.svg"} },
      //"icon-show": { "type":"standard", "id": "custom-show",    "icon_id":"icon-show", "img":{"active":"asset/activities-main/speaker-active.svg","inactive":"asset/activities-main/speaker.svg"} },
      //"icon-music": { "type":"standard", "id": "activity-music", "icon_id":"icon-music", "img":{"active":"asset/activities-main/music-active.svg","inactive":"asset/activities-main/music.svg"} },
      "icon-sleep": { "type":"standard", "id": "activity-010100","icon_id":"icon-sleep", "img":{"active":"asset/activities-main/sleep-active.svg","inactive":"asset/activities-main/sleep.svg"} },
      "icon-laundry": { "type":"standard", "id": "activity-020102",  "icon_id":"icon-laundry", "img":{"active":"asset/activities-main/laundry-active.svg","inactive":"asset/activities-main/laundry.svg"} },
      "icon-tv": { "type":"standard", "id": "activity-600025",  "icon_id":"icon-tv", "img":{"active":"asset/activities-main/tv-active.svg","inactive":"asset/activities-main/tv.svg"} },
      //"icon-movie": { "type":"standard", "id": "custom-movie",     "icon_id":"icon-movie", "img":{"active":"asset/activities-main/movie-active.svg","inactive":"asset/activities-main/movie.svg"} },
      //"icon-medication": { "type":"standard", "id": "custom-medication","icon_id":"icon-meds", "img":{"active":"asset/activities-main/pill-active.svg","inactive":"asset/activities-main/pill.svg"} }

      // custom activities
      //
      "icon-book": { "type":"custom", "id":"custom-book", "icon_id":"icon-book", "img":{"active":"asset/activities-custom/book-active.svg", "inactive":"asset/activities-custom/book.svg" } },
      "icon-briefcase": { "type":"custom", "id":"custom-briefcase", "icon_id":"icon-briefcase", "img":{"active":"asset/activities-custom/briefcase-active.svg", "inactive":"asset/activities-custom/briefcase.svg" } },
      "icon-broom": { "type":"custom", "id":"custom-broom", "icon_id":"icon-broom", "img":{"active":"asset/activities-custom/broom-active.svg", "inactive":"asset/activities-custom/broom.svg" } },
      "icon-calendar": { "type":"custom", "id":"custom-calendar", "icon_id":"icon-calendar", "img":{"active":"asset/activities-custom/calendar-active.svg", "inactive":"asset/activities-custom/calendar.svg" } },
      "icon-coffee1": { "type":"custom", "id":"custom-coffee1", "icon_id":"icon-coffee1", "img":{"active":"asset/activities-custom/coffee1-active.svg", "inactive":"asset/activities-custom/coffee1.svg" } },
      "icon-coffee": { "type":"custom", "id":"custom-coffee", "icon_id":"icon-coffee", "img":{"active":"asset/activities-custom/coffee-active.svg", "inactive":"asset/activities-custom/coffee.svg" } },
      "icon-fastfood": { "type":"custom", "id":"custom-fastfood", "icon_id":"icon-fastfood", "img":{"active":"asset/activities-custom/fastfood-active.svg", "inactive":"asset/activities-custom/fastfood.svg" } },
      "icon-food": { "type":"custom", "id":"custom-food", "icon_id":"icon-food", "img":{"active":"asset/activities-custom/food-active.svg", "inactive":"asset/activities-custom/food.svg" } },
      "icon-gamecontroller": { "type":"custom", "id":"custom-gamecontroller", "icon_id":"icon-gamecontroller", "img":{"active":"asset/activities-custom/gamecontroller-active.svg", "inactive":"asset/activities-custom/gamecontroller.svg" } },
      "icon-group": { "type":"custom", "id":"custom-group", "icon_id":"icon-group", "img":{"active":"asset/activities-custom/group-active.svg", "inactive":"asset/activities-custom/group.svg" } },
      "icon-heart": { "type":"custom", "id":"custom-heart", "icon_id":"icon-heart", "img":{"active":"asset/activities-custom/heart-active.svg", "inactive":"asset/activities-custom/heart.svg" } },
      "icon-internet": { "type":"custom", "id":"custom-internet", "icon_id":"icon-internet", "img":{"active":"asset/activities-main/wifi-active.svg","inactive":"asset/activities-main/wifi.svg"} },
      //"icon-laundry": { "type":"custom", "icon_id":"icon-laundry", "img":{"active":"asset/activities-custom/laundry-active.svg", "inactive":"asset/activities-custom/laundry.svg" } },
      "icon-luggage": { "type":"custom", "id":"custom-luggage", "icon_id":"icon-luggage", "img":{"active":"asset/activities-custom/luggage-active.svg", "inactive":"asset/activities-custom/luggage.svg" } },
      "icon-medication": { "type":"custom", "id":"custom-medication", "icon_id":"icon-medication", "img":{"active":"asset/activities-main/pill-active.svg","inactive":"asset/activities-main/pill.svg"} },
      "icon-movie": { "type":"custom", "id":"custom-movie", "icon_id":"icon-movie", "img":{"active":"asset/activities-custom/movie-active.svg", "inactive":"asset/activities-custom/movie.svg" } },
      "icon-music": { "type":"custom", "id":"custom-music", "icon_id":"icon-music", "img":{"active":"asset/activities-custom/music-active.svg", "inactive":"asset/activities-custom/music.svg" } },
      "icon-office": { "type":"custom", "id":"custom-office", "icon_id":"icon-office", "img":{"active":"asset/activities-custom/office-active.svg", "inactive":"asset/activities-custom/office.svg" } },
      "icon-pill": { "type":"custom", "id":"custom-pill", "icon_id":"icon-pill", "img":{"active":"asset/activities-custom/pill-active.svg", "inactive":"asset/activities-custom/pill.svg" } },
      "icon-shoppingbag": { "type":"custom", "id":"custom-shoppingbang", "icon_id":"icon-shoppingbag", "img":{"active":"asset/activities-custom/shoppingbag-active.svg", "inactive":"asset/activities-custom/shoppingbag.svg" } },
      "icon-show": { "type":"custom", "id":"custom-show", "icon_id":"icon-show", "img":{"active":"asset/activities-main/speaker-active.svg","inactive":"asset/activities-main/speaker.svg"} },
      //"icon-sleep": { "type":"custom", "icon_id":"icon-sleep", "img":{"active":"asset/activities-custom/sleep-active.svg", "inactive":"asset/activities-custom/sleep.svg" } },
      "icon-speaker": { "type":"custom", "id":"custom-speaker", "icon_id":"icon-speaker", "img":{"active":"asset/activities-custom/speaker-active.svg", "inactive":"asset/activities-custom/speaker.svg" } },
      "icon-sports": { "type":"custom", "id":"custom-sports", "icon_id":"icon-sports", "img":{"active":"asset/activities-custom/sports-active.svg", "inactive":"asset/activities-custom/sports.svg" } },
      //"icon-tv": { "type":"custom", "icon_id":"icon-tv", "img":{"active":"asset/activities-custom/tv-active.svg", "inactive":"asset/activities-custom/tv.svg" } },
      "icon-wifi": { "type":"custom", "id":"custom-wifi", "icon_id":"icon-wifi", "img":{"active":"asset/activities-custom/wifi-active.svg", "inactive":"asset/activities-custom/wifi.svg" } }

    }

  }
};


function _click() {
  console.log("ok");
  return false;
}

// --
// --

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
    if (activity_id == act_icon_obj[x].id) {
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
}

// --


function populateAddActivity(activity_list_id) {
  //if (typeof activity_list_id === "undefined") { activity_list_id = "activity-daily-add-activity-grid"; }
  if (typeof activity_list_id === "undefined") { activity_list_id = "ui-activity-add-activity-grid"; }
  //if (typeof activity_list_id === "undefined") { activity_list_id = "ui-entry-activity-grid"; }

  var add_activity_order = [];
  for (var icon_id in appData.icon.activity) {
    add_activity_order.push(icon_id);
  }


  // we replace the whole grid with a new one contructed below
  //
  old_activity_list = document.getElementById(activity_list_id);

  activity_list = document.createElement("div");
  activity_list.className = "ui divided items";
  activity_list.style = "background:#eeffee;";

  //for (var ii=0; ii<appData.icon.activity.custom.length; ii++) {
  for (var ii=0; ii<add_activity_order.length; ii++) {

    var icon_id = add_activity_order[ii];

    var activity_icon = appData.icon.activity[icon_id];

    //var custom_entry = appData.icon.activity.custom[ii];
    var custom_entry = activity_icon;
    var custom_img = custom_entry.img;

    var item = document.createElement("div");
    item.className = "item";

    var div_img = document.createElement("div");
    div_img.className = "ui tiny image";
    var img = document.createElement("img");
    img.src = custom_img.inactive;
    div_img.appendChild(img);

    var div_content = document.createElement("div");
    div_content.className = "middle aligned tiny content";

    //var div_content_header = document.createElement("div");
    //div_content_header.className = "header";
    //div_content_header.innerHTML = "2020-01-02 10:03";

    var div_content_description = document.createElement("div");
    div_content_description.className = "description";
    div_content_description.style = "font-size:10vh;";
    div_content_description.innerHTML = "hello";

    var div_content_description_button = document.createElement("div");
    div_content_description_button.className = "ui right floated secondary button";
    div_content_description_button.style = "background:none;";
    var _img = document.createElement("img");
    _img.src = "asset/action/minus.svg";
    _img.style = "height:10vh;";
    div_content_description_button.appendChild(_img);

    div_content_description.appendChild(div_content_description_button);

    //div_content.appendChild(div_content_header);
    div_content.appendChild(div_content_description);

    item.appendChild(div_img);
    item.appendChild(div_content);

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

  console.log("???", grid_id, old_grid_ad);

  grid_ad = document.createElement('div');
  grid_ad.id = grid_id;
  grid_ad.className = "ui five column grid";
  grid_ad.align = "center";
  grid_ad.style = "width:100%; ";
  var row_ele_count=0;
  //for (var ii=0; ii<appData.icon.activity.standard.length; ii++) {
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

    //var img_id = grid_id + "_" + appData.icon.activity.standard[ii].id;
    var img_id = grid_id + "_" + activity_id

    var img = document.createElement('img');

    //img.src = appData.icon.activity.standard[ii].img.inactive;
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

    //var img_id = grid_id + ":" + appData.icon.mood[mood_id].id;
    var img_id = grid_id + "_" + appData.icon.mood[mood_id].id;
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
  if (event.previousSlide) {
    resetSlideScrolling(event.previousSlide);
  }
  handleSlideScrolling(event.currentSlide);

  var x = event.currentSlide;
  console.log(event.currentSlide, event.indexv, event.indexh);

  // timeline
  if (event.indexh == 3) {
    setupTimeline();
  }
});

// ---
// ---
//

function confirmEdit(info) {
  console.log("confirmEdit:", info);

  var ele;


  //ele = document.getElementById("activity-daily_note");
  ele = document.getElementById("ui-entry_note");
  console.log("note:", ele.value);
  console.log(">>>", appData.data.activeEntry);

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

  console.log("DEBUG: adding:", entry_row);

  insertEntry(entry_row);
}

function _set_mood(ui_id) {
}

// toggle mood icon
//
function ui_onClickMood(ui_moodId) {
  var active_entry = appData.data.activeEntry;

  console.log(ui_moodId);

  var tok = ui_moodId.split("_");
  var mood_page_id = tok[0];
  var mood_val = tok[1];

  var mood_icon_ele = {};
  var mood_icon = appData.icon.mood;
  if (mood_val in mood_icon) {
    mood_icon_ele = mood_icon[mood_val];
  }
  else { return; }

  console.log("DEBUG:", ui_moodId, active_entry.mood);

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
    if (aicon[ii].id == activityId) {
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
    if (appData.icon.activity[x].id == activity_id) {
      return appData.icon.activity[x];
    }
  }
  return null;
}

function _activity_icon_img(activity_id) {
  for (var x in appData.icon.activity) {
    if (appData.icon.activity[x].id == activity_id) {
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
  var ent = db.exec("select uuid, user_uuid, mood, activity, note, entry_date, modified_date from capricy_entry where uuid = ?", [uuid]);
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
    appData.data.activeEntry.activity.push(a[ii]);
  }

  appData.data.activeEntry.state = "edit";
}

function setupTimeline() {

  var db = g_ctx.db;

  var ent = db.exec("select mood, activity, note, entry_date, uuid from capricy_entry order by entry_date desc");
  if (ent.length == 0) { return; }

  var dedup_row = [];
  var seen_uuid = {};
  for (var ii=0; ii<ent[0].values.length; ii++) {
    var db_uuid = ent[0].values[ii][4];
    if (db_uuid in seen_uuid) { continue; }
    seen_uuid[db_uuid] = true;
    dedup_row.push(ent[0].values[ii]);


  }

  var ui_entry_list = _gebi("ui-timeline_entry-list");
  ui_entry_list.innerHTML = "";
  //for (var ii=0; ii<ent[0].values.length; ii++) {
  for (var ii=0; ii<dedup_row.length; ii++) {

    /*
    var db_mood       = ent[0].values[ii][0];
    var db_activity   = ent[0].values[ii][1];
    var db_note       = ent[0].values[ii][2];
    var db_entry_date = ent[0].values[ii][3];
    var db_uuid       = ent[0].values[ii][4];
    */

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
        var hdr = _div(["header"], "font-size:7vh;");
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
          var im = _img("asset/noun_edit_2490873.svg", "height:10vh;");
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

  for (var ii=0; ii<ae.activity.length; ii++) {
    var aid = ae.activity[ii];
    var icon_info = _activity_icon(aid);
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

function calendarDayCallback(date, ele, info) {
  var dt_iso = date.toISOString();
  var dt_a = iso_date.tokenize(dt_iso);

  var ymd = dt_a[0] + "-" + dt_a[1] + "-" + dt_a[2];

  var row = g_ctx.db.exec("select entry_date, mood from capricy_entry where date(entry_date) = ?", ymd);
  if (row.length == 0) { return; }

  var mood = row[0].values[1];

  if (info.isCurrentMonth) {
    var r = Math.floor(6*Math.random());
    if (r!=5) {
      ele.style["border-radius"] = "50%";
      if (r==0) { ele.style["background-color"] = 'rgb(255,127,122,0.5)'; }
      if (r==1) { ele.style["background-color"] = '#61cb9b77'; }
      if (r==2) { ele.style["background-color"] = '#d6c33f77'; }
      if (r==3) { ele.style["background-color"] = '#387db377'; }
      if (r==4) { ele.style["background-color"] = '#21496977'; }
    }
  }

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
          var active_img = appData.icon.action.back.img.active;
          $("#ui-activity-add_back").attr("src", active_img);
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-entry"] );
            $("#ui-activity-add_back").attr("src", appData.icon.action.back.img.inactive);
          }, 200);
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
          }, 200);
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
          }, 200);
        };
      })()
  );

  $("#ui-config_back").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-timeline"] );
          }, 200);
        };
      })()
  );

  $("#ui-timeline_config").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-config"] );
          }, 200);
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
            Reveal.slide( uiData.pageIndex["ui-calendar"] );
          }, 200);
        };
      })()
  );

  $("#ui-stats_back").click(
      (function(x) {
        return function() {
          setTimeout( function() {
            Reveal.slide( uiData.pageIndex["ui-timeline"] );
          }, 200);
        };
      })()
  );



}

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
      var ab = new Uint8Array(r.result);
      var db = new g_ctx.SQL.Database(ab);
      g_ctx.db = db;
    };
    r.readAsArrayBuffer(f);
  };

  // calendar
  //

  var cal = new jsCalendar("#ui-calendar_calendar");
  /*
  cal.colorfulSelect("13/05/2020", 'rgb(255,127,122,0.5)')
  cal.colorfulSelect("12/05/2020", '#61cb9b77')
  cal.colorfulSelect("11/05/2020", '#d6c33f77')
  cal.colorfulSelect("10/05/2020", '#387db377')
  cal.colorfulSelect("09/05/2020", '#21496977')
  */

  cal.onDateRender( calendarDayCallback );
  g_ctx.calendar = cal;
}



(function ($) {
  $(document).ready(function() {
    ui_init();
  });
})(jQuery);
