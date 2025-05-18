// variables.js - JavaScript 변수와 상수 선언 예제

// 1. var 변수 선언
console.log("=== var 변수 예제 ===");
var name = "윤지순";
var age = 25;
console.log("이름:", name);
console.log("나이:", age);

// var는 재선언 가능
var name = "윤지수";
console.log("바뀐 이름:", name);

// var는 함수 레벨 스코프
function varTest() {  
  if (true) {
    var x = 2;    
  }
  console.log("x:", x); // 2 출력 : if 블록이 종료되었는데도 접근 가능
}
varTest();

// 2. let 변수 선언
console.log("\n=== let 변수 예제 ===");
let title = "JavaScript 기초";
let year = 2025;
console.log("제목:", title);
console.log("연도:", year);

// let은 재할당 가능
title = "JavaScript 심화";
console.log("바뀐 제목:", title);

// let은 블록 레벨 스코프
function letTest() {  
  if (true) {
    let x = 2;    
  }
  // console.log("x:", x); // 2 출력 : if 블록 종료 후 접근 불가
}
letTest();

// 3. const 상수 선언
console.log("\n=== const 상수 예제 ===");
const PI = 3.14159;
const MAX_USERS = 100;
console.log("PI 값:", PI);
console.log("최대 사용자 수:", MAX_USERS);

// const는 재할당 불가능
// PI = 3.14;  // TypeError: Assignment to constant variable.

// const로 선언한 객체의 속성은 변경 가능
const user = {
  name: "최수지",
  age: 30
};
console.log("유저 정보:", user);

user.age = 31;  // 객체의 속성은 변경 가능
console.log("수정된 유저 정보:", user);

// const로 선언한 배열의 요소는 변경 가능
const numbers = [1, 2, 3, 4, 5];
console.log("원래 배열:", numbers);

numbers.push(6);  // 배열에 요소 추가 가능
console.log("수정된 배열:", numbers);

// 4. 호이스팅 예제
console.log("\n=== 호이스팅 예제 ===");
console.log("hoisted var:", hoistedVar);  // undefined (호이스팅됨)
var hoistedVar = "변수가 선언되었습니다.";
console.log("hoisted var:", hoistedVar);  // 값이 할당된 후

// let과 const는 TDZ(Temporal Dead Zone) 때문에 호이스팅되어도 참조 불가
// console.log("hoisted let:", hoistedLet);  // ReferenceError
let hoistedLet = "let 변수입니다.";
console.log("hoisted let:", hoistedLet); 