
// things to consider to tailor the activities
// year-of-birth (age)
// gender
// region (zip? timezone?)
// married
// employed
// ---
//
// religious
// 420
// medication

// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
//
function b64enc(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}

function b64dec(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}


var uiData = {
  "pageTransitionDelay" : 200,
  "focus" : "",
  "calendar" : {},
  "calendarModal": {},
  "timelineModal": {}
};

var appData = {
  "data" : {

    "activeEntry" : {
      "uuid": null,
      "entryDate": 0,
      "modifiedDate": 0,
      "state":"none",
      "mood": null,
      "activity" : [],
      "note":""
    },

    "log" : {

      /*
      "xxx1" : {
        "entryDate": "2018-07-23 03:44.00 UTC",
        "history": [ { "2018-07-23 03:44.00" : "m2;a050101,a600058,cmovie,cmedication;d2018-07-23 03:44.00 UTC" } ],
        "mood":"mood-3",
        "activity":["activity-050101", "activity-600058","custom-movie","custom-medication"]
      },

      "xxx0" : {
        "entryDate": "2018-07-22 15:00.00 UTC",
        "history": [ { "2018-07-22 03:44.00" : "m2;a050101,a600058,cmedication;d2018-07-22 15:00.00 UTC" } ],
        "mood":"mood-3",
        "activity":["activity-050101", "activity-600058","custom-medication"]
      }
      */

    },

    "activity" : {
    },

    "custom-activity": {
    },

    "survey": {
    },

    "config" : {
    }

  },

  "default": {
    "activity": [
      { "id": "activity-050101",  "name": "work" },
      { "id": "activity-120300",  "name": "relax" },
      { "id": "activity-120000",  "name": "friends" },
      { "id": "activity-120100",  "name": "date" },
      { "id": "activity-120312",  "name": "reading" },
      { "id": "activity-600058",  "name": "gaming" },
      { "id": "activity-070000",  "name": "shopping" },
      { "id": "activity-180000",  "name": "travel" },
      { "id": "activity-110100",  "name": "meal" },
      { "id": "activity-020101",  "name": "cleaning" },
      { "id": "activity-600016", "name": "school" },

      { "id": "custom-show",    "name": "show" },
      { "id": "custom-internet","name": "internet" },
      { "id": "activity-music", "name": "music" },
      { "id": "activity-010100","name": "sleep" },

      { "id": "activity-020102",  "name": "laundry" },
      { "id": "activity-600025",  "name": "tv" },
      { "id": "custom-movie",     "name": "movie" },
      { "id": "custom-medication","name": "medication" }
    ],

    "config": {
    }

  },

  "icon" : {

    "mood" : {
      "mood-0": { "id":"mood-0", "name":"horrbile", "img": { "active": "asset/mood/face-horrible-color-active.svg", "inactive":"asset/mood/face-horrible-color.svg" } },
      "mood-1": { "id":"mood-1", "name":"sad",      "img": { "active": "asset/mood/face-sad-color-active.svg",      "inactive":"asset/mood/face-sad-color.svg" } },
      "mood-2": { "id":"mood-2", "name":"average",  "img": { "active": "asset/mood/face-average-color-active.svg",  "inactive":"asset/mood/face-average-color.svg" } },
      "mood-3": { "id":"mood-3", "name":"happy",    "img": { "active": "asset/mood/face-happy-color-active.svg",    "inactive":"asset/mood/face-happy-color.svg" } },
      "mood-4": { "id":"mood-4", "name":"awesome",  "img": { "active": "asset/mood/face-awesome-color-active.svg",  "inactive":"asset/mood/face-awesome-color.svg" } }
    },

    "action": {
      "confirm": { "id":"action-0", "name":"confirm",  "img":{ "active": "asset/action/checkmark-active.svg", "inactive":"asset/action/checkmark.svg" } },
      "cancel":  { "id":"action-1", "name":"cancel",   "img":{ "active": "asset/action/cancel-active.svg",    "inactive":"asset/action/cancel.svg" } },
      "add":     { "id":"action-2", "name":"add",      "img":{ "active": "asset/action/plus-active.svg",      "inactive":"asset/action/plus.svg" } },
      "subtract":{ "id":"action-3", "name":"subtract", "img":{ "active": "asset/action/minus-active.svg",     "inactive":"asset/action/minus.svg" } }
    },

    "activity": {
      "main": [
        { "id":"activity-050101", "name":"work", "img":{"active":"asset/activities-main/office-active.svg","inactive":"asset/activities-main/office.svg"} },
        { "id": "activity-120000",  "name": "friends", "img":{"active":"asset/activities-main/group-active.svg","inactive":"asset/activities-main/group.svg"} },
        { "id": "activity-120100",  "name": "date", "img":{"active":"asset/activities-main/heart-active.svg","inactive":"asset/activities-main/heart.svg"} },
        { "id": "activity-120312",  "name": "reading", "img":{"active":"asset/activities-main/book-active.svg","inactive":"asset/activities-main/book.svg"} },
        { "id": "activity-600058",  "name": "gaming", "img":{"active":"asset/activities-main/gamecontroller-active.svg","inactive":"asset/activities-main/gamecontroller.svg"} },
        { "id": "activity-070000",  "name": "shopping", "img":{"active":"asset/activities-main/shoppingbag-active.svg","inactive":"asset/activities-main/shoppingbag.svg"} },
        { "id": "activity-110100",  "name": "meal", "img":{"active":"asset/activities-main/food-active.svg","inactive":"asset/activities-main/food.svg"} },
        { "id": "activity-020101",  "name": "cleaning", "img":{"active":"asset/activities-main/broom-active.svg","inactive":"asset/activities-main/broom.svg"} },
        { "id": "custom-show",    "name": "show", "img":{"active":"asset/activities-main/speaker-active.svg","inactive":"asset/activities-main/speaker.svg"} },
        { "id": "custom-internet","name": "internet", "img":{"active":"asset/activities-main/wifi-active.svg","inactive":"asset/activities-main/wifi.svg"} },
        { "id": "activity-music", "name": "music", "img":{"active":"asset/activities-main/music-active.svg","inactive":"asset/activities-main/music.svg"} },
        { "id": "activity-010100","name": "sleep", "img":{"active":"asset/activities-main/sleep-active.svg","inactive":"asset/activities-main/sleep.svg"} },
        { "id": "activity-020102",  "name": "laundry", "img":{"active":"asset/activities-main/laundry-active.svg","inactive":"asset/activities-main/laundry.svg"} },
        { "id": "activity-600025",  "name": "tv", "img":{"active":"asset/activities-main/tv-active.svg","inactive":"asset/activities-main/tv.svg"} },
        { "id": "custom-movie",     "name": "movie", "img":{"active":"asset/activities-main/movie-active.svg","inactive":"asset/activities-main/movie.svg"} },
        { "id": "custom-medication","name": "medication", "img":{"active":"asset/activities-main/pill-active.svg","inactive":"asset/activities-main/pill.svg"} }
      ],

      "_main" : {
        "activity-050101" : {  "id": "activity-050101" , "name":"work", "img":{"active":"asset/activities-main/office-active.svg","inactive":"asset/activities-main/office.svg"} },
        "activity-120000" : {  "id":  "activity-120000" ,  "name": "friends", "img":{"active":"asset/activities-main/group-active.svg","inactive":"asset/activities-main/group.svg"} },
        "activity-120100" : {  "id":  "activity-120100" ,  "name": "date", "img":{"active":"asset/activities-main/heart-active.svg","inactive":"asset/activities-main/heart.svg"} },
        "activity-120312" : {  "id":  "activity-120312" ,  "name": "reading", "img":{"active":"asset/activities-main/book-active.svg","inactive":"asset/activities-main/book.svg"} },
        "activity-600058" : {  "id":  "activity-600058" ,  "name": "gaming", "img":{"active":"asset/activities-main/gamecontroller-active.svg","inactive":"asset/activities-main/gamecontroller.svg"} },
        "activity-070000" : {  "id":  "activity-070000" ,  "name": "shopping", "img":{"active":"asset/activities-main/shoppingbag-active.svg","inactive":"asset/activities-main/shoppingbag.svg"} },
        "activity-110100" : {  "id":  "activity-110100" ,  "name": "meal", "img":{"active":"asset/activities-main/food-active.svg","inactive":"asset/activities-main/food.svg"} },
        "activity-020101" : {  "id":  "activity-020101" ,  "name": "cleaning", "img":{"active":"asset/activities-main/broom-active.svg","inactive":"asset/activities-main/broom.svg"} },
        "custom-show" : {  "id":  "custom-show" ,    "name": "show", "img":{"active":"asset/activities-main/speaker-active.svg","inactive":"asset/activities-main/speaker.svg"} },
        "custom-internet" : {  "id":  "custom-internet" ,"name": "internet", "img":{"active":"asset/activities-main/wifi-active.svg","inactive":"asset/activities-main/wifi.svg"} },
        "activity-music" : {  "id":  "activity-music" , "name": "music", "img":{"active":"asset/activities-main/music-active.svg","inactive":"asset/activities-main/music.svg"} },
        "activity-010100" : {  "id":  "activity-010100" ,"name": "sleep", "img":{"active":"asset/activities-main/sleep-active.svg","inactive":"asset/activities-main/sleep.svg"} },
        "activity-020102" : {  "id":  "activity-020102" ,  "name": "laundry", "img":{"active":"asset/activities-main/laundry-active.svg","inactive":"asset/activities-main/laundry.svg"} },
        "activity-600025" : {  "id":  "activity-600025" ,  "name": "tv", "img":{"active":"asset/activities-main/tv-active.svg","inactive":"asset/activities-main/tv.svg"} },
        "custom-movie" : {  "id":  "custom-movie" ,     "name": "movie", "img":{"active":"asset/activities-main/movie-active.svg","inactive":"asset/activities-main/movie.svg"} },
        "custom-medication" : {  "id":  "custom-medication" ,"name": "medication", "img":{"active":"asset/activities-main/pill-active.svg","inactive":"asset/activities-main/pill.svg"} }
      },

      "auxiliary": {
      },

      "custom" : {
      }

    }

  }
};

function lookupActivityEntry(activity_id) {
  //var atypes = ["main", "auxiliary", "custom"];
  var atypes = ["_main"];
  for (var a=0; a<atypes.length; a++) {
    var atype = atypes[a];

    if (activity_id in appData.icon.activity[atype]) {
      return appData.icon.activity[atype][activity_id];
    }

  }
  return undefined;
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

// ********************
// ********************
// ********************
// ********************

function logApp() {
  this.data = appData.data;
  this.defaultData = appData.defaultData;
  this.icon = appData.icon;
}

logApp.prototype.init = function() { }

// mood and activity are required.
// activity is a list, empty if no activities are set
//
//logApp.prototype.addEntry = function(mood, activity, entryDate, modifiedDate) {
logApp.prototype.addEntry = function(input) {
  if (typeof input === "undefined") { return; }

  var log_entry = {
    "active": true,
    "uuid": ((typeof input.uuid === "undefined") ? uuidv4() : input.uuid),
    "entryDate": ((typeof input.entryDate === "undefined") ? Date.now() : input.entryDate ),
    "modifiedDate": ((typeof input.modifiedDate === "undefined") ? Date.now() : input.modifiedDate ),
    "mood": input.mood,
    "activity": input.activity,
    "note": input.note
  };

  //var log_entry_copy = Object.assign({}, log_entry);
  //log_entry["history"] = [ log_entry_copy ];

  this.data.log[log_entry.uuid] = log_entry;

  this.flush();
}

logApp.prototype.debugPrintLog = function() {
  var log = this.data.log;
  for (var uuid in log) {
    console.log(uuid, log[uuid].active, log[uuid].entryDate, log[uuid].mood, JSON.stringify(log[uuid].activity), log[uuid].note);
  }
}

logApp.prototype.deleteEntry = function(uuid) {
  this.data.log[uuid].active = false;
}

logApp.prototype.filterUUID = function(start, end) {
  var log = this.data.log;
  var r = [];
  if (typeof start === "undefined") { start=0; }
  //if (typeof end === "undefined") { end = Date.now() + (24*60*60*1000); }
  for (var uuid in log) {
    //if ((start <= log[uuid].entryDate) && (log[uuid].entryDate <= end)) {
    if (start > log[uuid].entryDate) { continue; }
    if ((typeof end !== "undefined") && (log[uuid].entryDate > end)) { continue; }
    r.push(uuid);
  }
  return r;
}

logApp.prototype.load = function() {
  var logstr = window.localStorage.getItem("logData", JSON.stringify(this.data.log));

  if (logstr === null) {
    logstr = "{}";
  }

  var obj = JSON.parse(logstr);
  this.data.log = obj;
  this.flush();
}

logApp.prototype.flush = function() {
  window.localStorage.setItem("logData", JSON.stringify(this.data.log));
}

// uuid is required
// mood, activity and entryDate, if undefed, will not be set
// modifiedDate will default to now (ms UTC) if undefined
//
logApp.prototype.editEntry = function(uuid, mood, activity, entryDate, modifiedDate) {
  if (typeof this.modifiedDate === "undefined") { modifiedDate = Date.now(); }

  if (!(uuid in this.log)) { return null; }

  var log_entry = {
    "uuid": uuid,
    "entryDate": this.data.log[uuid].entryDate, 
    "modifiedDate": this.data.log[uuid].modifiedDate,
    "activity": this.data.log[uuid].activity
  };

  if (typeof mood !== "undefined") { log_entry.mood = mood; }
  if (typeof activity !== "undefined") { log_entry.activity = activity; }
  if (typeof entryDate !== "undefined") { log_entry.entryDate = entryDate; }
  log_entry.modifiedDate = modifiedDate;

  var log_entry_copy = Object.assign({}, log_entry);
  this.data.log[uuid].history.push(log_entry_copy);
  this.data.log[uuid].mood = log_entry.mood;
  this.data.log[uuid].activity = log_entry.activity;
  this.data.log[uuid].entryDate = log_entry.entryDate;
  this.data.log[uuid].modifiedDate = log_entry.modifiedDate;

  this.flush();
}

logApp.prototype.findEntryByTime = function(t) {
  for (var uuid in this.data.log) {
    if (t === this.data.log[uuid].entryDate) {
      return uuid;
    }
  }
  return undefined;
}

logApp.prototype.getEntryDateRange = function(start, end, n) {
}

logApp.prototype.getEntryN = function(n, start) {
}

g_logapp = new logApp();

// ********************
// ********************
// ********************
// ********************

// only in edit pages?
//
function onClickMood(moodId, uiSubId) {
  if (typeof uiSubId === "undefined") { uiSubId = "daily"; }
  console.log("mood click", moodId , uiSubId);

  var ele = {};
  var micon = appData.icon.mood;
  if (moodId in appData.icon.mood) {
    ele = micon[moodId];

    console.log("found>>>", ele, "(", uiSubId, ")")
  }
  else {
    console.log("ERROR: onClickMood, could not find", moodId, uiSubId);
    return;
  }

  var ae = appData.data.activeEntry;
  if (ae.mood) {
    $("#" + ae.mood + '-' + uiSubId).attr("src", micon[ae.mood].img["inactive"]);
  }
  ae.mood = moodId;
  $("#" + moodId + "-" + uiSubId).attr("src", ele.img["active"]);

}

function onClickActivity(activityId, uiSubId) {
  if (typeof uiSubId === "undefined") { uiSubId = "daily"; }
  console.log("activity click", activityId, uiSubId);

  var ae = appData.data.activeEntry;

  var icon_state = "active";
  for (var ii=0; ii<ae.activity.length; ii++) {
    if (activityId == ae.activity[ii]) {
      icon_state = "inactive";
      break;
    }
  }
  if (icon_state == "inactive") {
    ae.activity.splice(ii,1);
  }
  else {
    ae.activity.push(activityId);
  }

  var aicon = appData.icon.activity.main;
  for (var ii=0; ii<aicon.length; ii++) {
    if (aicon[ii].id == activityId) {
      var ele = aicon[ii];

      console.log("found>>>", ele, icon_state)
      //$("#" + activityId + "-daily").attr("src", ele.img[icon_state]);
      $("#" + activityId + "-" + uiSubId).attr("src", ele.img[icon_state]);
    }
  }

  console.log(">>>", ae);
}

function populateMoodGrid(grid_id, uiSubId) {
  if (typeof grid_id === "undefined") { grid_id = "mood-grid"; }
  if (typeof uiSubId === "undefined") { uiSubId = "daily"; }

  old_grid_ad = document.getElementById(grid_id);
  grid_ad = document.createElement('div');
  grid_ad.className = "ui five column grid";
  grid_ad.align = "center";
  grid_ad.style = "width:400px; ";
  grid_ad.id = old_grid_ad.id;

  var row = document.createElement("div");
  row.className = "row";
  for (var ii=0; ii<5; ii++) {

    var mood_id = 'mood-' + ii.toString();

    var img = document.createElement('img');
    img.src = appData.icon.mood[mood_id].img.inactive;
    img.id = appData.icon.mood[mood_id].id + "-" + uiSubId;
    img.onclick = (function(x,y) {
       return function() { onClickMood(x,y); };
     })(appData.icon.mood[mood_id].id,uiSubId);
    img.ondragstart = (function(x,y) {
      return function() { onClickMood(x,y); return false; };
    })(appData.icon.mood[mood_id].id,uiSubId);

    var txtdiv = document.createElement("div");
    txtdiv.innerHTML= appData.icon.mood[mood_id].name;

    var celldiv = document.createElement("div");
    celldiv.className = "column";
    celldiv.appendChild(img);
    celldiv.appendChild(txtdiv);

    //console.log(">>>", img, txtdiv, celldiv);

    row.appendChild(celldiv);

  }

  grid_ad.appendChild(row);
  old_grid_ad.parentNode.replaceChild(grid_ad, old_grid_ad);
}


function populateActivityGrid(grid_id, uiSubId) {
  if (typeof grid_id === "undefined") { grid_id = "activity-grid"; }
  if (typeof uiSubId === "undefined") { uiSubId = "daily"; }

  var sztxt = '80%';

  var row = null;

  //old_grid_ad = document.getElementById('activity-grid');
  old_grid_ad = document.getElementById(grid_id);
  grid_ad = document.createElement('div');
  grid_ad.className = "ui five column grid";
  grid_ad.align = "center";
  grid_ad.style = "width:400px; ";
  var row_ele_count=0;
  for (var ii=0; ii<appData.icon.activity.main.length; ii++) {


    if ( (ii%5) == 0 ) {
      if (ii>0) { grid_ad.appendChild(row); }
      row = document.createElement("div");
      row.className = "row";
      row_ele_count=0;
    }

    var img = document.createElement('img');
    img.src = appData.icon.activity.main[ii].img.inactive;
    img.id = appData.icon.activity.main[ii].id + "-" + uiSubId;

    img.onclick = (function(x,y) {
      return function() { onClickActivity(x,y); };
    })(appData.icon.activity.main[ii].id,uiSubId);

    img.ondragstart = (function(x,y) {
      return function() { onClickActivity(x,y); return false; };
    })(appData.icon.activity.main[ii].id,uiSubId);

    var txtdiv = document.createElement("div");
    txtdiv.innerHTML= appData.icon.activity.main[ii].name;

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


// ****************************
// ****************************
// date helper functions

function deltaDayMs() {
  var d = new Date();
  var utc_midnight_ms = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Date.now() - utc_midnight_ms;
}

// https://stackoverflow.com/a/3552493
// by user https://stackoverflow.com/users/333255/marko
//
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function formatDateFromMs(ms) {
  return  formatDate( new Date(ms) );
}

//
// ****************************
// ****************************


// ****************************
// ****************************
// Edit entry management
//


function clearEditUI(uiSubId) {

  for (var moodid in appData.icon.mood) {
    $("#" + moodid + "-" + uiSubId).attr("src",
        appData.icon.mood[moodid].img.inactive);
  }

  for (var ii=0; ii<appData.icon.activity.main.length; ii++) {
    $("#" + appData.icon.activity.main[ii].id + "-" + uiSubId).attr("src",
        appData.icon.activity.main[ii].img.inactive);
  }

  $("#note-" + uiSubId).val("");

  $("#add-activity-" + uiSubId).attr("src",
      appData.icon.action["add"].img.inactive);
  $("#confirm-activity-" + uiSubId).attr("src",
      appData.icon.action["confirm"].img.inactive);
}

function populateEditUI(uuid, uiSubId) {
  console.log("not implemented");
}

function cmp_entryDate(_a, _b) {
  var a = g_logapp.data.log[_a];
  var b = g_logapp.data.log[_b];
  if (a.entryDate < b.entryDate) { return 1; }
  if (a.entryDate > b.entryDate) { return -1; }
  return 0;
}

function populateTimeline() {

  var a = g_logapp.filterUUID();
  console.log("before >>>", JSON.stringify(a));

  a.sort(cmp_entryDate);

  console.log("after >>>", JSON.stringify(a));

  var old_timeline = document.getElementById("timeline_entry_container");
  var timeline = document.createElement("div");
  timeline.id = old_timeline.id;
  for (var ii=0; ii<a.length; ii++) {

    var mood_entry = g_logapp.data.log[a[ii]];

    var card = document.createElement("div");
    card.className = "ui centered card";

    var card_content = document.createElement("div");
    card_content.className = "content";

    var card_img = document.createElement("img");
    card_img.className = "left floated mini ui image";

    console.log("cp0", ii, a[ii]);
    console.log(appData.icon.mood[mood_entry.mood]);


    card_img.src = appData.icon.mood[mood_entry.mood].img.active;
    card_img.setAttribute('draggable', 'false');
    //card_img.style = "opacity:0.8;";

    var d = new Date(mood_entry.entryDate);

    var card_header = document.createElement("div");
    card_header.className = 'header';
    card_header.innerHTML = d.toDateString();

    var activity_ele = [];
    for (var jj=0; jj<mood_entry.activity.length; jj++) {
      var activity_entry  = lookupActivityEntry(mood_entry.activity[jj]);
      activity_ele.push( "<img class='icon-tiny' src='" + activity_entry.img.inactive + "'></img> " + activity_entry.name );
    }

    var card_meta = document.createElement("div");
    card_meta.className = 'meta';

    card_meta.innerHTML = activity_ele.join(", ");


    var card_description = document.createElement("div");
    card_description.className = "description";
    card_description.innerHTML = mood_entry.note;

    card_content.appendChild(card_img);
    card_content.appendChild(card_header);
    card_content.appendChild(card_meta);
    card_content.appendChild(card_description);

    card.appendChild(card_content);

    timeline.appendChild(card);
  }

  old_timeline.parentNode.replaceChild(timeline, old_timeline);

}

function populateCalendar() {

  var cal = uiData.calendar;

  console.log(">>>", cal);

  var vizday = cal._getVisibleDates();
  var day_sec = 24*60*60*1000;

  for (var idx=0; idx<vizday.length; idx++) {
    var d = vizday[idx];
    var moods = g_logapp.filterUUID(d.getTime(), d.getTime() + day_sec);

    cal.unselect(d);
    if (moods.length > 0) {
      var uuid = moods[0];
      var entry = g_logapp.data.log[uuid];
      var mood_code = entry.mood.split("-")[1];
      cal.select(d, [{"className":"jsCalendar-selected-" + mood_code}]);

      console.log(">>> adding", d, mood_code);

    }
  }


}

function processCalendarClick(ev, dt) {
  var mydate = new Date(dt);

  console.log(">>>", ev, dt);
  console.log(">>>>", dt, "(", dt.getTime(), ")", "<<<<<");

  var uuid = g_logapp.findEntryByTime(dt.getTime());

  if (typeof uuid === "undefined") {
    console.log(">>> did not find...");

    var entry_date = dt.getTime();
    entry_date += deltaDayMs();
    createNewActiveEntry(entry_date, "edit-entry-1");

    console.log("entry_date:", entry_date);

    clearEditUI("1");

    $("#calendar-create-modal-header").html("Create entry for " + formatDate(dt) );
    uiData.calendarModal.modal('show');
  }

  // click on a date without entry, bring up modal to
  //   ask if you want to create a new entry
  // if entry already exists, go to timeline restricted
  //   for that dat.

}

function noteChange() {
  var ae = appData.data.activeEntry;
  ae.note = $(this).val();

  console.log("note>>>", ae.note);
}

function confirmEdit(ev) {
  console.log("config edit");

  console.log(JSON.stringify(appData.data.activeEntry));

  g_logapp.addEntry( appData.data.activeEntry );
}

//
// ****************************
// ****************************


function querySQLiteDatabase(query,inp) {
  var r = g_db.run(query, inp);

  // var res = db.exec("SELECT * FROM hello");
  // /*
  // [
  //  {columns:['a','b'], values:[[0,'hello'],[1,'world']]}
  //  ]
  //  */
  //

}

function initSQLiteDatabase() {
  var default_activity = [
    { "id": "activity-050101",  "name": "work" },
    { "id": "activity-120300",  "name": "relax" },
    { "id": "activity-120000",  "name": "friends" },
    { "id": "activity-120100",  "name": "date" },
    { "id": "activity-120312",  "name": "reading" },
    { "id": "activity-600058",  "name": "gaming" },
    { "id": "activity-070000",  "name": "shopping" },
    { "id": "activity-180000",  "name": "travel" },
    { "id": "activity-110100",  "name": "meal" },
    { "id": "activity-020101",  "name": "cleaning" },
    { "id": "activity-600016", "name": "school" },

    { "id": "custom-show",    "name": "show" },
    { "id": "custom-internet","name": "internet" },
    { "id": "activity-music", "name": "music" },
    { "id": "activity-010100","name": "sleep" },

    { "id": "activity-020102",  "name": "laundry" },
    { "id": "activity-600025",  "name": "tv" },
    { "id": "custom-movie",     "name": "movie" },
    { "id": "custom-medication","name": "medication" }
  ];
  var db = new SQL.Database();

  db.run("create table moodlog           (id integer, uuid text, " +
                                         "entry_utc_ms integer, mood_code integer, " +
                                         "activity text, note text)");
  db.run("create table moodloghistory    (id integer, " +
                                         "parent_id integer, modified_utc_ms integer, "+
                                         "uuid text, entry_utc_ms integer, mood_code integer, " +
                                         "activity text, note text)");

  db.run("create table mood(id integer, name text, description text)");
  db.run("create table activity(id integer, name text, description text, type text)");

  // for surveys and other data that isn't mood tracking
  //
  db.run("create table customdata        (id integer, entry_utc_ms integer, uuid text, " +
                                        "name text, description text, type text, data text)");
  db.run("create table customdatahistory (id integer, parent_id integer, " +
                                         "modified_utc_ms integer, entry_utc_ms integer, " +
                                         "uuid text, name text, description text, type text, " + 
                                         "data text)");

  db.run("create index moodlog_idx on moodlog (id);")
  db.run("create index moodlog_uuid_idx on moodlog (uuid);")
  db.run("create index moodlog_time_idx on moodlog (entry_utc_ms);")

  db.run("create index moodloghistory_idx  on moodloghistory (id);")
  db.run("create index moodloghistory_parent_idx on moodloghistory (parent_id);")

  for (var ii=0; ii<default_activity.length; ii++) {
    db.run("insert into activity values (?, ?, ?, ?)",
        [ii+1, default_activity[ii].id, default_activity[ii].name, "default"]);
  }


  return db;
}

var g_db;

function initApp() {

  var db = localStorage.getItem("sqliteDB");
  if (db === null) {
    //db = initSQLiteDatabase();
  }
  g_db = db;


  var ele = document.getElementById("calendar");
  //uiData.calendar = jsCalendar.new(ele);
  uiData.calendar = jsCalendar.new({
    "target":ele,
    "dayFormat":"DD",
    "monthFormat":"month YYYY"
  });
  uiData.calendar.showCurrentDay(false);
  uiData.calendar.onDateClick( processCalendarClick );


  //var hammer = Hammer(document.body);
  //hammer.on("swipe", function(x) { console.log("dragging...", x); });

  //----

  // stop dragable images from ruining experience
  //

  $('#mood-0').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-1').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-2').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-3').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-4').on('dragstart', function(event) { event.preventDefault(); });


  $('#confirm-activity-daily').on('dragstart', function(event) { event.preventDefault(); });
  $('#add-activity-daily').on('dragstart', function(event) { event.preventDefault(); });

  //----

  $('#mood-0-0').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-1-0').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-2-0').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-3-0').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-4-0').on('dragstart', function(event) { event.preventDefault(); });

  $('#confirm-activity-0').on('dragstart', function(event) { event.preventDefault(); });
  $('#add-activity-0').on('dragstart', function(event) { event.preventDefault(); });

  //--

  $('#mood-0-1').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-1-1').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-2-1').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-3-1').on('dragstart', function(event) { event.preventDefault(); });
  $('#mood-4-1').on('dragstart', function(event) { event.preventDefault(); });

  $('#confirm-activity-1').on('dragstart', function(event) { event.preventDefault(); });
  $('#add-activity-1').on('dragstart', function(event) { event.preventDefault(); });

  var ae = appData.data.activeEntry;
  ae.state = "mood-daily";
  ae.mood = null;
  ae.activity = [];

  populateActivityGrid();

  populateActivityGrid("edit-grid-0", "0");
  populateActivityGrid("edit-grid-1", "1");

  populateMoodGrid("mood-grid-0", "0");
  populateMoodGrid("mood-grid-1", "1");

  createNewActiveEntry();

  g_logapp.load();
}

var setupPage = {
  "timeline": populateTimeline,
  "calendar": populateCalendar
}

var pageTransition = function(toPage, transitionType, cb, delay) {

  if (toPage in setupPage) { setupPage[toPage](); }
  if (typeof delay === "undefined") { delay = uiData.pageTransitionDelay; }

  setTimeout( function() {

    uiData.focus = toPage;

    if ($(".screen").page().fetch(toPage) === null) {
      $(".screen").page().shake();
    } else {
      $(".screen").page().transition(toPage, transitionType);
    }
    if (typeof cb !== "undefined") { cb(); }
  }, delay);

  //}, uiData.pageTransitionDelay);

};

/*
function gotoTimeline(trans_style) {
  if (typeof trans_style === "undefined") {
    trans_style = "slide-in-from-bottom";
  }
  //setupPage["timeline"]();
  populateTimeline();
  pageTransition("timeline", trans_style);
}
*/

var g_modal;

(function ($) {
  $(document).ready(function () {

    var w = $(window).width();
    var h = $(window).height();

    var display = document.getElementById("device");

    /*
    initApp();

    var today_midnight = new Date();
    today_midnight.setUTCHours(0,0,0,0);

    if (g_logapp.filterUUID(today_midnight.getTime()).length > 0) {
      pageTransition("timeline", "slide-in-from-bottom");
      //$(".screen").page().transition("timeline", "none");
    } else {
      $(".screen").page().transition("mood-daily", "none");
    }
    */

    $(".screen").page();

    $(".screen .page .navigate").click(function (ev) {
      var page  = $(ev.target).attr("data-page-name");
      var trans = $(ev.target).attr("data-page-trans");

      console.log("???");

      pageTransition(page, trans);

      /*
      if ($(".screen").page().fetch(page) === null)
        $(".screen").page().shake();
      else
        $(".screen").page().transition(page, trans);
        */
    });

    $(".screen .page .navigate-delay").click(function (ev) {


      /*
      var mood_id = ev.currentTarget.id;
      var ele = appData.icon.mood[mood_id];

      var ae = appData.data.activeEntry;
      ae.state = "activity-daily";
      ae.mood = mood_id;
      ae.activity = [];

      $("#" + mood_id).attr("src", ele.img.active);

      var toPage = $(ev.target).attr("data-page-name");
      var trans = $(ev.target).attr("data-page-trans");
      */

      var parts = ev.currentTarget.id.split("-");
      var moodid = parts[0] + "-" + parts[1];

      onClickMood(moodid, "daily");

      var toPage = $(ev.target).attr("data-page-name");
      var trans = $(ev.target).attr("data-page-trans");
      pageTransition(toPage, trans);
    });

    $("#note-daily").on('change keyup paste', noteChange);
    $("#note-0").on('change keyup paste', noteChange);
    $("#note-1").on('change keyup paste', noteChange);

    $("#confirm-activity-0").click(function(ev) {
      confirmEdit();
      $("#confirm-activity-0").attr("src", appData.icon.action["confirm"].img.active);
      pageTransition("calendar", "slide-in-from-top",
          function() {
            setTimeout( function() {
              $("#confirm-activity-0").attr("src", appData.icon.action["confirm"].img.inactive);
            }, 200)
          });
    });

    $("#confirm-activity-1").click(function(ev) {
      confirmEdit();
      $("#confirm-activity-1").attr("src", appData.icon.action["confirm"].img.active);
      pageTransition("calendar", "slide-in-from-top",
          function() {
            setTimeout( function() {
              $("#confirm-activity-1").attr("src", appData.icon.action["confirm"].img.inactive);
            }, 200)
          });
    });

    $(".screen .page .navigate-activity-daily").click(function (ev) {

      var id = ev.currentTarget.id;

      if (id == "confirm-activity-daily") {
        var ele = appData.icon.action["confirm"];
        $("#confirm-activity-daily").attr("src", ele.img.active);

        var toPage = $(ev.target).attr("data-page-name");
        var trans = $(ev.target).attr("data-page-trans");

        confirmEdit();

        pageTransition(toPage,trans);
      }
      else if (id == "add-activity-daily") {
        var ele = appData.icon.action["add"];
        $("#add-activity-daily").attr("src", ele.img.active);
        var toPage = $(ev.target).attr("data-page-name");
        var trans = $(ev.target).attr("data-page-trans");

        pageTransition(
          toPage,
          trans,
          function() {
            setTimeout( function() { $("#add-activity-daily").attr("src", ele.img.inactive); }, 200);
          });
      }

    });

    $(".remove-button").click(function () {
      var id = $(".remove-input").val();
      $(".screen").page().remove(id);
    });
    $(".shake-button").click(function () {
      $(".screen").page().shake();
    });

    //var edit_entry_0 = $("#edit-entry-0");
    var edit_entry_1 = $("#edit-entry-1");
    console.log("edit-entry-1", edit_entry_1);

    uiData.calendarModal = $("#calendar-create-modal").modal({
      onApprove:
        function() {

          $("#edit-entry-1-title").html( formatDateFromMs(appData.data.activeEntry.entryDate) );

          // reset scroll to top. Works only when visible, so do it in the callback after
          // transition has started.
          //
          pageTransition("edit-entry-1",
              "slide-in-from-bottom",
              function () {
                var ee = document.getElementById("edit-entry-page-1");
                //ee.scrollTo(0,0);
              });
        },
      onDeny: function() { console.log("deny"); }
    });

    initApp();

    $("#nav-bottom-timeline").click(function() {
      $("#nav-bottom").children().children().removeClass('active');
      $("#nav-bottom-timeline").addClass('active');

      if (uiData.focus != "timeline") {
        pageTransition("timeline", "slide-in-from-left");
      }
    });

    $("#nav-bottom-calendar").click(function() {
      $("#nav-bottom").children().children().removeClass('active');
      $("#nav-bottom-calendar").addClass('active');

      if (uiData.focus == "timeline") {
        pageTransition("calendar", "slide-in-from-right");
      }
      else if (uiData.focus != "calendar") {
        pageTransition("calendar", "slide-in-from-left");
      }

    });

    $("#nav-add-popup").click(function()  {
      console.log("....");
      $("#nav-add-popup").fadeOut(200);
    });

    $("#nav-bottom-add").click(function() {
      $("#nav-bottom").children().children().removeClass('active');
      $("#nav-bottom-add").addClass('active');
      //pageTransition("calendar", "none");

      console.log("click");

      $("#nav-add-popup").fadeIn(200);
    });

    $("#nav-bottom-stats").click(function() {
      $("#nav-bottom").children().children().removeClass('active');
      $("#nav-bottom-stats").addClass('active');

      if ((uiData.focus == "timeline") ||
          (uiData.focus == "calendar")) {
        pageTransition("stats", "slide-in-from-right");
      }
      else if (uiData.focus != "stats") {
        pageTransition("stats", "slide-in-from-left");
      }


    });

    $("#nav-bottom-config").click(function() {
      $("#nav-bottom").children().children().removeClass('active');
      $("#nav-bottom-config").addClass('active');

      if ((uiData.focus == "timeline") ||
          (uiData.focus == "calendar") ||
          (uiData.focus == "stats")) {
        pageTransition("config", "slide-in-from-right");
      }
      else if (uiData.focus != "config") {
        pageTransition("config", "slide-in-from-left");
      }

    });


    //----------------

    var today_midnight = new Date();
    today_midnight.setUTCHours(0,0,0,0);

    if (g_logapp.filterUUID(today_midnight.getTime()).length > 0) {
      pageTransition("timeline", "none", undefined, 0);
      //$(".screen").page().transition("timeline", "none");
    } else {
      $(".screen").page().transition("mood-daily", "none");
    }

    setTimeout( function() {
      //$("#body").css("display", "initial");
      $("#body").addClass("load");
    },
    200 );

  });

})(jQuery);
