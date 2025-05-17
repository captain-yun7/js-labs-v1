// sync-vs-async.js - 동기와 비동기 코드의 차이점

/**
 * 동기 vs 비동기 프로그래밍
 * 
 * 이 파일에서는 JavaScript에서 동기 코드와 비동기 코드의 차이점을 
 * 다양한 예제를 통해 알아봅니다.
 */

console.log('==== 동기 vs 비동기 코드 ====');

// 1. 동기 코드 실행
console.log('\n--- 동기 코드 실행 순서 ---');
console.log('1. 첫 번째 작업 시작');
console.log('2. 첫 번째 작업 완료');
console.log('3. 두 번째 작업 시작');
console.log('4. 두 번째 작업 완료');
console.log('5. 세 번째 작업 시작');
console.log('6. 세 번째 작업 완료');

// 2. 비동기 코드 실행
console.log('\n--- 비동기 코드 실행 순서 ---');
console.log('1. 첫 번째 작업 시작');
console.log('2. 첫 번째 작업 완료');

setTimeout(() => {
    console.log('5. 비동기 작업 완료 (2초 후)');
}, 2000);

console.log('3. 두 번째 작업 시작 (비동기 작업을 기다리지 않음)');
console.log('4. 두 번째 작업 완료');

// 3. 동기 방식의 대기 시뮬레이션 (블로킹)
console.log('\n--- 동기 방식의 대기 (블로킹) ---');

// 동기 방식으로 시간 지연을 구현하는 함수 (실제로는 이렇게 사용하지 않음)
function sleepSync(milliseconds) {
    console.log(`${milliseconds}ms 동안 대기 시작...`);
    const startTime = new Date().getTime();
    
    // 지정된 시간동안 루프를 돌며 블로킹
    while (new Date().getTime() < startTime + milliseconds) {
        // 아무것도 하지 않고 CPU 자원만 소모
    }
    
    console.log(`${milliseconds}ms 대기 완료!`);
}

console.log('동기 방식 대기 전');
sleepSync(3000); // 3초 동안 모든 JavaScript 실행이 멈춤 (브라우저가 응답하지 않을 수 있음)
console.log('동기 방식 대기 후 (3초 경과)');

// 4. 비동기 방식의 대기 시뮬레이션 (논블로킹)
console.log('\n--- 비동기 방식의 대기 (논블로킹) ---');

function sleepAsync(milliseconds) {
    console.log(`${milliseconds}ms 동안 비동기 대기 시작...`);
    
    setTimeout(() => {
        console.log(`${milliseconds}ms 비동기 대기 완료!`);
    }, milliseconds);
}

console.log('비동기 방식 대기 전');
sleepAsync(3000); // 3초 후에 콜백 실행, 그동안 다른 코드는 계속 실행됨
console.log('비동기 방식 대기 "후" (대기가 완료되지 않았지만 다음 코드가 실행됨)');

// 5. 실제 사용 사례 - 파일 처리 시뮬레이션
console.log('\n--- 실제 사용 사례: 파일 처리 ---');

// 실제 파일 처리를 시뮬레이션하는 함수들
function readFileSync(filename) {
    console.log(`${filename} 파일을 동기적으로 읽는 중...`);
    sleepSync(2000); // 파일 읽기에 2초 소요된다고 가정
    return `${filename}의 내용: Lorem ipsum dolor sit amet`;
}

function readFileAsync(filename, callback) {
    console.log(`${filename} 파일을 비동기적으로 읽는 중...`);
    
    setTimeout(() => {
        const content = `${filename}의 내용: Lorem ipsum dolor sit amet`;
        callback(content);
    }, 2000); // 파일 읽기에 2초 소요된다고 가정
}

// 동기 방식 파일 읽기 (블로킹)
console.log('\n- 동기 방식 파일 읽기:');
console.log('파일 읽기 전');
const syncContent = readFileSync('sample.txt');
console.log(syncContent);
console.log('파일 읽기 후 (다른 작업은 파일을 모두 읽은 후에만 실행됨)');

// 비동기 방식 파일 읽기 (논블로킹)
console.log('\n- 비동기 방식 파일 읽기:');
console.log('파일 읽기 전');
readFileAsync('sample.txt', (content) => {
    console.log(content);
    console.log('파일 읽기 완료 후 콜백 내부');
});
console.log('파일 읽기 "후" (파일을 읽는 동안 다른 작업이 실행됨)');

// 6. 여러 개의 비동기 작업 처리하기
console.log('\n--- 여러 개의 비동기 작업 ---');

setTimeout(() => console.log('3초 타이머 완료'), 3000);
setTimeout(() => console.log('1초 타이머 완료'), 1000);
setTimeout(() => console.log('2초 타이머 완료'), 2000);

console.log('타이머 세팅 완료. 이제 타이머들이 각자의 시간에 완료됩니다.');

/**
 * 동기 vs 비동기 요약:
 * 
 * 동기(Synchronous) 코드:
 * - 순차적으로 실행되며 한 작업이 완료될 때까지 다음 작업이 대기
 * - 코드 실행 흐름이 직관적이고 예측하기 쉬움
 * - 시간이 오래 걸리는 작업은 전체 프로그램을 블로킹함
 * 
 * 비동기(Asynchronous) 코드:
 * - 작업의 완료를 기다리지 않고 다음 코드를 실행
 * - 작업이 완료되면 콜백함수를 통해 결과 처리
 * - 시간이 오래 걸리는 작업도 다른 코드 실행을 방해하지 않음 (논블로킹)
 * - 실행 순서가 코드의 작성 순서와 다를 수 있어 주의 필요
 * 
 * JavaScript에서 비동기 작업이 필요한 경우:
 * - 네트워크 요청 (API 호출, 파일 다운로드 등)
 * - 파일 읽기/쓰기
 * - 타이머 및 간격 설정
 * - 사용자 입력 대기
 */ 