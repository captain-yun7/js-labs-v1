// promise-chaining.js - Promise 체이닝과 값 전달

/**
 * Promise 체이닝(Chaining)
 * 
 * Promise의 가장 강력한 기능 중 하나는 체이닝(chaining)입니다.
 * .then()은 항상 새로운 Promise를 반환하므로, 여러 개의 .then()을 연결하여
 * 비동기 작업을 순차적으로 처리할 수 있습니다.
 */

console.log('==== Promise 체이닝 ====');

// 1. 기본 Promise 체이닝
console.log('\n--- 기본 Promise 체이닝 ---');

// 숫자를 입력받아 1초 후에 1을 더하는 Promise 반환 함수
function addOneAsync(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 숫자가 아닌 값이 전달되면 에러 발생
            if (typeof value !== 'number') {
                reject(new Error('숫자가 아닙니다!'));
                return;
            }
            console.log(`${value} + 1 = ${value + 1}`);
            resolve(value + 1);
        }, 1000);
    });
}

// Promise 체이닝으로 순차적으로 1씩 더하기
console.log('시작 값: 0');

addOneAsync(0)
    .then(result => {
        return addOneAsync(result); // 새로운 Promise 반환
    })
    .then(result => {
        return addOneAsync(result); // 새로운 Promise 반환
    })
    .then(result => {
        console.log('최종 결과:', result);
    })
    .catch(error => {
        console.error('에러 발생:', error.message);
    });

// 2. 화살표 함수로 간결하게 작성
console.log('\n--- 화살표 함수로 간결하게 작성 ---');

console.log('시작 값: 5');

addOneAsync(5)
    .then(result => addOneAsync(result)) // 반환문을 생략한 화살표 함수
    .then(result => addOneAsync(result))
    .then(result => addOneAsync(result))
    .then(result => {
        console.log('최종 결과:', result); // 8 출력
    })
    .catch(error => console.error('에러 발생:', error.message));

// 3. 값 변환하기
console.log('\n--- 값 변환하기 ---');

// 비동기로 숫자 가져오기 시뮬레이션
function fetchNumberAsync() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(10);
        }, 1000);
    });
}

fetchNumberAsync()
    .then(number => {
        console.log('가져온 숫자:', number);
        return number * 2; // 단순 값 반환 (자동으로 Promise로 감싸짐)
    })
    .then(doubled => {
        console.log('두 배:', doubled);
        return String(doubled); // 문자열로 변환
    })
    .then(str => {
        console.log('문자열로:', str);
        return str + '!'; // 문자열 연결
    })
    .then(final => {
        console.log('최종 결과:', final); // '20!' 출력
    });

// 4. 비동기 작업 시퀀스 실행
console.log('\n--- 비동기 작업 시퀀스 실행 ---');

// 가상의 사용자 데이터베이스
const userDB = {
    user123: { name: '홍길동', role: 'user', points: 100 }
};

// 가상의 포인트 시스템
const pointsDB = {
    getPointsHistory(userId) {
        return [
            { date: '2023-01-01', points: 10, reason: '로그인 보너스' },
            { date: '2023-01-15', points: 20, reason: '콘텐츠 업로드' },
            { date: '2023-02-01', points: 30, reason: '출석 보너스' },
            { date: '2023-02-15', points: 40, reason: '이벤트 참여' }
        ];
    }
};

// 1단계: 사용자 정보 가져오기
function fetchUserInfo(userId) {
    return new Promise((resolve, reject) => {
        console.log(`사용자 ${userId} 정보 요청 중...`);
        setTimeout(() => {
            const user = userDB[userId];
            if (user) {
                console.log(`사용자 ${userId} 정보 로드 완료`);
                resolve(user);
            } else {
                reject(new Error(`사용자 ${userId}를 찾을 수 없습니다.`));
            }
        }, 1000);
    });
}

// 2단계: 사용자 포인트 내역 가져오기
function fetchUserPointsHistory(user) {
    return new Promise((resolve, reject) => {
        console.log(`${user.name}의 포인트 내역 요청 중...`);
        setTimeout(() => {
            const history = pointsDB.getPointsHistory(user.id);
            console.log(`${user.name}의 포인트 내역 로드 완료`);
            
            // 사용자 객체에 포인트 내역 추가
            resolve({
                ...user,
                pointsHistory: history
            });
        }, 1000);
    });
}

// 3단계: 포인트 총합 계산
function calculateTotalPoints(userWithHistory) {
    return new Promise((resolve, reject) => {
        console.log(`${userWithHistory.name}의 포인트 총합 계산 중...`);
        setTimeout(() => {
            // 초기 포인트 + 내역의 모든 포인트 합산
            const initialPoints = userWithHistory.points || 0;
            const historySum = userWithHistory.pointsHistory.reduce(
                (sum, entry) => sum + entry.points, 0
            );
            const totalPoints = initialPoints + historySum;
            
            console.log(`${userWithHistory.name}의 포인트 총합 계산 완료: ${totalPoints}점`);
            
            // 사용자 객체에 총 포인트 추가
            resolve({
                ...userWithHistory,
                totalPoints
            });
        }, 1000);
    });
}

// 모든 단계를 체이닝으로 연결
fetchUserInfo('user123')
    .then(user => fetchUserPointsHistory(user))
    .then(userWithHistory => calculateTotalPoints(userWithHistory))
    .then(finalUserData => {
        console.log('\n사용자 최종 데이터:');
        console.log(`이름: ${finalUserData.name}`);
        console.log(`역할: ${finalUserData.role}`);
        console.log(`초기 포인트: ${finalUserData.points}`);
        console.log(`포인트 내역: ${finalUserData.pointsHistory.length}개`);
        console.log(`포인트 총합: ${finalUserData.totalPoints}점`);
    })
    .catch(error => {
        console.error('처리 중 오류 발생:', error.message);
    });

// 5. Promise 체이닝에서의 에러 처리와 복구
console.log('\n--- Promise 체이닝에서의 에러 처리와 복구 ---');

function fetchWithPotentialError(shouldSucceed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve('성공 데이터');
            } else {
                reject(new Error('의도적인 실패'));
            }
        }, 1000);
    });
}

// 에러 발생 후 복구하는 체이닝
fetchWithPotentialError(false) // 실패하도록 설정
    .then(data => {
        console.log('이 코드는 실행되지 않습니다.', data);
        return '다음 단계 데이터';
    })
    .catch(error => {
        console.error('에러 감지:', error.message);
        // 에러 복구 - 기본값 반환
        return '복구된 기본 데이터';
    })
    .then(recoveredData => {
        console.log('복구 후 계속 실행:', recoveredData);
        return fetchWithPotentialError(true); // 이번에는 성공하도록 설정
    })
    .then(finalData => {
        console.log('최종 성공 데이터:', finalData);
    })
    .catch(error => {
        console.error('복구 후에도 에러 발생:', error.message);
    });

/**
 * Promise 체이닝 요약:
 * 
 * 1. .then()은 항상 새로운 Promise를 반환합니다.
 * 2. 각 .then() 핸들러의 반환값은 자동으로 Promise로 감싸집니다.
 * 3. 체이닝을 통해 비동기 작업을 순차적으로 실행할 수 있습니다.
 * 4. 값 변환과 처리를 쉽게 할 수 있습니다.
 * 5. .catch()를 사용해 체인 어디에서든 발생하는 에러를 처리할 수 있습니다.
 * 6. .catch() 이후에도 체이닝을 계속할 수 있어 에러 복구가 가능합니다.
 */ 