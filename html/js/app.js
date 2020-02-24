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

    "log" : { },
    "activity" : { },
    "custom-activity": { },
    "survey": { },
    "config" : { }

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

    "config": { }

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

      "auxiliary": { },

      "custom" : { }

    }

  }
};


function _click() {
  console.log("ok");
  return false;
}

// --
// --


function populateActivityGrid(grid_id, uiSubId) {
  if (typeof grid_id === "undefined") { grid_id = "activity-grid"; }
  if (typeof uiSubId === "undefined") { uiSubId = "daily"; }

  console.log(grid_id, uiSubId);

  var sztxt = '80%';

  var row = null;

  old_grid_ad = document.getElementById(grid_id);
  grid_ad = document.createElement('div');
  grid_ad.className = "ui five column grid";
  grid_ad.align = "center";
  grid_ad.style = "width:100%; ";
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
    img.style.width = '10vh';

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



function populateMoodGrid(grid_id, uiSubId) {
  if (typeof grid_id === "undefined") { grid_id = "mood-grid"; }
  if (typeof uiSubId === "undefined") { uiSubId = "daily"; }

  old_grid_ad = document.getElementById(grid_id);
  grid_ad = document.createElement('div');
  grid_ad.className = "ui five column grid";
  grid_ad.align = "center";
  //grid_ad.style = "width:400px; ";
  grid_ad.style = "width:100%; ";
  grid_ad.id = old_grid_ad.id;

  var row = document.createElement("div");
  row.className = "row";
  for (var ii=0; ii<5; ii++) {

    var mood_id = 'mood-' + ii.toString();

    var img = document.createElement('img');
    img.src = appData.icon.mood[mood_id].img.inactive;
    img.id = appData.icon.mood[mood_id].id + "-" + uiSubId;
    img.style.width = '10vh';

    img.onclick = (function(x,y) {
       return function() { onClickMood(x,y); };
     })(appData.icon.mood[mood_id].id,uiSubId);
    img.ondragstart = (function(x,y) {
      return function() { onClickMood(x,y); return false; };
    })(appData.icon.mood[mood_id].id,uiSubId);

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
});

function _init() {
  populateActivityGrid();

  populateActivityGrid("edit-grid-0", "0");
  populateActivityGrid("edit-grid-1", "1");

  populateMoodGrid("mood-grid-0", "0");
  //populateMoodGrid("mood-grid-1", "1");

  //createNewActiveEntry();
}
