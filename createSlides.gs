function handleButtonClick(title) {
  // Get song details
  try{
    var geniusSongId = getGeniusSongId(title);
    var lyrics = getLyricsForSong(geniusSongId);
    insertDB(title,lyrics);
  }
  catch(e){
    console.log(e);
    return false;
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
  //send to the database the lyric data maybe a function
  return geniusSongId;
}


