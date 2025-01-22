export function calculateWorked(nowTab, count, employeeName, wagePerMinute, withholdingTaxChecked, calculateFlag, calculateBtnFlag, tableBtnFlag){
	let totalMinutesWorked = 0;
	let totalSalary = 0;

	  // 모든 근무 기록 가져오기
	  const workRecords = document.querySelectorAll('#workRecordsContainer .input-group');

	let alertCount = 0;

	  workRecords.forEach(record => {
	      const dateInput = record.querySelector('input[type=date]').value;
	      const startTimeInput = record.querySelector('input[type=time]').value;
	      const endTimeInput = record.querySelectorAll('input[type=time]')[1].value;
		  

		  // 계산하기 예외처리
		calculateException(dateInput, startTimeInput, endTimeInput, alertCount);

		
		// 근무시간 계산
		const minutesWorked = calculateDate(dateInput, startTimeInput, endTimeInput);


		// 총 근무 시간(분) 계산
	      totalMinutesWorked += minutesWorked;
	  

	      // 총 급여 계산
	      totalSalary = totalMinutesWorked * wagePerMinute;
		  

	      // 원천징수 적용 여부 확인
	      if (withholdingTaxChecked) {
	          totalSalary *= (1 - 0.033); // 원천징수 적용
	      }
		
	  	  // 테이블에 데이터 저장 이벤트
		  if(tableBtnFlag){

			// 테이블에 데이터 저장 이벤트
			saveData(nowTab, count, employeeName, dateInput, startTimeInput, endTimeInput, 
			        minutesWorked, totalMinutesWorked, wagePerMinute, withholdingTaxChecked);
		  }
		  else{
			tableBtnFlag = false;
			return;
		  }

	  	
	  });
	  	
	  // 계산 결과 보여줌
	  if(calculateBtnFlag){
		resultView(employeeName, totalMinutesWorked, totalSalary, calculateFlag);
	  }
	  else{
		calculateBtnFlag = false;
		return;
	  }	  
}








// 근무시간 예외처리
function calculateException(dateInput, startTimeInput, endTimeInput, alertCount){
	if (!dateInput || !startTimeInput || !endTimeInput) {
	    if(alertCount<1){
	        alert("모든 날짜와 시간을 입력하세요.");
	        alertCount++;
	    }
	    calculateFlag = false;
	    return;

	}			
}


// 시작 시간과 종료 시간을 Date 객체로 변환
function calculateDate(dateInput, startTimeInput, endTimeInput){
    const startDateTime = new Date(`${dateInput}T${startTimeInput}`);
    const endDateTime = new Date(`${dateInput}T${endTimeInput}`);

    // 시간 차이를 분 단위로 계산
    const minutesWorked = (endDateTime - startDateTime) / (1000 * 60); // 밀리초 -> 분 변환

    if (minutesWorked <= 0) {
       alert("종료 시간이 시작 시간보다 빨라서는 안 됩니다.");
        calculateFlag = false;
   }
	
    return minutesWorked;
}


// 테이블에 데이터 저장 이벤트
function saveData(nowTab, count, employeeName, dateInput, startTimeInput, endTimeInput, 
                  minutesWorked, totalMinutesWorked, wagePerMinute, withholdingTaxChecked){
    const table = document.querySelector('.dataTable').querySelector('.'+nowTab);
    const tableRow = document.createElement('tr');
    const num = document.createElement('td'); // 카운트
    const name = document.createElement('td'); // 근로자명
    const date = document.createElement('td'); // 근무일자
    const startTime = document.createElement('td'); // 시작시간
    const endTime = document.createElement('td'); // 종료시간
    const totalTime = document.createElement('td'); // 총 근무시간(분)
    const minuteSalary = document.createElement('td'); // 분당급여
    const tax = document.createElement('td'); // 원천징수
    const allSalary = document.createElement('td'); // 총 급여
    
    // 부모자식 설정
    table.querySelector('tbody').appendChild(tableRow);
    tableRow.appendChild(num)
    tableRow.appendChild(name);
    tableRow.appendChild(date);
    tableRow.appendChild(startTime);
    tableRow.appendChild(endTime);
    tableRow.appendChild(totalTime)
    tableRow.appendChild(minuteSalary);
    tableRow.appendChild(tax);
    tableRow.appendChild(allSalary);
    
    
        
        
    // 2024.12.21 오류 수정 - 이순
    //데이터 넣기
    count.textContent = Number(count.textContent) + 1;
    num.textContent = count.textContent; //1씩 증가
    name.textContent = employeeName.value; // 이름
    date.textContent = dateInput; // 근무일자
    startTime.textContent = startTimeInput; // 시작시간
    endTime.textContent = endTimeInput; // 종료시간
    totalTime.textContent = minutesWorked;// 총 근무시간(분)
    minuteSalary.textContent = wagePerMinute.value; // 분당급여
    tax.textContent = 'X'; // 원천징수 안했을경우
    allSalary.textContent = totalMinutesWorked * wagePerMinute.value;
    // 원천징수 했을경우
    if(withholdingTaxChecked.checked === true){
        tax.textContent = 'O';
        allSalary.textContent = totalMinutesWorked * wagePerMinute.value *(1 - 0.033);
    } 
}


// 계산결과 보여줌
function resultView(employeeName, totalMinutesWorked, totalSalary, calculateFlag){
	if(calculateFlag){
	    document.getElementById('result').textContent =
	    `${employeeName}님의 총 근무 시간은 ${totalMinutesWorked}분이며, 총 급여는 ${totalSalary.toLocaleString()}원입니다.`;
	    result.style.display = 'block'; // 결과 보여줌
	}else{
		calculateFlag = false;
	    return;
	}
}