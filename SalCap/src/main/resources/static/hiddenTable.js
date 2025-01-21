// 기존 테이블 숨기기
export function hiddenTable(alltable){
    alltable.forEach((tab) =>{
        tab.classList.add('hidden');
    })
}