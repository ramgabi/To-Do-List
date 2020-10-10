// reset

const $modalDiv = document.querySelector('.setting-wrap .modal-div');
const $modalBg = document.querySelector('.setting-wrap .modal-bg');

function openModalDel(e) {
    e.preventDefault();

    $modalDiv.style.display = 'block';
    $modalBg.style.display = 'block';

    setTimeout(function() {
        $modalDiv.classList.add('on');
        $modalBg.classList.add('on');
    },500)

}

document.querySelector('.setting-del').addEventListener('click',openModalDel)

function closeModalDel(e) {
    e.preventDefault();
    
    $modalDiv.classList.remove('on');
    $modalBg.classList.remove('on');
    
    setTimeout(function() {
        $modalDiv.style.display = 'none';
        $modalBg.style.display = 'none';
    },500)
    
}

function resetData(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
}


// soft Theme mode & background

const $themeChk = document.querySelector('.setting-theme-chk');
const $wrapper = document.querySelector('.wrapper');

const backgroundURL = 'https://source.unsplash.com/random/1920x1080';

console.log($wrapper.style.backgroundImage = `url(${backgroundURL})`);

if(localStorage.getItem('themeMode') == 'true') {
    $wrapper.classList.add('dark');
    $themeChk.checked = true;
}

function themeMode() {
    if(!$themeChk.checked) {
        $wrapper.classList.add('dark');
        localStorage.setItem('themeMode',true);

        return;
    }
    $wrapper.classList.remove('dark');
    localStorage.setItem('themeMode',false);
}



// sidebar mode

const $sidebarChk = document.querySelector('.setting-mode-chk');
const $sidebarWrap = document.querySelector('.sidebar-wrap');

if(localStorage.getItem('sidebarMode') == 'true') {
    $sidebarWrap.classList.add('left');
    $sidebarChk.checked = true;
}

function sidebarMode() {
    if(!$sidebarChk.checked) {
        $sidebarWrap.classList.add('left');
        localStorage.setItem('sidebarMode',true);

        return;
    }
    $sidebarWrap.classList.remove('left');
    localStorage.setItem('sidebarMode',false);
}

