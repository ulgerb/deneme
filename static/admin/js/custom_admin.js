// Bulutistan Admin Panel Özel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Admin paneli başlığını güncelle
    updateAdminHeader();
    
    // Tablo satırlarına hover efekti ekle
    addTableHoverEffects();
    
    // Form alanlarına focus efekti ekle
    addFormFocusEffects();
    
    // Butonlara animasyon ekle
    addButtonAnimations();
    
    // Responsive menü ekle
    addResponsiveMenu();
    
    // Türkçe karakter desteği
    addTurkishSupport();
});

// Admin paneli başlığını güncelle
function updateAdminHeader() {
    const header = document.querySelector('#header h1');
    if (header) {
        header.innerHTML = '🌟 Bulutistan Yönetim Paneli';
        header.style.textAlign = 'center';
    }
    
    // Breadcrumb'ı güncelle
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (breadcrumbs) {
        breadcrumbs.innerHTML = breadcrumbs.innerHTML.replace('Home', 'Ana Sayfa');
        breadcrumbs.innerHTML = breadcrumbs.innerHTML.replace('Administration', 'Yönetim');
    }
}

// Tablo satırlarına hover efekti ekle
function addTableHoverEffects() {
    const tableRows = document.querySelectorAll('#changelist tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'all 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Form alanlarına focus efekti ekle
function addFormFocusEffects() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
            this.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
}

// Butonlara animasyon ekle
function addButtonAnimations() {
    const buttons = document.querySelectorAll('.button, input[type=submit], input[type=button], .submit-row input');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Responsive menü ekle
function addResponsiveMenu() {
    const header = document.querySelector('#header');
    if (header) {
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '☰';
        menuToggle.className = 'menu-toggle';
        menuToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            color: white;
            cursor: pointer;
            position: absolute;
            right: 20px;
            top: 20px;
        `;
        
        header.style.position = 'relative';
        header.appendChild(menuToggle);
        
        // Mobile menü toggle
        menuToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('#content-related');
            if (sidebar) {
                sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
            }
        });
        
        // Responsive CSS ekle
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            const sidebar = document.querySelector('#content-related');
            if (sidebar) {
                sidebar.style.display = 'none';
            }
        }
    }
}

// Türkçe karakter desteği
function addTurkishSupport() {
    // Form etiketlerini Türkçe'ye çevir
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        const text = label.textContent;
        if (text === 'Username') label.textContent = 'Kullanıcı Adı';
        if (text === 'Password') label.textContent = 'Şifre';
        if (text === 'Email') label.textContent = 'E-posta';
        if (text === 'First name') label.textContent = 'Ad';
        if (text === 'Last name') label.textContent = 'Soyad';
        if (text === 'Active') label.textContent = 'Aktif';
        if (text === 'Staff status') label.textContent = 'Personel Durumu';
        if (text === 'Superuser status') label.textContent = 'Süper Kullanıcı Durumu';
        if (text === 'Groups') label.textContent = 'Gruplar';
        if (text === 'User permissions') label.textContent = 'Kullanıcı İzinleri';
        if (text === 'Last login') label.textContent = 'Son Giriş';
        if (text === 'Date joined') label.textContent = 'Katılım Tarihi';
    });
    
    // Buton metinlerini Türkçe'ye çevir
    const buttons = document.querySelectorAll('input[type=submit], input[type=button]');
    buttons.forEach(button => {
        const value = button.value;
        if (value === 'Save') button.value = 'Kaydet';
        if (value === 'Save and add another') button.value = 'Kaydet ve Yeni Ekle';
        if (value === 'Save and continue editing') button.value = 'Kaydet ve Düzenlemeye Devam Et';
        if (value === 'Delete') button.value = 'Sil';
        if (value === 'Add') button.value = 'Ekle';
        if (value === 'Change') button.value = 'Değiştir';
    });
}

// Sayfa yüklendiğinde çalışacak ek fonksiyonlar
window.addEventListener('load', function() {
    // Başarı mesajlarını göster
    showSuccessMessages();
    
    // Hata mesajlarını göster
    showErrorMessages();
    
    // Uyarı mesajlarını göster
    showWarningMessages();
});

// Başarı mesajlarını göster
function showSuccessMessages() {
    const successMessages = document.querySelectorAll('.messagelist .success');
    successMessages.forEach(message => {
        message.style.animation = 'fadeIn 0.5s ease-out';
    });
}

// Hata mesajlarını göster
function showErrorMessages() {
    const errorMessages = document.querySelectorAll('.messagelist .error');
    errorMessages.forEach(message => {
        message.style.animation = 'fadeIn 0.5s ease-out';
    });
}

// Uyarı mesajlarını göster
function showWarningMessages() {
    const warningMessages = document.querySelectorAll('.messagelist .warning');
    warningMessages.forEach(message => {
        message.style.animation = 'fadeIn 0.5s ease-out';
    });
}

// Console'a hoş geldin mesajı
console.log('🌟 Bulutistan Admin Panel JavaScript yüklendi!');
console.log('🚀 Özel özellikler aktif edildi.');
