// fetch-basics.js - Fetch API 기본 사용법

// 1. 기본 GET 요청
console.log("=== 기본 GET 요청 ===");

function basicFetch() {
  // JSONPlaceholder - 테스트용 무료 REST API
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  
  fetch(url)
    .then(response => {
      // 응답 상태 확인
      console.log('Status:', response.status);
      console.log('OK:', response.ok);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', response.headers);
      
      // 응답 본문을 JSON으로 파싱
      return response.json();
    })
    .then(data => {
      console.log('데이터:', data);
    })
    .catch(error => {
      console.error('에러 발생:', error);
    });
}

// 함수 실행 (브라우저 환경에서만 동작)
// basicFetch();

// 2. 옵션을 포함한 GET 요청
console.log("\n=== 옵션을 포함한 GET 요청 ===");

function fetchWithOptions() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  
  const options = {
    method: 'GET', // 요청 메서드 (기본값은 GET)
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Custom-Header': 'CustomValue'
    },
    credentials: 'same-origin', // 쿠키 포함 여부 설정 (기본값은 'omit')
    cache: 'no-cache', // 캐시 모드 설정
    redirect: 'follow', // 리다이렉션 처리 방법
    referrerPolicy: 'no-referrer-when-downgrade', // 리퍼러 정보 전송 방법
    mode: 'cors' // CORS 모드 설정 (기본값은 'cors')
  };
  
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(`총 ${data.length}개의 게시물 가져옴`);
      console.log('첫 번째 게시물:', data[0]);
    })
    .catch(error => {
      console.error('에러 발생:', error);
    });
}

// fetchWithOptions();

// 3. POST 요청 보내기
console.log("\n=== POST 요청 보내기 ===");

function postRequest() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  
  const newPost = {
    title: '새 게시물',
    body: '이것은 Fetch API로 만든 새 게시물입니다.',
    userId: 1
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost) // JavaScript 객체를 JSON 문자열로 변환
  };
  
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log('생성된 게시물:', data);
    })
    .catch(error => {
      console.error('에러 발생:', error);
    });
}

// postRequest();

// 4. 다양한 응답 형식 처리
console.log("\n=== 다양한 응답 형식 처리 ===");

function handleDifferentResponseTypes() {
  // 1. JSON 응답
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => console.log('JSON 응답:', data))
    .catch(error => console.error('JSON 에러:', error));
  
  // 2. 텍스트 응답
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.text())
    .then(text => console.log('텍스트 응답:', text.substring(0, 50) + '...'))
    .catch(error => console.error('텍스트 에러:', error));
  
  // 3. FormData 응답 (브라우저 환경에서만 동작)
  /*
  fetch('https://example.com/form')
    .then(response => response.formData())
    .then(formData => console.log('FormData 응답:', formData))
    .catch(error => console.error('FormData 에러:', error));
  */
  
  // 4. Blob 응답 (이미지 등의 바이너리 데이터, 브라우저 환경에서만 동작)
  /*
  fetch('https://example.com/image.jpg')
    .then(response => response.blob())
    .then(blob => {
      console.log('Blob 응답:', blob);
      // 이미지 표시 예시 (브라우저 환경)
      // const imgUrl = URL.createObjectURL(blob);
      // document.querySelector('img').src = imgUrl;
    })
    .catch(error => console.error('Blob 에러:', error));
  */
  
  // 5. ArrayBuffer 응답 (바이너리 데이터)
  /*
  fetch('https://example.com/binary-data')
    .then(response => response.arrayBuffer())
    .then(buffer => console.log('ArrayBuffer 응답:', buffer))
    .catch(error => console.error('ArrayBuffer 에러:', error));
  */
}

// handleDifferentResponseTypes();

// 5. async/await 사용하기
console.log("\n=== async/await 사용하기 ===");

async function fetchWithAsyncAwait() {
  try {
    // 첫 번째 게시물 가져오기
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    if (!response.ok) {
      throw new Error(`HTTP 에러! 상태: ${response.status}`);
    }
    
    const post = await response.json();
    console.log('첫 번째 게시물:', post);
    
    // 해당 게시물을 작성한 사용자 정보 가져오기
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    
    if (!userResponse.ok) {
      throw new Error(`HTTP 에러! 상태: ${userResponse.status}`);
    }
    
    const user = await userResponse.json();
    console.log('작성자 정보:', user);
    
    // 결합된 정보 출력
    console.log('결합된 정보:', {
      postTitle: post.title,
      postBody: post.body,
      author: user.name,
      email: user.email
    });
    
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

// fetchWithAsyncAwait();

// 6. 요청 취소하기 (AbortController)
console.log("\n=== 요청 취소하기 ===");

function abortableFetch() {
  const controller = new AbortController();
  const signal = controller.signal;
  
  // 5초 후 요청 취소
  setTimeout(() => {
    controller.abort();
    console.log('요청이 취소되었습니다!');
  }, 5000);
  
  // 일부러 시간이 오래 걸리는 요청을 보내기
  fetch('https://httpbin.org/delay/10', { signal })
    .then(response => response.json())
    .then(data => console.log('데이터:', data))
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('사용자가 요청을 취소했습니다.');
      } else {
        console.error('다른 에러 발생:', error);
      }
    });
}

// abortableFetch();

// 7. 에러 처리
console.log("\n=== 에러 처리 ===");

function handleErrors() {
  // 1. 잘못된 URL
  fetch('https://nonexistent-domain-12345.com')
    .then(response => response.json())
    .then(data => console.log('데이터:', data))
    .catch(error => console.error('네트워크 에러:', error));
  
  // 2. 404 에러 처리
  fetch('https://jsonplaceholder.typicode.com/nonexistent')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP 에러! 상태: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log('데이터:', data))
    .catch(error => console.error('HTTP 에러:', error.message));
}

// handleErrors();

// Node.js 환경에서 실행할 경우
// 모듈을 내보내기
module.exports = {
  basicFetch,
  fetchWithOptions,
  postRequest,
  handleDifferentResponseTypes,
  fetchWithAsyncAwait,
  abortableFetch,
  handleErrors
};