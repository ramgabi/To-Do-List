// 인덱스값 얻기

function getIndex(ele) {
    let index = 0;

    while((ele = ele.previousSibling) != null) {
        if(ele.nodeType === 1) index++;
    }

    return index;
}

// mene 전환

let isAnimated = false;

function selectMenu(e) {
    e.preventDefault();
    
    const clickMenu = e.target.parentNode;
    clickMenu.num = getIndex(clickMenu);
    
    if(!clickMenu.classList.contains('on') && !isAnimated) {
        isAnimated = true;

        for(sidebarItem of $sidebar) {
            sidebarItem.classList.remove('on');
        }
        clickMenu.classList.add('on');
        $calendar.classList.remove('onCell');
        
        const currentOn = document.querySelector('.wrap-item.on');
        
        currentOn.classList.remove('on');
        
        setTimeout(function(){
            for(wrapItem of wrapArr) {
                wrapItem.style.display = 'none';
            }
            wrapArr[clickMenu.num].style.display = 'flex';
        },500);

        setTimeout(function(){
            wrapArr[clickMenu.num].classList.add('on');
            isAnimated = false;
        },550);
    }
}