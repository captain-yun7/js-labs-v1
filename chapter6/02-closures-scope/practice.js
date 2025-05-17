// practice.js - 클로저와 스코프 실습

/**
 * 클로저와 스코프 실습
 * 
 * 이 파일에는 클로저와 스코프를 이해하고 연습할 수 있는 실습 문제들이 포함되어 있습니다.
 * 주석으로 표시된 곳에 코드를 작성하거나 수정하여 문제를 해결해보세요.
 */

console.log('===== 실습 1: 스코프 이해하기 =====');
// 문제 1: 다음 코드의 출력 결과를 예측하고, 이유를 설명해보세요.
function scopePractice1() {
    var a = 1;
    let b = 2;
    
    if (true) {
        var a = 3;
        let b = 4;
        console.log('if 블록 내부:', a, b); // 출력: ?
    }
    
    console.log('함수 내부:', a, b); // 출력: ?
}

scopePractice1();
// 예상 출력:
// if 블록 내부: 3 4
// 함수 내부: 3 2
// 이유: var로 선언한 a는 함수 스코프이므로 if 블록 내에서 재선언하면 함수 전체에서 값이 바뀝니다.
// 반면 let으로 선언한 b는 블록 스코프이므로 if 블록 내에서 선언한 b는 블록 내에서만 유효합니다.

console.log('\n===== 실습 2: 기본 클로저 만들기 =====');
// 문제 2: 증가하는 카운터 함수를 반환하는 클로저를 작성하세요.
// createCounter 함수는 호출될 때마다 값이 1씩 증가하는 함수를 반환해야 합니다.

function createCounter() {
    // 여기에 코드를 작성하세요
    let count = 0;
    
    return function() {
        count += 1;
        return count;
    };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

const counter2 = createCounter(); // 새로운 카운터
console.log(counter2()); // 1 (counter1과 별개의 count 변수를 가짐)

console.log('\n===== 실습 3: 클로저로 프라이빗 변수 만들기 =====');
// 문제 3: 사용자의 개인 정보를 관리하는 객체를 생성하는 함수를 작성하세요.
// 이 객체는 이름과 나이 정보를 저장하고, 변경하거나 조회할 수 있는 메소드를 제공해야 합니다.
// 단, 저장된 정보는 메소드를 통해서만 접근할 수 있어야 합니다.

function createUserProfile(initialName, initialAge) {
    // 여기에 코드를 작성하세요
    let name = initialName;
    let age = initialAge;
    
    return {
        getName: function() {
            return name;
        },
        getAge: function() {
            return age;
        },
        setName: function(newName) {
            name = newName;
        },
        setAge: function(newAge) {
            if (newAge >= 0) {
                age = newAge;
            } else {
                console.log('나이는 음수가 될 수 없습니다.');
            }
        },
        getProfile: function() {
            return `이름: ${name}, 나이: ${age}`;
        }
    };
}

const user = createUserProfile('홍길동', 30);
console.log(user.getProfile()); // 이름: 홍길동, 나이: 30
user.setName('김철수');
user.setAge(25);
console.log(user.getProfile()); // 이름: 김철수, 나이: 25
console.log(user.name); // undefined (직접 접근 불가)

console.log('\n===== 실습 4: 함수 팩토리 만들기 =====');
// 문제 4: 지정된 인사말을 앞에 붙여 메시지를 생성하는 함수를 반환하는 함수를 작성하세요.

function createGreeter(greeting) {
    // 여기에 코드를 작성하세요
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const greetInKorean = createGreeter('안녕하세요');
const greetInEnglish = createGreeter('Hello');

console.log(greetInKorean('홍길동')); // 안녕하세요, 홍길동!
console.log(greetInEnglish('John')); // Hello, John!

console.log('\n===== 실습 5: 클로저와 루프 =====');
// 문제 5: 0부터 4까지 출력하는 다섯 개의 함수를 배열에 담아 반환하는 함수를 작성하세요.
// 힌트: let을 사용하거나 즉시 실행 함수를 활용하세요.

function createFunctions() {
    const functions = [];
    
    // 방법 1: let 사용 (수정 전)
    for (var i = 0; i < 5; i++) {
        functions.push(function() {
            console.log(i);
        });
    }
    
    return functions;
}

const functionsWithVar = createFunctions();
console.log('var로 인한 문제:');
functionsWithVar.forEach(func => func()); // 모두 5 출력 (문제 발생!)

// 방법 2: let 사용 (수정 후)
function createFunctionsFixed1() {
    const functions = [];
    
    // 여기에 코드를 수정하세요
    for (let i = 0; i < 5; i++) {
        functions.push(function() {
            console.log(i);
        });
    }
    
    return functions;
}

const functionsWithLet = createFunctionsFixed1();
console.log('let으로 해결한 방법:');
functionsWithLet.forEach(func => func()); // 0, 1, 2, 3, 4 출력

// 방법 3: IIFE 사용
function createFunctionsFixed2() {
    const functions = [];
    
    // 여기에 코드를 수정하세요
    for (var i = 0; i < 5; i++) {
        (function(index) {
            functions.push(function() {
                console.log(index);
            });
        })(i);
    }
    
    return functions;
}

const functionsWithIIFE = createFunctionsFixed2();
console.log('IIFE로 해결한 방법:');
functionsWithIIFE.forEach(func => func()); // 0, 1, 2, 3, 4 출력

console.log('\n===== 실습 6: 콜백과 클로저 =====');
// 문제 6: 클로저를 사용하여 API 호출을 시뮬레이션하는 함수를 작성하세요.
// fetchData 함수는 데이터 ID를 받아서 해당 데이터를 가져오는 시뮬레이션을 수행해야 합니다.

function simulateAPI() {
    // 데이터베이스 역할을 하는 객체
    const database = {
        1: { id: 1, name: '상품 A', price: 1000 },
        2: { id: 2, name: '상품 B', price: 2000 },
        3: { id: 3, name: '상품 C', price: 3000 }
    };
    
    // 여기에 fetchData 함수를 작성하세요
    return function fetchData(id, callback) {
        console.log(`데이터 ${id} 요청 중...`);
        
        // 비동기 API 호출 시뮬레이션 (1초 후 결과 반환)
        setTimeout(function() {
            if (database[id]) {
                callback(null, database[id]);
            } else {
                callback(new Error('데이터를 찾을 수 없습니다.'), null);
            }
        }, 1000);
    };
}

const fetchData = simulateAPI();

// 이제 fetchData를 사용하여 데이터 요청
console.log('API 호출 시작');
fetchData(2, function(error, data) {
    if (error) {
        console.error('오류:', error.message);
    } else {
        console.log('데이터 수신 성공:', data);
    }
});

console.log('\n===== 실습 7: 메모이제이션 구현하기 =====');
// 문제 7: 클로저를 사용하여 함수 호출 결과를 캐싱하는 메모이제이션 함수를 구현하세요.

function memoize(fn) {
    // 여기에 코드를 작성하세요
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache[key]) {
            console.log('캐시에서 결과 반환');
            return cache[key];
        }
        
        console.log('함수 실행 및 결과 캐싱');
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

// 피보나치 수열 계산 함수 (메모이제이션 없이는 매우 비효율적)
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 메모이제이션된 fibonacci 함수
const memoizedFibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.log('memoizedFibonacci(10):', memoizedFibonacci(10)); // 함수는 각 값에 대해 한 번만 실행됨
console.log('memoizedFibonacci(10) 다시 호출:', memoizedFibonacci(10)); // 캐시에서 결과 반환

/**
 * 실습 완료 후 생각해보기:
 * 1. 클로저는 어떤 상황에서 가장 유용하게 사용될 수 있을까요?
 * 2. 클로저를 사용할 때 메모리 관리에 주의해야 할 점은 무엇인가요?
 * 3. 전역 스코프 오염을 방지하기 위해 클로저를 어떻게 활용할 수 있을까요?
 * 4. 클로저와 프로토타입 상속 중 어떤 방식이 더 적합한 상황이 있을까요?
 */ 