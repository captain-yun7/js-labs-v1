// prototype-basics.js - 프로토타입의 기본 개념

/**
 * JavaScript의 프로토타입(Prototype) 기본 개념
 * 
 * 프로토타입은 JavaScript 객체가 서로 속성을 상속받는 메커니즘입니다.
 * 모든 JavaScript 객체는 프로토타입 객체에 대한 링크를 가지고 있고,
 * 프로토타입 객체의 속성과 메서드를 상속받습니다.
 */

console.log('==== 프로토타입 기본 개념 ====');

// 1. 객체와 프로토타입
const user = {
    name: '홍길동',
    age: 30
};

// 모든 객체는 Object.prototype에서 메서드를 상속받습니다.
console.log('user.__proto__ === Object.prototype:', user.__proto__ === Object.prototype);
console.log('user.toString:', user.toString); // Object.prototype에서 상속된 메서드

// 2. 생성자 함수와 프로토타입
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 생성자 함수의 prototype 속성에 메서드 추가
Person.prototype.greet = function() {
    return `안녕하세요, 제 이름은 ${this.name}이고 ${this.age}살입니다.`;
};

// 새 객체 생성
const person1 = new Person('김철수', 25);
const person2 = new Person('이영희', 28);

console.log('person1.greet():', person1.greet());
console.log('person2.greet():', person2.greet());

// person1과 person2는 같은 프로토타입을 공유합니다.
console.log('person1.__proto__ === person2.__proto__:', person1.__proto__ === person2.__proto__);
console.log('person1.__proto__ === Person.prototype:', person1.__proto__ === Person.prototype);

// 3. 프로토타입 확인 방법

// __proto__ 속성 (권장되지 않는 방법, 레거시)
console.log('person1.__proto__:', person1.__proto__);

// Object.getPrototypeOf() (권장되는 방법)
console.log('Object.getPrototypeOf(person1):', Object.getPrototypeOf(person1));

// instanceof 연산자
console.log('person1 instanceof Person:', person1 instanceof Person);
console.log('person1 instanceof Object:', person1 instanceof Object);

// 4. 프로토타입 수정
console.log('\n==== 프로토타입 수정 ====');

// 기존 프로토타입에 메서드 추가
Person.prototype.introduce = function() {
    return `${this.name}입니다. 반갑습니다.`;
};

// 이미 생성된 객체도 새 메서드에 접근 가능
console.log('person1.introduce():', person1.introduce());
console.log('person2.introduce():', person2.introduce());

// 5. 프로토타입 교체
console.log('\n==== 프로토타입 교체 ====');

// 프로토타입 객체를 완전히 새 객체로 교체
Person.prototype = {
    constructor: Person, // constructor 속성 복원
    greet: function() {
        return `새 프로토타입: 안녕하세요, ${this.name}님!`;
    },
    farewell: function() {
        return `새 프로토타입: 안녕히 가세요, ${this.name}님!`;
    }
};

// 프로토타입 교체 후 새 객체 생성
const person3 = new Person('박지성', 35);

// 기존 객체는 여전히 이전 프로토타입을 참조
console.log('person1.greet():', person1.greet()); // 이전 프로토타입의 메서드
console.log('person3.greet():', person3.greet()); // 새 프로토타입의 메서드

// person1에서는 farewell 메서드를 사용할 수 없음
console.log('person1.farewell === undefined:', person1.farewell === undefined); // true
console.log('person3.farewell():', person3.farewell()); // 작동함

// 6. 속성 검색 과정
console.log('\n==== 속성 검색 과정 ====');

function Employee(name, position, salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
}

Employee.prototype.getSalary = function() {
    return this.salary;
};

Employee.prototype.company = '예제 회사';

const employee = new Employee('정민호', '개발자', 5000);

// 자체 속성 vs 프로토타입 속성
console.log('employee.name:', employee.name); // 자체 속성
console.log('employee.company:', employee.company); // 프로토타입 속성

// 자체 속성이 프로토타입 속성보다 우선함
employee.company = '새 회사';
console.log('employee.company (변경 후):', employee.company); // 자체 속성
console.log('Employee.prototype.company:', Employee.prototype.company); // 프로토타입 속성은 그대로

// hasOwnProperty는 자체 속성만 확인
console.log('employee.hasOwnProperty("name"):', employee.hasOwnProperty('name')); // true
console.log('employee.hasOwnProperty("getSalary"):', employee.hasOwnProperty('getSalary')); // false

// 7. 프로토타입과 this
console.log('\n==== 프로토타입과 this ====');

function Counter() {
    this.count = 0;
}

Counter.prototype.increment = function() {
    this.count += 1;
    return this.count;
};

Counter.prototype.decrement = function() {
    this.count -= 1;
    return this.count;
};

const counter1 = new Counter();
const counter2 = new Counter();

console.log('counter1.increment():', counter1.increment()); // 1
console.log('counter1.increment():', counter1.increment()); // 2
console.log('counter2.count:', counter2.count); // 0 (영향 받지 않음)

// 8. 내장 객체 프로토타입 확장 (권장되지 않음)
console.log('\n==== 내장 객체 프로토타입 확장 ====');

// String.prototype 확장
String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};

console.log('"Hello".reverse():', "Hello".reverse()); // "olleH"

// 9. 프로토타입 체인
console.log('\n==== 프로토타입 체인 ====');

// 프로토타입 체인 생성
const animal = {
    makeSound: function() {
        return '동물 소리';
    }
};

const dog = Object.create(animal);
dog.makeSound = function() {
    return '멍멍!';
};

const poodle = Object.create(dog);
poodle.name = '푸들';
poodle.color = '흰색';

console.log('poodle.makeSound():', poodle.makeSound()); // "멍멍!" (dog에서 상속)
console.log('poodle.name:', poodle.name); // "푸들" (자체 속성)

// 프로토타입 체인 확인
console.log('poodle.__proto__ === dog:', Object.getPrototypeOf(poodle) === dog);
console.log('dog.__proto__ === animal:', Object.getPrototypeOf(dog) === animal);
console.log('animal.__proto__ === Object.prototype:', Object.getPrototypeOf(animal) === Object.prototype);

/**
 * 프로토타입 사용 시 주의사항:
 * 
 * 1. 성능: 프로토타입 체인이 길어질수록 속성 검색 시간이 증가할 수 있습니다.
 * 2. 가변성: prototype 객체를 직접 수정하면 해당 생성자로 만든 모든 객체에 영향을 미칩니다.
 * 3. 내장 객체 확장: 내장 객체(String, Array 등)의 프로토타입을 수정하는 것은 예측하기 어려운 결과를 초래할 수 있습니다.
 * 4. __proto__: 이 속성은 레거시이므로 Object.getPrototypeOf()와 Object.setPrototypeOf()를 사용하는 것이 좋습니다.
 */