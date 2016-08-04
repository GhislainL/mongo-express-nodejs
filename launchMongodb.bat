@echo off 

REM Launch mongodb for myapp
TITLE = MongoDB 
cd "C:\Program Files\MongoDB\Server\3.2\bin"
mongod.exe --dbpath c:\Users\Ghislain\Documents\nodejs\express\myapp\data
