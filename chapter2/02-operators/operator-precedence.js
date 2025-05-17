// operator-precedence.js - 연산자 우선순위

/**
 * 연산자 우선순위 (Operator Precedence)
 * 
 * 연산자 우선순위는 표현식이 평가되는 순서를 결정합니다.
 * 우선순위가 높은 연산자가 먼저 평가되고, 우선순위가 같은 경우에는 
 * 결합성(associativity)에 따라 왼쪽에서 오른쪽 또는 오른쪽에서 왼쪽으로 평가됩니다.
 */

console.log('==== 연산자 우선순위 예제 ====');

// 1. 기본 산술 연산자 우선순위
// 곱셈/나눗셈은 덧셈/뺄셈보다 우선순위가 높습니다.
let result1 = 2 + 3 * 4;
console.log('2 + 3 * 4 =', result1);  // 14 (3 * 4 = 12, 2 + 12 = 14)

// 괄호를 사용하여 우선순위를 변경할 수 있습니다.
let result2 = (2 + 3) * 4;
console.log('(2 + 3) * 4 =', result2);  // 20 (2 + 3 = 5, 5 * 4 = 20)

// 2. 연산자 우선순위 테이블
// 다음은 우선순위가 높은 순서입니다.

// 2.1. 그룹화 연산자
let result3 = 2 * (3 + 4);
console.log('2 * (3 + 4) =', result3);  // 14 (3 + 4 = 7, 2 * 7 = 14)

// 2.2. 멤버 접근, 호출, new
let array = [1, 2, 3];
console.log('array[0] =', array[0]);  // 1 (멤버 접근)

function add(a, b) {
    return a + b;
}
console.log('add(2, 3) =', add(2, 3));  // 5 (함수 호출)

// 2.3. 후위 증가/감소
let a = 5;
let b = a++;  // 후위 증가: b에 현재 a 값을 할당하고 나서 a를 증가
console.log('a =', a, 'b =', b);  // a = 6, b = 5

// 2.4. 전위 증가/감소, 단항 연산자(+, -, !, ~)
let c = 5;
let d = ++c;  // 전위 증가: c를 먼저 증가시키고 그 값을 d에 할당
console.log('c =', c, 'd =', d);  // c = 6, d = 6

let e = -c;  // 단항 부정
console.log('-c =', e);  // -6

// 2.5. 지수 연산자
let result4 = 2 ** 3;
console.log('2 ** 3 =', result4);  // 8 (2의 3승)

// 지수 연산자는 오른쪽에서 왼쪽으로 결합합니다.
let result5 = 2 ** 3 ** 2;  // 2 ** (3 ** 2) = 2 ** 9 = 512
console.log('2 ** 3 ** 2 =', result5);  // 512

// 2.6. 곱셈, 나눗셈, 나머지
let result6 = 10 / 2 * 5;
console.log('10 / 2 * 5 =', result6);  // 25 (왼쪽에서 오른쪽으로: 10 / 2 = 5, 5 * 5 = 25)

// 2.7. 덧셈, 뺄셈
let result7 = 10 - 5 + 2;
console.log('10 - 5 + 2 =', result7);  // 7 (왼쪽에서 오른쪽으로: 10 - 5 = 5, 5 + 2 = 7)

// 2.8. 비트 시프트
let result8 = 8 >> 1 << 1;
console.log('8 >> 1 << 1 =', result8);  // 8 (8 >> 1 = 4, 4 << 1 = 8)

// 2.9. 관계 연산자
let result9 = 5 > 3 > 1;
console.log('5 > 3 > 1 =', result9);  // false (5 > 3 = true, true > 1 = false)
console.log('5 > 3 && 3 > 1 =', 5 > 3 && 3 > 1);  // true

// 2.10. 동등 연산자
let result10 = 5 == '5';
console.log('5 == "5" =', result10);  // true (타입 변환)

let result11 = 5 === '5';
console.log('5 === "5" =', result11);  // false (타입까지 비교)

// 2.11. 비트 AND, XOR, OR
let result12 = 5 & 3 | 2;
console.log('5 & 3 | 2 =', result12);  // 3 (5 & 3 = 1, 1 | 2 = 3)

// 2.12. 논리 AND, OR
let result13 = true || false && false;
console.log('true || false && false =', result13);  // true (false && false = false, true || false = true)

// 논리 AND는 논리 OR보다 우선순위가 높습니다.
let result14 = (true || false) && false;
console.log('(true || false) && false =', result14);  // false

// 2.13. 조건(삼항) 연산자
let result15 = true ? 1 : false ? 2 : 3;
console.log('true ? 1 : false ? 2 : 3 =', result15);  // 1

// 삼항 연산자는 오른쪽에서 왼쪽으로 결합합니다.
let result16 = false ? 1 : true ? 2 : 3;
console.log('false ? 1 : true ? 2 : 3 =', result16);  // 2 (false ? 1 : (true ? 2 : 3))

// 2.14. 할당 연산자
let x = 5;
let y = 10;
let z = x = y;
console.log('x =', x, 'y =', y, 'z =', z);  // x = 10, y = 10, z = 10

// 할당은 오른쪽에서 왼쪽으로 결합합니다.
let m, n, o;
m = n = o = 0;
console.log('m =', m, 'n =', n, 'o =', o);  // m = 0, n = 0, o = 0

// 3. 복잡한 표현식의 예
let complex = 2 + 3 * 4 ** 2 / (6 - 2) + 5;
// 평가 순서:
// 1. (6 - 2) = 4
// 2. 4 ** 2 = 16
// 3. 3 * 16 = 48
// 4. 48 / 4 = 12
// 5. 2 + 12 = 14
// 6. 14 + 5 = 19
console.log('2 + 3 * 4 ** 2 / (6 - 2) + 5 =', complex);  // 19

// 4. 괄호를 사용한 명확한 표현
// 복잡한 표현식은 괄호를 사용하여 명확하게 만드는 것이 좋습니다.
let clearer = 2 + (3 * (4 ** 2) / (6 - 2)) + 5;
console.log('2 + (3 * (4 ** 2) / (6 - 2)) + 5 =', clearer);  // 19

// 5. 논리 연산자와 단락 평가
// 논리 연산자는 단락 평가를 수행합니다.
let shortCircuit1 = false && console.log('이 메시지는 출력되지 않습니다.');
let shortCircuit2 = true || console.log('이 메시지도 출력되지 않습니다.');

/**
 * 연산자 우선순위 사용 시 주의사항
 * 
 * 1. 모든 연산자의 우선순위를 외우는 것은 어렵습니다. 
 *    복잡한 표현식에서는 괄호를 사용하여 명확하게 의도를 표현하는 것이 좋습니다.
 * 
 * 2. 논리 연산자(&&, ||)의 우선순위를 주의해야 합니다.
 *    논리 AND(&&)는 논리 OR(||)보다 우선순위가 높습니다.
 * 
 * 3. 비트 연산자의 우선순위도 주의해야 합니다.
 *    특히 비트 AND, XOR, OR의 우선순위는 각각 다릅니다.
 * 
 * 4. 할당 연산자는 대부분의 연산자보다 우선순위가 낮습니다.
 *    표현식 평가 결과를 변수에 할당하는 경우, 괄호가 없으면 할당이 마지막에 수행됩니다.
 * 
 * 5. 코드 가독성을 위해 복잡한 표현식은 여러 줄로 나누거나 임시 변수를 사용하는 것이 좋습니다.
 */ 