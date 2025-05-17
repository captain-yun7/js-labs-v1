// task-queue.js - 태스크 큐와 비동기 실행

/**
 * JavaScript 태스크 큐(Task Queue)와 비동기 실행
 * 
 * 태스크 큐는 비동기적으로 실행될 콜백 함수들이 대기하는 큐입니다.
 * 이벤트 루프는 콜 스택이 비었을 때 태스크 큐에서 콜백을 꺼내 실행합니다.
 */

console.log('==== JavaScript 태스크 큐와 비동기 실행 ====');

// 1. 태스크 큐 기본 동작
console.log('\n--- 태스크 큐 기본 동작 ---');

console.log('1. 스크립트 시작');

// setTimeout은 콜백을 태스크 큐에 추가합니다
setTimeout(() => {
    console.log('4. 첫 번째 콜백 실행 (0ms 지연)');
}, 0);

setTimeout(() => {
    console.log('5. 두 번째 콜백 실행 (0ms 지연)');
}, 0);

console.log('2. 중간 지점');
console.log('3. 스크립트 종료');

/**
 * 태스크 큐 실행 흐름:
 * 1. 동기 코드가 먼저 실행됨 (1, 2, 3)
 * 2. 콜 스택이 비면 태스크 큐의 태스크를 하나씩 실행 (4, 5)
 */

// 2. 태스크 큐 실행 순서
console.log('\n--- 태스크 큐 실행 순서 ---');

// 지연 시간이 있는 setTimeout
console.log('태스크 예약 시작');

setTimeout(() => {
    console.log('세 번째로 실행 (1000ms 지연)');
}, 1000);

setTimeout(() => {
    console.log('두 번째로 실행 (500ms 지연)');
}, 500);

setTimeout(() => {
    console.log('첫 번째로 실행 (0ms 지연)');
}, 0);

console.log('태스크 예약 완료');

/**
 * 태스크 큐는 FIFO(First In, First Out) 구조이지만,
 * setTimeout의 지연 시간에 따라 태스크가 큐에 들어가는 순서가 결정됩니다.
 */

// 3. 브라우저 렌더링과 태스크 큐
console.log('\n--- 브라우저 렌더링과 태스크 큐 ---');

// 브라우저 환경에서 실행 시 렌더링 사이클과 태스크 실행 관계
function renderingExample() {
    console.log('브라우저 환경에서의 렌더링과 태스크 실행:');
    
    /*
    // 브라우저 환경에서만 실행 가능한 코드
    console.log('1. DOM 조작 시작');
    
    // 첫 번째 DOM 변경
    document.body.style.backgroundColor = 'red';
    
    // setTimeout으로 다음 태스크 예약
    setTimeout(() => {
        console.log('4. 태스크 큐의 콜백에서 DOM 변경');
        document.body.style.backgroundColor = 'blue';
    }, 0);
    
    // 두 번째 DOM 변경 (첫 번째 렌더링 사이클에 포함됨)
    console.log('2. 추가 DOM 조작');
    document.body.style.color = 'white';
    
    // 복잡한 계산으로 현재 태스크 지연
    console.log('3. 복잡한 계산 수행 중...');
    const start = Date.now();
    while (Date.now() - start < 1000) {
        // 1초 동안 실행 (브라우저 차단)
    }
    */
    
    console.log('Node.js 환경에서는 위 예제가 작동하지 않습니다.');
    console.log('브라우저에서는 다음과 같은 순서로 실행됩니다:');
    console.log('1. DOM 조작 시작');
    console.log('2. 추가 DOM 조작');
    console.log('3. 복잡한 계산 수행 중...');
    console.log('-- 첫 번째 렌더링 (배경색: 빨강, 글자색: 흰색) --');
    console.log('4. 태스크 큐의 콜백에서 DOM 변경');
    console.log('-- 두 번째 렌더링 (배경색: 파랑) --');
}

renderingExample();

// 4. 네트워크 요청과 태스크 큐
console.log('\n--- 네트워크 요청과 태스크 큐 ---');

function networkRequestExample() {
    console.log('네트워크 요청 예제:');
    
    console.log('1. 요청 전');
    
    // 비동기 네트워크 요청 시뮬레이션
    function fakeNetworkRequest(url, callback) {
        console.log(`2. ${url}에 요청 보냄`);
        
        // setTimeout으로 네트워크 지연 시뮬레이션
        setTimeout(() => {
            console.log(`4. ${url}에서 응답 받음`);
            callback({ data: '서버 데이터', timestamp: Date.now() });
        }, 2000);
    }
    
    fakeNetworkRequest('https://api.example.com/data', (response) => {
        console.log('5. 응답 처리:', response);
    });
    
    console.log('3. 요청 후 다른 작업 계속');
}

networkRequestExample();

// 5. 여러 비동기 작업 조합하기
console.log('\n--- 여러 비동기 작업 조합하기 ---');

function multipleAsyncTasks() {
    console.log('여러 비동기 작업 조합:');
    
    // 비동기 작업 1: 데이터 가져오기
    setTimeout(() => {
        console.log('1. 첫 번째 비동기 작업 완료: 데이터 가져옴');
        const data = { id: 1, name: '제품 A' };
        
        // 비동기 작업 2: 가져온 데이터로 다른 요청
        setTimeout(() => {
            console.log(`2. 두 번째 비동기 작업 완료: ${data.name}의 상세정보 가져옴`);
            const details = { price: 1000, stock: 50 };
            
            // 비동기 작업 3: 결과 처리
            setTimeout(() => {
                console.log('3. 세 번째 비동기 작업 완료: 데이터 처리');
                const result = {
                    ...data,
                    ...details,
                    total: details.price * details.stock
                };
                console.log('최종 결과:', result);
            }, 500);
        }, 1000);
    }, 1000);
    
    // 위 코드는 "콜백 지옥(Callback Hell)"의 예입니다.
    // Promise나 async/await를 사용하면 이런 중첩을 해결할 수 있습니다.
}

multipleAsyncTasks();

// 6. 콜백 지옥 해결하기 (Promise 사용)
console.log('\n--- Promise로 콜백 지옥 해결하기 ---');

function promiseExample() {
    console.log('Promise 사용 예제:');
    
    // Promise로 비동기 작업 래핑
    function fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('1. 데이터 가져옴');
                resolve({ id: 1, name: '제품 A' });
            }, 1000);
        });
    }
    
    function fetchDetails(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`2. ${data.name}의 상세정보 가져옴`);
                resolve({ 
                    ...data, 
                    price: 1000, 
                    stock: 50 
                });
            }, 1000);
        });
    }
    
    function processResult(details) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('3. 데이터 처리');
                resolve({
                    ...details,
                    total: details.price * details.stock
                });
            }, 500);
        });
    }
    
    // Promise 체이닝으로 깔끔하게 표현
    fetchData()
        .then(data => fetchDetails(data))
        .then(details => processResult(details))
        .then(result => {
            console.log('최종 결과:', result);
        });
    
    console.log('Promise 체인 설정 완료 (비동기 작업 시작)');
}

promiseExample();

// 7. async/await로 비동기 코드 작성하기
console.log('\n--- async/await로 비동기 코드 작성하기 ---');

// async/await를 사용한 비동기 함수
async function asyncAwaitExample() {
    console.log('async/await 사용 예제:');
    
    // Promise 반환 함수들 (위에서 정의한 함수와 동일)
    function fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('1. 데이터 가져옴');
                resolve({ id: 1, name: '제품 A' });
            }, 1000);
        });
    }
    
    function fetchDetails(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`2. ${data.name}의 상세정보 가져옴`);
                resolve({ 
                    ...data, 
                    price: 1000, 
                    stock: 50 
                });
            }, 1000);
        });
    }
    
    function processResult(details) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('3. 데이터 처리');
                resolve({
                    ...details,
                    total: details.price * details.stock
                });
            }, 500);
        });
    }
    
    try {
        console.log('비동기 작업 시작');
        
        // await로 각 Promise 결과 기다림 (동기 코드처럼 보임)
        const data = await fetchData();
        const details = await fetchDetails(data);
        const result = await processResult(details);
        
        console.log('최종 결과:', result);
        console.log('모든 비동기 작업 완료');
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

// 비동기 함수 실행
asyncAwaitExample();
console.log('async 함수 호출 후 즉시 실행되는 코드');

// 8. 태스크 큐와 마이크로태스크 큐의 우선순위
console.log('\n--- 태스크 큐와 마이크로태스크 큐의 우선순위 ---');

console.log('태스크 큐(Task Queue)와 마이크로태스크 큐(Microtask Queue)의 우선순위:');

console.log('1. 스크립트 시작');

// 태스크 큐에 추가
setTimeout(() => {
    console.log('5. 태스크 큐: setTimeout 콜백');
}, 0);

// 마이크로태스크 큐에 추가
Promise.resolve().then(() => {
    console.log('3. 마이크로태스크 큐: 첫 번째 Promise 콜백');
    
    // 중첩된 마이크로태스크 (현재 마이크로태스크 사이클에 추가됨)
    Promise.resolve().then(() => {
        console.log('4. 마이크로태스크 큐: 중첩된 Promise 콜백');
    });
});

// 또 다른 태스크 큐에 추가
setTimeout(() => {
    console.log('6. 태스크 큐: 두 번째 setTimeout 콜백');
    
    // setTimeout 내부의 Promise (새로운 마이크로태스크 사이클)
    Promise.resolve().then(() => {
        console.log('7. 마이크로태스크 큐: setTimeout 내부의 Promise 콜백');
    });
}, 0);

console.log('2. 스크립트 종료');

/**
 * 실행 순서:
 * 1. 스크립트 시작 (동기)
 * 2. 스크립트 종료 (동기)
 * 3. 첫 번째 Promise 콜백 (마이크로태스크)
 * 4. 중첩된 Promise 콜백 (마이크로태스크)
 * 5. 첫 번째 setTimeout 콜백 (태스크)
 * 6. 두 번째 setTimeout 콜백 (태스크)
 * 7. setTimeout 내부의 Promise 콜백 (마이크로태스크)
 * 
 * 주요 규칙:
 * - 마이크로태스크 큐는 태스크 큐보다 우선순위가 높습니다.
 * - 각 태스크 후에 마이크로태스크 큐를 모두 비웁니다.
 * - 마이크로태스크가 다른 마이크로태스크를 예약하면 현재 사이클에서 실행됩니다.
 */

/**
 * 태스크 큐 관련 모범 사례:
 * 
 * 1. 무거운 계산은 작은 태스크로 나누어 UI 차단을 방지하세요.
 * 2. 즉각적인 응답이 필요한 작업은 Promise(마이크로태스크)를 사용하세요.
 * 3. Promise 체이닝 또는 async/await로 콜백 지옥을 방지하세요.
 * 4. setTimeout(0)은 현재 태스크 이후로 작업을 지연시키는 데 사용할 수 있습니다.
 * 5. 브라우저에서는 애니메이션 작업에 requestAnimationFrame을 사용하세요.
 */ 