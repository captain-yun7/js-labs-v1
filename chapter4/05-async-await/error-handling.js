// error-handling.js - Async/Await 에러 처리

/**
 * Async/Await 에러 처리
 * 
 * async/await를 사용할 때의 에러 처리 패턴을 알아봅니다.
 * Promise의 rejection을 처리하는 여러 방법과 적절한 에러 처리 패턴을 배웁니다.
 */

console.log('==== Async/Await 에러 처리 ====');

// 1. 기본적인 try-catch 에러 처리
console.log('\n--- 기본적인 try-catch 에러 처리 ---');

// 가끔 실패하는 Promise를 시뮬레이션하는 함수
function fetchWithError(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error('데이터를 가져오는데 실패했습니다.'));
            } else {
                resolve({ id: 1, name: '홍길동' });
            }
        }, 1000);
    });
}

// try-catch를 사용한 에러 처리
async function fetchDataWithTryCatch(shouldFail) {
    try {
        console.log('데이터 요청 중...');
        const data = await fetchWithError(shouldFail);
        console.log('데이터 수신 성공:', data);
        return data;
    } catch (error) {
        console.error('에러 발생:', error.message);
        // 기본값 반환, 로깅, 또는 다시 throw 가능
        return { id: null, name: '기본 사용자' };
    }
}

// 성공 케이스
fetchDataWithTryCatch(false).then(data => {
    console.log('최종 결과 (성공):', data);
});

// 실패 케이스
setTimeout(() => {
    fetchDataWithTryCatch(true).then(data => {
        console.log('최종 결과 (실패 후 복구):', data);
    });
}, 2000);

// 2. Promise.catch와의 비교
console.log('\n--- Promise.catch와의 비교 ---');

// Promise 체인을 사용한 에러 처리
function promiseErrorHandling(shouldFail) {
    console.log('Promise 체인으로 데이터 요청 중...');
    
    return fetchWithError(shouldFail)
        .then(data => {
            console.log('Promise 체인: 데이터 수신 성공:', data);
            return data;
        })
        .catch(error => {
            console.error('Promise 체인: 에러 발생:', error.message);
            return { id: null, name: '기본 사용자 (Promise)' };
        });
}

// async/await를 사용한 에러 처리
async function asyncErrorHandling(shouldFail) {
    console.log('async/await로 데이터 요청 중...');
    
    try {
        const data = await fetchWithError(shouldFail);
        console.log('async/await: 데이터 수신 성공:', data);
        return data;
    } catch (error) {
        console.error('async/await: 에러 발생:', error.message);
        return { id: null, name: '기본 사용자 (async)' };
    }
}

// 두 방식 모두 테스트
setTimeout(() => {
    promiseErrorHandling(true).then(data => {
        console.log('Promise 최종 결과:', data);
    });
    
    asyncErrorHandling(true).then(data => {
        console.log('async/await 최종 결과:', data);
    });
}, 4000);

// 3. 다양한 에러 처리 패턴
console.log('\n--- 다양한 에러 처리 패턴 ---');

// 에러를 다시 던지는 패턴
async function rethrowError() {
    try {
        console.log('데이터 요청 중 (rethrow 패턴)...');
        const data = await fetchWithError(true);
        return data;
    } catch (error) {
        console.error('에러 발생 및 다시 던짐:', error.message);
        
        // 에러를 확장하여 다시 던짐
        const enhancedError = new Error(`향상된 에러: ${error.message}`);
        enhancedError.originalError = error;
        enhancedError.timestamp = new Date();
        
        throw enhancedError;
    }
}

// 에러를 다시 던지는 함수 호출
setTimeout(() => {
    rethrowError()
        .then(data => {
            console.log('이 부분은 실행되지 않습니다.');
        })
        .catch(error => {
            console.error('최종 에러 처리:', error.message);
            console.error('타임스탬프:', error.timestamp);
        });
}, 6000);

// 4. 함수 범위 밖에서의 에러 처리
console.log('\n--- 함수 범위 밖에서의 에러 처리 ---');

// try-catch 없이 async 함수 내에서 오류 발생
async function noTryCatch() {
    console.log('try-catch 없는 함수 실행 중...');
    
    // 이 함수는 내부에서 에러를 처리하지 않음
    const data = await fetchWithError(true);
    return data;
}

// 외부에서 .catch()로 에러 처리
setTimeout(() => {
    console.log('외부 .catch()로 에러 처리:');
    
    noTryCatch()
        .then(data => {
            console.log('이 부분은 실행되지 않습니다.');
        })
        .catch(error => {
            console.error('외부에서 에러 처리됨:', error.message);
        });
}, 8000);

// 5. 여러 await 문에서의 에러 처리
console.log('\n--- 여러 await 문에서의 에러 처리 ---');

// 연속적인 비동기 작업을 시뮬레이션하는 함수들
function step1(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error('1단계 실패'));
            } else {
                resolve('1단계 완료');
            }
        }, 500);
    });
}

function step2(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error('2단계 실패'));
            } else {
                resolve('2단계 완료');
            }
        }, 500);
    });
}

function step3(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error('3단계 실패'));
            } else {
                resolve('3단계 완료');
            }
        }, 500);
    });
}

// 여러 await 문을 포함하는 함수
async function multipleAwait(failStep = 0) {
    try {
        console.log('다단계 프로세스 시작...');
        
        const result1 = await step1(failStep === 1);
        console.log(result1);
        
        const result2 = await step2(failStep === 2);
        console.log(result2);
        
        const result3 = await step3(failStep === 3);
        console.log(result3);
        
        return '모든 단계 완료';
    } catch (error) {
        console.error(`다단계 프로세스 실패: ${error.message}`);
        return `실패: ${error.message}`;
    }
}

// 다양한 실패 시나리오 테스트
setTimeout(() => {
    multipleAwait(0).then(result => console.log('성공 케이스:', result));
}, 10000);

setTimeout(() => {
    multipleAwait(2).then(result => console.log('2단계 실패 케이스:', result));
}, 12000);

// 6. 각 await에 대한 개별 에러 처리
console.log('\n--- 각 await에 대한 개별 에러 처리 ---');

async function individualErrorHandling() {
    console.log('개별 에러 처리 시작...');
    
    // 1단계
    let result1;
    try {
        result1 = await step1(true);
        console.log(result1);
    } catch (error) {
        console.error(`1단계 에러: ${error.message}`);
        result1 = '1단계 복구됨';
    }
    
    // 2단계 - 이전 단계가 실패해도 계속 진행
    let result2;
    try {
        result2 = await step2(true);
        console.log(result2);
    } catch (error) {
        console.error(`2단계 에러: ${error.message}`);
        result2 = '2단계 복구됨';
    }
    
    // 3단계
    let result3;
    try {
        result3 = await step3(false);
        console.log(result3);
    } catch (error) {
        console.error(`3단계 에러: ${error.message}`);
        result3 = '3단계 복구됨';
    }
    
    return `결과: ${result1}, ${result2}, ${result3}`;
}

// 개별 에러 처리 테스트
setTimeout(() => {
    individualErrorHandling().then(finalResult => {
        console.log('모든 단계 완료 (일부 에러 복구):', finalResult);
    });
}, 14000);

// 7. finally 블록 사용하기
console.log('\n--- finally 블록 사용하기 ---');

async function withFinally(shouldFail) {
    let resource = null;
    
    console.log('리소스 획득 및 작업 시작...');
    
    try {
        // 리소스 획득 (데이터베이스 연결 등을 시뮬레이션)
        resource = { id: 'db-connection-123', isOpen: true };
        console.log('리소스 획득됨:', resource);
        
        // 작업 수행 (성공 또는 실패)
        const data = await fetchWithError(shouldFail);
        console.log('작업 완료:', data);
        
        return data;
    } catch (error) {
        console.error('작업 실패:', error.message);
        throw error; // 에러를 상위로 전파
    } finally {
        // 성공 또는 실패 여부와 관계없이 항상 실행
        if (resource && resource.isOpen) {
            resource.isOpen = false;
            console.log('리소스 해제됨:', resource);
        }
    }
}

// finally 블록 테스트
setTimeout(() => {
    console.log('\n성공 케이스 (finally 포함):');
    withFinally(false)
        .then(result => console.log('결과:', result))
        .catch(error => console.error('최종 에러:', error.message));
}, 16000);

setTimeout(() => {
    console.log('\n실패 케이스 (finally 포함):');
    withFinally(true)
        .then(result => console.log('이 부분은 실행되지 않습니다.'))
        .catch(error => console.error('최종 에러:', error.message));
}, 18000);

/**
 * Async/Await 에러 처리 요약:
 * 
 * 1. try/catch 블록을 사용하여 await 표현식의 에러를 처리할 수 있습니다.
 * 2. 함수 내에서 에러 처리를 하지 않으면, Promise 체인의 .catch()로 처리할 수 있습니다.
 * 3. 에러를 확장하거나 변환해서 다시 던질 수 있습니다.
 * 4. 여러 await 표현식에 대해 하나의 try/catch 블록으로 모두 처리하거나,
 *    개별적인 try/catch 블록으로 각각 처리할 수 있습니다.
 * 5. finally 블록을 사용하여 결과와 상관없이 리소스를 정리할 수 있습니다.
 */ 