/**
 *	Server - Require and start running app as server
 */

// require main app
const app = require('./app');

// set port
const port = process.env.PORT || 3000;

// start listening for requests
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
app.get('/api/search/:q?', (req,res)=> {
	//code for obtaining video titles
	var filename = "https://www.youtube.com/results?search_query="+ req.params.q
	var fs = require('fs');
	fs.readFile(filename, 'utf8', function(err, html) {
		if (err) console.error(err);
		var titleArr = [...html.matchAll(/"title":{"runs":\[{"text":"(.*)"}]/gm)];
		for (let i = 0; i < titleArr.length; i++) {
			console.log(titleArr[i][1]);
	 }
	 console.log(titleArr.length);
	})
	.then(response=>{
		res.send(titleArr);
		console.log(titleArr)
	})
})

// export app
module.exports = app;
