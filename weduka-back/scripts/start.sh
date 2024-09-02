#!/bin/sh

npm run migration:run

DATE=$(date)
echo "Current System Time: $DATE"
exec "$@"
