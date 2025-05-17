// practice.js - 프로토타입과 상속 실습

/**
 * JavaScript 프로토타입과 상속 실습
 * 
 * 이 파일은 JavaScript의 프로토타입 기반 상속과 ES6 클래스를 
 * 연습하기 위한 실습 예제입니다.
 */

console.log('===== JavaScript 프로토타입과 상속 실습 =====');

// 실습 1: 생성자 함수와 프로토타입 활용하기
console.log('\n----- 실습 1: 생성자 함수와 프로토타입 -----');

// TODO: Person 생성자 함수를 만들고, 프로토타입에 메서드를 추가해보세요.
// Person은 name과 age 속성을 가져야 합니다.
// 프로토타입에는 introduce() 메서드를 추가하세요.

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.introduce = function() {
    return `안녕하세요, 제 이름은 ${this.name}이고 ${this.age}살입니다.`;
};

// 테스트
const person1 = new Person('홍길동', 30);
const person2 = new Person('김철수', 25);

console.log(person1.introduce());
console.log(person2.introduce());
console.log('person1.__proto__ === Person.prototype:', person1.__proto__ === Person.prototype);

// 실습 2: 프로토타입 상속 구현하기
console.log('\n----- 실습 2: 프로토타입 상속 -----');

// TODO: Student 생성자 함수를 만들고, Person을 상속받도록 구현하세요.
// Student는 school과 grade 속성을 추가로 가져야 합니다.
// 프로토타입에는 study() 메서드를 추가하세요.

function Student(name, age, school, grade) {
    // Person 생성자 호출
    Person.call(this, name, age);
    
    this.school = school;
    this.grade = grade;
}

// Student 프로토타입이 Person 프로토타입을 상속
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// Student 프로토타입에 메서드 추가
Student.prototype.study = function(subject) {
    return `${this.name}은(는) ${subject}을(를) 공부하고 있습니다.`;
};

// 부모 메서드 오버라이딩
Student.prototype.introduce = function() {
    return `${Person.prototype.introduce.call(this)} ${this.school} ${this.grade}학년입니다.`;
};

// 테스트
const student = new Student('이영희', 15, '한국중학교', 3);
console.log(student.introduce());
console.log(student.study('수학'));
console.log('student instanceof Student:', student instanceof Student);
console.log('student instanceof Person:', student instanceof Person);

// 실습 3: Object.create를 활용한 상속
console.log('\n----- 실습 3: Object.create 활용 -----');

// TODO: Object.create를 사용하여 상속 관계를 만들어보세요.
// vehicle -> car -> sportsCar 계층 구조를 만드세요.

const vehicle = {
    type: '탈것',
    move: function() {
        return `${this.type}이(가) 움직입니다.`;
    }
};

const car = Object.create(vehicle);
car.type = '자동차';
car.wheels = 4;
car.drive = function() {
    return `${this.wheels}개의 바퀴로 달립니다.`;
};

const sportsCar = Object.create(car);
sportsCar.type = '스포츠카';
sportsCar.brand = '페라리';
sportsCar.speed = 300;
sportsCar.accelerate = function() {
    return `최고 속도 ${this.speed}km/h로 가속합니다!`;
};

// 테스트
console.log(vehicle.move());
console.log(car.move());
console.log(car.drive());
console.log(sportsCar.move());
console.log(sportsCar.drive());
console.log(sportsCar.accelerate());
console.log('car.__proto__ === vehicle:', Object.getPrototypeOf(car) === vehicle);
console.log('sportsCar.__proto__ === car:', Object.getPrototypeOf(sportsCar) === car);

// 실습 4: ES6 클래스 활용하기
console.log('\n----- 실습 4: ES6 클래스 -----');

// TODO: ES6 클래스 구문을 사용하여 Shape, Circle, Rectangle 클래스를 구현하세요.
// Shape는 추상 클래스로, getArea()와 getPerimeter() 메서드를 가져야 합니다.
// Circle과 Rectangle은 Shape를 상속받아 각각의 메서드를 구현해야 합니다.

class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('Shape 클래스는 직접 인스턴스화할 수 없습니다.');
        }
    }
    
    getArea() {
        throw new Error('getArea() 메서드는 자식 클래스에서 구현해야 합니다.');
    }
    
    getPerimeter() {
        throw new Error('getPerimeter() 메서드는 자식 클래스에서 구현해야 합니다.');
    }
    
    toString() {
        return '도형';
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
    
    toString() {
        return `반지름이 ${this.radius}인 원`;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
    
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
    
    toString() {
        return `${this.width}x${this.height} 직사각형`;
    }
}

// 테스트
try {
    const shape = new Shape(); // 오류 발생
} catch (error) {
    console.log('Shape 인스턴스화 오류:', error.message);
}

const circle = new Circle(5);
console.log('원 면적:', circle.getArea().toFixed(2));
console.log('원 둘레:', circle.getPerimeter().toFixed(2));
console.log('원 설명:', circle.toString());

const rectangle = new Rectangle(4, 6);
console.log('직사각형 면적:', rectangle.getArea());
console.log('직사각형 둘레:', rectangle.getPerimeter());
console.log('직사각형 설명:', rectangle.toString());

// 실습 5: 믹스인(Mixin) 패턴 구현하기
console.log('\n----- 실습 5: 믹스인 패턴 -----');

// TODO: 여러 객체에 공통 기능을 추가하는 믹스인 패턴을 구현해보세요.
// swimmable, flyable 믹스인을 만들고, 다양한 객체에 적용해보세요.

// 믹스인 정의
const swimmable = {
    swim() {
        return `${this.name || this.type || '객체'}이(가) 수영합니다.`;
    },
    dive() {
        return `${this.name || this.type || '객체'}이(가) 잠수합니다.`;
    }
};

const flyable = {
    fly() {
        return `${this.name || this.type || '객체'}이(가) 날아갑니다.`;
    },
    land() {
        return `${this.name || this.type || '객체'}이(가) 착륙합니다.`;
    }
};

// 객체에 믹스인 추가하는 유틸리티 함수
function applyMixin(target, ...mixins) {
    mixins.forEach(mixin => {
        Object.getOwnPropertyNames(mixin).forEach(key => {
            target[key] = mixin[key];
        });
    });
    return target;
}

// 클래스에 적용
class Bird {
    constructor(name) {
        this.name = name;
        this.type = '새';
    }
    
    eat() {
        return `${this.name}이(가) 먹이를 먹습니다.`;
    }
}

class Fish {
    constructor(name) {
        this.name = name;
        this.type = '물고기';
    }
    
    eat() {
        return `${this.name}이(가) 먹이를 먹습니다.`;
    }
}

// 믹스인 적용
applyMixin(Bird.prototype, flyable);
applyMixin(Fish.prototype, swimmable);

// Duck 클래스는 Bird를 상속하고 swimmable 믹스인을 추가로 적용
class Duck extends Bird {
    constructor(name) {
        super(name);
        this.type = '오리';
    }
}

applyMixin(Duck.prototype, swimmable);

// 테스트
const eagle = new Bird('독수리');
console.log(eagle.fly());
console.log(eagle.eat());

const salmon = new Fish('연어');
console.log(salmon.swim());
console.log(salmon.dive());

const duck = new Duck('도널드');
console.log(duck.fly());
console.log(duck.swim());
console.log(duck.eat());

// 실습 6: 프로토타입 체인 이해하기
console.log('\n----- 실습 6: 프로토타입 체인 -----');

// TODO: 다음과 같은 프로토타입 체인을 만들고 속성 검색 과정을 추적해보세요.
// baseObject -> middleObject -> childObject

const baseObject = {
    base: '기본 속성',
    getBase() {
        return this.base;
    }
};

const middleObject = Object.create(baseObject);
middleObject.middle = '중간 속성';
middleObject.getMiddle = function() {
    return this.middle;
};

const childObject = Object.create(middleObject);
childObject.child = '자식 속성';
childObject.getChild = function() {
    return this.child;
};

// 프로토타입 체인 검증
console.log('childObject.getChild():', childObject.getChild());
console.log('childObject.getMiddle():', childObject.getMiddle());
console.log('childObject.getBase():', childObject.getBase());

// 프로토타입 체인 추적
console.log('childObject의 자체 속성:', Object.keys(childObject));
console.log('childObject.__proto__ === middleObject:', Object.getPrototypeOf(childObject) === middleObject);
console.log('middleObject.__proto__ === baseObject:', Object.getPrototypeOf(middleObject) === baseObject);
console.log('baseObject.__proto__ === Object.prototype:', Object.getPrototypeOf(baseObject) === Object.prototype);

// 속성 가려짐(shadowing) 테스트
middleObject.base = '가려진 기본 속성';
console.log('가려짐 후 childObject.getBase():', childObject.getBase()); // 중간 객체의 base 속성을 반환

// 실습 7: class fields와 private 필드 활용하기
console.log('\n----- 실습 7: 클래스 필드와 private 필드 -----');

// TODO: class fields와 private 필드를 사용한 BankAccount 클래스를 구현하세요.
// #balance, #transactions 같은 private 필드를 활용하세요.

class BankAccount {
    // 공개 필드
    accountNumber;
    owner;
    
    // 비공개 필드
    #balance = 0;
    #transactions = [];
    #interest = 0.01; // 기본 이자율
    
    constructor(owner, accountNumber, initialBalance = 0) {
        this.owner = owner;
        this.accountNumber = accountNumber;
        
        if (initialBalance > 0) {
            this.deposit(initialBalance);
        }
    }
    
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('입금액은 0보다 커야 합니다.');
        }
        
        this.#balance += amount;
        this.#addTransaction('입금', amount);
        return this.#balance;
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('출금액은 0보다 커야 합니다.');
        }
        
        if (amount > this.#balance) {
            throw new Error('잔액이 부족합니다.');
        }
        
        this.#balance -= amount;
        this.#addTransaction('출금', amount);
        return this.#balance;
    }
    
    getBalance() {
        return this.#balance;
    }
    
    getTransactionHistory() {
        return [...this.#transactions]; // 배열 복사본 반환
    }
    
    #addTransaction(type, amount) {
        const transaction = {
            type,
            amount,
            date: new Date(),
            balance: this.#balance
        };
        
        this.#transactions.push(transaction);
    }
    
    // 이자 계산 (내부 메서드)
    #calculateInterest() {
        return this.#balance * this.#interest;
    }
    
    // 이자 적용 (공개 메서드)
    applyInterest() {
        const interest = this.#calculateInterest();
        this.#balance += interest;
        this.#addTransaction('이자', interest);
        return this.#balance;
    }
    
    // 계좌 정보
    toString() {
        return `${this.owner}님의 계좌 (${this.accountNumber}): 잔액 ${this.#balance}원`;
    }
}

// 테스트
try {
    const account = new BankAccount('홍길동', '123-456-789', 10000);
    console.log(account.toString());
    
    console.log('입금 후 잔액:', account.deposit(5000));
    console.log('출금 후 잔액:', account.withdraw(3000));
    console.log('이자 적용 후 잔액:', account.applyInterest());
    
    console.log('거래 내역:', account.getTransactionHistory());
    
    // Private 필드 직접 접근 시도
    // console.log(account.#balance); // 에러: private 필드에 직접 접근 불가
} catch (error) {
    console.log('계좌 오류:', error.message);
} 