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






// 계산 버튼 이벤트
document.getElementById('calculateButton').addEventListener('click', function () {
    const employeeName = document.getElementById('employeeName').value; // 직원 이름
    const wagePerMinute = parseInt(document.getElementById('wagePerMinute').value); // 분당 급여
    const withholdingTaxChecked = document.getElementById('withholdingTax').checked; // 원천징수 체크 여부
    const workRecord = document.getElementById('workRecordsContainer').childNodes.length; // 근무기록 여부 
    let calculateFlag = true; //계산 유효성 검사를 위한 boolean 변수

    // 입력값 예외처리
    exception(employeeName, wagePerMinute, workRecord);
    


    let totalMinutesWorked = 0;
	let totalSalary = 0;

    // 모든 근무 기록 가져오기
    const workRecords = document.querySelectorAll('#workRecordsContainer .input-group');
  
	let alertCount = 0;
  
    workRecords.forEach(record => {
        const dateInput = record.querySelector('input[type=date]').value;
        const startTimeInput = record.querySelector('input[type=time]').value;
        const endTimeInput = record.querySelectorAll('input[type=time]')[1].value;
		
		if (!dateInput || !startTimeInput || !endTimeInput) {
		    if(alertCount<1){
		        alert("모든 날짜와 시간을 입력하세요.");
		        alertCount++;
		    }
		    calculateFlag = false;
		    return;

		}


        // 근무시간 계산
        minutesWorked = calculateDate(dateInput, startTimeInput, endTimeInput);


        totalMinutesWorked += minutesWorked; // 총 근무 시간(분) 계산
    

        // 총 급여 계산
        totalSalary = totalMinutesWorked * wagePerMinute;

        // 원천징수 적용 여부 확인
        if (withholdingTaxChecked) {
            totalSalary *= (1 - 0.033); // 원천징수 적용
        }
		
	});

    // 2024.12.21 계산시 결과 보여주기 추가 - 이순
    // 결과 출력
    if(calculateFlag){
        document.getElementById('result').textContent =
        `${employeeName}님의 총 근무 시간은 ${totalMinutesWorked}분이며, 총 급여는 ${totalSalary.toLocaleString()}원입니다.`;
        result.style.display = 'block'; // 결과 보여줌
    }else{
        return;
    }


        // 2024.12.21 계산시 결과 보여주기 추가 - 이순
        // 결과 출력
        if(employeeName === '' || wagePerMinute === NaN || dateInput === NaN || startTimeInput>=endTimeInput){
            calculateFlag = false;
            return;
        }
        if(calculateFlag){
            document.getElementById('result').textContent =
            `${employeeName}님의 총 근무 시간은 ${totalMinutesWorked}분이며, 총 급여는 ${totalSalary.toLocaleString()}원입니다.`;
            result.style.display = 'block'; // 결과 보여줌
        }else{
            return;
        }
    });
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
    const workRecords = document.querySelectorAll('#workRecordsContainer .input-group'); // 근무 정보
    const withholdingTaxChecked = document.getElementById('withholdingTax'); // 원천징수 체크 여부
    const result = document.getElementById('result'); // 계산 결과
    const count = document.getElementById('count');
    

        // 2024.12.26 계산 안하면 저장 안됨 - 이순
        if(!result.textContent){
            alert('계산해주세요.')
            return;
        }   

        const alltable = document.querySelectorAll('.tableTab');
        // 기존 테이블 숨기기
        hiddenTable(alltable);

        //새 테이블 생성
        tabNumber++;
        let nowTab = 'tab' + tabNumber;
        // 테이블 넘버 리셋
        document.querySelectorAll('.tableTab').forEach((table)=>{
            table.classList.remove('active');
            count.textContent = Number(count.textContent)-Number(count.textContent);
        })
        const newTable = tableClone.cloneNode(true); // 테이블 카피
        newTable.classList.add(nowTab);
        newTable.classList.add('active');
        document.querySelector(".dataTable").appendChild(newTable);
        


        // 계산한 근로자 탭 라벨 생성
        tabLaels(nowTab, tabButtons);


         // 근무 정보 추출
         workRecords.forEach(record => {
            const dateInput = record.querySelector('input[type=date]').value;
            const startTimeInput = record.querySelector('input[type=time]').value;
            const endTimeInput = record.querySelectorAll('input[type=time]')[1].value;
            let totalMinutesWorked = 0;

            // 예외처리(날짜 시간)
            inputException(dateInput, startTimeInput, endTimeInput);
    
            // 근무시간 계산
            minutesWorked = calculateDate(dateInput, startTimeInput, endTimeInput);


            // 총 근무 시간(분) 계산
            totalMinutesWorked += minutesWorked; 
            
            // 총 급여 계산
            let totalSalary = totalMinutesWorked * wagePerMinute.value;

            // 원천징수 적용 여부 확인
            if (withholdingTaxChecked) {
            totalSalary = totalMinutesWorked * wagePerMinute.value * (1 - 0.033); // 원천징수 적용
            }


            
            
            // 테이블에 데이터 저장 이벤트
            saveData(nowTab, count, employeeName, dateInput, startTimeInput, endTimeInput, 
                     minutesWorked, totalMinutesWorked, wagePerMinute, withholdingTaxChecked);

            
        });

        //테이블 맨 밑 결과 행
        resultDiv(newTable);

        // 기존 탭 정보 리셋

        resetImpor(employeeName,  wagePerMinute, withholdingTaxChecked,  result);

});





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








///////////////// 순 함수 모음 시작 ///////////////////////////////////////////////////////////////////////////////////////


// 입력 값 예외처리
function exception(employeeName, wagePerMinute, workRecord){
    if (!employeeName) {
        alert("직원 이름을 입력하세요.");
        return;
    }

    if (isNaN(wagePerMinute) || wagePerMinute <= 0) {
        alert("유효한 분당 급여를 입력하세요.");
        return;
    }
    if(workRecord===0){
        alert("근무기록이 입력되지 않았습니다.");
        return;
    }

}



// 근무시간 계산
    // 시작 시간과 종료 시간을 Date 객체로 변환
    function calculateDate(dateInput, startTimeInput, endTimeInput){
        const startDateTime = new Date(`${dateInput}T${startTimeInput}`);
        const endDateTime = new Date(`${dateInput}T${endTimeInput}`);

        // 시간 차이를 분 단위로 계산
        const minutesWorked = (endDateTime - startDateTime) / (1000 * 60); // 밀리초 -> 분 변환

        if (minutesWorked <= 0) {
            alert("종료 시간이 시작 시간보다 빨라서는 안 됩니다.");
            calculateFlag = false;
            return;
        }
        return minutesWorked;
    }


// 기존 테이블 숨기기
function hiddenTable(alltable){
    alltable.forEach((tab) =>{
        tab.classList.add('hidden');
    })
}

//테이블 맨 밑 결과 행
function resultDiv(newTable){
    const resultData = document.createElement('div'); // 맨 밑 결과 셀
    resultData.className = 'resultData';
    
    // 부모자식 설정
    newTable.appendChild(resultData);
    resultData.textContent = result.textContent; // 결과값 넣기
}

// 계산한 근로자 탭 라벨 생성
function tabLaels(nowTab, tabButtons){
    document.querySelectorAll('.tabLabel').forEach((label)=>{
        label.classList.remove('active');
    });
    const tabLabel = document.createElement('button');
    tabLabel.className = 'btn tabLabel active '+nowTab;
    tabLabel.textContent = `${employeeName.value}`;
    // 부모자식 설정
    tabButtons.appendChild(tabLabel);
}


// 테이블에 데이터 저장 이벤트
function saveData(nowTab, count, employeeName, dateInput, startTimeInput, endTimeInput, 
                  minutesWorked, totalMinutesWorked, wagePerMinute, withholdingTaxChecked){
    const table = document.querySelector('.dataTable').querySelector('.'+nowTab);
    const tableRow = document.createElement('tr');
    const num = document.createElement('td'); // 카운트
    const name = document.createElement('td'); // 근로자명
    const date = document.createElement('td'); // 근무일자
    const startTime = document.createElement('td'); // 시작시간
    const endTime = document.createElement('td'); // 종료시간
    const totalTime = document.createElement('td'); // 총 근무시간(분)
    const minuteSalary = document.createElement('td'); // 분당급여
    const tax = document.createElement('td'); // 원천징수
    const allSalary = document.createElement('td'); // 총 급여
    
    // 부모자식 설정
    table.querySelector('tbody').appendChild(tableRow);
    tableRow.appendChild(num)
    tableRow.appendChild(name);
    tableRow.appendChild(date);
    tableRow.appendChild(startTime);
    tableRow.appendChild(endTime);
    tableRow.appendChild(totalTime)
    tableRow.appendChild(minuteSalary);
    tableRow.appendChild(tax);
    tableRow.appendChild(allSalary);
    
    
        
        
    // 2024.12.21 오류 수정 - 이순
    //데이터 넣기
    count.textContent = Number(count.textContent) + 1;
    num.textContent = count.textContent; //1씩 증가
    name.textContent = employeeName.value; // 이름
    date.textContent = dateInput; // 근무일자
    startTime.textContent = startTimeInput; // 시작시간
    endTime.textContent = endTimeInput; // 종료시간
    totalTime.textContent = minutesWorked;// 총 근무시간(분)
    minuteSalary.textContent = wagePerMinute.value; // 분당급여
    tax.textContent = 'X'; // 원천징수 안했을경우
    allSalary.textContent = totalMinutesWorked * wagePerMinute.value;
    // 원천징수 했을경우
    if(withholdingTaxChecked.checked === true){
        tax.textContent = 'O';
        allSalary.textContent = totalMinutesWorked * wagePerMinute.value *(1 - 0.033);
    } 
}

// 기존 탭 정보 리셋
function resetImpor(employeeName,  wagePerMinute, withholdingTaxChecked,  result){
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


// 2024.12.23 PDF 변환 기능(페이지 잘림 에러) - 이순
// 2024.12.27 페이지 에러 (임시)포기선언 - 이순
function downloadPDF() {
    let element = document.getElementById('saveTable'); // PDF로 변환하고자 하는 HTML 요소를 선택합니다. 예: document.getElementById('your-element-id')

    html2canvas(element).then((canvas) => {
        let imgData = canvas.toDataURL('image/png');

        let imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
        let pageHeight = imgWidth * 1.414; //출력 페이지 세로 길이 계산 A4 기준
        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight; // 남은 이미지 높이
        let margin = 10; // 출력 페이지 여백설정
        var doc = new jspdf.jsPDF('p', 'mm','a4');
        let position = (10, 10); // 2페이지부터 마진이 안 먹어서 임시방편으로 설정정


        // 첫 페이지 출력
        doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

      // 한 페이지 이상일 경우 루프 돌면서 출력
      while (heightLeft >= 20) {			// 35
        position = heightLeft - imgHeight
        doc.addPage();
        doc.addImage(imgData, 'PNG', margint, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }


        doc.save("download.pdf");

        
    });
}



///////////// 순 함수 모음 끝 ///////////////////////////////////////////////////////////////////////////////////////////

