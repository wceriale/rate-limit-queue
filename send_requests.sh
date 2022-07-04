#!/bin/sh
for ((i = 1; i <= $1; i++))
do
 curl http://localhost:3000/request &
done
