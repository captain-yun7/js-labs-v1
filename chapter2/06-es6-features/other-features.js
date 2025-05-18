/**
 * 기타 ES6+ 기능들
 * 
 * ES6 이후 추가된 주요 기능들을 살펴봅니다.
 */

// 1. let과 const (블록 스코프 변수)
console.log('===== let과 const =====');

// var는 함수 스코프
function varExample() {
  if (true) {
    var x = 10;
    console.log('블록 내부 x:', x);
  }
  console.log('블록 외부 x:', x); // x에 접근 가능
}
varExample();

// let은 블록 스코프
function letExample() {
  if (true) {
    let y = 20;
    console.log('블록 내부 y:', y);
  }
  // console.log('블록 외부 y:', y); // 오류: y is not defined
  console.log('블록 외부에서는 y에 접근할 수 없음');
}
letExample();

// const는 재할당 불가능
const PI = 3.14159;
console.log('PI:', PI);
// PI = 3.14; // 오류: Assignment to constant variable

// 2. 기본 매개변수 (Default Parameters)
console.log('\n===== 기본 매개변수 =====');

function greet(name = '익명', greeting = '안녕하세요') {
  console.log(`${greeting}, ${name}님!`);
}

greet('홍길동', '반갑습니다');
greet('김철수');
greet();

// 표현식도 사용 가능
function calculateTax(amount, taxRate = amount * 0.1) {
  return amount + taxRate;
}

console.log('세금 포함 가격 (10,000원):', calculateTax(10000));
console.log('세금 포함 가격 (20,000원, 세율 5%):', calculateTax(20000, 1000));

// 3. Promise와 async/await
console.log('\n===== Promise와 async/await =====');

// Promise 생성
function fetchData(shouldSucceed = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ id: 1, name: '홍길동', data: [1, 2, 3] });
      } else {
        reject(new Error('데이터를 가져오는 데 실패했습니다.'));
      }
    }, 1000);
  });
}

// Promise 사용하기
console.log('데이터 요청 시작...');
fetchData()
  .then(data => {
    console.log('데이터 수신 성공:', data);
    return data.name;
  })
  .then(name => {
    console.log('이름:', name);
  })
  .catch(error => {
    console.error('오류 발생:', error.message);
  })
  .finally(() => {
    console.log('요청 완료 (성공 또는 실패)');
  });

// async/await 사용하기
async function fetchDataAsync() {
  try {
    console.log('async/await: 데이터 요청 시작...');
    const data = await fetchData();
    console.log('async/await: 데이터 수신 성공:', data);
    
    // 에러가 발생하는 요청
    // const errorData = await fetchData(false);
    
    return data;
  } catch (error) {
    console.error('async/await: 오류 발생:', error.message);
  } finally {
    console.log('async/await: 요청 완료');
  }
}

// async 함수 호출
fetchDataAsync().then(result => {
  if (result) {
    console.log('최종 결과:', result.name);
  }
});

// 4. Map과 Set 컬렉션
console.log('\n===== Map과 Set =====');

// Map
const userMap = new Map();
userMap.set('user1', { name: '홍길동', age: 30 });
userMap.set('user2', { name: '김철수', age: 25 });
userMap.set('user3', { name: '이영희', age: 28 });

console.log('Map 크기:', userMap.size);
console.log('user2 정보:', userMap.get('user2'));
console.log('user4 존재 여부:', userMap.has('user4'));

// Map 순회
console.log('\nMap 순회:');
userMap.forEach((value, key) => {
  console.log(`${key}: ${value.name}, ${value.age}세`);
});

// Set
const uniqueNumbers = new Set([1, 2, 3, 3, 4, 5, 5, 5]);
console.log('\nSet 내용:', uniqueNumbers);
console.log('Set 크기:', uniqueNumbers.size);

uniqueNumbers.add(6);
uniqueNumbers.add(1); // 이미 존재하므로 추가되지 않음

console.log('5 존재 여부:', uniqueNumbers.has(5));
uniqueNumbers.delete(3);
console.log('3 삭제 후:', uniqueNumbers);

// 5. 옵셔널 체이닝 (Optional Chaining, ES2020)
console.log('\n===== 옵셔널 체이닝 =====');

const user = {
  name: '홍길동',
  address: {
    city: '서울',
    // street 속성이 없음
  }
  // 'profile' 속성이 없음
};

// 기존 방식 - 에러 방지를 위한 조건 확인
const street1 = user.address && user.address.street ? user.address.street : '정보 없음';
console.log('기존 방식 - 거리명:', street1);

// 옵셔널 체이닝 사용
const street2 = user.address?.street ?? '정보 없음';
console.log('옵셔널 체이닝 - 거리명:', street2);

const profileImage = user.profile?.image ?? '기본 이미지';
console.log('옵셔널 체이닝 - 프로필 이미지:', profileImage);

// 함수 호출에도 사용 가능
const result = user.getDetails?.() ?? '메서드 없음';
console.log('옵셔널 체이닝 - 메서드 호출:', result);

// 6. Nullish 병합 연산자 (??, ES2020)
console.log('\n===== Nullish 병합 연산자 =====');

function printMessage(message) {
  // || 연산자는 falsy 값(0, '', false 등)도 대체함
  const defaultWithOR = message || '기본 메시지';
  
  // ?? 연산자는 null과 undefined만 대체함
  const defaultWithNullish = message ?? '기본 메시지';
  
  console.log('OR 연산자 결과:', defaultWithOR);
  console.log('Nullish 병합 연산자 결과:', defaultWithNullish);
}

console.log('message = undefined 일 때:');
printMessage(undefined);

console.log('\nmessage = null 일 때:');
printMessage(null);

console.log('\nmessage = "" (빈 문자열) 일 때:');
printMessage('');

console.log('\nmessage = 0 일 때:');
printMessage(0);

console.log('\nmessage = false 일 때:');
printMessage(false);

// 7. Object.entries, Object.values, Object.fromEntries
console.log('\n===== Object 메서드 =====');

const person = {
  name: '홍길동',
  age: 30,
  job: '개발자',
  city: '서울'
};

// Object.entries: 객체를 [키, 값] 쌍의 배열로 변환
console.log('Object.entries:');
const entries = Object.entries(person);
console.log(entries);

// Object.values: 객체의 값만 배열로 변환
console.log('\nObject.values:');
const values = Object.values(person);
console.log(values);

// Object.fromEntries: [키, 값] 쌍의 배열을 객체로 변환 (ES2019)
console.log('\nObject.fromEntries:');
const filteredEntries = entries.filter(([key, value]) => key !== 'city');
const filteredPerson = Object.fromEntries(filteredEntries);
console.log(filteredPerson);

// 8. 숫자 구분 기호 (Numeric Separators, ES2021)
console.log('\n===== 숫자 구분 기호 =====');

const million = 1_000_000;
console.log('백만:', million);

const billion = 1_000_000_000;
console.log('십억:', billion);

const fraction = 0.000_001;
console.log('백만분의 1:', fraction);

const bytes = 0xFF_FF_FF_FF;
console.log('32비트 최대값(16진수):', bytes);

// 9. String 패딩 (ES2017)
console.log('\n===== String 패딩 =====');

const num1 = '5';
const num2 = '100';
const num3 = '1000';

// padStart: 문자열 시작 부분에 패딩 추가
console.log('padStart(4, "0")');
console.log(num1.padStart(4, '0'));
console.log(num2.padStart(4, '0'));
console.log(num3.padStart(4, '0'));

// padEnd: 문자열 끝 부분에 패딩 추가
console.log('\npadEnd(8, "-")');
console.log(num1.padEnd(8, '-'));
console.log(num2.padEnd(8, '-'));
console.log(num3.padEnd(8, '-')); 