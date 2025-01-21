// 근무시간 계산
    // 시작 시간과 종료 시간을 Date 객체로 변환
    export function calculateDate(dateInput, startTimeInput, endTimeInput){
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