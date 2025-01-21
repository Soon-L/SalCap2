// 2024.12.21 계산시 결과 보여주기 추가 - 이순
// 결과 출력
export function resultView(employeeName, totalMinutesWorked, totalSalary, calculateFlag){
	if(calculateFlag){
	    document.getElementById('result').textContent =
	    `${employeeName}님의 총 근무 시간은 ${totalMinutesWorked}분이며, 총 급여는 ${totalSalary.toLocaleString()}원입니다.`;
	    result.style.display = 'block'; // 결과 보여줌
	}else{
		calculateFlag = false;
	    return;
	}
}