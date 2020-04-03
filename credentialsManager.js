var fs = require('fs');
var request = require('request');

// ============================================================================================================================================== //
// GET PSONO CREDENTIALS
// ============================================================================================================================================== //

psonoData = {
  "url": "[PSONO_URL]",
  "api_key_id": "[PSONO_API_KEY_ID]",
  "api_key_secret_key": "[PSONO_API_KEY_SECRET]"
}

// Parse the credentials file and the PSONO Url from Package.json to set it up in the configuration file;
async function getCredentials() {
  var options = {
    'method': 'POST',
    'url': psonoData.url,
    'headers': { 'Content-Type': 'multipart/form-data' },
    formData: {
      "secret_id": JSON.parse(fs.readFileSync('package.json')).psono_secret_id,
      "api_key_id": psonoData.api_key_id + process.env.CREDS_PASS.split(".")[0],
      "api_key_secret_key": psonoData.api_key_secret_key + process.env.CREDS_PASS.split(".")[1]
    }
  };
  
  var psonoResponse = await request(options, async function (error, response) {
    if(response.statusCode != 200) process.exit();
    credentialsJSON = await JSON.parse(response.body).note_notes;
    await fs.writeFileSync('credentials.json', credentialsJSON);
  }); 
}

getCredentials()