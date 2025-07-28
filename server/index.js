const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const VkGenerator = require('./VkGenerator')
const merkleTreeBuilder = require('./merkleTreeBuilder')
const buildProof = require('./buildProof')

const { ConfigLoader } = require('./ConfigLoader');

const configloader = new ConfigLoader();


const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(pino);
app.use(express.json({
  limit: '1mb'
}))
app.get('/VKG', async (req, res) => {
  const vkg = req.query.vkg;
  const Vk = vkg ? await VkGenerator(configloader, vkg) : await VkGenerator(configloader);
  res.send(Vk);
});

app.post('/vote',async (req, res) => {
  const voters = req.body.voters;
  const index = req.body.index;
  const publicRoot = req.body.publicRoot;
  const votingKeyGenerator = req.body.votingKeyGenerator;

  const proof = await buildProof(voters, index, publicRoot, votingKeyGenerator, configloader);
  res.send(proof);
});

app.post('/MTB',async (req, res) => {
  const voters = req.body.voters;
  console.log('voters:',voters)
  const publicRoot = await merkleTreeBuilder(voters, configloader);

  res.send(publicRoot);
});

app.listen(4029, () =>
  console.log('Express server is running on localhost:4029')
);
