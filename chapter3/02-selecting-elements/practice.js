// DOM 선택자 실습 - practice.js

// 결과 출력을 위한 함수
function printOutput(message) {
    const output = document.getElementById('output');
    output.innerHTML = message;
}

// DOM이 로드된 후 실행
window.addEventListener('DOMContentLoaded', () => {
    // 기본 안내 메시지
    printOutput('<p>선택자 테스트 버튼을 클릭하여 결과를 확인하세요.</p>');
    
    // ==================================================
    // 과제 1: 기본 선택자 사용하기
    // ==================================================
    console.log('===== 과제 1: 기본 선택자 =====');
    
    // 1. ID로 선택
    const mainTitle = document.getElementById('main-title');
    console.log('1. ID가 "main-title"인 요소:', mainTitle);
    
    // 2. 클래스명으로 선택
    const highlightElements = document.getElementsByClassName('highlight');
    console.log('2. "highlight" 클래스 요소들:', highlightElements);
    console.log(`   - 개수: ${highlightElements.length}개`);
    
    // 3. 태그명으로 선택
    const liElements = document.getElementsByTagName('li');
    console.log('3. 모든 li 태그 요소들:', liElements);
    console.log(`   - 개수: ${liElements.length}개`);
    
    // 4. CSS 선택자로 첫 번째 요소 선택
    const firstImportant = document.querySelector('.important');
    console.log('4. 첫 번째 .important 클래스 요소:', firstImportant);
    
    // ==================================================
    // 과제 2: 복합 선택자 사용하기
    // ==================================================
    console.log('\n===== 과제 2: 복합 선택자 =====');
    
    // 1. 특정 요소 내부의 모든 li 요소
    const task2LiElements = document.querySelectorAll('#task-2 li');
    console.log('1. #task-2 내부의 모든 li 요소:', task2LiElements);
    console.log(`   - 개수: ${task2LiElements.length}개`);
    
    // 2. 중첩된 요소 내부의 span 요소
    const nestedSpans = document.querySelectorAll('.nested span');
    console.log('2. .nested 내부의 모든 span 요소:', nestedSpans);
    console.log(`   - 개수: ${nestedSpans.length}개`);
    
    // 3. 특정 속성을 가진 요소
    const activeElements = document.querySelectorAll('[data-status="active"]');
    console.log('3. data-status="active" 속성을 가진 요소들:', activeElements);
    console.log(`   - 개수: ${activeElements.length}개`);
    
    // 4. ID 내부에서 특정 클래스를 가진 요소들
    const completedItems = document.querySelectorAll('#todo-list .completed');
    console.log('4. #todo-list 내부의 .completed 요소들:', completedItems);
    console.log(`   - 개수: ${completedItems.length}개`);
    
    // ==================================================
    // 과제 3: 선택자 메서드 비교
    // ==================================================
    document.getElementById('btn-test').addEventListener('click', () => {
        console.log('\n===== 과제 3: 선택자 메서드 비교 =====');
        
        // 다양한 방법으로 box 요소들을 선택
        const boxesById = document.getElementById('box1');
        const boxesByClassName = document.getElementsByClassName('box');
        const boxesByTagName = document.querySelectorAll('.box-container div');
        const boxesByQuerySelector = document.querySelector('.box');
        const boxesByQuerySelectorAll = document.querySelectorAll('.box');
        
        console.log('1. getElementById:', boxesById);
        console.log('2. getElementsByClassName:', boxesByClassName);
        console.log('3. querySelectorAll(특정 요소):', boxesByTagName);
        console.log('4. querySelector:', boxesByQuerySelector);
        console.log('5. querySelectorAll:', boxesByQuerySelectorAll);
        
        // 선택자 메서드 결과 출력
        let outputMessage = `
            <h4>선택자 메서드 비교 결과:</h4>
            <table border="1" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th>메서드</th>
                    <th>반환 타입</th>
                    <th>결과</th>
                </tr>
                <tr>
                    <td>getElementById('box1')</td>
                    <td>${boxesById ? boxesById.constructor.name : 'null'}</td>
                    <td>단일 요소: ${boxesById ? boxesById.textContent : '없음'}</td>
                </tr>
                <tr>
                    <td>getElementsByClassName('box')</td>
                    <td>${boxesByClassName.constructor.name}</td>
                    <td>요소 ${boxesByClassName.length}개 (HTMLCollection)</td>
                </tr>
                <tr>
                    <td>querySelectorAll('.box-container div')</td>
                    <td>${boxesByTagName.constructor.name}</td>
                    <td>요소 ${boxesByTagName.length}개 (NodeList)</td>
                </tr>
                <tr>
                    <td>querySelector('.box')</td>
                    <td>${boxesByQuerySelector ? boxesByQuerySelector.constructor.name : 'null'}</td>
                    <td>첫 번째 일치 요소: ${boxesByQuerySelector ? boxesByQuerySelector.textContent : '없음'}</td>
                </tr>
                <tr>
                    <td>querySelectorAll('.box')</td>
                    <td>${boxesByQuerySelectorAll.constructor.name}</td>
                    <td>요소 ${boxesByQuerySelectorAll.length}개 (NodeList)</td>
                </tr>
            </table>
            
            <p><strong>라이브 업데이트 테스트:</strong></p>
            <p>새 박스를 추가한 후 기존 컬렉션의 길이가 자동 업데이트되는지 확인하세요.</p>
        `;
        
        printOutput(outputMessage);
        
        // 새 박스 추가
        const boxContainer = document.querySelector('.box-container');
        const newBox = document.createElement('div');
        newBox.className = 'box';
        newBox.id = 'box4';
        newBox.textContent = 'Box 4 (새로 추가됨)';
        boxContainer.appendChild(newBox);
        
        // 컬렉션 업데이트 확인
        console.log('\n=== 새 박스 추가 후 ===');
        console.log('getElementsByClassName 길이:', boxesByClassName.length);
        console.log('querySelectorAll 길이:', boxesByQuerySelectorAll.length);
        
        // 추가 정보 출력
        const updateMessage = `
            <p><strong>새 박스 추가 후 결과:</strong></p>
            <ul>
                <li>getElementsByClassName('box') 길이: ${boxesByClassName.length} (라이브 업데이트)</li>
                <li>querySelectorAll('.box') 길이: ${boxesByQuerySelectorAll.length} (정적 상태 유지)</li>
            </ul>
        `;
        
        document.getElementById('output').innerHTML += updateMessage;
    });
}); 