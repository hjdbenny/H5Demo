window.onload = function() {
	var db = null;
	//连接数据库
	function newForm() {
		connectToDB();
//		createNoteTable();
		fetchNotes();

	}
	newForm();

	function connectToDB() {
		if(!window.openDatabase) {
			alert("不支持");
		}
		db = window.openDatabase("awesome_notes", "1.0", "AwesomeNotes Database", 1024 * 1024 * 3);
	}
	//创建留言表
	function createNoteTable() {
		db.transaction(function(tx) {
			tx.executeSql(
				"CREATE TABLE notes (id INTEGER PRIMARY KEY,title TEXT,note TEXT)", [],
				function() {
					alert("Notes database created successfully!")
				},
				function(tx, error) {
					alert("Error:" + error.Message)
				}
			);
		});
	};
	//加载留言
	function fetchNotes() {
		db.transaction(function(tx) {
			tx.executeSql(
				"select id,title,note from notes", [],
				function(SQLTransaction, data) {
					for(var i = 0; i < data.rows.length; i++) {
						var row = data.rows.item(i);
						var id = row["id"];
						var title = row["title"];
						addToNotesList(id, title);
					}
				}
			);
		});
	};
	//指定id和标题，将列表项添加到留言列表
	function addToNotesList(id, title) {
		var notes = $("#notes");
		var item = $("<li>");
		item.attr("data-id", id);
		item.html(title);
		notes.append(item);
	}
	//获取指定记录
	$("#notes").click(function(e) {
		if($(e.target).is("li")) {
			var elem = $(e.target);
			loadNote(elem.attr("data-id"));
		}
	});

	function loadNote(id) {
		db.transaction(function(tx) {
			tx.executeSql(
				"select id,title,note from notes where id=?", [id],
				function(SQLTransaction, data) {
					var row = data.rows.item(0);
					var title = $("#title");
					var note = $("#note");
					title.val(row["title"]);
					title.attr("data-id", row["id"]);
					note.val(row["note"]);
					$("#delete_button").show();
				}
			);
		});
	};
	//插入、更新和删除记录
	$("#save_button").click(function(e) {
		e.preventDefault();
		var title = $("#title");
		var note = $("#note");

		if(title.attr("data-id")) {
			updateNote(title, note);
		} else {
			insertNote(title, note);
		}
	});

	function insertNote(title, note) {
		db.transaction(function(tx) {
			tx.executeSql(
				"insert into notes (title,note) values (?,?)", [title.val(), note.val()],
				function(tx, result) {
					var id = result.insertId;
					alert("Record" + id + " is saved!");
					title.attr("data-id", result.insertId);
					addToNotesList(id, title.val());
					$("#delete_button").show();
				},
				function() {
					alert("The note could not be saved!");
				}
			);
		});
	};

	function updateNote(title, note) {
		var id = title.attr("data-id")
		db.transaction(function(tx) {
			tx.executeSql(
				"update notes set title=?,note=? where id=?", [title.val(), note.val(), id],
				function(tx, result) {
					alert("Record" + id + " is updated!");
					$("#notes>li[data-id=" + id + "]").html(title.val());
				},
				function() {
					alert("The note was not updated!");
				}
			);
		});
	};
	//删除
	$("#delete_button").click(function(e) {
		e.preventDefault();
		var title = $("#title");
		deleteNote(title);
		newNote();
	});

	function deleteNote(title) {
		var id = title.attr("data-id");
		db.transaction(function(tx) {
			tx.executeSql(
				"delete from notes where id=?", [id],
				function(tx, result) {
					alert("Record" + id + " is deleted!");
					$("#notes>li[data-id=" + id + "]").remove();
				},
				function() {
					alert("The note was not deleted!");
				}
			);
		});
	};
	//New_button
	$("#new_button").click(function(e) {
		e.preventDefault();
		newNote();
	});

	function newNote() {
		$("#delete_button").hide();
		var title = $("#title");
		title.removeAttr("data-id");
		title.val("");
		var note = $("#note");
		note.val("");

	}
}