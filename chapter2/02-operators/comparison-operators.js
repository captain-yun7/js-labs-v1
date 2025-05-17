// comparison-operators.js - 비교 연산자

/**
 * 비교 연산자 (Comparison Operators)
 * 
 * 비교 연산자는 두 값을 비교하고 boolean 값(true/false)을 반환합니다.
 * 이 연산자들은 조건문과 루프에서 의사 결정을 하는 데 중요하게 사용됩니다.
 */

console.log('==== 비교 연산자 예제 ====');

// 1. 동등 연산자 (==)
// 값이 같은지 비교하며, 타입이 다를 경우 변환을 시도합니다.
console.log('5 == 5:', 5 == 5);            // true
console.log('5 == "5":', 5 == "5");        // true (문자열 "5"가 숫자 5로 변환됨)
console.log('0 == false:', 0 == false);    // true (false가 0으로 변환됨)
console.log('null == undefined:', null == undefined);  // true (둘 다 '없음'을 의미)
console.log('"hello" == "world":', "hello" == "world");  // false

// 2. 일치 연산자 (===)
// 값과 타입이 모두 같은지 비교합니다. 타입 변환이 없습니다.
console.log('5 === 5:', 5 === 5);          // true
console.log('5 === "5":', 5 === "5");      // false (숫자 5와 문자열 "5"는 타입이 다름)
console.log('0 === false:', 0 === false);  // false (숫자 0과 불리언 false는 타입이 다름)
console.log('null === undefined:', null === undefined);  // false (타입이 다름)

// 3. 부등 연산자 (!=)
// 값이 다른지 비교하며, 타입이 다를 경우 변환을 시도합니다.
console.log('5 != 8:', 5 != 8);            // true
console.log('5 != "5":', 5 != "5");        // false (문자열 "5"가 숫자 5로 변환됨)
console.log('0 != false:', 0 != false);    // false (false가 0으로 변환됨)

// 4. 불일치 연산자 (!==)
// 값이나 타입이 다른지 비교합니다. 타입 변환이 없습니다.
console.log('5 !== 8:', 5 !== 8);          // true
console.log('5 !== "5":', 5 !== "5");      // true (숫자 5와 문자열 "5"는 타입이 다름)
console.log('0 !== false:', 0 !== false);  // true (숫자 0과 불리언 false는 타입이 다름)

// 5. 크다 연산자 (>)
console.log('8 > 5:', 8 > 5);              // true
console.log('5 > 5:', 5 > 5);              // false
console.log('5 > "3":', 5 > "3");          // true (문자열 "3"이 숫자 3으로 변환됨)

// 6. 크거나 같다 연산자 (>=)
console.log('8 >= 5:', 8 >= 5);            // true
console.log('5 >= 5:', 5 >= 5);            // true
console.log('3 >= 5:', 3 >= 5);            // false

// 7. 작다 연산자 (<)
console.log('5 < 8:', 5 < 8);              // true
console.log('5 < 5:', 5 < 5);              // false
console.log('"3" < 5:', "3" < 5);          // true (문자열 "3"이 숫자 3으로 변환됨)

// 8. 작거나 같다 연산자 (<=)
console.log('5 <= 8:', 5 <= 8);            // true
console.log('5 <= 5:', 5 <= 5);            // true
console.log('8 <= 5:', 8 <= 5);            // false

// 문자열 비교
// 문자열 비교는 유니코드 값을 기준으로 사전식(lexicographical) 비교를 합니다.
console.log('"apple" < "banana":', "apple" < "banana");    // true ('a'는 'b'보다 먼저 옴)
console.log('"apple" < "Apple":', "apple" < "Apple");      // false (소문자가 대문자보다 유니코드 값이 큼)
console.log('"10" < "2":', "10" < "2");                    // true (문자열로 비교하면 '1'이 '2'보다 먼저 옴)

// 다른 타입 간 비교
console.log('null == 0:', null == 0);              // false
console.log('null >= 0:', null >= 0);              // true (null이 0으로 변환됨)
console.log('undefined == 0:', undefined == 0);    // false
console.log('undefined >= 0:', undefined >= 0);    // false (undefined가 NaN으로 변환됨)

// NaN 비교
// NaN은 자기 자신을 포함하여 어떤 값과도 같지 않습니다.
console.log('NaN == NaN:', NaN == NaN);            // false
console.log('NaN === NaN:', NaN === NaN);          // false
console.log('isNaN(NaN):', isNaN(NaN));            // true (올바른 NaN 확인 방법)
console.log('Number.isNaN(NaN):', Number.isNaN(NaN));  // true (더 엄격한 NaN 확인 방법)

// 객체 비교
// 객체는 참조 비교를 합니다. 같은 객체를 참조할 때만 동등합니다.
let obj1 = { name: 'John' };
let obj2 = { name: 'John' };
let obj3 = obj1;
console.log('obj1 == obj2:', obj1 == obj2);        // false (다른 객체 참조)
console.log('obj1 === obj2:', obj1 === obj2);      // false (다른 객체 참조)
console.log('obj1 == obj3:', obj1 == obj3);        // true (같은 객체 참조)
console.log('obj1 === obj3:', obj1 === obj3);      // true (같은 객체 참조)

/**
 * 비교 연산자 사용 시 주의사항
 * 
 * 1. 동등(==)과 일치(===) 연산자 간의 차이를 이해하는 것이 중요합니다.
 *    일반적으로는 타입 변환이 없는 일치 연산자(===)를 사용하는 것이 안전합니다.
 * 
 * 2. NaN은 자기 자신을 포함하여 어떤 값과도 같지 않습니다.
 *    NaN을 확인하려면 isNaN() 또는 Number.isNaN() 함수를 사용해야 합니다.
 * 
 * 3. 객체는 참조 비교를 합니다. 내용이 같아도 다른 객체면 다른 것으로 간주됩니다.
 * 
 * 4. null과 undefined의 비교 동작을 기억하세요:
 *    - null == undefined는 true입니다.
 *    - null === undefined는 false입니다.
 *    - null == 0는 false입니다.
 *    - null >= 0는 true입니다 (null이 0으로 변환됨).
 */ 