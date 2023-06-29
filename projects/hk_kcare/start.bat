set curpath=%~dp0

echo %curpath%

cd /d %curpath%

call node server.js
