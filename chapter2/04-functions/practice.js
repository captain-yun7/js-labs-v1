// practice.js - 함수 관련 실습 문제

/**
 * 함수 관련 실습 문제
 * 
 * 이 파일에는 함수 개념을 연습할 수 있는 실습 문제가 포함되어 있습니다.
 * 각 문제의 지시사항에 따라 함수를 구현하고 실행해 보세요.
 */

console.log('==== 함수 실습 문제 ====');

// 문제 1: 기본 함수 선언
console.log('\n--- 문제 1: 기본 함수 선언 ---');
/**
 * 두 숫자를 인자로 받아 그 합을 반환하는 함수 sum을 작성하세요.
 * - 함수 선언문 방식으로 작성하세요.
 * - 함수는 두 개의 매개변수를 가집니다: a, b
 * - 함수는 a와 b의 합을 반환합니다.
 */

// 여기에 함수를 작성하세요
function sum(a, b) {
    return a + b;
}

// 테스트
console.log('sum(5, 3) =', sum(5, 3)); // 8이 출력되어야 합니다.
console.log('sum(-1, 1) =', sum(-1, 1)); // 0이 출력되어야 합니다.

// 문제 2: 함수 표현식
console.log('\n--- 문제 2: 함수 표현식 ---');
/**
 * 숫자를 인자로 받아 그 숫자의 제곱을 반환하는 함수를 작성하세요.
 * - 함수 표현식 방식으로 작성하세요.
 * - 함수는 하나의 매개변수를 가집니다: num
 * - 함수는 num의 제곱을 반환합니다.
 */

// 여기에 함수를 작성하세요
const square = function(num) {
    return num * num;
};

// 테스트
console.log('square(4) =', square(4)); // 16이 출력되어야 합니다.
console.log('square(-3) =', square(-3)); // 9가 출력되어야 합니다.

// 문제 3: 화살표 함수
console.log('\n--- 문제 3: 화살표 함수 ---');
/**
 * 문자열을 인자로 받아 그 문자열의 길이를 반환하는 함수를 작성하세요.
 * - 화살표 함수 방식으로 작성하세요.
 * - 함수는 하나의 매개변수를 가집니다: str
 * - 함수는 str의 길이를 반환합니다.
 */

// 여기에 함수를 작성하세요
const getLength = (str) => str.length;

// 테스트
console.log('getLength("안녕하세요") =', getLength("안녕하세요")); // 5가 출력되어야 합니다.
console.log('getLength("") =', getLength("")); // 0이 출력되어야 합니다.

// 문제 4: 기본 매개변수 활용
console.log('\n--- 문제 4: 기본 매개변수 활용 ---');
/**
 * 인사말을 생성하는 함수를 작성하세요.
 * - 함수는 name과 greeting 두 개의 매개변수를 가집니다.
 * - greeting의 기본값은 "안녕하세요"로 설정하세요.
 * - 함수는 "greeting, name님!" 형식의 문자열을 반환합니다.
 */

// 여기에 함수를 작성하세요
function greet(name, greeting = "안녕하세요") {
    return `${greeting}, ${name}님!`;
}

// 테스트
console.log(greet("홍길동")); // "안녕하세요, 홍길동님!"이 출력되어야 합니다.
console.log(greet("김철수", "반갑습니다")); // "반갑습니다, 김철수님!"이 출력되어야 합니다.

// 문제 5: 나머지 매개변수 활용
console.log('\n--- 문제 5: 나머지 매개변수 활용 ---');
/**
 * 여러 개의 숫자를 받아 그 평균을 계산하는 함수를 작성하세요.
 * - 나머지 매개변수 문법을 사용하세요.
 * - 함수는 임의의 개수의 숫자를 인자로 받을 수 있어야 합니다.
 * - 함수는 모든 인자의 평균값을 반환합니다.
 * - 인자가 없는 경우 0을 반환합니다.
 */

// 여기에 함수를 작성하세요
function average(...numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

// 테스트
console.log('average(1, 2, 3, 4, 5) =', average(1, 2, 3, 4, 5)); // 3이 출력되어야 합니다.
console.log('average(10, 20) =', average(10, 20)); // 15가 출력되어야 합니다.
console.log('average() =', average()); // 0이 출력되어야 합니다.

// 문제 6: 콜백 함수 활용
console.log('\n--- 문제 6: 콜백 함수 활용 ---');
/**
 * 배열의 각 요소에 특정 연산을 수행하는 함수를 작성하세요.
 * - 함수는 배열(array)과 콜백 함수(callback)를 매개변수로 받습니다.
 * - 함수는 배열의 각 요소에 콜백 함수를 적용한 결과를 새 배열로 반환합니다.
 * - Array.map 메서드를 사용하지 않고 구현하세요.
 */

// 여기에 함수를 작성하세요
function transform(array, callback) {
    const result = [];
    
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i));
    }
    
    return result;
}

// 테스트
const numbers = [1, 2, 3, 4, 5];
const doubled = transform(numbers, x => x * 2);
console.log('doubled =', doubled); // [2, 4, 6, 8, 10]이 출력되어야 합니다.

const squared = transform(numbers, x => x * x);
console.log('squared =', squared); // [1, 4, 9, 16, 25]가 출력되어야 합니다.

// 문제 7: 클로저 활용
console.log('\n--- 문제 7: 클로저 활용 ---');
/**
 * 카운터 함수를 생성하는 함수를 작성하세요.
 * - 함수는 초기값(initialValue)을 매개변수로 받습니다.
 * - 함수는 다음과 같은 기능을 하는 객체를 반환합니다:
 *   - increment: 카운터를 1 증가시키고 새 값을 반환
 *   - decrement: 카운터를 1 감소시키고 새 값을 반환
 *   - getValue: 현재 카운터 값을 반환
 */

// 여기에 함수를 작성하세요
function createCounter(initialValue) {
    let count = initialValue || 0;
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getValue: function() {
            return count;
        }
    };
}

// 테스트
const counter = createCounter(5);
console.log('초기값:', counter.getValue()); // 5가 출력되어야 합니다.
console.log('증가 후:', counter.increment()); // 6이 출력되어야 합니다.
console.log('감소 후:', counter.decrement()); // 5가 출력되어야 합니다.

// 문제 8: 재귀 함수 활용
console.log('\n--- 문제 8: 재귀 함수 활용 ---');
/**
 * 주어진 숫자의 팩토리얼을 계산하는 함수를 작성하세요.
 * - 재귀 함수를 사용하여 구현하세요.
 * - 팩토리얼은 n!으로 표기하며, n * (n-1) * ... * 2 * 1 입니다.
 * - 0!과 1!은 모두 1입니다.
 */

// 여기에 함수를 작성하세요
function factorial(n) {
    // 기저 조건
    if (n <= 1) {
        return 1;
    }
    
    // 재귀 호출
    return n * factorial(n - 1);
}

// 테스트
console.log('factorial(5) =', factorial(5)); // 120이 출력되어야 합니다.
console.log('factorial(0) =', factorial(0)); // 1이 출력되어야 합니다.

// 문제 9: 고차 함수 활용
console.log('\n--- 문제 9: 고차 함수 활용 ---');
/**
 * 다양한 세금 계산기를 생성하는 함수를 작성하세요.
 * - 함수는 세율(taxRate)을 매개변수로 받습니다.
 * - 함수는 가격(price)을 매개변수로 받아 세금이 포함된 가격을 반환하는 함수를 반환합니다.
 * - 공식: 세금이 포함된 가격 = 가격 + (가격 * 세율)
 */

// 여기에 함수를 작성하세요
function createTaxCalculator(taxRate) {
    return function(price) {
        return price + (price * taxRate);
    };
}

// 테스트
const calculateVAT = createTaxCalculator(0.1); // 10% 부가가치세
console.log('100원의 부가세 포함 가격:', calculateVAT(100)); // 110이 출력되어야 합니다.

const calculateLuxuryTax = createTaxCalculator(0.2); // 20% 고급품세
console.log('100원의 고급품세 포함 가격:', calculateLuxuryTax(100)); // 120이 출력되어야 합니다.

// 문제 10: IIFE 활용
console.log('\n--- 문제 10: IIFE 활용 ---');
/**
 * 즉시 실행 함수 표현식(IIFE)을 사용하여 간단한 계산기 모듈을 작성하세요.
 * - 모듈은 add, subtract, multiply, divide 함수를 제공해야 합니다.
 * - 각 함수는 두 개의 숫자를 인자로 받아 해당하는 연산 결과를 반환합니다.
 * - divide 함수는 두 번째 인자가 0인 경우 "0으로 나눌 수 없습니다."라는 문자열을 반환합니다.
 */

// 여기에 IIFE를 작성하세요
const calculator = (function() {
    return {
        add: function(a, b) {
            return a + b;
        },
        subtract: function(a, b) {
            return a - b;
        },
        multiply: function(a, b) {
            return a * b;
        },
        divide: function(a, b) {
            if (b === 0) {
                return "0으로 나눌 수 없습니다.";
            }
            return a / b;
        }
    };
})();

// 테스트
console.log('10 + 5 =', calculator.add(10, 5)); // 15가 출력되어야 합니다.
console.log('10 - 5 =', calculator.subtract(10, 5)); // 5가 출력되어야 합니다.
console.log('10 * 5 =', calculator.multiply(10, 5)); // 50이 출력되어야 합니다.
console.log('10 / 5 =', calculator.divide(10, 5)); // 2가 출력되어야 합니다.
console.log('10 / 0 =', calculator.divide(10, 0)); // "0으로 나눌 수 없습니다."가 출력되어야 합니다.

/**
 * 축하합니다! 
 * 모든 실습 문제를 완료했습니다.
 * 이제 함수의 기본 개념부터 고급 기능까지 활용할 수 있는 능력을 갖추셨습니다.
 */ 