const www = require('../app');

www.listen(3000, async () => {
  console.log('server start at port 3000');
});
