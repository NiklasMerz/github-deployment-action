Create Github deployments in you actions like that:

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