// 기존 탭 정보 리셋
export function resetImpor(employeeName,  wagePerMinute, withholdingTaxChecked,  result){
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