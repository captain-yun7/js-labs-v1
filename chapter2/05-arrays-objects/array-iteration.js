// array-iteration.js - 배열 반복 및 고차 함수

/**
 * 배열 반복 및 고차 함수
 * 
 * JavaScript 배열에는 요소를 반복하고 처리하는 다양한 고차 함수가 있습니다.
 * 고차 함수는 함수를 인자로 받거나 함수를 반환하는 함수입니다.
 */

console.log('==== 배열 반복 및 고차 함수 ====');

// 1. 기본 반복 방법
console.log('\n--- 기본 반복 방법 ---');

const colors = ['빨강', '파랑', '초록', '노랑'];
console.log('반복할 배열:', colors);

// for 반복문 사용
console.log('\nfor 반복문:');
for (let i = 0; i < colors.length; i++) {
    console.log(`인덱스 ${i}: ${colors[i]}`);
}

// for...of 반복문 사용 (값 접근)
console.log('\nfor...of 반복문:');
for (const color of colors) {
    console.log(color);
}

// for...in 반복문 사용 (인덱스 접근) - 배열에는 권장되지 않음
console.log('\nfor...in 반복문 (권장되지 않음):');
for (const index in colors) {
    console.log(`인덱스 ${index}: ${colors[index]}`);
}

// forEach() 메서드 사용
console.log('\nforEach() 메서드:');
colors.forEach((color, index) => {
    console.log(`인덱스 ${index}: ${color}`);
});

// 2. 변환 메서드 (map, filter, reduce)
console.log('\n--- 변환 메서드 ---');

const numbers = [1, 2, 3, 4, 5];
console.log('원본 배열:', numbers);

// map() - 모든 요소에 함수를 적용하고 새 배열 반환
const doubled = numbers.map(num => num * 2);
console.log('map()으로 2배 증가:', doubled); // [2, 4, 6, 8, 10]

// 객체로 변환
const numbersWithInfo = numbers.map(num => ({
    value: num,
    isEven: num % 2 === 0,
    square: num * num
}));
console.log('map()으로 객체 배열 생성:', numbersWithInfo);
/*
[
  { value: 1, isEven: false, square: 1 },
  { value: 2, isEven: true, square: 4 },
  ...
]
*/

// filter() - 조건을 만족하는 요소만 선택하여 새 배열 반환
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('filter()로 짝수만 선택:', evenNumbers); // [2, 4]

const bigNumbers = numbers.filter(num => num > 3);
console.log('filter()로 3보다 큰 수 선택:', bigNumbers); // [4, 5]

// reduce() - 배열의 모든 요소를 단일 값으로 줄이기
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log('reduce()로 합계 계산:', sum); // 15

// 초기값 없이 reduce 사용 (첫 번째 요소가 초기값)
const product = numbers.reduce((accumulator, currentValue) => accumulator * currentValue);
console.log('reduce()로 모든 수 곱하기:', product); // 120

// reduce로 객체 만들기
const countByEvenOdd = numbers.reduce((acc, num) => {
    const key = num % 2 === 0 ? 'even' : 'odd';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
}, {});
console.log('reduce()로 짝수/홀수 개수 세기:', countByEvenOdd); // { odd: 3, even: 2 }

// 3. 고급 고차 함수 (chaining)
console.log('\n--- 고급 고차 함수 (chaining) ---');

const transactions = [
    { id: 1, type: '입금', amount: 100000 },
    { id: 2, type: '출금', amount: 50000 },
    { id: 3, type: '입금', amount: 200000 },
    { id: 4, type: '출금', amount: 30000 },
    { id: 5, type: '입금', amount: 180000 }
];
console.log('거래 데이터:', transactions);

// 메서드 체이닝 - 여러 배열 메서드를 순차적으로 적용
const totalDeposit = transactions
    .filter(trans => trans.type === '입금') // 입금만 필터링
    .map(trans => trans.amount) // 금액만 추출
    .reduce((total, amount) => total + amount, 0); // 합계 계산

console.log('총 입금액:', totalDeposit); // 480000

// 4. 기타 유용한 반복 메서드
console.log('\n--- 기타 유용한 반복 메서드 ---');

// every() - 모든 요소가 조건을 만족하는지 확인 (true/false)
const allPositive = numbers.every(num => num > 0);
console.log('모든 수가 양수인가?', allPositive); // true

const allEven = numbers.every(num => num % 2 === 0);
console.log('모든 수가 짝수인가?', allEven); // false

// some() - 하나라도 조건을 만족하는지 확인 (true/false)
const hasEven = numbers.some(num => num % 2 === 0);
console.log('짝수가 하나라도 있는가?', hasEven); // true

const hasNegative = numbers.some(num => num < 0);
console.log('음수가 하나라도 있는가?', hasNegative); // false

// findLast() - 조건을 만족하는 마지막 요소 반환 (없으면 undefined)
const mixedNumbers = [2, 4, 6, 3, 8, 1];
const lastEven = mixedNumbers.findLast(num => num % 2 === 0);
console.log('마지막 짝수:', lastEven); // 8

// flatMap() - map() + flat() 조합
const sentences = ['안녕하세요 여러분', '배열 메서드는 재미있어요'];
const words = sentences.flatMap(sentence => sentence.split(' '));
console.log('flatMap()으로 문장을 단어로 분리:', words);
// ['안녕하세요', '여러분', '배열', '메서드는', '재미있어요']

// 5. 실용적인 예제
console.log('\n--- 실용적인 예제 ---');

const students = [
    { name: '김철수', score: 85, subjects: ['수학', '영어', '국어'] },
    { name: '이영희', score: 92, subjects: ['과학', '영어', '수학'] },
    { name: '박민수', score: 78, subjects: ['국어', '사회', '영어'] },
    { name: '정지연', score: 95, subjects: ['수학', '과학', '영어'] },
    { name: '최현우', score: 88, subjects: ['영어', '국어', '사회'] }
];
console.log('학생 데이터:', students);

// 점수 평균 계산
const averageScore = students.reduce((total, student) => total + student.score, 0) / students.length;
console.log('평균 점수:', averageScore.toFixed(2)); // ~87.60

// 90점 이상 학생 이름 목록
const highScorers = students
    .filter(student => student.score >= 90)
    .map(student => student.name);
console.log('90점 이상 학생:', highScorers); // ['이영희', '정지연']

// 특정 과목을 수강하는 학생 수 계산
const subjectCount = students.reduce((counts, student) => {
    student.subjects.forEach(subject => {
        counts[subject] = (counts[subject] || 0) + 1;
    });
    return counts;
}, {});
console.log('과목별 수강 학생 수:', subjectCount);
// { 수학: 3, 영어: 5, 국어: 3, 과학: 2, 사회: 2 }

// 점수를 기준으로 정렬하여 순위 매기기
const rankings = [...students] // 원본 배열 복제
    .sort((a, b) => b.score - a.score) // 점수 내림차순 정렬
    .map((student, index) => ({ // 순위 정보 추가
        rank: index + 1,
        name: student.name,
        score: student.score
    }));
console.log('학생 순위:', rankings);
/*
[
  { rank: 1, name: '정지연', score: 95 },
  { rank: 2, name: '이영희', score: 92 },
  ...
]
*/

/**
 * 배열 반복 및 고차 함수 요약:
 * 
 * 1. 기본 반복 방법:
 *    - for 반복문: 인덱스 기반 반복
 *    - for...of: 값 기반 반복
 *    - forEach(): 콜백 함수를 사용한 반복
 * 
 * 2. 변환 메서드:
 *    - map(): 모든 요소를 변환하여 새 배열 반환
 *    - filter(): 조건을 만족하는 요소만 선택하여 새 배열 반환
 *    - reduce(): 배열의 모든 요소를 단일 값으로 축소
 * 
 * 3. 검사 메서드:
 *    - every(): 모든 요소가 조건을 만족하는지 확인
 *    - some(): 하나라도 조건을 만족하는지 확인
 * 
 * 4. 검색 메서드:
 *    - find(): 조건을 만족하는 첫 번째 요소 반환
 *    - findLast(): 조건을 만족하는 마지막 요소 반환
 * 
 * 5. 고급 기능:
 *    - 메서드 체이닝: 여러 메서드를 연속적으로 호출
 *    - flatMap(): 중첩 배열을 평탄화하는 map 연산
 */ 