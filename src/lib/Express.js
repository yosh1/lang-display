const express = require('express');
const app = express();

// ルート（http://localhost/）にアクセスしてきたときに「Hello」を返す
app.get('/', (req, res) => res.send('Hello'));
app.listen(3000, () => console.log('Listening on port 3000'));