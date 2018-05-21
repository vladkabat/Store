@echo off
setlocal
set MONGO_HOME_DIR="C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"

echo Start mongod
call %MONGO_HOME_DIR% --dbpath D:\Store\data\db