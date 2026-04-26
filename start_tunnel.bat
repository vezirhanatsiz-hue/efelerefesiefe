@echo off
:loop
lt --port 3000
timeout /t 5
goto loop