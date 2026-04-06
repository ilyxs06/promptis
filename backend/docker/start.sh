#!/bin/bash

# Run migrations automatically
echo "Running database migrations..."
php artisan migrate --force

# Cache routes and config for performance
echo "Caching configuration and routes..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM in the background
echo "Starting PHP-FPM..."
php-fpm -D

# Start Nginx in the foreground
echo "Starting NGINX..."
nginx -g "daemon off;"
