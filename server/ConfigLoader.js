const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

class ConfigLoader {
    constructor(configPath = path.join(__dirname, '../circuits/config.yaml')) {
        this.configPath = configPath;

        this._loadConfig();
    }

    _loadConfig() {

        const fileContent = fs.readFileSync(this.configPath, "utf8");
        this.config = yaml.load(fileContent);

    }

    getBuildProofConfig () {
        
        const BuildProofConfig = this.config.Zvoting.configuration.circuit_config;
        return BuildProofConfig;

    }

    getVotingKeyGeneratorConfig () {
        const VotingKeyGeneratorConfig = this.config.votingKeyGenerator.configuration.circuit_config;
        return VotingKeyGeneratorConfig;
    }

    getMerkleTreeConfig(){
        const MerkleTreeConfig = this.config.trees.configuration.circuit_config;
        return MerkleTreeConfig; 
    }

    getFullConfig() {
        return this.config;
    }
    
}

module.exports = { ConfigLoader }; 