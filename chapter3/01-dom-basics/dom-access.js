// dom-access.js - DOM 접근 방법

// DOM 접근 방법에 대한 예제입니다.
// 이 스크립트는 dom-access.html에서 사용됩니다.

// 1. ID로 요소 선택하기
console.log("=== ID로 요소 선택하기 ===");
const headerElement = document.getElementById('header');
console.log('헤더 요소:', headerElement);

// 2. 태그 이름으로 요소 선택하기
console.log("\n=== 태그 이름으로 요소 선택하기 ===");
const paragraphs = document.getElementsByTagName('p');
console.log('단락 요소 개수:', paragraphs.length);
console.log('첫 번째 단락:', paragraphs[0]);

// 3. 클래스 이름으로 요소 선택하기
console.log("\n=== 클래스 이름으로 요소 선택하기 ===");
const highlights = document.getElementsByClassName('highlight');
console.log('하이라이트 요소 개수:', highlights.length);
console.log('첫 번째 하이라이트:', highlights[0]);

// 4. CSS 선택자로 요소 선택하기
console.log("\n=== CSS 선택자로 요소 선택하기 ===");
// querySelector는 조건에 맞는 첫 번째 요소만 반환
const firstHighlight = document.querySelector('.highlight');
console.log('첫 번째 .highlight 요소:', firstHighlight);

// querySelectorAll은 조건에 맞는 모든 요소를 NodeList로 반환
const allButtons = document.querySelectorAll('button');
console.log('모든 버튼 요소:', allButtons);

// 복합 선택자 사용
const containerParagraph = document.querySelector('.container p');
console.log('컨테이너 내 첫 번째 단락:', containerParagraph);

// 5. DOM 속성 접근 및 수정
console.log("\n=== DOM 속성 접근 및 수정 ===");
const title = document.getElementById('title');
if (title) {
    console.log('제목 텍스트:', title.textContent);
    console.log('제목 HTML:', title.innerHTML);
    
    // 텍스트 변경
    title.textContent = '변경된 제목';
    console.log('변경된 제목 텍스트:', title.textContent);
    
    // HTML 변경
    title.innerHTML = '변경된 <span class="highlight">제목</span>';
    console.log('변경된 제목 HTML:', title.innerHTML);
}

// 6. 속성 접근 및 수정
console.log("\n=== 속성 접근 및 수정 ===");
const link = document.getElementById('link');
if (link) {
    console.log('링크 href:', link.getAttribute('href'));
    console.log('링크 target:', link.getAttribute('target'));
    
    // 속성 변경
    link.setAttribute('href', 'https://www.example.com');
    link.setAttribute('target', '_blank');
    
    console.log('변경된 링크 href:', link.getAttribute('href'));
    
    // 속성 확인
    console.log('링크에 target 속성 존재?', link.hasAttribute('target'));
    
    // 속성 삭제
    link.removeAttribute('target');
    console.log('target 속성 삭제 후:', link.getAttribute('target'));
}

// 7. 스타일 속성 접근 및 수정
console.log("\n=== 스타일 속성 접근 및 수정 ===");
const box = document.getElementById('box');
if (box) {
    // 인라인 스타일 설정
    box.style.backgroundColor = 'lightblue';
    box.style.padding = '20px';
    box.style.border = '2px solid navy';
    
    console.log('박스 배경색:', box.style.backgroundColor);
    console.log('박스 패딩:', box.style.padding);
    
    // CSS 클래스 조작
    console.log('박스 클래스:', box.className);
    box.className += ' active'; // 클래스 추가
    console.log('클래스 추가 후:', box.className);
    
    // classList 사용 (더 현대적인 방법)
    box.classList.add('new-class');
    box.classList.remove('active');
    console.log('classList 변경 후:', box.className);
    
    // 클래스 존재 여부 확인
    console.log('new-class 존재?', box.classList.contains('new-class'));
    
    // 클래스 토글
    box.classList.toggle('visible');
    console.log('토글 후 클래스:', box.className);
} 