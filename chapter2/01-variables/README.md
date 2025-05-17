# JavaScript 변수와 데이터 타입

이 섹션에서는 JavaScript의 변수 선언 방법과 기본 데이터 타입에 대해 학습합니다.

## 학습 목표
- 변수와 상수 선언하기 (var, let, const)
- JavaScript의 기본 데이터 타입 이해하기
- 타입 확인 및 변환 방법 배우기

## 예제 파일
- `variables.js`: 변수와 상수 선언 예제
- `data-types.js`: 기본 데이터 타입 예제
- `type-conversion.js`: 타입 변환 예제
- `practice.js`: 실습 파일

## 변수 선언

JavaScript에서는 변수를 선언하는 세 가지 방법이 있습니다:

### var
```javascript
var name = "홍길동";
var age = 25;
```
- 함수 레벨 스코프
- 재선언 및 재할당 가능
- 호이스팅 발생

### let
```javascript
let name = "홍길동";
let age = 25;
```
- 블록 레벨 스코프
- 재할당 가능, 재선언 불가
- 호이스팅 발생하지만 TDZ(Temporal Dead Zone) 적용

### const
```javascript
const PI = 3.14;
const MAX_SIZE = 100;
```
- 블록 레벨 스코프
- 재할당 및 재선언 불가
- 상수 선언에 사용
- 참조형 데이터의 내부 값은 변경 가능

## 기본 데이터 타입

JavaScript의 기본 데이터 타입은 다음과 같습니다:

1. **원시 타입 (Primitive Types)**
   - String: 문자열
   - Number: 숫자
   - Boolean: 논리값 (true/false)
   - Undefined: 값이 할당되지 않은 상태
   - Null: 의도적으로 빈 값을 나타내는 상태
   - Symbol: 고유하고 변경 불가능한 원시 값

2. **참조 타입 (Reference Types)**
   - Object: 객체
   - Array: 배열
   - Function: 함수

## 실습 과제
1. 다양한 타입의 변수를 선언하고 콘솔에 출력해보세요.
2. 서로 다른 타입 간의 변환을 연습해보세요.
3. var, let, const의 차이점을 확인하는 예제를 작성해보세요. 