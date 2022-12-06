/**
 *	App file - ties all the modules together
 */

// dependencies
const express = require('express');
const nodeFetch = require('node-fetch');
const path = require('path');
const app = express();
let fs = require("fs");

// set a whole project directory as public
app.use(express.static('./public'));

// test route
app.get('/api', (req, res) => {
	res.send("Hello world!");
});





// add route to create a proxy server
const titleArr = [];

app.get('/api/search/:q?', (req, res) => {
	console.log("req.params.q =", req.params.q);

	nodeFetch("https://www.youtube.com/results?search_query="+req.params.q)
		.then(response => {
			// console.log("apiResponse =", apiResponse);
			return response.text();
		})
		.then(text => {
console.log(text);
var filename = "scraped-pages/https://www.youtube.com/results?search_query="+ req.params.q+ ".html";
fs.writeFile(filename, text, function (err) {
			if (err) throw err;
			console.log('3. File saved');
		});
})
.then(value => {
var titleArr = [...html.matchAll(/"title":{"runs":\[{"text":"(.*)"}]/gm)];
for (let i = 0; i < titleArr.length; i++) {
	console.log(titleArr[i][1]);
res.send(titleArr);
		}
	})
});
		//try1 to return an array of titles from a youtube url










// export app
module.exports = app;
