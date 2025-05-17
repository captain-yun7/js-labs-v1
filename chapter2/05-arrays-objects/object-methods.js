// object-methods.js - 객체 메서드 정의 및 활용

/**
 * 객체 메서드(Object Methods)
 * 
 * 객체 메서드는 객체의 속성으로 할당된 함수입니다.
 * 객체 내부에서 메서드를 정의하면 해당 객체의 데이터와 연관된 동작을 정의할 수 있습니다.
 */

console.log('==== 객체 메서드 ====');

// 1. 메서드 정의 방법
console.log('\n--- 메서드 정의 방법 ---');

// 1.1 객체 리터럴에서 함수 표현식으로 메서드 정의
const calculator1 = {
    x: 0,
    y: 0,
    sum: function() {
        return this.x + this.y;
    },
    multiply: function() {
        return this.x * this.y;
    }
};
calculator1.x = 10;
calculator1.y = 5;
console.log('함수 표현식 메서드 - 합계:', calculator1.sum()); // 15
console.log('함수 표현식 메서드 - 곱셈:', calculator1.multiply()); // 50

// 1.2 ES6 축약 메서드 표기법
const calculator2 = {
    x: 0,
    y: 0,
    sum() {
        return this.x + this.y;
    },
    multiply() {
        return this.x * this.y;
    }
};
calculator2.x = 10;
calculator2.y = 5;
console.log('ES6 축약 메서드 - 합계:', calculator2.sum()); // 15
console.log('ES6 축약 메서드 - 곱셈:', calculator2.multiply()); // 50

// 1.3 화살표 함수로 메서드 정의 (this 바인딩 주의)
const calculator3 = {
    x: 0,
    y: 0,
    // 화살표 함수는 자신만의 this를 가지지 않고 외부 스코프의 this를 사용
    sum: () => {
        // 이 this는 calculator3 객체가 아닌 외부 스코프를 가리킴
        return calculator3.x + calculator3.y; // this 대신 객체 이름 직접 사용
    }
};
calculator3.x = 10;
calculator3.y = 5;
console.log('화살표 함수 메서드 - 합계:', calculator3.sum()); // 15

// 1.4 객체 생성 후 메서드 추가
const calculator4 = {
    x: 0,
    y: 0
};
// 메서드 추가
calculator4.sum = function() {
    return this.x + this.y;
};
calculator4.x = 10;
calculator4.y = 5;
console.log('나중에 추가된 메서드 - 합계:', calculator4.sum()); // 15

// 2. this 키워드와 메서드 바인딩
console.log('\n--- this 키워드와 메서드 바인딩 ---');

const person = {
    firstName: '길동',
    lastName: '홍',
    fullName() {
        return this.lastName + this.firstName; // this는 현재 객체를 가리킴
    },
    greet(greeting) {
        return `${greeting}, ${this.fullName()}님!`;
    }
};

console.log('전체 이름:', person.fullName()); // "홍길동"
console.log('인사:', person.greet('안녕하세요')); // "안녕하세요, 홍길동님!"

// 2.1 메서드를 변수에 할당할 때 this 바인딩 상실
const getFullName = person.fullName; // 메서드를 참조만 함
console.log('바인딩 상실 시도:', getFullName()); // this가 전역 객체(또는 undefined)를 가리켜 제대로 작동하지 않음

// 2.2 call, apply, bind 메서드로 this 바인딩
const user = {
    firstName: '철수',
    lastName: '김'
};

// call() - 지정된 this와 인수로 함수 호출
console.log('call() 사용:', person.fullName.call(user)); // "김철수"
console.log('call() 인수 전달:', person.greet.call(user, '반갑습니다')); // "반갑습니다, 김철수님!"

// apply() - 지정된 this와 배열 형태의 인수로 함수 호출
console.log('apply() 사용:', person.greet.apply(user, ['환영합니다'])); // "환영합니다, 김철수님!"

// bind() - 지정된 this로 새 함수 생성
const userFullName = person.fullName.bind(user);
console.log('bind() 사용:', userFullName()); // "김철수"

const userGreet = person.greet.bind(user, '좋은 아침이에요');
console.log('bind() 인수 고정:', userGreet()); // "좋은 아침이에요, 김철수님!"
console.log('bind() 추가 인수 무시:', userGreet('무시됨')); // "좋은 아침이에요, 김철수님!"

// 3. 객체의 메서드 체이닝 패턴
console.log('\n--- 메서드 체이닝 패턴 ---');

const counter = {
    value: 0,
    increment() {
        this.value += 1;
        return this; // 현재 객체를 반환하여 체이닝 가능하게 함
    },
    decrement() {
        this.value -= 1;
        return this;
    },
    reset() {
        this.value = 0;
        return this;
    },
    getValue() {
        return this.value;
    }
};

// 메서드를 연속해서 호출
console.log('체이닝 전 값:', counter.getValue()); // 0
counter.increment().increment().increment().decrement();
console.log('체이닝 후 값:', counter.getValue()); // 2
counter.reset().increment().increment();
console.log('다시 체이닝 후 값:', counter.getValue()); // 2

// 4. getter와 setter 메서드
console.log('\n--- getter와 setter 메서드 ---');

const product = {
    _name: '제품', // 관례적으로 _로 시작하는 속성은 내부 속성임을 의미
    _price: 0,
    
    // getter - 속성을 읽을 때 호출되는 메서드
    get name() {
        return this._name;
    },
    get price() {
        return this._price;
    },
    get priceWithTax() {
        return this._price * 1.1; // 10% 세금 추가
    },
    
    // setter - 속성에 값을 할당할 때 호출되는 메서드
    set name(value) {
        if (value.trim() === '') {
            throw new Error('제품명은 비워둘 수 없습니다.');
        }
        this._name = value;
    },
    set price(value) {
        if (value < 0) {
            throw new Error('가격은 0보다 작을 수 없습니다.');
        }
        this._price = value;
    }
};

// getter/setter 사용
try {
    product.name = '스마트폰';
    product.price = 500000;
    
    console.log('제품명:', product.name); // "스마트폰"
    console.log('가격:', product.price); // 500000
    console.log('세금 포함 가격:', product.priceWithTax); // 550000
    
    // product.price = -1000; // 오류 발생: "가격은 0보다 작을 수 없습니다."
} catch (error) {
    console.error('오류 발생:', error.message);
}

// 5. 객체 메서드와 프로토타입
console.log('\n--- 객체 메서드와 프로토타입 ---');

// 생성자 함수와 프로토타입 메서드
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// 프로토타입에 메서드 추가 - 모든 인스턴스가 공유
Person.prototype.fullName = function() {
    return this.lastName + this.firstName;
};

Person.prototype.greet = function(greeting) {
    return `${greeting}, ${this.fullName()}님!`;
};

// 인스턴스 생성
const person1 = new Person('길동', '홍');
const person2 = new Person('영희', '김');

console.log('person1 전체 이름:', person1.fullName()); // "홍길동"
console.log('person2 전체 이름:', person2.fullName()); // "김영희"
console.log('person1 인사:', person1.greet('안녕하세요')); // "안녕하세요, 홍길동님!"

// 6. 클래스 메서드
console.log('\n--- 클래스 메서드 ---');

class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this._started = false;
    }
    
    // 인스턴스 메서드
    start() {
        this._started = true;
        return `${this.make} ${this.model} 시동을 걸었습니다.`;
    }
    
    stop() {
        this._started = false;
        return `${this.make} ${this.model} 시동을 껐습니다.`;
    }
    
    getInfo() {
        return `${this.year}년식 ${this.make} ${this.model}`;
    }
    
    // getter
    get started() {
        return this._started;
    }
    
    // 정적 메서드 (인스턴스 없이 클래스에서 직접 호출)
    static isVehicle(obj) {
        return obj instanceof Vehicle;
    }
}

const car = new Vehicle('현대', '아반떼', 2023);
console.log('차량 정보:', car.getInfo()); // "2023년식 현대 아반떼"
console.log('시동 걸기:', car.start()); // "현대 아반떼 시동을 걸었습니다."
console.log('시동 상태:', car.started); // true
console.log('시동 끄기:', car.stop()); // "현대 아반떼 시동을 껐습니다."

// 정적 메서드 호출
console.log('car는 Vehicle 인스턴스인가?', Vehicle.isVehicle(car)); // true
console.log('{}는 Vehicle 인스턴스인가?', Vehicle.isVehicle({})); // false

// 7. 객체 메서드와 함수형 프로그래밍
console.log('\n--- 객체 메서드와 함수형 프로그래밍 ---');

// 순수 함수를 사용하여 객체 조작하기
const student = {
    name: '홍길동',
    scores: [85, 90, 78, 92]
};

// 객체를 변경하지 않고 새 데이터를 반환하는 함수들
const calculateAverage = (scores) => {
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

const addScore = (student, score) => {
    // 기존 객체를 변경하지 않고 새 객체 반환
    return {
        ...student, // 스프레드 연산자로 기존 속성 복사
        scores: [...student.scores, score] // 기존 배열에 새 점수 추가
    };
};

// 기존 객체를 변경하지 않고 계산
const averageScore = calculateAverage(student.scores);
console.log('평균 점수:', averageScore); // ~86.25

// 새로운 객체 생성
const updatedStudent = addScore(student, 88);
console.log('원본 학생 객체:', student);
console.log('업데이트된 학생 객체:', updatedStudent);
console.log('업데이트된 평균 점수:', calculateAverage(updatedStudent.scores)); // ~86.6

/**
 * 객체 메서드 요약:
 * 
 * 1. 메서드 정의:
 *    - 함수 표현식: obj = { method: function() {} }
 *    - 축약 표기법: obj = { method() {} }
 *    - 화살표 함수: obj = { method: () => {} } (this 바인딩 주의)
 * 
 * 2. this 키워드:
 *    - 일반 함수: 호출 방식에 따라 this가 결정됨
 *    - 화살표 함수: 외부 스코프의 this를 유지
 *    - this 바인딩 메서드: call(), apply(), bind()
 * 
 * 3. 유용한 패턴:
 *    - 메서드 체이닝: 메서드가 자기 자신(this)을 반환하여 연속 호출 가능
 *    - getter/setter: 속성 읽기/쓰기 동작 정의
 * 
 * 4. 객체 지향 프로그래밍:
 *    - 프로토타입 메서드: 모든 인스턴스가 공유하는 메서드
 *    - 클래스 메서드: 인스턴스 메서드와 정적 메서드
 * 
 * 5. 함수형 접근:
 *    - 순수 함수 사용: 객체 상태를 변경하지 않고 새 객체 반환
 */ 