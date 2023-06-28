set curpath=%~dp0

echo %curpath%

cd /d "%curpath%"

npm restartprod
