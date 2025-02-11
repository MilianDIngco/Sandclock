const express = require('express');
const path = require('path');
const app = express();

// sets static files with the path and joins the current directory name with public. then serves them
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(process.env.PORT || 3000, () => console.log("Running"));
