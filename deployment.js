
const fs = require('fs');
const { Octokit } = require('@octokit/rest');
const commandLineArgs = require('command-line-args')

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

async function createDeployment(options) {
    options.task = 'deploy';
    options.required_contexts = [];
    let result = await octokit.repos.createDeployment(options)
    const id = result.data.id;
    console.log(id);
    fs.writeFileSync(process.env.HOME + '/deployment_action', id);
    
    console.log(result.status == 201 ? 'Done': 'Error');
    if(result.status != 201) {
        console.error(result);
        process.exit(1);
    }
}

async function createDeploymentStatus(options) {
    const idTxt = fs.readFileSync(process.env.HOME + '/deployment_action', 'utf8');
    options.deployment_id = parseInt(idTxt);
    delete options.setstatus;
    delete options.ref;

    try {
        result = await octokit.repos.createDeploymentStatus(options)
        console.log(result.status == 201 ? 'Done' : 'Error');
        if (result.status != 201) {
            console.error(result);
            process.exit(1);
        }
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

function main(options) {
    if(options.setstatus) {
        createDeploymentStatus(options);
    } else {
        createDeployment(options);
    }
}


const optionDefinitions = [
    { name: 'setstatus', alias: 'f', type: Boolean },
    { name: 'owner', alias: 'o', type: String },
    { name: 'repo', alias: 'r', type: String },
    { name: 'ref', alias: 'c', type: String },
    { name: 'deployment_id', alias: 'i', type: Number },
    { name: 'state', alias: 's', type: String },
    { name: 'log_url', alias: 'l', type: String },
    { name: 'description', alias: 'd', type: String },
    { name: 'environment', alias: 'e', type: String },
    { name: 'environment_url', alias: 'u', type: String },
    { name: 'auto_inactive', type: Boolean },
    { name: 'auto_merge', type: Boolean, defaultValue: false },
]
const options = commandLineArgs(optionDefinitions)

console.log('Run', options);

main(options);

