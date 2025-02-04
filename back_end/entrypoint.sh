#!/bin/sh

until ping -c 1 mysql
do
    echo "Waiting for mysql..."
    sleep 0.5
done

exec "$@"