// DOM 기본 선택자 예제 - selectors-basic.js

// 결과 출력을 위한 함수
function printOutput(message) {
    const output = document.getElementById('output');
    output.innerHTML += message + '<br>';
}

// 출력 초기화
function clearOutput() {
    const output = document.getElementById('output');
    output.innerHTML = '';
}

// 전체 페이지가 로드된 후 실행
window.addEventListener('DOMContentLoaded', () => {
    clearOutput();
    
    // 1. ID로 요소 선택하기 (getElementById)
    printOutput('<strong>1. ID로 요소 선택하기:</strong>');
    const titleElement = document.getElementById('title');
    printOutput(`- title 요소 내용: "${titleElement.textContent}"`);
    
    const uniqueElement = document.getElementById('unique-element');
    printOutput(`- unique-element 태그명: ${uniqueElement.tagName}`);
    printOutput(`- unique-element 자식 요소 수: ${uniqueElement.children.length}`);
    
    // 존재하지 않는 ID로 접근하면 null 반환
    const nonExistentElement = document.getElementById('non-existent');
    printOutput(`- 존재하지 않는 ID 결과: ${nonExistentElement}`);
    
    printOutput('<hr>');
    
    // 2. 클래스명으로 요소 선택하기 (getElementsByClassName)
    printOutput('<strong>2. 클래스명으로 요소 선택하기:</strong>');
    const containerElements = document.getElementsByClassName('container');
    printOutput(`- container 클래스 요소 개수: ${containerElements.length}`);
    
    const highlightElements = document.getElementsByClassName('highlight');
    printOutput(`- highlight 클래스 요소 개수: ${highlightElements.length}`);
    
    // 해당 클래스를 가진 요소가 없으면 빈 HTMLCollection 반환
    const nonExistentClass = document.getElementsByClassName('non-existent');
    printOutput(`- 존재하지 않는 클래스 결과 길이: ${nonExistentClass.length}`);
    
    printOutput('<hr>');
    
    // 3. 태그명으로 요소 선택하기 (getElementsByTagName)
    printOutput('<strong>3. 태그명으로 요소 선택하기:</strong>');
    const paragraphs = document.getElementsByTagName('p');
    printOutput(`- p 태그 요소 개수: ${paragraphs.length}`);
    
    const buttons = document.getElementsByTagName('button');
    printOutput(`- button 태그 요소 개수: ${buttons.length}`);
    
    // forEach를 직접 사용할 수 없음 (유사 배열 객체)
    printOutput('- 모든 버튼 내용:');
    for (let i = 0; i < buttons.length; i++) {
        printOutput(`  * ${buttons[i].textContent}`);
    }
    
    printOutput('<hr>');
    
    // 4. HTMLCollection과 배열 비교
    printOutput('<strong>4. HTMLCollection vs 배열:</strong>');
    
    // HTMLCollection 형태 확인
    printOutput(`- buttons는 배열인가? ${Array.isArray(buttons)}`);
    printOutput(`- buttons의 타입: ${buttons.constructor.name}`);
    
    // HTMLCollection을 배열로 변환
    const buttonsArray = Array.from(buttons);
    printOutput(`- 변환된 buttonsArray는 배열인가? ${Array.isArray(buttonsArray)}`);
    
    // 이제 배열 메서드 사용 가능
    const buttonTexts = buttonsArray.map(btn => btn.textContent);
    printOutput(`- map() 메서드 사용 결과: ${buttonTexts.join(', ')}`);
}); 