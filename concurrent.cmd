@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\concurrently\src\main.js" %*
) ELSE (
  node  "%~dp0\..\concurrently\src\main.js" %*
)