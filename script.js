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
let rankProgress = 0; // Прогресс ранга
let rankThresholds = [1000, 5000, 20000, 50000]; // Пороговые значения для повышения ранга
let currentRankIndex = 0; // Индекс текущего ранга
let minerTimeLeft = 30; // Время до выдачи от шахтера
let friendTimeLeft = 90; // Время до выдачи от друга

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
    updateRankProgress(clickMultiplier); // Обновляем прогресс ранга
}

// Обновление прогресса ранга
function updateRankProgress(amount) {
    rankProgress += amount; // Увеличиваем прогресс
    document.getElementById('rank-progress').style.width = (rankProgress / rankThresholds[currentRankIndex] * 100) + '%'; // Обновляем полосу прогресса

    // Проверка на повышение ранга
    if (rankProgress >= rankThresholds[currentRankIndex]) {
        currentRankIndex++; // Увеличиваем индекс текущего ранга
        if (currentRankIndex < rankThresholds.length) {
            alert('Поздравляем! Вы повысили ранг!');
        } else {
            alert('Вы достигли максимального ранга!');
        }
        rankProgress = 0; // Сбрасываем прогресс
        document.getElementById('rank-progress').style.width = '0%'; // Сбрасываем полосу
    }
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
        document.getElementById('miner-price').textContent = 'Куплен'; // Обновляем текст цены шахтера
    } else {
        alert("Недостаточно монет!");
    }
}

// Таймер для шахтера
function startMinerTimer() {
    minerTimeLeft = 30; // Сбрасываем время
    document.getElementById('miner-time').textContent = minerTimeLeft + " секунд до выдачи"; // Отображаем время
    minerInterval = setInterval(() => {
        minerTimeLeft--;
        document.getElementById('miner-time').textContent = minerTimeLeft + " секунд до выдачи"; // Обновляем время до выдачи

        if (minerTimeLeft <= 0) {
            coins += 1500; // Шахтер дает 1500 монет
            document.getElementById('coins').textContent = coins; // Обновляем отображение монет
            minerTimeLeft = 30; // Сбрасываем время
        }
    }, 1000); // Каждую секунду
}

// Покупка РК
function buyRK() {
    if (coins >= rkPrice) {
        coins -= rkPrice; // Уменьшаем количество монет
        document.getElementById('coins').textContent = coins; // Обновляем отображение монет
        document.getElementById('rk-upgrade').style.display = 'block'; // Показываем опцию "Зайти на РК"
        document.getElementById('rk-price').textContent = 'Куплен'; // Обновляем текст цены РК
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
        document.getElementById('friend-price').textContent = 'Куплен'; // Обновляем текст цены друга
    } else {
        alert("Недостаточно монет!");
    }
}

// Таймер для друга
function startFriendTimer() {
    friendTimeLeft = 90; // Сбрасываем время
    document.getElementById('friend-time').textContent = friendTimeLeft + " секунд до выдачи"; // Отображаем время
    friendInterval = setInterval(() => {
        friendTimeLeft--;
        document.getElementById('friend-time').textContent = friendTimeLeft + " секунд до выдачи"; // Обновляем время до выдачи

        if (friendTimeLeft <= 0) {
            coins += 5000; // Друг дает 5000 монет
            document.getElementById('coins').textContent = coins; // Обновляем отображение монет
            friendTimeLeft = 90; // Сбрасываем время
        }
    }, 1000); // Каждую секунду
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
