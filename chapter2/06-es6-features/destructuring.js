/**
 * 구조 분해 할당 (Destructuring)
 * 
 * 구조 분해 할당은 배열이나 객체에서 값을 추출하여 변수에 할당하는 문법입니다.
 */

// 객체 구조 분해 할당
console.log('===== 객체 구조 분해 할당 =====');

// 기본적인 객체 구조 분해
const person = { name: '홍길동', age: 30, job: '개발자' };
const { name, age } = person;
console.log(`이름: ${name}, 나이: ${age}`);

// 기본값 설정
const { job, hobby = '없음' } = person;
console.log(`직업: ${job}, 취미: ${hobby}`);

// 변수 이름 변경
const { name: fullName, age: years } = person;
console.log(`이름(fullName): ${fullName}, 나이(years): ${years}`);

// 중첩된 객체 구조 분해
const user = {
  id: 1,
  username: 'user123',
  profile: {
    firstName: '길동',
    lastName: '홍',
    address: {
      city: '서울',
      district: '강남구'
    }
  }
};

const { username, profile: { firstName, lastName, address: { city } } } = user;
console.log(`사용자명: ${username}, 이름: ${lastName}${firstName}, 도시: ${city}`);

// 배열 구조 분해 할당
console.log('\n===== 배열 구조 분해 할당 =====');

// 기본적인 배열 구조 분해
const colors = ['빨강', '초록', '파랑'];
const [red, green, blue] = colors;
console.log(`빨강: ${red}, 초록: ${green}, 파랑: ${blue}`);

// 일부 요소만 선택
const [firstColor, , thirdColor] = colors;
console.log(`첫번째 색: ${firstColor}, 세번째 색: ${thirdColor}`);

// 기본값 설정
const [a, b, c, d = '노랑'] = colors;
console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}`);

// 배열 교환하기
let x = 1;
let y = 2;
console.log(`교환 전: x = ${x}, y = ${y}`);
[x, y] = [y, x];
console.log(`교환 후: x = ${x}, y = ${y}`);

// 함수에서의 구조 분해 할당
console.log('\n===== 함수에서의 구조 분해 할당 =====');

// 객체 매개변수 구조 분해
function printUserInfo({ name, age, job = '무직' }) {
  console.log(`사용자 정보: 이름 - ${name}, 나이 - ${age}, 직업 - ${job}`);
}

printUserInfo(person);

// 배열 반환값 구조 분해
function getMinMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)];
}

const [min, max] = getMinMax([5, 1, 9, 3, 7]);
console.log(`최소값: ${min}, 최대값: ${max}`);

// 실무 활용 예제
console.log('\n===== 실무 활용 예제 =====');

// API 응답 데이터 처리
const response = {
  status: 200,
  data: {
    users: [
      { id: 1, name: '김철수', active: true },
      { id: 2, name: '이영희', active: false },
      { id: 3, name: '박지성', active: true }
    ],
    pagination: {
      total: 3,
      page: 1
    }
  }
};

const { 
  status,
  data: { 
    users: [firstUser, , thirdUser],
    pagination: { total }
  }
} = response;

console.log(`상태 코드: ${status}`);
console.log(`첫번째 사용자: ${firstUser.name}, 세번째 사용자: ${thirdUser.name}`);
console.log(`총 사용자 수: ${total}`); 