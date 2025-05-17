// array-methods.js - 배열 메서드 활용법

/**
 * 배열 메서드(Array Methods)
 * 
 * JavaScript 배열에는 데이터를 조작하고 처리하는 다양한 내장 메서드가 있습니다.
 * 이 파일에서는 가장 자주 사용되는 배열 메서드들을 살펴봅니다.
 */

console.log('==== 배열 메서드 ====');

// 1. 요소 추가/제거 메서드
console.log('\n--- 요소 추가/제거 ---');

let fruits = ['사과', '바나나', '오렌지'];
console.log('원본 배열:', fruits);

// splice() - 배열의 요소를 추가, 제거 또는 교체
// splice(시작 인덱스, 삭제할 요소 수, 추가할 요소...)
fruits.splice(1, 1, '딸기', '포도'); // 인덱스 1부터 1개 요소 제거 후 '딸기'와 '포도' 추가
console.log('splice() 후:', fruits); // ['사과', '딸기', '포도', '오렌지']

// 요소 삭제만 하는 경우
fruits.splice(0, 1); // 첫 번째 요소 제거
console.log('첫 번째 요소 제거 후:', fruits); // ['딸기', '포도', '오렌지']

// 요소 추가만 하는 경우
fruits.splice(1, 0, '수박'); // 인덱스 1 위치에 '수박' 추가 (삭제 없음)
console.log('요소 추가 후:', fruits); // ['딸기', '수박', '포도', '오렌지']

// slice() - 배열의 일부를 추출하여 새 배열 반환 (원본 변경 없음)
// slice(시작 인덱스, 끝 인덱스) - 끝 인덱스는 포함되지 않음
const sliced = fruits.slice(1, 3);
console.log('fruits.slice(1, 3):', sliced); // ['수박', '포도']
console.log('원본 배열 (변경 없음):', fruits); // ['딸기', '수박', '포도', '오렌지']

// 매개변수 없이 사용하면 전체 배열의 복사본을 생성
const fruitsCopy = fruits.slice();
console.log('전체 배열 복사:', fruitsCopy); // ['딸기', '수박', '포도', '오렌지']

// 2. 배열 결합 및 분할 메서드
console.log('\n--- 배열 결합 및 분할 ---');

const veggies = ['당근', '브로콜리'];
const meats = ['소고기', '닭고기'];

// concat() - 배열을 결합하여 새 배열 반환 (원본 변경 없음)
const food = veggies.concat(meats, '밥', ['김치', '된장찌개']);
console.log('concat() 결과:', food);
// ['당근', '브로콜리', '소고기', '닭고기', '밥', '김치', '된장찌개']

// join() - 배열 요소를 문자열로 결합
console.log('join() 기본:', food.join()); // "당근,브로콜리,소고기,닭고기,밥,김치,된장찌개"
console.log('join(", "):', food.join(', ')); // "당근, 브로콜리, 소고기, 닭고기, 밥, 김치, 된장찌개"

// split() - 문자열을 배열로 분할 (String 메서드)
const foodStr = '감자,고구마,옥수수';
const foodArray = foodStr.split(',');
console.log('split() 결과:', foodArray); // ['감자', '고구마', '옥수수']

// 3. 배열 탐색 메서드
console.log('\n--- 배열 탐색 ---');

const numbers = [10, 20, 30, 40, 20, 50];
console.log('탐색할 배열:', numbers);

// indexOf() - 요소의 첫 번째 인덱스 반환 (없으면 -1)
console.log('20의 첫 번째 인덱스:', numbers.indexOf(20)); // 1
console.log('100의 인덱스 (없음):', numbers.indexOf(100)); // -1

// lastIndexOf() - 요소의 마지막 인덱스 반환 (없으면 -1)
console.log('20의 마지막 인덱스:', numbers.lastIndexOf(20)); // 4

// includes() - 요소 포함 여부 확인 (true/false)
console.log('30 포함 여부:', numbers.includes(30)); // true
console.log('100 포함 여부:', numbers.includes(100)); // false

// find() - 조건을 만족하는 첫 번째 요소 반환 (없으면 undefined)
const firstOver25 = numbers.find(num => num > 25);
console.log('25보다 큰 첫 번째 요소:', firstOver25); // 30

// findIndex() - 조건을 만족하는 첫 번째 요소의 인덱스 반환 (없으면 -1)
const firstOver25Index = numbers.findIndex(num => num > 25);
console.log('25보다 큰 첫 번째 요소의 인덱스:', firstOver25Index); // 2

// 4. 배열 변형 메서드
console.log('\n--- 배열 변형 ---');

// sort() - 배열 요소 정렬 (원본 변경)
const fruits2 = ['바나나', '사과', '체리', '딸기'];
console.log('정렬 전:', fruits2);
fruits2.sort();
console.log('정렬 후:', fruits2); // ['바나나', '사과', '딸기', '체리'] (알파벳 순)

// 숫자 정렬은 기본적으로 문자열로 변환되어 정렬되므로 비교 함수 필요
const nums = [40, 100, 1, 5, 25, 10];
console.log('숫자 정렬 전:', nums);

// 잘못된 숫자 정렬 (문자열로 취급)
nums.sort();
console.log('잘못된 숫자 정렬:', nums); // [1, 10, 100, 25, 40, 5]

// 올바른 숫자 정렬 (비교 함수 사용)
nums.sort((a, b) => a - b); // 오름차순
console.log('올바른 숫자 정렬 (오름차순):', nums); // [1, 5, 10, 25, 40, 100]

nums.sort((a, b) => b - a); // 내림차순
console.log('내림차순 정렬:', nums); // [100, 40, 25, 10, 5, 1]

// reverse() - 배열 요소 순서 뒤집기 (원본 변경)
const letters = ['a', 'b', 'c', 'd'];
console.log('뒤집기 전:', letters);
letters.reverse();
console.log('뒤집기 후:', letters); // ['d', 'c', 'b', 'a']

// 5. 기타 유용한 메서드
console.log('\n--- 기타 유용한 메서드 ---');

// fill() - 배열의 요소를 특정 값으로 채우기
const filledArray = new Array(5).fill(0);
console.log('5개의 0으로 채운 배열:', filledArray); // [0, 0, 0, 0, 0]

// 특정 범위만 채우기
const numbers2 = [1, 2, 3, 4, 5];
numbers2.fill(0, 2, 4); // 인덱스 2부터 4 미만까지 0으로 채우기
console.log('fill(0, 2, 4) 후:', numbers2); // [1, 2, 0, 0, 5]

// flat() - 중첩 배열을 평탄화
const nestedArray = [1, 2, [3, 4, [5, 6]]];
console.log('flat() 기본 (1단계):', nestedArray.flat()); // [1, 2, 3, 4, [5, 6]]
console.log('flat(2) (2단계):', nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log('flat(Infinity) (모든 중첩):', nestedArray.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// Array.from() - 유사 배열 객체나 이터러블을 배열로 변환
console.log('문자열에서 배열 생성:', Array.from('Hello')); // ['H', 'e', 'l', 'l', 'o']

// 매핑 함수 적용
console.log('매핑 함수 적용:', Array.from([1, 2, 3], x => x * 2)); // [2, 4, 6]

// Array.of() - 인자들로 새 배열 생성
console.log('Array.of():', Array.of(1, 'a', true, null)); // [1, 'a', true, null]

/**
 * 배열 메서드 요약:
 * 
 * 1. 요소 추가/제거:
 *    - push(), pop(), shift(), unshift(): 배열의 시작/끝에서 요소 추가/제거
 *    - splice(): 배열 중간에 요소 추가/제거/교체
 *    - slice(): 배열의 일부분 추출 (새 배열 반환)
 * 
 * 2. 배열 결합/분할:
 *    - concat(): 여러 배열 결합 (새 배열 반환)
 *    - join(): 배열 요소를 문자열로 결합
 * 
 * 3. 배열 탐색:
 *    - indexOf(), lastIndexOf(): 요소의 인덱스 찾기
 *    - includes(): 요소 포함 여부 확인
 *    - find(), findIndex(): 조건에 맞는 요소/인덱스 찾기
 * 
 * 4. 배열 변형:
 *    - sort(): 배열 정렬
 *    - reverse(): 배열 순서 뒤집기
 *    - fill(): 배열을 특정 값으로 채우기
 *    - flat(): 중첩 배열 평탄화
 */ 