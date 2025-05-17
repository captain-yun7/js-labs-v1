// DOM 고급 선택자 예제 - selectors-advanced.js

// 결과 출력을 위한 함수
function printOutput(message) {
    const output = document.getElementById('output');
    output.innerHTML = message;
}

// 선택된 요소들을 출력하는 함수
function showSelectedElements(elements, description) {
    let result = `<strong>${description}</strong><br>`;
    
    if (!elements) {
        result += '선택된 요소 없음';
    } else if (elements.length === 0) {
        result += '선택된 요소 없음';
    } else if (elements.length === undefined) {
        // NodeList나 HTMLCollection이 아닌 단일 요소인 경우
        result += `선택된 요소: 1개<br>`;
        result += `- ${elements.outerHTML.substring(0, 50)}${elements.outerHTML.length > 50 ? '...' : ''}`;
    } else {
        result += `선택된 요소: ${elements.length}개<br>`;
        for (let i = 0; i < elements.length && i < 5; i++) {
            result += `- ${elements[i].outerHTML.substring(0, 50)}${elements[i].outerHTML.length > 50 ? '...' : ''}<br>`;
        }
        
        if (elements.length > 5) {
            result += `... 외 ${elements.length - 5}개 요소`;
        }
    }
    
    printOutput(result);
}

// 전체 페이지가 로드된 후 실행
window.addEventListener('DOMContentLoaded', () => {
    
    // 1. 모든 항목 선택 버튼
    document.getElementById('btn-items').addEventListener('click', () => {
        // querySelectorAll로 모든 .item 클래스 요소 선택
        const items = document.querySelectorAll('.item');
        showSelectedElements(items, 'querySelectorAll(".item")');
        
        // 비교: getElementsByClassName 사용
        const itemsByClass = document.getElementsByClassName('item');
        console.log('querySelectorAll로 선택:', items);
        console.log('getElementsByClassName으로 선택:', itemsByClass);
    });
    
    // 2. 활성 항목 선택 버튼
    document.getElementById('btn-active').addEventListener('click', () => {
        // querySelector로 첫 번째 .active 클래스 요소 선택
        const activeItem = document.querySelector('.item.active');
        showSelectedElements(activeItem, 'querySelector(".item.active")');
        
        // querySelectorAll로 모든 .active 클래스 요소 선택
        const allActiveItems = document.querySelectorAll('.item.active');
        console.log('모든 활성 항목:', allActiveItems);
    });
    
    // 3. 중첩 항목 선택 버튼
    document.getElementById('btn-nested').addEventListener('click', () => {
        // 중첩된 요소 내의 p 요소들 선택
        const nestedParagraphs = document.querySelectorAll('.nested p');
        showSelectedElements(nestedParagraphs, 'querySelectorAll(".nested p")');
        
        // 직계 자식만 선택하는 '>' 선택자 사용
        const directNestedParagraphs = document.querySelectorAll('.nested > p');
        console.log('직계 자식 p 태그만:', directNestedParagraphs);
    });
    
    // 4. 복합 선택자 테스트 버튼
    document.getElementById('btn-complex').addEventListener('click', () => {
        // 여러 복합 선택자 예제
        let result = '<strong>복합 선택자 예제:</strong><br><br>';
        
        // 예제 1: 첫 번째 항목 선택
        const firstItem = document.querySelector('#list-container .item:first-child');
        result += '1. #list-container .item:first-child:<br>';
        result += `- ${firstItem ? firstItem.textContent : '없음'}<br><br>`;
        
        // 예제 2: 홀수 번째 항목 선택
        const oddItems = document.querySelectorAll('#list-container .item:nth-child(odd)');
        result += `2. #list-container .item:nth-child(odd): ${oddItems.length}개<br>`;
        Array.from(oddItems).forEach(item => {
            result += `- ${item.textContent}<br>`;
        });
        result += '<br>';
        
        // 예제 3: 특정 속성을 가진 요소 선택
        const itemsWithClass = document.querySelectorAll('.item[class*="active"]');
        result += `3. .item[class*="active"]: ${itemsWithClass.length}개<br>`;
        Array.from(itemsWithClass).forEach(item => {
            result += `- ${item.textContent}<br>`;
        });
        result += '<br>';
        
        // 예제 4: 복합 조건 (OR 선택자)
        const importantOrActive = document.querySelectorAll('.item.important, .item.active');
        result += `4. .item.important, .item.active: ${importantOrActive.length}개<br>`;
        Array.from(importantOrActive).forEach(item => {
            result += `- ${item.textContent}<br>`;
        });
        
        printOutput(result);
    });
    
    // 기본 메시지 출력
    printOutput(`
        <strong>QuerySelector 메서드 예제</strong><br><br>
        위의 버튼을 클릭하여 다양한 선택자 예제를 확인하세요.<br><br>
        특징:<br>
        - querySelector(): CSS 선택자로 첫 번째 요소 반환<br>
        - querySelectorAll(): CSS 선택자로 모든 요소 반환 (NodeList)<br>
        - 정적 NodeList 반환 (실시간 업데이트 안됨)<br>
        - 복잡한 선택자 지원 (ID, 클래스, 속성, 가상 클래스 등)
    `);
}); 