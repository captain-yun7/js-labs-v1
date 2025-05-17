// practice.js - 이벤트 루프 실습

/**
 * JavaScript 이벤트 루프 실습
 * 
 * 이 파일은 이벤트 루프의 작동 원리와 비동기 코드의 실행 순서를 이해하기 위한
 * 다양한 실습 과제를 제공합니다.
 */

console.log('==== JavaScript 이벤트 루프 실습 ====');

// 실습 1: 실행 순서 예측하기
console.log('\n--- 실습 1: 실행 순서 예측하기 ---');

/**
 * 다음 코드의 실행 순서를 예측해보세요.
 * 주석으로 예상 순서를 작성한 후, 실행하여 확인해보세요.
 */

function orderPrediction() {
    console.log('예상 실행 순서를 주석으로 작성해보세요:');
    /*
    * 1. console.log('1. 시작');
    * 2. console.log('2. 동기 코드');
    * 4. console.log('3. Promise 콜백');
    * 5. console.log('4. Promise 내부의 Promise 콜백');
    * 3. console.log('5. 종료');
    * 6. console.log('6. setTimeout 0ms');
    * 7. console.log('7. setTimeout 0ms 내부의 Promise');
    * 8. console.log('8. setTimeout 10ms');
    */
    
    console.log('\n실제 실행:');
    
    console.log('1. 시작');
    
    setTimeout(() => {
        console.log('6. setTimeout 0ms');
        
        Promise.resolve().then(() => {
            console.log('7. setTimeout 0ms 내부의 Promise');
        });
    }, 0);
    
    setTimeout(() => {
        console.log('8. setTimeout 10ms');
    }, 10);
    
    console.log('2. 동기 코드');
    
    Promise.resolve().then(() => {
        console.log('3. Promise 콜백');
        
        Promise.resolve().then(() => {
            console.log('4. Promise 내부의 Promise 콜백');
        });
    });
    
    console.log('5. 종료');
}

orderPrediction();

// 실습 2: 중첩된 타이머와 Promise
console.log('\n--- 실습 2: 중첩된 타이머와 Promise ---');

/**
 * 복잡한 중첩 구조에서의 실행 순서를 이해합니다.
 * 이 패턴은 마이크로태스크와 매크로태스크의 상호작용을 보여줍니다.
 */

function complexNesting() {
    console.log('A. 스크립트 시작');
    
    setTimeout(() => {
        console.log('B. 첫 번째 setTimeout 콜백');
        
        // 마이크로태스크
        Promise.resolve().then(() => {
            console.log('C. 첫 번째 Promise 콜백');
            
            // 중첩된 매크로태스크
            setTimeout(() => {
                console.log('D. 중첩된 setTimeout 콜백');
            }, 0);
            
            // 중첩된 마이크로태스크
            Promise.resolve().then(() => {
                console.log('E. 중첩된 Promise 콜백');
            });
        });
        
        // 두 번째 매크로태스크
        setTimeout(() => {
            console.log('F. 두 번째 중첩된 setTimeout 콜백');
        }, 0);
    }, 0);
    
    // 외부 마이크로태스크
    Promise.resolve().then(() => {
        console.log('G. 외부 Promise 콜백');
    });
    
    console.log('H. 스크립트 종료');
}

complexNesting();

/**
 * 실행 순서 설명:
 * 1. 'A. 스크립트 시작' (매크로태스크 - 스크립트)
 * 2. 'H. 스크립트 종료' (매크로태스크 - 스크립트)
 * 3. 'G. 외부 Promise 콜백' (마이크로태스크)
 * 4. 'B. 첫 번째 setTimeout 콜백' (매크로태스크)
 * 5. 'C. 첫 번째 Promise 콜백' (마이크로태스크)
 * 6. 'E. 중첩된 Promise 콜백' (마이크로태스크)
 * 7. 'F. 두 번째 중첩된 setTimeout 콜백' (매크로태스크)
 * 8. 'D. 중첩된 setTimeout 콜백' (매크로태스크)
 */

// 실습 3: UI 응답성 유지하기
console.log('\n--- 실습 3: UI 응답성 유지하기 ---');

/**
 * 무거운 작업을 작은 단위로 나누어 UI 응답성을 유지하는 방법을 실습합니다.
 * 브라우저에서는 setTimeout을 사용하여 작업을 분할하면 UI가 차단되지 않습니다.
 */

// 무거운 작업 (동기적으로 실행)
function heavyTaskSync() {
    console.log('무거운 작업 시작 (동기적)');
    
    const result = [];
    const ITERATIONS = 5000000; // 많은 반복 횟수
    
    // 무거운 계산 시뮬레이션
    const startTime = Date.now();
    for (let i = 0; i < ITERATIONS; i++) {
        // 의미 없는 계산 작업
        result.push(Math.sqrt(i) * Math.random());
        
        if (i % 1000000 === 0 && i > 0) {
            console.log(`${i / 1000000}백만 번째 반복 완료`);
        }
    }
    
    const endTime = Date.now();
    console.log(`무거운 작업 완료: ${endTime - startTime}ms 소요`);
    console.log(`결과 배열 길이: ${result.length}`);
}

// 무거운 작업 (비동기적으로 분할 실행)
function heavyTaskAsync() {
    console.log('무거운 작업 시작 (비동기적)');
    
    const result = [];
    const ITERATIONS = 5000000; // 같은 총 반복 횟수
    const CHUNK_SIZE = 500000;  // 한 번에 처리할 단위
    
    // 청크 단위로 처리하는 함수
    function processChunk(start) {
        // 현재 청크의 끝 계산
        const end = Math.min(start + CHUNK_SIZE, ITERATIONS);
        
        // 현재 청크 처리
        for (let i = start; i < end; i++) {
            result.push(Math.sqrt(i) * Math.random());
        }
        
        // 진행 상황 보고
        console.log(`${Math.round(end / ITERATIONS * 100)}% 완료 (${end}/${ITERATIONS})`);
        
        // 모든 처리가 완료되었는지 확인
        if (end < ITERATIONS) {
            // 다음 청크를 다음 이벤트 루프 사이클로 예약
            setTimeout(() => {
                processChunk(end);
            }, 0);
        } else {
            // 모든 처리 완료
            console.log('비동기 무거운 작업 완료');
            console.log(`결과 배열 길이: ${result.length}`);
        }
    }
    
    // 첫 번째 청크 처리 시작
    setTimeout(() => {
        const startTime = Date.now();
        processChunk(0);
        // 참고: 실제 전체 소요 시간은 여기서 측정할 수 없음 (비동기적으로 진행되므로)
    }, 0);
    
    console.log('무거운 작업이 백그라운드에서 진행됩니다. 이 메시지는 즉시 표시됩니다.');
}

// 동기 작업 실행 (주석 처리됨 - 실행 시 오래 걸림)
// heavyTaskSync();

// 비동기 작업 실행
// heavyTaskAsync();

// 실습 4: Promise 체이닝과 마이크로태스크
console.log('\n--- 실습 4: Promise 체이닝과 마이크로태스크 ---');

/**
 * Promise 체이닝이 마이크로태스크 큐에 어떻게 작업을 추가하는지 실습합니다.
 */

function promiseChaining() {
    console.log('Promise 체이닝 시작');
    
    // 시퀀스 생성 헬퍼 함수
    function createSequence(name, delay = 0) {
        return new Promise((resolve) => {
            if (delay > 0) {
                setTimeout(() => {
                    console.log(`${name} 완료 (${delay}ms 후)`);
                    resolve(name);
                }, delay);
            } else {
                console.log(`${name} 완료 (즉시)`);
                resolve(name);
            }
        });
    }
    
    console.log('1. 체인 설정');
    
    // 복잡한 Promise 체인 설정
    createSequence('A', 0)
        .then(result => {
            console.log(`2. A의 then 콜백, 결과: ${result}`);
            return createSequence('B', 100);
        })
        .then(result => {
            console.log(`5. B의 then 콜백, 결과: ${result}`);
            
            // 분기점: 두 개의 병렬 Promise
            const promise1 = createSequence('C1', 0);
            const promise2 = createSequence('C2', 0);
            
            return Promise.all([promise1, promise2]);
        })
        .then(results => {
            console.log(`6. Promise.all 완료, 결과: ${results}`);
            
            // 새로운 마이크로태스크와 매크로태스크 생성
            setTimeout(() => {
                console.log('8. 이전 Promise 체인 내의 setTimeout');
            }, 0);
            
            return createSequence('D', 0);
        })
        .then(result => {
            console.log(`7. D의 then 콜백, 결과: ${result}`);
            console.log('Promise 체인 완료');
        });
    
    // 별도의 Promise
    createSequence('X', 0)
        .then(result => {
            console.log(`3. X의 then 콜백, 결과: ${result}`);
            return 'Y';
        })
        .then(result => {
            console.log(`4. Y의 then 콜백, 결과: ${result}`);
        });
    
    console.log('모든 Promise 체인 설정 완료');
}

promiseChaining();

// 실습 5: async/await와 이벤트 루프
console.log('\n--- 실습 5: async/await와 이벤트 루프 ---');

/**
 * async/await가 이벤트 루프와 어떻게 상호작용하는지 실습합니다.
 * async/await는 내부적으로 Promise를 사용하므로 마이크로태스크에 영향을 줍니다.
 */

function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function asyncExample() {
    console.log('A. async 함수 시작');
    
    // 첫 번째 await (Promise 반환)
    const result1 = await delay(0, 'First');
    console.log(`C. 첫 번째 await 완료: ${result1}`);
    
    // 동기 코드 (이전 await 이후)
    console.log('D. 두 번째 await 전의 동기 코드');
    
    // 두 번째 await (Promise 반환)
    const result2 = await delay(0, 'Second');
    console.log(`F. 두 번째 await 완료: ${result2}`);
    
    // 마지막 동기 코드
    console.log('G. async 함수 종료');
    
    return 'Completed';
}

// async 함수 호출
console.log('시작');
asyncExample().then(result => {
    console.log(`H. async 함수 반환값: ${result}`);
});
console.log('B. async 함수 호출 후 (E. 첫 번째 await 후)');

// 추가 비동기 코드
setTimeout(() => {
    console.log('I. 일반 setTimeout 콜백');
}, 0);

/**
 * 실행 순서 설명:
 * 1. '시작'
 * 2. 'A. async 함수 시작'
 * 3. 'B. async 함수 호출 후 (E. 첫 번째 await 후)'
 * 4. 'C. 첫 번째 await 완료: First'
 * 5. 'D. 두 번째 await 전의 동기 코드'
 * 6. 'F. 두 번째 await 완료: Second'
 * 7. 'G. async 함수 종료'
 * 8. 'H. async 함수 반환값: Completed'
 * 9. 'I. 일반 setTimeout 콜백'
 */

// 실습 6: 재귀적 setTimeout vs setInterval
console.log('\n--- 실습 6: 재귀적 setTimeout vs setInterval ---');

/**
 * 주기적인 작업을 구현하는 두 가지 방법을 비교하고
 * 이벤트 루프에 미치는 영향을 실습합니다.
 */

function compareTimers() {
    console.log('타이머 비교 시작');
    
    let intervalCount = 0;
    let timeoutCount = 0;
    const MAX_COUNT = 5;
    
    // 1. setInterval 사용 (고정 간격)
    const intervalId = setInterval(() => {
        intervalCount++;
        console.log(`setInterval 호출 #${intervalCount}`);
        
        // 시간이 오래 걸리는 작업 시뮬레이션
        const delay = intervalCount * 10; // 점점 더 오래 걸리도록
        const start = Date.now();
        while (Date.now() - start < delay) {
            // 지연 시뮬레이션
        }
        
        if (intervalCount >= MAX_COUNT) {
            clearInterval(intervalId);
            console.log('setInterval 중지');
        }
    }, 100);
    
    // 2. 재귀적 setTimeout 사용 (동적 간격)
    function recursiveTimeout() {
        timeoutCount++;
        console.log(`재귀적 setTimeout 호출 #${timeoutCount}`);
        
        // 시간이 오래 걸리는 작업 시뮬레이션
        const delay = timeoutCount * 10; // 점점 더 오래 걸리도록
        const start = Date.now();
        while (Date.now() - start < delay) {
            // 지연 시뮬레이션
        }
        
        if (timeoutCount < MAX_COUNT) {
            setTimeout(recursiveTimeout, 100);
        } else {
            console.log('재귀적 setTimeout 중지');
        }
    }
    
    // 재귀적 setTimeout 시작
    setTimeout(recursiveTimeout, 100);
    
    console.log('두 타이머 모두 예약됨');
    
    /**
     * 주요 차이점:
     * - setInterval: 이전 콜백이 완료되지 않았더라도 일정 간격으로 콜백 예약
     * - 재귀적 setTimeout: 이전 콜백이 완료된 후에 다음 콜백 예약
     */
}

// 타이머 비교 실행 (실행 시간이 길어질 수 있음)
// compareTimers();

// 실습 7: 이벤트 리스너와 이벤트 루프
console.log('\n--- 실습 7: 이벤트 리스너와 이벤트 루프 ---');

/**
 * 브라우저 환경에서 이벤트 리스너가 이벤트 루프와 어떻게 상호작용하는지 시뮬레이션합니다.
 * 실제 DOM이 없는 환경에서도 실행할 수 있도록 시뮬레이션만 포함합니다.
 */

function eventListenerSimulation() {
    console.log('이벤트 리스너 시뮬레이션:');
    
    // 이벤트 리스너 시뮬레이션
    function simulateEvent(eventType, delay) {
        setTimeout(() => {
            console.log(`${eventType} 이벤트 발생`);
            
            // 이벤트 핸들러 실행 (매크로태스크)
            console.log(`${eventType} 이벤트 핸들러 실행 시작`);
            
            // 이벤트 핸들러 내에서 Promise 사용
            Promise.resolve().then(() => {
                console.log(`${eventType} 이벤트 핸들러 내 Promise 콜백`);
            });
            
            // 이벤트 핸들러 내에서 setTimeout 사용
            setTimeout(() => {
                console.log(`${eventType} 이벤트 핸들러 내 setTimeout 콜백`);
            }, 0);
            
            console.log(`${eventType} 이벤트 핸들러 실행 완료`);
        }, delay);
    }
    
    // 다양한 이벤트 시뮬레이션
    simulateEvent('click', 100);
    simulateEvent('mousemove', 150);
    simulateEvent('keypress', 50);
    
    console.log('이벤트 시뮬레이션 예약 완료');
    
    /**
     * 브라우저에서 실제 이벤트 리스너는 다음과 같이 작동합니다:
     * 1. 이벤트 발생 시 이벤트 핸들러가 태스크 큐에 추가됨
     * 2. 콜 스택이 비면 이벤트 핸들러가 실행됨
     * 3. 이벤트 핸들러 내의 마이크로태스크는 핸들러 완료 후 즉시 처리됨
     * 4. 이벤트 핸들러 내의 매크로태스크는 다음 이벤트 루프 사이클에서 처리됨
     */
}

eventListenerSimulation();

// 실습 8: 콜백 지옥 탈출하기
console.log('\n--- 실습 8: 콜백 지옥 탈출하기 ---');

/**
 * 콜백 지옥(Callback Hell)에서 벗어나는 방법을 실습합니다.
 * 1. 콜백 중첩 패턴
 * 2. Promise로 변환
 * 3. async/await로 변환
 */

// 비동기 작업 시뮬레이션 함수
function simulateAsyncOperation(data, delay, callback) {
    setTimeout(() => {
        const result = `처리된 ${data} (${delay}ms 소요)`;
        callback(null, result); // 첫 번째 인자는 에러, 두 번째는 결과
    }, delay);
}

// 1. 콜백 지옥 패턴
function callbackHell() {
    console.log('콜백 지옥 패턴:');
    
    simulateAsyncOperation('데이터 1', 100, (err, result1) => {
        if (err) {
            console.error('에러 발생:', err);
            return;
        }
        
        console.log('첫 번째 결과:', result1);
        
        simulateAsyncOperation(result1, 200, (err, result2) => {
            if (err) {
                console.error('에러 발생:', err);
                return;
            }
            
            console.log('두 번째 결과:', result2);
            
            simulateAsyncOperation(result2, 300, (err, result3) => {
                if (err) {
                    console.error('에러 발생:', err);
                    return;
                }
                
                console.log('세 번째 결과:', result3);
                
                // 더 많은 중첩이 계속될 수 있음...
                console.log('콜백 지옥 완료');
            });
        });
    });
}

// 2. Promise로 변환
function promisifiedOperation(data, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = `처리된 ${data} (${delay}ms 소요)`;
            resolve(result);
            // 에러가 발생하면: reject(new Error('에러 메시지'));
        }, delay);
    });
}

function promisePattern() {
    console.log('Promise 패턴:');
    
    promisifiedOperation('데이터 1', 100)
        .then(result1 => {
            console.log('첫 번째 결과:', result1);
            return promisifiedOperation(result1, 200);
        })
        .then(result2 => {
            console.log('두 번째 결과:', result2);
            return promisifiedOperation(result2, 300);
        })
        .then(result3 => {
            console.log('세 번째 결과:', result3);
            console.log('Promise 체인 완료');
        })
        .catch(error => {
            console.error('에러 발생:', error);
        });
}

// 3. async/await 패턴
async function asyncAwaitPattern() {
    console.log('async/await 패턴:');
    
    try {
        const result1 = await promisifiedOperation('데이터 1', 100);
        console.log('첫 번째 결과:', result1);
        
        const result2 = await promisifiedOperation(result1, 200);
        console.log('두 번째 결과:', result2);
        
        const result3 = await promisifiedOperation(result2, 300);
        console.log('세 번째 결과:', result3);
        
        console.log('async/await 완료');
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

// 각 패턴 실행
callbackHell();
setTimeout(() => promisePattern(), 1000);
setTimeout(() => asyncAwaitPattern(), 2000);

/**
 * 추가 실습 아이디어:
 * 
 * 1. 이벤트 루프 시각화: 단순한 애니메이션을 통해 이벤트 루프를 시각화해보세요.
 * 2. 특정 시간 내에 최대한 많은 작업 완료하기: 주어진 시간 내에 효율적으로 작업을 처리하는 방법을 실험해보세요.
 * 3. 웹 워커와 이벤트 루프 상호작용: 웹 워커를 사용하여 메인 스레드의 이벤트 루프를 차단하지 않고 무거운 계산을 수행해보세요.
 * 4. I/O 작업 시뮬레이션: 파일 읽기, 네트워크 요청 등의 I/O 작업을 시뮬레이션하고 이벤트 루프에 미치는 영향을 관찰해보세요.
 * 5. 다양한 비동기 패턴 구현: Generator, Observable 등 다른 비동기 패턴을 구현하고 이벤트 루프와의 관계를 탐색해보세요.
 */ 