@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\..\protractor\bin\protractor" %*
) ELSE (
  node  "%~dp0\..\..\protractor\bin\protractor" %*
)