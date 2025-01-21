// 테이블에 데이터 저장 이벤트
export function saveData(nowTab, count, employeeName, dateInput, startTimeInput, endTimeInput, 
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
