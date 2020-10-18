// time

const $date = document.querySelector('.date');
const $time = document.querySelector('.time');
const $hour = document.querySelector('.hour');
const $minute = document.querySelector('.minute');
const $second = document.querySelector('.second');

const weekArr = ['일','월','화','수','목','금','토'];

function makeStyle(rowText) {
    return rowText.padStart(2,'0');
}

function updateTime(){
    const now = new Date();
    
    const nowYear = now.getFullYear();
    const nowMonth = makeStyle(`${now.getMonth()+1}`);
    const nowDate = makeStyle(`${now.getDate()}`);
    const nowDay = weekArr[now.getDay()];

    const nowHours = makeStyle(`${now.getHours()}`);
    const nowMinutes = makeStyle(`${now.getMinutes()}`);
    const nowSeconds = makeStyle(`${now.getSeconds()}`);
    
    $date.textContent = `${nowYear}년 ${nowMonth}월 ${nowDate}일 ${nowDay}요일`;
    $hour.textContent = nowHours;
    $minute.textContent = nowMinutes;
    $second.textContent = nowSeconds;

}

setInterval(updateTime,1000);