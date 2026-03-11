# Ascension Codex - Private Server Deployment Guide

## Overview
This guide covers deploying the Ascension Codex application to your private web server with a custom domain name.

## Prerequisites
- Private web server with Node.js 18+ support
- PostgreSQL database (local or cloud)
- Custom domain name configured
- SSL certificate for HTTPS
- Server access (SSH/FTP)

## Step 1: Build the Application

### 1.1 Production Build
```bash
# Install dependencies
npm install

# Build frontend assets
npm run build

# The built files will be in:
# - dist/public/ (frontend static files)
# - dist/index.js (backend server bundle)
```

### 1.2 Environment Configuration
Create a `.env.production` file on your server:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/ascension_codex
GEMINI_API_KEY=your_gemini_api_key_here
```

## Step 2: Server Setup

### 2.1 File Structure on Server
```
/var/www/ascension-codex/
├── dist/
│   ├── index.js          # Built server
│   └── public/           # Built frontend assets
├── package.json
├── package-lock.json
├── .env.production
└── uploads/              # For any file uploads
```

### 2.2 Upload Files
Upload these files to your server:
- `dist/` folder (entire contents)
- `package.json`
- `package-lock.json`
- `drizzle.config.ts`
- `shared/` folder (for database schema)

## Step 3: Database Setup

### 3.1 PostgreSQL Installation (if needed)
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE ascension_codex;
CREATE USER ascension_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE ascension_codex TO ascension_user;
\q
```

### 3.2 Run Database Migrations
```bash
cd /var/www/ascension-codex
npm install
npm run db:push
```

## Step 4: Process Management

### 4.1 Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'ascension-codex',
    script: './dist/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
EOF

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4.2 Alternative: Systemd Service
```bash
# Create service file
sudo nano /etc/systemd/system/ascension-codex.service

# Add content:
[Unit]
Description=Ascension Codex Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/ascension-codex
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
Environment=NODE_ENV=production
EnvironmentFile=/var/www/ascension-codex/.env.production

[Install]
WantedBy=multi-user.target

# Enable and start
sudo systemctl enable ascension-codex
sudo systemctl start ascension-codex
```

## Step 5: Web Server Configuration

### 5.1 Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/x-javascript
        application/javascript
        application/xml+rss
        application/json;

    # Static files
    location /assets/ {
        alias /var/www/ascension-codex/dist/public/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API and dynamic content
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5.2 Apache Configuration
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    Redirect permanent / https://yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com

    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/your/certificate.crt
    SSLCertificateKeyFile /path/to/your/private.key

    # Static files
    DocumentRoot /var/www/ascension-codex/dist/public
    Alias /assets /var/www/ascension-codex/dist/public/assets

    # Proxy to Node.js application
    ProxyPreserveHost On
    ProxyRequests Off
    ProxyPass /api/ http://localhost:3000/api/
    ProxyPassReverse /api/ http://localhost:3000/api/
    
    # Fallback to Node.js for SPA routing
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . http://localhost:3000%{REQUEST_URI} [P,L]
</VirtualHost>
```

## Step 6: Domain Configuration

### 6.1 DNS Settings
Configure your domain's DNS to point to your server:
```
Type: A
Name: @
Value: your_server_ip_address

Type: A  
Name: www
Value: your_server_ip_address
```

### 6.2 SSL Certificate
Option 1 - Let's Encrypt (Free):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Option 2 - Commercial Certificate:
- Purchase SSL certificate from provider
- Follow provider's installation instructions

## Step 7: Final Steps

### 7.1 Test the Deployment
```bash
# Check application status
pm2 status
# or
sudo systemctl status ascension-codex

# Test database connection
psql -h localhost -U ascension_user -d ascension_codex -c "SELECT 1;"

# Check web server
sudo nginx -t && sudo systemctl reload nginx
# or
sudo apache2ctl configtest && sudo systemctl reload apache2
```

### 7.2 Set Up Monitoring
```bash
# PM2 monitoring
pm2 monit

# System monitoring with logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Step 8: Maintenance

### 8.1 Updates
```bash
# Stop application
pm2 stop ascension-codex

# Upload new dist/ folder
# Run database migrations if needed
npm run db:push

# Start application
pm2 start ascension-codex
```

### 8.2 Backups
```bash
# Database backup
pg_dump -h localhost -U ascension_user ascension_codex > backup_$(date +%Y%m%d).sql

# File backup
tar -czf ascension_codex_$(date +%Y%m%d).tar.gz /var/www/ascension-codex/
```

## Security Considerations

1. **Firewall**: Only open ports 22 (SSH), 80 (HTTP), 443 (HTTPS)
2. **Database**: Restrict database access to localhost only
3. **Environment Variables**: Never commit `.env` files to version control
4. **Updates**: Keep system and dependencies updated
5. **Monitoring**: Set up log monitoring and alerts

## Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure port 3000 isn't used by other applications
2. **Database connection**: Verify DATABASE_URL format and credentials
3. **SSL issues**: Check certificate paths and permissions
4. **Static files**: Ensure proper file permissions (644 for files, 755 for directories)

### Logs
```bash
# Application logs
pm2 logs ascension-codex

# System logs
journalctl -u ascension-codex -f

# Web server logs
tail -f /var/log/nginx/error.log
```

## Performance Optimization

1. **CDN**: Consider using a CDN for static assets
2. **Caching**: Implement Redis for session storage
3. **Database**: Optimize PostgreSQL settings for your server specs
4. **Monitoring**: Use tools like New Relic or DataDog for performance monitoring

Your Ascension Codex application will be accessible at your custom domain with full functionality, including the VERS AI Assistant, spiritual development tracking, and all interactive features.