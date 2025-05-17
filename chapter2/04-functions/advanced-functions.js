// advanced-functions.js - 고급 함수 개념 (IIFE, 재귀 등)

/**
 * 고급 함수 개념
 * 
 * 이 파일에서는 즉시 실행 함수(IIFE), 재귀 함수, 고차 함수 등
 * JavaScript의 고급 함수 개념과 활용법을 알아봅니다.
 */

console.log('==== 고급 함수 개념 ====');

// 1. 즉시 실행 함수 표현식 (IIFE: Immediately Invoked Function Expression)
console.log('\n--- 즉시 실행 함수 표현식 (IIFE) ---');

// 기본 IIFE 구문
(function() {
    const message = 'IIFE 내부 메시지';
    console.log(message);
})(); // 정의와 동시에 실행

// 매개변수가 있는 IIFE
(function(name) {
    console.log(`안녕하세요, ${name}님!`);
})('홍길동');

// 화살표 함수로 IIFE 작성
(() => {
    const now = new Date();
    console.log(`현재 시간: ${now.toLocaleTimeString()}`);
})();

// IIFE의 반환값 사용
const result = (function() {
    return '즉시 실행 함수의 반환값';
})();

console.log('IIFE의 결과:', result);

// 2. IIFE의 활용: 모듈 패턴
console.log('\n--- IIFE의 활용: 모듈 패턴 ---');

// 모듈 패턴: 캡슐화와 정보 은닉
const counter = (function() {
    // 비공개 변수 (모듈 외부에서 접근 불가)
    let count = 0;
    
    // 공개 API
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
        },
        reset: function() {
            count = 0;
            return count;
        }
    };
})();

console.log('현재 카운트:', counter.getValue()); // 0
console.log('증가 후:', counter.increment()); // 1
console.log('증가 후:', counter.increment()); // 2
console.log('감소 후:', counter.decrement()); // 1
console.log('초기화 후:', counter.reset()); // 0

// counter.count에 직접 접근 불가 (비공개 변수)
console.log('count에 직접 접근:', counter.count); // undefined

// 3. 재귀 함수 (Recursive Functions)
console.log('\n--- 재귀 함수 ---');

// 재귀를 사용한 팩토리얼 계산
function factorial(n) {
    // 기저 조건(base case) - 재귀 종료 지점
    if (n <= 1) {
        return 1;
    }
    // 재귀 호출
    return n * factorial(n - 1);
}

console.log('5! =', factorial(5)); // 120 (5 * 4 * 3 * 2 * 1)
console.log('3! =', factorial(3)); // 6 (3 * 2 * 1)

// 재귀를 사용한 피보나치 수열
function fibonacci(n) {
    // 기저 조건
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    // 재귀 호출
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('fibonacci(6) =', fibonacci(6)); // 8 (0, 1, 1, 2, 3, 5, 8)
console.log('fibonacci(8) =', fibonacci(8)); // 21

// 재귀와 메모이제이션 (성능 최적화)
function fibonacciMemoized() {
    // 계산 결과를 캐시할 객체
    const cache = {};
    
    // 내부 재귀 함수
    function fib(n) {
        // 캐시에 결과가 있으면 재사용
        if (n in cache) {
            return cache[n];
        }
        
        // 기저 조건
        if (n <= 0) return 0;
        if (n === 1) return 1;
        
        // 결과 계산 및 캐시 저장
        const result = fib(n - 1) + fib(n - 2);
        cache[n] = result;
        
        return result;
    }
    
    // 내부 함수 반환
    return fib;
}

const fibOptimized = fibonacciMemoized();
console.log('fibOptimized(30) =', fibOptimized(30)); // 832040 (최적화된 버전)

// 4. 고차 함수 (Higher-Order Functions)
console.log('\n--- 고차 함수 ---');

// 다른 함수를 반환하는 함수
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log('double(5) =', double(5)); // 10
console.log('triple(5) =', triple(5)); // 15

// 함수를 인자로 받는 함수
function applyOperation(x, y, operation) {
    return operation(x, y);
}

// 여러 연산 함수 정의
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

console.log('10 + 5 =', applyOperation(10, 5, add)); // 15
console.log('10 - 5 =', applyOperation(10, 5, subtract)); // 5
console.log('10 * 5 =', applyOperation(10, 5, multiply)); // 50
console.log('10 / 5 =', applyOperation(10, 5, (a, b) => a / b)); // 2

// 함수 합성 (Function Composition)
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}

const square = x => x * x;
const addOne = x => x + 1;

const squareThenAddOne = compose(addOne, square);
const addOneThenSquare = compose(square, addOne);

console.log('squareThenAddOne(5) =', squareThenAddOne(5)); // 26 (5² + 1)
console.log('addOneThenSquare(5) =', addOneThenSquare(5)); // 36 ((5 + 1)²)

// 5. 커링 (Currying)
console.log('\n--- 커링 ---');

// 일반 함수
function normalAdd(a, b, c) {
    return a + b + c;
}

// 커링된 함수
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

// 화살표 함수를 사용한 간결한 커링
const arrowCurriedAdd = a => b => c => a + b + c;

console.log('normalAdd(1, 2, 3) =', normalAdd(1, 2, 3)); // 6
console.log('curriedAdd(1)(2)(3) =', curriedAdd(1)(2)(3)); // 6
console.log('arrowCurriedAdd(1)(2)(3) =', arrowCurriedAdd(1)(2)(3)); // 6

// 커링의 활용
function formatGreeting(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = formatGreeting('안녕하세요');
const sayGoodbye = formatGreeting('안녕히 가세요');

console.log(sayHello('홍길동')); // "안녕하세요, 홍길동!"
console.log(sayGoodbye('김철수')); // "안녕히 가세요, 김철수!"

// 6. 클로저 (Closure)
console.log('\n--- 클로저 ---');

function createCounter() {
    let count = 0; // 클로저에 의해 기억되는 변수
    
    return function() {
        count++; // 외부 함수의 변수에 접근
        return count;
    };
}

const myCounter = createCounter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2
console.log(myCounter()); // 3

// 다른 인스턴스는 독립적인 상태를 유지
const anotherCounter = createCounter();
console.log(anotherCounter()); // 1 (새로운 클로저, 새로운 count 변수)

// 클로저를 활용한 데이터 캡슐화
function createBankAccount(initialBalance) {
    let balance = initialBalance; // 외부에서 직접 접근 불가능한 비공개 변수
    
    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                return `${amount}원을 입금했습니다. 잔액: ${balance}원`;
            }
            return '유효하지 않은 입금액입니다.';
        },
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return `${amount}원을 출금했습니다. 잔액: ${balance}원`;
            }
            return '유효하지 않은 출금액이거나 잔액이 부족합니다.';
        },
        getBalance: function() {
            return `현재 잔액: ${balance}원`;
        }
    };
}

const account = createBankAccount(10000);
console.log(account.getBalance()); // "현재 잔액: 10000원"
console.log(account.deposit(5000)); // "5000원을 입금했습니다. 잔액: 15000원"
console.log(account.withdraw(3000)); // "3000원을 출금했습니다. 잔액: 12000원"
console.log(account.withdraw(20000)); // "유효하지 않은 출금액이거나 잔액이 부족합니다."

/**
 * 고급 함수 개념 요약:
 * 
 * 1. 즉시 실행 함수 표현식 (IIFE):
 *    - 정의와 동시에 실행되는 함수
 *    - 전역 스코프 오염 방지 및 변수 캡슐화에 유용
 *    - 모듈 패턴 구현에 활용
 * 
 * 2. 재귀 함수:
 *    - 자기 자신을 호출하는 함수
 *    - 기저 조건(종료 조건)이 필수적
 *    - 복잡한 문제를 단순하게 해결 가능 (분할 정복)
 *    - 메모이제이션으로 성능 최적화 가능
 * 
 * 3. 고차 함수:
 *    - 함수를 인자로 받거나 함수를 반환하는 함수
 *    - 함수 합성, 추상화, 코드 재사용성 향상
 * 
 * 4. 커링:
 *    - 여러 매개변수를 받는 함수를 단일 매개변수 함수의 체인으로 변환
 *    - 부분 적용 및 재사용성 향상에 유용
 * 
 * 5. 클로저:
 *    - 함수가 자신이 선언된 환경의 변수에 접근할 수 있는 메커니즘
 *    - 데이터 캡슐화, 비공개 변수, 상태 유지에 활용
 */ 