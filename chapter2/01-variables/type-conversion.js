// type-conversion.js - JavaScript 타입 변환 예제

// 1. 암시적 타입 변환 (자동 형변환)
console.log("=== 암시적 타입 변환 ===");

// 문자열과 숫자 더하기
const num = 42;
const str = "결과는: ";
console.log(str + num);  // 문자열로 변환됨

// 숫자로 자동 변환
console.log("5" - 2);    // 3 (문자열 "5"가 숫자로 변환됨)
console.log("5" * 2);    // 10 (문자열 "5"가 숫자로 변환됨)
console.log("5" / 2);    // 2.5 (문자열 "5"가 숫자로 변환됨)

// 불리언으로 자동 변환
console.log(Boolean(1));        // true
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean("hello"));  // true
console.log(Boolean(null));     // false
console.log(Boolean(undefined)); // false

// 조건문에서의 암시적 변환
if (1) {
  console.log("1은 true로 평가됩니다.");
}

if ("hello") {
  console.log("비어있지 않은 문자열은 true로 평가됩니다.");
}

// 2. 명시적 타입 변환 (강제 형변환)
console.log("\n=== 명시적 타입 변환 ===");

// 문자열로 변환
console.log(String(42));            // "42"
console.log(String(true));          // "true"
console.log(String(null));          // "null"
console.log(String(undefined));     // "undefined"
console.log(String({name: "Kim"})); // "[object Object]"
console.log(String([1, 2, 3]));     // "1,2,3"

// toString() 메서드 사용
console.log((42).toString());       // "42"
console.log((true).toString());     // "true"
console.log([1, 2, 3].toString());  // "1,2,3"

// 숫자로 변환
console.log(Number("42"));          // 42
console.log(Number("3.14"));        // 3.14
console.log(Number(""));            // 0
console.log(Number("hello"));       // NaN
console.log(Number(true));          // 1
console.log(Number(false));         // 0
console.log(Number(null));          // 0
console.log(Number(undefined));     // NaN

// parseInt() 및 parseFloat() 함수 사용
console.log(parseInt("42"));        // 42
console.log(parseInt("42px"));      // 42 (숫자로 시작하면 변환 가능)
console.log(parseInt("3.14"));      // 3 (정수만 반환)
console.log(parseFloat("3.14"));    // 3.14
console.log(parseInt("hello"));     // NaN

// 불리언으로 변환
console.log(Boolean(42));           // true
console.log(Boolean(0));            // false
console.log(Boolean(""));           // false
console.log(Boolean("hello"));      // true
console.log(Boolean(null));         // false
console.log(Boolean(undefined));    // false
console.log(Boolean(NaN));          // false

// !! 연산자를 사용한 불리언 변환
console.log(!!"hello");             // true
console.log(!!0);                   // false
console.log(!!"");                  // false
console.log(!!null);                // false

// 3. 타입 변환 주의사항
console.log("\n=== 타입 변환 주의사항 ===");

// 동등 연산자(==)와 일치 연산자(===)
console.log("== vs ===");
console.log("5" == 5);   // true (타입 변환 후 비교)
console.log("5" === 5);  // false (타입까지 비교)
console.log(0 == false); // true (타입 변환 후 비교)
console.log(0 === false); // false (타입까지 비교)
console.log("" == false); // true (타입 변환 후 비교)
console.log("" === false); // false (타입까지 비교)

// 예상치 못한 NaN 결과
console.log("NaN 결과:");
console.log(Number("abc"));     // NaN
console.log(parseInt("xyz"));   // NaN
console.log(5 * "hello");       // NaN

// NaN 확인 방법
console.log(isNaN(NaN));        // true
console.log(isNaN("hello"));    // true (문자열은 숫자로 변환하면 NaN)
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("hello")); // false (타입 변환을 수행하지 않음) 