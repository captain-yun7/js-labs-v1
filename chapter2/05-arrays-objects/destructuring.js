// destructuring.js - 배열 및 객체 구조 분해 할당

/**
 * 구조 분해 할당(Destructuring Assignment)
 * 
 * 구조 분해 할당은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식입니다.
 * ES6(ES2015)에서 도입되었으며, 코드를 더 간결하게 작성할 수 있게 해줍니다.
 */

console.log('==== 구조 분해 할당 ====');

// 1. 배열 구조 분해 할당
console.log('\n--- 배열 구조 분해 할당 ---');

// 1.1 기본 배열 구조 분해
const numbers = [1, 2, 3, 4, 5];

// 전통적인 방법
const first = numbers[0];
const second = numbers[1];
console.log('전통적인 방법:', first, second); // 1 2

// 구조 분해 할당 사용
const [a, b] = numbers;
console.log('구조 분해 할당:', a, b); // 1 2

// 1.2 특정 요소 건너뛰기
const colors = ['빨강', '파랑', '초록', '노랑', '보라'];

// 첫 번째와 세 번째 요소만 가져오기
const [firstColor, , thirdColor] = colors;
console.log('특정 요소만 가져오기:', firstColor, thirdColor); // '빨강' '초록'

// 1.3 나머지 요소 가져오기 (Rest 패턴)
const [head, ...tail] = numbers;
console.log('첫 번째 요소:', head); // 1
console.log('나머지 요소:', tail); // [2, 3, 4, 5]

// 1.4 기본값 설정
const incomplete = [10, 20];
const [x, y, z = 30] = incomplete;
console.log('기본값 설정:', x, y, z); // 10 20 30

// 1.5 변수 교환하기
let apple = '사과';
let banana = '바나나';
console.log('교환 전:', apple, banana); // '사과' '바나나'

[apple, banana] = [banana, apple];
console.log('교환 후:', apple, banana); // '바나나' '사과'

// 1.6 함수에서 반환된 배열 분해하기
function getCoordinates() {
    return [37.5, 127.0]; // 위도, 경도
}

const [latitude, longitude] = getCoordinates();
console.log('좌표:', latitude, longitude); // 37.5 127.0

// 1.7 중첩 배열 구조 분해
const nestedArray = [1, [2, 3], 4];
const [first1, [second1, third1], fourth1] = nestedArray;
console.log('중첩 배열 구조 분해:', first1, second1, third1, fourth1); // 1 2 3 4

// 2. 객체 구조 분해 할당
console.log('\n--- 객체 구조 분해 할당 ---');

// 2.1 기본 객체 구조 분해
const person = {
    name: '홍길동',
    age: 25,
    gender: '남성',
    job: '개발자'
};

// 전통적인 방법
const personName = person.name;
const personAge = person.age;
console.log('전통적인 방법:', personName, personAge); // '홍길동' 25

// 구조 분해 할당 사용
const { name, age } = person;
console.log('구조 분해 할당:', name, age); // '홍길동' 25

// 2.2 새로운 변수명으로 할당
const { name: userName, age: userAge } = person;
console.log('새 변수명으로 할당:', userName, userAge); // '홍길동' 25

// 2.3 기본값 설정
const incompleteUser = { userName: '김철수' };
const { userName: uName, userAge: uAge = 20 } = incompleteUser;
console.log('기본값 설정:', uName, uAge); // '김철수' 20

// 2.4 나머지 속성 가져오기 (Rest 패턴)
const { name: pName, ...rest } = person;
console.log('이름:', pName); // '홍길동'
console.log('나머지 속성:', rest); // { age: 25, gender: '남성', job: '개발자' }

// 2.5 중첩 객체 구조 분해
const student = {
    name: '이영희',
    age: 20,
    scores: {
        math: 90,
        english: 85,
        science: 95
    }
};

const { name: studentName, scores: { math, english, science } } = student;
console.log('학생 이름:', studentName); // '이영희'
console.log('점수:', math, english, science); // 90 85 95

// 중첩 객체 전체와 내부 속성 동시에 가져오기
const { scores, scores: { math: mathScore } } = student;
console.log('점수 객체:', scores); // { math: 90, english: 85, science: 95 }
console.log('수학 점수:', mathScore); // 90

// 2.6 함수 매개변수의 구조 분해
function printPersonInfo({ name, age, job = '무직' }) {
    console.log(`이름: ${name}, 나이: ${age}, 직업: ${job}`);
}

printPersonInfo(person); // "이름: 홍길동, 나이: 25, 직업: 개발자"
printPersonInfo({ name: '김철수', age: 30 }); // "이름: 김철수, 나이: 30, 직업: 무직"

// 2.7 계산된 속성명 사용
const key = 'age';
const { [key]: personAgeByKey } = person;
console.log('계산된 속성명으로 접근:', personAgeByKey); // 25

// 3. 배열과 객체 구조 분해 혼합 사용
console.log('\n--- 배열과 객체 구조 분해 혼합 ---');

const props = [
    { id: 1, name: '사과', price: 1000 },
    { id: 2, name: '바나나', price: 1500 },
    { id: 3, name: '딸기', price: 2000 }
];

// 첫 번째 항목의 name과 price 속성 가져오기
const [{ name: firstName, price: firstPrice }] = props;
console.log('첫 번째 상품:', firstName, firstPrice); // '사과' 1000

// 반복문에서 구조 분해 사용
console.log('\n반복문에서 구조 분해:');
for (const { id, name, price } of props) {
    console.log(`ID: ${id}, 이름: ${name}, 가격: ${price}`);
}

// 4. 실용적인 활용 예제
console.log('\n--- 실용적인 활용 예제 ---');

// 4.1 API 응답 데이터 처리
const apiResponse = {
    status: 'success',
    code: 200,
    data: {
        user: {
            id: 'user123',
            name: '김사용자',
            email: 'user@example.com'
        },
        posts: [
            { id: 1, title: '첫 번째 포스트' },
            { id: 2, title: '두 번째 포스트' }
        ]
    }
};

// 중첩된 데이터 구조 분해
const { 
    status, 
    data: { 
        user: { id: userId, name: userName2 },
        posts: [firstPost, secondPost]
    } 
} = apiResponse;

console.log('API 상태:', status); // 'success'
console.log('사용자 정보:', userId, userName2); // 'user123' '김사용자'
console.log('첫 번째 포스트:', firstPost.title); // '첫 번째 포스트'

// 4.2 옵션 객체 패턴 (함수 매개변수 정리)
function createElement({ tag = 'div', className = '', text = '', children = [], attributes = {} }) {
    console.log(`<${tag} class="${className}">${text}${children.join('')}</div>`);
    console.log('속성들:', attributes);
}

createElement({
    tag: 'button',
    className: 'btn btn-primary',
    text: '클릭하세요',
    attributes: { disabled: true }
});
// <button class="btn btn-primary">클릭하세요</button>
// 속성들: { disabled: true }

// 4.3 모듈에서 특정 함수나 객체만 가져오기
// 실제 import 구문 (주석 처리)
// import { useState, useEffect } from 'react';
// import { connect, useSelector } from 'react-redux';

// 4.4 객체 리터럴 향상 표기법과 함께 사용
const firstName2 = '길동';
const lastName2 = '홍';
const age2 = 25;

// 변수명을 속성명으로 사용하는 객체 리터럴 향상 표기법
const user2 = { firstName2, lastName2, age2 };
console.log('객체 리터럴 향상 표기법:', user2);
// { firstName2: '길동', lastName2: '홍', age2: 25 }

// 반대로 다시 구조 분해 할당
const { firstName2: fName, lastName2: lName } = user2;
console.log('다시 구조 분해:', fName, lName); // '길동' '홍'

/**
 * 구조 분해 할당 요약:
 * 
 * 1. 배열 구조 분해:
 *    - 기본 구문: const [a, b] = array;
 *    - 요소 건너뛰기: const [a, , c] = array;
 *    - 나머지 요소: const [first, ...rest] = array;
 *    - 기본값 설정: const [a, b = 'default'] = array;
 * 
 * 2. 객체 구조 분해:
 *    - 기본 구문: const { prop1, prop2 } = object;
 *    - 새 변수명 할당: const { prop: newName } = object;
 *    - 기본값 설정: const { prop = 'default' } = object;
 *    - 나머지 속성: const { prop, ...rest } = object;
 *    - 중첩 구조: const { parent: { child } } = object;
 * 
 * 3. 주요 활용:
 *    - 함수 매개변수 정리
 *    - 모듈 가져오기
 *    - API 응답 처리
 *    - 변수 교환
 *    - 반복문에서 사용
 */ 