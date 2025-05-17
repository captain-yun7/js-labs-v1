// practice.js - 이벤트 처리 실습

// 이 파일은 practice.html과 함께 사용됩니다.
// 각 주석 아래에 코드를 작성하여 이벤트 처리를 연습해 보세요.

// 1. 클릭 이벤트 처리하기
// TODO: 'click-btn' ID를 가진 버튼에 클릭 이벤트를 추가하고, 
// 'click-result' ID를 가진 요소에 '버튼이 클릭되었습니다!'라는 텍스트를 표시하세요.


// 2. 마우스 이벤트 처리하기
// TODO: 'hover-box' ID를 가진 요소에 마우스를 올리면(mouseover) 배경색을 변경하고,
// 마우스를 떠나면(mouseout) 원래 색상으로 되돌리는 이벤트 핸들러를 추가하세요.


// 3. 키보드 이벤트 처리하기
// TODO: 'key-input' ID를 가진 입력 필드에 키가 눌릴 때마다(keydown) 
// 어떤 키가 눌렸는지 'key-result' ID를 가진 요소에 표시하세요.


// 4. 폼 제출 이벤트 처리하기
// TODO: 'form-example' ID를 가진 폼이 제출될 때(submit) 기본 동작을 중지하고,
// 입력된 데이터를 'form-result' ID를 가진 요소에 표시하세요.


// 5. 이벤트 위임 (Event Delegation) 사용하기
// TODO: 'task-list' ID를 가진 요소에 이벤트 리스너를 추가하여
// 리스트 아이템이 클릭되면 해당 아이템에 'completed' 클래스를 토글하는 기능을 구현하세요.
// (이벤트 위임을 사용하면 각 리스트 아이템마다 이벤트를 추가할 필요가 없음)


// 6. 사용자 정의 이벤트 만들기
// TODO: 'custom-btn' ID를 가진 버튼을 클릭했을 때 'myCustomEvent'라는 
// 사용자 정의 이벤트를 생성하고 발생시키세요.
// 그리고 'custom-target' ID를 가진 요소에서 이 이벤트를 수신하도록 하세요.


// 7. 이벤트 객체 속성 활용하기
// TODO: 'coords-box' ID를 가진 요소 내에서 마우스가 움직일 때(mousemove),
// 마우스 좌표(clientX, clientY)를 'coords-result' ID를 가진 요소에 표시하세요.


// 8. 이벤트 전파 제어하기
// TODO: 'inner-box' ID와 'outer-box' ID를 가진 중첩된 요소에 각각 클릭 이벤트를 추가하고,
// 'inner-box'를 클릭했을 때 이벤트 전파를 중단하도록 구현하세요.


// 9. 이벤트 한 번만 실행하기
// TODO: 'once-btn' ID를 가진 버튼에 한 번만 실행되는 클릭 이벤트를 추가하여
// 'once-result' ID를 가진 요소에 '이 메시지는 한 번만 표시됩니다!'라는 텍스트를 표시하세요.


// 10. 이벤트 타이밍 제어하기
// TODO: 'resize-box' ID를 가진 요소의 내용을 창 크기가 변경될 때(resize 이벤트) 업데이트하되,
// 성능을 위해 이벤트가 연속으로 발생할 때 제한(throttle or debounce)을 주어 처리하세요. 