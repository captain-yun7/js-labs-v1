// async-basics.js - Async/Await 기본 구문

/**
 * Async/Await 기본 개념
 * 
 * async/await는 Promise를 더 쉽게 사용할 수 있게 해주는 ES2017(ES8) 문법입니다.
 * 비동기 코드를 동기 코드처럼 보이게 만들어 가독성과 유지보수성을 향상시킵니다.
 */

console.log('==== Async/Await 기본 개념 ====');

// 1. async 함수 기본
console.log('\n--- async 함수 기본 ---');

// async 함수는 항상 Promise를 반환합니다
async function helloAsync() {
    return '안녕하세요!'; // 문자열을 반환하지만 Promise로 감싸짐
}

// async 함수 호출 및 결과 확인
console.log('async 함수 호출 전');
helloAsync().then(message => {
    console.log(`async 함수 반환값: ${message}`);
});
console.log('async 함수 호출 후 (비동기 처리)');

// 화살표 함수로 async 함수 정의
const helloAsyncArrow = async () => {
    return '화살표 함수로 만든 async 함수입니다!';
};

helloAsyncArrow().then(message => {
    console.log(message);
});

// async 함수가 Promise를 반환하는 것 증명
console.log('helloAsync()의 반환값 타입:', helloAsync() instanceof Promise);

// 2. await 키워드 사용하기
console.log('\n--- await 키워드 사용하기 ---');

// 지연을 시뮬레이션하는 함수
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// await를 사용하여 Promise 결과 기다리기
async function delayedGreeting() {
    console.log('인사말 시작');
    
    // await는 Promise가 처리될 때까지 함수 실행을 일시 중지
    await delay(1000); // 1초 대기
    console.log('1초 후..');
    
    await delay(1000); // 1초 더 대기
    console.log('2초 후..');
    
    return '인사말 완료!';
}

// async 함수 호출
console.log('delayedGreeting 함수 호출 전');
delayedGreeting().then(message => {
    console.log(message);
});
console.log('delayedGreeting 함수 호출 후 (함수는 백그라운드에서 실행 중)');

// 3. await의 반환값
console.log('\n--- await의 반환값 ---');

// 결과를 반환하는 Promise 함수
function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: '홍길동',
                email: 'hong@example.com'
            });
        }, 1000);
    });
}

// await로 Promise 결과값 받기
async function displayUserData() {
    console.log('사용자 데이터 요청 중...');
    
    // await는 Promise의 결과값을 반환
    const userData = await fetchData();
    
    console.log('사용자 데이터 수신 완료:');
    console.log(`ID: ${userData.id}`);
    console.log(`이름: ${userData.name}`);
    console.log(`이메일: ${userData.email}`);
}

displayUserData();

// 4. async 함수 내에서만 await 사용 가능
console.log('\n--- async 함수 내에서만 await 사용 가능 ---');

// 올바른 사용: async 함수 내에서 await 사용
async function correctUse() {
    const result = await fetchData();
    return result;
}

// 잘못된 사용: 일반 함수에서 await 사용 시도 (에러 발생)
/*
function incorrectUse() {
    const result = await fetchData(); // SyntaxError: await is only valid in async functions
    return result;
}
*/

console.log('await는 반드시 async 함수 내에서만 사용해야 합니다.');

// 5. await 체이닝
console.log('\n--- await 체이닝 ---');

// 연속적인 비동기 작업을 시뮬레이션하는 함수들
function fetchUserProfile(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: '김철수',
                role: '관리자'
            });
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, title: '첫 번째 게시물' },
                { id: 2, title: '두 번째 게시물' }
            ]);
        }, 1000);
    });
}

// await를 사용한 연속적인 비동기 작업
async function loadUserData() {
    console.log('사용자 프로필 로딩 중...');
    
    // 첫 번째 await - 사용자 프로필 가져오기
    const profile = await fetchUserProfile(123);
    console.log('프로필 로드 완료:', profile);
    
    // 두 번째 await - 해당 사용자의 게시물 가져오기
    console.log(`${profile.name}의 게시물 로딩 중...`);
    const posts = await fetchUserPosts(profile.id);
    console.log('게시물 로드 완료:', posts);
    
    return {
        profile,
        posts
    };
}

// 함수 호출 및 최종 결과 처리
loadUserData().then(data => {
    console.log('모든 사용자 데이터 로드 완료:', data);
});

// 6. async 함수의 반환값
console.log('\n--- async 함수의 반환값 ---');

// 다양한 값을 반환하는 async 함수들
async function returnString() {
    return '문자열 반환';
}

async function returnObject() {
    return { message: '객체 반환' };
}

async function returnPromise() {
    return Promise.resolve('이미 존재하는 Promise 반환');
}

async function returnPromiseReject() {
    return Promise.reject('거부된 Promise 반환');
}

// 각 함수 호출 및 결과 처리
returnString().then(result => console.log('1.', result));
returnObject().then(result => console.log('2.', result));
returnPromise().then(result => console.log('3.', result));
returnPromiseReject().catch(error => console.log('4. 에러:', error));

/**
 * Async/Await 요약:
 * 
 * 1. async 함수는 항상 Promise를 반환합니다.
 * 2. await는 Promise가 처리될 때까지 함수 실행을 일시 중지합니다.
 * 3. await는 Promise의 결과값을 반환합니다.
 * 4. await는 async 함수 내에서만 사용할 수 있습니다.
 * 5. async/await를 사용하면 비동기 코드를 동기 코드처럼 작성할 수 있습니다.
 */ 