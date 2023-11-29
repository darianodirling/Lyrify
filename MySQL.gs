var server = 'sql5.freemysqlhosting.net';
var name = 'sql5665026';
var username = 'sql5665026';
var password = '5Jly3dZ8HR';
var port = '3306';

// table with SongID, title and lyrics
function createConnection(){
  var url = "jdbc:mysql://"+server+":"+port+"/"+name;
  var conn = Jdbc.getConnection(url, username, password);
  var stmt = conn.createStatement();
  var rs = stmt.execute("CREATE TABLE UserSongs (SongID INT PRIMARY KEY AUTO_INCREMENT,title VARCHAR(255) NOT NULL,lyrics TEXT NOT NULL)");
  conn.close();
}

//this function takes in title of song and lyrics that the user intputs and sends it to the database. 
function insertDB(songTitle,lyrics){
  var url = "jdbc:mysql://"+server+":"+port+"/"+name;
  var conn = Jdbc.getConnection(url, username, password);
  try {
    var stmt = conn.prepareStatement('INSERT INTO UserSongs (title, lyrics) VALUES (?, ?)');
    stmt.setString(1, songTitle);
    stmt.setString(2, lyrics);
    var result = stmt.executeUpdate();
  } catch (e) {
    Logger.log('Error: ' + e);
  } finally {
    if (conn) {
      conn.close();
    }
  }
  conn.close();
}
// reads from database and gets and returns the title
function readFromTable(){
  var url = "jdbc:mysql://"+server+":"+port+"/"+name;
  var conn = Jdbc.getConnection(url, username, password);

  const stmt = conn.createStatement();
  stmt.setMaxRows(5);
  const query = 'SELECT title FROM UserSongs ORDER BY timestamp DESC';
  const results = stmt.executeQuery(query);
  const titles = [];

  while (results.next()) {
    titles.push(results.getString('title'));
  }

  results.close();
  stmt.close();

  conn.close();

  return titles;
}

// function that gets the title of a song and creates the lyric slides from the database that corresponds with the title
function readLyricsFromTable(title) {
  var url = "jdbc:mysql://"+server+":"+port+"/"+name;
  var conn = Jdbc.getConnection(url, username, password);

  var stmt = conn.prepareStatement("SELECT lyrics FROM UserSongs WHERE title = ?");
  stmt.setString(1, title);
  var rs = stmt.executeQuery();
  var lyrics = '';

  while (rs.next()) {
    lyrics = rs.getString('lyrics');
  }
  // Get the active presentation
  var presentation = SlidesApp.getActivePresentation();

  // Add title slide
  var titleSlide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  var titleTextBox = titleSlide.insertTextBox(title);
  titleTextBox.setLeft(100);
  titleTextBox.setTop(200);
  titleTextBox.setWidth(400);
  titleTextBox.setHeight(200);
  var titleTextStyle = titleTextBox.getText().getTextStyle();
  titleTextStyle.setFontSize(48);
  titleTextStyle.setBold(true);
  console.log(lyrics);
  // Split lyrics into chunks
  var splitLyrics = lyrics.split(" ");
  const chunkSize = 39;
  let start = 0;
  let end = chunkSize;

  // Create slides with lyrics chunks
  while (start < splitLyrics.length) {
    var slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    (SlidesApp.ParagraphAlignment.CENTER);
    var textChunk = splitLyrics.slice(start, end).join(" ");
    var textBox = slide.insertTextBox(textChunk);
    textBox.setLeft(100);
    textBox.setTop(50);
    textBox.setWidth(500);
    textBox.setHeight(200);
    var textStyle = textBox.getText().getTextStyle();
    textStyle.setFontSize(20);
    textStyle.setBold(true);

    start = end;
    end += chunkSize;
  }
}
