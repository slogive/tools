# Setup a Node.js App with Nginx, Certbot and PM2

> Connect to your server through console

### Elevate priviliges

```bash
sudo su
```

### Update repositories

```bash
apt update
```

```bash
apt -y upgrade
```

<hr />

### Installing nginx

```bash
apt install -y nginx
```

> Check nginx installation

```bash
nginx -V
```

> Making Sure NGINX Starts After Boot

```bash
systemctl enable nginx
```

<hr />

### Installing Node.js

```bash
cd ~
```

```bash
curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
```

> You can inspect the contents of this script

```bash
nano nodesource_setup.sh
```

```bash
bash nodesource_setup.sh
```

```bash
apt install build-essential
```

<hr />

### Enabling the firewall

```bash
ufw app list
```

> Enable access to our server

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
```

> Enable the firewall

```bash
ufw enable
```

> Check the firewall status

```bash
ufw status
```

<hr />

### Creating proxy reverse

> Replace $DOMAIN with your domain for example
> api.growstation.io

```bash
mkdir -p /var/www/$DOMAIN
```

```bash
chown -R $USER:$USER /var/www/$DOMAIN
```

```bash
chmod -R 755 /var/www/$DOMAIN
```

> You will open the file and setup the proxy reverse with the following parameters

```bash
nano /etc/nginx/sites-available/$DOMAIN
```

> You can modify your sites-available specific file with your $DOMAIN name or replace all the content of it

```bash
# Proxy reverse section only
location / {
  proxy_pass https://127.0.0.1:$PORT/;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

```bash
# /etc/nginx/sites-available/$DOMAIN file
server {
  root /var/www/$DOMAIN;
  index index.html index.htm index.nginx-debian.html;

  server_name $DOMAIN;

  location / {
    proxy_pass https://127.0.0.1:$PORT/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
  if ($host = $DOMAIN) {
      return 301 https://$host$request_uri;
  } # managed by Certbot

  listen 80;
  listen [::]:80;

  server_name $DOMAIN;
  return 404; # managed by Certbot
}
```

```bash
ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
```

> Testing nginx config

```bash
nginx -t
```

> Reload nginx to load the new configuration

```bash
systemctl reload nginx
```

<hr />

### Intalling Certbot

```bash
apt install certbot python3-certbot-nginx
```

```bash
nginx -t
```

```bash
systemctl reload nginx
```

> Domain config (if you setup one with the nginx config)

```bash
certbot --nginx -d $DOMAIN -d www.$DOMAIN
```

> Subdomain config (if you setup one with the nginx config)

```bash
# Subdomains don't use www
certbot --nginx -d $DOMAIN -d
```

> Verifying Certbot Auto-Renewal

```bash
systemctl status certbot.timer
```

<hr />

### Install pm2

```bash
npm install pm2@latest -g
```

```bash
pm2 start $FILE.js --name $APP_NAME
```

> Useful commands for pm2

```bash
# Stop your app
pm2 stop

# Show your apps
pm2 list

# Restart your app
pm2 restart $APP_NAME

# Monit
pm2 monit
```

> That's everything
