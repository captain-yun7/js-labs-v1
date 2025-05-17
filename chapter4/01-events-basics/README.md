# 이벤트 기초

이 섹션에서는 JavaScript의 이벤트 개념과 기본적인 이벤트 처리 방법에 대해 학습합니다.

## 학습 목표
- 이벤트의 개념 이해하기
- 다양한 이벤트 유형 알아보기
- 이벤트 등록 방법 배우기
- 이벤트 객체 활용하기
- 이벤트 버블링과 캡처링 이해하기

## 예제 파일
- `events-intro.html`: 이벤트 소개 및 기본 예제
- `event-types.html`: 다양한 이벤트 유형 예제
- `event-object.js`: 이벤트 객체 속성과 메서드
- `bubbling-capturing.html`: 이벤트 전파 예제
- `practice.js`: 실습 파일

## 이벤트 개요

이벤트(Event)는 웹 페이지에서 발생하는 동작이나 상태 변화를 의미합니다. 사용자의 마우스 클릭, 키보드 입력, 요소의 로드 완료 등 다양한 상황에서 이벤트가 발생할 수 있습니다.

### 주요 이벤트 유형

1. **마우스 이벤트**
   - `click`: 요소 클릭 시 발생
   - `dblclick`: 요소 더블 클릭 시 발생
   - `mouseover`/`mouseout`: 마우스 포인터가 요소 위로 들어오거나 나갈 때 발생
   - `mousedown`/`mouseup`: 마우스 버튼을 누르거나 뗄 때 발생

2. **키보드 이벤트**
   - `keydown`: 키를 누를 때 발생
   - `keyup`: 키를 뗄 때 발생
   - `keypress`: 문자 키를 누를 때 발생 (deprecated)

3. **폼 이벤트**
   - `submit`: 폼 제출 시 발생
   - `change`: 입력 요소의 값이 변경될 때 발생
   - `focus`/`blur`: 요소가 포커스를 얻거나 잃을 때 발생

4. **문서/창 이벤트**
   - `load`: 페이지 로드 완료 시 발생
   - `resize`: 창 크기 변경 시 발생
   - `scroll`: 스크롤 시 발생

## 이벤트 등록 방법

JavaScript에서 이벤트를 등록하는 방법에는 여러 가지가 있습니다:

1. **HTML 속성 방식**
   ```html
   <button onclick="alert('클릭!')">클릭하세요</button>
   ```

2. **DOM 속성 방식**
   ```javascript
   document.getElementById('myButton').onclick = function() {
     alert('클릭!');
   };
   ```

3. **addEventListener 메서드 (권장)**
   ```javascript
   document.getElementById('myButton').addEventListener('click', function() {
     alert('클릭!');
   });
   ```

## 실습 과제
1. 다양한 이벤트 유형을 테스트해보세요.
2. 이벤트 객체의 속성들을 콘솔에 출력해보세요.
3. 이벤트 버블링과 캡처링의 차이를 확인해보세요.
4. 폼 유효성 검사를 위한 이벤트 처리 코드를 작성해보세요. 