#!/bin/bash 
if [ ! -z $1 ]; then
  echo Buildtag: $1

for d in */ ; do
  newD=$(echo "$d" | tr "[:upper:]" "[:lower:]" | sed 's/.$//')
  TMP_DOCKER=(dolphinnews/$newD:$1)

  # General Use Case
  if [ $d = "0RuleBase/" ] || [ $d = "1GetCreditScore/" ] || [ $d = "2GetBanks/" ] || [ $d = "3RecipList/" ] || [ $d = "5Normalizer/" ] || [ $d = "6Aggregator/" ] || [ $d = "7Frontend/" ]; then
    echo Building normal "$TMP_DOCKER"
    cd $d
    docker build -t $TMP_DOCKER .
    docker push $TMP_DOCKER
    cd ..
  fi
  
  # Normalizer (Multiple different ones)
  if [ $d = "5Normalizer/" ]; then
    echo Building normalizer setup for "$TMP_DOCKER"
  fi

  #cd $d
  #cd ..
done

fi
