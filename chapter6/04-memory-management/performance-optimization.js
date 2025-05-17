// performance-optimization.js - 메모리 성능 최적화

/**
 * JavaScript 메모리 성능 최적화
 * 
 * 메모리 성능 최적화는 애플리케이션의 반응성과 안정성을 향상시키는 중요한 요소입니다.
 * 이 파일에서는 JavaScript에서 메모리 사용을 최적화하는 다양한 기법을 살펴봅니다.
 */

console.log('==== JavaScript 메모리 성능 최적화 ====');

// 1. 객체 풀링(Object Pooling)
console.log('\n--- 객체 풀링 ---');

/**
 * 객체 풀링은 객체를 재사용하여 메모리 할당 및 가비지 컬렉션 오버헤드를 줄이는 기법입니다.
 * 자주 생성되고 파괴되는 객체에 효과적입니다.
 */

// 객체 풀 구현 예제
class ObjectPool {
    constructor(createFn, maxSize = 10) {
        this.createFn = createFn;   // 객체 생성 함수
        this.pool = [];             // 사용 가능한 객체 풀
        this.maxSize = maxSize;     // 풀의 최대 크기
        this.inUse = 0;             // 현재 사용 중인 객체 수
    }
    
    // 객체 획득
    acquire() {
        if (this.pool.length > 0) {
            // 풀에서 객체 재사용
            this.inUse++;
            return this.pool.pop();
        } else {
            // 새 객체 생성
            this.inUse++;
            return this.createFn();
        }
    }
    
    // 객체 반환
    release(obj) {
        this.inUse--;
        
        // 최대 크기를 초과하지 않으면 풀에 반환
        if (this.pool.length < this.maxSize) {
            this.pool.push(obj);
        }
        // 최대 크기를 초과하면 가비지 컬렉션에 맡김
    }
    
    // 현재 상태 정보
    getStatus() {
        return {
            available: this.pool.length,
            inUse: this.inUse,
            total: this.pool.length + this.inUse
        };
    }
}

// 예제: 파티클 객체 풀
const particlePool = new ObjectPool(() => {
    return { x: 0, y: 0, speed: 0, active: false };
}, 5);

// 파티클 사용
console.log('초기 풀 상태:', particlePool.getStatus());

// 파티클 획득 및 사용
const particles = [];
for (let i = 0; i < 3; i++) {
    const particle = particlePool.acquire();
    particle.x = Math.random() * 100;
    particle.y = Math.random() * 100;
    particle.speed = Math.random() * 5;
    particle.active = true;
    
    particles.push(particle);
}

console.log('파티클 획득 후 풀 상태:', particlePool.getStatus());

// 파티클 반환
particles[0].active = false;
particlePool.release(particles[0]);
particles.shift();

console.log('파티클 반환 후 풀 상태:', particlePool.getStatus());

// 2. 데이터 구조 최적화
console.log('\n--- 데이터 구조 최적화 ---');

// 비효율적인 배열 사용
function inefficientArrayExample() {
    console.time('비효율적인 배열 조작');
    
    // 큰 배열 앞에 요소 추가 (모든 요소를 이동시킴)
    const array = new Array(10000).fill(0);
    
    for (let i = 0; i < 1000; i++) {
        array.unshift(i); // 배열의 앞에 요소 추가 (비효율적)
    }
    
    console.timeEnd('비효율적인 배열 조작');
    return array.length;
}

// 효율적인 데이터 구조 사용
function efficientDataStructureExample() {
    console.time('효율적인 데이터 구조');
    
    // 배열 대신 연결 리스트 구현 또는 배열을 큐처럼 사용
    const queue = [];
    
    for (let i = 0; i < 1000; i++) {
        queue.push(i); // 배열 끝에 요소 추가 (효율적)
    }
    
    // 필요한 경우 reverse() 한 번만 호출하여 순서 변경
    const reversedQueue = queue.reverse();
    
    console.timeEnd('효율적인 데이터 구조');
    return reversedQueue.length;
}

console.log('비효율적인 배열 길이:', inefficientArrayExample());
console.log('효율적인 데이터 구조 길이:', efficientDataStructureExample());

// 3. 지연 로딩(Lazy Loading)과 지연 평가(Lazy Evaluation)
console.log('\n--- 지연 로딩과 지연 평가 ---');

// 지연 평가 함수 예제
function createLazyValue(computeFn) {
    let value = null;
    let computed = false;
    
    return function() {
        if (!computed) {
            value = computeFn();
            computed = true;
        }
        return value;
    };
}

// 계산 비용이 큰 함수
function expensiveComputation() {
    console.log('비용이 큰 계산 실행 중...');
    
    // 비용이 큰 계산을 시뮬레이션
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
        result += Math.sin(i);
    }
    
    return result;
}

// 지연 평가 적용
const lazyResult = createLazyValue(expensiveComputation);

console.log('지연 평가 함수 생성됨 (아직 계산되지 않음)');

// 실제로 값이 필요할 때만 계산 실행
console.log('첫 번째 호출 시 계산 실행:');
console.time('첫 번째 호출');
const result1 = lazyResult();
console.timeEnd('첫 번째 호출');

console.log('두 번째 호출 시 캐시된 값 사용:');
console.time('두 번째 호출');
const result2 = lazyResult();
console.timeEnd('두 번째 호출');

// 4. 청크 단위 처리(Chunking)
console.log('\n--- 청크 단위 처리 ---');

/**
 * 대량의 데이터를 청크(작은 단위)로 나누어 처리하면
 * 메모리 사용량과 UI 응답성을 개선할 수 있습니다.
 */

function processLargeDataInChunks() {
    const largeData = new Array(1000000).fill(0).map((_, i) => i);
    const chunkSize = 100000;
    let processed = 0;
    
    console.log(`총 ${largeData.length}개 항목을 ${chunkSize}개 단위로 처리`);
    
    function processChunk() {
        const start = processed;
        const end = Math.min(processed + chunkSize, largeData.length);
        
        if (start < largeData.length) {
            // 현재 청크 처리
            let sum = 0;
            for (let i = start; i < end; i++) {
                sum += largeData[i];
            }
            
            processed = end;
            console.log(`${start}~${end - 1} 처리 완료 (합계: ${sum})`);
            
            // 비동기적으로 다음 청크 처리 예약
            // 실제 브라우저 환경에서는 setTimeout 사용
            // setTimeout(processChunk, 0);
            
            // Node.js 환경에서는 즉시 다음 청크 처리
            processChunk();
        } else {
            console.log('모든 청크 처리 완료');
        }
    }
    
    // 첫 번째 청크 처리 시작
    processChunk();
}

// processLargeDataInChunks(); // 주석 처리: 시간이 오래 걸릴 수 있음

// 5. 캐싱과 메모이제이션(Memoization)
console.log('\n--- 캐싱과 메모이제이션 ---');

// 메모이제이션 함수 예제
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        // 캐시 키 생성 (인자를 직렬화)
        const key = JSON.stringify(args);
        
        // 캐시에 결과가 있으면 재사용
        if (cache.has(key)) {
            console.log(`캐시된 결과 사용: ${key}`);
            return cache.get(key);
        }
        
        // 없으면 함수 실행 후 결과 캐싱
        console.log(`계산 실행: ${key}`);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// 계산 비용이 큰 함수
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 메모이제이션 적용
const memoizedFibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.log('일반 피보나치 계산 (10):');
console.time('일반 피보나치');
const fib10 = fibonacci(10);
console.timeEnd('일반 피보나치');
console.log(`결과: ${fib10}`);

console.log('\n메모이제이션 피보나치 계산 (10):');
console.time('메모이제이션 피보나치');
const memoFib10 = memoizedFibonacci(10);
console.timeEnd('메모이제이션 피보나치');
console.log(`결과: ${memoFib10}`);

console.log('\n메모이제이션 피보나치 재계산 (10):');
console.time('메모이제이션 피보나치 재계산');
const memoFib10Again = memoizedFibonacci(10);
console.timeEnd('메모이제이션 피보나치 재계산');
console.log(`결과: ${memoFib10Again}`);

/**
 * 메모리 성능 최적화 전략 요약:
 * 
 * 1. 객체 풀링: 객체를 재사용하여 할당 및 가비지 컬렉션 오버헤드 감소
 * 2. 효율적인 데이터 구조: 작업에 적합한 데이터 구조 선택
 * 3. 지연 로딩과 평가: 실제 필요할 때만 비용이 큰 계산 실행
 * 4. 청크 단위 처리: 대량 데이터 작업을 작은 단위로 분할하여 메모리 사용 및 응답성 개선
 * 5. 캐싱과 메모이제이션: 이전 계산 결과를 저장하여 재사용
 * 6. 불변성(Immutability): 데이터 복사 대신 불변 데이터 구조 사용
 * 7. 메모리 사용량 모니터링: 개발자 도구를 활용한 지속적인 모니터링 및 최적화
 */ 