// callbacks.js - 콜백 함수의 기본 개념과 사용법

/**
 * 콜백 함수(Callback Functions)
 * 
 * 콜백 함수는 다른 함수에 인자로 전달되어 나중에 호출되는 함수입니다.
 * JavaScript에서 함수는 일급 객체이므로 다른 함수에 전달하거나 변수에 할당할 수 있습니다.
 * 콜백은 비동기 작업에서 작업이 완료된 후 실행할 코드를 지정하는 데 주로 사용됩니다.
 */

console.log('==== 콜백 함수 기본 개념 ====');

// 1. 기본 콜백 함수
console.log('\n--- 기본 콜백 함수 ---');

// 콜백 함수를 인자로 받는 함수
function greeting(name, callback) {
    console.log(`안녕하세요, ${name}님!`);
    // 콜백 함수 호출
    callback();
}

// 콜백으로 사용할 함수
function sayGoodbye() {
    console.log('안녕히 가세요!');
}

// 함수 호출 시 콜백 전달
greeting('홍길동', sayGoodbye);

// 익명 함수를 콜백으로 전달
greeting('김철수', function() {
    console.log('다음에 또 만나요!');
});

// 화살표 함수를 콜백으로 전달
greeting('이영희', () => {
    console.log('좋은 하루 보내세요!');
});

// 2. 데이터 처리에 콜백 사용하기
console.log('\n--- 데이터 처리에 콜백 사용하기 ---');

// 데이터 배열
const numbers = [1, 2, 3, 4, 5];

// 배열의 각 요소에 함수 적용
function processArray(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        // 각 요소에 콜백 함수 적용
        result.push(callback(array[i], i));
    }
    return result;
}

// 다양한 콜백으로 배열 처리
const doubled = processArray(numbers, (num) => num * 2);
console.log('2배한 결과:', doubled);

const squared = processArray(numbers, (num) => num * num);
console.log('제곱한 결과:', squared);

const formatted = processArray(numbers, (num, index) => `항목 ${index+1}: ${num}`);
console.log('형식화한 결과:', formatted);

// 내장 배열 메서드와 콜백
console.log('map으로 세 배한 결과:', numbers.map(num => num * 3));
console.log('filter로 짝수만 선택:', numbers.filter(num => num % 2 === 0));
console.log('reduce로 합계 계산:', numbers.reduce((sum, num) => sum + num, 0));

// 3. 비동기 작업에 콜백 사용하기
console.log('\n--- 비동기 작업에 콜백 사용하기 ---');

console.log('타이머 시작 전');

// setTimeout - 지정된 시간 후에 콜백 함수 실행
setTimeout(() => {
    console.log('3초 후에 실행되는 콜백');
}, 3000);

console.log('타이머 시작 후 (코드 실행은 계속됨)');

// 4. 이벤트 핸들링에 콜백 사용하기
console.log('\n--- 이벤트 핸들링에 콜백 사용하기 ---');

console.log(`
브라우저 환경에서는 이벤트 핸들러로 콜백 함수를 사용합니다:

document.getElementById('myButton').addEventListener('click', function(event) {
    console.log('버튼이 클릭되었습니다!');
    console.log('이벤트 객체:', event);
});
`);

// 5. 비동기 작업 시뮬레이션
console.log('\n--- 비동기 작업 시뮬레이션 ---');

// 서버에서 데이터를 가져오는 것을 시뮬레이션하는 함수
function fetchData(callback) {
    console.log('서버에서 데이터를 가져오는 중...');
    
    // 비동기 작업 시뮬레이션 (2초 후 완료)
    setTimeout(() => {
        const data = {
            id: 1,
            name: '홍길동',
            email: 'hong@example.com'
        };
        
        console.log('데이터 로딩 완료!');
        // 데이터와 함께 콜백 호출
        callback(null, data);
    }, 2000);
}

// 데이터 처리 콜백
function processUserData(error, user) {
    if (error) {
        console.error('에러 발생:', error);
        return;
    }
    
    console.log('사용자 정보:');
    console.log(`- 이름: ${user.name}`);
    console.log(`- 이메일: ${user.email}`);
}

// 비동기 함수 호출
fetchData(processUserData);
console.log('fetchData 호출 후 (데이터를 기다리지 않고 실행됨)');

// 6. 에러 처리가 있는 콜백 패턴
console.log('\n--- 에러 처리가 있는 콜백 패턴 ---');

// 에러를 발생시킬 수 있는 비동기 함수
function fetchDataWithError(id, callback) {
    console.log(`ID가 ${id}인 데이터 요청 중...`);
    
    setTimeout(() => {
        // 50% 확률로 에러 발생
        if (Math.random() < 0.5) {
            callback(new Error('서버 연결 오류'));
            return;
        }
        
        // 성공 시 데이터 반환
        const data = {
            id: id,
            name: `사용자${id}`,
            role: '관리자'
        };
        
        callback(null, data);
    }, 1500);
}

// 에러 우선 콜백 패턴 (Error-First Callback)
// Node.js에서 흔히 사용되는 패턴으로, 첫 번째 인자는 항상 에러 객체(없으면 null)
fetchDataWithError(123, (error, data) => {
    if (error) {
        console.error('데이터 가져오기 실패:', error.message);
        return;
    }
    
    console.log('데이터 가져오기 성공:', data);
});

// 7. 콜백 함수 내에서 다른 비동기 작업 호출하기
console.log('\n--- 콜백 함수 내에서 다른 비동기 작업 호출하기 ---');

// 사용자 정보를 가져오는 함수
function fetchUser(userId, callback) {
    console.log(`사용자 ID ${userId} 정보 요청 중...`);
    
    setTimeout(() => {
        const user = {
            id: userId,
            name: `사용자${userId}`,
            isPremium: userId % 2 === 0
        };
        
        callback(null, user);
    }, 1000);
}

// 사용자의 주문 내역을 가져오는 함수
function fetchOrders(userId, callback) {
    console.log(`사용자 ID ${userId}의 주문 내역 요청 중...`);
    
    setTimeout(() => {
        const orders = [
            { id: 'A1', product: '노트북', price: 1500000 },
            { id: 'B2', product: '스마트폰', price: 800000 }
        ];
        
        callback(null, orders);
    }, 1000);
}

// 순차적으로 두 비동기 작업 실행
fetchUser(42, (error, user) => {
    if (error) {
        console.error('사용자 정보 가져오기 실패:', error.message);
        return;
    }
    
    console.log('사용자 정보:', user);
    
    // 첫 번째 비동기 작업이 완료된 후 두 번째 비동기 작업 시작
    fetchOrders(user.id, (error, orders) => {
        if (error) {
            console.error('주문 내역 가져오기 실패:', error.message);
            return;
        }
        
        console.log('주문 내역:', orders);
        
        // 사용자 정보와 주문 내역 결합하여 표시
        console.log(`${user.name}님의 주문 내역 (${orders.length}개):`);
        
        let totalAmount = 0;
        orders.forEach(order => {
            console.log(`- ${order.product}: ${order.price.toLocaleString()}원`);
            totalAmount += order.price;
        });
        
        console.log(`총 주문 금액: ${totalAmount.toLocaleString()}원`);
        
        if (user.isPremium) {
            console.log('프리미엄 회원 할인 10% 적용!');
            console.log(`할인 후 금액: ${(totalAmount * 0.9).toLocaleString()}원`);
        }
    });
});

/**
 * 콜백 함수 요약:
 * 
 * 1. 콜백 함수는 다른 함수에 인자로 전달되어 나중에 호출되는 함수입니다.
 * 2. 익명 함수, 함수 표현식, 화살표 함수 등 다양한 방식으로 콜백을 전달할 수 있습니다.
 * 3. 콜백은 다음과 같은 상황에서 주로 사용됩니다:
 *    - 비동기 작업 (타이머, AJAX 요청 등)
 *    - 이벤트 핸들링
 *    - 배열 메서드 (map, filter, reduce 등)
 *    - 데이터 변환 및 처리
 * 4. Node.js와 같은 환경에서는 '에러 우선 콜백 패턴'이 많이 사용됩니다.
 * 5. 콜백 내에서 또 다른 콜백을 호출하는 형태로 비동기 작업을 순차적으로 실행할 수 있습니다.
 *    (그러나 이것이 '콜백 지옥'으로 이어질 수 있음)
 */ 