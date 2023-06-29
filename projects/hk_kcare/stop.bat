set curpath=%~dp0

echo %curpath%

cd /d %curpath%

call npx kill-port 3000
