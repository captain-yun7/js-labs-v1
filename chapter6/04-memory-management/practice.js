// practice.js - 메모리 관리 실습

/**
 * JavaScript 메모리 관리 실습
 * 
 * 이 파일에서는 메모리 관리와 관련된 다양한 실습 문제와 예제를 제공합니다.
 * 각 실습을 수행하면서 JavaScript의 메모리 관리 개념을 더 깊이 이해할 수 있습니다.
 */

console.log('==== JavaScript 메모리 관리 실습 ====');

// 실습 1: 메모리 누수 찾기
console.log('\n--- 실습 1: 메모리 누수 찾기 ---');

/**
 * 다음 코드에는 메모리 누수가 있습니다.
 * 문제를 찾고 해결하세요.
 */

// 문제 코드
function createButtons_Problem() {
    const buttons = [];
    
    for (let i = 0; i < 10; i++) {
        // 버튼 생성 (DOM이 없는 환경이므로 객체로 시뮬레이션)
        const button = {
            id: `button_${i}`,
            text: `Button ${i}`,
            isClicked: false
        };
        
        // 클릭 핸들러 (클로저 사용)
        const handler = function() {
            // 모든 버튼 정보에 접근 (필요 이상의 참조)
            console.log(`Button ${i} clicked. Total buttons: ${buttons.length}`);
            console.log('All buttons:', buttons);
            button.isClicked = true;
        };
        
        // 핸들러 저장 (시뮬레이션)
        button.clickHandler = handler;
        buttons.push(button);
    }
    
    return buttons;
}

// 해결 코드
function createButtons_Solution() {
    const buttons = [];
    
    for (let i = 0; i < 10; i++) {
        const button = {
            id: `button_${i}`,
            text: `Button ${i}`,
            isClicked: false
        };
        
        // 클로저에서 필요한 데이터만 캡처
        // 'buttons' 배열 전체를 참조하지 않고 현재 버튼과 인덱스만 사용
        const currentIndex = i; // 현재 인덱스 캡처
        const handler = function() {
            console.log(`Button ${currentIndex} clicked.`);
            button.isClicked = true;
        };
        
        button.clickHandler = handler;
        buttons.push(button);
    }
    
    return buttons;
}

// 테스트
const problemButtons = createButtons_Problem();
console.log('문제가 있는 버튼 생성됨:', problemButtons.length);
problemButtons[0].clickHandler(); // 클릭 시뮬레이션

const solutionButtons = createButtons_Solution();
console.log('해결된 버튼 생성됨:', solutionButtons.length);
solutionButtons[0].clickHandler(); // 클릭 시뮬레이션

// 실습 2: 이벤트 리스너 정리
console.log('\n--- 실습 2: 이벤트 리스너 정리 ---');

/**
 * 브라우저 환경에서 컴포넌트를 생성하고 제거하는 
 * 패턴을 시뮬레이션합니다.
 */

class Component {
    constructor(id) {
        this.id = id;
        this.listeners = [];
        this.data = new Array(10000).fill(`Data for ${id}`);
        console.log(`Component ${id} 생성됨`);
    }
    
    // 이벤트 리스너 추가 (실제 환경에서는 DOM 이벤트에 추가)
    addEventListener(eventType, listener) {
        console.log(`Component ${this.id}에 ${eventType} 리스너 추가됨`);
        this.listeners.push({ eventType, listener });
        return listener; // 나중에 제거할 수 있도록 리스너 참조 반환
    }
    
    // 리스너 제거
    removeEventListener(eventType, listener) {
        this.listeners = this.listeners.filter(
            item => !(item.eventType === eventType && item.listener === listener)
        );
        console.log(`Component ${this.id}에서 ${eventType} 리스너 제거됨`);
    }
    
    // 모든 리스너 제거
    removeAllEventListeners() {
        const count = this.listeners.length;
        this.listeners = [];
        console.log(`Component ${this.id}에서 모든 리스너 제거됨 (총 ${count}개)`);
    }
    
    // 컴포넌트 소멸 (제대로 정리하지 않는 버전)
    destroyWithLeaks() {
        console.log(`Component ${this.id} 소멸 중 (누수 있음)`);
        // 리스너 제거 누락 - 메모리 누수 발생!
        this.data = null; // 데이터 참조만 제거
    }
    
    // 컴포넌트 소멸 (올바르게 정리하는 버전)
    destroyProperly() {
        console.log(`Component ${this.id} 소멸 중 (올바른 정리)`);
        this.removeAllEventListeners(); // 모든 리스너 제거
        this.data = null; // 데이터 참조 제거
    }
}

// 테스트
function testComponentLifecycle() {
    // 문제가 있는 버전
    const leakyComponent = new Component('leaky');
    
    // 이벤트 리스너 추가
    leakyComponent.addEventListener('click', function() {
        console.log('클릭 이벤트 발생', leakyComponent.data.length);
    });
    
    leakyComponent.addEventListener('hover', function() {
        console.log('호버 이벤트 발생', leakyComponent.data.length);
    });
    
    // 잘못된 소멸 (리스너가 남음)
    leakyComponent.destroyWithLeaks();
    
    // 올바른 버전
    const properComponent = new Component('proper');
    
    // 이벤트 리스너 추가
    const clickListener = properComponent.addEventListener('click', function() {
        console.log('클릭 이벤트 발생', properComponent.data.length);
    });
    
    const hoverListener = properComponent.addEventListener('hover', function() {
        console.log('호버 이벤트 발생', properComponent.data.length);
    });
    
    // 올바른 소멸 (모든 리스너 제거)
    properComponent.destroyProperly();
}

testComponentLifecycle();

// 실습 3: 객체 풀 구현
console.log('\n--- 실습 3: 객체 풀 구현 ---');

/**
 * 파티클 시스템을 위한 객체 풀을 구현합니다.
 * 이 패턴은 게임 개발이나 애니메이션에서 자주 사용됩니다.
 */

class Particle {
    constructor() {
        this.reset();
        console.log('파티클 생성됨');
    }
    
    reset() {
        this.x = 0;
        this.y = 0;
        this.velocity = { x: 0, y: 0 };
        this.size = 1;
        this.color = 'white';
        this.active = false;
        this.life = 0;
    }
    
    activate(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.velocity.x = config.velocityX || 0;
        this.velocity.y = config.velocityY || 0;
        this.size = config.size || 1;
        this.color = config.color || 'white';
        this.active = true;
        this.life = config.life || 100;
        
        console.log(`파티클 활성화: 위치(${this.x}, ${this.y}), 크기: ${this.size}`);
    }
    
    update() {
        if (!this.active) return false;
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life--;
        
        if (this.life <= 0) {
            console.log('파티클 수명 종료');
            this.active = false;
            return false;
        }
        
        return true;
    }
}

class ParticlePool {
    constructor(size = 10) {
        this.size = size;
        this.pool = [];
        this.activeCount = 0;
        
        // 풀 초기화
        this.initialize();
    }
    
    initialize() {
        for (let i = 0; i < this.size; i++) {
            this.pool.push(new Particle());
        }
        console.log(`파티클 풀 초기화 완료 (크기: ${this.size})`);
    }
    
    getParticle() {
        // 비활성 파티클 찾기
        for (let i = 0; i < this.size; i++) {
            if (!this.pool[i].active) {
                this.activeCount++;
                return this.pool[i];
            }
        }
        
        console.log('사용 가능한 파티클 없음 - 재사용 대기');
        return null;
    }
    
    updateAll() {
        let stillActive = 0;
        
        for (let i = 0; i < this.size; i++) {
            const particle = this.pool[i];
            if (particle.active) {
                const isAlive = particle.update();
                if (isAlive) {
                    stillActive++;
                } else {
                    this.activeCount--;
                }
            }
        }
        
        console.log(`업데이트 후 활성 파티클: ${stillActive}/${this.size}`);
        return stillActive;
    }
    
    createExplosion(x, y, particleCount = 5) {
        console.log(`위치 (${x}, ${y})에 폭발 효과 생성 시도`);
        
        let created = 0;
        for (let i = 0; i < particleCount; i++) {
            const particle = this.getParticle();
            if (particle) {
                // 랜덤한 방향과 속도로 파티클 활성화
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 2;
                
                particle.activate({
                    x: x,
                    y: y,
                    velocityX: Math.cos(angle) * speed,
                    velocityY: Math.sin(angle) * speed,
                    size: 1 + Math.random() * 3,
                    color: ['red', 'orange', 'yellow'][Math.floor(Math.random() * 3)],
                    life: 30 + Math.floor(Math.random() * 30)
                });
                
                created++;
            }
        }
        
        console.log(`폭발 효과 생성 완료: ${created}/${particleCount} 파티클 활성화됨`);
    }
}

// 사용 예제
function testParticlePool() {
    const pool = new ParticlePool(20);
    
    // 첫 번째 폭발 효과 생성
    pool.createExplosion(100, 100, 8);
    
    // 모든 파티클 업데이트 (애니메이션 프레임 시뮬레이션)
    console.log('--- 1번째 프레임 ---');
    pool.updateAll();
    
    // 두 번째 폭발 효과 생성
    pool.createExplosion(200, 150, 5);
    
    // 모든 파티클 업데이트
    console.log('--- 2번째 프레임 ---');
    pool.updateAll();
    
    // 모든 파티클이 수명을 다할 때까지 빠르게 진행
    console.log('--- 시간 경과 시뮬레이션 (모든 파티클 비활성화) ---');
    let frames = 0;
    while (pool.activeCount > 0 && frames < 100) {
        frames++;
        pool.updateAll();
    }
    
    console.log(`총 ${frames}개 프레임 후 모든 파티클 비활성화됨`);
}

testParticlePool();

// 실습 4: WeakMap을 사용한 개인 데이터 저장
console.log('\n--- 실습 4: WeakMap을 사용한 개인 데이터 저장 ---');

/**
 * WeakMap을 사용하여 객체에 대한 사설 데이터를 저장하는
 * 패턴을 구현합니다. 이는 메모리 누수를 방지하면서 객체에
 * 관련 데이터를 연결하는 좋은 방법입니다.
 */

// 사설 데이터 저장소 생성
const privateData = new WeakMap();

class User {
    constructor(name, age) {
        this.name = name; // 공개 속성
        
        // 사설 데이터는 WeakMap에 저장
        privateData.set(this, {
            age: age,
            loginAttempts: 0,
            lastLogin: null,
            secretNotes: []
        });
        
        console.log(`사용자 ${name} 생성됨`);
    }
    
    // 사설 데이터 접근 메서드
    getAge() {
        return privateData.get(this).age;
    }
    
    login() {
        const data = privateData.get(this);
        data.loginAttempts++;
        data.lastLogin = new Date();
        console.log(`${this.name}님이 로그인했습니다. (총 로그인 횟수: ${data.loginAttempts})`);
    }
    
    addSecretNote(note) {
        const data = privateData.get(this);
        data.secretNotes.push(note);
        console.log(`${this.name}님이 비밀 노트를 추가했습니다. (총 ${data.secretNotes.length}개)`);
    }
    
    getLoginInfo() {
        const data = privateData.get(this);
        return {
            attempts: data.loginAttempts,
            lastLogin: data.lastLogin
        };
    }
}

// 사용 예제
function testWeakMapPrivateData() {
    let user = new User('홍길동', 30);
    
    // 공개 속성 접근
    console.log(`사용자 이름: ${user.name}`);
    
    // 사설 속성 접근
    console.log(`사용자 나이: ${user.getAge()}`);
    
    // 사용자 활동
    user.login();
    user.addSecretNote('중요한 비밀 정보');
    user.login();
    
    console.log('로그인 정보:', user.getLoginInfo());
    
    // 사용자 객체에 대한 참조 제거
    console.log('사용자 객체 참조 제거');
    user = null;
    
    // 가비지 컬렉션이 실행되면 WeakMap에서도 해당 항목이 제거됨
    console.log('가비지 컬렉션 후 privateData에서 해당 항목 자동 제거 (시뮬레이션)');
}

testWeakMapPrivateData();

/**
 * 추가 실습 아이디어:
 * 
 * 1. 크롬 개발자 도구의 Memory 탭을 사용하여 메모리 사용량 분석하기
 * 2. 대용량 데이터셋 처리를 위한 가상 스크롤링 구현하기
 * 3. 상태 관리 라이브러리에서의 메모리 누수 방지 패턴 연구하기
 * 4. 오프스크린 캔버스와 웹 워커를 활용한 메모리 최적화 구현하기
 * 5. IndexedDB를 활용하여 대용량 데이터를 메모리 외부에 저장하기
 */ 