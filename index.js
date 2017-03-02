var express = require('express'),
    app = express(),
    path = require('path');

// Listen port
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// Include home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Сollection of information
app.get('/whoami', function(req, res) {
    var ipA = req.headers['x-forwarded-for'] || req.connection.remoteAddress || null;
    var lan = req.headers['accept-language'] || null;
    var lanA = lan.split(',');
    var soft = req.headers['user-agent'] || null;
    var softA = soft.split(/[()]/);
    var event = {ip: ipA, language: lanA[0], software: softA[1]};
    res.send(JSON.stringify(event));
});