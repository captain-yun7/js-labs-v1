// practice.js - 연산자 실습

/**
 * 연산자 실습
 * 
 * 다양한 연산자를 사용하고 결과를 확인하는 실습입니다.
 * 각 문제에 대한 답을 작성하고 주석 처리된 결과와 비교해보세요.
 */

// 실습 1: 산술 연산자
console.log('===== 산술 연산자 실습 =====');

// 다음 연산의 결과를 예측하고 콘솔에 출력해보세요.
// TODO: 10 + 5 * 2 - 8 / 4 의 결과는?
let result1 = 10 + 5 * 2 - 8 / 4;
console.log('10 + 5 * 2 - 8 / 4 =', result1);  // 18

// TODO: (10 + 5) * (2 - 8) / 4 의 결과는?
let result2 = (10 + 5) * (2 - 8) / 4;
console.log('(10 + 5) * (2 - 8) / 4 =', result2);  // -15

// TODO: '안녕하세요. ' + '제 이름은 ' + '홍길동' + '입니다.' 의 결과는?
let result3 = '안녕하세요. ' + '제 이름은 ' + '홍길동' + '입니다.';
console.log(result3);  // 안녕하세요. 제 이름은 홍길동입니다.

// 실습 2: 증감 연산자
console.log('\n===== 증감 연산자 실습 =====');

// TODO: 다음 코드의 a, b, c, d 최종 값은?
let a = 5;
let b = a++;
let c = 10;
let d = ++c;

console.log('a =', a);  // 6
console.log('b =', b);  // 5
console.log('c =', c);  // 11
console.log('d =', d);  // 11

// 실습 3: 할당 연산자
console.log('\n===== 할당 연산자 실습 =====');

// TODO: 다음 코드의 x, y, z 최종 값은?
let x = 10;
x += 5;  // x = x + 5
x -= 2;  // x = x - 2
x *= 3;  // x = x * 3
x /= 6;  // x = x / 6

let y = 20;
y %= 7;  // y = y % 7

let z = 2;
z **= 3;  // z = z ** 3

console.log('x =', x);  // 6.5
console.log('y =', y);  // 6
console.log('z =', z);  // 8

// 실습 4: 비교 연산자
console.log('\n===== 비교 연산자 실습 =====');

// TODO: 다음 비교 연산의 결과를 예측하세요.
console.log('5 == "5":', 5 == "5");             // true
console.log('5 === "5":', 5 === "5");           // false
console.log('5 != "5":', 5 != "5");             // false
console.log('5 !== "5":', 5 !== "5");           // true
console.log('null == undefined:', null == undefined);       // true
console.log('null === undefined:', null === undefined);     // false
console.log('0 == false:', 0 == false);         // true
console.log('0 === false:', 0 === false);       // false
console.log('"10" > 5:', "10" > 5);             // true
console.log('"10" < "5":', "10" < "5");         // true (문자열 비교)

// 실습 5: 논리 연산자
console.log('\n===== 논리 연산자 실습 =====');

// TODO: 다음 논리 연산의 결과를 예측하세요.
console.log('true && true:', true && true);           // true
console.log('true && false:', true && false);         // false
console.log('false && true:', false && true);         // false
console.log('false && false:', false && false);       // false

console.log('true || true:', true || true);           // true
console.log('true || false:', true || false);         // true
console.log('false || true:', false || true);         // true
console.log('false || false:', false || false);       // false

console.log('!true:', !true);                         // false
console.log('!false:', !false);                       // true

// TODO: 다음 복합 논리 연산의 결과를 예측하세요.
console.log('(5 > 3) && (2 < 4):', (5 > 3) && (2 < 4));     // true
console.log('(5 > 3) && (2 > 4):', (5 > 3) && (2 > 4));     // false
console.log('(5 < 3) || (2 < 4):', (5 < 3) || (2 < 4));     // true
console.log('(5 < 3) || (2 > 4):', (5 < 3) || (2 > 4));     // false

// TODO: 다음 단락 평가의 결과를 예측하세요.
console.log('true && "Hello":', true && "Hello");     // "Hello"
console.log('false && "Hello":', false && "Hello");   // false
console.log('true || "Hello":', true || "Hello");     // true
console.log('false || "Hello":', false || "Hello");   // "Hello"

let username = "";
let displayName = username || "Guest";
console.log('displayName:', displayName);             // "Guest"

// 실습 6: 비트 연산자
console.log('\n===== 비트 연산자 실습 =====');

// TODO: 다음 비트 연산의 결과를 예측하세요. (10진수로 답하세요)
console.log('5 & 3:', 5 & 3);       // 1 (0101 & 0011 = 0001)
console.log('5 | 3:', 5 | 3);       // 7 (0101 | 0011 = 0111)
console.log('5 ^ 3:', 5 ^ 3);       // 6 (0101 ^ 0011 = 0110)
console.log('~5:', ~5);             // -6 (1의 보수)
console.log('5 << 1:', 5 << 1);     // 10 (0101 << 1 = 1010)
console.log('5 >> 1:', 5 >> 1);     // 2 (0101 >> 1 = 0010)

// 실습 7: 삼항 연산자
console.log('\n===== 삼항 연산자 실습 =====');

// TODO: 다음 삼항 연산의 결과를 예측하세요.
let age = 20;
let status = age >= 18 ? "성인" : "미성년자";
console.log('status:', status);  // "성인"

let score = 85;
let grade = score >= 90 ? "A" : 
           score >= 80 ? "B" : 
           score >= 70 ? "C" : 
           score >= 60 ? "D" : "F";
console.log('grade:', grade);  // "B"

// 실습 8: 연산자 우선순위 예제
console.log('\n===== 연산자 우선순위 실습 =====');

// TODO: 다음 연산의 결과를 예측하고 중간 계산 과정을 주석으로 표시하세요.
let complex = 2 + 3 * 4 ** 2 / (7 - 5) + 10 / 2;
// 계산 과정:
// 1. 4 ** 2 = 16
// 2. 7 - 5 = 2
// 3. 3 * 16 = 48
// 4. 48 / 2 = 24
// 5. 10 / 2 = 5
// 6. 2 + 24 + 5 = 31
console.log('2 + 3 * 4 ** 2 / (7 - 5) + 10 / 2 =', complex);  // 31

// 실습 9: 응용 문제
console.log('\n===== 응용 실습 =====');

// 온도 변환: 섭씨에서 화씨로 변환하는 공식 (섭씨 * 9/5 + 32)
// TODO: 섭씨 25도를 화씨로 변환하세요.
let celsius = 25;
let fahrenheit = celsius * 9/5 + 32;
console.log(`${celsius}°C = ${fahrenheit}°F`);  // 25°C = 77°F

// 세금 계산: 상품 가격과 세율에 따른 최종 가격 계산
// TODO: 상품 가격 50000원, 세율 10%일 때 세금과 최종 가격을 계산하세요.
let price = 50000;
let taxRate = 0.1;
let tax = price * taxRate;
let totalPrice = price + tax;
console.log(`상품 가격: ${price}원, 세금: ${tax}원, 최종 가격: ${totalPrice}원`);
// 상품 가격: 50000원, 세금: 5000원, 최종 가격: 55000원

// BMI 계산: 체중(kg) / (키(m) * 키(m))
// TODO: 키 175cm, 체중 70kg인 사람의 BMI를 계산하세요.
let height = 1.75;  // 미터 단위
let weight = 70;
let bmi = weight / (height ** 2);
console.log(`키: ${height*100}cm, 체중: ${weight}kg, BMI: ${bmi.toFixed(2)}`);
// 키: 175cm, 체중: 70kg, BMI: 22.86

// 실습 10: 논리 연산자를 활용한 조건부 실행
console.log('\n===== 조건부 실행 실습 =====');

// TODO: 다음 조건부 실행 예제의 결과를 예측하세요.
let isLoggedIn = true;
let userName = "홍길동";
let message = "";

// 로그인한 경우에만 환영 메시지 설정
isLoggedIn && (message = `안녕하세요, ${userName}님!`);
console.log('message:', message);  // "안녕하세요, 홍길동님!"

isLoggedIn = false;
message = "";

// 로그인하지 않은 경우 메시지 설정
isLoggedIn || (message = "로그인이 필요합니다.");
console.log('message:', message);  // "로그인이 필요합니다." 