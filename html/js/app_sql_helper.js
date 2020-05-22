var g_ctx =  { "SQL": {}, "init":false, "db":{}, "db_name":"db", "db_ready":false, "db_init":false };


// wasm file location (sql-wasm.wasm)
//
config = { locateFile: filename => `js/${filename}` }

// Entry point for sql.js
//
//
initSqlJs(config).then(function(_SQL){
  g_ctx.SQL = _SQL;
  g_ctx.init = true;
  attachDB();

  db_init(g_ctx);
});

//" mood varchar," +
//" activity varchar," +
//" note varchar," +
//" entry_date timestamp default CURRENT_TIMESTAMP," +
//" modified_date timestamp default CURRENT_TIMESTAMP)";
//
function insertEntry(row) {
  var sqlstr = "";
  var db = g_ctx.db;
  if (row.length == 5) {
    sqlstr = "insert into entry (uuid, user_uuid, mood, activity, note) values (?, ?, ?, ?, ?)";
    db.run(sqlstr, row);
  }
  else if (row.length == 6) {
    sqlstr = "insert into entry (uuid, user_uuid, mood, activity, note, entry_date) values (?, ?, ?, ?, ?, ?)";
    db.run(sqlstr, row);
  }
  else if (row.length == 7) {
    sqlstr = "insert into entry (uuid, user_uuid, mood, activity, note, entry_date, modified_date) values (?, ?, ?, ?, ?, ?, ?)";
    db.run(sqlstr, row);
  }

  saveDBToLocalStorage(g_ctx.db_name, g_ctx.db);
}

function attachDB() {
  var x = localStorage.getItem("db");
  if (x === null) {

    g_ctx.db = new g_ctx.SQL.Database();
    initDefaultDB(g_ctx.db);
    g_ctx.db_ready = true;
    g_ctx.db_init = true;

    saveDBToLocalStorage("db", g_ctx.db);
  }
  else {
    g_ctx.db = loadDBFromLocalStorage(g_ctx.SQL, "db");
    g_ctx.db_ready = true;
  }
}

function toBinString (arr) {
  var uarr = new Uint8Array(arr);
  var strings = [], chunksize = 0xffff;

  // There is a maximum stack size.
  // We cannot call String.fromCharCode with as many arguments as we want
  //
  for (var i=0; i*chunksize < uarr.length; i++){
    strings.push(String.fromCharCode.apply(null, uarr.subarray(i*chunksize, (i+1)*chunksize)));
  }
  return strings.join('');
}

function toBinArray (str) {
  var l = str.length,
      arr = new Uint8Array(l);
  for (var i=0; i<l; i++) arr[i] = str.charCodeAt(i);
  return arr;
}

function saveDBToLocalStorage(item_name, db) {
  localStorage.setItem(item_name, toBinString(db.export()));
}

function loadDBFromLocalStorage(_sql, item_name) {
  var db = new _sql.Database(toBinArray(localStorage.getItem(item_name)));
  return db;
}

function exportDBToFile(db) {
  var blob = new Blob([db.export()]);
  var objurl = URL.createObjectURL(blob);

  var db_fn = "db-" + moment().format("YYYY-MM-DD") + ".sqlite";

  var a = document.createElement("a");
  a.setAttribute('href', objurl);
  //a.setAttribute('download', 'db.sqlite');
  a.setAttribute('download', db_fn);
  a.style.visibility = 'hidden';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importDBFromFile(db) {

}

function _simple_query_print(db, query) {
  var res = db.exec(query);
  var delim = ",";
  if (res.length == 0) { return; }
  for (var ii=0; ii<res[0].values.length; ii++) {
    var s = "";
    for (var jj=0; jj<res[0].values[ii].length; jj++) {
      if (jj>0) { s += delim; }
      s += res[0].values[ii][jj];
    }
    console.log(s);
  }
}

function initDefaultDB(db) {
  var sqlstr = "";
  var _r;

  sqlstr = "create table entry ( id INTEGER PRIMARY KEY," +
    " uuid varchar," +
    " user_uuid varchar," +
    " mood varchar," +
    " activity varchar," +
    " note varchar," +
    " entry_date timestamp default CURRENT_TIMESTAMP," +
    " modified_date timestamp default CURRENT_TIMESTAMP)";
  _r = db.run(sqlstr);

  //
  // select type, name, tbl_name, sql
  // FROM sqlite_master
  // WHERE type='index'
  //
  sqlstr = "create INDEX entry_idx0 on entry (uuid)";
  db.run(sqlstr);

  sqlstr = "create INDEX entry_idx1 on entry (user_uuid)";
  db.run(sqlstr);

  sqlstr = "create INDEX entry_idx2 on entry (uuid, user_uuid)";
  db.run(sqlstr);

  sqlstr = "create INDEX entry_idx3 on entry (entry_date)";
  db.run(sqlstr);

  sqlstr = "create INDEX entry_idx4 on entry (user_uuid, entry_date)";
  db.run(sqlstr);

  //--

  sqlstr = "create table activity ( id INTEGER PRIMARY KEY," +
    " activity_id varchar," +
    " name varchar," +
    " icon_id varchar," +
    " type varchar)" ;
  db.run(sqlstr);

  sqlstr = "create INDEX activity_idx0 on activity (activity_id)";
  db.run(sqlstr);

  sqlstr = "create INDEX activity_idx1 on activity (icon_id)";
  db.run(sqlstr);

  //--

  //--

  sqlstr = "create table activity_convenient ( id INTEGER PRIMARY KEY," +
    " activity_id varchar," +
    " name varchar," +
    " icon_id varchar)";
  db.run(sqlstr);

  sqlstr = "create INDEX activity_convenient_idx0 on activity (activity_id)";
  db.run(sqlstr);

  sqlstr = "create INDEX activity_convenient_idx1 on activity (icon_id)";
  db.run(sqlstr);

  //--

  sqlstr = "create table db_version ( id INTEGER PRIMARY KEY, name varchar )";
  db.run(sqlstr);

  sqlstr = "insert into db_version values (0, '0.1.0')";
  db.run(sqlstr);

  //--

  return db;
}



