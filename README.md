# Create Github deployments in you actions

> If you have any questions please ping me. This action basically works but has not all features I want it to.

This actions allows you to create a deployment and set a deployment status.

For options please see `deployment.js` and the [Github documentation](https://developer.github.com/v3/repos/deployments/)

First create a deployment and with flag `-f`  create the success status:
````
action "create deployment" {
  uses = "niklasmerz/github-deployment-action@master"
  secrets = ["GITHUB_TOKEN"]
  args = "-o niklasmerz -r myrepo -c master"
}

action "set deployment status" {
  uses = "niklasmerz/github-deployment-action@master"
  needs = ["create deployment"]
  args = "-o niklasmerz -r myrepo -s success -u https://url.com -f"
  secrets = ["GITHUB_TOKEN"]
}
````
