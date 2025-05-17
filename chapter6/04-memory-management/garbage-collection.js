// garbage-collection.js - 가비지 컬렉션 메커니즘

/**
 * JavaScript의 가비지 컬렉션(Garbage Collection)
 * 
 * 가비지 컬렉션은 더 이상 필요하지 않은 메모리를 자동으로 식별하고 해제하는 과정입니다.
 * JavaScript 엔진은 주로 두 가지 가비지 컬렉션 알고리즘을 사용합니다:
 * 1. 참조 카운팅(Reference Counting)
 * 2. 표시하고 쓸기(Mark and Sweep)
 */

console.log('==== JavaScript 가비지 컬렉션 ====');

// 1. 참조 카운팅(Reference Counting)
console.log('\n--- 참조 카운팅 ---');

/**
 * 참조 카운팅은 각 객체에 대한 참조 수를 세는 단순한 가비지 컬렉션 알고리즘입니다.
 * 객체에 대한 참조가 0이 되면 "가비지"로 간주됩니다.
 * 참조 카운팅의 한계: 순환 참조 문제를 해결하지 못합니다.
 */

// 참조 생성 및 제거 예제
function referenceCountingExample() {
    let obj = { name: '참조 카운팅 예제' }; // 참조 카운트: 1
    
    console.log('객체 생성됨:', obj.name);
    
    // 새로운 참조 생성
    let reference = obj; // 참조 카운트: 2
    console.log('새 참조 생성됨:', reference.name);
    
    // 원래 참조 제거
    obj = null; // 참조 카운트: 1
    console.log('첫 번째 참조 제거됨');
    
    // 두 번째 참조 유지 중
    console.log('두 번째 참조 유효함:', reference.name);
    
    // 두 번째 참조 제거
    reference = null; // 참조 카운트: 0 -> 가비지 컬렉션 대상이 됨
    console.log('두 번째 참조 제거됨, 객체는 이제 가비지 컬렉션 대상입니다.');
}

referenceCountingExample();

// 2. 순환 참조 문제
console.log('\n--- 순환 참조 문제 ---');

/**
 * 참조 카운팅의 한계를 보여주는 순환 참조 예제.
 * 두 객체가 서로를 참조하면 참조 카운트는 항상 1 이상이므로 
 * 참조 카운팅 알고리즘만으로는 가비지 컬렉션이 되지 않습니다.
 */

function createCyclicReference() {
    let objectA = { name: 'Object A' };
    let objectB = { name: 'Object B' };
    
    // 순환 참조 생성
    objectA.ref = objectB;
    objectB.ref = objectA;
    
    console.log('순환 참조 생성됨');
    console.log(`objectA -> ${objectA.ref.name}, objectB -> ${objectB.ref.name}`);
    
    // 함수 종료 시 objectA와 objectB는 로컬 변수로 스코프를 벗어나지만,
    // 서로를 참조하고 있어 참조 카운팅으로는 메모리가 해제되지 않을 수 있습니다.
    // 그러나 현대 JavaScript 엔진은 "표시하고 쓸기" 알고리즘을 통해 이를 처리합니다.
}

createCyclicReference();
console.log('함수 종료 후, 순환 참조 객체들은 더 이상 접근할 수 없지만 참조 카운팅만으로는 해제되지 않을 수 있습니다.');

// 3. 표시하고 쓸기(Mark and Sweep) 알고리즘
console.log('\n--- 표시하고 쓸기 알고리즘 ---');

/**
 * 현대 JavaScript 엔진에서 주로 사용하는 가비지 컬렉션 알고리즘입니다.
 * "루트"(전역 객체)에서 시작하여 접근 가능한 모든 객체를 "표시"하고,
 * 표시되지 않은 객체를 "쓸어내는" 방식으로 작동합니다.
 */

function markAndSweepExample() {
    console.log('표시하고 쓸기 알고리즘 설명:');
    console.log('1. "루트"(예: window 객체)에서 시작하여 참조를 따라가며 접근 가능한 모든 객체를 표시');
    console.log('2. 표시되지 않은 객체는 접근할 수 없다고 간주하고 해제');
    console.log('3. 순환 참조가 있어도 루트에서 접근할 수 없으면 해제됨');
    
    // 간단한 시뮬레이션
    let accessible = { name: '접근 가능한 객체' };
    
    function createInaccessibleObject() {
        let inaccessible = { name: '접근 불가능한 객체' };
        console.log('로컬 객체 생성됨:', inaccessible.name);
        // 함수 종료 시 inaccessible은 더 이상 접근할 수 없게 됨
    }
    
    createInaccessibleObject();
    console.log('접근 가능한 객체는 유지됨:', accessible.name);
    console.log('접근 불가능한 객체는 가비지 컬렉션 대상이 됨');
}

markAndSweepExample();

// 4. 세대별 가비지 컬렉션(Generational Garbage Collection)
console.log('\n--- 세대별 가비지 컬렉션 ---');

/**
 * 많은 현대 JavaScript 엔진(V8 등)은 세대별 가비지 컬렉션을 사용합니다.
 * 객체를 "새로운" 객체와 "오래된" 객체로 구분하여 처리합니다.
 * - 새로운 객체(Young Generation): 자주 생성되고 빨리 소멸하는 경향이 있어 자주 검사
 * - 오래된 객체(Old Generation): 오래 살아남은 객체들로, 덜 자주 검사
 */

console.log('세대별 가비지 컬렉션 특징:');
console.log('1. 새로운 객체는 "새로운 세대" 영역에 할당됨');
console.log('2. 여러 번의 가비지 컬렉션 주기 동안 살아남은 객체는 "오래된 세대"로 승격됨');
console.log('3. 새로운 세대는 자주 검사하고, 오래된 세대는 덜 자주 검사하여 효율성 향상');

// 5. 가비지 컬렉션 최적화 팁
console.log('\n--- 가비지 컬렉션 최적화 팁 ---');

// 불필요한 객체 참조 제거하기
function removeReferences() {
    let data = {
        largeArray: new Array(10000).fill('데이터'),
        processingComplete: false
    };
    
    // 데이터 처리 중...
    console.log('대용량 데이터 처리 중...');
    
    // 처리 완료 후, 더 이상 필요없는 대용량 데이터는 참조 제거
    data.largeArray = null;
    data.processingComplete = true;
    
    console.log('데이터 처리 완료, 불필요한 참조 제거됨');
}

removeReferences();

// 클로저 사용 시 주의하기
function closureExample() {
    let heavyData = new Array(1000).fill('무거운 데이터');
    
    let lightFunction = function() {
        // 직접 heavyData를 사용하지 않음
        return '가벼운 기능';
    };
    
    let heavyFunction = function() {
        // heavyData를 클로저로 참조
        return '무거운 기능: ' + heavyData.length;
    };
    
    console.log('heavyFunction은 클로저로 인해 heavyData를 계속 참조함');
    console.log('lightFunction은 heavyData를 참조하지 않음');
    
    return { light: lightFunction, heavy: heavyFunction };
}

let functions = closureExample();
console.log(functions.light()); // heavyData를 참조하지 않음
console.log(functions.heavy()); // heavyData를 여전히 참조 중

/**
 * 가비지 컬렉션 실전 팁:
 * 
 * 1. 불필요한 참조는 명시적으로 null로 설정하여 제거
 * 2. 객체 풀링(Object Pooling) 고려하기 - 객체를 재사용하여 가비지 컬렉션 부하 감소
 * 3. 클로저는 필요한 값만 참조하도록 설계
 * 4. 대용량 데이터 구조 작업 시 청크(chunk) 단위로 처리하여 메모리 사용량 제한
 * 5. WeakMap과 WeakSet 활용 - 강한 참조 없이 객체에 데이터 연결 가능
 */ 