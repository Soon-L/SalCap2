import {exception} from './exception.js'; // 예외처리
import {tabLabels} from './tabLabels.js'; // 탭 라벨 추가
import {calculateWorked} from './calculateWorked.js'; // 근무기록 계산 및 저장
import {hiddenTable} from './hiddenTable.js'; // 기존 테이블 숨기기
import {resetImpor} from './resetImpor.js'; // 기존 입력 정보 리셋
import {createTable} from './createTable.js'; // 새 테이블 생성
import {downloadPDF} from './downloadPDF.js' // PDF 변환
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


// ---- 25.01.21 순 모듈화 시작---------------------------------------------------------------------------------//
// 계산 버튼 이벤트
document.getElementById('calculateButton').addEventListener('click', function () {
    const employeeName = document.getElementById('employeeName').value; // 직원 이름
    const wagePerMinute = parseInt(document.getElementById('wagePerMinute').value); // 분당 급여
    const withholdingTaxChecked = document.getElementById('withholdingTax').checked; // 원천징수 체크 여부
    const workRecord = document.getElementById('workRecordsContainer').childNodes.length; // 근무기록 여부 
    let calculateFlag = true; //계산 유효성 검사를 위한 boolean 변수
	let calculateBtnFlag = true; // 계산하기 버튼 클릭 여부 확인을 위한 boolean 변수
	let tableBtnFlag = false; //탭 생성 버튼 클릭 여부 확인을 위한 boolean 변수
	let nowTab = 0;
	const count = 0;
	

    // 입력값 예외처리
    exception(employeeName, wagePerMinute, workRecord);
    
	// 근무기록 계산 및 저장
	calculateWorked(nowTab, count, employeeName, wagePerMinute, withholdingTaxChecked, calculateFlag, calculateBtnFlag, tableBtnFlag)


 });




// 2024.12.21 테이블 정보 추가 - 이순
// 새로운 탭 생성 이벤트
const tableClone = document.querySelector('.tableTab').cloneNode(true);
let tabNumber = 0;

document.getElementById('tabAddButton').addEventListener('click', function () {
    const tabButtons = document.getElementById('tabButtons'); // 추가된 탭
    const employeeName = document.getElementById('employeeName'); // 직원 이름
    const wagePerMinute = document.getElementById('wagePerMinute'); // 분당 급여
    const withholdingTaxChecked = document.getElementById('withholdingTax'); // 원천징수 체크 여부
    const result = document.getElementById('result'); // 계산 결과
    const count = document.getElementById('count');
	let calculateFlag = true;
	let calculateBtnFlag = false; // 계산하기 버튼 클릭 여부 확인을 위한 boolean 변수
	let tableBtnFlag = true; //탭 생성 버튼 클릭 여부 확인을 위한 boolean 변수
    

        // 2024.12.26 계산 안하면 저장 안됨 - 이순
        if(!result.textContent){
            alert('계산해주세요.')
            return;
        }   

        const alltable = document.querySelectorAll('.tableTab');
        // 기존 테이블 숨기기
        hiddenTable(alltable);


        tabNumber++;
        let nowTab = 'tab' + tabNumber;

		//새 테이블 생성		
		createTable(nowTab, tableClone);

		
        // 계산한 근로자 탭 라벨 생성
        tabLabels(nowTab, tabButtons);


        // 근무 정보 추출 및 테이블 저장
		calculateWorked(nowTab, count, employeeName, wagePerMinute, withholdingTaxChecked, calculateFlag, calculateBtnFlag, tableBtnFlag)

		
        // 기존 탭 정보 리셋
        resetImpor(employeeName,  wagePerMinute, withholdingTaxChecked,  result);

});

// 25.01.21 순 모듈화 끝 -------------------------------------------------------------------------------------------//



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



