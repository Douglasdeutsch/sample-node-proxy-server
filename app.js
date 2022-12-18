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
			console.log("Response =", response);
			return response.text();
		})
		.then(html => {
			// console.log("html test", html);
			console.log("html recieved, attempting parse");
			var titleArr = [...html.matchAll(/"title":{"runs":\[{"text":"(.*)"}]/gm)];
			console.log("titleArr", titleArr);
			for (let i = 0; i < titleArr.length; i++) {
				console.log(titleArr[i][1]);
			}
			console.log("done parsing");
			res.send(titleArr);
		})
});
		//try1 to return an array of titles from a youtube url










// export app
module.exports = app;
