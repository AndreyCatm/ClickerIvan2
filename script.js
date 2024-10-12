let coins = 0; // Начальное количество монет
let clickMultiplier = 1; // Множитель кликов
let clickUpgradePrice = 50; // Начальная цена улучшения кликов
let minerPrice = 1000; // Цена шахтера
let rkPrice = 10000; // Цена для входа на РК
let friendPrice = 30000; // Цена для нахождения друга
let minerActive = false; // Флаг активности шахтера
let friendActive = false; // Флаг активности друга
let minerInterval; // Таймер для шахтера
let friendInterval; // Таймер для друга

// Показать кликер
function showClicker() {
    document.querySelector('.clicker-container').style.display = 'block'; // Показываем кликер
    document.querySelector('.shop').style.display = 'none'; // Скрываем магазин
}

// Показать магазин
function showShop() {
    document.querySelector('.clicker-container').style.display = 'none'; // Скрываем кликер
    document.querySelector('.shop').style.display = 'block'; // Показываем магазин
}

// Клик по монете
function clickCoin() {
    coins += clickMultiplier; // Увеличиваем количество монет
    document.getElementById('coins').textContent = coins; // Обновляем отображение монет
}

// Покупка улучшения кликов
function buyUpgrade() {
    if (coins >= clickUpgradePrice) {
        coins -= clickUpgradePrice; // Уменьшаем количество монет
        clickMultiplier++; // Увеличиваем множитель кликов
        clickUpgradePrice = Math.floor(clickUpgradePrice * 2.5); // Увеличиваем цену
        document.getElementById('coins').textContent = coins; // Обновляем отображение монет
        document.getElementById('click-price').textContent = clickUpgradePrice + " монет"; // Обновляем цену
    } else {
        alert("Недостаточно монет!");
    }
}

// Покупка шахтера
function buyMiner() {
    if (coins >= minerPrice) {
        coins -= minerPrice; // Уменьшаем количество монет
        document.getElementById('coins').textContent = coins; // Обновляем отображение монет
        minerActive = true; // Активируем шахтера
        document.getElementById('miner-timer').style.display = 'block'; // Показываем таймер шахтера
        startMinerTimer(); // Запускаем таймер для шахтера
    } else {
        alert("Недостаточно монет!");
    }
}

// Таймер для шахтера
function startMinerTimer() {
    minerInterval = setInterval(() => {
        coins += 1500; // Шахтер дает 1500 монет
        document.getElementById('coins').textContent = coins; // Обновляем отображение монет
    }, 30000); // Каждые 30 секунд
}

// Покупка РК
function buyRK() {
    if (coins >= rkPrice) {
        coins -= rkPrice; // Уменьшаем количество монет
        document.getElementById('coins').textContent = coins; // Обновляем отображение монет
        document.getElementById('friend-upgrade').style.display = 'block'; // Показываем опцию "Найти друга"
    } else {
        alert("Недостаточно монет!");
    }
}

// Покупка друга
function buyFriend() {
    if (coins >= friendPrice) {
        coins -= friendPrice; // Уменьшаем количество монет
        document.getElementById('coins').textContent = coins; // Обновляем отображение монет
        friendActive = true; // Активируем друга
        document.getElementById('friend-timer').style.display = 'block'; // Показываем таймер друга
        startFriendTimer(); // Запускаем таймер для друга
    } else {
        alert("Недостаточно монет!");
    }
}

// Таймер для друга
function startFriendTimer() {
    friendInterval = setInterval(() => {
        coins += 5000; // Друг дает 5000 монет
        document.getElementById('coins').textContent = coins; // Обновляем отображение монет
    }, 90000); // Каждые 1.5 минуты
}

// Загрузка кликера
window.onload = function() {
    hideLoader();
};

// Скрытие загрузчика
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Переключение темы
let isDarkTheme = false; // Флаг темной темы

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
