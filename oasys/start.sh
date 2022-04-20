#!/usr/bin/env bash
export HTTPS=true
export SSL_CRT_FILE=localhost.pem SSL_KEY_FILE=localhost-key.pem
yarn start
