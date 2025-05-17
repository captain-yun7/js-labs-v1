// memory-leaks.js - 메모리 누수 패턴과 해결 방법

/**
 * JavaScript의 메모리 누수(Memory Leaks)
 * 
 * 메모리 누수는 프로그램에서 더 이상 필요하지 않은 메모리가 해제되지 않고 
 * 계속 유지되는 현상입니다. 장기적으로 성능 저하와 애플리케이션 충돌을 유발할 수 있습니다.
 */

console.log('==== JavaScript 메모리 누수 패턴 ====');

// 1. 전역 변수 누수
console.log('\n--- 전역 변수 누수 ---');

function globalVariableLeak() {
    // 'var', 'let', 'const' 키워드 없이 변수 선언
    leakingVariable = '전역 변수로 누수됨'; // window.leakingVariable로 저장됨
    
    // 함수가 종료되어도 전역 변수는 계속 유지됨
}

globalVariableLeak();
console.log('전역 변수 접근 가능:', leakingVariable);

// 해결 방법: 항상 'let', 'const' 또는 'var' 키워드로 변수 선언하기
function fixGlobalVariableLeak() {
    'use strict'; // 엄격 모드에서는 선언되지 않은 변수 할당 시 에러 발생
    
    // 다음 줄은 엄격 모드에서 에러를 발생시킴
    // strictModeVariable = '에러 발생'; 
    
    // 올바른 변수 선언
    const localVariable = '지역 변수로 적절히 선언됨';
    console.log('지역 변수:', localVariable);
}

fixGlobalVariableLeak();

// 2. 잊혀진 타이머와 콜백
console.log('\n--- 잊혀진 타이머와 콜백 ---');

function setLeakyTimer() {
    const largeData = new Array(10000).fill('대용량 데이터');
    
    // 이 타이머는 절대 제거되지 않으며, largeData에 대한 참조를 유지합니다.
    setInterval(() => {
        console.log('데이터 크기:', largeData.length);
        // largeData를 클로저로 참조하여 메모리에 계속 유지됨
    }, 10000); // 실제로는 10초마다 실행되지만, 예제에서는 실행하지 않음
}

// setLeakyTimer(); // 주석 처리: 실제로 메모리 누수가 발생하지 않도록

// 해결 방법: 타이머를 변수에 저장하고 필요 없을 때 제거하기
function fixTimerLeak() {
    const largeData = new Array(10000).fill('대용량 데이터');
    
    // 타이머 참조 저장
    const timerId = setInterval(() => {
        console.log('데이터 처리 중...');
        // 작업 완료 후 타이머 제거
        clearInterval(timerId);
        console.log('타이머 제거됨');
    }, 1000);
    
    // 예제를 위해 바로 타이머 제거 (실제 코드에서는 필요에 따라 제거)
    // clearInterval(timerId);
}

fixTimerLeak();

// 3. 클로저로 인한 메모리 누수
console.log('\n--- 클로저로 인한 메모리 누수 ---');

function createLeakyClosures() {
    const largeData = new Array(10000).fill('대용량 데이터');
    
    // 이 함수는 전체 largeData 배열을 참조로 유지함
    function leakyClosure() {
        // largeData 전체를 참조하지만 일부만 사용
        return largeData[0];
    }
    
    return leakyClosure;
}

const leakyFunction = createLeakyClosures();
console.log('누수가 있는 클로저 결과:', leakyFunction());

// 해결 방법: 필요한 데이터만 캡처하기
function createOptimizedClosures() {
    const largeData = new Array(10000).fill('대용량 데이터');
    const firstItem = largeData[0]; // 필요한 값만 저장
    
    // 이 함수는 필요한 데이터만 참조로 유지함
    function optimizedClosure() {
        // largeData 전체 대신 필요한 항목만 참조
        return firstItem;
    }
    
    return optimizedClosure;
}

const optimizedFunction = createOptimizedClosures();
console.log('최적화된 클로저 결과:', optimizedFunction());

// 4. DOM 참조 누수
console.log('\n--- DOM 참조 누수 ---');

// DOM 요소에 대한 참조를 저장하는 예제
function setupDOM() {
    // 브라우저 환경에서만 작동하는 코드입니다.
    // 이 예제는 Node.js 환경에서는 실행할 수 없습니다.
    
    console.log('브라우저 환경에서 DOM 요소에 대한 참조를 저장하는 예제:');
    
    /*
    // 캐시에 DOM 요소 저장
    const elements = {};
    
    function cacheElement(id) {
        elements[id] = document.getElementById(id);
    }
    
    // 여러 요소 캐싱
    cacheElement('header');
    cacheElement('main');
    cacheElement('footer');
    
    // 문제: DOM에서 요소가 제거되어도 캐시는 여전히 참조를 유지함
    // document.body.removeChild(document.getElementById('header'));
    
    // 해결 방법: 더 이상 필요하지 않은 참조 제거
    function removeFromCache(id) {
        delete elements[id];
    }
    
    // 요소가 DOM에서 제거될 때 캐시에서도 제거
    // removeFromCache('header');
    */
    
    console.log('DOM 요소 참조 누수 방지 방법:');
    console.log('1. 더 이상 필요하지 않은 DOM 참조는 null로 설정');
    console.log('2. 이벤트 리스너 제거하기');
    console.log('3. WeakMap을 사용하여 DOM 요소에 데이터 연결하기');
}

setupDOM();

// 5. 이벤트 리스너 누수
console.log('\n--- 이벤트 리스너 누수 ---');

function setupEventListeners() {
    // 브라우저 환경에서만 작동하는 코드입니다.
    console.log('이벤트 리스너로 인한 메모리 누수 예제 (브라우저 환경):');
    
    /*
    // 버튼에 이벤트 리스너 추가
    const button = document.getElementById('myButton');
    
    // 큰 데이터를 참조하는 이벤트 리스너
    const largeData = new Array(10000).fill('이벤트 데이터');
    
    button.addEventListener('click', function() {
        console.log('버튼 클릭됨', largeData.length);
    });
    
    // 문제: DOM 요소가 제거되어도 이벤트 리스너가 제거되지 않으면 메모리 누수 발생
    // button.parentNode.removeChild(button); // 버튼 제거해도 리스너와 데이터는 남음
    
    // 해결 방법: 요소 제거 전에 이벤트 리스너 제거
    button.removeEventListener('click', clickHandler);
    */
    
    console.log('이벤트 리스너 누수 방지 방법:');
    console.log('1. 컴포넌트/요소 제거 전에 모든 이벤트 리스너 명시적으로 제거');
    console.log('2. 이벤트 위임(Event Delegation) 사용하여 리스너 수 최소화');
    console.log('3. 약한 참조(WeakMap)를 사용하여 리스너 관리');
}

setupEventListeners();

// 6. 순환 참조
console.log('\n--- 순환 참조 ---');

function createCircularReferences() {
    let parent = {
        name: 'parent'
    };
    
    let child = {
        name: 'child'
    };
    
    // 순환 참조 생성
    parent.child = child;
    child.parent = parent;
    
    // 명시적으로 참조 해제하지 않으면 가비지 컬렉션이 어려울 수 있음
    console.log('순환 참조 생성됨');
    
    return { parent, child };
}

const objects = createCircularReferences();

// 해결 방법: 순환 참조 제거 또는 약한 참조 사용
function breakCircularReferences(parent, child) {
    // 순환 참조 제거
    parent.child = null;
    child.parent = null;
    
    console.log('순환 참조 제거됨');
}

breakCircularReferences(objects.parent, objects.child);

// 7. WeakMap과 WeakSet을 사용한 메모리 누수 방지
console.log('\n--- WeakMap과 WeakSet 활용 ---');

// WeakMap 예제
function useWeakMap() {
    // WeakMap은 키로 사용된 객체가 가비지 컬렉션 대상이 되면
    // 해당 항목도 자동으로 가비지 컬렉션 대상이 됨
    const cache = new WeakMap();
    
    let user = { name: '사용자 1' }; // 객체 생성
    
    // WeakMap에 데이터 저장
    cache.set(user, { lastAccess: Date.now() });
    
    console.log('WeakMap에 데이터 저장됨');
    
    // user 객체에 대한 참조가 제거되면 WeakMap의 항목도 가비지 컬렉션 대상이 됨
    user = null;
    
    console.log('user 객체 참조 제거됨, WeakMap의 항목도 가비지 컬렉션 대상이 됨');
}

useWeakMap();

/**
 * 메모리 누수 방지를 위한 모범 사례:
 * 
 * 1. 변수를 항상 적절히 선언하고 사용하지 않는 변수는 제거
 * 2. 타이머와 이벤트 리스너는 필요 없을 때 명시적으로 제거
 * 3. 클로저는 필요한 데이터만 참조하도록 설계
 * 4. DOM 요소 참조는 요소가 DOM에서 제거될 때 함께 제거
 * 5. 순환 참조는 피하거나 약한 참조(WeakMap, WeakSet) 사용
 * 6. 대용량 데이터는 더 이상 필요하지 않을 때 참조 해제
 * 7. 캐시와 컬렉션은 크기를 제한하고 주기적으로 정리
 */ 