// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeadmanVault {
    struct Vault {
        address owner;
        address heir;
        string encryptedSecret;
        uint256 lastCheckIn;
        bool claimed;
    }

    mapping(uint256 => Vault) public vaults;
    uint256 public vaultCount;

    event VaultCreated(uint256 vaultId, address owner, address heir);
    event CheckIn(uint256 vaultId, uint256 timestamp);
    event SecretClaimed(uint256 vaultId, string secret);

    modifier onlyOwner(uint256 vaultId) {
        require(msg.sender == vaults[vaultId].owner, "Not owner");
        _;
    }

    modifier onlyHeir(uint256 vaultId) {
        require(msg.sender == vaults[vaultId].heir, "Not heir");
        _;
    }

    function createVault(address heir, string memory encryptedSecret) external {
        vaultCount++;
        vaults[vaultCount] = Vault(msg.sender, heir, encryptedSecret, block.timestamp, false);
        emit VaultCreated(vaultCount, msg.sender, heir);
    }

    function checkIn(uint256 vaultId) external onlyOwner(vaultId) {
        vaults[vaultId].lastCheckIn = block.timestamp;
        emit CheckIn(vaultId, block.timestamp);
    }

    function claimSecret(uint256 vaultId) external onlyHeir(vaultId) {
        Vault storage vault = vaults[vaultId];
        require(!vault.claimed, "Already claimed");
        require(block.timestamp > vault.lastCheckIn + 3 days, "Too early");
        vault.claimed = true;
        emit SecretClaimed(vaultId, vault.encryptedSecret);
    }

    function getVault(uint256 vaultId) external view returns (
        address owner,
        address heir,
        string memory encryptedSecret,
        uint256 lastCheckIn,
        bool claimed
    ) {
        Vault memory v = vaults[vaultId];
        return (v.owner, v.heir, v.encryptedSecret, v.lastCheckIn, v.claimed);
    }
}
