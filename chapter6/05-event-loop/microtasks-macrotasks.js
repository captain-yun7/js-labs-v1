// microtasks-macrotasks.js - 마이크로태스크와 매크로태스크

/**
 * JavaScript의 마이크로태스크(Microtasks)와 매크로태스크(Macrotasks)
 * 
 * JavaScript의 이벤트 루프는 두 가지 유형의 태스크 큐를 관리합니다:
 * 1. 마이크로태스크 큐 (Microtask Queue): Promise 콜백 등 높은 우선순위 작업
 * 2. 태스크 큐 (Task Queue 또는 Macrotask Queue): setTimeout, 이벤트 콜백 등 일반 작업
 */

console.log('==== JavaScript 마이크로태스크와 매크로태스크 ====');

// 1. 마이크로태스크와 매크로태스크의 차이
console.log('\n--- 마이크로태스크와 매크로태스크의 차이 ---');

console.log('1. 스크립트 시작 (매크로태스크)');

// 매크로태스크 (태스크 큐에 들어감)
setTimeout(() => {
    console.log('4. setTimeout 콜백 (매크로태스크)');
}, 0);

// 마이크로태스크 (마이크로태스크 큐에 들어감)
Promise.resolve().then(() => {
    console.log('3. Promise 콜백 (마이크로태스크)');
});

console.log('2. 스크립트 종료 (매크로태스크)');

/**
 * 실행 순서:
 * 1. 현재 매크로태스크(스크립트) 실행 (1, 2)
 * 2. 마이크로태스크 큐의 모든 작업 처리 (3)
 * 3. 다음 매크로태스크 처리 (4)
 */

// 2. 마이크로태스크 종류
console.log('\n--- 마이크로태스크 종류 ---');

/**
 * 대표적인 마이크로태스크:
 * - Promise.then/catch/finally 콜백
 * - queueMicrotask() 콜백
 * - MutationObserver 콜백
 * - process.nextTick() (Node.js 환경)
 */

console.log('마이크로태스크 예제:');

console.log('1. 시작');

// Promise.then
Promise.resolve().then(() => {
    console.log('2. Promise.then 콜백');
});

// queueMicrotask
queueMicrotask(() => {
    console.log('3. queueMicrotask 콜백');
});

// process.nextTick (Node.js 환경)
if (typeof process !== 'undefined' && process.nextTick) {
    process.nextTick(() => {
        console.log('(Node.js) process.nextTick 콜백');
    });
}

console.log('4. 종료');

// 3. 매크로태스크 종류
console.log('\n--- 매크로태스크 종류 ---');

/**
 * 대표적인 매크로태스크:
 * - 스크립트 실행
 * - setTimeout/setInterval 콜백
 * - setImmediate 콜백 (Node.js 환경)
 * - requestAnimationFrame 콜백 (브라우저 환경)
 * - I/O 작업 (네트워크 요청, 파일 읽기 등)
 * - UI 렌더링 및 이벤트 핸들러 (브라우저 환경)
 */

console.log('매크로태스크 예제:');

console.log('1. 시작');

// setTimeout
setTimeout(() => {
    console.log('3. setTimeout 콜백');
}, 0);

// setImmediate (Node.js 환경)
if (typeof setImmediate !== 'undefined') {
    setImmediate(() => {
        console.log('(Node.js) setImmediate 콜백');
    });
}

console.log('2. 종료');

// 4. 마이크로태스크 큐가 비워지는 시점
console.log('\n--- 마이크로태스크 큐가 비워지는 시점 ---');

console.log('1. 스크립트 시작');

// 첫 번째 매크로태스크 (setTimeout)
setTimeout(() => {
    console.log('5. 첫 번째 setTimeout 콜백 (매크로태스크)');
    
    // 이 Promise는 현재 매크로태스크 후 처리됨
    Promise.resolve().then(() => {
        console.log('6. setTimeout 내부의 Promise 콜백 (마이크로태스크)');
    });
    
    // 새로운 매크로태스크 예약
    setTimeout(() => {
        console.log('8. 중첩된 setTimeout 콜백 (매크로태스크)');
    }, 0);
}, 0);

// 첫 번째 마이크로태스크
Promise.resolve().then(() => {
    console.log('3. 첫 번째 Promise 콜백 (마이크로태스크)');
    
    // 두 번째 마이크로태스크 (현재 마이크로태스크 사이클에 포함)
    Promise.resolve().then(() => {
        console.log('4. 두 번째 Promise 콜백 (마이크로태스크)');
    });
});

// 두 번째 매크로태스크
setTimeout(() => {
    console.log('7. 두 번째 setTimeout 콜백 (매크로태스크)');
}, 0);

console.log('2. 스크립트 종료');

/**
 * 실행 순서:
 * 1. 현재 매크로태스크(스크립트) 실행 (1, 2)
 * 2. 마이크로태스크 큐 처리 (3 -> 4)
 * 3. 첫 번째 매크로태스크(setTimeout) 처리 (5)
 * 4. 마이크로태스크 큐 처리 (6)
 * 5. 두 번째 매크로태스크(setTimeout) 처리 (7)
 * 6. 세 번째 매크로태스크(중첩된 setTimeout) 처리 (8)
 */

// 5. 무한 마이크로태스크 생성의 위험성
console.log('\n--- 무한 마이크로태스크 생성의 위험성 ---');

let microTaskCounter = 0;

function scheduleLimitedMicroTasks() {
    console.log('마이크로태스크 예약 시작');
    
    // 마이크로태스크를 생성하는 함수
    function createMicroTask() {
        microTaskCounter++;
        console.log(`마이크로태스크 #${microTaskCounter} 실행`);
        
        // 제한된 수의 마이크로태스크만 생성
        if (microTaskCounter < 5) {
            // 다음 마이크로태스크 예약 (현재 마이크로태스크 사이클에 추가됨)
            Promise.resolve().then(createMicroTask);
        } else {
            console.log('마이크로태스크 생성 중단');
        }
    }
    
    // 첫 번째 마이크로태스크 예약
    Promise.resolve().then(createMicroTask);
    
    console.log('다음 코드가 실행되지만, 모든 마이크로태스크가 완료된 후에야 다음 매크로태스크가 실행됩니다.');
}

scheduleLimitedMicroTasks();

// 위험한 패턴 (주석 처리됨):
/*
function createInfiniteMicroTasks() {
    Promise.resolve().then(() => {
        console.log('이 마이크로태스크는 계속해서 새로운 마이크로태스크를 생성합니다.');
        createInfiniteMicroTasks(); // 무한 재귀 호출
    });
}
// createInfiniteMicroTasks(); // 실행하지 마세요! 브라우저가 응답하지 않게 됩니다.
*/

// 다음 매크로태스크
setTimeout(() => {
    console.log('모든 마이크로태스크 처리 후 매크로태스크 실행');
}, 0);

// 6. process.nextTick vs setImmediate (Node.js)
console.log('\n--- process.nextTick vs setImmediate (Node.js) ---');

function nodeJsQueueExample() {
    console.log('Node.js에서의 큐 우선순위 예제:');
    
    // Node.js 환경인지 확인
    if (typeof process === 'undefined' || typeof setImmediate === 'undefined') {
        console.log('이 예제는 Node.js 환경에서만 제대로 작동합니다.');
        return;
    }
    
    console.log('1. 스크립트 시작');
    
    // setImmediate: 현재 이벤트 루프 단계 이후 (check 단계에서 실행)
    setImmediate(() => {
        console.log('5. setImmediate 콜백');
    });
    
    // setTimeout(0): 타이머 단계에서 실행 (대략적으로 setImmediate와 비슷한 시점)
    setTimeout(() => {
        console.log('4. setTimeout(0) 콜백');
    }, 0);
    
    // nextTick: 현재 작업 직후, 다른 모든 마이크로태스크보다 먼저 실행
    process.nextTick(() => {
        console.log('2. process.nextTick 콜백');
    });
    
    // Promise: nextTick 다음, 다른 매크로태스크 이전
    Promise.resolve().then(() => {
        console.log('3. Promise 콜백');
    });
    
    console.log('Node.js에서 process.nextTick은 가장 높은 우선순위를 가집니다.');
}

nodeJsQueueExample();

// 7. 이벤트 루프의 완전한 흐름
console.log('\n--- 이벤트 루프의 완전한 흐름 ---');

/**
 * 브라우저 환경에서 이벤트 루프의 전체 사이클:
 * 
 * 1. 현재 매크로태스크 실행 (스크립트, 이벤트 콜백 등)
 * 2. 마이크로태스크 큐의 모든 작업 실행
 * 3. UI 렌더링 업데이트 (필요한 경우)
 * 4. requestAnimationFrame 콜백 실행
 * 5. 다음 매크로태스크 실행
 * 6. 반복
 */

function eventLoopCompleteFlow() {
    console.log('완전한 이벤트 루프 흐름 예제:');
    
    console.log('1. 스크립트 시작');
    
    // 매크로태스크
    setTimeout(() => {
        console.log('6. setTimeout 콜백 (매크로태스크)');
        
        // 내부 마이크로태스크
        Promise.resolve().then(() => {
            console.log('7. setTimeout 내부의 Promise 콜백 (마이크로태스크)');
        });
    }, 0);
    
    // 마이크로태스크
    Promise.resolve().then(() => {
        console.log('3. Promise 콜백 (마이크로태스크)');
        
        // 또 다른 내부 마이크로태스크
        queueMicrotask(() => {
            console.log('4. 중첩된 queueMicrotask 콜백 (마이크로태스크)');
            
            // 복잡한 계산 시뮬레이션
            const start = Date.now();
            while (Date.now() - start < 50) {
                // 50ms 동안 실행
            }
        });
    });
    
    // requestAnimationFrame (브라우저 환경에서만 작동)
    if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => {
            console.log('5. requestAnimationFrame 콜백 (렌더링 전)');
        });
    } else {
        console.log('(requestAnimationFrame은 브라우저 환경에서만 사용 가능)');
    }
    
    console.log('2. 스크립트 종료');
}

eventLoopCompleteFlow();

// 8. 실제 활용 사례
console.log('\n--- 실제 활용 사례 ---');

// 마이크로태스크를 활용한 DOM 변경 후 측정
function domMeasurementExample() {
    console.log('DOM 변경 후 측정 예제 (브라우저 환경):');
    
    /**
     * 브라우저에서:
     * 
     * // DOM 변경
     * element.style.width = '500px';
     * 
     * // 변경 즉시 측정하면 잘못된 값을 얻을 수 있음
     * console.log(element.offsetWidth); // 이전 값 반환 가능
     * 
     * // 대신 마이크로태스크를 사용하여 DOM 업데이트 후 측정
     * Promise.resolve().then(() => {
     *     console.log(element.offsetWidth); // 업데이트된 값
     * });
     */
    
    console.log('브라우저 환경에서 DOM 변경 후 측정 시에는 마이크로태스크를 활용하세요.');
}

domMeasurementExample();

// 매크로태스크를 활용한 무거운 작업 분할
function heavyTaskSplitting() {
    console.log('무거운 작업 분할 예제:');
    
    // 처리할 대용량 데이터
    const items = new Array(1000).fill(0).map((_, i) => i);
    const batchSize = 100; // 한 번에 처리할 항목 수
    const results = [];
    
    console.log(`${items.length}개 항목을 ${batchSize}개씩 처리`);
    
    // 배치 처리 함수
    function processBatch(startIndex) {
        // 현재 배치 처리
        const endIndex = Math.min(startIndex + batchSize, items.length);
        
        console.log(`배치 처리: ${startIndex}~${endIndex - 1}`);
        
        // 무거운 처리 시뮬레이션
        for (let i = startIndex; i < endIndex; i++) {
            results.push(items[i] * 2);
        }
        
        // 모든 항목을 처리했는지 확인
        if (endIndex < items.length) {
            // 다음 배치를 매크로태스크로 예약 (UI 차단 방지)
            setTimeout(() => {
                processBatch(endIndex);
            }, 0);
        } else {
            // 모든 처리 완료
            console.log(`처리 완료: ${results.length}개 항목`);
        }
    }
    
    // 첫 번째 배치 처리 시작
    processBatch(0);
    
    console.log('배치 처리가 백그라운드에서 계속됩니다...');
}

heavyTaskSplitting();

/**
 * 마이크로태스크와 매크로태스크 활용 가이드:
 * 
 * 마이크로태스크 사용 시기:
 * 1. 현재 작업 직후 즉시 실행이 필요한 경우
 * 2. DOM 변경 후 측정이 필요한 경우
 * 3. 여러 비동기 결과를 하나의 업데이트로 모으고 싶을 때
 * 
 * 매크로태스크 사용 시기:
 * 1. 무거운 계산 작업을 더 작은 단위로 나눌 때
 * 2. 현재 이벤트 루프 사이클 완료 후 작업을 연기할 때
 * 3. UI 렌더링이 필요한 경우 (브라우저에서)
 * 
 * 주의사항:
 * - 무한 마이크로태스크 생성을 피하세요 (UI 차단)
 * - 실행 순서에 의존하는 코드를 작성할 때는 큐의 우선순위를 이해해야 합니다
 * - 브라우저와 Node.js 환경에서 일부 동작 차이가 있음을 기억하세요
 */ 