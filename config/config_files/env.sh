#!/bin/sh

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

value=$(printf '%s\n' "${API_CLIENT_ID}")
echo "  API_CLIENT_ID: \"$value\"," >>./env-config.js

value=$(printf '%s\n' "${ENVIRONMENT_NAME}")
echo "  ENVIRONMENT_NAME: \"$value\"," >>./env-config.js

value=$(printf '%s\n' "${SERVICE_NOW_CONFIGURATION_ITEM}")
echo "  SERVICE_NOW_CONFIGURATION_ITEM: \"$value\"," >>./env-config.js

value=$(printf '%s\n' "${APPLICATION_INSIGHTS_CONNECTION_STRING}")
echo "  APPLICATION_INSIGHTS_CONNECTION_STRING: \"$value\"," >>./env-config.js

echo "}" >>./env-config.js

# Update nginx.conf and securityheaders.conf with relevant environment variables
envsubst '${API_URL}' </etc/nginx/conf.d/default.conf.template >/etc/nginx/conf.d/default.conf
envsubst '${API_URL}' </etc/nginx/conf.d/securityheaders.conf.template >/etc/nginx/conf.d/securityheaders.conf
