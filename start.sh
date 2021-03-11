#!/bin/bash


nohup npm start --prefix ./backend &
nohup npm start --prefix ./frontend &
exit
