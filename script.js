// Начальные данные
let coins = 0;
let clicks = 0;
let isDarkTheme = false;
let clickMultiplier = 1;
let rankLevels = [1000, 5000, 20000, 50000];
let currentRank = 0; // 0 = Bronze, 1 = Silver, 2 = Gold, 3 = Platinum
let clickUpgradePrice = 50;

let minerPrice = 1000;
let rkPrice = 10000;
let friendPrice = 30000;

let minerActive = false;
let friendActive = false;

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

// Покупка шахтера
function buyMiner() {
    if (coins >= minerPrice) {
        coins -= minerPrice;
        document.getElementById('coins').textContent = coins;
        minerActive = true;
        document.getElementById('miner-timer').style.display = 'block';
        startMinerTimer();
    } else {
        alert("Недостаточно монет!");
    }
}

// Покупка РК
function buyRK() {
    if (coins >= rkPrice) {
        coins -= rkPrice;
        document.getElementById('coins').textContent = coins;
        document.getElementById('friend-upgrade').style.display = 'block';
    } else {
        alert("Недостаточно монет!");
    }
}

// Покупка друга
function buyFriend() {
    if (coins >= friendPrice) {
        coins -= friendPrice;
        document.getElementById('coins').textContent = coins;
        friendActive = true;
        document.getElementById('friend-timer').style.display = 'block';
        startFriendTimer();
    } else {
        alert("Недостаточно монет!");
    }
}

// Таймер для шахтера (выдача 1.5K монет каждые 30 секунд)
function startMinerTimer() {
    let minerTime = 30;
    let minerInterval = setInterval(function() {
        if (minerTime <= 0) {
            coins += 1500;
            document.getElementById('coins').textContent = coins;
            minerTime = 30; // Сброс таймера
        }
        document.getElementById('miner-timer').textContent = `⛏ Шахтер: ${minerTime}с`;
        minerTime--;
    }, 1000);
}

// Таймер для друга (выдача 5K монет каждые 1.5 минуты)
function startFriendTimer() {
    let friendTime = 90;
    let friendInterval = setInterval(function() {
        if (friendTime <= 0) {
            coins += 5000;
            document.getElementById('coins').textContent = coins;
            friendTime = 90; // Сброс таймера
        }
        document.getElementById('friend-timer').textContent = `👤 Друг: ${friendTime}с`;
        friendTime--;
    }, 1000);
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
        document.body.style.backgroundColor = '#f0f0f0'; // Светлая тема
        document.body.style.color = '#000';
        isDarkTheme = false;
    } else {
        document.body.style.backgroundColor = '#333'; // Тёмная тема
        document.body.style.color = '#fff';
        isDarkTheme = true;
    }
}

