// objects-basics.js - 객체의 기본 개념과 생성 방법

/**
 * 객체(Objects)
 * 
 * 객체는 관련있는 데이터와 함수(메서드)를 하나로 묶어 표현하는 자료구조입니다.
 * JavaScript에서는 거의 모든 것이 객체이며, 원시 타입을 제외한 배열, 함수, 정규식 등도 모두 객체입니다.
 */

console.log('==== 객체의 기본 개념 ====');

// 1. 객체 생성 방법
console.log('\n--- 객체 생성 방법 ---');

// 객체 리터럴 (가장 일반적인 방법)
const person = {
    name: '홍길동',
    age: 25,
    gender: '남성',
    isEmployed: true
};
console.log('객체 리터럴:', person);

// Object 생성자 사용
const car = new Object();
car.brand = '현대';
car.model = '아반떼';
car.year = 2023;
console.log('Object 생성자:', car);

// Object.create() 메서드 사용
const animal = Object.create(null); // 프로토타입 없는 순수 객체
animal.type = '강아지';
animal.name = '멍멍이';
console.log('Object.create():', animal);

// 생성자 함수 사용
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
}

const myBook = new Book('자바스크립트 완벽 가이드', '데이비드 플래너건', 1000);
console.log('생성자 함수:', myBook);

// 클래스 사용 (ES6+)
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

const laptop = new Product('노트북', 1200000);
console.log('클래스:', laptop);

// 2. 객체 속성 접근하기
console.log('\n--- 객체 속성 접근하기 ---');

const student = {
    id: 12345,
    name: '김학생',
    age: 20,
    'enrollment-date': '2023-03-02', // 하이픈(-) 포함 속성명은 따옴표로 감싸야 함
    courses: ['수학', '과학', '역사']
};
console.log('학생 객체:', student);

// 점 표기법(dot notation)으로 접근
console.log('점 표기법 - 이름:', student.name); // '김학생'
console.log('점 표기법 - 나이:', student.age); // 20

// 대괄호 표기법(bracket notation)으로 접근
console.log('대괄호 표기법 - 이름:', student['name']); // '김학생'
console.log('대괄호 표기법 - 나이:', student['age']); // 20

// 하이픈이 포함된 속성은 대괄호 표기법으로만 접근 가능
console.log('등록일:', student['enrollment-date']); // '2023-03-02'
// console.log(student.enrollment-date); // Error: 유효하지 않은 구문

// 변수를 사용하여 속성에 접근
const propName = 'id';
console.log('변수로 속성 접근:', student[propName]); // 12345

// 존재하지 않는 속성에 접근하면 undefined 반환
console.log('존재하지 않는 속성:', student.grade); // undefined

// 3. 객체 속성 수정 및 추가
console.log('\n--- 객체 속성 수정 및 추가 ---');

const phone = {
    brand: '삼성',
    model: 'Galaxy S23',
    year: 2023
};
console.log('원본 객체:', phone);

// 속성 수정
phone.year = 2024;
console.log('속성 수정 후:', phone); // year: 2024

// 새 속성 추가
phone.color = '검정';
phone['price'] = 1200000;
console.log('속성 추가 후:', phone); // color: '검정', price: 1200000

// 계산된 속성명(computed property name)
const propertyName = 'memory';
phone[propertyName] = '256GB';
console.log('계산된 속성명 추가 후:', phone); // memory: '256GB'

// 여러 속성 한 번에 추가/수정 (Object.assign)
Object.assign(phone, {
    camera: '108MP',
    battery: '5000mAh',
    model: 'Galaxy S24' // 기존 속성 덮어쓰기
});
console.log('Object.assign 후:', phone);

// 4. 객체 속성 삭제
console.log('\n--- 객체 속성 삭제 ---');

const laptop2 = {
    brand: 'Apple',
    model: 'MacBook Pro',
    year: 2023,
    specs: {
        cpu: 'M2',
        ram: '16GB',
        storage: '512GB'
    }
};
console.log('원본 객체:', laptop2);

// delete 연산자로 속성 삭제
delete laptop2.year;
console.log('year 속성 삭제 후:', laptop2); // year 속성 없음

// 중첩 객체의 속성 삭제
delete laptop2.specs.storage;
console.log('중첩 속성 삭제 후:', laptop2); // specs.storage 속성 없음

// 5. 객체 속성 존재 확인
console.log('\n--- 객체 속성 존재 확인 ---');

const user = {
    username: 'user123',
    email: 'user@example.com',
    active: true,
    roles: ['user'],
    address: undefined
};
console.log('사용자 객체:', user);

// in 연산자 사용 (프로토타입 체인도 확인)
console.log('username in user:', 'username' in user); // true
console.log('phone in user:', 'phone' in user); // false
console.log('address in user:', 'address' in user); // true (값이 undefined여도 true)

// hasOwnProperty 메서드 사용 (프로토타입 체인 제외)
console.log('hasOwnProperty(username):', user.hasOwnProperty('username')); // true
console.log('hasOwnProperty(toString):', user.hasOwnProperty('toString')); // false (toString은 프로토타입에서 상속)

// 6. 객체 속성 열거하기
console.log('\n--- 객체 속성 열거하기 ---');

const product = {
    id: 'P1001',
    name: '스마트폰',
    price: 980000,
    inStock: true
};
console.log('제품 객체:', product);

// for...in 반복문 (프로토타입 체인의 열거 가능한 속성도 포함)
console.log('\nfor...in 반복문:');
for (const key in product) {
    console.log(`${key}: ${product[key]}`);
}

// Object.keys() - 객체 자신의 열거 가능한 속성명 배열 반환
const keys = Object.keys(product);
console.log('\nObject.keys():', keys); // ['id', 'name', 'price', 'inStock']

// Object.values() - 객체 자신의 열거 가능한 속성값 배열 반환
const values = Object.values(product);
console.log('Object.values():', values); // ['P1001', '스마트폰', 980000, true]

// Object.entries() - 객체 자신의 열거 가능한 [키, 값] 쌍 배열 반환
const entries = Object.entries(product);
console.log('Object.entries():', entries);
// [['id', 'P1001'], ['name', '스마트폰'], ['price', 980000], ['inStock', true]]

// Object.entries()와 구조 분해 할당을 함께 사용
console.log('\nentries 순회:');
for (const [key, value] of Object.entries(product)) {
    console.log(`${key}: ${value}`);
}

// 7. 객체 속성 특성
console.log('\n--- 객체 속성 특성 ---');

// Object.defineProperty() - 속성 추가/수정 및 특성 정의
const settings = {};

// 일반적인 쓰기/열거 가능한 속성 추가
settings.theme = 'dark';

// 속성 특성을 명시적으로 정의
Object.defineProperty(settings, 'version', {
    value: '1.0.0',
    writable: false, // 값 변경 불가
    enumerable: true, // for...in, Object.keys() 등에서 나열 가능
    configurable: true // 속성 삭제 및 특성 변경 가능
});

Object.defineProperty(settings, 'apiKey', {
    value: 'secret-key-12345',
    writable: false,
    enumerable: false, // 열거되지 않음
    configurable: false // 삭제 및 특성 변경 불가
});

console.log('settings 객체:', settings);
console.log('Object.keys(settings):', Object.keys(settings)); // ['theme', 'version'] (apiKey는 enumerable: false)

// writable: false인 속성은 값을 변경할 수 없음
settings.version = '2.0.0'; // 엄격 모드에서는 에러, 비엄격 모드에서는 무시됨
console.log('version 수정 시도 후:', settings.version); // 여전히 '1.0.0'

// 8. 객체 불변성
console.log('\n--- 객체 불변성 ---');

const config = {
    server: 'localhost',
    port: 3000,
    timeout: 5000,
    debug: true
};
console.log('원본 설정 객체:', config);

// Object.preventExtensions() - 새 속성 추가 방지
Object.preventExtensions(config);
config.newProp = 'value'; // 엄격 모드에서 에러, 비엄격 모드에서 무시됨
console.log('preventExtensions 후 새 속성 추가 시도:', config); // newProp 속성 없음
console.log('extensible?', Object.isExtensible(config)); // false

// Object.seal() - 새 속성 추가 및 기존 속성 삭제 방지
const user2 = { name: '홍길동', id: 100 };
Object.seal(user2);
user2.name = '김철수'; // 값 수정 가능
delete user2.id; // 엄격 모드에서 에러, 비엄격 모드에서 무시됨
user2.email = 'test@example.com'; // 추가 불가
console.log('seal 후:', user2); // { name: '김철수', id: 100 }
console.log('sealed?', Object.isSealed(user2)); // true

// Object.freeze() - 모든 변경 방지 (완전 불변)
const constants = { PI: 3.14159, E: 2.71828 };
Object.freeze(constants);
constants.PI = 3.14; // 엄격 모드에서 에러, 비엄격 모드에서 무시됨
delete constants.E; // 삭제 불가
constants.G = 9.8; // 추가 불가
console.log('freeze 후:', constants); // { PI: 3.14159, E: 2.71828 }
console.log('frozen?', Object.isFrozen(constants)); // true

/**
 * 객체 기본 요약:
 * 
 * 1. 객체 생성 방법:
 *    - 객체 리터럴: {}
 *    - Object 생성자: new Object()
 *    - Object.create(): 지정된 프로토타입으로 객체 생성
 *    - 생성자 함수/클래스: 같은 구조의 객체를 여러 개 생성할 때 유용
 * 
 * 2. 속성 접근:
 *    - 점 표기법: object.property
 *    - 대괄호 표기법: object['property']
 * 
 * 3. 속성 관리:
 *    - 추가: object.newProp = value
 *    - 수정: object.existingProp = newValue
 *    - 삭제: delete object.property
 * 
 * 4. 객체 속성 순회:
 *    - for...in: 모든 열거 가능한 속성 (상속 포함)
 *    - Object.keys(), Object.values(), Object.entries(): 객체 자신의 열거 가능한 속성
 * 
 * 5. 객체 불변성:
 *    - Object.preventExtensions(): 속성 추가 방지
 *    - Object.seal(): 속성 추가/삭제 방지
 *    - Object.freeze(): 모든 변경 방지
 */ 