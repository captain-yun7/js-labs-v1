// assignment-operators.js - 할당 연산자

/**
 * 할당 연산자 (Assignment Operators)
 * 
 * 할당 연산자는 변수에 값을 할당하는 연산자입니다.
 * 기본 할당 연산자는 등호(=)이며, 복합 할당 연산자도 제공됩니다.
 */

console.log('==== 할당 연산자 예제 ====');

// 1. 기본 할당 연산자 (=)
let x = 10;  // x에 10을 할당
console.log('x =', x);  // 10

// 할당은 오른쪽에서 왼쪽으로 진행됩니다
let a, b, c;
a = b = c = 5;  // c에 5를 할당하고, 그 값을 b에 할당하고, 그 값을 a에 할당
console.log('a =', a, 'b =', b, 'c =', c);  // a = 5 b = 5 c = 5

// 표현식의 결과도 할당할 수 있습니다
let result = 2 + 3 * 4;
console.log('result =', result);  // 14

// 2. 복합 할당 연산자
// 2.1. 덧셈 할당 (+=)
let sum = 5;
sum += 3;  // sum = sum + 3 와 동일
console.log('sum += 3 결과:', sum);  // 8

// 문자열에서도 사용 가능
let greeting = 'Hello';
greeting += ' World';  // greeting = greeting + ' World' 와 동일
console.log('greeting += \' World\' 결과:', greeting);  // Hello World

// 2.2. 뺄셈 할당 (-=)
let difference = 10;
difference -= 4;  // difference = difference - 4 와 동일
console.log('difference -= 4 결과:', difference);  // 6

// 2.3. 곱셈 할당 (*=)
let product = 3;
product *= 5;  // product = product * 5 와 동일
console.log('product *= 5 결과:', product);  // 15

// 2.4. 나눗셈 할당 (/=)
let quotient = 20;
quotient /= 4;  // quotient = quotient / 4 와 동일
console.log('quotient /= 4 결과:', quotient);  // 5

// 2.5. 나머지 할당 (%=)
let remainder = 17;
remainder %= 5;  // remainder = remainder % 5 와 동일
console.log('remainder %= 5 결과:', remainder);  // 2

// 2.6. 지수 할당 (**=)
let power = 2;
power **= 3;  // power = power ** 3 와 동일 (ES2016에서 추가)
console.log('power **= 3 결과:', power);  // 8

// 2.7. 비트 AND 할당 (&=)
let bitAnd = 5;  // 이진수: 101
bitAnd &= 3;  // 이진수: 011 -> 결과: 001 (1)
console.log('bitAnd &= 3 결과:', bitAnd);  // 1

// 2.8. 비트 OR 할당 (|=)
let bitOr = 5;  // 이진수: 101
bitOr |= 3;  // 이진수: 011 -> 결과: 111 (7)
console.log('bitOr |= 3 결과:', bitOr);  // 7

// 2.9. 비트 XOR 할당 (^=)
let bitXor = 5;  // 이진수: 101
bitXor ^= 3;  // 이진수: 011 -> 결과: 110 (6)
console.log('bitXor ^= 3 결과:', bitXor);  // 6

// 2.10. 왼쪽 시프트 할당 (<<=)
let leftShift = 5;  // 이진수: 101
leftShift <<= 1;  // 이진수: 1010 (10)
console.log('leftShift <<= 1 결과:', leftShift);  // 10

// 2.11. 오른쪽 시프트 할당 (>>=)
let rightShift = 10;  // 이진수: 1010
rightShift >>= 1;  // 이진수: 101 (5)
console.log('rightShift >>= 1 결과:', rightShift);  // 5

// 2.12. 부호 없는 오른쪽 시프트 할당 (>>>=)
let unsignedRightShift = -10;
unsignedRightShift >>>= 1;
console.log('unsignedRightShift >>>= 1 결과:', unsignedRightShift);  // 2147483643 (32비트 시스템 기준)

// 3. 구조 분해 할당 (Destructuring assignment)
// 배열 구조 분해
let numbers = [1, 2, 3];
let [first, second, third] = numbers;
console.log('first =', first, 'second =', second, 'third =', third);  // 1 2 3

// 객체 구조 분해
let person = { name: '홍길동', age: 30, job: '개발자' };
let { name, age, job } = person;
console.log('name =', name, 'age =', age, 'job =', job);  // 홍길동 30 개발자

// 기본값 설정
let [a1, b1, c1 = 3] = [1, 2];
console.log('a1 =', a1, 'b1 =', b1, 'c1 =', c1);  // 1 2 3

// 변수 교환 (swap)
let m = 5, n = 10;
[m, n] = [n, m];
console.log('m =', m, 'n =', n);  // 10 5

/**
 * 할당 연산자 사용 시 주의사항
 * 
 * 1. 할당은 값을 반환합니다. 'x = y'는 y 값을 x에 할당하고 그 값을 반환합니다.
 * 2. 선언되지 않은 변수에 할당하면 전역 변수가 생성될 수 있어 위험합니다(strict 모드에서는 에러).
 * 3. const로 선언된 변수는 재할당할 수 없습니다.
 * 4. 구조 분해 할당은 코드를 더 간결하게 만들 수 있지만, 복잡한 패턴은 가독성을 해칠 수 있습니다.
 */ 