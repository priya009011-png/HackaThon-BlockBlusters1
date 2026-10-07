@echo off
title Easy Pay - Safe Pay v3
where py >nul 2>nul
if %errorlevel%==0 (
  py server.py
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  python server.py
  goto :eof
)
echo Python 3 is required.
echo Download it from https://www.python.org/downloads/
pause
