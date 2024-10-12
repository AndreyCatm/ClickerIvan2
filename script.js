// Начальные данные
let coins = 0;
let clicks = 0;
let isDarkTheme = false;
let clickMultiplier = 1;
let rankLevels = [10000, 25000, 50000, 100000];
let currentRank = 0; // 0 = Bronze, 1 = Silver, 2 = Gold, 3 = Platinum
let clickUpgradePrice = 50;

// Функция скрытия загрузчика
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Обновление счётчика кликов
function clickCoin() {
    coins += clickMultiplier;
    clicks++;
    document.getElementById('coins').textContent = coins;
    
    // Обновляем прогресс к следующему рангу
    updateProgress();
}

// Покупка улучшения кликов
function buyUpgrade() {
    if (coins >= clickUpgradePrice) {
        coins -= clickUpgradePrice;
        clickMultiplier++;
        clickUpgradePrice = Math.floor(clickUpgradePrice * 2.5); // Цена увеличивается
        document.getElementById('coins').textContent = coins;
        document.getElementById('click-price').textContent = clickUpgradePrice + " монет";
    } else {
        alert("Недостаточно монет!");
    }
}

// Обновление прогресса к новому рангу
function updateProgress() {
    let clicksToNextRank = rankLevels[currentRank] - clicks;
    if (clicksToNextRank <= 0) {
        levelUpRank();
    } else {
        document.getElementById('progress-text').textContent = `Кликов до повышения: ${clicksToNextRank}`;
        let progressPercent = (clicks / rankLevels[currentRank]) * 100;
        document.getElementById('progress').style.width = progressPercent + '%';
    }
}

// Повышение ранга
function levelUpRank() {
    currentRank++;
    clicks = 0; // Сброс кликов
    if (currentRank === 1) {
        document.getElementById('rank').textContent = "Silver 🥈";
    } else if (currentRank === 2) {
        document.getElementById('rank').textContent = "Gold 🥇";
    } else if (currentRank === 3) {
        document.getElementById('rank').textContent = "Platinum 🏆";
    }
    alert("Поздравляем, вы повысили ранг!");
}

// Переключение между тёмной и светлой темой
function toggleTheme() {
    if (isDarkTheme) {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
    } else {
        document.body.style.backgroundColor = '#222';
        document.body.style.color = '#ddd';
    }
    isDarkTheme = !isDarkTheme;
}

// Показать кликер
function showClicker() {
    document.querySelector('.clicker-container').style.display = 'block';
    document.querySelector('.shop').style.display = 'none';
}

// Показать магазин
function showShop() {
    document.querySelector('.clicker-container').style.display = 'none';
    document.querySelector('.shop').style.display = 'block';
}
