// 인덱스값 얻기

function getIndexForMemo(ele) {
    let i = 0;

    while((ele = ele.previousSibling) != null) {
        if(ele.nodeType === 1) i++;
    }

    return  i;
}


// 현재 시간

function whatTimeIs(now) {    
    let nowYear = `${now.getFullYear()}`;
    let nowMonth = `${now.getMonth()+1}`.padStart(2,'0');
    let nowDate = `${now.getDate()}`.padStart(2,'0');

    let nowTime = nowYear + nowMonth + nowDate;

    return nowTime;
}

// memo 불러오기 (홈)

const $memoList = document.querySelector('.home-wrap .memo-list');
const $todayMsg = document.querySelector('.today-msg');

loadMemo();

function loadMemo() {
    
    let memoBox = '';
    let isTime = whatTimeIs(new Date());
    
    if(localStorage.getItem(isTime) && localStorage.getItem(isTime) != '[]') {
        let memoList = JSON.parse(localStorage.getItem(isTime));
    
        for(memoItem of memoList){
            if(memoItem.type == 'clear') {
                memoBox += `<li class="memo-item memo-clear">${memoItem.text}`;
            }else{
                memoBox += `<li class="memo-item">${memoItem.text}`;
            }
            memoBox += `<div class="memo-btn">
                                <a href="#" class="memo-chk" onclick="chkMemo(this)">완료</a>
                                <a href="#" class="memo-del" onclick="delMemo(this)">삭제</a>
                            </div>
                        </li>`;
                            
        }
        $memoList.innerHTML = memoBox;

        return;
    }  

    $todayMsg.textContent = '오늘의 할일이 없어요';
}


// memo 불러오기 (캘린더)

const $calendarDay = document.querySelector('.calendar-day');
const $calendarMemoList = document.querySelector('.calendar-wrap .memo-list');

function loadCellMemo(cell) {
    document.querySelector('.calendar-wrap').classList.add('onCell');

    let cellDay = cell.textContent;
    $calendarDay.innerHTML = `${cellDay}<span>day</span>`

    let memoBox = '';
    let isTime = whatTimeIs(new Date($calendarYear.textContent, parseInt($calendarMonthNum.textContent) - 1, ($calendarDay.textContent.substring(0,2))));

    $calendarMemoList.innerHTML = memoBox;
    
    if(localStorage.getItem(isTime) && localStorage.getItem(isTime) != '[]') {
        let memoList = JSON.parse(localStorage.getItem(isTime));
        
        for(memoItem of memoList){
            console.log(isTime)
            if(memoItem.type == 'clear') {
                memoBox += `<li class="memo-item memo-clear">${memoItem.text}`;
            }else{
                memoBox += `<li class="memo-item">${memoItem.text}`;
            }
            memoBox += `<div class="memo-btn">
                                <a href="#" class="memo-chk" onclick="chkMemo(this, 'calendar')">완료</a>
                                <a href="#" class="memo-del" onclick="delMemo(this, 'calendar')">삭제</a>
                            </div>
                        </li>`;
                            
        }
        $calendarMemoList.innerHTML = memoBox;

        return;
    }
}

// memo 체크 및 삭제

function chkMemo(rowMemo,type) {
    const memo = rowMemo.parentNode.parentNode;
    
    let isIndex = getIndexForMemo(memo);
    let isTime = whatTimeIs(new Date());
    
    if(type == 'calendar') {
        isTime = whatTimeIs(new Date($calendarYear.textContent, parseInt($calendarMonthNum.textContent) - 1, ($calendarDay.textContent.substring(0,2))));
    }else if(type == 'timeline') {
        isTime = whatTimeIs(new Date(Number(($timelineYear.textContent.substring(0, 4))), Number($timelineYear.textContent.substring(5)) - 1, rowMemo.parentNode.parentNode.parentNode.parentNode.textContent.slice(0,2)));
    }

    let rowMemoList = JSON.parse(localStorage.getItem(isTime));
    let editMemo = rowMemoList[isIndex];
    
    if(memo.classList.contains('memo-clear')) {
        memo.classList.remove('memo-clear');
        editMemo.type = 'normal';
    }else{
        memo.classList.add('memo-clear');
        editMemo.type = 'clear';
    }
    
    rowMemoList.splice(isIndex, 1, editMemo);
    localStorage.setItem(isTime,JSON.stringify(rowMemoList));

}

function delMemo(rowMemo,type) {
    const memo = rowMemo.parentNode.parentNode;

    memo.classList.add('memo-remove');
    setTimeout(function(){
        let isTime = whatTimeIs(new Date());
        if(type == 'calendar') {
            isTime = whatTimeIs(new Date($calendarYear.textContent, parseInt($calendarMonthNum.textContent) - 1, ($calendarDay.textContent.substring(0,2))));
        }else if(type == 'timeline') {
            isTime = whatTimeIs(new Date(Number(($timelineYear.textContent.substring(0, 4))), Number($timelineYear.textContent.substring(5)) - 1, 1));
        }
        
        let rowMemoList = JSON.parse(localStorage.getItem(isTime));

        console.log(getIndexForMemo(memo))
        rowMemoList.splice(getIndexForMemo(memo), 1);
        localStorage.setItem(isTime,JSON.stringify(rowMemoList));

        memo.parentNode.removeChild(memo);
    },500);

    if(memo.parentNode.childElementCount == 1){
        $todayMsg.textContent = '오늘의 할일이 없어요';
    }
    
}


// memo 추가

function addMemo(e) {
    e.preventDefault();

    if(e.target.childNodes[1].value == '') return;

    let isTime = whatTimeIs(new Date());
    
    if(!localStorage.getItem(isTime)){
        localStorage.setItem(isTime,JSON.stringify([]));
    }

    let rowMemoList = JSON.parse(localStorage.getItem(isTime));
    rowMemoList.push({
        type : 'normal',
        text : e.target.childNodes[1].value
    });
    localStorage.setItem(isTime,JSON.stringify(rowMemoList));

    
    let newMemoLi = document.createElement('li');
    newMemoLi.classList.add('memo-item');
    newMemoLi.innerHTML = `${e.target.childNodes[1].value}
                            <div class="memo-btn">
                                <a href="#" class="memo-chk" onclick="chkMemo(this)">완료</a>
                                <a href="#" class="memo-del" onclick="delMemo(this)">삭제</a>
                            </div>`;
    
    $memoList.appendChild(newMemoLi)

    e.target.childNodes[1].value = '';

    if($todayMsg.textContent == '오늘의 할일이 없어요'){
        $todayMsg.textContent = '오늘의 할일은';
    }
}

function addMemoForCalendar(e) {
    e.preventDefault();

    if(e.target.childNodes[1].value == '') return;

    let isTime = whatTimeIs(new Date($calendarYear.textContent, parseInt($calendarMonthNum.textContent) - 1, ($calendarDay.textContent.substring(0,2))));
    
    if(!localStorage.getItem(isTime)){
        localStorage.setItem(isTime,JSON.stringify([]));
    }

    let rowMemoList = JSON.parse(localStorage.getItem(isTime));
    rowMemoList.push({
        type : 'normal',
        text : e.target.childNodes[1].value
    });
    localStorage.setItem(isTime,JSON.stringify(rowMemoList));

    
    let newMemoLi = document.createElement('li');
    newMemoLi.classList.add('memo-item');
    newMemoLi.innerHTML = `${e.target.childNodes[1].value}
                            <div class="memo-btn">
                                <a href="#" class="memo-chk" onclick="chkMemo(this,'calendar')">완료</a>
                                <a href="#" class="memo-del" onclick="delMemo(this,'calendar')">삭제</a>
                            </div>`;
    
    $calendarMemoList.appendChild(newMemoLi)

    e.target.childNodes[1].value = '';
}

document.querySelector('.home-frm').addEventListener('submit',addMemo);
document.querySelector('.calendar-frm').addEventListener('submit',addMemoForCalendar);



// time

// home

const $date = document.querySelector('.date');
const $time = document.querySelector('.time');
const $hour = document.querySelector('.hour');
const $minute = document.querySelector('.minute');
const $second = document.querySelector('.second');

// calnedar

const $calendarYear = document.querySelector('.calendar-year');
const $calendarMonth = document.querySelector('.calendar-month');
const $calendarMonthNum = document.querySelector('.calendar-month-num');

// timeline

const $timelineYear = document.querySelector('.timeline-year');
const $timelineMonth = document.querySelector('.timeline-month');

const monthArr = ['January','February','March','April','May','June','July',
                  'August','September','October','November','December'].map(v => v.toUpperCase());

const daysArr = ['31','28','31','30','31','30','31','31','30','31','30','31'];
const weekArr = ['일','월','화','수','목','금','토'];

let now = new Date();

function updateTime(){
    let now = new Date();
    
    let nowYear = `${now.getFullYear()}`;
    let nowMonth = `${now.getMonth()+1}`.padStart(2,'0');
    let nowDate = `${now.getDate()}`.padStart(2,'0');
    let nowDay = weekArr[now.getDay()];

    let nowHours = `${now.getHours()}`.padStart(2,'0');
    let nowMinutes = `${now.getMinutes()}`.padStart(2,'0');
    let nowSeconds = `${now.getSeconds()}`.padStart(2,'0');
    
    $date.textContent = `${nowYear}년 ${nowMonth}월 ${nowDate}일 ${nowDay}요일`;
    $hour.textContent = nowHours;
    $minute.textContent = nowMinutes;
    $second.textContent = nowSeconds;

}

sid = setInterval(updateTime,1000)


// make calendar

function buildCalnedar(now) {

    let thisMonth = Boolean(new Date().getMonth() == now.getMonth());
    
    $calendarYear.textContent = `${now.getFullYear()}`;
    $calendarMonth.textContent = monthArr[now.getMonth()];
    $calendarMonthNum.textContent = `${now.getMonth()+1}`.padStart(2,'0');

    let forLocalDay = `${$calendarYear.textContent}${$calendarMonthNum.textContent}`;

    const $calendar = document.querySelector('.calendar-table');

    let firstDate = new Date(now.getFullYear(), now.getMonth(), 1);
    let lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    let isDay = firstDate.getDay();
    let weekNum = Math.ceil(lastDate.getDate() / 7);
        
    while($calendar.children[1].hasChildNodes()) {
        $calendar.children[1].removeChild($calendar.children[1].firstChild);
    }

    let leftDays = 7;
    let setDays = 1;

    if(isDay >= 6) {
        weekNum += 1;
    }

    for(i = 0; i < weekNum; i++){
        let row = $calendar.children[1].insertRow();

        while(isDay != 0) {
            row.insertCell().innerHTML = '';
            isDay -= 1;
            leftDays -= 1;
        }
        let nextDate = 1;
        while(leftDays != 0) {
            if(setDays > lastDate.getDate()) {
                leftDays -= 1;
                nextDate += 1;
            }else {
                let cell = row.insertCell();
                cell.innerHTML = setDays.toString().padStart(2,'0');
                cell.setAttribute('onclick','loadCellMemo(this);');

                if(thisMonth && setDays == new Date().getDate()) {
                    cell.classList.add('calender-today');
                }

                let checkItem = localStorage.getItem(JSON.parse(`${forLocalDay}` + `${setDays}`.padStart(2,'0'))) 

                if(checkItem && checkItem != '[]' ){
                    cell.classList.add('calender-dot');
                }

                setDays += 1;
                leftDays -= 1;
            }
        }
        leftDays = 7;
    }
}

buildCalnedar(new Date());

function calendarBtn(type) {

    document.querySelector('.calendar-wrap').classList.remove('onCell');
     
    $calendarMonthNum.textContent = parseInt($calendarMonthNum.textContent) + parseInt(type);
    $calendarMonthNum.textContent = $calendarMonthNum.textContent.toString().padStart(2,'0');
    
    if($calendarMonthNum.textContent == 0){    
        $calendarMonthNum.textContent  = 12;
        $calendarYear.textContent = parseInt($calendarYear.textContent) - 1;
    }else if($calendarMonthNum.textContent == 13) {
        $calendarMonthNum.textContent = '01';
        $calendarYear.textContent = parseInt($calendarYear.textContent) + 1;
    }
    $calendarMonth.textContent = monthArr[$calendarMonthNum.textContent - 1];

    buildCalnedar(new Date($calendarYear.textContent, parseInt($calendarMonthNum.textContent) - 1, 1));
}


// make timeline

function buildTimeline(now) {
    
    $timelineYear.textContent = `${now.getFullYear()}.` + `${now.getMonth()+1}`.padStart(2,'0');
    $timelineMonth.textContent = monthArr[now.getMonth()];

    void $timelineYear.offsetWidth;
    void $timelineMonth.offsetWidth;

    let lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    let setDate = `${now.getFullYear()}` + `${now.getMonth()+1}`.padStart(2,'0');

    let memoList = '';

    for(i = setDate + lastDate; i > setDate + '00'; i--) {
        if(localStorage.getItem(i) != null && localStorage.getItem(i) != '[]' ) {
            let memoTit = String(i).substring(6);
            let memoBox = ``;
            
            for(memoItem of JSON.parse(localStorage.getItem(i))){
                if(memoItem.type == 'clear') {
                    memoBox += `<li class="memo-item memo-clear">${memoItem.text}`;
                }else{
                    memoBox += `<li class="memo-item">${memoItem.text}`;
                }
                memoBox += `<div class="memo-btn">
                                <a href="#" class="memo-chk" onclick="chkMemo(this,'timeline')">완료</a>
                                <a href="#" class="memo-del" onclick="delMemo(this,'timeline')">삭제</a>
                            </div>
                        </li>`;
            }

            memoList += `<li class="timeline-tit">${memoTit}
                            <ul class="timeline-list">
                                ${memoBox}
                            </ul>
                         </li>`
        }
        document.querySelector('.timeline-zone').innerHTML = memoList;

    }
}

buildTimeline(new Date());

function timelineBtn(type) {
    
    $timelineMonth.textContent = monthArr[now.getMonth()];

    let arrTime = $timelineYear.textContent.split('.');
    let monthNum = parseInt(arrTime[1]) + parseInt(type);

    $timelineYear.textContent = (arrTime[0]) + '.' + monthNum;

    if(monthNum == 0){    
        monthNum = 12;
        $timelineYear.textContent = (arrTime[0] - 1) + '.' + monthNum;
    }else if(monthNum == 13) {
        monthNum = 1;
        $timelineYear.textContent = (parseInt(arrTime[0]) + 1) + '.' + '0' + monthNum;
    }
    $timelineMonth.textContent = monthArr[monthNum - 1];

    buildTimeline(new Date(Number(($timelineYear.textContent.substring(0, 4))), Number($timelineYear.textContent.substring(5)) - 1, 1));
}



