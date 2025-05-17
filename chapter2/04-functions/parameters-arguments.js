// parameters-arguments.js - 매개변수와 인수 다루기

/**
 * 매개변수(Parameters)와 인수(Arguments)
 * 
 * 매개변수는 함수 정의 시 선언하는 변수이고,
 * 인수는 함수 호출 시 전달하는 실제 값입니다.
 * 이 파일에서는 JavaScript에서의 매개변수와 인수 다루는 방법을 알아봅니다.
 */

console.log('==== 매개변수와 인수 다루기 ====');

// 1. 기본 매개변수 (Default Parameters)
console.log('\n--- 기본 매개변수 ---');

// ES6 이전의 기본값 설정 방법
function greetOld(name) {
    name = name || '방문자'; // name이 falsy(undefined, null, '', 0 등)일 경우 기본값 사용
    console.log(`안녕하세요, ${name}님!`);
}

greetOld(); // "안녕하세요, 방문자님!" 출력
greetOld('홍길동'); // "안녕하세요, 홍길동님!" 출력
greetOld(''); // "안녕하세요, 방문자님!" 출력 (빈 문자열도 기본값 사용)

// ES6의 기본 매개변수
function greet(name = '방문자') {
    console.log(`안녕하세요, ${name}님!`);
}

greet(); // "안녕하세요, 방문자님!" 출력
greet('홍길동'); // "안녕하세요, 홍길동님!" 출력
greet(''); // "안녕하세요, 님!" 출력 (빈 문자열이 값으로 전달됨)

// 여러 매개변수와 기본값
function createUser(name = '익명', age = 20, isAdmin = false) {
    return {
        name,
        age,
        isAdmin,
        createdAt: new Date()
    };
}

console.log('기본값으로 생성:', createUser());
console.log('일부 인수만 전달:', createUser('김철수'));
console.log('모든 인수 전달:', createUser('이영희', 25, true));

// 표현식을 기본값으로 사용
function getRandomGreeting(name = '방문자', greeting = `안녕하세요 ${name}님, 현재 시각은 ${new Date().toLocaleTimeString()}입니다`) {
    console.log(greeting);
}

getRandomGreeting(); // 기본 인사말 출력
getRandomGreeting('홍길동'); // 홍길동을 이름으로 사용한 기본 인사말 출력
getRandomGreeting('김철수', '반갑습니다!'); // 사용자 정의 인사말 출력

// 2. 나머지 매개변수 (Rest Parameters)
console.log('\n--- 나머지 매개변수 ---');

// ES6 이전: arguments 객체 사용
function sumOld() {
    let total = 0;
    // arguments는 배열과 유사하지만 배열이 아님
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log('sumOld(1, 2, 3, 4):', sumOld(1, 2, 3, 4)); // 10 출력

// ES6: 나머지 매개변수 사용 (실제 배열임)
function sum(...numbers) {
    // numbers는 배열이므로 배열 메서드 사용 가능
    return numbers.reduce((total, num) => total + num, 0);
}

console.log('sum(1, 2, 3, 4):', sum(1, 2, 3, 4)); // 10 출력
console.log('sum():', sum()); // 0 출력 (빈 배열의 reduce)

// 일반 매개변수와 나머지 매개변수 함께 사용
function printUserInfo(name, age, ...hobbies) {
    console.log(`이름: ${name}`);
    console.log(`나이: ${age}`);
    
    if (hobbies.length > 0) {
        console.log(`취미: ${hobbies.join(', ')}`);
    } else {
        console.log('취미: 없음');
    }
}

printUserInfo('홍길동', 30, '독서', '여행', '요리');
printUserInfo('김철수', 25);

// 3. 전개 구문 (Spread Syntax)
console.log('\n--- 전개 구문 ---');

// 배열을 개별 인수로 전달
const numbers = [1, 2, 3, 4, 5];
console.log('max(...numbers):', Math.max(...numbers)); // 5 출력
console.log('min(...numbers):', Math.min(...numbers)); // 1 출력

// 전개 구문으로 배열 합치기
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log('combined:', combined); // [1, 2, 3, 4, 5, 6] 출력

// 함수에 배열 요소를 개별 인수로 전달
function greetMultiple(greeting, ...names) {
    names.forEach(name => console.log(`${greeting}, ${name}!`));
}

const friendNames = ['홍길동', '김철수', '이영희'];
greetMultiple('안녕하세요', ...friendNames);

// 4. 매개변수 구조 분해 할당 (Parameter Destructuring)
console.log('\n--- 매개변수 구조 분해 할당 ---');

// 객체 구조 분해 할당
function displayUserInfo({ name, age, email = 'unknown' }) {
    console.log(`이름: ${name}`);
    console.log(`나이: ${age}`);
    console.log(`이메일: ${email}`);
}

const user1 = {
    name: '홍길동',
    age: 30,
    email: 'hong@example.com'
};

const user2 = {
    name: '김철수',
    age: 25
    // email 속성 없음
};

displayUserInfo(user1);
displayUserInfo(user2);

// 배열 구조 분해 할당
function getMinMax([min, max]) {
    return { min, max };
}

console.log('getMinMax([10, 90]):', getMinMax([10, 90])); // { min: 10, max: 90 } 출력

// 중첩 구조 분해 할당
function displayCompanyInfo({ name, address: { city, country } }) {
    console.log(`회사명: ${name}`);
    console.log(`위치: ${city}, ${country}`);
}

const company = {
    name: '테크 코리아',
    address: {
        city: '서울',
        country: '대한민국',
        street: '테헤란로'
    }
};

displayCompanyInfo(company);

// 5. arguments 객체
console.log('\n--- arguments 객체 ---');

function showArguments() {
    console.log('arguments 길이:', arguments.length);
    console.log('arguments 내용:', Array.from(arguments));
    
    // arguments를 배열로 변환하여 사용
    const args = Array.from(arguments);
    args.forEach((arg, index) => {
        console.log(`인수 ${index}: ${arg}`);
    });
}

showArguments('a', 'b', 'c');
showArguments(1, 2, 3, 4, 5);

// 화살표 함수에서는 arguments 객체 사용 불가
const arrowFunc = () => {
    // console.log(arguments); // 오류 발생! 화살표 함수는 자체 arguments 객체를 가지지 않음
    console.log('화살표 함수에서는 나머지 매개변수 사용해야 함');
};

// 대신 나머지 매개변수 사용
const arrowFuncWithRest = (...args) => {
    console.log('화살표 함수에서 나머지 매개변수:', args);
};

arrowFuncWithRest(1, 2, 3);

/**
 * 매개변수와 인수 요약:
 * 
 * 1. 기본 매개변수 (Default Parameters):
 *    - ES6부터 함수 정의 시 매개변수에 기본값 지정 가능
 *    - 인수가 undefined인 경우에만 기본값 적용
 * 
 * 2. 나머지 매개변수 (Rest Parameters):
 *    - ES6부터 가변 개수의 인수를 배열로 처리
 *    - `...` 구문 사용 (반드시 마지막 매개변수여야 함)
 *    - arguments 객체보다 사용하기 쉽고 직관적
 * 
 * 3. 전개 구문 (Spread Syntax):
 *    - 배열이나 객체를 개별 요소로 확장
 *    - 함수 호출 시 배열의 요소를 개별 인수로 전달 가능
 * 
 * 4. 매개변수 구조 분해 할당:
 *    - 객체나 배열을 해체하여 개별 변수에 값 할당
 *    - 복잡한 객체에서 필요한 속성만 쉽게 추출 가능
 * 
 * 5. arguments 객체:
 *    - 모든 함수 내부에서 사용 가능한 유사 배열 객체
 *    - 함수에 전달된 모든 인수를 포함
 *    - 화살표 함수에서는 사용 불가
 *    - 현대 JavaScript에서는 나머지 매개변수 사용 권장
 */ 