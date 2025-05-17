// event-loop-basics.js - 이벤트 루프 기본 개념

/**
 * JavaScript 이벤트 루프 기본 개념
 * 
 * 이벤트 루프는 JavaScript가 비동기 작업을 처리하는 메커니즘입니다.
 * JavaScript는 단일 스레드 언어이지만, 이벤트 루프를 통해
 * 비차단(non-blocking) 방식으로 비동기 작업을 처리합니다.
 */

console.log('==== JavaScript 이벤트 루프 기본 개념 ====');

// 1. 동기 코드와 비동기 코드의 실행 순서
console.log('\n--- 동기 코드와 비동기 코드 ---');

console.log('1. 스크립트 시작');

// setTimeout은 비동기 작업을 나타냅니다
setTimeout(() => {
    console.log('4. setTimeout 콜백 실행 (0ms 지연)');
}, 0);

console.log('2. 중간 지점');

// Promise.resolve().then()도 비동기 작업입니다 (마이크로태스크)
Promise.resolve().then(() => {
    console.log('3. Promise 콜백 실행');
});

console.log('5. 스크립트 종료');

/**
 * 위 코드의 실행 결과:
 * 1. 스크립트 시작
 * 2. 중간 지점
 * 5. 스크립트 종료
 * 3. Promise 콜백 실행
 * 4. setTimeout 콜백 실행 (0ms 지연)
 * 
 * 순서 설명:
 * 1. 먼저 모든 동기 코드가 실행됩니다 (1, 2, 5).
 * 2. 그 다음 마이크로태스크 큐의 작업이 실행됩니다 (3).
 * 3. 마지막으로 태스크 큐의 작업이 실행됩니다 (4).
 */

// 2. 이벤트 루프 구성 요소
console.log('\n--- 이벤트 루프 구성 요소 ---');

/**
 * 이벤트 루프 주요 구성 요소:
 * 
 * 1. 콜 스택(Call Stack): 함수 호출이 쌓이는 스택
 * 2. 힙(Heap): 객체가 할당되는 메모리 영역
 * 3. 태스크 큐(Task Queue): 비동기 콜백(setTimeout 등)이 저장되는 큐
 * 4. 마이크로태스크 큐(Microtask Queue): Promise 콜백 등이 저장되는 큐
 * 5. 웹 API: setTimeout, fetch, DOM 이벤트 등
 */

// 이벤트 루프 동작 시뮬레이션
function main() {
    console.log('A: main 함수 시작');
    
    setTimeout(() => {
        console.log('D: setTimeout 콜백');
    }, 0);
    
    new Promise((resolve) => {
        console.log('B: Promise 내부 (동기 코드)');
        resolve();
    }).then(() => {
        console.log('C: Promise.then 콜백');
    });
    
    console.log('E: main 함수 종료');
}

// main 함수 실행
main();

/**
 * main 함수 실행 결과:
 * A: main 함수 시작
 * B: Promise 내부 (동기 코드)
 * E: main 함수 종료
 * C: Promise.then 콜백
 * D: setTimeout 콜백
 */

// 3. 중첩된 이벤트 루프 동작
console.log('\n--- 중첩된 이벤트 루프 동작 ---');

console.log('1단계: 스크립트 시작');

setTimeout(() => {
    console.log('5단계: 첫 번째 setTimeout 콜백');
    
    Promise.resolve().then(() => {
        console.log('6단계: 첫 번째 setTimeout 내부의 Promise 콜백');
    });
    
    setTimeout(() => {
        console.log('8단계: 중첩된 setTimeout 콜백');
    }, 0);
}, 0);

Promise.resolve().then(() => {
    console.log('3단계: 첫 번째 Promise 콜백');
    
    setTimeout(() => {
        console.log('7단계: Promise 내부의 setTimeout 콜백');
    }, 0);
    
    Promise.resolve().then(() => {
        console.log('4단계: 중첩된 Promise 콜백');
    });
});

console.log('2단계: 스크립트 종료');

/**
 * 중첩된 이벤트 루프 동작 실행 결과:
 * 1단계: 스크립트 시작
 * 2단계: 스크립트 종료
 * 3단계: 첫 번째 Promise 콜백
 * 4단계: 중첩된 Promise 콜백
 * 5단계: 첫 번째 setTimeout 콜백
 * 6단계: 첫 번째 setTimeout 내부의 Promise 콜백
 * 7단계: Promise 내부의 setTimeout 콜백
 * 8단계: 중첩된 setTimeout 콜백
 */

// 4. 이벤트 루프와 렌더링
console.log('\n--- 이벤트 루프와 렌더링 ---');

/**
 * 브라우저 환경에서 이벤트 루프는 다음과 같은 순서로 작동합니다:
 * 
 * 1. 태스크 실행
 * 2. 모든 마이크로태스크 실행
 * 3. 렌더링 업데이트 (필요한 경우)
 * 4. 다음 태스크 실행
 * 
 * 브라우저의 requestAnimationFrame은 다음 렌더링 직전에 실행됩니다.
 */

// 브라우저 환경 예제 (Node.js에서는 작동하지 않음)
function browserExample() {
    console.log('브라우저 환경에서 이벤트 루프와 렌더링 예제:');
    
    /*
    console.log('1. 스크립트 시작');
    
    // 태스크 큐에 추가
    setTimeout(() => {
        console.log('5. setTimeout 콜백');
    }, 0);
    
    // 마이크로태스크 큐에 추가
    Promise.resolve().then(() => {
        console.log('3. Promise 콜백');
    });
    
    // 렌더링 직전에 실행
    requestAnimationFrame(() => {
        console.log('4. rAF 콜백');
    });
    
    console.log('2. 스크립트 종료');
    */
    
    console.log('Node.js 환경에서는 위 예제가 작동하지 않습니다.');
    console.log('브라우저 환경에서 실행 시 순서: 1 -> 2 -> 3 -> 4 -> 5');
}

browserExample();

// 5. 이벤트 루프 작동 원리 요약
console.log('\n--- 이벤트 루프 작동 원리 요약 ---');

/**
 * 이벤트 루프는 다음과 같은 순서로 작동합니다:
 * 
 * 1. 콜 스택에서 모든 동기 코드를 실행합니다.
 * 2. 콜 스택이 비었을 때, 마이크로태스크 큐의 모든 작업을 처리합니다.
 * 3. 마이크로태스크 큐가 비었을 때, 태스크 큐에서 하나의 태스크를 가져와 실행합니다.
 * 4. 다시 마이크로태스크 큐의 모든 작업을 처리합니다.
 * 5. 브라우저 환경에서는 필요하다면 렌더링을 업데이트합니다.
 * 6. 위 과정을 반복합니다.
 */

console.log('이벤트 루프는 JavaScript가 단일 스레드이면서도');
console.log('비동기 작업을 효과적으로 처리할 수 있게 해주는 핵심 메커니즘입니다.');

// 6. Node.js 환경에서의 이벤트 루프 (참고)
console.log('\n--- Node.js 환경에서의 이벤트 루프 ---');

/**
 * Node.js의 이벤트 루프는 libuv 라이브러리를 기반으로 하며,
 * 브라우저의 이벤트 루프와 약간 다른 단계를 가집니다:
 * 
 * 1. timers: setTimeout, setInterval 콜백 실행
 * 2. pending callbacks: 일부 시스템 작업 콜백 실행
 * 3. idle, prepare: 내부적으로 사용
 * 4. poll: I/O 이벤트 가져오기 및 처리
 * 5. check: setImmediate 콜백 실행
 * 6. close callbacks: 종료 이벤트 콜백 실행
 * 
 * 또한, process.nextTick()은 각 단계 사이에 실행되는 특별한 마이크로태스크입니다.
 */

console.log('Node.js 환경에서만 사용 가능한 API:');
console.log('- process.nextTick(): 다른 모든 마이크로태스크보다 먼저 실행됩니다.');
console.log('- setImmediate(): 현재 이벤트 루프 주기의 마지막에 실행됩니다.');

// 예시 출력 (실제로 실행되지는 않음)
console.log('Node.js 예제 실행 순서:');
console.log('1. 동기 코드 -> 2. process.nextTick -> 3. Promise -> 4. setTimeout -> 5. setImmediate');

/**
 * 이벤트 루프 활용 팁:
 * 
 * 1. 무거운 계산 작업은 작은 단위로 나누어 비동기로 처리하세요.
 * 2. 마이크로태스크가 너무 많으면 태스크 큐 작업이 지연될 수 있습니다.
 * 3. 중첩된 setTimeout보다 requestAnimationFrame을 활용하면 렌더링과 동기화할 수 있습니다.
 * 4. 이벤트 핸들러 내부에서 DOM 조작 후 결과를 읽을 때는 마이크로태스크를 활용하세요.
 * 5. Node.js에서 CPU 집약적인 작업은 워커 스레드를 고려하세요.
 */ 