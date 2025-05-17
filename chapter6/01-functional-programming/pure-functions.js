// pure-functions.js - 순수 함수 예제

/**
 * 순수 함수 (Pure Functions)
 * 
 * 순수 함수의 특징:
 * 1. 동일한 입력에 대해 항상 동일한 출력을 반환한다.
 * 2. 부수 효과(Side Effects)가 없다.
 *    - 외부 상태를 변경하지 않는다.
 *    - 외부 변수에 의존하지 않는다.
 * 3. 함수 외부에 영향을 주지 않는다.
 */

console.log('==== 순수 함수 예제 ====');

// 1. 순수 함수의 예
console.log('\n--- 순수 함수 예제 ---');

// 순수 함수: 입력에 대해 항상 동일한 출력 반환
function add(a, b) {
    return a + b;
}

console.log('add(5, 3):', add(5, 3)); // 항상 8 반환
console.log('add(5, 3):', add(5, 3)); // 다시 호출해도 동일한 결과

// 순수 함수: 배열의 모든 요소에 숫자를 더해 새 배열 반환
function addToArray(arr, num) {
    // 원본 배열을 변경하지 않고 새 배열 반환
    return arr.map(item => item + num);
}

const numbers = [1, 2, 3, 4, 5];
const newNumbers = addToArray(numbers, 10);

console.log('원본 배열:', numbers);      // [1, 2, 3, 4, 5] - 변경되지 않음
console.log('새 배열:', newNumbers);     // [11, 12, 13, 14, 15] - 새로운 배열

// 2. 비순수 함수의 예
console.log('\n--- 비순수 함수 예제 ---');

// 전역 변수에 의존하는 비순수 함수
let total = 0;

function addToTotal(value) {
    total += value; // 외부 상태 변경
    return total;
}

console.log('addToTotal(5):', addToTotal(5)); // 5
console.log('addToTotal(5):', addToTotal(5)); // 10 - 다른 결과 반환
console.log('변경된 전역 변수 total:', total); // 10

// 입력 배열을 직접 수정하는 비순수 함수
function modifyArray(arr, num) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] += num; // 원본 배열을 직접 수정
    }
    return arr;
}

const originalArray = [1, 2, 3];
console.log('modifyArray 호출 전:', originalArray); // [1, 2, 3]
modifyArray(originalArray, 5);
console.log('modifyArray 호출 후 (원본이 변경됨):', originalArray); // [6, 7, 8]

// 3. 순수 함수로 변경하기
console.log('\n--- 비순수 함수를 순수 함수로 변경 ---');

// 비순수 함수를 순수 함수로 변경
function pureAddToTotal(currentTotal, value) {
    return currentTotal + value; // 새로운 값 반환
}

let newTotal = 0;
newTotal = pureAddToTotal(newTotal, 5);
console.log('pureAddToTotal 결과:', newTotal); // 5
newTotal = pureAddToTotal(newTotal, 5);
console.log('pureAddToTotal 다시 호출:', newTotal); // 10

// 배열 수정 함수를 순수 함수로 변경
function pureModifyArray(arr, num) {
    // 새 배열을 생성하여 값 반환
    return arr.map(item => item + num);
}

const testArray = [1, 2, 3];
console.log('원본 배열:', testArray);
const modifiedArray = pureModifyArray(testArray, 5);
console.log('원본 배열 (변경되지 않음):', testArray);
console.log('수정된 새 배열:', modifiedArray);

// 4. 부수 효과 (Side Effects)
console.log('\n--- 부수 효과 예제 ---');

/**
 * 일반적인 부수 효과:
 * 1. 전역 변수 수정
 * 2. 매개변수 객체 변경
 * 3. 콘솔 출력, 로깅
 * 4. 파일 시스템 접근
 * 5. 네트워크 요청
 * 6. DOM 조작
 * 7. 타임스탬프, 랜덤 값 사용
 */

// 부수 효과 있는 함수 예제
const user = { name: "홍길동", age: 30 };

function celebrateBirthday(user) {
    user.age++; // 부수 효과: 매개변수 객체 변경
    console.log(`${user.name}의 생일을 축하합니다!`); // 부수 효과: 콘솔 출력
}

console.log('함수 호출 전 user:', JSON.stringify(user));
celebrateBirthday(user);
console.log('함수 호출 후 user (변경됨):', JSON.stringify(user));

// 부수 효과를 제거한 순수 함수
function pureCelebrateBirthday(user) {
    // 새 객체를 생성하여 반환
    return {
        ...user,
        age: user.age + 1
    };
}

const user2 = { name: "김철수", age: 25 };
console.log('함수 호출 전 user2:', JSON.stringify(user2));
const updatedUser = pureCelebrateBirthday(user2);
console.log('함수 호출 후 user2 (변경되지 않음):', JSON.stringify(user2));
console.log('반환된 새 객체:', JSON.stringify(updatedUser));

// 5. 순수 함수의 장점
console.log('\n--- 순수 함수의 장점 ---');

/**
 * 순수 함수의 장점:
 * 1. 테스트 용이성: 입력과 출력만 확인하면 됨
 * 2. 디버깅 쉬움: 외부 의존성이 없어 문제 추적이 쉬움
 * 3. 병렬 처리 가능: 외부 상태에 의존하지 않아 동시 실행 가능
 * 4. 예측 가능성: 동일 입력에 항상 동일 출력
 * 5. 캐싱 가능: 결과를 캐시하여 재사용 가능
 */

// 메모이제이션(Memoization) 예제 - 순수 함수의 결과를 캐싱
function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache[key]) {
            console.log('캐시에서 결과 가져옴');
            return cache[key];
        }
        
        const result = fn(...args);
        cache[key] = result;
        console.log('새로 계산된 결과 저장');
        return result;
    };
}

// 피보나치 함수 (재귀적 - 계산 비용이 큼)
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 메모이제이션 적용
const memoizedFibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.log('일반 피보나치(5)를 계산...');
console.time('일반 피보나치');
console.log('결과:', fibonacci(5));
console.timeEnd('일반 피보나치');

console.log('메모이제이션 피보나치(5)를 계산 (첫 번째 호출)...');
console.time('메모이제이션 피보나치 첫 호출');
console.log('결과:', memoizedFibonacci(5));
console.timeEnd('메모이제이션 피보나치 첫 호출');

console.log('메모이제이션 피보나치(5)를 계산 (두 번째 호출)...');
console.time('메모이제이션 피보나치 두 번째 호출');
console.log('결과:', memoizedFibonacci(5));
console.timeEnd('메모이제이션 피보나치 두 번째 호출');

// 6. 실용적인 순수 함수 예제
console.log('\n--- 실용적인 순수 함수 예제 ---');

// 상품 목록에서 가격에 할인 적용하기
const products = [
    { id: 1, name: "노트북", price: 1000000 },
    { id: 2, name: "스마트폰", price: 500000 },
    { id: 3, name: "이어폰", price: 100000 }
];

// 순수 함수: 할인율 적용
function applyDiscount(products, discountRate) {
    return products.map(product => ({
        ...product,
        price: product.price * (1 - discountRate)
    }));
}

// 20% 할인 적용
const discountedProducts = applyDiscount(products, 0.2);

console.log('원본 상품 목록:', JSON.stringify(products, null, 2));
console.log('할인된 상품 목록:', JSON.stringify(discountedProducts, null, 2));

// 순수 함수: 조건에 맞는 상품 필터링
function filterProducts(products, minPrice, maxPrice) {
    return products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
}

// 20만원~80만원 사이 상품 필터링
const filteredProducts = filterProducts(products, 200000, 800000);
console.log('필터링된 상품 목록:', JSON.stringify(filteredProducts, null, 2));

// 7. 연습 문제
console.log('\n--- 연습 문제 ---');

/**
 * 연습 문제 1: 다음 함수를 순수 함수로 변경하세요.
 * 
 * 비순수 함수 버전:
 * 
 * let counter = 0;
 * function incrementCounter(step) {
 *   counter += step;
 *   return counter;
 * }
 * 
 * 순수 함수 버전:
 * function pureIncrement(counter, step) {
 *   return counter + step;
 * }
 */

/**
 * 연습 문제 2: 다음 함수를 순수 함수로 변경하세요.
 * 
 * 비순수 함수 버전:
 * 
 * function sortAndModify(array) {
 *   array.sort((a, b) => a - b);
 *   for (let i = 0; i < array.length; i++) {
 *     array[i] = array[i] * 2;
 *   }
 *   return array;
 * }
 * 
 * 순수 함수 버전:
 * function pureSortAndModify(array) {
 *   return [...array]
 *     .sort((a, b) => a - b)
 *     .map(item => item * 2);
 * }
 */

console.log('연습 문제에 대한 해답은 위의 주석을 참고하세요.');

/**
 * 순수 함수 요약:
 * 
 * 1. 동일한 입력에 동일한 출력 반환
 * 2. 부수 효과 없음
 * 3. 외부 상태에 의존하지 않음
 * 4. 테스트, 디버깅, 유지보수가 용이
 * 5. 병렬 처리 및 최적화에 적합
 * 
 * 순수 함수는 함수형 프로그래밍의 핵심 개념으로,
 * 코드의 예측 가능성과 안정성을 높이는 데 크게 기여합니다.
 */ 