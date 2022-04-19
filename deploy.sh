# deploy.sh

#!/usr/bin/env sh

# abort on errors
set -e

# Switch to live branch
echo Linting
npm run lint
echo Building
npm run build

# Commit on git
git checkout --orphan gh-pages2
git --work-tree dist add --all
git --work-tree dist commit -m "gh-pages"
echo Pushing to pages
git push origin HEAD:gh-pages2 --force
rm -r ./dist
git checkout -f main
git branch -D gh-pages2
echo Success!