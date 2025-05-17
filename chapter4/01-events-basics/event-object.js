// event-object.js - 이벤트 객체 속성과 메서드

// 이 스크립트는 HTML 파일에서 사용됩니다.
// 이벤트 객체의 속성과 메서드를 소개합니다.

// 이벤트 핸들러 함수는 첫 번째 매개변수로 이벤트 객체를 받습니다.
// 이 객체는 이벤트에 대한 정보와 이벤트를 제어하는 메서드를 제공합니다.

// 1. 이벤트 객체 기본 속성
console.log("=== 이벤트 객체 기본 속성 ===");

// 클릭 이벤트 핸들러 - 기본 속성 출력
document.getElementById('basic-props-btn').addEventListener('click', function(event) {
    console.log('이벤트 유형:', event.type);
    console.log('이벤트 타깃:', event.target);
    console.log('현재 타깃:', event.currentTarget);
    console.log('이벤트 발생 시간:', event.timeStamp);
    console.log('버블링 단계?', event.bubbles);
    
    // 결과 출력
    const resultDiv = document.getElementById('basic-props-result');
    resultDiv.innerHTML = `
        <p><strong>이벤트 유형:</strong> ${event.type}</p>
        <p><strong>이벤트 타깃:</strong> ${event.target.tagName}</p>
        <p><strong>현재 타깃:</strong> ${event.currentTarget.tagName}</p>
        <p><strong>이벤트 발생 시간:</strong> ${event.timeStamp}ms</p>
        <p><strong>버블링 단계?</strong> ${event.bubbles}</p>
    `;
});

// 2. 마우스 이벤트 속성
console.log("\n=== 마우스 이벤트 속성 ===");

const mousePropsArea = document.getElementById('mouse-props-area');
if (mousePropsArea) {
    mousePropsArea.addEventListener('mousemove', function(event) {
        // 마우스 좌표 정보
        const info = document.getElementById('mouse-props-info');
        info.innerHTML = `
            <p><strong>클라이언트 좌표:</strong> (${event.clientX}, ${event.clientY})</p>
            <p><strong>페이지 좌표:</strong> (${event.pageX}, ${event.pageY})</p>
            <p><strong>화면 좌표:</strong> (${event.screenX}, ${event.screenY})</p>
            <p><strong>요소 내 좌표:</strong> (${event.offsetX}, ${event.offsetY})</p>
            <p><strong>Alt 키:</strong> ${event.altKey}, <strong>Ctrl 키:</strong> ${event.ctrlKey}, <strong>Shift 키:</strong> ${event.shiftKey}</p>
            <p><strong>버튼:</strong> ${event.button}</p>
        `;
    });
    
    mousePropsArea.addEventListener('mousedown', function(event) {
        console.log('마우스 버튼:', event.button); // 0=왼쪽, 1=중간, 2=오른쪽
    });
}

// 3. 키보드 이벤트 속성
console.log("\n=== 키보드 이벤트 속성 ===");

const keyInput = document.getElementById('key-input');
if (keyInput) {
    keyInput.addEventListener('keydown', function(event) {
        // 키보드 정보
        const info = document.getElementById('key-props-info');
        info.innerHTML = `
            <p><strong>키:</strong> ${event.key}</p>
            <p><strong>키 코드:</strong> ${event.keyCode}</p>
            <p><strong>코드:</strong> ${event.code}</p>
            <p><strong>Alt 키:</strong> ${event.altKey}, <strong>Ctrl 키:</strong> ${event.ctrlKey}, <strong>Shift 키:</strong> ${event.shiftKey}</p>
            <p><strong>반복?</strong> ${event.repeat}</p>
        `;
        
        // 특정 키 조합 감지 예시
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault(); // 브라우저 기본 동작 방지
            console.log('Ctrl+S가 눌렸습니다! 저장 기능을 실행합니다.');
            document.getElementById('key-action-info').textContent = 'Ctrl+S 감지: 저장 기능 실행!';
        }
    });
}

// 4. 이벤트 제어 메서드
console.log("\n=== 이벤트 제어 메서드 ===");

// preventDefault() - 기본 동작 방지
const linkExample = document.getElementById('prevent-default-link');
if (linkExample) {
    linkExample.addEventListener('click', function(event) {
        event.preventDefault(); // 링크의 기본 동작(페이지 이동) 방지
        console.log('링크 클릭 기본 동작이 방지되었습니다.');
        document.getElementById('prevent-default-result').textContent = '링크 클릭 기본 동작이 방지되었습니다.';
    });
}

// stopPropagation() - 이벤트 전파 중단
const innerElement = document.getElementById('inner-element');
const outerElement = document.getElementById('outer-element');

if (innerElement && outerElement) {
    innerElement.addEventListener('click', function(event) {
        event.stopPropagation(); // 이벤트 버블링 중단
        console.log('내부 요소 클릭됨! 이벤트 버블링 중단됨');
        document.getElementById('propagation-result').textContent = '내부 요소 클릭됨! 이벤트가 외부 요소로 전파되지 않음';
    });
    
    outerElement.addEventListener('click', function() {
        console.log('외부 요소 클릭됨!');
        document.getElementById('propagation-result').textContent = '외부 요소 클릭됨!';
    });
}

// 5. 커스텀 이벤트
console.log("\n=== 커스텀 이벤트 ===");

const customEventButton = document.getElementById('custom-event-btn');
const customEventTarget = document.getElementById('custom-event-target');

if (customEventButton && customEventTarget) {
    // 커스텀 이벤트 리스너 등록
    customEventTarget.addEventListener('myCustomEvent', function(event) {
        console.log('커스텀 이벤트 발생!', event.detail);
        document.getElementById('custom-event-result').textContent = 
            `커스텀 이벤트 발생! 데이터: ${JSON.stringify(event.detail)}`;
    });
    
    // 커스텀 이벤트 발생시키기
    customEventButton.addEventListener('click', function() {
        // 커스텀 이벤트 생성
        const myEvent = new CustomEvent('myCustomEvent', {
            detail: { name: '커스텀 이벤트', time: new Date().toLocaleTimeString() },
            bubbles: true
        });
        
        // 이벤트 디스패치
        customEventTarget.dispatchEvent(myEvent);
    });
} 