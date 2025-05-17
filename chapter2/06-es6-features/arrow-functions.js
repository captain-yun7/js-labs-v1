// arrow-functions.js - 화살표 함수 예제

// 1. 기본 문법
console.log("=== 기본 문법 ===");

// 기존 함수 표현식
const add = function(a, b) {
  return a + b;
};

// 화살표 함수 - 기본형
const addArrow = (a, b) => {
  return a + b;
};

// 화살표 함수 - 더 간결한 형태 (return 생략 가능)
const addShort = (a, b) => a + b;

console.log("기존 함수 결과:", add(5, 3));
console.log("화살표 함수 결과:", addArrow(5, 3));
console.log("간결한 화살표 함수 결과:", addShort(5, 3));

// 2. 매개변수에 따른 표현법
console.log("\n=== 매개변수에 따른 표현법 ===");

// 매개변수가 없는 경우
const sayHello = () => "안녕하세요!";

// 매개변수가 하나인 경우 (괄호 생략 가능)
const double = x => x * 2;

// 매개변수가 여러 개인 경우 (괄호 필수)
const multiply = (x, y) => x * y;

console.log("매개변수 없음:", sayHello());
console.log("매개변수 하나:", double(4));
console.log("매개변수 여러개:", multiply(3, 4));

// 3. 객체 반환하기
console.log("\n=== 객체 반환하기 ===");

// 기존 방식
const createPerson1 = function(name, age) {
  return {
    name: name,
    age: age
  };
};

// 화살표 함수로 객체 반환 (소괄호로 감싸야 함)
const createPerson2 = (name, age) => ({
  name: name,
  age: age
});

console.log("기존 방식:", createPerson1("홍길동", 30));
console.log("화살표 함수:", createPerson2("김철수", 25));

// 4. this의 차이점
console.log("\n=== this의 차이점 ===");

function ThisTest() {
  // 일반 함수의 this
  this.value = 42;
  
  // 일반 함수 - 자신만의 this를 가짐
  this.regularFunc = function() {
    console.log("일반 함수의 this.value:", this.value);
  };
  
  // 화살표 함수 - 상위 스코프의 this를 가짐
  this.arrowFunc = () => {
    console.log("화살표 함수의 this.value:", this.value);
  };
  
  // setTimeout 비교
  setTimeout(function() {
    console.log("setTimeout 일반 함수의 this.value:", this.value); // undefined
  }, 0);
  
  setTimeout(() => {
    console.log("setTimeout 화살표 함수의 this.value:", this.value); // 42
  }, 0);
}

const test = new ThisTest();
test.regularFunc();
test.arrowFunc();

// 5. 콜백 함수에서의 사용
console.log("\n=== 콜백 함수에서의 사용 ===");

const numbers = [1, 2, 3, 4, 5];

// 기존 방식
const doubled1 = numbers.map(function(num) {
  return num * 2;
});

// 화살표 함수
const doubled2 = numbers.map(num => num * 2);

console.log("기존 방식:", doubled1);
console.log("화살표 함수:", doubled2);

// 6. 화살표 함수의 한계
console.log("\n=== 화살표 함수의 한계 ===");

// 화살표 함수는 arguments 객체를 가지지 않습니다.
function regularFunc() {
  console.log("일반 함수의 arguments:", arguments);
}

const arrowFunc = (...args) => {
  // arguments 대신 rest 파라미터를 사용해야 함
  console.log("화살표 함수는 arguments 객체가 없어서 rest 파라미터 사용:", args);
};

regularFunc(1, 2, 3);
arrowFunc(1, 2, 3);

// 화살표 함수는 생성자 함수로 사용할 수 없습니다.
function Person(name) {
  this.name = name;
}

const person1 = new Person("홍길동");
console.log("일반 함수로 객체 생성:", person1);

// 아래 코드는 에러가 발생합니다.
// const PersonArrow = (name) => {
//   this.name = name;
// };
// const person2 = new PersonArrow("김철수"); // TypeError: PersonArrow is not a constructor 