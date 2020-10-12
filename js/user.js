const modalMsg = document.createElement('div');
modalMsg.classList.add('modal-msg');
modalMsg.innerHTML = `<p>닉네임이 변경되었습니다</p>`;

if(!LS_userName) {
    $modalHomeDiv.style.display = 'block';
    $modalHomeBg.style.display = 'block';

    setTimeout(function() {
        $modalHomeDiv.classList.add('on');
        $modalHomeBg.classList.add('on');
    },500)
}else{
    $userName.textContent = LS_userName;
}

function setUserName() {
    localStorage.setItem('userName', $modalNameInput.value);
    $userName.textContent = LS_userName;
    
    $modalHomeDiv.classList.remove('on');
    $modalHomeBg.classList.remove('on');
    
    setTimeout(function() {
        $modalHomeDiv.style.display = 'none';
        $modalHomeBg.style.display = 'none';
    },500);
}

function changeUserName(e) {
    e.preventDefault();
    
    localStorage.setItem('userName', $settingNameInput.value);
    $userName.textContent = LS_userName;
    $settingNameInput.value = '';
    
    $settingWrap.appendChild(modalMsg);
    
    setTimeout(function(){
        $settingWrap.removeChild(modalMsg);
    },3000);
}

$modalFrm.addEventListener('submit',setUserName);