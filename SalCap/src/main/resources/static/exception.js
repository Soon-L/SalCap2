// 입력 값 예외처리
export function exception(employeeName, wagePerMinute, workRecord){
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

}