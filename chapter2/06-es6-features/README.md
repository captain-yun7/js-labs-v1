# ES6+ 문법과 기능

이 섹션에서는 ECMAScript 2015(ES6)부터 도입된 최신 JavaScript 문법과 기능에 대해 학습합니다.

## 학습 목표
- 화살표 함수 사용하기
- 구조 분해 할당 적용하기
- 스프레드/레스트 연산자 활용하기
- 템플릿 리터럴 사용하기
- 클래스 문법 이해하기
- 기타 ES6+ 기능 살펴보기

## 예제 파일
- `arrow-functions.js`: 화살표 함수 예제
- `destructuring.js`: 구조 분해 할당 예제
- `spread-rest.js`: 스프레드/레스트 연산자 예제
- `template-literals.js`: 템플릿 리터럴 예제
- `classes.js`: 클래스 문법 예제
- `other-features.js`: 기타 ES6+ 기능 예제

## 화살표 함수 (Arrow Functions)

화살표 함수는 함수를 더 간결하게 작성할 수 있는 문법입니다.

```javascript
// 기존 함수 표현식
const add = function(a, b) {
  return a + b;
};

// 화살표 함수
const addArrow = (a, b) => a + b;
```

화살표 함수는 일반 함수와 달리 자신만의 `this`를 가지지 않습니다. 상위 스코프의 `this`를 그대로 사용합니다.

## 구조 분해 할당 (Destructuring)

구조 분해 할당은 배열이나 객체에서 값을 추출하여 변수에 할당하는 문법입니다.

```javascript
// 객체 구조 분해
const person = { name: '홍길동', age: 30 };
const { name, age } = person;

// 배열 구조 분해
const colors = ['빨강', '초록', '파랑'];
const [red, green, blue] = colors;
```

## 스프레드/레스트 연산자 (Spread/Rest Operator)

스프레드 연산자(`...`)는 배열이나 객체를 펼치는 데 사용됩니다.

```javascript
// 배열 합치기
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// 객체 합치기
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinedObj = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }
```

레스트 연산자는 나머지 요소들을 모으는 데 사용됩니다.

```javascript
// 함수 매개변수에서 사용
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// 구조 분해 할당에서 사용
const [first, second, ...rest] = [1, 2, 3, 4, 5];
```

## 실습 과제
1. 화살표 함수와 일반 함수의 차이점을 확인하는 예제를 작성해보세요.
2. 복잡한 객체와 배열에 구조 분해 할당을 적용해보세요.
3. 스프레드 연산자를 사용해 객체와 배열을 복사하고 수정하는 예제를 만들어보세요. 