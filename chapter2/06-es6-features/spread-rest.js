/**
 * 스프레드/레스트 연산자 (Spread/Rest Operator)
 * 
 * 스프레드 연산자(...)는 배열이나 객체를 펼치는 데 사용됩니다.
 * 레스트 연산자(...)는 나머지 요소들을 모으는 데 사용됩니다.
 */

// 스프레드 연산자 (배열)
console.log('===== 스프레드 연산자 (배열) =====');

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 배열 합치기
const combined = [...arr1, ...arr2];
console.log('배열 합치기:', combined);

// 배열 복사하기
const originalArray = [10, 20, 30];
const copyArray = [...originalArray];
console.log('원본 배열:', originalArray);
console.log('복사된 배열:', copyArray);

// 변경 예시
copyArray.push(40);
console.log('수정 후 원본 배열:', originalArray);
console.log('수정 후 복사된 배열:', copyArray);

// 배열 중간에 값 삽입하기
const numbers = [1, 2, 5, 6];
const insertedNumbers = [1, 2, ...[3, 4], 5, 6];
console.log('값이 삽입된 배열:', insertedNumbers);

// 스프레드 연산자 (객체)
console.log('\n===== 스프레드 연산자 (객체) =====');

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// 객체 합치기
const combinedObj = { ...obj1, ...obj2 };
console.log('객체 합치기:', combinedObj);

// 객체 복사하고 속성 추가/변경하기
const person = { name: '홍길동', age: 30 };
const updatedPerson = { ...person, age: 31, job: '개발자' };
console.log('원본 객체:', person);
console.log('업데이트된 객체:', updatedPerson);

// 레스트 연산자 (함수 매개변수)
console.log('\n===== 레스트 연산자 (함수 매개변수) =====');

// 임의의 개수 인자 받기
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log('합계 (1, 2):', sum(1, 2));
console.log('합계 (1, 2, 3, 4, 5):', sum(1, 2, 3, 4, 5));

// 일부 매개변수와 함께 사용
function process(first, second, ...rest) {
  console.log('첫 번째 매개변수:', first);
  console.log('두 번째 매개변수:', second);
  console.log('나머지 매개변수:', rest);
}

process('A', 'B', 'C', 'D', 'E');

// 레스트 연산자 (구조 분해 할당)
console.log('\n===== 레스트 연산자 (구조 분해 할당) =====');

// 배열 구조 분해
const [first, second, ...restItems] = [1, 2, 3, 4, 5];
console.log('첫 번째:', first);
console.log('두 번째:', second);
console.log('나머지 항목들:', restItems);

// 객체 구조 분해
const { name, ...restProps } = { name: '홍길동', age: 30, job: '개발자', city: '서울' };
console.log('이름:', name);
console.log('나머지 속성들:', restProps);

// 실무 활용 예제
console.log('\n===== 실무 활용 예제 =====');

// 함수 인자 전달하기
function calculateTotal(x, y, z) {
  return x + y + z;
}

const values = [10, 20, 30];
console.log('스프레드로 인자 전달:', calculateTotal(...values));

// 배열 조작하기
const items = ['A', 'B', 'C'];

// 항목 추가
const addedItems = [...items, 'D'];
console.log('항목 추가:', addedItems);

// 항목 삽입
const insertedItems = ['A', ...['X', 'Y'], 'B', 'C'];
console.log('항목 삽입:', insertedItems);

// 객체 속성 업데이트
function updateUser(user, updates) {
  return { ...user, ...updates };
}

const user = { id: 1, name: '홍길동', email: 'hong@example.com' };
const updatedUser = updateUser(user, { name: '김철수', age: 25 });
console.log('업데이트된 사용자:', updatedUser); 