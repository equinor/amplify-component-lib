#!/bin/bash

# Add assignment
echo "window._env_ = {" >>./env-config.js

# For all the environment variables we want to have at
# runtime (one to one with Radixconfig)

value=$(printf '%s\n' "${CLIENT_ID}")
echo "  CLIENT_ID: \"$value\"," >>./env-config.js

value=$(printf '%s\n' "${NAME}")
echo "  NAME: \"$value\"," >>./env-config.js

value=$(printf '%s\n' "${API_URL}")
echo "  API_URL: \"$value\"," >>./env-config.js

value=$(printf '%s\n' "${API_SCOPE}")
echo "  API_SCOPE: \"$value\"," >>./env-config.js

echo "}" >>./env-config.js

# Update nginx.conf with relevant environment variables
envsubst '
  ${API_URL}
  ' </etc/nginx/conf.d/default.conf.template >/etc/nginx/conf.d/default.conf