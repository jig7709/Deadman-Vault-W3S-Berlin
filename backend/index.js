const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
app.use(express.json());

const abi = [
  {
    "inputs": [{ "internalType": "uint256", "name": "vaultId", "type": "uint256" }],
    "name": "claimSecret",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

app.post('/api/claim-secret', async (req, res) => {
  try {
    const { vaultId } = req.body;
    if (!vaultId) return res.status(400).json({ error: 'Missing vaultId' });

    const tx = await contract.claimSecret(vaultId);
    await tx.wait();

    res.json({ status: '✅ Secret claimed', txHash: tx.hash });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

app.listen(3000, () => {
  console.log('✅ Backend running on http://localhost:3000');
});
