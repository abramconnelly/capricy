var g_ctx =  { "SQL": {}, "init":false, "db":{}, "db_name":"capricy_db" };


// wasm file location (sql-wasm.wasm)
//
config = { locateFile: filename => `js/${filename}` }

// Entry point for sql.js
//
//
initSqlJs(config).then(function(_SQL){
  g_ctx.SQL = _SQL;
  g_ctx.init = true;
  attachCapricyDB();
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
    sqlstr = "insert into capricy_entry (uuid, user_uuid, mood, activity, note) values (?, ?, ?, ?, ?)";
    db.run(sqlstr, row);
  }
  else if (row.length == 6) {
    sqlstr = "insert into capricy_entry (uuid, user_uuid, mood, activity, note, entry_date) values (?, ?, ?, ?, ?, ?)";
    db.run(sqlstr, row);
  }
  else if (row.length == 7) {
    sqlstr = "insert into capricy_entry (uuid, user_uuid, mood, activity, note, entry_date, modified_date) values (?, ?, ?, ?, ?, ?, ?)";
    db.run(sqlstr, row);
  }

  saveDBToLocalStorage(g_ctx.db_name, g_ctx.db);
}

function attachCapricyDB() {
  var x = localStorage.getItem("capricy_db");
  if (x === null) {

    console.log("DEBUG: initalizing default db");

    g_ctx.db = new g_ctx.SQL.Database();
    initDefaultDB(g_ctx.db);

    saveDBToLocalStorage("capricy_db", g_ctx.db);
  }
  else {

    console.log("DEBUG: loading database from localstorage");

    g_ctx.db = loadDBFromLocalStorage(g_ctx.SQL, "capricy_db");
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

  console.log("??");

  sqlstr = "create table capricy_entry ( id INTEGER PRIMARY KEY," +
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
  sqlstr = "create INDEX capricy_entry_idx0 on capricy_entry (uuid)";
  db.run(sqlstr);

  sqlstr = "create INDEX capricy_entry_idx1 on capricy_entry (user_uuid)";
  db.run(sqlstr);

  sqlstr = "create INDEX capricy_entry_idx2 on capricy_entry (uuid, user_uuid)";
  db.run(sqlstr);

  sqlstr = "create INDEX capricy_entry_idx3 on capricy_entry (entry_date)";
  db.run(sqlstr);

  sqlstr = "create INDEX capricy_entry_idx4 on capricy_entry (user_uuid, entry_date)";
  db.run(sqlstr);

  //--

  sqlstr = "create table capricy_db_version ( id INTEGER PRIMARY KEY, name varchar )";
  db.run(sqlstr);

  sqlstr = "insert into capricy_db_version values (0, '0.1.0')";
  db.run(sqlstr);

  //--

  return db;
}


