// function-basics.js - 함수의 기본 개념과 선언 방법

/**
 * 함수 기본 개념
 * 
 * 함수는 특정 작업을 수행하는 코드 블록으로, 필요할 때마다 호출하여 재사용할 수 있습니다.
 * 함수는 JavaScript에서 가장 기본적인 구성 요소 중 하나입니다.
 */

console.log('==== 함수의 기본 개념 ====');

// 1. 함수 선언문 (Function Declaration)
console.log('\n--- 함수 선언문 ---');

// 기본적인 함수 선언
function greet() {
    console.log('안녕하세요!');
}

// 함수 호출
greet(); // "안녕하세요!" 출력

// 매개변수(parameters)가 있는 함수
function greetPerson(name) {
    console.log(`안녕하세요, ${name}님!`);
}

// 인수(arguments)를 전달하여 함수 호출
greetPerson('홍길동'); // "안녕하세요, 홍길동님!" 출력
greetPerson('김철수'); // "안녕하세요, 김철수님!" 출력

// 여러 매개변수를 가진 함수
function add(a, b) {
    console.log(`${a} + ${b} = ${a + b}`);
}

add(5, 3); // "5 + 3 = 8" 출력
add(10, 20); // "10 + 20 = 30" 출력

// 2. 함수 호이스팅 (Function Hoisting)
console.log('\n--- 함수 호이스팅 ---');

// 함수 선언 전에 호출해도 정상 작동
sayHello(); // "안녕하세요!" 출력

// 함수 선언은 호이스팅됨 (코드 최상단으로 끌어올려짐)
function sayHello() {
    console.log('안녕하세요!');
}

// 참고: 함수 표현식은 호이스팅되지 않음
// sayGoodbye(); // 오류 발생!

// 3. 함수와 매개변수
console.log('\n--- 함수와 매개변수 ---');

// 기본값이 있는 매개변수
function greetWithDefault(name = '방문자') {
    console.log(`안녕하세요, ${name}님!`);
}

greetWithDefault(); // "안녕하세요, 방문자님!" 출력
greetWithDefault('이영희'); // "안녕하세요, 이영희님!" 출력

// 매개변수보다 많은 인수 전달
function displayInfo(name, age) {
    console.log(`이름: ${name}, 나이: ${age}`);
}

displayInfo('박지성', 40, '축구선수'); // "이름: 박지성, 나이: 40" 출력 (세 번째 인수는 무시됨)

// 매개변수보다 적은 인수 전달
displayInfo('김연아'); // "이름: 김연아, 나이: undefined" 출력

// 4. 반환값 (Return Values)
console.log('\n--- 반환값 ---');

// 값을 반환하는 함수
function multiply(a, b) {
    return a * b; // 결과 반환
}

const result = multiply(4, 5);
console.log(`4 × 5 = ${result}`); // "4 × 5 = 20" 출력

// 여러 값 반환 (객체 사용)
function getPersonInfo(name, age) {
    return {
        name: name,
        age: age,
        isAdult: age >= 18
    };
}

const person = getPersonInfo('김민수', 25);
console.log('사용자 정보:', person);
console.log(`이름: ${person.name}, 성인 여부: ${person.isAdult ? '성인' : '미성년자'}`);

// 조건에 따른 반환
function getGrade(score) {
    if (score >= 90) {
        return 'A';
    } else if (score >= 80) {
        return 'B';
    } else if (score >= 70) {
        return 'C';
    } else if (score >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

console.log(`점수 85점: ${getGrade(85)}등급`); // "점수 85점: B등급" 출력
console.log(`점수 92점: ${getGrade(92)}등급`); // "점수 92점: A등급" 출력
console.log(`점수 55점: ${getGrade(55)}등급`); // "점수 55점: F등급" 출력

// 5. return 문이 없는 함수
console.log('\n--- return 문이 없는 함수 ---');

function showMessage(message) {
    console.log(`메시지: ${message}`);
    // return 문이 없으면 undefined 반환
}

const returnValue = showMessage('안녕하세요!');
console.log('반환값:', returnValue); // "반환값: undefined" 출력

// 6. 함수 스코프 (Function Scope)
console.log('\n--- 함수 스코프 ---');

// 전역 변수
let globalVar = '전역 변수';

function scopeTest() {
    // 지역 변수
    let localVar = '지역 변수';
    
    console.log('함수 내부에서 전역 변수 접근:', globalVar);
    console.log('함수 내부에서 지역 변수 접근:', localVar);
}

scopeTest();
console.log('함수 외부에서 전역 변수 접근:', globalVar);
// console.log('함수 외부에서 지역 변수 접근:', localVar); // 오류 발생! 지역 변수는 함수 외부에서 접근 불가

// 같은 이름의 지역 변수와 전역 변수
let message = '전역 메시지';

function showLocalMessage() {
    let message = '지역 메시지'; // 전역 변수와 같은 이름의 지역 변수
    console.log('함수 내부 message:', message); // "지역 메시지" 출력 (지역 변수가 우선)
}

showLocalMessage();
console.log('함수 외부 message:', message); // "전역 메시지" 출력

/**
 * 함수 기본 요약:
 * 
 * 1. 함수 선언문은 function 키워드로 시작하며, 이름, 매개변수 목록, 본문으로 구성됩니다.
 * 2. 함수 선언은 호이스팅되어 코드 어디에서든 호출할 수 있습니다.
 * 3. 매개변수(parameters)는 함수 정의 시 지정하며, 인수(arguments)는 함수 호출 시 전달합니다.
 * 4. 함수는 return 문을 사용하여 값을 반환할 수 있으며, return이 없으면 undefined를 반환합니다.
 * 5. 함수 내부에서 선언된 변수는 지역 변수로, 함수 외부에서 접근할 수 없습니다.
 * 6. 함수는 코드 재사용, 모듈화, 유지보수 용이성 등의 장점을 제공합니다.
 */ 