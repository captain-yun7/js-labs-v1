// call-stack.js - 호출 스택의 동작 방식

/**
 * JavaScript 호출 스택(Call Stack)
 * 
 * 호출 스택은 JavaScript 엔진이 함수 호출을 추적하는 메커니즘입니다.
 * 코드가 실행되면서 함수가 호출될 때마다 해당 함수는 스택에 쌓이고,
 * 함수 실행이 완료되면 스택에서 제거됩니다.
 */

console.log('==== JavaScript 호출 스택 ====');

// 1. 기본 호출 스택 동작
console.log('\n--- 기본 호출 스택 동작 ---');

// 호출 스택을 시각화하기 위한 함수들
function firstFunction() {
    console.log('첫 번째 함수 실행 중...');
    console.log('Call Stack: main() -> firstFunction()');
    
    secondFunction(); // 다른 함수 호출
    
    console.log('첫 번째 함수 종료');
    console.log('Call Stack: main()');
}

function secondFunction() {
    console.log('두 번째 함수 실행 중...');
    console.log('Call Stack: main() -> firstFunction() -> secondFunction()');
    
    thirdFunction(); // 또 다른 함수 호출
    
    console.log('두 번째 함수 종료');
    console.log('Call Stack: main() -> firstFunction()');
}

function thirdFunction() {
    console.log('세 번째 함수 실행 중...');
    console.log('Call Stack: main() -> firstFunction() -> secondFunction() -> thirdFunction()');
    
    // 가장 깊은 호출 스택
    console.log('세 번째 함수 종료');
    console.log('Call Stack: main() -> firstFunction() -> secondFunction()');
}

// 호출 스택 실행
console.log('프로그램 시작');
console.log('Call Stack: main()');
firstFunction();
console.log('프로그램 종료');

// 2. 호출 스택 오버플로우(Stack Overflow)
console.log('\n--- 호출 스택 오버플로우 ---');

// 재귀 함수를 사용한 호출 스택 오버플로우 예제
function recursiveFunction(count) {
    console.log(`재귀 함수 호출 ${count}`);
    
    // 종료 조건 (실제 호출은 많이 제한)
    if (count >= 10) {
        console.log('재귀 종료!');
        return;
    }
    
    // 재귀 호출 (호출 스택에 새로운 함수 프레임 추가)
    recursiveFunction(count + 1);
    
    console.log(`재귀 함수 ${count} 종료`);
}

// 안전한 예제: 작은 수로 호출
console.log('안전한 재귀 호출 시작');
recursiveFunction(0);
console.log('안전한 재귀 호출 종료');

// 실제 스택 오버플로우는 일어나지 않도록 주석 처리 
console.log('\n실제 스택 오버플로우 예제 (주석 처리됨):');
/*
function stackOverflow(count) {
    // 종료 조건 없는 재귀 호출
    stackOverflow(count + 1);
}

// 이 함수를 호출하면 스택 오버플로우 발생
// stackOverflow(0);
// "RangeError: Maximum call stack size exceeded" 오류 발생
*/

// 3. 비동기 코드와 호출 스택
console.log('\n--- 비동기 코드와 호출 스택 ---');

function asyncExample() {
    console.log('1. asyncExample 함수 시작');
    console.log('Call Stack: main() -> asyncExample()');
    
    // setTimeout은 Web API를 호출하고 스택에서 제거됨
    setTimeout(() => {
        console.log('4. setTimeout 콜백 실행');
        console.log('Call Stack: main() -> setTimeout callback()');
        console.log('setTimeout 콜백 종료');
        console.log('Call Stack: main()');
    }, 0);
    
    console.log('2. setTimeout 이후 코드');
    console.log('Call Stack: main() -> asyncExample()');
    
    console.log('3. asyncExample 함수 종료');
    console.log('Call Stack: main()');
}

asyncExample();

// 4. 호출 스택과 이벤트 루프 상호작용
console.log('\n--- 호출 스택과 이벤트 루프 상호작용 ---');

function eventLoopInteraction() {
    console.log('1. 함수 시작');
    
    // 첫 번째 setTimeout (태스크 큐에 등록)
    setTimeout(() => {
        console.log('5. 첫 번째 setTimeout 콜백');
        console.log('Call Stack: 첫 번째 setTimeout 콜백');
    }, 0);
    
    // Promise (마이크로태스크 큐에 등록)
    Promise.resolve().then(() => {
        console.log('3. Promise 콜백');
        console.log('Call Stack: Promise 콜백');
        
        // Promise 내부에서 setTimeout 호출 (태스크 큐에 등록)
        setTimeout(() => {
            console.log('6. Promise 내부 setTimeout 콜백');
            console.log('Call Stack: Promise 내부 setTimeout 콜백');
        }, 0);
    });
    
    // 두 번째 setTimeout (태스크 큐에 등록)
    setTimeout(() => {
        console.log('4. 두 번째 setTimeout 콜백');
        console.log('Call Stack: 두 번째 setTimeout 콜백');
    }, 0);
    
    console.log('2. 동기 코드 종료');
}

eventLoopInteraction();

// 5. 콜 스택 디버깅 정보
console.log('\n--- 콜 스택 디버깅 정보 ---');

// 에러 발생 시 콜 스택 정보 확인
function functionA() {
    functionB();
}

function functionB() {
    functionC();
}

function functionC() {
    // 일부러 에러를 발생시키지만 캡처하여 스택 정보만 확인
    try {
        // 존재하지 않는 함수 호출
        nonExistentFunction();
    } catch (error) {
        console.log('에러 발생! 콜 스택 정보:');
        console.log(error.stack);
    }
}

functionA();

// 6. 큰 호출 스택을 피하는 기법
console.log('\n--- 큰 호출 스택을 피하는 기법 ---');

// 재귀 함수를 반복적(iterative) 형태로 변환
function recursiveFactorial(n) {
    // 직접적인 재귀 호출 (큰 n에서 스택 오버플로우 위험)
    if (n <= 1) return 1;
    return n * recursiveFactorial(n - 1);
}

function iterativeFactorial(n) {
    // 반복문 사용 (스택 오버플로우 없음)
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log('재귀 팩토리얼(5):', recursiveFactorial(5));
console.log('반복 팩토리얼(5):', iterativeFactorial(5));

// 큰 데이터 처리를 비동기 작업으로 분할
function processLargeDataSync(data) {
    console.log('동기적으로 대용량 데이터 처리 시작...');
    
    // 깊은 호출 스택 생성 (모든 처리가 동기적으로 완료될 때까지 UI 차단)
    let result = 0;
    for (let i = 0; i < data.length; i++) {
        result += data[i];
    }
    
    console.log('동기적 처리 완료, 결과:', result);
    return result;
}

function processLargeDataAsync(data, chunkSize, callback) {
    console.log('비동기적으로 대용량 데이터 처리 시작...');
    
    let result = 0;
    let i = 0;
    
    // 청크 단위로 처리하는 함수
    function processChunk() {
        const end = Math.min(i + chunkSize, data.length);
        
        // 현재 청크 처리
        for (let j = i; j < end; j++) {
            result += data[j];
        }
        
        i = end;
        
        // 더 처리할 데이터가 있으면 다음 이벤트 루프에서 계속
        if (i < data.length) {
            setTimeout(processChunk, 0);
        } else {
            // 모든 처리 완료
            console.log('비동기적 처리 완료, 결과:', result);
            callback(result);
        }
    }
    
    // 첫 번째 청크 처리 시작
    setTimeout(processChunk, 0);
}

// 대용량 데이터 생성
const largeData = new Array(1000).fill(1);

// 동기 처리 (깊은 호출 스택 생성)
processLargeDataSync(largeData);

// 비동기 처리 (얕은 호출 스택 사용)
processLargeDataAsync(largeData, 100, (result) => {
    console.log('비동기 처리 콜백 결과:', result);
});

// 7. 꼬리 호출 최적화(Tail Call Optimization)
console.log('\n--- 꼬리 호출 최적화 ---');

/**
 * 꼬리 호출 최적화(TCO)는 재귀 호출이 함수의 마지막 작업일 때
 * 새로운 스택 프레임을 생성하지 않고 현재 스택 프레임을 재사용하는 최적화 기법입니다.
 * 
 * 참고: ES6에서 규격화되었지만 대부분의 브라우저에서 구현되지 않았습니다.
 * Safari와 일부 JavaScript 엔진만 지원합니다.
 */

// 일반적인 재귀 (꼬리 호출 아님)
function regularRecursiveFib(n) {
    if (n <= 1) return n;
    return regularRecursiveFib(n - 1) + regularRecursiveFib(n - 2); // 꼬리 호출 아님
}

// 꼬리 호출 형태로 변환 (누적값 사용)
function tailRecursiveFib(n, a = 0, b = 1) {
    if (n === 0) return a;
    return tailRecursiveFib(n - 1, b, a + b); // 꼬리 호출
}

console.log('일반 재귀 피보나치(6):', regularRecursiveFib(6));
console.log('꼬리 재귀 피보나치(6):', tailRecursiveFib(6));

/**
 * 호출 스택 관련 모범 사례:
 * 
 * 1. 재귀 함수를 사용할 때는 항상 적절한 종료 조건을 설정하세요.
 * 2. 깊은 재귀 호출이 필요한 경우, 가능하면 반복적인 접근 방식을 고려하세요.
 * 3. 대용량 데이터 처리는 청크 단위로 나누어 비동기적으로 처리하세요.
 * 4. 꼬리 재귀 패턴을 사용하면 일부 환경에서 스택 사용을 최적화할 수 있습니다.
 * 5. 에러 디버깅 시 스택 추적(stack trace)을 활용하여 문제를 파악하세요.
 */