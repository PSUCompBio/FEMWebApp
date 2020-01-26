var siteConfig = require('./configuration');

var AWS = require("aws-sdk");

AWS.config.loadFromPath('./credentials/accessKeys.json');
AWS.config.region = "us-east-1";
AWS.config.getCredentials(function(err) {
      if (err) console.log(err.stack);
      // credentials not loaded
      else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
      console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = function () {
    var params = {
    //  TableName: "usersn", siteConfig.databaseName,
        TableName: siteConfig.databaseName ,
        Key: {
            "email_id": "example@gmail.com"
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}


fetchOneByKey();
