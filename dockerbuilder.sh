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
  
  if [ $d = "0Bank/" ]; then
    echo Building Bank setup for "$TMP_DOCKER"
    cd $d
    TMP_DOCKER=(dolphinnews/$newD-1:$1)
    cp docker/1/Dockerfile .
    docker build -t $TMP_DOCKER .
    docker push $TMP_DOCKER
    rm Dockerfile
    
    cp docker/2/Dockerfile .
    TMP_DOCKER=(dolphinnews/$newD-2:$1)
    docker build -t $TMP_DOCKER .
    docker push $TMP_DOCKER
    rm Dockerfile

    cd ..
  fi

  # Normalizer (Multiple different ones)
  if [ $d = "4Translator/" ]; then
    echo Building translator setup for "$TMP_DOCKER"
    cd $d
    TMP_DOCKER=(dolphinnews/$newD-1:$1)
    cp docker/1/Dockerfile .
    docker build -t $TMP_DOCKER .
    docker push $TMP_DOCKER
    rm Dockerfile
    
    cp docker/2/Dockerfile .
    TMP_DOCKER=(dolphinnews/$newD-2:$1)
    docker build -t $TMP_DOCKER .
    docker push $TMP_DOCKER
    rm Dockerfile

    cp docker/3/Dockerfile .
    TMP_DOCKER=(dolphinnews/$newD-3:$1)
    docker build -t $TMP_DOCKER .
    docker push $TMP_DOCKER
    rm Dockerfile

    cp docker/4/Dockerfile .
    TMP_DOCKER=(dolphinnews/$newD-4:$1)
    docker build -t $TMP_DOCKER .
    docker push $TMP_DOCKER
    rm Dockerfile
	
    cd ..
  fi

  
done

fi
