import {resultDiv} from "./resultDiv.js";

//새 테이블 생성
export function createTable(nowTab, tableClone){
	// 테이블 넘버 리셋
	document.querySelectorAll('.tableTab').forEach((table)=>{
	    table.classList.remove('active');
	    count.textContent = Number(count.textContent)-Number(count.textContent);
	})
	const newTable = tableClone.cloneNode(true); // 테이블 카피
	newTable.classList.add(nowTab);
	newTable.classList.add('active');
	document.querySelector(".dataTable").appendChild(newTable);
	
	//테이블 맨 밑 결과 행
	resultDiv(newTable);
}