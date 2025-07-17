# Define the green color code
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo "\n"
echo "----------------------------------------------------------------------------------------"
echo "${GREEN}Running audit on: $(pwd)${NC}"
echo "----------------------------------------------------------------------------------------"
echo "\n"

# echo "${YELLOW}Check dependencies${NC}"
# echo "\n"
# npx --yes depcheck
# echo "\n"

# echo "${YELLOW}List TODO's${NC}"
# npx --yes leasot '{.,*}**' -i '**/node_modules,**/dist,**/packages' -S -x
# echo "\n"

echo "${YELLOW}Check Local dependencies${NC}"
echo "\n"
npx --yes npm-check-updates --target latest --filter "@react-ck*"
echo "\n"

echo "${YELLOW}Check External dependencies${NC}"
echo "\n"
npx --yes npm-check-updates --target latest --reject "@react-ck*"
echo "\n"

# if [ -f "./tsconfig.json" ]; then
#     echo "${YELLOW}Check unused with ts-prune${NC}"
#     echo "\n"
#     npx --yes ts-prune
#     echo "\n"
    
#     echo "${YELLOW}Check unused with ts-unused-exports${NC}"
#     echo "\n"
#     npx --yes ts-unused-exports tsconfig.json --showLineNumber --findCompletelyUnusedFiles --maxIssues=100
#     echo "\n"
# fi
