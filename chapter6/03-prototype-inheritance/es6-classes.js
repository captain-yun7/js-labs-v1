// es6-classes.js - ES6 클래스 구문과 상속

/**
 * JavaScript의 ES6 클래스(Class)
 * 
 * ES6에서 도입된 클래스 구문은 기존 프로토타입 기반 상속에 대한
 * 더 명확하고 간결한 문법적 설탕(syntactic sugar)을 제공합니다.
 * 클래스 구문은 기존 프로토타입 상속 메커니즘 위에 구축되었습니다.
 */

console.log('==== ES6 클래스 기본 개념 ====');

// 1. 기본 클래스 선언
class Person {
    // 생성자 메서드
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // 인스턴스 메서드
    greet() {
        return `안녕하세요, 제 이름은 ${this.name}이고 ${this.age}살입니다.`;
    }
    
    // 정적 메서드
    static createAnonymous() {
        return new Person('익명', 0);
    }
}

// 인스턴스 생성
const person1 = new Person('김철수', 30);
console.log('person1.greet():', person1.greet());

// 정적 메서드 호출
const anonymous = Person.createAnonymous();
console.log('anonymous:', anonymous);

// 클래스도 내부적으로는 함수입니다.
console.log('typeof Person:', typeof Person); // "function"

// 2. 클래스 표현식
const Animal = class {
    constructor(name) {
        this.name = name;
    }
    
    makeSound() {
        return '일반적인 동물 소리';
    }
};

const cat = new Animal('고양이');
console.log('cat.makeSound():', cat.makeSound());

// 3. 클래스 상속
console.log('\n==== ES6 클래스 상속 ====');

// 기본 클래스 (부모 클래스)
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    
    getInfo() {
        return `${this.year}년식 ${this.make} ${this.model}`;
    }
    
    start() {
        return `${this.model}의 시동을 겁니다.`;
    }
}

// 자식 클래스
class Car extends Vehicle {
    constructor(make, model, year, doors) {
        // 부모 클래스의 생성자 호출
        super(make, model, year);
        this.doors = doors;
    }
    
    // 메서드 오버라이딩
    getInfo() {
        return `${super.getInfo()}, ${this.doors}도어`;
    }
    
    // 추가 메서드
    honk() {
        return '빵빵!';
    }
}

const myCar = new Car('현대', '쏘나타', 2020, 4);
console.log('myCar.getInfo():', myCar.getInfo());
console.log('myCar.start():', myCar.start()); // 부모에서 상속된 메서드
console.log('myCar.honk():', myCar.honk());

// instanceof로 상속 관계 확인
console.log('myCar instanceof Car:', myCar instanceof Car); // true
console.log('myCar instanceof Vehicle:', myCar instanceof Vehicle); // true
console.log('myCar instanceof Object:', myCar instanceof Object); // true

// 4. 접근자 속성(getter, setter)
console.log('\n==== 접근자 속성 ====');

class BankAccount {
    constructor(owner, initialBalance = 0) {
        this._owner = owner;
        this._balance = initialBalance;
    }
    
    // getter
    get balance() {
        return this._balance;
    }
    
    // setter
    set balance(value) {
        if (value < 0) {
            console.log('잔액은 0보다 작을 수 없습니다.');
            return;
        }
        this._balance = value;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
            return `${amount}원이 입금되었습니다. 현재 잔액: ${this._balance}원`;
        }
        return '유효하지 않은 입금액입니다.';
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
            return `${amount}원이 출금되었습니다. 현재 잔액: ${this._balance}원`;
        }
        return '유효하지 않은 출금액입니다.';
    }
}

const account = new BankAccount('홍길동', 10000);
console.log('account.balance:', account.balance); // getter 호출
account.balance = 20000; // setter 호출
console.log('새 잔액:', account.balance);
account.balance = -5000; // 유효성 검사 실패
console.log('잔액 변동 없음:', account.balance);

// 5. 클래스 필드(Class Fields)
console.log('\n==== 클래스 필드 ====');

class Product {
    // 공개 클래스 필드
    category = '일반';
    
    // 비공개 클래스 필드
    #price;
    
    constructor(name, price) {
        this.name = name;
        this.#price = price;
    }
    
    getPrice() {
        return this.#price;
    }
    
    setPrice(newPrice) {
        if (newPrice >= 0) {
            this.#price = newPrice;
        }
    }
    
    // 정적 클래스 필드
    static store = '온라인 상점';
}

const product = new Product('노트북', 1200000);
console.log('product.category:', product.category);
console.log('product.getPrice():', product.getPrice());
// console.log(product.#price); // 에러: 비공개 필드에 직접 접근 불가
console.log('Product.store:', Product.store);

// 6. 다형성
console.log('\n==== 다형성 ====');

class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('Shape 클래스는 직접 인스턴스화할 수 없습니다.');
        }
    }
    
    calculateArea() {
        throw new Error('calculateArea 메서드는 자식 클래스에서 구현해야 합니다.');
    }
    
    getInfo() {
        return '도형';
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
    
    getInfo() {
        return `반지름이 ${this.radius}인 원`;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    calculateArea() {
        return this.width * this.height;
    }
    
    getInfo() {
        return `${this.width}x${this.height} 크기의 직사각형`;
    }
}

// 다형성 예시
function printShapeInfo(shape) {
    if (!(shape instanceof Shape)) {
        console.log('Shape의 인스턴스가 아닙니다.');
        return;
    }
    
    console.log(`도형 정보: ${shape.getInfo()}`);
    console.log(`면적: ${shape.calculateArea()}`);
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

printShapeInfo(circle);
printShapeInfo(rectangle);

// 7. 클래스 vs 생성자 함수 + 프로토타입
console.log('\n==== 클래스 vs 생성자 함수 ====');

// ES5 생성자 함수 + 프로토타입
function UserES5(name, email) {
    this.name = name;
    this.email = email;
}

UserES5.prototype.sayHello = function() {
    return `안녕하세요, ${this.name}입니다!`;
};

UserES5.createGuest = function() {
    return new UserES5('손님', 'guest@example.com');
};

// ES6 클래스
class UserES6 {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    sayHello() {
        return `안녕하세요, ${this.name}입니다!`;
    }
    
    static createGuest() {
        return new UserES6('손님', 'guest@example.com');
    }
}

const userES5 = new UserES5('김자바', 'java@example.com');
const userES6 = new UserES6('박자바', 'java@example.com');

console.log('userES5.sayHello():', userES5.sayHello());
console.log('userES6.sayHello():', userES6.sayHello());

/**
 * ES6 클래스 사용 시 주의사항:
 * 
 * 1. 호이스팅: 클래스 선언은 함수 선언과 달리 호이스팅되지 않습니다(정확히는 TDZ에 들어갑니다).
 * 2. 엄격 모드: 클래스 내부 코드는 자동으로 엄격 모드('use strict')에서 실행됩니다.
 * 3. 생성자 호출: 클래스는 new 키워드 없이 호출할 수 없습니다.
 * 4. 상속: extends를 사용한 클래스 상속에서는 생성자에서 super()를 호출해야 합니다.
 * 5. 메서드 열거: 클래스 메서드는 for...in 루프에서 열거되지 않습니다.
 */ 