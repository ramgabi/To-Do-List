const $modalHomeDiv = document.querySelector('.home-wrap .modal-div');
const $modalHomeBg = document.querySelector('.home-wrap .modal-bg');

if(!localStorage.userName) {

    $modalHomeDiv.style.display = 'block';
    $modalHomeBg.style.display = 'block';

    setTimeout(function() {
        $modalHomeDiv.classList.add('on');
        $modalHomeBg.classList.add('on');
    },500)
}else{
    document.querySelector('.user-name').textContent = localStorage.getItem('userName');
}

function setUserName() {
    localStorage.setItem('userName', document.querySelector('.home-wrap .modal-name-input').value);
    document.querySelector('.user-name').textContent = localStorage.getItem('userName');
    
    $modalHomeDiv.classList.remove('on');
    $modalHomeBg.classList.remove('on');
    
    setTimeout(function() {
        $modalHomeDiv.style.display = 'none';
        $modalHomeBg.style.display = 'none';
    },500)
}

document.querySelector('.home-wrap .modal-frm').addEventListener('submit',setUserName);

const modalMsg = document.createElement('div')
modalMsg.classList.add('modal-msg')
modalMsg.innerHTML = `<p>닉네임이 변경되었습니다</p>`

function changeUserName(e) {
    e.preventDefault();

    localStorage.setItem('userName', document.querySelector('.setting-frm .setting-name-input').value);
    document.querySelector('.user-name').textContent = localStorage.getItem('userName');
    document.querySelector('.setting-frm .setting-name-input').value = '';

    document.querySelector('.setting-wrap').appendChild(modalMsg)

    setTimeout(function(){
        document.querySelector('.setting-wrap').removeChild(modalMsg)
    },3000)

}



