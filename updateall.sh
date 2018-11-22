#!/bin/bash
if [ ! -z $1 ]; then
  echo $1
  source dockerbuilder.sh $1
  node replacebrokerversion.js $1
  source applykuber.sh 
fi
