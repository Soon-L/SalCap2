import {calculate} from './calculate.js'; // 계산하기 버튼
import {addTab} from './addTab.js'; // 탭 생성 버튼
import {downloadPDF} from './downloadPDF.js'; // PDF 다운 버튼
import {resultReset} from './resultReset.js' // 결과값 초기화
import {addWorkRecord} from './addWorkRecord.js' // 근무기록 추가
import {clickTabs} from './clickTabs.js' // 탭 클릭 이벤트
import {exportExcel} from './exportExcel.js' // 엑셀 변환
import {kakaoAPI} from './kakaoShareAPI.js' // 카카오톡 공유하기 기능 






// '.info' 에 대한 resultReset
document.querySelectorAll('.info').forEach(function (info) {
    info.addEventListener('click', function () {
        resultReset('.info', 'input');
    });
});

// 'workRecordsContainer'에 대한 resultReset
document.getElementById('workRecordsContainer').addEventListener('click', function (event) {
    if (event.target.closest('.field-wrapper')) {
        resultReset('#workRecordsContainer', 'input');
    }
});

// 근무 기록 추가 버튼 이벤트
document.getElementById('addWorkRecordButton').addEventListener('click', addWorkRecord);


// 계산 버튼 이벤트
document.getElementById('calculateButton').addEventListener('click', calculate);



// 2024.12.21 테이블 정보 추가 - 이순
// 새로운 탭 생성 이벤트
const tableClone = document.querySelector('.tableTab').cloneNode(true);


document.getElementById('tabAddButton').addEventListener('click', () => {
	addTab(tableClone)
});


// 2024.12.27 pdf 변환시 데이터 미저장 예외처리 - 이순
document.getElementById('toPdf').addEventListener('click', downloadPDF);


// 2024.12.23 탭 클릭시 테이블 변경 - 승래
document.getElementById('tabButtons').addEventListener('click', clickTabs);


// 2024.12.22 엑샐 내보내기 기능 - 승래
document.getElementById('toExcel').addEventListener('click',function(){
    if(document.querySelectorAll('.tableTab').length > 1){
        saveAs(exportExcel(), 'workrecord.xlsx');
    }
    else{
        alert("데이터를 저장해주세요");
    }
});



// 2024.12.27 pdf 변환시 데이터 미저장 예외처리 - 이순
document.getElementById('toPdf').addEventListener('click', function(){
    const resultData = document.querySelector('.resultData');
    if(!resultData){
        alert('데이터를 저장해주세요.');
        return;
    }
	else{
        downloadPDF();
	}
})



/////////공유하기/////////////
document.getElementById('shareButton').addEventListener('click', async () => {

    if(document.querySelectorAll('.tableTab').length > 1){
        kakaoAPI();
    }
    else{
        alert("데이터를 저장해주세요");
    }
});



