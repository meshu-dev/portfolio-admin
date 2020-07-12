# Portfolio admin

As I intend on updating my portfolio website as I work on new projects I created an admin app to make it easier to manage and add new projects. Also as I was learning Vue.js at the time this project was a great opportunity to program with Vue.js using the state management library Vuex.

## Install software
### NodeJS
- Install in ubuntu
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```
- Install in MacOS via brew 
```
brew install node
```
### NPX
- Install globally via NPM
```
npm install -g npx
```
### Portfolio API
-  Go to https://github.com/meshu-dev/portfolio-api then follow install and setup instructions

## Setup 
- Install npm packages
```
npm install
```
- Copy the .env.example file to a new file named .env.local
```
cp .env.example .env.local
```
- Fill in .env variables in new file
    - Set VUE_APP_API_URL to the domain used to setup Portfolio API
    - Set VUE_APP_PROFILE_NAME to name used in profile entry in Portfolio API
```
VUE_APP_API_URL=http://localhost:3001
VUE_APP_PROFILE_NAME=Mesh
```
## Commands
- Run website
```
npm run nodemon
```
- Build static files
```
npm run build
```
- Run website with static files
```
npm run serve
```
