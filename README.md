# Lyrify - Google Slides Add-On

Lyrify is a Google Slides Add-On designed to simplify the process of adding lyrics to your slides using the Genius API.

## Prerequisites

Before running Lyrify, ensure you have the following:

1. **Google Slides Account:** Access to Google Slides where you want to use the add-on.

2. **Google Apps Script Project:**
   - Create a new Google Apps Script project.
   - Upload the provided Google Apps Script files to your project.

3. **Libraries:**
   - Install the required libraries: `oauth2` and `cheerio`.

## Installation

1. **Create Google Apps Script Project:**
   - Visit [Google Apps Script](https://script.google.com/).
   - Create a new project.
   - Name the project as "Lyrify" or any name of your choice.

2. **Upload Files:**
   - In the Google Apps Script Editor, create new files for each of the provided scripts (`Lyrify.gs`, `Genius.gs`, `Utils.gs`, `OAuth.gs`).
   - Copy the content of each script file into the corresponding file in your Google Apps Script project.

3. **OAuth2 Library:**
   - Open your Google Apps Script project.
   - Click on the menu item "Resources" -> "Libraries..."
   - In the "Add a library" field, enter the script ID for the OAuth2 library: `MswhXl8fVhTFUe6HkxZIhKU_r_Y2-4X-/`
   - Select the latest version.
   - Click "Save."

4. **Cheerio Library:**
   - Open your Google Apps Script project.
   - Click on the menu item "Resources" -> "Libraries..."
   - In the "Add a library" field, enter the script ID for the Cheerio library: `1bGghyCPEsHzrTFsJrHtAikTL2OgxlQQGOxX1Lf9C7r2v4NdtfsXgRVEf`
   - Select the latest version.
   - Click "Save."

5. **Run the App:**
   - Open the `Execute.gs` file in your Google Apps Script project.
   - Click the play button to run the script.
   - Authorize the necessary permissions.

## Usage

1. **Open Google Slides:**
   - Open the Google Slides presentation where you want to add lyrics.

2. **Run Lyrify:**
   - In the Google Slides menu, click "Add-ons" -> "Lyrify" -> "Lyrify"
   - Follow the prompts to fetch lyrics and add them to your slides.

3. **Enjoy!**
   - Lyrify will handle the process of adding lyrics, making your presentation prep a breeze.


