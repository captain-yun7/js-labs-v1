// ternary-operator.js - 삼항 연산자

/**
 * 삼항 연산자 (Conditional/Ternary Operator)
 * 
 * 삼항 연산자는 JavaScript에서 세 개의 피연산자를 가지는 유일한 연산자입니다.
 * 조건식 ? 표현식1 : 표현식2 형태로 사용하며,
 * 조건식이 참이면 표현식1을, 거짓이면 표현식2를 반환합니다.
 * 
 * if-else문의 간결한 대안으로 사용됩니다.
 */

console.log('==== 삼항 연산자 예제 ====');

// 1. 기본 사용법
let age = 20;
let status = age >= 18 ? '성인' : '미성년자';
console.log('나이 상태:', status);  // 성인

// if-else 문과 비교
let statusWithIf;
if (age >= 18) {
    statusWithIf = '성인';
} else {
    statusWithIf = '미성년자';
}
console.log('if문으로 구현한 나이 상태:', statusWithIf);  // 성인

// 2. 표현식으로 사용
// 삼항 연산자는 표현식이므로 값을 반환하고 변수에 할당하거나 다른 표현식의 일부로 사용할 수 있습니다.
let greeting = 'Hello, ' + (age >= 18 ? '성인님' : '미성년자님');
console.log(greeting);  // Hello, 성인님

// 함수 호출에서 사용
function greet(isAdult) {
    return 'Welcome, ' + (isAdult ? 'adult' : 'minor');
}
console.log(greet(age >= 18));  // Welcome, adult

// 3. 중첩 삼항 연산자
// 삼항 연산자 안에 다른 삼항 연산자를 중첩할 수 있습니다.
let score = 85;
let grade = score >= 90 ? 'A' 
          : score >= 80 ? 'B'
          : score >= 70 ? 'C'
          : score >= 60 ? 'D'
          : 'F';
console.log('점수:', score, '학점:', grade);  // 점수: 85 학점: B

// if-else 문과 비교
let gradeWithIf;
if (score >= 90) {
    gradeWithIf = 'A';
} else if (score >= 80) {
    gradeWithIf = 'B';
} else if (score >= 70) {
    gradeWithIf = 'C';
} else if (score >= 60) {
    gradeWithIf = 'D';
} else {
    gradeWithIf = 'F';
}
console.log('if문으로 구현한 학점:', gradeWithIf);  // B

// 4. 복잡한 조건식 사용
let temperature = 25;
let weather = 'sunny';
let activity = temperature > 30 ? 
               '너무 더워요, 실내에 있어요' : 
               temperature > 20 && weather === 'sunny' ? 
               '좋은 날씨입니다, 산책하세요' : 
               '외투를 챙기세요';
console.log('추천 활동:', activity);  // 좋은 날씨입니다, 산책하세요

// 5. 논리 연산자와 함께 사용
let username = '';
let displayName = username ? username : '게스트';
console.log('사용자명:', displayName);  // 게스트

// 위 예제는 OR 연산자로 더 간결하게 작성할 수 있습니다.
let displayName2 = username || '게스트';
console.log('OR 연산자로 구현한 사용자명:', displayName2);  // 게스트

// 6. 함수 반환값으로 사용
function getFee(isMember) {
    return isMember ? '5000원' : '10000원';
}
console.log('회원 요금:', getFee(true));    // 5000원
console.log('비회원 요금:', getFee(false));  // 10000원

// 7. 객체 속성 접근에 사용
let user = null;
// user가 null이 아니면 user.name을 출력, null이면 '알 수 없음' 출력
let userName = user ? user.name : '알 수 없음';
console.log('사용자 이름:', userName);  // 알 수 없음

// 이는 optional chaining 연산자(?.)와 널 병합 연산자(??)로도 구현할 수 있습니다.
let userName2 = user?.name ?? '알 수 없음';
console.log('옵셔널 체이닝으로 구현한 사용자 이름:', userName2);  // 알 수 없음

// 8. JSX에서의 조건부 렌더링 (React)
/*
// React에서 주로 사용하는 방식입니다.
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <UserGreeting /> : <GuestGreeting />}
    </div>
  );
}
*/

/**
 * 삼항 연산자 사용 시 주의사항
 * 
 * 1. 가독성: 여러 개의 삼항 연산자를 중첩하면 코드 가독성이 떨어질 수 있습니다.
 *    복잡한 조건은 if-else 문이나 switch 문을 사용하는 것이 더 명확할 수 있습니다.
 * 
 * 2. 부수 효과: 삼항 연산자는 표현식이므로 변수에 값을 할당하거나 반환하는 용도로 사용하는 것이 좋습니다.
 *    부수 효과(함수 호출 등)를 포함하는 복잡한 로직은 if-else 문을 사용하는 것이 좋습니다.
 * 
 * 3. 괄호 사용: 중첩된 삼항 연산자나 복잡한 표현식은 괄호로 묶어 가독성을 높이는 것이 좋습니다.
 * 
 * 4. 간결함: 삼항 연산자의 장점은 간결함입니다. 간단한 조건부 할당에 적합합니다.
 *    
 * 5. 흐름 제어가 아닌 값 반환: 삼항 연산자는 흐름 제어가 아니라 값을 반환하는 데 중점을 둡니다.
 *    실행 흐름을 제어하는 복잡한 로직은 if-else 문이 더 적합합니다.
 */ 