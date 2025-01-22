export function downloadPDF(){
	const resultData = document.querySelector('.resultData');

	// PDF 생성 버튼 클릭
	if(!resultData){
		// PDF 예외처리
	    alert('데이터를 저장해주세요.');
	    return;
	}
	else{
		// PDF 생성
		changePDF();
	}
}





// PDF 생성
function changePDF() {
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