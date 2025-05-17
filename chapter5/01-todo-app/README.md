# 할 일 목록 애플리케이션 (Todo App)

이 프로젝트에서는 JavaScript를 사용하여 간단한 할 일 목록 애플리케이션을 구현합니다.

## 주요 기능
- 할 일 항목 추가
- 할 일 항목 완료 표시
- 할 일 항목 삭제
- 할 일 목록 필터링 (전체/완료/미완료)
- 로컬 스토리지를 이용한 데이터 저장

## 학습 목표
- DOM 조작 방법 숙달하기
- 이벤트 처리하기
- 로컬 스토리지 활용하기
- JavaScript에서 데이터 관리하기
- 사용자 입력 처리하기

## 구현 단계

### 1단계: 기본 구조 작성
- HTML로 기본 UI 구조 작성
- CSS로 기본 스타일링
- JavaScript 파일 연결

### 2단계: 할 일 추가 기능 구현
- 입력 폼에서 할 일 텍스트 가져오기
- 할 일 객체 생성 및 배열에 추가
- DOM에 할 일 항목 렌더링

### 3단계: 할 일 관리 기능 구현
- 완료 상태 토글 기능
- 삭제 기능
- 필터링 기능

### 4단계: 로컬 스토리지 연동
- 할 일 목록 로컬 스토리지에 저장
- 페이지 로드 시 로컬 스토리지에서 데이터 불러오기

### 5단계: UI 개선 및 기능 확장
- 드래그 앤 드롭으로 순서 변경
- 할 일 수정 기능
- 마감일 설정 기능

## 파일 구조
- `index.html`: 애플리케이션의 HTML 구조
- `styles.css`: 스타일시트
- `script.js`: 애플리케이션 로직 구현
- `assets/`: 아이콘 및 이미지 리소스

## 코드 구조

### HTML 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>할 일 목록 앱</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>할 일 목록</h1>
            <form id="todo-form">
                <input type="text" id="todo-input" placeholder="할 일을 입력하세요">
                <button type="submit">추가</button>
            </form>
        </header>
        
        <div class="filters">
            <button class="filter-btn active" data-filter="all">전체</button>
            <button class="filter-btn" data-filter="active">미완료</button>
            <button class="filter-btn" data-filter="completed">완료</button>
        </div>
        
        <ul id="todo-list">
            <!-- 할 일 항목이 여기에 추가됩니다 -->
        </ul>
        
        <footer>
            <p><span id="items-left">0</span> 항목 남음</p>
            <button id="clear-completed">완료된 항목 삭제</button>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

### JavaScript 데이터 구조
```javascript
// 할 일 항목 객체 구조
const todoItem = {
    id: 1,
    text: '할 일 내용',
    completed: false,
    createdAt: new Date()
};

// 할 일 목록 배열
let todos = [];
```

## 도전 과제
1. 할 일에 우선순위 부여 기능 추가하기
2. 할 일 카테고리 추가하기
3. 할 일 검색 기능 구현하기
4. 다크 모드/라이트 모드 전환 기능 추가하기
5. 할 일 통계 대시보드 구현하기 