#!/bin/bash

envsubst '$GITHUB_PAT_SEARCH_TOKEN' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
