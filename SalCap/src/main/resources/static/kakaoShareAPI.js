//카카오톡 공유하기 기능
export function kakaoAPI() {
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