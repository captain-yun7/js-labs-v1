// copying-objects.js - 얕은 복사 vs 깊은 복사

/**
 * 객체 복사(Object Copying)
 * 
 * JavaScript에서 객체는 참조 타입이므로, 변수에 할당하거나 함수에 전달할 때 
 * 값이 아닌 참조(메모리 주소)가 전달됩니다. 
 * 이로 인해 객체를 복사할 때는 얕은 복사와 깊은 복사의 차이를 이해하는 것이 중요합니다.
 */

console.log('==== 얕은 복사 vs 깊은 복사 ====');

// 1. 원시 타입과 참조 타입 비교
console.log('\n--- 원시 타입과 참조 타입 비교 ---');

// 원시 타입 값 복사
let num1 = 10;
let num2 = num1; // 값이 복사됨
num1 = 20; // num1만 변경

console.log('원시 타입 복사:');
console.log('num1:', num1); // 20
console.log('num2:', num2); // 10 (num1의 변경에 영향 받지 않음)

// 참조 타입 참조 복사
let obj1 = { name: '홍길동', age: 25 };
let obj2 = obj1; // 참조가 복사됨
obj1.age = 30; // obj1의 속성 변경

console.log('\n참조 타입 복사:');
console.log('obj1:', obj1); // { name: '홍길동', age: 30 }
console.log('obj2:', obj2); // { name: '홍길동', age: 30 } (obj1의 변경에 영향 받음)

// 2. 얕은 복사(Shallow Copy)
console.log('\n--- 얕은 복사(Shallow Copy) ---');

// 얕은 복사는 최상위 속성만 새로 복사하고, 중첩된 객체는 여전히 참조로 공유됩니다.

// 2.1 Object.assign() 사용
const original = {
    name: '김철수',
    age: 30,
    address: {
        city: '서울',
        district: '강남구'
    },
    hobbies: ['독서', '영화']
};

// Object.assign()으로 얕은 복사
const shallowCopy1 = Object.assign({}, original);
console.log('Object.assign() 복사본:', shallowCopy1);

// 최상위 속성 변경
original.name = '김수정';
console.log('원본 이름 변경 후:');
console.log('원본:', original.name); // '김수정'
console.log('복사본:', shallowCopy1.name); // '김철수' (영향 없음)

// 중첩 객체 속성 변경
original.address.city = '부산';
console.log('\n중첩 객체 속성 변경 후:');
console.log('원본:', original.address.city); // '부산'
console.log('복사본:', shallowCopy1.address.city); // '부산' (영향 받음)

// 배열 요소 변경
original.hobbies.push('여행');
console.log('\n배열 요소 변경 후:');
console.log('원본:', original.hobbies); // ['독서', '영화', '여행']
console.log('복사본:', shallowCopy1.hobbies); // ['독서', '영화', '여행'] (영향 받음)

// 2.2 전개 연산자(Spread Operator) 사용
const shallowCopy2 = { ...original };
console.log('\n전개 연산자 복사본:', shallowCopy2);

// 2.3 배열의 얕은 복사
const originalArray = [1, 2, [3, 4]];
const shallowCopyArray1 = originalArray.slice(); // slice()로 얕은 복사
const shallowCopyArray2 = [...originalArray]; // 전개 연산자로 얕은 복사

originalArray[0] = 100; // 최상위 요소 변경
originalArray[2][0] = 300; // 중첩 배열 요소 변경

console.log('\n배열 얕은 복사:');
console.log('원본 배열:', originalArray); // [100, 2, [300, 4]]
console.log('slice() 복사본:', shallowCopyArray1); // [1, 2, [300, 4]] (중첩 요소만 영향 받음)
console.log('전개 연산자 복사본:', shallowCopyArray2); // [1, 2, [300, 4]] (중첩 요소만 영향 받음)

// 3. 깊은 복사(Deep Copy)
console.log('\n--- 깊은 복사(Deep Copy) ---');

// 깊은 복사는 객체의 모든 수준을 새로 복사하여 완전히 독립적인 객체를 생성합니다.

// 3.1 JSON 직렬화/역직렬화를 사용한 깊은 복사
const deepCopy1 = JSON.parse(JSON.stringify(original));
console.log('JSON 사용 깊은 복사본:', deepCopy1);

// 최상위 속성 변경
original.name = '박지성';
console.log('\n원본 이름 다시 변경 후:');
console.log('원본:', original.name); // '박지성'
console.log('얕은 복사본:', shallowCopy1.name); // '김철수'
console.log('깊은 복사본:', deepCopy1.name); // '김수정'

// 중첩 객체 속성 변경
original.address.district = '강서구';
console.log('\n중첩 객체 속성 다시 변경 후:');
console.log('원본:', original.address.district); // '강서구'
console.log('얕은 복사본:', shallowCopy1.address.district); // '강서구' (영향 받음)
console.log('깊은 복사본:', deepCopy1.address.district); // '강남구' (영향 없음)

// 3.2 JSON 직렬화/역직렬화 방식의 한계
console.log('\nJSON 직렬화/역직렬화의 한계:');

const complex = {
    func: function() { return 'Hello'; },
    symbol: Symbol('symbol'),
    undefined: undefined,
    date: new Date(),
    regexp: /pattern/g,
    infinity: Infinity,
    nan: NaN,
    set: new Set([1, 2, 3]),
    map: new Map([['key', 'value']])
};

const complexCopy = JSON.parse(JSON.stringify(complex));
console.log('원본 객체:');
console.log('- 함수:', typeof complex.func); // 'function'
console.log('- 심볼:', typeof complex.symbol); // 'symbol'
console.log('- undefined:', complex.undefined); // undefined
console.log('- 날짜:', complex.date instanceof Date); // true
console.log('- 정규식:', complex.regexp instanceof RegExp); // true
console.log('- 세트:', complex.set instanceof Set); // true
console.log('- 맵:', complex.map instanceof Map); // true

console.log('\n복사된 객체:');
console.log('- 함수:', complexCopy.func); // undefined (함수 손실)
console.log('- 심볼:', complexCopy.symbol); // undefined (심볼 손실)
console.log('- undefined:', complexCopy.undefined); // undefined (키 자체가 손실)
console.log('- 날짜:', complexCopy.date instanceof Date); // false (문자열로 변환됨)
console.log('- 날짜 값:', complexCopy.date); // 날짜의 문자열 표현
console.log('- 정규식:', complexCopy.regexp); // {} (객체로 변환됨)
console.log('- Infinity:', complexCopy.infinity); // null (null로 변환됨)
console.log('- NaN:', complexCopy.nan); // null (null로 변환됨)
console.log('- 세트:', complexCopy.set); // undefined (손실)
console.log('- 맵:', complexCopy.map); // undefined (손실)

// 3.3 재귀적 깊은 복사 직접 구현
console.log('\n재귀적 깊은 복사 함수:');

function deepCopy(obj) {
    // null이거나 객체가 아닌 경우 바로 반환
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // 날짜 객체인 경우
    if (obj instanceof Date) {
        return new Date(obj);
    }
    
    // 정규식인 경우
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    
    // 배열인 경우
    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }
    
    // 일반 객체인 경우
    const copy = {};
    // 객체 자신의 속성만 복사
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key]);
    });
    
    return copy;
}

// 테스트 객체 생성
const original2 = {
    name: '홍길동',
    age: 30,
    address: {
        city: '서울',
        district: '강남구',
        details: {
            dong: '삼성동',
            zipCode: '12345'
        }
    },
    hobbies: ['독서', { name: '여행', locations: ['서울', '부산'] }]
};

// 직접 구현한 함수로 깊은 복사
const deepCopy2 = deepCopy(original2);

// 중첩 객체 수정 테스트
original2.address.details.dong = '역삼동';
original2.hobbies[1].locations.push('제주');

console.log('원본 객체:', original2);
console.log('깊은 복사본:', deepCopy2);
console.log('동네 비교:');
console.log('- 원본:', original2.address.details.dong); // '역삼동'
console.log('- 복사본:', deepCopy2.address.details.dong); // '삼성동'
console.log('여행지 비교:');
console.log('- 원본:', original2.hobbies[1].locations); // ['서울', '부산', '제주']
console.log('- 복사본:', deepCopy2.hobbies[1].locations); // ['서울', '부산']

// 4. 라이브러리를 이용한 깊은 복사
console.log('\n--- 라이브러리 기반 깊은 복사 ---');

console.log('실무에서는 다음과 같은 라이브러리를 사용하는 것이 권장됩니다:');
console.log('- lodash의 _.cloneDeep()');
console.log('- rfdc (Really Fast Deep Clone)');
console.log('- immer (불변성 관리 라이브러리)');

// lodash 예시 (실제 코드에서 사용하려면 lodash를 설치해야 함)
// const _ = require('lodash');
// const deepCopyWithLodash = _.cloneDeep(original);

/**
 * 객체 복사 요약:
 * 
 * 1. 얕은 복사(Shallow Copy):
 *    - 최상위 속성만 새로 복사
 *    - 중첩된 객체는 참조로 공유
 *    - 방법: Object.assign(), 전개 연산자({...obj}), Array.slice(), [...array]
 * 
 * 2. 깊은 복사(Deep Copy):
 *    - 모든 수준의 객체를 새로 복사
 *    - 완전히 독립적인 객체 생성
 *    - 방법:
 *      a. JSON.parse(JSON.stringify(obj)) - 단순한 데이터에 적합
 *      b. 직접 재귀 함수 구현 - 복잡한 경우 처리 가능
 *      c. 외부 라이브러리 사용 - 실무에서 권장됨
 * 
 * 3. JSON 방식의 한계:
 *    - 함수, Symbol, undefined, 정규식 등 손실
 *    - Date 객체가 문자열로 변환됨
 *    - Map, Set, 순환 참조 처리 불가
 */ 