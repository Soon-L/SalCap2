import {resultView} from './resultView.js';
import {saveData} from './saveData.js';
import {calculateDate} from './calculateDate.js';

export function workedTable(nowTab, count, employeeName, wagePerMinute, withholdingTaxChecked){
	let totalMinutesWorked = 0;
	let totalSalary = 0;

	  // 모든 근무 기록 가져오기
	  const workRecords = document.querySelectorAll('#workRecordsContainer .input-group');

	let alertCount = 0;

	  workRecords.forEach(record => {
	      const dateInput = record.querySelector('input[type=date]').value;
	      const startTimeInput = record.querySelector('input[type=time]').value;
	      const endTimeInput = record.querySelectorAll('input[type=time]')[1].value;
		
		if (!dateInput || !startTimeInput || !endTimeInput) {
		    if(alertCount<1){
		        alert("모든 날짜와 시간을 입력하세요.");
		        alertCount++;
		    }
		    calculateFlag = false;
		    return;

		}
		
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
		  saveData(nowTab, count, employeeName, dateInput, startTimeInput, endTimeInput, 
		           minutesWorked, totalMinutesWorked, wagePerMinute, withholdingTaxChecked);
		
		});
		
		// 계산 결과 보여줌
		resultView(employeeName, totalMinutesWorked, totalSalary, calculateFlag);
		
	}