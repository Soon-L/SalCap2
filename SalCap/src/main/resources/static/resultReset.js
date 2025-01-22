
// 계산을 한 후에 input의 내용이 바뀌었을때 계산을 초기화 해주는 함수
export function resultReset(divName, tag) {
    const resultElement = document.getElementById('result');
    if (resultElement.textContent !== '') {
        document.querySelector(divName).addEventListener('input', function (event) {
            if (event.target.matches(tag)) {
                resultElement.textContent = '';
            }
        });
    }
}