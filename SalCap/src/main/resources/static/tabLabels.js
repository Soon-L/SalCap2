// 탭 라벨 추가
export function tabLabels(nowTab, tabButtons){
    document.querySelectorAll('.tabLabel').forEach((label)=>{
        label.classList.remove('active');
    });
    const tabLabel = document.createElement('button');
    tabLabel.className = 'btn tabLabel active '+nowTab;
    tabLabel.textContent = `${employeeName.value}`;
    // 부모자식 설정
    tabButtons.appendChild(tabLabel);
}