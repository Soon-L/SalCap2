import {calculateWorked} from './calculateWorked.js'; // 근무기록 계산 및 저장

let tabNumber = 0;

export function addTab(tableClone){
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
		// 함수화 시키면 안먹음
		if(!result.textContent){
		    alert('계산해주세요.')
		    return;
		} 
  

	    const alltable = document.querySelectorAll('.tableTab');
	    // 기존 테이블 숨기기
	    hiddenTable(alltable);


	    tabNumber++;
	    let nowTab = 'tab' + tabNumber;
		console.log('테이블넘버' + tabNumber);

		//새 테이블 생성		
		createTable(nowTab, tableClone);

		
		// 탭 라벨 추가
		tabLabels(nowTab, tabButtons);


	    // 근무 정보 추출 및 테이블 저장
		calculateWorked(nowTab, count, employeeName, wagePerMinute, withholdingTaxChecked, calculateFlag, calculateBtnFlag, tableBtnFlag)

		
	    // 기존 탭 정보 리셋
	    resetImpor(employeeName,  wagePerMinute, withholdingTaxChecked,  result);	
}









// 계산 예외처리
function tabException(result){
			
}

// 기존 테이블 숨김
function hiddenTable(alltable){
    alltable.forEach((tab) =>{
        tab.classList.add('hidden');
    })
}


// 새테이블 생성
function createTable(nowTab, tableClone){
	// 테이블 넘버 리셋
	document.querySelectorAll('.tableTab').forEach((table)=>{
	    table.classList.remove('active');
	    count.textContent = Number(count.textContent)-Number(count.textContent);
	})
	const newTable = tableClone.cloneNode(true); // 테이블 카피
	newTable.classList.add(nowTab);
	newTable.classList.add('active');
	document.querySelector(".dataTable").appendChild(newTable);
	
	console.log(nowTab);
	console.log(newTable);
	
	// 테이블 맨 밑 결과행
	resultDiv(newTable, result);
	
	
}


//테이블 맨 밑 결과 행
function resultDiv(newTable, result){
    const resultData = document.createElement('div'); // 맨 밑 결과 셀
    resultData.className = 'resultData';
    
    // 부모자식 설정
    newTable.appendChild(resultData);
    resultData.textContent = result.textContent; // 결과값 넣기
}


// 탭 라벨 추가
function tabLabels(nowTab, tabButtons){
    document.querySelectorAll('.tabLabel').forEach((label)=>{
        label.classList.remove('active');
    });
    const tabLabel = document.createElement('button');
    tabLabel.className = 'btn tabLabel active '+nowTab;
    tabLabel.textContent = `${employeeName.value}`;
    // 부모자식 설정
    tabButtons.appendChild(tabLabel);
}


// 기존 탭 정보 리셋
function resetImpor(employeeName,  wagePerMinute, withholdingTaxChecked,  result){
    employeeName.value = ''; // 직원 이름
    wagePerMinute.value = ''; // 분당 급여
    withholdingTaxChecked.checked = false; // 원천징수
    result.textContent = '';

    //////근무기록 input창 삭제(초기화)
    const parent = document.getElementById('workRecordsContainer');
    while(parent.firstChild)  {
        parent.removeChild(parent.firstChild);
    }    
   
}