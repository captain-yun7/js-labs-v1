// bitwise-operators.js - 비트 연산자

/**
 * 비트 연산자 (Bitwise Operators)
 * 
 * 비트 연산자는 이진 표현(0과 1의 비트)에서 비트 단위 연산을 수행합니다.
 * 주로 저수준 프로그래밍이나 플래그 변수, 파일 처리 등에서 사용됩니다.
 */

console.log('==== 비트 연산자 예제 ====');

// 이진 표현 확인 함수
function getBinary(num) {
    return (num >>> 0).toString(2).padStart(8, '0');
}

// 1. 비트 AND 연산자 (&)
// 두 비트가 모두 1이면 1, 아니면 0을 반환합니다.
let a = 5;  // 이진수: 00000101
let b = 3;  // 이진수: 00000011
let resultAnd = a & b;  // 이진수: 00000001 (십진수: 1)

console.log(`${a}(${getBinary(a)}) & ${b}(${getBinary(b)}) = ${resultAnd}(${getBinary(resultAnd)})`);

// 2. 비트 OR 연산자 (|)
// 두 비트 중 하나라도 1이면 1, 아니면 0을 반환합니다.
let resultOr = a | b;  // 이진수: 00000111 (십진수: 7)
console.log(`${a}(${getBinary(a)}) | ${b}(${getBinary(b)}) = ${resultOr}(${getBinary(resultOr)})`);

// 3. 비트 XOR 연산자 (^)
// 두 비트가 다르면 1, 같으면 0을 반환합니다.
let resultXor = a ^ b;  // 이진수: 00000110 (십진수: 6)
console.log(`${a}(${getBinary(a)}) ^ ${b}(${getBinary(b)}) = ${resultXor}(${getBinary(resultXor)})`);

// 4. 비트 NOT 연산자 (~)
// 비트를 반전시킵니다. (0은 1로, 1은 0으로)
let resultNot = ~a;  // 이진수: 11111010 (십진수: -6)
console.log(`~${a}(${getBinary(a)}) = ${resultNot}(${getBinary(resultNot & 0xFF)})`);

// 5. 왼쪽 시프트 연산자 (<<)
// 지정된 비트 수만큼 비트를 왼쪽으로 이동하고, 오른쪽에는 0을 채웁니다.
let leftShift = a << 1;  // 이진수: 00001010 (십진수: 10)
console.log(`${a}(${getBinary(a)}) << 1 = ${leftShift}(${getBinary(leftShift)})`);

// 6. 오른쪽 시프트 연산자 (>>)
// 지정된 비트 수만큼 비트를 오른쪽으로 이동하고, 왼쪽에는 부호 비트를 복사합니다.
let rightShift = a >> 1;  // 이진수: 00000010 (십진수: 2)
console.log(`${a}(${getBinary(a)}) >> 1 = ${rightShift}(${getBinary(rightShift)})`);

// 7. 부호 없는 오른쪽 시프트 연산자 (>>>)
// 지정된 비트 수만큼 비트를 오른쪽으로 이동하고, 왼쪽에는 항상 0을 채웁니다.
let unsignedRightShift = a >>> 1;  // 이진수: 00000010 (십진수: 2)
console.log(`${a}(${getBinary(a)}) >>> 1 = ${unsignedRightShift}(${getBinary(unsignedRightShift)})`);

// 음수 값에 대한 시프트 연산
let negative = -5;  // 이진수: 11111011
console.log(`${negative} >> 1 = ${negative >> 1}`);  // -3
console.log(`${negative} >>> 1 = ${negative >>> 1}`);  // 2147483645 (32비트 시스템 기준)

// 8. 비트 연산자의 응용

// 8.1. 짝수/홀수 판별
// 비트 AND 연산자를 사용하여 마지막 비트가 1인지(홀수) 0인지(짝수) 확인할 수 있습니다.
function isEven(num) {
    return (num & 1) === 0;
}
console.log('5는 짝수?', isEven(5));  // false
console.log('6은 짝수?', isEven(6));  // true

// 8.2. 비트 플래그
// 비트 연산자를 사용하여 여러 개의 불리언 값을 하나의 정수에 저장할 수 있습니다.

// 플래그 정의
const READ = 1;     // 001
const WRITE = 2;    // 010
const EXECUTE = 4;  // 100

// 플래그 설정
let permissions = 0;
permissions |= READ;    // 읽기 권한 추가
permissions |= WRITE;   // 쓰기 권한 추가
console.log('권한:', permissions);  // 3 (011)

// 플래그 확인
console.log('읽기 권한 있음?', (permissions & READ) === READ);      // true
console.log('쓰기 권한 있음?', (permissions & WRITE) === WRITE);    // true
console.log('실행 권한 있음?', (permissions & EXECUTE) === EXECUTE);  // false

// 플래그 제거
permissions &= ~WRITE;  // 쓰기 권한 제거
console.log('쓰기 권한 제거 후:', permissions);  // 1 (001)
console.log('쓰기 권한 있음?', (permissions & WRITE) === WRITE);    // false

// 8.3. 비트 토글
// XOR 연산자를 사용하여 비트 값을 토글(반전)할 수 있습니다.
let toggle = 5;  // 00000101
toggle ^= 3;     // 00000011 XOR -> 00000110 (6)
console.log('첫 번째 토글:', toggle);  // 6
toggle ^= 3;     // 00000011 XOR -> 00000101 (5)
console.log('두 번째 토글 (원래 값으로 되돌림):', toggle);  // 5

// 8.4. 2의 거듭제곱 계산
// 왼쪽 시프트 연산자를 사용하여 2의 거듭제곱을 빠르게 계산할 수 있습니다.
console.log('2^3 =', 1 << 3);  // 8
console.log('2^4 =', 1 << 4);  // 16
console.log('2^5 =', 1 << 5);  // 32

// 8.5. 색상 처리
// 비트 연산자는 RGB 색상 값을 처리하는 데 유용합니다.
function getRed(color) {
    return (color >> 16) & 0xFF;
}
function getGreen(color) {
    return (color >> 8) & 0xFF;
}
function getBlue(color) {
    return color & 0xFF;
}
function combineRGB(r, g, b) {
    return (r << 16) | (g << 8) | b;
}

let color = 0xFF6347;  // 토마토 색상 (RGB: 255, 99, 71)
console.log('Red:', getRed(color));      // 255
console.log('Green:', getGreen(color));  // 99
console.log('Blue:', getBlue(color));    // 71

let newColor = combineRGB(100, 150, 200);
console.log('새 색상:', newColor.toString(16));  // 6496c8

/**
 * 비트 연산자 사용 시 주의사항
 * 
 * 1. JavaScript에서는 숫자가 64비트 부동소수점으로 저장되지만, 비트 연산 시에는 32비트 정수로 변환됩니다.
 * 
 * 2. 음수는 2의 보수 표현을 사용하므로 예상과 다른 결과가 나올 수 있습니다.
 * 
 * 3. 비트 연산은 대부분의 일반적인 웹 개발 작업에서는 자주 사용되지 않습니다.
 *    성능이 중요한 연산이나 특정 알고리즘에서 주로 사용됩니다.
 * 
 * 4. 가독성을 위해 비트 연산을 사용할 때는 주석을 추가하거나 함수로 추상화하는 것이 좋습니다.
 */ 