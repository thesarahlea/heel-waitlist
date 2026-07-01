// Google Apps Script — Heel Waitlist relay
//
// Deploy this as a Web App (Deploy > New deployment > Web app,
// Execute as: Me, Who has access: Anyone). The resulting /exec URL
// goes into index.html's <form action="...">.
//
// Before deploying, set these two Script Properties
// (Project Settings > Script Properties — NOT hardcoded here,
// so the token never sits in source you might share/paste elsewhere):
//   NOTION_TOKEN        = your Notion integration token
//   NOTION_DATABASE_ID  = the Heel Waitlist database ID

function doPost(e) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('NOTION_TOKEN');
  var databaseId = props.getProperty('NOTION_DATABASE_ID');

  var email = ((e.parameter && e.parameter.email) || '').trim().toLowerCase();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return ContentService.createTextOutput('invalid email');
  }

  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');

  var payload = {
    parent: { database_id: databaseId },
    properties: {
      Email: { title: [{ text: { content: email } }] },
      Joined: { date: { start: today } },
      Source: { select: { name: 'liveheel.com waitlist' } }
    }
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token,
      'Notion-Version': '2022-06-28'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch('https://api.notion.com/v1/pages', options);

  return ContentService.createTextOutput('ok');
}
