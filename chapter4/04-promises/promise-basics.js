// promise-basics.js - Promise 기본 개념과 생성 방법

/**
 * Promise 기본 개념
 * 
 * Promise는 비동기 작업의 최종 완료(또는 실패)와 그 결과값을 나타내는 객체입니다.
 * 비동기 작업을 더 쉽게 처리할 수 있도록 도와주는 JavaScript 기능입니다.
 */

console.log('==== Promise 기본 개념 ====');

// 1. Promise 생성하기
console.log('\n--- Promise 생성하기 ---');

// Promise 생성자는 실행 함수(executor)를 인자로 받습니다.
// 실행 함수는 resolve와 reject 두 개의 함수를 매개변수로 받습니다.
const simplePromise = new Promise((resolve, reject) => {
    // 비동기 작업 수행 (여기서는 간단한 타이머 사용)
    console.log('Promise 내부 코드 실행 시작');
    
    setTimeout(() => {
        const success = true; // 성공 여부 (예시용)
        
        if (success) {
            // 작업 성공 시 resolve 호출
            resolve('작업 성공!');
        } else {
            // 작업 실패 시 reject 호출
            reject(new Error('작업 실패!'));
        }
    }, 1000); // 1초 후 완료
    
    console.log('Promise 내부 코드 실행 완료 (타이머는 백그라운드에서 계속 실행)');
});

console.log('Promise 생성 완료 (아직 결과를 기다리는 중)');

// Promise 사용하기
simplePromise
    .then((result) => {
        // resolve된 값이 result로 전달됨
        console.log('Promise 성공:', result);
    })
    .catch((error) => {
        // reject된 값이 error로 전달됨
        console.error('Promise 실패:', error.message);
    })
    .finally(() => {
        // 성공이든 실패든 항상 실행
        console.log('Promise 처리 완료');
    });

console.log('Promise 처리 등록 완료 (비동기 결과를 기다리는 중)');

// 2. Promise 상태
console.log('\n--- Promise 상태 ---');

// 대기(pending) 상태 Promise
const pendingPromise = new Promise((resolve, reject) => {
    // 의도적으로 resolve나 reject를 호출하지 않음
    setTimeout(() => {
        console.log('이 타이머는 실행되지만 Promise 상태는 변경되지 않음');
    }, 3000);
});

console.log('pendingPromise 상태:', pendingPromise);

// 이행(fulfilled) 상태 Promise
const fulfilledPromise = Promise.resolve('이미 성공한 Promise');
console.log('fulfilledPromise 상태:', fulfilledPromise);

fulfilledPromise.then(result => {
    console.log('이미 이행된 Promise 결과:', result);
});

// 거부(rejected) 상태 Promise
const rejectedPromise = Promise.reject(new Error('이미 실패한 Promise'));
console.log('rejectedPromise 상태:', rejectedPromise);

rejectedPromise.catch(error => {
    console.error('이미 거부된 Promise 에러:', error.message);
});

// 3. 비동기 작업 시뮬레이션
console.log('\n--- 비동기 작업 시뮬레이션 ---');

// 서버에서 데이터를 가져오는 작업을 시뮬레이션하는 함수
function fetchUserData(userId) {
    console.log(`사용자 ${userId} 데이터 요청 시작...`);
    
    return new Promise((resolve, reject) => {
        // 서버 요청을 시뮬레이션하는 타이머
        setTimeout(() => {
            // 80%의 확률로 성공, 20%의 확률로 실패
            if (Math.random() < 0.8) {
                const userData = {
                    id: userId,
                    name: `사용자${userId}`,
                    email: `user${userId}@example.com`,
                    isPremium: userId % 2 === 0
                };
                console.log(`사용자 ${userId} 데이터 수신 성공`);
                resolve(userData);
            } else {
                console.log(`사용자 ${userId} 데이터 수신 실패`);
                reject(new Error(`사용자 ${userId} 데이터를 가져오는데 실패했습니다.`));
            }
        }, 2000); // 2초 소요
    });
}

// 사용자 데이터 가져오기
fetchUserData(123)
    .then(user => {
        console.log('사용자 정보:', user);
        
        // 프리미엄 사용자인 경우 추가 정보 표시
        if (user.isPremium) {
            console.log(`${user.name}님은 프리미엄 사용자입니다!`);
        }
    })
    .catch(error => {
        console.error('에러 발생:', error.message);
        console.log('기본 사용자 정보를 대신 표시합니다.');
    })
    .finally(() => {
        console.log('사용자 데이터 처리 완료');
    });

// 4. Promise 즉시 생성 헬퍼 함수
console.log('\n--- Promise 즉시 생성 헬퍼 함수 ---');

// 즉시 성공하는 Promise
const successPromise = Promise.resolve('성공 데이터');
successPromise.then(data => console.log('즉시 성공:', data));

// 즉시 실패하는 Promise
const failurePromise = Promise.reject(new Error('실패 이유'));
failurePromise.catch(error => console.log('즉시 실패:', error.message));

// 5. 여러 개의 .then 핸들러
console.log('\n--- 여러 개의 .then 핸들러 ---');

const multiHandlerPromise = Promise.resolve('초기 데이터');

// 여러 개의 .then을 등록할 수 있음 (각각 독립적으로 실행)
multiHandlerPromise.then(data => {
    console.log('첫 번째 핸들러:', data);
    return '수정된 데이터'; // 이 값은 아래 핸들러에 영향을 주지 않음
});

multiHandlerPromise.then(data => {
    console.log('두 번째 핸들러:', data); // 여전히 '초기 데이터' 출력
});

/**
 * Promise 요약:
 * 
 * 1. Promise는 비동기 작업의 결과를 나타내는 객체
 * 2. 세 가지 상태를 가짐: 대기(pending), 이행(fulfilled), 거부(rejected)
 * 3. Promise 생성자는 실행 함수(executor)를 인자로 받음
 * 4. 실행 함수는 resolve와 reject 콜백을 매개변수로 받음
 * 5. .then()으로 성공 시 처리, .catch()로 실패 시 처리, .finally()로 공통 처리
 * 6. Promise.resolve()와 Promise.reject()로 즉시 이행/거부된 Promise 생성 가능
 */ 