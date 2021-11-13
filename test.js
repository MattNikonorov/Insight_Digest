const { spawn } = require('child_process');

const ls = spawn('node fetch.js');
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});