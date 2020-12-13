const { exec } = require('child_process');

const env = process.env.NODE_ENV || 'development';
const { host, username, port, database } = require('./src/config/database')[env];

exec(`createdb -h ${host} -U ${username} -p ${port} ${database}`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
