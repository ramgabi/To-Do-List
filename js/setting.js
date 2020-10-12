// const

const $wrapper = document.querySelector('.wrapper');
const $home = document.querySelector('.home-wrap');
const $calendar = document.querySelector('.calendar-wrap');
const $timeline = document.querySelector('.timeline-wrap');
const $setting = document.querySelector('.setting-wrap');
const $sidebar = document.querySelector('.sidebar-list').children;

const $modalDiv = document.querySelector('.setting-wrap .modal-div');
const $modalBg = document.querySelector('.setting-wrap .modal-bg');
const $themeChk = document.querySelector('.setting-theme-chk');
const $sidebarChk = document.querySelector('.setting-mode-chk');
const $sidebarWrap = document.querySelector('.sidebar-wrap');

const $modalHomeDiv = document.querySelector('.home-wrap .modal-div');
const $modalHomeBg = document.querySelector('.home-wrap .modal-bg');
const $userName = document.querySelector('.user-name');
const $modalFrm = document.querySelector('.home-wrap .modal-frm');
const $modalNameInput = document.querySelector('.home-wrap .modal-name-input');
const $settingNameInput = document.querySelector('.setting-frm .setting-name-input');

const $weather = document.querySelector('.weather');
const $weatherLoaction = document.querySelector('.weather-location');
const $weatherNum = document.querySelector('.weather-num');

const $memoList = document.querySelector('.home-wrap .memo-list');
const $todayMsg = document.querySelector('.today-msg');

const wrapArr = [$home, $calendar, $timeline, $setting];

const LS_userName = localStorage.userName;
const LS_themeMode = localStorage.themeMode;
const LS_sidebarMode = localStorage.sidebarMode;

const backgroundURL = 'https://source.unsplash.com/random/1920x1080';

// random background

$wrapper.style.backgroundImage = `url(${backgroundURL})`;

// modal 

function openModalForReset(e) {
    e.preventDefault();

    $modalDiv.style.display = 'block';
    $modalBg.style.display = 'block';

    //자연스러운 transition을 위해 setTimeout적용

    setTimeout(function() {
        $modalDiv.classList.add('on');
        $modalBg.classList.add('on');
    },500);

}

function closeModalForReset(e) {
    e.preventDefault();
    
    $modalDiv.classList.remove('on');
    $modalBg.classList.remove('on');
    
    setTimeout(function() {
        $modalDiv.style.display = 'none';
        $modalBg.style.display = 'none';
    },500);
    
}

document.querySelector('.setting-del').addEventListener('click',openModalForReset);

// reset

function resetData(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
}

// Theme mode

let isCheck = false;

if(LS_themeMode == 'true') {
    $wrapper.classList.add('dark');
    $themeChk.checked = true;
}

function settimgForTheme() {
    $wrapper.classList.toggle('dark');
    // checkbox를 누르는 시점엔 check가 안되어있기 때문에 반대로 표기함
    !$themeChk.checked ? isCheck = true : isCheck = false;

    localStorage.setItem('themeMode',isCheck);
}

// sidebar mode

if(LS_sidebarMode == 'true') {
    $sidebarWrap.classList.add('left');
    $sidebarChk.checked = true;
}

function settimgForSidebar() {
    $sidebarWrap.classList.toggle('left');
    !$sidebarChk.checked ? isCheck = true : isCheck = false;
    localStorage.setItem('sidebarMode',isCheck);
}