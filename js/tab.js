// 인덱스값 얻기

function getIndex(ele) {
    if(!(ele = ele.previousSibling)) return 0;

    let i = 0;

    while((ele = ele.previousSibling) != null) {
        if(ele.nodeType === 1) i++;
    }

    return  i;
}

// mene 전환

const $home = document.querySelector('.home-wrap');
const $calendar = document.querySelector('.calendar-wrap');
const $timeline = document.querySelector('.timeline-wrap');
const $setting = document.querySelector('.setting-wrap');

const wrapArr = [$home, $calendar, $timeline, $setting];

const $sidebar = document.querySelector('.sidebar-list').children;

let isAnimated = false;

function selectMenu(e) {
    e.preventDefault();
    
    let isClickMenu = e.target.parentNode;
    isClickMenu.num = getIndex(isClickMenu);
    
    if(!isClickMenu.classList.contains('on') && !isAnimated) {
        
        isAnimated = true;

        for(sidebarItem of $sidebar) {
            sidebarItem.classList.remove('on');
        }
        isClickMenu.classList.add('on');
        document.querySelector('.calendar-wrap').classList.remove('onCell');
        
        
        let currentOn = document.querySelector('.wrap-item.on');
        
        currentOn.classList.remove('on');
        
        setTimeout(function(){
            for(wrapItem of wrapArr) {
                wrapItem.style.display = 'none';
            }
            wrapArr[isClickMenu.num].style.display = 'flex';
        },500);

        setTimeout(function(){
            wrapArr[isClickMenu.num].classList.add('on');
            isAnimated = false;
        },550);
    }

}
/* 
for(sidebarItem of $sidebar) {
    sidebarItem.children[0].addEventListener('click',selectMenu)
} */