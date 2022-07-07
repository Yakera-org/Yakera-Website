# Yakera Website 

![image](https://user-images.githubusercontent.com/37816494/132536825-3c57d05c-0e7c-4096-9589-9ca88d23f827.png)


## Instructions to run the server
- npm install
- npm start

## Netlify Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/dc9a79dc-3ef9-4f0e-b138-1361650bd794/deploy-status)](https://app.netlify.com/sites/yakera-venezuela/deploys)

## Github structure
### Live Deployment
`master`
This branch is directly connected to our live site, any changes to this branch automatically triggers a redeploy

### Staging
`dev`
Used to stage and internally test our releases.
Releases are staged here, and then released to master with a Merge Request.
An automatic netlify preview is generated when creating a MR to master

`staging-2`
Used when `dev` is occupied with a prioritized release.

### Feature branches
branch off from `dev` into their seperate features

