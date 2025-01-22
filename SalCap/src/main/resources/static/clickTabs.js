// 탭 클릭시 해당 근무자의 정보 테이블로 변경
export function clickTabs(){
    document.querySelectorAll('.tabLabel').forEach((tab, index)=>{
        tab.addEventListener('click',function(){
            const alltabs = document.querySelectorAll('.tabLabel');
            const tables = document.querySelectorAll('.tableTab');
            tables.forEach((table)=>{
                table.classList.add('hidden');
                table.classList.remove('active');
            });
            alltabs.forEach((viewTab)=>{
                viewTab.classList.remove('active');
            })
            alltabs[index].classList.add('active');
            tables[index].classList.remove('hidden');
            tables[index].classList.add('active');
        });
    });
};
