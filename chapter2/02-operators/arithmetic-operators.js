// arithmetic-operators.js - 산술 연산자

/**
 * 산술 연산자 (Arithmetic Operators)
 * 
 * 산술 연산자는 수학적 계산을 수행하는 연산자입니다.
 * JavaScript는 다음과 같은 기본적인 산술 연산자를 제공합니다.
 */

console.log('==== 산술 연산자 예제 ====');

// 1. 덧셈 연산자 (+)
let sum = 5 + 3;
console.log('5 + 3 =', sum);  // 8

// 문자열 연결에도 사용됩니다.
let greeting = '안녕' + '하세요';
console.log('문자열 연결:', greeting);  // 안녕하세요

// 숫자와 문자열 조합 - 문자열로 변환됩니다.
let mixedString = '점수: ' + 85;
console.log('숫자와 문자열:', mixedString);  // 점수: 85

// 2. 뺄셈 연산자 (-)
let difference = 10 - 4;
console.log('10 - 4 =', difference);  // 6

// 3. 곱셈 연산자 (*)
let product = 6 * 7;
console.log('6 * 7 =', product);  // 42

// 4. 나눗셈 연산자 (/)
let quotient = 20 / 4;
console.log('20 / 4 =', quotient);  // 5

// 0으로 나누면 Infinity가 됩니다.
console.log('10 / 0 =', 10 / 0);  // Infinity

// 5. 나머지 연산자 (%)
let remainder = 17 % 5;
console.log('17 % 5 =', remainder);  // 2

// 6. 지수 연산자 (**)
let power = 2 ** 3;  // 2의 3승 (ES2016에서 추가)
console.log('2 ** 3 =', power);  // 8

// Math.pow()를 사용할 수도 있습니다.
console.log('Math.pow(2, 3) =', Math.pow(2, 3));  // 8

// 7. 증가 연산자 (++)
let count = 5;
count++;  // 후위 증가: 현재 값을 반환한 후 1 증가
console.log('count++ 후:', count);  // 6

let anotherCount = 5;
++anotherCount;  // 전위 증가: 1 증가 후 새 값 반환
console.log('++anotherCount 후:', anotherCount);  // 6

// 후위 증가와 전위 증가의 차이
let x = 3;
let y = x++;  // y에는 증가 전 값인 3이 할당되고, x는 4가 됨
console.log('x =', x, 'y =', y);  // x = 4 y = 3

let a = 3;
let b = ++a;  // a가 먼저 4로 증가한 후 b에 할당됨
console.log('a =', a, 'b =', b);  // a = 4 b = 4

// 8. 감소 연산자 (--)
let stock = 10;
stock--;  // 후위 감소
console.log('stock-- 후:', stock);  // 9

let anotherStock = 10;
--anotherStock;  // 전위 감소
console.log('--anotherStock 후:', anotherStock);  // 9

// 9. 단항 부정 연산자 (-)
let positive = 5;
let negative = -positive;
console.log('negative =', negative);  // -5

// 10. 단항 플러스 연산자 (+)
// 숫자가 아닌 값을 숫자로 변환합니다. (Number() 와 유사)
let numString = '42';
let num = +numString;
console.log('typeof numString =', typeof numString);  // string
console.log('typeof num =', typeof num);  // number
console.log('+numString =', num);  // 42

// 변환 예제
console.log('+true =', +true);  // 1
console.log('+false =', +false);  // 0
console.log('+null =', +null);  // 0
console.log('+undefined =', +undefined);  // NaN
console.log('+\'hello\' =', +'hello');  // NaN

// 계산 예제
let result = 10 + 5 * 2;
console.log('10 + 5 * 2 =', result);  // 20 (곱셈이 먼저 수행됨)

let result2 = (10 + 5) * 2;
console.log('(10 + 5) * 2 =', result2);  // 30 (괄호 안의 덧셈이 먼저 수행됨)

/**
 * 연산자 우선순위
 * 1. 괄호 ()
 * 2. 증가/감소 (++, --)
 * 3. 단항 부정/플러스 (-, +)
 * 4. 지수 (**)
 * 5. 곱셈/나눗셈/나머지 (*, /, %)
 * 6. 덧셈/뺄셈 (+, -)
 * 
 * 복잡한 표현식에서는 괄호를 사용하여 연산 순서를 명확히 하는 것이 좋습니다.
 */ 