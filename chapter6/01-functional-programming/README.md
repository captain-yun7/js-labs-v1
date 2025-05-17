# 함수형 프로그래밍

이 섹션에서는 JavaScript에서의 함수형 프로그래밍 패러다임에 대해 학습합니다.

## 학습 목표
- 함수형 프로그래밍의 핵심 개념 이해하기
- 순수 함수와 부수 효과의 차이점 알기
- 고차 함수 사용하기
- 함수 합성과 커링 적용하기
- 불변성(Immutability)의 중요성 이해하기
- map, filter, reduce 함수 활용하기

## 예제 파일
- `pure-functions.js`: 순수 함수 예제
- `higher-order-functions.js`: 고차 함수 예제
- `map-filter-reduce.js`: 배열 고차 함수 예제
- `composition-currying.js`: 함수 합성과 커링 예제
- `immutability.js`: 불변성 예제

## 함수형 프로그래밍의 핵심 개념

함수형 프로그래밍은 순수 함수를 사용하여 부수 효과를 최소화하고 상태 변경을 피하는 프로그래밍 패러다임입니다.

### 주요 특징

1. **순수 함수(Pure Functions)**
   - 동일한 입력에 대해 항상 동일한 출력을 반환
   - 외부 상태를 변경하지 않음
   - 부수 효과(Side Effect)가 없음

2. **불변성(Immutability)**
   - 데이터 변경 대신 새로운 데이터 생성
   - 원본 데이터 보존

3. **일급 함수(First-Class Functions)**
   - 함수를 변수에 할당 가능
   - 다른 함수의 매개변수로 전달 가능
   - 함수에서 반환 가능

4. **고차 함수(Higher-Order Functions)**
   - 함수를 인자로 받거나 함수를 반환하는 함수
   - 예: map, filter, reduce

5. **선언적 프로그래밍(Declarative Programming)**
   - "어떻게"가 아닌 "무엇을" 할지 정의
   - 구현 세부사항보다 목적에 집중

6. **함수 합성(Function Composition)**
   - 여러 작은 함수를 조합하여 복잡한 기능 구현
   - 데이터 흐름을 명확하게 표현

## 순수 함수 (Pure Functions)

순수 함수는 함수형 프로그래밍의 기본 단위입니다.

```javascript
// 순수 함수 예시
function add(a, b) {
  return a + b;
}

// 비순수 함수 예시
let total = 0;
function addToTotal(value) {
  total += value; // 외부 상태 변경
  return total;
}
```

## 고차 함수 (Higher-Order Functions)

고차 함수는 다른 함수를 인자로 받거나 함수를 반환하는 함수입니다.

```javascript
// 함수를 인자로 받는 고차 함수
function applyOperation(a, b, operation) {
  return operation(a, b);
}

const result = applyOperation(5, 3, (a, b) => a + b); // 8

// 함수를 반환하는 고차 함수
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
console.log(double(5)); // 10
```

## 실습 과제
1. 배열의 모든 요소에 함수를 적용하는 자체 map 함수를 구현해보세요.
2. 순수 함수를 사용하여 데이터 변환 파이프라인을 만들어보세요.
3. 함수 합성을 사용하여 여러 함수를 연결하는 compose 함수를 작성해보세요.
4. 불변성을 유지하면서 객체의 속성을 업데이트하는 함수를 작성해보세요. 