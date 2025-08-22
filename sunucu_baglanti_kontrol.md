# 🔌 Sunucu Bağlantı Kontrol Listesi

## 📊 Mevcut Durum
- **Sunucu IP:** 10.40.39.24
- **Hostname:** ubuntu
- **İşletim Sistemi:** Ubuntu Linux (64-bit)
- **Durum:** PoweredOn
- **Uptime:** 0d 1h 15m

## 🚨 Bağlantı Sorunları
- ❌ SSH bağlantısı zaman aşımı
- ❌ Ping testi başarısız
- ❌ Port 22 (SSH) kapalı

## 🔧 Çözüm Yöntemleri

### 1. VMware vSphere Client Üzerinden
```
1. vSphere Client'a giriş yapın
2. Sunucuya sağ tıklayın
3. "Open Console" seçin
4. Konsol üzerinden terminal erişimi sağlayın
```

### 2. SSH Servisini Etkinleştirme
Konsol üzerinden:
```bash
# SSH servisini kontrol et
sudo systemctl status ssh

# SSH servisini etkinleştir
sudo systemctl enable ssh
sudo systemctl start ssh

# SSH port'unu aç
sudo ufw allow ssh
sudo ufw allow 22

# SSH konfigürasyonını kontrol et
sudo nano /etc/ssh/sshd_config
```

### 3. Ağ Yapılandırması Kontrolü
```bash
# IP adresini kontrol et
ip addr show

# Gateway'i kontrol et
ip route show

# DNS ayarlarını kontrol et
cat /etc/resolv.conf

# Network servislerini yeniden başlat
sudo systemctl restart networking
sudo systemctl restart systemd-networkd
```

### 4. Güvenlik Duvarı Ayarları
```bash
# UFW durumunu kontrol et
sudo ufw status

# SSH için kural ekle
sudo ufw allow ssh
sudo ufw allow 22/tcp

# Güvenlik duvarını etkinleştir
sudo ufw enable
```

### 5. SSH Konfigürasyonu
```bash
# SSH config dosyasını düzenle
sudo nano /etc/ssh/sshd_config

# Önemli ayarlar:
Port 22
ListenAddress 0.0.0.0
PermitRootLogin no
PasswordAuthentication yes
PubkeyAuthentication yes

# SSH servisini yeniden başlat
sudo systemctl restart ssh
```

## 📋 Test Komutları

### Bağlantı Testi
```bash
# Yerel test
ssh localhost

# Port testi
sudo netstat -tlnp | grep :22

# SSH log'larını kontrol et
sudo tail -f /var/log/auth.log
```

### Ağ Testi
```bash
# Ping testi
ping -c 4 8.8.8.8

# DNS testi
nslookup google.com

# Port tarama
sudo nmap -p 22 10.40.39.24
```

## 🚀 Django Deployment Sonrası

Bağlantı sağlandıktan sonra:

1. **Proje dosyalarını kopyala:**
```bash
scp -r bulutistan/ ubuntu@10.40.39.24:/var/www/
```

2. **Deployment script'ini çalıştır:**
```bash
ssh ubuntu@10.40.39.24
cd /var/www/bulutistan
chmod +x deploy.sh
./deploy.sh
```

3. **Servisleri kontrol et:**
```bash
sudo systemctl status bulutistan
sudo systemctl status nginx
sudo systemctl status postgresql
```

## 🔍 Hata Ayıklama

### SSH Bağlantı Hataları
```bash
# SSH debug modu
ssh -v ubuntu@10.40.39.24

# Verbose log
ssh -vvv ubuntu@10.40.39.24
```

### Network Hataları
```bash
# Interface durumu
ip link show

# Routing tablosu
ip route show

# ARP tablosu
ip neigh show
```

## 📞 Acil Durum

Eğer hiçbir yöntem işe yaramazsa:

1. **VMware vSphere Client** üzerinden sunucuyu yeniden başlatın
2. **Network adapter** ayarlarını kontrol edin
3. **VMware Tools** güncel olduğundan emin olun
4. **Snapshot** alın ve geri yükleyin

---

**Not:** Bu kontrolleri sırasıyla yapın ve her adımda sonucu test edin.
