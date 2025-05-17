// return-values.js - 함수의 반환값 이해하기

/**
 * 함수의 반환값
 * 
 * 함수는 return 문을 사용하여 값을 반환할 수 있습니다.
 * 반환값은 함수 실행의 결과로, 함수 호출 표현식은 이 반환값으로 대체됩니다.
 */

console.log('==== 함수의 반환값 ====');

// 1. 기본 반환값
console.log('\n--- 기본 반환값 ---');

// 값을 반환하는 함수
function add(a, b) {
    return a + b; // 두 인수의 합을 반환
}

const result = add(5, 3);
console.log('add(5, 3)의 결과:', result); // 8 출력

// return 문이 없는 함수
function sayHello(name) {
    console.log(`안녕하세요, ${name}님!`);
    // return 문이 없으면 undefined 반환
}

const greeting = sayHello('홍길동');
console.log('sayHello의 반환값:', greeting); // undefined 출력

// 빈 return 문
function doNothing() {
    return; // undefined 반환
}

console.log('doNothing의 반환값:', doNothing()); // undefined 출력

// 2. 다양한 타입의 반환값
console.log('\n--- 다양한 타입의 반환값 ---');

// 숫자 반환
function calculateArea(radius) {
    return Math.PI * radius * radius;
}

console.log('반지름 5인 원의 넓이:', calculateArea(5).toFixed(2));

// 문자열 반환
function formatName(firstName, lastName) {
    return `${lastName}, ${firstName}`;
}

console.log('이름 포맷팅:', formatName('길동', '홍')); // "홍, 길동" 출력

// 불리언 반환
function isAdult(age) {
    return age >= 18;
}

console.log('15세는 성인인가?', isAdult(15)); // false 출력
console.log('20세는 성인인가?', isAdult(20)); // true 출력

// 객체 반환
function createPerson(name, age) {
    return {
        name: name,
        age: age,
        isAdult: age >= 18,
        greet: function() {
            return `안녕하세요, ${this.name}입니다!`;
        }
    };
}

const person = createPerson('김철수', 25);
console.log('생성된 사람:', person);
console.log('인사말:', person.greet());

// 배열 반환
function getRandomNumbers(count) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * 100));
    }
    return numbers;
}

console.log('랜덤 숫자 5개:', getRandomNumbers(5));

// 함수 반환 (고차 함수)
function multiplier(factor) {
    // 다른 함수를 반환하는 함수
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2); // 인수를 2배하는 함수
const triple = multiplier(3); // 인수를 3배하는 함수

console.log('5의 2배:', double(5)); // 10 출력
console.log('5의 3배:', triple(5)); // 15 출력

// 3. 조건부 반환값
console.log('\n--- 조건부 반환값 ---');

// 조건에 따라 다른 값 반환
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

console.log('점수 85의 등급:', getGrade(85)); // "B" 출력
console.log('점수 45의 등급:', getGrade(45)); // "F" 출력

// 조기 반환 (early return) 패턴
function processUserInput(input) {
    // 입력이 없는 경우 일찍 반환
    if (!input) {
        return '입력이 필요합니다.';
    }
    
    // 입력이 너무 짧은 경우 일찍 반환
    if (input.length < 3) {
        return '입력이 너무 짧습니다.';
    }
    
    // 여기까지 오면 유효한 입력이므로 처리
    return `처리된 입력: ${input.toUpperCase()}`;
}

console.log(processUserInput('')); // "입력이 필요합니다." 출력
console.log(processUserInput('ab')); // "입력이 너무 짧습니다." 출력
console.log(processUserInput('hello')); // "처리된 입력: HELLO" 출력

// 4. 다중 값 반환하기
console.log('\n--- 다중 값 반환하기 ---');

// 객체를 사용한 다중 값 반환
function getMinMax(numbers) {
    let min = numbers[0];
    let max = numbers[0];
    
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) min = numbers[i];
        if (numbers[i] > max) max = numbers[i];
    }
    
    return { min, max };
}

const stats = getMinMax([5, 2, 9, 1, 7, 3]);
console.log('최소값:', stats.min); // 1 출력
console.log('최대값:', stats.max); // 9 출력

// 배열을 사용한 다중 값 반환
function getDimensionsAndArea(radius) {
    const diameter = radius * 2;
    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * radius * radius;
    
    return [diameter, circumference, area];
}

const [diameter, circumference, area] = getDimensionsAndArea(5);
console.log('지름:', diameter);
console.log('둘레:', circumference.toFixed(2));
console.log('넓이:', area.toFixed(2));

// 5. 비동기 작업의 반환값 (콜백 패턴)
console.log('\n--- 비동기 작업의 반환값 (콜백 패턴) ---');

function fetchUserDataAsync(userId, callback) {
    console.log(`사용자 ID ${userId}의 데이터 요청 중...`);
    
    // 비동기 작업 시뮬레이션
    setTimeout(() => {
        const user = {
            id: userId,
            name: '홍길동',
            email: 'hong@example.com'
        };
        
        // 비동기 작업 완료 후 콜백 호출
        callback(user);
    }, 1000);
    
    // 함수는 즉시 반환되지만 결과는 나중에 콜백으로 전달됨
    return '데이터 요청이 시작되었습니다.';
}

const message = fetchUserDataAsync(123, function(user) {
    console.log('사용자 데이터 수신 완료:');
    console.log(user);
});

console.log(message); // "데이터 요청이 시작되었습니다." 출력

// 6. return 문 이후의 코드
console.log('\n--- return 문 이후의 코드 ---');

function calculateDiscount(price, isPremium) {
    if (isPremium) {
        return price * 0.8; // 20% 할인
    }
    
    console.log('일반 고객은 10% 할인이 적용됩니다.');
    return price * 0.9; // 10% 할인
}

console.log('프리미엄 고객 할인가:', calculateDiscount(1000, true)); // 800 출력
console.log('일반 고객 할인가:', calculateDiscount(1000, false)); // 900 출력

function unreachableCode() {
    return '함수 종료';
    
    // 이 아래 코드는 실행되지 않음 (Unreachable code)
    console.log('이 코드는 실행되지 않습니다.');
}

console.log(unreachableCode());

/**
 * 함수 반환값 요약:
 * 
 * 1. 모든 함수는 반환값을 가짐:
 *    - return 문으로 명시적 반환
 *    - return 문이 없거나 빈 return 문이면 undefined 반환
 * 
 * 2. 다양한 타입 반환 가능:
 *    - 숫자, 문자열, 불리언 등 기본 타입
 *    - 객체, 배열 등 참조 타입
 *    - 함수 (고차 함수)
 * 
 * 3. 조건부 반환:
 *    - 조건에 따라 다른 값 반환 가능
 *    - 조기 반환(early return) 패턴으로 코드 가독성 향상
 * 
 * 4. 다중 값 반환:
 *    - 객체나 배열을 사용하여 여러 값 동시 반환
 *    - 구조 분해 할당으로 간편하게 활용 가능
 * 
 * 5. 비동기 작업:
 *    - 콜백, Promise 또는 async/await로 비동기 결과 처리
 * 
 * 6. return 문의 특징:
 *    - 함수 실행을 즉시 종료하고 값 반환
 *    - return 문 이후의 코드는 실행되지 않음
 */ 