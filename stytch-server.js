const express = require('express');
const cors = require('cors')
const app = express();
const stytch = require('stytch');

const client = new stytch.Client({
  project_id: "project-test-696867c9-3fdb-4509-aa43-09a62a7ff512",
  secret: "secret-test-nuv5Wd-wDAb2pr2NtVOqmyhK8cQPslgxx-8=",
  env: stytch.envs.test
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());

let usertoken = "";


app.use(cors());

app.use('/login', (req, res) => {
	console.dir(req.body);
  const params = {
    email: req.body.email
  };

  client.magicLinks.email.loginOrCreate(params)
    .then(resp => {
        console.log(resp);
        res.send({resp});
    })
    .catch(err => {
        console.log(err);
        res.send({err});
    });
});

app.use('/authenticate', (req, res) => {
	console.dir(req.body);
  client.magicLinks.authenticate(req.body.token).then(resp => {
        console.log(resp);
        if(resp.status_code === 200) {
          usertoken = req.body.token;
        }
        res.send({resp});
    })
    .catch(err => {
        console.log(err);
        res.send({err});
    });

});

app.use('/token', (req, res) => {
  res.send({
    token: usertoken
  });
});

app.use('/logout', (req, res) => {
  usertoken = null;
  res.send({
    token: null
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));