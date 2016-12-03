#!/bin/bash
set -e # exit on error
rm -f .git/hooks/pre-commit
touch .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
echo set -e >> .git/hooks/pre-commit # exit on error
echo npm run lint >> .git/hooks/pre-commit
echo npm run coverage >> .git/hooks/pre-commit
