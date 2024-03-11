echo "Check dependencies"
echo "\n"
npx --yes depcheck
echo "\n\n"
echo "List TODO's"
echo "\n"
npx --yes leasot '{.,*}**' -i '**/node_modules,**/dist,**/packages' -S -x
echo "\n\n"
echo "Check unused with ts-prune"
echo "\n"
npx --yes ts-prune
echo "\n\n"
echo "Check unused with ts-unused-exports"
echo "\n"
npx --yes ts-unused-exports tsconfig.json --showLineNumber --findCompletelyUnusedFiles --maxIssues=100
echo "\n\n"
echo "Check React CK dependencies"
echo "\n"
npx --yes npm-check-updates --target latest --filter "@react-ck*"
echo "\n\n"
echo "Check Project dependencies"
echo "\n"
npx --yes npm-check-updates --target latest --reject "@react-ck*"
echo "\n\n"