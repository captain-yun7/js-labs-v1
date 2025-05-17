// conditionals.js - 조건문

/**
 * JavaScript의 조건문 (Conditional Statements)
 * 
 * 조건문은 특정 조건이 충족될 때만 코드 블록을 실행하는 제어 구조입니다.
 * JavaScript에서는 다음과 같은 조건문을 제공합니다:
 * 1. if 문
 * 2. if...else 문
 * 3. if...else if...else 문
 * 4. 삼항 연산자(조건 연산자)
 */

console.log('==== 조건문 예제 ====');

// 1. if 문
// 조건이 참(truthy)일 때만 코드 블록이 실행됩니다.
let temperature = 28;

if (temperature > 25) {
    console.log('날씨가 덥습니다.');
}

// truthy와 falsy 값
// JavaScript에서는 조건식에 boolean이 아닌 값도 사용할 수 있습니다.
// falsy 값: false, 0, '', null, undefined, NaN
// truthy 값: falsy가 아닌 모든 값

let username = '홍길동';
if (username) {
    console.log(`안녕하세요, ${username}님!`);
}

let emptyString = '';
if (emptyString) {
    console.log('이 메시지는 출력되지 않습니다.'); // 빈 문자열은 falsy 값이므로 이 블록은 실행되지 않음
}

// 2. if...else 문
// 조건이 참일 때와 거짓일 때 각각 다른 코드 블록을 실행합니다.
let age = 17;

if (age >= 18) {
    console.log('성인입니다.');
} else {
    console.log('미성년자입니다.');
}

// 3. if...else if...else 문
// 여러 조건을 순차적으로 검사합니다.
let score = 85;

if (score >= 90) {
    console.log('A 학점');
} else if (score >= 80) {
    console.log('B 학점');
} else if (score >= 70) {
    console.log('C 학점');
} else if (score >= 60) {
    console.log('D 학점');
} else {
    console.log('F 학점');
}

// 4. 중첩된 if 문
// if 문 내부에 다른 if 문을 포함할 수 있습니다.
let isLoggedIn = true;
let isAdmin = true;

if (isLoggedIn) {
    console.log('로그인 상태입니다.');
    
    if (isAdmin) {
        console.log('관리자 권한이 있습니다.');
    } else {
        console.log('일반 사용자입니다.');
    }
} else {
    console.log('로그인이 필요합니다.');
}

// 5. 논리 연산자와 조건문
// 논리 연산자를 사용하여 복잡한 조건을 표현할 수 있습니다.
let hasSubscription = false;
let hasFreePass = true;

if (hasSubscription || hasFreePass) {
    console.log('프리미엄 콘텐츠에 접근할 수 있습니다.');
} else {
    console.log('구독이 필요합니다.');
}

let isEmailVerified = true;
let hasPhoneVerified = false;

if (isEmailVerified && hasPhoneVerified) {
    console.log('완전히 인증된 사용자입니다.');
} else if (isEmailVerified || hasPhoneVerified) {
    console.log('부분적으로 인증된 사용자입니다.');
} else {
    console.log('인증되지 않은 사용자입니다.');
}

// 6. 삼항 연산자(조건 연산자)
// 조건 ? 참일 때 표현식 : 거짓일 때 표현식
// 간단한 조건 로직을 표현할 때 유용합니다.
let userType = age >= 18 ? '성인' : '미성년자';
console.log(`사용자 유형: ${userType}`);

// 삼항 연산자 중첩 (가독성이 떨어질 수 있으므로 신중하게 사용)
let gradeLabel = score >= 90 ? 'A' : 
                score >= 80 ? 'B' : 
                score >= 70 ? 'C' : 
                score >= 60 ? 'D' : 'F';
console.log(`학점: ${gradeLabel}`);

// 7. 조건부 실행 (단축 평가)
// 논리 연산자의 단축 평가 특성을 활용한 조건부 실행
isAdmin && console.log('이 메시지는 관리자에게만 표시됩니다.');
!isLoggedIn && console.log('이 메시지는 로그인하지 않은 사용자에게만 표시됩니다.'); // 출력되지 않음

// 8. null 병합 연산자 (??)
// null 또는 undefined일 때만 대체 값을 제공합니다.
let userSettings = null;
let defaultSettings = { theme: 'dark', fontSize: 16 };

let activeSettings = userSettings ?? defaultSettings;
console.log('활성 설정:', activeSettings); // defaultSettings가 사용됨

// 9. 옵셔널 체이닝 (?.)
// 속성이 존재하지 않을 수 있는 객체를 안전하게 접근할 수 있습니다.
let user = null;

// 옵셔널 체이닝이 없을 때: 에러 발생
// console.log(user.name); // TypeError: Cannot read property 'name' of null

// 옵셔널 체이닝 사용: 안전하게 undefined 반환
console.log(user?.name); // undefined

// 옵셔널 체이닝과 null 병합 연산자 함께 사용
console.log(user?.name ?? '이름 없음'); // "이름 없음"

/**
 * 조건문 사용 시 주의사항:
 * 
 * 1. 비교 연산자 '==' vs '===' : 엄격한 비교를 위해 '==='를 사용하는 것이 좋습니다.
 * 2. 중괄호 {} : 코드 블록이 한 줄이더라도 가독성과 유지보수를 위해 중괄호를 사용하는 것이 좋습니다.
 * 3. 단축 평가 : 복잡한 조건에서는 가독성을 위해 전체 if 문을 사용하는 것이 좋습니다.
 * 4. 중첩된 조건문 : 깊이가 깊어지면 가독성이 떨어지므로, 함수 분리나 early return 패턴을 고려하세요.
 */ 