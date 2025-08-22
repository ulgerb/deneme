# 🌟 Bulutistan Django Projesi

Bu proje, Django framework kullanılarak geliştirilmiş modern web uygulamasıdır.

## 🚀 Özellikler

- Django 4.2.7
- PostgreSQL veritabanı
- Gunicorn web sunucusu
- Nginx reverse proxy
- Production-ready yapılandırma
- Türkçe dil desteği

## 📋 Gereksinimler

- Python 3.8+
- PostgreSQL 12+
- Ubuntu 20.04+ (Production)
- Git

## 🛠️ Kurulum

### Geliştirme Ortamı

1. **Repository'yi klonlayın:**
```bash
git clone <repository-url>
cd bulutistan
```

2. **Virtual environment oluşturun:**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# veya
venv\Scripts\activate  # Windows
```

3. **Bağımlılıkları yükleyin:**
```bash
pip install -r requirements.txt
```

4. **Veritabanı migration'larını çalıştırın:**
```bash
python manage.py migrate
```

5. **Superuser oluşturun:**
```bash
python manage.py createsuperuser
```

6. **Geliştirme sunucusunu başlatın:**
```bash
python manage.py runserver
```

### Production Ortamı

1. **Sunucuya bağlanın:**
```bash
ssh ubuntu@10.40.39.24
```

2. **Deployment script'ini çalıştırın:**
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🗄️ Veritabanı Yapılandırmı

### PostgreSQL Kurulumu

```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# Servisi başlatın
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Veritabanı Oluşturma

```sql
CREATE DATABASE bulutistan_db;
CREATE USER bulutistan_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE bulutistan_db TO bulutistan_user;
ALTER USER bulutistan_user CREATEDB;
```

## ⚙️ Environment Değişkenleri

`.env` dosyası oluşturun:

```env
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,10.40.39.24
DATABASE_URL=postgresql://username:password@localhost:5432/bulutistan_db
```

## 🌐 Production Deployment

### Gunicorn

```bash
# Gunicorn ile çalıştırma
gunicorn --config gunicorn.conf.py bulutistan.wsgi:application

# Systemd service olarak
sudo systemctl start bulutistan
sudo systemctl enable bulutistan
```

### Nginx

Nginx konfigürasyonu `/etc/nginx/sites-available/bulutistan` dosyasında bulunur.

## 📁 Proje Yapısı

```
bulutistan/
├── bulutistan/          # Ana proje dizini
│   ├── __init__.py
│   ├── settings.py      # Geliştirme ayarları
│   ├── settings_production.py  # Production ayarları
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── manage.py
├── requirements.txt      # Python bağımlılıkları
├── gunicorn.conf.py     # Gunicorn konfigürasyonu
├── deploy.sh            # Deployment script'i
└── README.md
```

## 🔧 Yönetim Komutları

### Django

```bash
# Migration'ları oluştur
python manage.py makemigrations

# Migration'ları uygula
python manage.py migrate

# Static dosyaları topla
python manage.py collectstatic

# Shell'i başlat
python manage.py shell

# Test'leri çalıştır
python manage.py test
```

### Sunucu

```bash
# Gunicorn durumu
sudo systemctl status bulutistan

# Nginx durumu
sudo systemctl status nginx

# Logları görüntüle
sudo journalctl -u bulutistan -f
sudo tail -f /var/log/nginx/error.log
```

## 🚨 Güvenlik

- `DEBUG=False` production'da
- Güçlü `SECRET_KEY` kullanın
- `ALLOWED_HOSTS` ayarlayın
- Firewall kurallarını yapılandırın
- SSL sertifikası ekleyin

## 📊 Monitoring

### Log Dosyaları

- Django: `/var/www/bulutistan/logs/django.log`
- Gunicorn: `sudo journalctl -u bulutistan`
- Nginx: `/var/log/nginx/`

### Performans

```bash
# Sistem kaynakları
htop
df -h
free -h

# Port durumu
sudo netstat -tlnp
```

## 🆘 Sorun Giderme

### Yaygın Sorunlar

1. **Port 8000 kullanımda:**
```bash
sudo lsof -i :8000
sudo kill -9 <PID>
```

2. **Permission hatası:**
```bash
sudo chown -R $USER:$USER /var/www/bulutistan
```

3. **Veritabanı bağlantı hatası:**
```bash
sudo systemctl status postgresql
sudo -u postgres psql -c "\l"
```

## 📞 Destek

Sorun yaşadığınızda:

1. Log dosyalarını kontrol edin
2. Servis durumlarını kontrol edin
3. Network bağlantısını test edin
4. Firewall ayarlarını kontrol edin

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**Not:** Production ortamında kullanmadan önce güvenlik ayarlarını gözden geçirin ve test edin.
