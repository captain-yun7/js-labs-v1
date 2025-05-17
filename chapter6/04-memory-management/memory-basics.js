// memory-basics.js - JavaScript 메모리 모델 기본

/**
 * JavaScript 메모리 모델의 기본 개념
 * 
 * JavaScript는 자동 메모리 관리를 제공하는 고수준 언어로,
 * 값이 선언되면 메모리가 자동으로 할당되고 더 이상 필요하지 않을 때 해제됩니다.
 */

console.log('==== JavaScript 메모리 모델 기본 개념 ====');

// 1. 메모리 할당 기본
console.log('\n--- 메모리 할당 기본 ---');

// 원시 타입(Primitive types)은 값을 직접 저장하고, 스택 메모리에 할당됩니다.
let number = 42;        // 숫자: 일반적으로 8바이트
let string = '안녕하세요'; // 문자열: 문자 수에 따라 크기가 달라짐
let boolean = true;     // 불리언: 1바이트
let nullValue = null;   // null: 메모리를 차지하지 않음(개념적으로)
let undefinedValue;     // undefined: 메모리를 차지하지 않음(개념적으로)

console.log('원시 타입 값들:', number, string, boolean, nullValue, undefinedValue);

// 참조 타입(Reference types)은 값에 대한 참조를 저장하고, 힙 메모리에 할당됩니다.
let array = [1, 2, 3, 4, 5];     // 배열: 요소 수와 내용에 따라 크기가 달라짐
let object = { name: '홍길동', age: 30 }; // 객체: 속성 수와 내용에 따라 크기가 달라짐
let func = function() { return 'Hello'; }; // 함수: 코드 내용에 따라 크기가 달라짐

console.log('참조 타입 값들:', array, object, func());

// 2. 값과 참조에 의한 전달
console.log('\n--- 값과 참조에 의한 전달 ---');

// 값에 의한 전달(원시 타입)
let a = 10;
let b = a; // a의 값이 b로 복사됨
a = 20;    // a의 값만 변경됨

console.log('a =', a); // 20
console.log('b =', b); // 10 (a가 변경되어도 b는 영향 받지 않음)

// 참조에 의한 전달(참조 타입)
let obj1 = { value: 10 };
let obj2 = obj1; // obj1의 참조가 obj2로 복사됨
obj1.value = 20; // obj1이 참조하는 객체의 속성 변경

console.log('obj1.value =', obj1.value); // 20
console.log('obj2.value =', obj2.value); // 20 (같은 객체를 참조하므로 obj1의 변경이 obj2에도 영향을 미침)

// 3. 메모리 사용 패턴
console.log('\n--- 메모리 사용 패턴 ---');

// 불필요한 전역 변수 피하기
function scopeExample() {
    localVar = '전역 유출'; // 'var', 'let', 'const' 키워드가 없으면 전역 변수가 됨
    let properLocalVar = '지역 변수'; // 올바른 지역 변수 선언
    
    console.log('함수 내 지역 변수:', properLocalVar);
    return localVar;
}

let result = scopeExample();
console.log('의도치 않게 전역화된 변수:', result);
console.log('전역 객체에 추가된 변수:', localVar); // 전역 객체에 속성으로 추가됨

// 4. 메모리 해제 패턴
console.log('\n--- 메모리 해제 패턴 ---');

// 로컬 변수는 스코프를 벗어나면 자동으로 가비지 컬렉션 대상이 됨
function createTemporaryData() {
    let tempArray = new Array(1000).fill('임시 데이터');
    console.log('임시 배열 생성됨 (길이: ' + tempArray.length + ')');
    // 함수가 종료되면 tempArray는 가비지 컬렉션 대상이 됨
}

createTemporaryData();
console.log('함수 종료 후 - tempArray는 더 이상 접근할 수 없고 가비지 컬렉션 대상이 됨');

// 큰 객체에 대한 참조를 명시적으로 제거
let largeObject = new Array(10000).fill({ data: '큰 객체 데이터' });
console.log('큰 객체 생성됨 (길이: ' + largeObject.length + ')');

// 더 이상 필요하지 않을 때 참조 제거
largeObject = null;
console.log('큰 객체에 대한 참조가 제거됨:', largeObject);

// 5. 순환 참조 예제
console.log('\n--- 순환 참조 예제 ---');

let objectA = { name: 'Object A' };
let objectB = { name: 'Object B' };

// 순환 참조 생성
objectA.ref = objectB;
objectB.ref = objectA;

console.log('순환 참조 생성됨:');
console.log('objectA.ref.name:', objectA.ref.name);
console.log('objectB.ref.name:', objectB.ref.name);

// 순환 참조를 제거하는 방법
objectA.ref = null;
objectB.ref = null;

console.log('순환 참조 제거됨');
console.log('objectA.ref:', objectA.ref);
console.log('objectB.ref:', objectB.ref);

// 6. 메모리 사용량 확인 (Node.js 환경에서만 실행 가능)
console.log('\n--- 메모리 사용량 확인 ---');
console.log('참고: 브라우저에서는 performance.memory API로 일부 메모리 정보를 확인할 수 있습니다.');

// 브라우저에서는 아래와 같이 확인 가능 (크롬 브라우저 기준)
// console.log('브라우저 메모리 정보:', performance.memory);

/**
 * JavaScript 메모리 모델 요약:
 * 
 * 1. 스택 메모리: 함수 호출과 지역 변수를 저장 (주로 원시 타입)
 * 2. 힙 메모리: 객체와 함수 등의 참조 타입 값을 저장
 * 3. 메모리 생명 주기: 할당 -> 사용 -> 해제
 * 4. 자동 가비지 컬렉션: 더 이상 참조되지 않는 메모리는 자동으로 해제됨
 * 5. 효율적인 메모리 사용 패턴:
 *    - 필요 없는 참조 제거하기
 *    - 불필요한 전역 변수 피하기
 *    - 순환 참조 피하기
 */ 