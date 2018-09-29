var env = process.env.NODE_ENV || 'development';

var local_os = process.platform;

// if ( local_os === 'darwin'){ 
//     //mac os
//     export GOOGLE_APPLICATION_CREDENTIALS="config/StdTest2-6647419c2653.json"
// } else {
//     //windows os
//     $env:GOOGLE_APPLICATION_CREDENTIALS="config\StdTest2-6647419c2653.json"
// }

var config = require('./config.json');
debugger;
if (env === 'development' || env === 'test' ) {
  var envConfig = config[env];
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

  process.env.GOOGLE_APPLICATION_CREDENTIALS = "config/StdTest2-6647419c2653.json";

}

