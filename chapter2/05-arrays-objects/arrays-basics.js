// arrays-basics.js - 배열의 기본 개념과 생성 방법

/**
 * 배열(Arrays)
 * 
 * 배열은 여러 개의 값을 순서대로 저장하는 데이터 구조입니다.
 * JavaScript 배열은 다양한 타입의 값을 하나의 배열에 저장할 수 있는 특징이 있습니다.
 */

console.log('==== 배열의 기본 개념 ====');

// 1. 배열 생성하기
console.log('\n--- 배열 생성하기 ---');

// 배열 리터럴 사용
const fruits = ['사과', '바나나', '오렌지'];
console.log('과일 배열:', fruits);

// Array 생성자 사용
const numbers = new Array(1, 2, 3, 4, 5);
console.log('숫자 배열:', numbers);

// 빈 배열 생성
const emptyArray = [];
console.log('빈 배열:', emptyArray);

// 다양한 타입의 값을 포함하는 배열
const mixedArray = ['문자열', 42, true, null, undefined, { name: '홍길동' }, [1, 2, 3]];
console.log('혼합 배열:', mixedArray);

// 특정 크기의 배열 생성
const arrayWithLength = new Array(5); // 길이가 5인 빈 배열 (모든 요소는 undefined)
console.log('길이가 5인 배열:', arrayWithLength);

// Array.of() 메서드로 배열 생성
const ofArray = Array.of(5); // [5] - 숫자 5 하나를 포함하는 배열
console.log('Array.of(5):', ofArray);

// Array.from() 메서드로 배열 생성 (유사 배열 객체나 이터러블로부터)
const fromString = Array.from('Hello'); // ['H', 'e', 'l', 'l', 'o']
console.log('Array.from("Hello"):', fromString);

// 2. 배열 요소 접근하기
console.log('\n--- 배열 요소 접근하기 ---');

// 인덱스를 사용하여 요소에 접근 (0부터 시작)
const colors = ['빨강', '파랑', '초록', '노랑'];
console.log('첫 번째 색상:', colors[0]); // '빨강'
console.log('두 번째 색상:', colors[1]); // '파랑'
console.log('세 번째 색상:', colors[2]); // '초록'

// 존재하지 않는 인덱스 접근 시 undefined 반환
console.log('존재하지 않는 인덱스:', colors[10]); // undefined

// 음수 인덱스는 지원하지 않음 (undefined 반환)
console.log('음수 인덱스:', colors[-1]); // undefined

// 배열의 마지막 요소에 접근하기
console.log('마지막 요소:', colors[colors.length - 1]); // '노랑'

// at() 메서드를 사용하여 요소에 접근 (ES2022)
console.log('at() 메서드로 첫 번째 요소:', colors.at(0)); // '빨강'
console.log('at() 메서드로 마지막 요소:', colors.at(-1)); // '노랑'
console.log('at() 메서드로 뒤에서 두 번째 요소:', colors.at(-2)); // '초록'

// 3. 배열 요소 수정하기
console.log('\n--- 배열 요소 수정하기 ---');

const pets = ['강아지', '고양이', '햄스터'];
console.log('원래 배열:', pets);

// 인덱스를 사용하여 요소 수정
pets[0] = '토끼';
console.log('첫 번째 요소 수정 후:', pets); // ['토끼', '고양이', '햄스터']

// 새로운 인덱스에 값 추가 (배열 길이가 자동으로 늘어남)
pets[3] = '앵무새';
console.log('새 요소 추가 후:', pets); // ['토끼', '고양이', '햄스터', '앵무새']

// 존재하지 않는 인덱스에 값 추가 (희소 배열)
pets[6] = '거북이';
console.log('희소 배열:', pets); // ['토끼', '고양이', '햄스터', '앵무새', undefined, undefined, '거북이']
console.log('배열 길이:', pets.length); // 7

// 4. 배열 속성과 기본 메서드
console.log('\n--- 배열 속성과 기본 메서드 ---');

// length 속성
const letters = ['a', 'b', 'c', 'd'];
console.log('배열 길이:', letters.length); // 4

// length 속성 수정
letters.length = 2; // 배열을 자름
console.log('length = 2 적용 후:', letters); // ['a', 'b']

letters.length = 5; // 배열을 늘림 (빈 슬롯 추가)
console.log('length = 5 적용 후:', letters); // ['a', 'b', undefined, undefined, undefined]

// toString(), join() 메서드
const numbers2 = [1, 2, 3, 4, 5];
console.log('toString() 결과:', numbers2.toString()); // "1,2,3,4,5"
console.log('join() 기본 결과:', numbers2.join()); // "1,2,3,4,5"
console.log('join("+") 결과:', numbers2.join('+')); // "1+2+3+4+5"
console.log('join(" / ") 결과:', numbers2.join(' / ')); // "1 / 2 / 3 / 4 / 5"

// 5. 배열 확인하기
console.log('\n--- 배열 확인하기 ---');

// typeof 연산자는 배열도 'object'로 표시
console.log('typeof [1, 2, 3]:', typeof [1, 2, 3]); // "object"

// Array.isArray() 메서드로 배열 확인
console.log('Array.isArray([1, 2, 3]):', Array.isArray([1, 2, 3])); // true
console.log('Array.isArray("문자열"):', Array.isArray("문자열")); // false
console.log('Array.isArray({}):', Array.isArray({})); // false

// instanceof 연산자
console.log('[1, 2, 3] instanceof Array:', [1, 2, 3] instanceof Array); // true

// 6. 다차원 배열
console.log('\n--- 다차원 배열 ---');

// 2차원 배열 (배열의 배열)
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log('2차원 배열:', matrix);

// 특정 요소에 접근
console.log('matrix[1][2]:', matrix[1][2]); // 6 (두 번째 행, 세 번째 열)

// 2차원 배열 순회
console.log('2차원 배열 순회:');
for (let i = 0; i < matrix.length; i++) {
    let row = '';
    for (let j = 0; j < matrix[i].length; j++) {
        row += matrix[i][j] + ' ';
    }
    console.log(row);
}

// 3차원 배열
const cube = [
    [
        [1, 2],
        [3, 4]
    ],
    [
        [5, 6],
        [7, 8]
    ]
];
console.log('3차원 배열:', cube);
console.log('cube[1][0][1]:', cube[1][0][1]); // 6

// 7. 배열 기본 메서드 (추가/제거)
console.log('\n--- 배열 기본 메서드 (추가/제거) ---');

const stack = ['첫 번째', '두 번째'];
console.log('원본 배열:', stack);

// push() - 배열의 끝에 요소 추가
stack.push('세 번째');
console.log('push() 후:', stack); // ['첫 번째', '두 번째', '세 번째']

// pop() - 배열의 마지막 요소 제거 및 반환
const lastItem = stack.pop();
console.log('pop()으로 제거된 요소:', lastItem); // '세 번째'
console.log('pop() 후:', stack); // ['첫 번째', '두 번째']

// unshift() - 배열의 시작에 요소 추가
stack.unshift('새로운 첫 번째');
console.log('unshift() 후:', stack); // ['새로운 첫 번째', '첫 번째', '두 번째']

// shift() - 배열의 첫 번째 요소 제거 및 반환
const firstItem = stack.shift();
console.log('shift()로 제거된 요소:', firstItem); // '새로운 첫 번째'
console.log('shift() 후:', stack); // ['첫 번째', '두 번째']

/**
 * 배열 기본 요약:
 * 
 * 1. 배열 생성:
 *    - 배열 리터럴: ['a', 'b', 'c']
 *    - 생성자: new Array(1, 2, 3)
 *    - 유틸리티 메서드: Array.of(), Array.from()
 * 
 * 2. 요소 접근:
 *    - 인덱스 사용: array[0], array[1]
 *    - at() 메서드: array.at(0), array.at(-1)
 * 
 * 3. 속성 및 메서드:
 *    - length: 배열의 길이
 *    - toString(), join(): 배열을 문자열로 변환
 *    - push(), pop(): 스택 연산 (끝에서 추가/제거)
 *    - shift(), unshift(): 큐 연산 (앞에서 제거/추가)
 * 
 * 4. 특징:
 *    - 다양한 타입의 값 저장 가능
 *    - 동적 크기 조정 (요소 추가/제거시 자동 조정)
 *    - 희소 배열 (빈 슬롯 포함 가능)
 *    - 다차원 배열 지원
 */ 