import {exception} from './exception.js'; // 예외처리
import {tabLabels} from './tabLabels.js'; // 탭 라벨 추가
import {calculateWorked} from './calculateWorked.js'; // 근무기록 계산 및 저장
import {hiddenTable} from './hiddenTable.js'; // 기존 테이블 숨기기
import {resetImpor} from './resetImpor.js'; // 기존 입력 정보 리셋
import {createTable} from './createTable.js'; // 새 테이블 생성
import {downloadPDF} from './downloadPDF.js' // PDF 변환



const info = document.querySelectorAll('.info')
for(let i=0; i<info.length; i++){
    info[i].addEventListener('click',function(){
        if(document.getElementById('result').textContent !==''){
            info[i].querySelector('input').addEventListener('input',function(){
                document.getElementById('result').textContent='';
            });
        }
    });
}

const workRecordsContainer = document.getElementById('workRecordsContainer')
workRecordsContainer.addEventListener('click',function(){
    const feildWrapper = workRecordsContainer.querySelectorAll('.field-wrapper')
    for(let i=0; i<feildWrapper.length; i++){
        feildWrapper[i].addEventListener('click',function(){
            if(document.getElementById('result').textContent !==''){
                feildWrapper[i].querySelector('input').addEventListener('input',function(){
                    document.getElementById('result').textContent='';
                });
            }
        });
    }
});


// function delete_result(inputSelector, resultSelector = 'result') {
//     const resultElement = document.getElementById(resultSelector);
//     if (resultElement && resultElement.textContent !== '') {
//         const inputElement = inputSelector.querySelector('input');
//         if (inputElement) {
//             inputElement.addEventListener('input', () => {
//                 resultElement.textContent = '';
//             });
//         }
//     }
// }

// 근무 기록 추가 버튼 이벤트
document.getElementById('addWorkRecordButton').addEventListener('click', addWorkRecord);

// 새로운 필드 생성 함수
function createField(labelText, inputType) {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-wrapper';


    const label = document.createElement('label');
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = inputType;

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
}

// 삭제 버튼 생성 함수
function createDeleteButton() {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn delete';
    deleteBtn.textContent = '삭제';

    deleteBtn.addEventListener('click', function () {
        deleteBtn.parentNode.remove();
    });

    return deleteBtn;
}

// 새로운 근무 기록 추가 함수
function addWorkRecord() {
    const workRecordsContainer = document.getElementById('workRecordsContainer');

    const recordDiv = document.createElement('div');
    recordDiv.className = 'input-group';

    // 필드 추가
    const dateField = createField('근무 날짜', 'date');
    const startTimeField = createField('시작 시간', 'time');
    const endTimeField = createField('종료 시간', 'time');
    const deleteBtn = createDeleteButton();

    recordDiv.appendChild(dateField);
    recordDiv.appendChild(startTimeField);
    recordDiv.appendChild(endTimeField);
    recordDiv.appendChild(deleteBtn);

    workRecordsContainer.appendChild(recordDiv);
};





// ---- 25.01.21 순 모듈화 시작---------------------------------------------------------------------------------//
// 계산 버튼 이벤트
document.getElementById('calculateButton').addEventListener('click', function () {
    const employeeName = document.getElementById('employeeName').value; // 직원 이름
    const wagePerMinute = parseInt(document.getElementById('wagePerMinute').value); // 분당 급여
    const withholdingTaxChecked = document.getElementById('withholdingTax').checked; // 원천징수 체크 여부
    const workRecord = document.getElementById('workRecordsContainer').childNodes.length; // 근무기록 여부 
    let calculateFlag = true; //계산 유효성 검사를 위한 boolean 변수
	let calculateBtnFlag = true; // 계산하기 버튼 클릭 여부 확인을 위한 boolean 변수
	let tableBtnFlag = false; //탭 생성 버튼 클릭 여부 확인을 위한 boolean 변수
	let nowTab = 0;
	const count = 0;
	

    // 입력값 예외처리
    exception(employeeName, wagePerMinute, workRecord);
    
	// 근무기록 계산 및 저장
	calculateWorked(nowTab, count, employeeName, wagePerMinute, withholdingTaxChecked, calculateFlag, calculateBtnFlag, tableBtnFlag)


 });


// ///////hidden input에 값 넣는 메소드
// function input_hidden(name,date,start,end,totalTime,perpay,tax,totalSalary){
//     const calculatedName = document.getElementById('calculated_name');
//     const calculatedDate = document.getElementById('calculated_date');
//     const calculatedStart = document.getElementById('calculated_start');
//     const calculatedEnd = document.getElementById('calculated_end');
//     const calculatedTotalTime = document.getElementById('calculated_totalTime');
//     const calculatedPerpay = document.getElementById('calculated_perpay');
//     const calculatedTax = document.getElementById('calculated_Tax');
//     const calculatedTotalSalary = document.getElementById('calculated_totalSalary');
    
//     calculatedName.value = name;
//     calculatedDate. value = date;
//     calculatedStart.value = start;
//     calculatedEnd.value = end;
//     calculatedTotalTime.value = totalTime;
//     calculatedPerpay.value = perpay;
//     calculatedTax.value = tax;
//     calculatedTotalSalary.value = totalSalary;
// }



// 2024.12.21 테이블 정보 추가 - 이순
// 새로운 탭 생성 이벤트
const tableClone = document.querySelector('.tableTab').cloneNode(true);
let tabNumber = 0;

document.getElementById('tabAddButton').addEventListener('click', function () {
    const tabButtons = document.getElementById('tabButtons'); // 추가된 탭
    const employeeName = document.getElementById('employeeName'); // 직원 이름
    const wagePerMinute = document.getElementById('wagePerMinute'); // 분당 급여
    const withholdingTaxChecked = document.getElementById('withholdingTax'); // 원천징수 체크 여부
    const result = document.getElementById('result'); // 계산 결과
    const count = document.getElementById('count');
	let calculateFlag = true;
	let calculateBtnFlag = false; // 계산하기 버튼 클릭 여부 확인을 위한 boolean 변수
	let tableBtnFlag = true; //탭 생성 버튼 클릭 여부 확인을 위한 boolean 변수
    

        // 2024.12.26 계산 안하면 저장 안됨 - 이순
        if(!result.textContent){
            alert('계산해주세요.')
            return;
        }   

        const alltable = document.querySelectorAll('.tableTab');
        // 기존 테이블 숨기기
        hiddenTable(alltable);


        tabNumber++;
        let nowTab = 'tab' + tabNumber;

		//새 테이블 생성		
		createTable(nowTab, tableClone);

		
        // 계산한 근로자 탭 라벨 생성
        tabLabels(nowTab, tabButtons);


        // 근무 정보 추출 및 테이블 저장
		calculateWorked(nowTab, count, employeeName, wagePerMinute, withholdingTaxChecked, calculateFlag, calculateBtnFlag, tableBtnFlag)

		
        // 기존 탭 정보 리셋
        resetImpor(employeeName,  wagePerMinute, withholdingTaxChecked,  result);

});

// 25.01.21 순 모듈화 끝 -------------------------------------------------------------------------------------------//



// 2024.12.23 탭 클릭시 테이블 변경 - 승래
document.getElementById('tabButtons').addEventListener('click', clickTabs);

function clickTabs(){
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


// 2024.12.22 엑샐 내보내기 기능 - 승래
document.getElementById('toExcel').addEventListener('click',function(){
    if(document.querySelectorAll('.tableTab').length > 1){
        saveAs(exportExcel(), 'workrecord.xlsx');
    }
    else{
        alert("데이터를 저장해주세요");
    }
});

// 엑셀 변환 함수
function exportExcel(){
    let wb = XLSX.utils.book_new();
    let ws = excelHandler.getWorksheet();
    
	// 셀 스타일 지정
    for ( i in ws ) {
        if ( typeof ( ws[ i ] ) != "object" ) continue;
        let cell = XLSX.utils.decode_cell( i );
        // 각 열 너비 설정
        ws["!cols"]=[{wpx: 30},{wpx: 130},{wpx: 130},{wpx: 130},{wpx: 130},{wpx: 130},{wpx: 130},{wpx: 130},{wpx: 130}];
        //모든 셀 스타일
        ws[ i ].s = {
            font : {
                name : "arial"
            } ,
            alignment : {
                vertical : "center" ,
                horizontal : "center" ,
                wrapText : '1' ,
            } ,
            border : {
                right : {
                    style : "thin" ,
                    color : "000000"
                } ,
                left : {
                    style : "thin" ,
                    color : "000000"
                } ,
                top : {
                    style : "thin" ,
                    color : "000000"
                } ,
                bottom : {
                    style : "thin" ,
                    color : "000000"
                } ,
            }
        };
       ////////헤더부분 스타일
        if ( cell.r == 0 ) {
            ws[ i ].s.fill = {
                patternType : "solid" ,
                fgColor : {
                    rgb : "b2b2b2"
                } ,
                bgColor : {
                    rgb : "b2b2b2"
                }
            };
        }
    }
    
    XLSX.utils.book_append_sheet(wb, ws, excelHandler.getSheetName());

    let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    return new Blob([s2ab(wbout)],{type:"application/octet-stream"});

}

let excelHandler = {
    getExcelFileName : function(){
        return 'workrecord.xlsx';
    },
    getSheetName : function(){
        return 'sheet1';
    },
    getExcelData : function(){
        return document.querySelector('.tableTab.active > table');
    },
    getWorksheet : function(){
        return XLSX.utils.table_to_sheet(this.getExcelData());
    }
}

function s2ab(s) { 
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;    
}



// 2024.12.27 pdf 변환시 데이터 미저장 예외처리 - 이순
document.getElementById('toPdf').addEventListener('click', function(){
    const resultData = document.querySelector('.resultData');
    if(!resultData){
        alert('데이터를 저장해주세요.');
        return;
    }
	else{
        downloadPDF();
	}
})


/////////공유하기/////////////

document.getElementById('shareButton').addEventListener('click', async () => {

    if(document.querySelectorAll('.tableTab').length > 1){
        kakaoAPI();
    }
    else{
        alert("데이터를 저장해주세요");
    }
});

function kakaoAPI() {
    let userName = document.querySelector('.tabLabel.active').textContent;
    let workText = document.querySelector('.tableTab.active > div').textContent
    console.log(workText)
	if (!Kakao.isInitialized()) {
    Kakao.init('e7dcd72b2b02b7e2846d9731a41a6554'); // 초기화는 단 한 번만 실행
	}
	
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: userName+'님의 근무시간 및 급여내역 입니다', // 공유하기 제목
            description: workText,  // 공유하기 텍스트
            imageUrl: 'https://example.com/image.png', //임시 이미지
            link: {
                webUrl: 'http://localhost:8080',
                mobileWebUrl: 'http://localhost:8080',
            },
        },
        buttons: [
            {
                title: '링크 열기',
                link: {
                    webUrl: 'http://localhost:8080',
                    mobileWebUrl: 'http://localhost:8080',
                },
            },
        ],
    });
}


