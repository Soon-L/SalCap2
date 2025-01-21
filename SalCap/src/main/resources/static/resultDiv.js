//테이블 맨 밑 결과 행
export function resultDiv(newTable){
    const resultData = document.createElement('div'); // 맨 밑 결과 셀
    resultData.className = 'resultData';
    
    // 부모자식 설정
    newTable.appendChild(resultData);
    resultData.textContent = result.textContent; // 결과값 넣기
}