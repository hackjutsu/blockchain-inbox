const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // current working dir
const source = fs.readFileSync(inboxPath, 'utf8');

console.log(solc.compile(source, 1));