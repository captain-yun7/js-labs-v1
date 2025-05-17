// function-expressions.js - 함수 표현식과 화살표 함수

/**
 * 함수 표현식과 화살표 함수
 * 
 * JavaScript에서는 함수 선언문 외에도 함수 표현식과 화살표 함수를 사용하여
 * 함수를 정의할 수 있습니다. 이들은 각각 고유한 특징과 활용 방법이 있습니다.
 */

console.log('==== 함수 표현식과 화살표 함수 ====');

// 1. 함수 표현식 (Function Expression)
console.log('\n--- 함수 표현식 ---');

// 함수 표현식 기본 형태
const greet = function() {
    console.log('안녕하세요!');
};

// 함수 표현식 호출
greet(); // "안녕하세요!" 출력

// 매개변수가 있는 함수 표현식
const greetPerson = function(name) {
    console.log(`안녕하세요, ${name}님!`);
};

greetPerson('홍길동'); // "안녕하세요, 홍길동님!" 출력

// 익명 함수 표현식 (변수에 할당)
const add = function(a, b) {
    return a + b;
};

console.log(`3 + 5 = ${add(3, 5)}`); // "3 + 5 = 8" 출력

// 기명 함수 표현식 (함수에 이름이 있음)
const factorial = function calcFactorial(n) {
    if (n <= 1) return 1;
    return n * calcFactorial(n - 1); // 내부에서는 함수 이름으로 재귀 호출 가능
};

console.log(`5! = ${factorial(5)}`); // "5! = 120" 출력
// calcFactorial(5); // 오류 발생! 함수 이름은 외부에서 접근 불가

// 2. 함수 표현식 vs 함수 선언문
console.log('\n--- 함수 표현식 vs 함수 선언문 ---');

// 호이스팅 차이
// sayHello(); // 오류 발생! 함수 표현식은 호이스팅되지 않음
const sayHello = function() {
    console.log('안녕하세요!');
};
sayHello(); // 정상 작동

// 함수 선언문은 호이스팅됨
sayGoodbye(); // 정상 작동 (호이스팅됨)
function sayGoodbye() {
    console.log('안녕히 가세요!');
}

// 3. 화살표 함수 (Arrow Function)
console.log('\n--- 화살표 함수 ---');

// 기본 화살표 함수
const sayHi = () => {
    console.log('안녕하세요!');
};
sayHi(); // "안녕하세요!" 출력

// 매개변수가 하나인 경우 괄호 생략 가능
const greetUser = name => {
    console.log(`안녕하세요, ${name}님!`);
};
greetUser('김철수'); // "안녕하세요, 김철수님!" 출력

// 본문이 표현식 하나인 경우 중괄호와 return 생략 가능
const multiply = (a, b) => a * b;
console.log(`4 × 6 = ${multiply(4, 6)}`); // "4 × 6 = 24" 출력

// 객체 리터럴 반환 시 괄호로 감싸야 함
const createPerson = (name, age) => ({ name, age });
const person = createPerson('이영희', 30);
console.log('생성된 사용자:', person); // "생성된 사용자: { name: '이영희', age: 30 }" 출력

// 다양한 형태의 화살표 함수
const empty = () => console.log('빈 함수');
const identity = x => x; // 매개변수를 그대로 반환
const isEven = num => num % 2 === 0; // 짝수 여부 확인
const addNumbers = (a, b, c) => a + b + c; // 여러 매개변수

console.log('identity(5):', identity(5)); // "identity(5): 5" 출력
console.log('10은 짝수인가?', isEven(10)); // "10은 짝수인가? true" 출력
console.log('1 + 2 + 3 =', addNumbers(1, 2, 3)); // "1 + 2 + 3 = 6" 출력

// 4. 화살표 함수의 this 바인딩
console.log('\n--- 화살표 함수의 this 바인딩 ---');

// 일반 함수에서의 this
const user = {
    name: '홍길동',
    age: 25,
    sayNameFunction: function() {
        console.log(`내 이름은 ${this.name}입니다.`);
    },
    sayNameArrow: () => {
        console.log(`내 이름은 ${this.name}입니다.`); // 여기서 this는 전역 객체 또는 undefined
    },
    sayNameDelayed: function() {
        setTimeout(function() {
            console.log(`일반 함수: 내 이름은 ${this.name}입니다.`); // this가 window 또는 global
        }, 100);
        
        setTimeout(() => {
            console.log(`화살표 함수: 내 이름은 ${this.name}입니다.`); // this가 user 객체
        }, 200);
    }
};

user.sayNameFunction(); // "내 이름은 홍길동입니다." 출력
user.sayNameArrow(); // "내 이름은 undefined입니다." 출력 (브라우저에서)
user.sayNameDelayed(); // 타이머 완료 후 출력

// 5. 함수 표현식과 화살표 함수의 활용
console.log('\n--- 함수 표현식과 화살표 함수의 활용 ---');

// 즉시 실행 함수 표현식 (IIFE)
(function() {
    const message = '즉시 실행 함수 내부 메시지';
    console.log(message);
})(); // 정의와 동시에 실행

// 콜백 함수로 사용
const numbers = [1, 2, 3, 4, 5];

// 함수 표현식을 콜백으로 사용
const doubled = numbers.map(function(number) {
    return number * 2;
});
console.log('함수 표현식으로 2배:', doubled); // [2, 4, 6, 8, 10] 출력

// 화살표 함수를 콜백으로 사용 (더 간결함)
const tripled = numbers.map(number => number * 3);
console.log('화살표 함수로 3배:', tripled); // [3, 6, 9, 12, 15] 출력

// 화살표 함수를 사용한 필터링과 변환
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('짝수만 필터링:', evenNumbers); // [2, 4] 출력

const numberObjects = numbers.map(num => ({
    value: num,
    square: num * num,
    isEven: num % 2 === 0
}));
console.log('객체 배열로 변환:', numberObjects);

/**
 * 함수 표현식과 화살표 함수 요약:
 * 
 * 1. 함수 표현식:
 *    - 변수에 할당되는 함수
 *    - 호이스팅되지 않음 (변수 선언 후에만 사용 가능)
 *    - 익명 또는 기명(이름이 있는) 함수 표현식 가능
 *    - 기명 함수의 이름은 내부에서만 접근 가능 (주로 재귀에 활용)
 * 
 * 2. 화살표 함수:
 *    - ES6에서 도입된 간결한 함수 구문
 *    - 간단한 경우 괄호, 중괄호, return 키워드 생략 가능
 *    - 자체 this를 가지지 않고 상위 스코프의 this를 사용
 *    - arguments 객체를 가지지 않음
 *    - 생성자 함수로 사용할 수 없음 (new 연산자와 함께 사용 불가)
 * 
 * 3. 활용:
 *    - 함수 표현식: 함수를 변수에 할당하거나 다른 함수에 인자로 전달할 때 유용
 *    - 화살표 함수: 콜백 함수, 짧은 함수, 메서드 체이닝에 특히 유용
 */ 