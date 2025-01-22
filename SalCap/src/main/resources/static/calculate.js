import {calculateWorked} from './calculateWorked.js'; // 근무기록 계산 및 저장


export function calculate(){
	const employeeName = document.getElementById('employeeName').value; // 직원 이름
	const wagePerMinute = parseInt(document.getElementById('wagePerMinute').value); // 분당 급여
	const withholdingTaxChecked = document.getElementById('withholdingTax').checked; // 원천징수 체크 여부
	const workRecord = document.getElementById('workRecordsContainer').childNodes.length; // 근무기록 여부 
	let calculateFlag = true; //계산 유효성 검사를 위한 boolean 변수
	let calculateBtnFlag = true; // 계산하기 버튼 클릭 여부 확인을 위한 boolean 변수
	let tableBtnFlag = false; //탭 생성 버튼 클릭 여부 확인을 위한 boolean 변수
	let nowTab = 0; // 현재 탭 번호
	const count = 0; // 테이블 행 카운트


	// 예외처리(함수처리시 calculateFlag 안 먹음)
	if (!employeeName) {
	    alert("직원 이름을 입력하세요.");
		calculateFlag = false;
	    return;
	}

	if (isNaN(wagePerMinute) || wagePerMinute <= 0) {
	    alert("유효한 분당 급여를 입력하세요.");
		calculateFlag = false;
	    return;
	}
	if(workRecord===0){
	    alert("근무기록이 입력되지 않았습니다.");
		calculateFlag = false;
	    return;
	}
	
	   
	// 근무기록 계산 및 저장
	calculateWorked(nowTab, count, employeeName, wagePerMinute, withholdingTaxChecked, calculateFlag, calculateBtnFlag, tableBtnFlag)

}