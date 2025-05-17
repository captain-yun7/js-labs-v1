// loops.js - 반복문

/**
 * JavaScript의 반복문 (Loops)
 * 
 * 반복문은 코드 블록을 여러 번 실행하는 제어 구조입니다.
 * JavaScript에서는 다음과 같은 반복문을 제공합니다:
 * 1. for 루프
 * 2. while 루프
 * 3. do...while 루프
 * 4. for...of 루프 (ES6+)
 * 5. for...in 루프
 */

console.log('==== 반복문 예제 ====');

// 1. for 루프
// 가장 일반적인 반복문으로, 초기화, 조건, 증감 표현식을 한 줄에 표현합니다.
console.log('\n--- for 루프 ---');

for (let i = 0; i < 5; i++) {
    console.log(`for 루프 반복 ${i}`);
}

// for 루프 변형: 여러 변수 사용
console.log('\n- 여러 변수를 사용한 for 루프 -');
for (let i = 0, j = 10; i < 5; i++, j--) {
    console.log(`i = ${i}, j = ${j}`);
}

// for 루프 변형: 일부 표현식 생략
console.log('\n- 표현식을 생략한 for 루프 -');
let i = 0;
for (; i < 3; i++) {
    console.log(`외부 변수 사용: ${i}`);
}

// 2. while 루프
// 조건이 참인 동안 코드 블록을 실행합니다.
console.log('\n--- while 루프 ---');

let count = 0;
while (count < 5) {
    console.log(`while 루프 반복 ${count}`);
    count++;
}

// 무한 루프와 break 문
console.log('\n- break로 루프 종료 -');
let num = 0;
while (true) {
    console.log(`현재 숫자: ${num}`);
    num++;
    
    if (num >= 3) {
        console.log('break로 루프 종료');
        break;  // 루프 종료
    }
}

// 3. do...while 루프
// 코드 블록을 먼저 실행한 후 조건을 확인합니다. 최소 한 번은 실행됩니다.
console.log('\n--- do...while 루프 ---');

let counter = 0;
do {
    console.log(`do...while 루프 반복 ${counter}`);
    counter++;
} while (counter < 5);

// 조건이 처음부터 거짓이더라도 한 번은 실행됨
let falseCondition = false;
do {
    console.log('이 메시지는 조건이 거짓이더라도 한 번 출력됩니다.');
} while (falseCondition);

// 4. for...of 루프 (ES6+)
// 이터러블(iterable) 객체(배열, 문자열 등)의 각 요소에 대해 반복합니다.
console.log('\n--- for...of 루프 ---');

const fruits = ['사과', '바나나', '오렌지', '포도'];

for (const fruit of fruits) {
    console.log(`과일: ${fruit}`);
}

// 문자열에 대해 반복
const greeting = '안녕하세요';
for (const char of greeting) {
    console.log(`문자: ${char}`);
}

// 5. for...in 루프
// 객체의 열거 가능한 속성에 대해 반복합니다.
console.log('\n--- for...in 루프 ---');

const person = {
    name: '홍길동',
    age: 30,
    job: '개발자'
};

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// 주의: for...in은 배열에도 사용할 수 있지만, 권장되지 않습니다.
const numbers = [10, 20, 30];
for (const index in numbers) {
    console.log(`인덱스 ${index}: 값 ${numbers[index]}`);
}

// 6. continue 문
// 현재 반복을 건너뛰고 다음 반복으로 진행합니다.
console.log('\n--- continue 문 ---');

for (let i = 0; i < 5; i++) {
    if (i === 2) {
        console.log(`${i}는 건너뜁니다.`);
        continue;  // 현재 반복을 건너뛰고 다음 반복으로
    }
    console.log(`현재 i의 값: ${i}`);
}

// 7. 레이블(label)을 사용한 반복문
// 중첩된 반복문에서 특정 반복문을 참조할 수 있습니다.
console.log('\n--- 레이블 사용 ---');

outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            console.log('outer 루프를 종료합니다.');
            break outerLoop;  // 외부 루프까지 종료
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}

// 8. Array 메서드를 이용한 함수형 반복 (ES6+)
console.log('\n--- 함수형 반복 메서드 ---');

const numbers2 = [1, 2, 3, 4, 5];

// forEach: 각 요소에 대해 함수 실행
console.log('- forEach -');
numbers2.forEach((num, index) => {
    console.log(`인덱스 ${index}의 값: ${num}`);
});

// map: 각 요소에 함수를 적용하고 새 배열 반환
console.log('- map -');
const doubled = numbers2.map(num => num * 2);
console.log('2배로 만든 값:', doubled);

// filter: 조건을 만족하는 요소만 새 배열로 반환
console.log('- filter -');
const evenNumbers = numbers2.filter(num => num % 2 === 0);
console.log('짝수만 필터링:', evenNumbers);

// 9. 성능과 최적화
console.log('\n--- 루프 최적화 ---');

const largeArray = new Array(1000000).fill(1);

console.time('일반 for 루프');
let sum1 = 0;
for (let i = 0; i < largeArray.length; i++) {
    sum1 += largeArray[i];
}
console.timeEnd('일반 for 루프');

console.time('캐시된 길이로 for 루프');
let sum2 = 0;
for (let i = 0, len = largeArray.length; i < len; i++) {
    sum2 += largeArray[i];
}
console.timeEnd('캐시된 길이로 for 루프');

console.time('forEach 메서드');
let sum3 = 0;
largeArray.forEach(num => {
    sum3 += num;
});
console.timeEnd('forEach 메서드');

/**
 * 반복문 사용 시 주의사항:
 * 
 * 1. 무한 루프: 종료 조건을 제대로 설정하지 않으면 프로그램이 멈출 수 있습니다.
 * 2. 배열 반복: 배열은 for...of 또는 forEach를 사용하는 것이 좋습니다(for...in은 프로토타입 체인의 속성도 반복).
 * 3. 객체 반복: 객체는 for...in 또는 Object.keys(), Object.values(), Object.entries()를 사용하는 것이 좋습니다.
 * 4. 성능: 대규모 배열에서는 전통적인 for 루프가 가장 빠를 수 있지만, 가독성과 유지보수성도 고려해야 합니다.
 * 5. 함수형 메서드: map, filter, reduce 등은 코드를 더 간결하고 선언적으로 만들어줍니다.
 */ 