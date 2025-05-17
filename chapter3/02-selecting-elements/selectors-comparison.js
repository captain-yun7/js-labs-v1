// DOM 선택자 비교 예제 - selectors-comparison.js

// 출력 함수
function print(message) {
    const output = document.getElementById('output');
    output.textContent += message + '\n';
}

// 출력 초기화
function clearOutput() {
    const output = document.getElementById('output');
    output.textContent = '';
}

// 항목 카운터
let itemCounter = 4;

// DOM이 로드된 후 실행
window.addEventListener('DOMContentLoaded', () => {
    // 항목 추가 버튼
    document.getElementById('btn-add-item').addEventListener('click', () => {
        const container = document.getElementById('items-container');
        const newItem = document.createElement('div');
        newItem.className = 'test-item';
        newItem.textContent = `항목 ${itemCounter++}`;
        container.appendChild(newItem);
        
        print(`새 항목 추가됨: "${newItem.textContent}"`);
    });
    
    // 초기화 버튼
    document.getElementById('btn-reset-items').addEventListener('click', () => {
        const container = document.getElementById('items-container');
        container.innerHTML = `
            <div class="test-item">항목 1</div>
            <div class="test-item">항목 2</div>
            <div class="test-item">항목 3</div>
        `;
        itemCounter = 4;
        clearOutput();
        print('항목 초기화 완료');
    });
    
    // 선택자 비교 테스트 버튼
    document.getElementById('btn-run-test').addEventListener('click', runSelectorTest);
    
    // 초기 메시지
    print('버튼을 클릭하여 테스트하세요. "항목 추가" 버튼으로 요소를 추가한 후 "선택자 비교 테스트" 버튼을 눌러보세요.');
});

// 선택자 비교 테스트 실행
function runSelectorTest() {
    clearOutput();
    print('=== 선택자 테스트 시작 ===\n');
    
    // 현재 DOM 상태 캡처
    const byClassName = document.getElementsByClassName('test-item');
    const byTagName = document.getElementsByTagName('div');
    const byQuerySelectorAll = document.querySelectorAll('.test-item');
    
    // 현재 상태 출력
    print(`1. 현재 test-item 요소 수:`);
    print(`- getElementsByClassName: ${byClassName.length}개`);
    print(`- querySelectorAll: ${byQuerySelectorAll.length}개`);
    print(`- getElementsByTagName('div'): ${byTagName.length}개`);
    
    // 새 요소 추가
    print('\n2. 새 요소 추가 후:');
    const container = document.getElementById('items-container');
    const newItem = document.createElement('div');
    newItem.className = 'test-item';
    newItem.textContent = `항목 ${itemCounter++}`;
    container.appendChild(newItem);
    
    // 추가 후 컬렉션 상태 확인
    print(`- getElementsByClassName: ${byClassName.length}개 (추가 반영됨 - 라이브 컬렉션)`);
    print(`- querySelectorAll: ${byQuerySelectorAll.length}개 (추가 반영 안됨 - 정적 컬렉션)`);
    print(`- getElementsByTagName('div'): ${byTagName.length}개 (추가 반영됨 - 라이브 컬렉션)`);
    
    // 다시 쿼리 실행해서 확인
    print('\n3. 쿼리 다시 실행 후:');
    const newByQuerySelectorAll = document.querySelectorAll('.test-item');
    print(`- 새로운 querySelectorAll: ${newByQuerySelectorAll.length}개 (최신 상태 반영)`);
    
    // 퍼포먼스 비교
    print('\n4. 퍼포먼스 비교:');
    
    // getElementById
    const idStart = performance.now();
    for (let i = 0; i < 1000; i++) {
        document.getElementById('items-container');
    }
    const idEnd = performance.now();
    
    // getElementsByClassName
    const classStart = performance.now();
    for (let i = 0; i < 1000; i++) {
        document.getElementsByClassName('test-item');
    }
    const classEnd = performance.now();
    
    // querySelectorAll
    const queryStart = performance.now();
    for (let i = 0; i < 1000; i++) {
        document.querySelectorAll('.test-item');
    }
    const queryEnd = performance.now();
    
    print(`- getElementById: ${(idEnd - idStart).toFixed(2)}ms`);
    print(`- getElementsByClassName: ${(classEnd - classStart).toFixed(2)}ms`);
    print(`- querySelectorAll: ${(queryEnd - queryStart).toFixed(2)}ms`);
    
    print('\n=== 테스트 완료 ===');
    print('\n결론: getElementsByClassName과 getElementsByTagName은 DOM 변경을 자동으로 반영하는 라이브 컬렉션이고, querySelectorAll은 정적 스냅샷입니다.');
} 