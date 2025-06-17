// Sayfanın tamamen yüklendiğinden emin olmak için bu olayı dinliyoruz.
document.addEventListener('DOMContentLoaded', () => {

    // --- Vücut Kitle İndeksi (VKİ) Hesaplayıcı ---
    const bmiForm = document.getElementById('bmi-form');
    if (bmiForm) {
        bmiForm.addEventListener('submit', (event) => {
            // ==== DÜZELTME: Bu satır, formun gönderilip sayfanın yenilenmesini engeller. ====
            event.preventDefault();

            // Gerekli elemanları ve değerleri al
            const heightInput = document.getElementById('height');
            const weightInput = document.getElementById('weight');
            const resultDiv = document.getElementById('bmi-result');

            const height = parseFloat(heightInput.value);
            const weight = parseFloat(weightInput.value);

            // Girdi kontrolü
            if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                resultDiv.innerHTML = `<p class="error">Lütfen geçerli boy ve kilo değerleri giriniz.</p>`;
                return;
            }

            // VKİ hesaplaması: kilo / (boy*boy) - boy metre cinsinden olmalı
            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2); // Sonucu 2 ondalık basamakla sınırla

            // VKİ sonucuna göre durumu belirle
            let category = '';
            let categoryClass = '';
            if (bmi < 18.5) {
                category = 'Zayıf';
                categoryClass = 'zayif';
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                category = 'Normal Kilolu';
                categoryClass = 'normal';
            } else if (bmi >= 25 && bmi <= 29.9) {
                category = 'Fazla Kilolu';
                categoryClass = 'kilolu';
            } else {
                category = 'Obez';
                categoryClass = 'obez';
            }
            
            // Sonucu ekrana yazdır
            resultDiv.innerHTML = `
                <p>Vücut Kitle İndeksiniz: <strong>${bmi}</strong></p>
                <p>Durumunuz: <span class="bmi-category ${categoryClass}">${category}</span></p>
            `;
        });
    }

    // --- Günlük Kalori İhtiyacı Hesaplayıcı ---
    const calorieForm = document.getElementById('calorie-form');
    if (calorieForm) {
        calorieForm.addEventListener('submit', (event) => {
            // ==== DÜZELTME: Bu satır, formun gönderilip sayfanın yenilenmesini engeller. ====
            event.preventDefault();

            // Gerekli elemanları ve değerleri al
            const age = parseFloat(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const height = parseFloat(document.getElementById('calorie-height').value);
            const weight = parseFloat(document.getElementById('calorie-weight').value);
            const activityFactor = parseFloat(document.getElementById('activity').value);
            const resultDiv = document.getElementById('calorie-result');

            // Girdi kontrolü
            if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
                resultDiv.innerHTML = `<p class="error">Lütfen tüm alanları geçerli değerlerle doldurunuz.</p>`;
                return;
            }

            // Bazal Metabolizma Hızı (BMR) Hesaplaması (Mifflin-St Jeor Formülü)
            let bmr = 0;
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else { // female
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }

            // Günlük kalori ihtiyacı: BMR * Aktivite Faktörü
            const dailyCalories = Math.round(bmr * activityFactor);

            // Sonucu ekrana yazdır
            resultDiv.innerHTML = `
                <p>Günlük almanız gereken yaklaşık kalori miktarı:</p>
                <p class="calorie-total">${dailyCalories} kcal</p>
            `;
        });
    }
});