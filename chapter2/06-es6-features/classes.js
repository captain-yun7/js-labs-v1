/**
 * 클래스 문법 (Classes)
 * 
 * ES6에서 도입된 클래스 문법은 JavaScript의 기존 프로토타입 기반 상속을 
 * 더 명확하고 이해하기 쉽게 작성할 수 있도록 해줍니다.
 */

// 기본 클래스 선언
console.log('===== 기본 클래스 선언 =====');

class Person {
  // 생성자 메서드
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // 인스턴스 메서드
  sayHello() {
    console.log(`안녕하세요, 제 이름은 ${this.name}이고, ${this.age}살입니다.`);
  }
  
  // 정적 메서드 (클래스 메서드)
  static createAnonymous() {
    return new Person('익명', 0);
  }
}

// 클래스 사용하기
const person1 = new Person('홍길동', 30);
person1.sayHello();

// 정적 메서드 호출
const anonymous = Person.createAnonymous();
anonymous.sayHello();

// 클래스 상속
console.log('\n===== 클래스 상속 =====');

class Student extends Person {
  constructor(name, age, grade) {
    // 부모 클래스의 생성자 호출
    super(name, age);
    this.grade = grade;
  }
  
  // 메서드 오버라이딩
  sayHello() {
    console.log(`안녕하세요, 저는 ${this.grade}학년 학생 ${this.name}입니다.`);
  }
  
  // 추가 메서드
  study() {
    console.log(`${this.name}이(가) 공부를 합니다.`);
  }
}

const student = new Student('김철수', 15, 3);
student.sayHello();
student.study();

// 부모 클래스의 메서드 호출
console.log('\n===== 부모 클래스의 메서드 호출 =====');

class Employee extends Person {
  constructor(name, age, company) {
    super(name, age);
    this.company = company;
  }
  
  sayHello() {
    // super 키워드로 부모 클래스의 메서드 호출
    super.sayHello();
    console.log(`저는 ${this.company}에서 일하고 있습니다.`);
  }
  
  work() {
    console.log(`${this.name}이(가) 일을 합니다.`);
  }
}

const employee = new Employee('이영희', 28, '테크기업');
employee.sayHello();

// getter와 setter
console.log('\n===== getter와 setter =====');

class Circle {
  constructor(radius) {
    this._radius = radius; // 내부 변수
  }
  
  // getter
  get radius() {
    return this._radius;
  }
  
  // setter
  set radius(value) {
    if (value <= 0) {
      throw new Error('반지름은 0보다 커야 합니다.');
    }
    this._radius = value;
  }
  
  // 계산된 속성
  get area() {
    return Math.PI * this._radius ** 2;
  }
  
  get diameter() {
    return this._radius * 2;
  }
}

const circle = new Circle(5);
console.log(`반지름: ${circle.radius}`);
console.log(`지름: ${circle.diameter}`);
console.log(`면적: ${circle.area.toFixed(2)}`);

// 반지름 변경
circle.radius = 10;
console.log(`변경된 반지름: ${circle.radius}`);
console.log(`변경된 면적: ${circle.area.toFixed(2)}`);

// try-catch 예외 처리
try {
  circle.radius = -5; // 오류 발생
} catch (e) {
  console.log(`오류 발생: ${e.message}`);
}

// 프라이빗 클래스 필드 (ES2022)
console.log('\n===== 프라이빗 클래스 필드 =====');

class BankAccount {
  // 공개 필드
  owner;
  
  // 프라이빗 필드 (# 접두사 사용)
  #balance;
  
  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }
  
  // 잔액 조회
  getBalance() {
    return this.#balance;
  }
  
  // 입금
  deposit(amount) {
    if (amount <= 0) {
      throw new Error('입금액은 0보다 커야 합니다.');
    }
    this.#balance += amount;
    return this.#balance;
  }
  
  // 출금
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('출금액은 0보다 커야 합니다.');
    }
    if (amount > this.#balance) {
      throw new Error('잔액이 부족합니다.');
    }
    this.#balance -= amount;
    return this.#balance;
  }
}

const account = new BankAccount('홍길동', 10000);
console.log(`계좌 소유자: ${account.owner}`);
console.log(`현재 잔액: ${account.getBalance()}`);

// 입금
account.deposit(5000);
console.log(`입금 후 잔액: ${account.getBalance()}`);

// 출금
account.withdraw(3000);
console.log(`출금 후 잔액: ${account.getBalance()}`);

// 프라이빗 필드에 직접 접근 시도
try {
  // 주석을 풀면 오류 발생: console.log(account.#balance);
  console.log("프라이빗 필드에 직접 접근할 수 없습니다.");
} catch (e) {
  console.log(`오류 발생: ${e.message}`);
}

// 실무 활용 예제
console.log('\n===== 실무 활용 예제 =====');

class Product {
  #id;
  #name;
  #price;
  #discountRate;
  
  constructor(id, name, price, discountRate = 0) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
    this.#discountRate = discountRate;
  }
  
  get id() { return this.#id; }
  get name() { return this.#name; }
  get price() { return this.#price; }
  get discountRate() { return this.#discountRate; }
  
  set discountRate(rate) {
    if (rate < 0 || rate > 1) {
      throw new Error('할인율은 0과 1 사이여야 합니다.');
    }
    this.#discountRate = rate;
  }
  
  get finalPrice() {
    return this.#price * (1 - this.#discountRate);
  }
  
  display() {
    console.log(`상품 정보: ${this.#name} (ID: ${this.#id})`);
    console.log(`가격: ${this.#price.toLocaleString()}원`);
    if (this.#discountRate > 0) {
      console.log(`할인율: ${this.#discountRate * 100}%`);
      console.log(`최종 가격: ${this.finalPrice.toLocaleString()}원`);
    }
    console.log('--------------------------');
  }
}

const products = [
  new Product(1, '스마트폰', 1200000, 0.1),
  new Product(2, '노트북', 2500000, 0.15),
  new Product(3, '이어폰', 300000)
];

// 제품 정보 표시
products.forEach(product => product.display()); 