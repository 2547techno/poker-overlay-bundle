poker is a [NodeCG](http://github.com/nodecg/nodecg) bundle. 
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `^1.1.1`
You will need to have an appropriate version of NodeCG installed to use it.

## Note
Commit history is nuked in the repo since this is just a public upload of the private repo on my peronal github account

# Installation
(https://www.nodecg.dev/docs/installing)

1. Install NodeCG in directory of choice
```bash
npm install --global nodecg-cli
mkdir nodecg
cd nodecg
nodecg setup
```
2. Install bundle
```bash
cd bundles
git clone https://github.com/2547techno/poker-overlay-bundle.git
mv poker-overlay-bundle/ poker/
```
3. Rename install bundle dependencies
```bash
cd poker
npm install
```
4. Compile Sass files
```bash
npm run buildSass
```
5. Start nodecg
```bash
cd ../..
node index.js
```
