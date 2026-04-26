const localtunnel = require('localtunnel');

(async () => {
  while (true) {
    try {
      const tunnel = await localtunnel({ port: 3000 });
      console.log('Tunnel URL:', tunnel.url);
      tunnel.on('close', () => {
        console.log('Tunnel closed, restarting...');
      });
      await new Promise(resolve => tunnel.on('close', resolve));
    } catch (err) {
      console.error('Tunnel error:', err);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
})();