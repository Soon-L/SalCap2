// 엑셀 변환 함수
export function exportExcel() {
    let wb = XLSX.utils.book_new();
    let ws = excelHandler.getWorksheet();

    // 스타일 적용
    StyleWorksheet(ws);

    // 워크시트 추가
    XLSX.utils.book_append_sheet(wb, ws, excelHandler.getSheetName());

    // 바이너리 데이터 생성
    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Blob 반환
    return new Blob([s2ab(wbout)], { type: "application/octet-stream" });
}

function StyleWorksheet(ws) {
    const headerStyle = {
        fill: {
            patternType: "solid",
            fgColor: { rgb: "b2b2b2" },
            bgColor: { rgb: "b2b2b2" }
        }
    };

    const commonStyle = {
        font: { name: "Arial" },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: {
            top: { style: "thin", color: "000000" },
            bottom: { style: "thin", color: "000000" },
            left: { style: "thin", color: "000000" },
            right: { style: "thin", color: "000000" }
        }
    };

    ws["!cols"] = [
        { wpx: 30 }, { wpx: 130 }, { wpx: 130 }, { wpx: 130 }, 
        { wpx: 130 }, { wpx: 130 }, { wpx: 130 }, { wpx: 130 }
    ];

    Object.keys(ws).forEach(cell => {
        if (cell[0] === '!') return; // 메타데이터 스킵
        ws[cell].s = { ...commonStyle };
        let cellInfo = XLSX.utils.decode_cell(cell);
        if (cellInfo.r === 0) { // 헤더 행 스타일 추가
            ws[cell].s = { ...ws[cell].s, ...headerStyle };
        }
    });
}

let excelHandler = {
    getExcelFileName: function () {
        return 'workrecord.xlsx';
    },
    getSheetName: function () {
        return 'sheet1';
    },
    getExcelData: function () {
        return document.querySelector('.tableTab.active > table');
    },
    getWorksheet: function () {
        return XLSX.utils.table_to_sheet(this.getExcelData());
    }
};

function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

