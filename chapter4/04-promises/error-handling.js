// error-handling.js - Promise 에러 처리 방법

/**
 * Promise 에러 처리
 * 
 * Promise에서 발생하는 에러를 효과적으로 처리하는 방법에 대해 알아봅니다.
 * 적절한 에러 처리는 안정적인 비동기 코드를 작성하는 데 필수적입니다.
 */

console.log('==== Promise 에러 처리 ====');

// 1. 기본 에러 처리 (.catch 사용)
console.log('\n--- 기본 에러 처리 (.catch 사용) ---');

// 에러가 발생할 수 있는 Promise 생성
function fetchData(shouldSucceed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve('데이터 로드 성공!');
            } else {
                // reject 함수로 에러 객체 전달
                reject(new Error('데이터 로드 실패!'));
            }
        }, 1000);
    });
}

// 성공 케이스
fetchData(true)
    .then(data => {
        console.log('성공:', data);
    })
    .catch(error => {
        // 이 블록은 실행되지 않음
        console.error('에러 발생:', error.message);
    });

// 실패 케이스
fetchData(false)
    .then(data => {
        // 이 블록은 실행되지 않음
        console.log('성공:', data);
    })
    .catch(error => {
        console.error('에러 발생:', error.message);
    });

// 2. Promise 체인에서의 에러 전파
console.log('\n--- Promise 체인에서의 에러 전파 ---');

// then 체인 중간에서 에러가 발생하는 예제
fetchData(true)
    .then(data => {
        console.log('첫 번째 then:', data);
        return fetchData(false); // 이 Promise는 reject됨
    })
    .then(data => {
        // 이 블록은 실행되지 않음 (이전 Promise가 reject됨)
        console.log('두 번째 then:', data);
        return '다음 데이터';
    })
    .then(data => {
        // 이 블록도 실행되지 않음
        console.log('세 번째 then:', data);
    })
    .catch(error => {
        // 체인 어디에서든 발생한 에러를 여기서 처리
        console.error('체인 에러 발생:', error.message);
    });

// 3. 에러 처리 후 체인 계속하기
console.log('\n--- 에러 처리 후 체인 계속하기 ---');

fetchData(false) // 일부러 실패하는 Promise
    .then(data => {
        console.log('이 코드는 실행되지 않음');
        return '다음 데이터';
    })
    .catch(error => {
        console.error('에러 처리:', error.message);
        // 에러 발생 시 기본값 반환하여 체인 계속
        return '기본 복구 데이터';
    })
    .then(data => {
        // catch 후에도 체인 계속
        console.log('에러 복구 후 계속:', data); // '기본 복구 데이터' 출력
        return data.toUpperCase();
    })
    .then(data => {
        console.log('최종 데이터:', data); // '기본 복구 데이터' 대문자로 출력
    });

// 4. finally 사용하기
console.log('\n--- finally 사용하기 ---');

// 성공하든 실패하든 항상 실행되는 코드를 위한 finally
fetchData(true)
    .then(data => {
        console.log('성공했을 때:', data);
    })
    .catch(error => {
        console.error('실패했을 때:', error.message);
    })
    .finally(() => {
        // 성공이든 실패든 항상 실행
        console.log('성공/실패 여부와 관계없이 항상 실행됨 (로딩 표시기 제거 등)');
    });

// 5. 다양한 에러 유형 처리하기
console.log('\n--- 다양한 에러 유형 처리하기 ---');

// 다양한 에러 유형을 발생시키는 함수
function fetchWithVariousErrors(errorType) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (errorType) {
                case 'network':
                    reject(new Error('네트워크 에러: 서버에 연결할 수 없습니다.'));
                    break;
                case 'auth':
                    const authError = new Error('인증 에러: 권한이 없습니다.');
                    authError.code = 403;
                    reject(authError);
                    break;
                case 'notfound':
                    const notFoundError = new Error('찾을 수 없음: 요청한 리소스가 존재하지 않습니다.');
                    notFoundError.code = 404;
                    reject(notFoundError);
                    break;
                default:
                    resolve('데이터 로드 성공!');
            }
        }, 1000);
    });
}

// 에러 타입에 따른 다른 처리
function handleApiRequest(errorType) {
    console.log(`API 요청 시작 (에러 타입: ${errorType})`);
    
    fetchWithVariousErrors(errorType)
        .then(data => {
            console.log('API 응답 성공:', data);
        })
        .catch(error => {
            // 에러 객체의 속성을 검사하여 다른 처리 가능
            if (error.code === 403) {
                console.error('권한 에러 발생! 로그인 페이지로 리다이렉트...');
            } else if (error.code === 404) {
                console.error('리소스를 찾을 수 없습니다. 다른 리소스를 검색하세요.');
            } else if (error.message.includes('네트워크')) {
                console.error('네트워크 문제가 발생했습니다. 인터넷 연결을 확인하세요.');
            } else {
                console.error('알 수 없는 에러 발생:', error.message);
            }
        })
        .finally(() => {
            console.log('API 요청 처리 완료');
        });
}

// 다양한 에러 타입 테스트
setTimeout(() => handleApiRequest('success'), 500);
setTimeout(() => handleApiRequest('network'), 2500);
setTimeout(() => handleApiRequest('auth'), 4500);
setTimeout(() => handleApiRequest('notfound'), 6500);

// 6. throw를 사용한 에러 발생 및 처리
console.log('\n--- throw를 사용한 에러 발생 및 처리 ---');

fetchData(true)
    .then(data => {
        console.log('데이터 수신:', data);
        
        // 조건에 따른 에러 발생
        const randomValue = Math.random();
        if (randomValue < 0.5) {
            throw new Error('처리 중 무작위 에러 발생!');
        }
        
        return '처리된 데이터';
    })
    .then(processedData => {
        console.log('최종 처리 결과:', processedData);
    })
    .catch(error => {
        // Promise reject 에러와 throw된 에러 모두 여기서 처리
        console.error('에러 처리됨:', error.message);
    });

// 7. 비동기 함수 내부에서 에러 처리하기
console.log('\n--- 비동기 함수 내부에서 에러 처리하기 ---');

// 내부에서 에러를 처리하는 함수
function fetchWithInternalErrorHandling() {
    return new Promise((resolve, reject) => {
        fetchData(false) // 의도적으로 실패하는 Promise
            .then(data => {
                resolve('내부 성공: ' + data);
            })
            .catch(error => {
                // 내부에서 에러 처리 후 성공 응답
                console.log('내부에서 에러 처리:', error.message);
                resolve('내부 에러 처리 후 복구된 데이터');
            });
        
        // 참고: 위 코드는 이렇게 작성할 수도 있음
        // fetchData(false)
        //     .then(data => 내부 성공: ' + data)
        //     .catch(error => '내부 에러 처리 후 복구된 데이터')
        //     .then(resolve);
    });
}

// 사용
fetchWithInternalErrorHandling()
    .then(result => {
        console.log('최종 결과:', result); // '내부 에러 처리 후 복구된 데이터' 출력
    })
    .catch(error => {
        // 이 블록은 실행되지 않음 (내부에서 에러가 이미 처리됨)
        console.error('외부 에러 처리:', error.message);
    });

// 8. unhandledrejection 이벤트로 처리되지 않은 거부 감지하기
console.log('\n--- 처리되지 않은 거부 감지하기 ---');

console.log('브라우저 환경에서 처리되지 않은 Promise 거부를 감지하는 방법:');
console.log(`
window.addEventListener('unhandledrejection', event => {
    console.warn('처리되지 않은 Promise 거부:', event.reason);
    // 기본 동작 방지 (콘솔에 에러 표시되지 않게)
    event.preventDefault();
});

// Node.js 환경에서는:
process.on('unhandledRejection', (reason, promise) => {
    console.warn('처리되지 않은 Promise 거부:', reason);
});
`);

/**
 * Promise 에러 처리 요약:
 * 
 * 1. .catch()를 사용하여 Promise 거부를 처리합니다.
 * 2. Promise 체인에서 발생한 모든 에러는 가장 가까운 .catch()로 전파됩니다.
 * 3. .catch() 이후에도 체인을 계속할 수 있습니다.
 * 4. .finally()를 사용하여 성공/실패 여부와 관계없이 코드를 실행할 수 있습니다.
 * 5. 에러 객체에 추가 정보를 담아 다양한 유형의 에러를 구분하여 처리할 수 있습니다.
 * 6. .then() 핸들러 내에서 throw를 사용하여 에러를 발생시킬 수 있습니다.
 * 7. Promise 내부에서 에러를 처리하여 항상 성공 상태로 해결할 수 있습니다.
 * 8. 처리되지 않은 거부를 감지하는 이벤트를 사용하여 놓친 에러를 처리할 수 있습니다.
 */ 