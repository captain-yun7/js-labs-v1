// callback-functions.js - 콜백 함수 활용하기

/**
 * 콜백 함수(Callback Functions)
 * 
 * 콜백 함수는 다른 함수에 인자로 전달되는 함수를 말합니다.
 * 나중에 특정 시점에 호출되어 비동기 처리, 이벤트 처리, 배열 메서드 등
 * 다양한 상황에서 유용하게 사용됩니다.
 */

console.log('==== 콜백 함수 활용하기 ====');

// 1. 기본 콜백 함수
console.log('\n--- 기본 콜백 함수 ---');

// 간단한 콜백 함수 예제
function greeting(name, callback) {
    console.log(`안녕하세요, ${name}님!`);
    // 콜백 함수 호출
    callback();
}

// 콜백으로 사용할 함수
function sayGoodbye() {
    console.log('안녕히 가세요!');
}

// 함수를 콜백으로 전달
greeting('홍길동', sayGoodbye);

// 익명 함수를 콜백으로 전달
greeting('김철수', function() {
    console.log('다음에 또 만나요!');
});

// 화살표 함수를 콜백으로 전달
greeting('이영희', () => {
    console.log('좋은 하루 보내세요!');
});

// 2. 배열 메서드와 콜백 함수
console.log('\n--- 배열 메서드와 콜백 함수 ---');

const numbers = [1, 2, 3, 4, 5];

// forEach: 배열의 각 요소에 대해 콜백 함수를 실행
console.log('forEach 예제:');
numbers.forEach(function(number, index) {
    console.log(`인덱스 ${index}: ${number}`);
});

// map: 배열의 각 요소를 변환하여 새 배열 생성
console.log('\nmap 예제:');
const doubled = numbers.map(number => number * 2);
console.log('원본 배열:', numbers);
console.log('2배한 배열:', doubled);

// filter: 조건을 만족하는 요소만 새 배열로 반환
console.log('\nfilter 예제:');
const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log('짝수만 필터링:', evenNumbers);

// reduce: 배열을 단일 값으로 축소
console.log('\nreduce 예제:');
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log('합계:', sum);

// find: 조건을 만족하는 첫 번째 요소 반환
console.log('\nfind 예제:');
const firstEven = numbers.find(number => number % 2 === 0);
console.log('첫 번째 짝수:', firstEven);

// some: 조건을 만족하는 요소가 있는지 확인
console.log('\nsome 예제:');
const hasEven = numbers.some(number => number % 2 === 0);
console.log('짝수가 있는가?', hasEven);

// every: 모든 요소가 조건을 만족하는지 확인
console.log('\nevery 예제:');
const allPositive = numbers.every(number => number > 0);
console.log('모든 수가 양수인가?', allPositive);

// 3. 타이머 함수와 콜백
console.log('\n--- 타이머 함수와 콜백 ---');

// setTimeout: 일정 시간 후에 콜백 실행
console.log('setTimeout 예제:');
console.log('타이머 시작!');

setTimeout(() => {
    console.log('2초 후에 실행되는 코드');
}, 2000);

// setInterval: 일정 간격으로 콜백 반복 실행
console.log('\nsetInterval 예제:');
console.log('인터벌 타이머 시작! (5초 후 중지)');

let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(`${counter}초 경과`);
    
    if (counter >= 5) {
        clearInterval(intervalId); // 5초 후 인터벌 중지
        console.log('인터벌 타이머 종료!');
    }
}, 1000);

// 4. 이벤트 처리와 콜백
console.log('\n--- 이벤트 처리와 콜백 ---');

console.log('브라우저 환경에서의 이벤트 처리 예제:');
console.log(`
// 버튼 클릭 이벤트 처리
document.getElementById('myButton').addEventListener('click', function(event) {
    console.log('버튼이 클릭되었습니다!');
    // event 객체를 통해 이벤트 정보 접근 가능
    console.log('이벤트 타입:', event.type);
    console.log('이벤트 타겟:', event.target);
});

// 마우스 오버 이벤트 처리
document.getElementById('myElement').addEventListener('mouseover', () => {
    console.log('마우스가 요소 위에 있습니다.');
});

// 폼 제출 이벤트 처리
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 동작 방지
    console.log('폼이 제출되었습니다!');
});
`);

// 5. 콜백 함수를 사용한 비동기 작업
console.log('\n--- 콜백 함수를 사용한 비동기 작업 ---');

// 비동기 데이터 로딩 시뮬레이션
function fetchData(url, callback) {
    console.log(`${url}에서 데이터 요청 중...`);
    
    // 비동기 작업 시뮬레이션
    setTimeout(() => {
        // 데이터 로딩 완료
        const data = {
            id: 1,
            title: '샘플 데이터',
            createdAt: new Date().toISOString()
        };
        
        // 콜백 호출하여 결과 전달
        callback(null, data);
    }, 2000);
}

// 에러 처리가 있는 콜백 패턴
function fetchUserData(userId, callback) {
    console.log(`사용자 ID ${userId}의 데이터 요청 중...`);
    
    setTimeout(() => {
        // 가끔 에러 발생 시뮬레이션 (userId가 음수인 경우)
        if (userId < 0) {
            callback(new Error('유효하지 않은 사용자 ID'));
            return;
        }
        
        // 데이터 로딩 성공
        const userData = {
            id: userId,
            name: '홍길동',
            email: `user${userId}@example.com`
        };
        
        callback(null, userData);
    }, 1500);
}

// 비동기 함수 호출
fetchData('https://api.example.com/data', (error, data) => {
    if (error) {
        console.error('데이터 로딩 실패:', error);
        return;
    }
    
    console.log('데이터 로딩 성공:', data);
    
    // 첫 번째 데이터 로딩 완료 후 두 번째 데이터 요청
    fetchUserData(data.id, (error, userData) => {
        if (error) {
            console.error('사용자 데이터 로딩 실패:', error);
            return;
        }
        
        console.log('사용자 데이터:', userData);
        console.log('모든 데이터 로딩 완료!');
    });
});

// 6. 콜백 지옥 (Callback Hell)
console.log('\n--- 콜백 지옥 ---');

console.log('콜백 지옥 예제:');
console.log(`
// 중첩된 콜백으로 인한 콜백 지옥
step1(function(result1) {
    step2(result1, function(result2) {
        step3(result2, function(result3) {
            step4(result3, function(result4) {
                step5(result4, function(result5) {
                    // 들여쓰기가 깊어지고 코드가 복잡해짐
                    console.log('최종 결과:', result5);
                });
            });
        });
    });
});

// Promise나 async/await를 사용하여 해결 가능
// Promise 예제:
step1()
    .then(result1 => step2(result1))
    .then(result2 => step3(result2))
    .then(result3 => step4(result3))
    .then(result4 => step5(result4))
    .then(result5 => {
        console.log('최종 결과:', result5);
    })
    .catch(error => {
        console.error('에러 발생:', error);
    });

// async/await 예제:
async function processSteps() {
    try {
        const result1 = await step1();
        const result2 = await step2(result1);
        const result3 = await step3(result2);
        const result4 = await step4(result3);
        const result5 = await step5(result4);
        console.log('최종 결과:', result5);
    } catch (error) {
        console.error('에러 발생:', error);
    }
}
`);

// 7. 콜백 함수의 this 바인딩 문제
console.log('\n--- 콜백 함수의 this 바인딩 문제 ---');

// this 바인딩 문제 예시
const user = {
    name: '홍길동',
    greet: function() {
        console.log(`안녕하세요, ${this.name}입니다!`);
    },
    greetLater: function() {
        // 일반 함수에서는 this가 전역 객체 또는 undefined로 바인딩
        setTimeout(function() {
            console.log(`일반 함수: 안녕하세요, ${this.name}입니다!`); // this.name은 undefined
        }, 1000);
        
        // 화살표 함수는 상위 스코프의 this를 유지
        setTimeout(() => {
            console.log(`화살표 함수: 안녕하세요, ${this.name}입니다!`); // this.name은 '홍길동'
        }, 1500);
        
        // bind를 사용한 해결책
        setTimeout(function() {
            console.log(`bind 사용: 안녕하세요, ${this.name}입니다!`); // this.name은 '홍길동'
        }.bind(this), 2000);
    }
};

user.greetLater();

/**
 * 콜백 함수 요약:
 * 
 * 1. 콜백 함수란:
 *    - 다른 함수에 인자로 전달되어 나중에 호출되는 함수
 *    - JavaScript에서 함수는 일급 객체이므로 변수에 할당하거나 인자로 전달 가능
 * 
 * 2. 주요 활용 분야:
 *    - 배열 메서드 (forEach, map, filter, reduce 등)
 *    - 타이머 함수 (setTimeout, setInterval)
 *    - 이벤트 처리 (addEventListener)
 *    - 비동기 작업 처리 (AJAX, 파일 IO 등)
 * 
 * 3. 콜백 함수의 형태:
 *    - 기명 함수 (이름이 있는 함수)
 *    - 익명 함수 (이름이 없는 함수)
 *    - 화살표 함수 (간결한 구문)
 * 
 * 4. 콜백 패턴의 장단점:
 *    - 장점: 비동기 작업 처리 가능, 코드 재사용성 증가
 *    - 단점: 중첩될 경우 콜백 지옥 발생, 에러 처리 복잡
 * 
 * 5. 콜백 대안:
 *    - Promise: 비동기 작업의 결과를 나타내는 객체
 *    - async/await: 비동기 코드를 동기 코드처럼 작성 가능
 */ 