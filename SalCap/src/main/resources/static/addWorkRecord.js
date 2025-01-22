// 새로운 근무 기록 추가 함수
export function addWorkRecord() {
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

// 근무기록 추가 시 새로운 input 핃드를 만드는 함수
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