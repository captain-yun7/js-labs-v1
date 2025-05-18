// data-types.js - JavaScript 기본 데이터 타입 예제

// 1. 원시 타입 (Primitive Types)
console.log("=== 원시 타입 ===");

// String (문자열)
const firstName = "홍";
const lastName = '길동';
const fullName = `${firstName}${lastName}`;
console.log("문자열 예제:", fullName);
console.log("문자열 길이:", fullName.length);
console.log("문자열 메서드:", fullName.toUpperCase());
console.log("템플릿 리터럴:", `안녕하세요, ${fullName}님!`);

// Number (숫자)
const integer = 42;
const float = 3.14;
const infinity = Infinity;
const notANumber = NaN;
console.log("정수:", integer);
console.log("실수:", float);
console.log("무한대:", infinity);
console.log("숫자가 아님:", notANumber);
console.log("최대 안전 정수:", Number.MAX_SAFE_INTEGER);
console.log("수학 연산:", Math.sqrt(16));

// Boolean (논리값)
const isActive = true;
const isLoggedIn = false;
console.log("참:", isActive);
console.log("거짓:", isLoggedIn);
console.log("논리 연산:", isActive && isLoggedIn); // AND 연산
console.log("논리 연산:", isActive || isLoggedIn); // OR 연산
console.log("논리 연산:", !isActive); // NOT 연산

// Undefined
let undefinedVar;
console.log("정의되지 않은 변수:", undefinedVar);

// Null
const emptyValue = null;
console.log("null 값:", emptyValue);

// Symbol (ES6에서 추가)
const symbol1 = Symbol("id");
const symbol2 = Symbol("id");
console.log("심볼 값:", symbol1);
console.log("심볼 설명:", symbol1.description);
console.log("심볼 비교:", symbol1 === symbol2); // false, 항상 고유함

// 2. 참조 타입 (Reference Types)
console.log("\n=== 참조 타입 ===");

// Object (객체)
const person = {
  name: "김철수",
  age: 28,
  job: "개발자",
  address: {
    city: "서울",
    district: "강남구"
  },
  sayHello: function() {
    return `안녕하세요, ${this.name}입니다!`;
  }
};
console.log("객체:", person);
console.log("객체 속성 접근:", person.name);
console.log("객체 속성 접근:", person["age"]);
console.log("중첩 객체 접근:", person.address.city);
console.log("객체 메서드 호출:", person.sayHello());

// Array (배열)
const colors = ["빨강", "초록", "파랑"];
const mixed = [1, "문자열", true, null, { key: "value" }];
console.log("배열:", colors);
console.log("혼합 배열:", mixed);
console.log("배열 길이:", colors.length);
console.log("배열 요소 접근:", colors[1]);
console.log("배열 메서드:", colors.join(", "));

// 배열 메서드 예제
colors.push("노랑");
console.log("push 후 배열:", colors);
colors.pop();
console.log("pop 후 배열:", colors);
const slicedColors = colors.slice(0, 2);
console.log("slice 결과:", slicedColors);

// Function (함수)
function add(a, b) {
  return a + b;
}

const subtract = function(a, b) {
  return a - b;
};

const multiply = (a, b) => a * b;

console.log("함수 호출:", add(5, 3));
console.log("함수 표현식:", subtract(10, 4));
console.log("화살표 함수:", multiply(3, 4));

// 3. 타입 확인
console.log("\n=== 타입 확인 ===");
console.log("typeof 문자열:", typeof "Hello");
console.log("typeof 숫자:", typeof 42);
console.log("typeof 불리언:", typeof true);
console.log("typeof undefined:", typeof undefined);
console.log("typeof 객체:", typeof {});
console.log("typeof 배열:", typeof []); // 객체로 출력됨
console.log("typeof 함수:", typeof function(){});
console.log("typeof null:", typeof null); // 객체로 출력됨 (JavaScript 버그)

// 배열 확인 방법
console.log("Array.isArray([]):", Array.isArray([]));
console.log("Array.isArray({}):", Array.isArray({})); 