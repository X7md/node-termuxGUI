import * as net from 'net';
import { $ } from 'zx';

const unixSocketServer = net.createServer();
const unixSocketServer2 = net.createServer();
unixSocketServer.listen('\0test', () => {
  console.log('now listening');
});

unixSocketServer2.listen('\0test2', () => {
  console.log('now listening');
});


unixSocketServer.on('connection', (s) => {
  console.log('got connection!');
  s.write('hello world');
  s.end();
});

unixSocketServer2.on('connection', (s) => {
  console.log('got connection!');
  s.write('hello world');
  s.end();
});

await $`am broadcast --user 0 -n com.termux.gui/.GUIReceiver --es mainSocket test --es eventSocket test2`
