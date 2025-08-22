#!/bin/bash

# Bulutistan Django Projesi Deployment Script
# Ubuntu Server için

echo "🚀 Bulutistan Django Projesi Deployment Başlatılıyor..."

# Sistem güncellemeleri
echo "📦 Sistem güncellemeleri yapılıyor..."
sudo apt update && sudo apt upgrade -y

# Gerekli paketlerin kurulumu
echo "🔧 Gerekli paketler kuruluyor..."
sudo apt install -y python3 python3-pip python3-venv postgresql postgresql-contrib nginx git curl

# PostgreSQL kurulumu ve yapılandırması
echo "🐘 PostgreSQL kuruluyor ve yapılandırılıyor..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# PostgreSQL kullanıcı ve veritabanı oluşturma
sudo -u postgres psql -c "CREATE DATABASE bulutistan_db;"
sudo -u postgres psql -c "CREATE USER bulutistan_user WITH PASSWORD 'your_secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE bulutistan_db TO bulutistan_user;"
sudo -u postgres psql -c "ALTER USER bulutistan_user CREATEDB;"

# Proje dizini oluşturma
echo "📁 Proje dizini oluşturuluyor..."
sudo mkdir -p /var/www/bulutistan
sudo chown $USER:$USER /var/www/bulutistan

# Log dizini oluştur
echo "📝 Log dizini oluşturuluyor..."
mkdir -p /var/www/bulutistan/logs
sudo chown -R $USER:$USER /var/www/bulutistan/logs

# Python virtual environment oluşturma
echo "🐍 Python virtual environment oluşturuluyor..."
cd /var/www/bulutistan
python3 -m venv venv
source venv/bin/activate

# Django ve gerekli paketlerin kurulumu
echo "📚 Python paketleri kuruluyor..."
pip install --upgrade pip
pip install -r requirements.txt

# Environment değişkenleri
echo "⚙️ Environment değişkenleri ayarlanıyor..."
cat > .env << EOF
SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,10.40.39.24
DATABASE_URL=postgresql://bulutistan_user:your_secure_password@localhost:5432/bulutistan_db
EOF

# Django ayarları
export DJANGO_SETTINGS_MODULE=bulutistan.settings_production

# Veritabanı migration'ları
echo "🗄️ Veritabanı migration'ları yapılıyor..."
python manage.py migrate

# Static dosyaların toplanması
echo "📁 Static dosyalar toplanıyor..."
python manage.py collectstatic --noinput

# Superuser oluşturma (eğer yoksa)
echo "👤 Superuser kontrol ediliyor..."
if ! python manage.py shell -c "from django.contrib.auth.models import User; User.objects.filter(username='admin').exists()" 2>/dev/null; then
    echo "👤 Yeni superuser oluşturuluyor..."
    python manage.py createsuperuser --username admin --email admin@bulutistan.com --noinput
    python manage.py shell -c "from django.contrib.auth.models import User; u = User.objects.get(username='admin'); u.set_password('admin123'); u.save(); print('Admin şifresi: admin123')"
else
    echo "👤 Admin kullanıcısı zaten mevcut"
fi

# Gunicorn systemd service oluşturma
echo "🔧 Gunicorn systemd service oluşturuluyor..."
sudo tee /etc/systemd/system/bulutistan.service > /dev/null << EOF
[Unit]
Description=Bulutistan Django Application
After=network.target

[Service]
User=$USER
Group=$USER
WorkingDirectory=/var/www/bulutistan
Environment="PATH=/var/www/bulutistan/venv/bin"
Environment="DJANGO_SETTINGS_MODULE=bulutistan.settings_production"
ExecStart=/var/www/bulutistan/venv/bin/gunicorn --config gunicorn.conf.py bulutistan.wsgi:application
ExecReload=/bin/kill -s HUP \$MAINPID
Restart=always
StandardOutput=append:/var/www/bulutistan/logs/gunicorn.log
StandardError=append:/var/www/bulutistan/logs/gunicorn.log

[Install]
WantedBy=multi-user.target
EOF

# Nginx konfigürasyonu
echo "🌐 Nginx konfigürasyonu yapılıyor..."
sudo tee /etc/nginx/sites-available/bulutistan > /dev/null << EOF
server {
    listen 80;
    server_name 10.40.39.24;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        root /var/www/bulutistan;
    }

    location /media/ {
        root /var/www/bulutistan;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/bulutistan/bulutistan.sock;
    }
}
EOF

# Nginx site'ını etkinleştirme
sudo ln -s /etc/nginx/sites-available/bulutistan /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx

# Gunicorn service'ini başlatma
echo "🚀 Gunicorn service başlatılıyor..."
sudo systemctl daemon-reload
sudo systemctl start bulutistan
sudo systemctl enable bulutistan

# Firewall ayarları
echo "🔥 Firewall ayarları yapılıyor..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

echo "✅ Deployment tamamlandı!"
echo "🌐 Uygulama: http://10.40.39.24"
echo "📊 Gunicorn durumu: sudo systemctl status bulutistan"
echo "📊 Nginx durumu: sudo systemctl status nginx"
echo "📝 Loglar: sudo journalctl -u bulutistan -f"
