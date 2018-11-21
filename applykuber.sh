#!/bin/bash
for d in broker-manifests/deployments/*; do
  echo $d
  kubectl apply -f $d --record
done

