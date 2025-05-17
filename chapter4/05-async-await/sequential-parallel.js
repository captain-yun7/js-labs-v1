// sequential-parallel.js - 순차 실행과 병렬 실행

/**
 * Async/Await에서의 순차적 실행과 병렬 실행
 * 
 * 이 파일에서는 async/await를 사용하여 여러 비동기 작업을 처리하는 
 * 다양한 방법을 살펴봅니다. 순차적 실행과 병렬 실행의 차이점과 
 * 각각의 사용 사례를 알아봅니다.
 */

console.log('==== Async/Await 순차 실행과 병렬 실행 ====');

// 지연 함수 (비동기 작업 시뮬레이션)
function delay(ms, value) {
    return new Promise(resolve => {
        console.log(`${value} 작업 시작 (${ms}ms 소요)`);
        setTimeout(() => {
            console.log(`${value} 작업 완료`);
            resolve(value);
        }, ms);
    });
}

// 1. 순차적 실행 (Sequential Execution)
console.log('\n--- 순차적 실행 ---');

async function sequentialExecution() {
    console.log('순차적 실행 시작');
    console.time('순차적 실행 시간');
    
    // 각 작업이 이전 작업 완료 후에 시작됨
    const result1 = await delay(1000, 'A');
    const result2 = await delay(1000, 'B');
    const result3 = await delay(1000, 'C');
    
    console.timeEnd('순차적 실행 시간');
    return [result1, result2, result3];
}

// 2. 병렬 실행 (Parallel Execution)
console.log('\n--- 병렬 실행 ---');

async function parallelExecution() {
    console.log('병렬 실행 시작');
    console.time('병렬 실행 시간');
    
    // 모든 작업이 동시에 시작되고 모두 완료될 때까지 기다림
    const results = await Promise.all([
        delay(1000, 'X'),
        delay(1000, 'Y'),
        delay(1000, 'Z')
    ]);
    
    console.timeEnd('병렬 실행 시간');
    return results;
}

// 순차 실행 호출
sequentialExecution().then(results => {
    console.log('순차적 실행 결과:', results);
    
    // 병렬 실행은 순차 실행 완료 후 시작
    setTimeout(() => {
        parallelExecution().then(results => {
            console.log('병렬 실행 결과:', results);
            
            // 다음 예제는 병렬 실행 완료 후 시작
            setTimeout(runAllExamples, 1000);
        });
    }, 1000);
});

// 3. 다양한 실행 패턴 예제들
async function runAllExamples() {
    // 3.1 병렬 실행 후 결과 처리
    console.log('\n--- 병렬 실행 후 결과 처리 ---');
    
    async function parallelWithProcessing() {
        console.time('병렬 후 처리');
        
        // 모든 Promise를 동시에 시작하고 변수에 할당
        const promise1 = delay(1200, '작업 1');
        const promise2 = delay(800, '작업 2');
        const promise3 = delay(1000, '작업 3');
        
        // 각 결과를 개별적으로 기다리고 처리
        const result1 = await promise1;
        console.log('첫 번째 결과 처리:', result1);
        
        const result2 = await promise2;
        console.log('두 번째 결과 처리:', result2);
        
        const result3 = await promise3;
        console.log('세 번째 결과 처리:', result3);
        
        console.timeEnd('병렬 후 처리');
        return [result1, result2, result3];
    }
    
    const parallelResults = await parallelWithProcessing();
    console.log('병렬 후 처리 결과:', parallelResults);
    
    // 3.2 순차적 실행의 결과를 다음 단계에 사용
    console.log('\n--- 순차적 실행 (결과 의존성) ---');
    
    async function sequentialWithDependency() {
        console.time('순차적 의존 실행');
        
        // 첫 번째 작업의 결과를 다음 작업에 사용
        const userData = await delay(1000, { id: 123, name: '홍길동' });
        console.log('사용자 데이터:', userData);
        
        // 사용자 ID를 사용하여 다음 작업 수행
        const posts = await delay(1000, [
            { id: 1, title: '첫 번째 글', userId: userData.id },
            { id: 2, title: '두 번째 글', userId: userData.id }
        ]);
        console.log('게시물 데이터:', posts);
        
        // 첫 번째 게시물 ID를 사용하여 다음 작업 수행
        const comments = await delay(1000, [
            { id: 1, text: '좋은 글이네요', postId: posts[0].id },
            { id: 2, text: '감사합니다', postId: posts[0].id }
        ]);
        console.log('댓글 데이터:', comments);
        
        console.timeEnd('순차적 의존 실행');
        return { userData, posts, comments };
    }
    
    const dependencyResults = await sequentialWithDependency();
    console.log('순차적 의존 실행 결과:', dependencyResults);
    
    // 3.3 부분적 병렬 실행 (일부는 순차적, 일부는 병렬)
    console.log('\n--- 부분적 병렬 실행 ---');
    
    async function mixedExecution() {
        console.time('부분적 병렬 실행');
        
        // 첫 번째 작업 (순차적으로 실행해야 함)
        const config = await delay(1000, { apiKey: 'abc123', server: 'api.example.com' });
        console.log('설정 로드됨:', config);
        
        // 다음 두 작업은 병렬로 실행 가능
        const [users, products] = await Promise.all([
            delay(1200, [{ name: '김철수' }, { name: '이영희' }]),
            delay(800, [{ name: '상품 A' }, { name: '상품 B' }])
        ]);
        
        console.log('사용자 목록:', users);
        console.log('상품 목록:', products);
        
        // 마지막 작업 (이전 결과에 의존)
        const summary = await delay(500, {
            userCount: users.length,
            productCount: products.length,
            serverInfo: config.server
        });
        
        console.log('요약 정보:', summary);
        console.timeEnd('부분적 병렬 실행');
        
        return { config, users, products, summary };
    }
    
    const mixedResults = await mixedExecution();
    console.log('부분적 병렬 실행 결과:', mixedResults);
    
    // 3.4 Promise.race 사용 (가장 빨리 완료되는 작업 처리)
    console.log('\n--- Promise.race 사용 ---');
    
    async function raceExecution() {
        console.time('Promise.race 실행');
        
        // 여러 서버에 동시에 요청하고 가장 빨리 응답하는 것 사용
        const fastestResponse = await Promise.race([
            delay(800, '서버 1의 응답'),  // 가장 빠름
            delay(1000, '서버 2의 응답'),
            delay(1200, '서버 3의 응답')
        ]);
        
        console.log('가장 빠른 응답:', fastestResponse);
        console.timeEnd('Promise.race 실행');
        
        return fastestResponse;
    }
    
    const raceResult = await raceExecution();
    console.log('Race 실행 결과:', raceResult);
    
    // 3.5 동적 병렬 실행 (배열 크기에 따라 동적으로 Promise 생성)
    console.log('\n--- 동적 병렬 실행 ---');
    
    async function dynamicParallelExecution() {
        console.time('동적 병렬 실행');
        
        const items = [1, 2, 3, 4, 5];
        console.log(`${items.length}개 항목 처리 중...`);
        
        // 각 항목을 병렬로 처리
        const results = await Promise.all(
            items.map(item => delay(500, `항목 ${item} 처리됨`))
        );
        
        console.log('모든 항목 처리 완료');
        console.timeEnd('동적 병렬 실행');
        
        return results;
    }
    
    const dynamicResults = await dynamicParallelExecution();
    console.log('동적 병렬 실행 결과:', dynamicResults);
    
    // 3.6 병렬 실행 최대 동시성 제한 (배치 처리)
    console.log('\n--- 제한된 병렬 실행 (배치 처리) ---');
    
    async function limitedConcurrency() {
        console.time('제한된 병렬 실행');
        
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const batchSize = 3; // 한 번에 최대 3개 작업만 병렬 처리
        const allResults = [];
        
        // 배치 단위로 처리
        for (let i = 0; i < items.length; i += batchSize) {
            const batch = items.slice(i, i + batchSize);
            console.log(`배치 처리 중: ${batch.join(', ')}`);
            
            // 현재 배치를 병렬로 처리
            const batchResults = await Promise.all(
                batch.map(item => delay(500, `항목 ${item} 처리됨`))
            );
            
            allResults.push(...batchResults);
            console.log(`배치 완료, 현재까지 ${allResults.length}개 항목 처리됨`);
        }
        
        console.log(`모든 배치 처리 완료, 총 ${allResults.length}개 항목`);
        console.timeEnd('제한된 병렬 실행');
        
        return allResults;
    }
    
    const limitedResults = await limitedConcurrency();
    console.log('제한된 병렬 실행 결과 수:', limitedResults.length);
    
    // 3.7 에러 처리가 포함된 병렬 실행
    console.log('\n--- 에러 처리가 포함된 병렬 실행 ---');
    
    // 가끔 실패하는 작업 시뮬레이션
    function delayWithPossibleError(ms, value, shouldFail = false) {
        return new Promise((resolve, reject) => {
            console.log(`${value} 작업 시작 (${ms}ms 소요)`);
            setTimeout(() => {
                if (shouldFail) {
                    console.log(`${value} 작업 실패!`);
                    reject(new Error(`${value} 작업 중 오류 발생`));
                } else {
                    console.log(`${value} 작업 완료`);
                    resolve(value);
                }
            }, ms);
        });
    }
    
    async function parallelWithErrorHandling() {
        console.time('에러 처리 병렬 실행');
        
        // 각 Promise를 개별적으로 실행하고 에러 처리
        const promises = [
            delayWithPossibleError(800, '작업 A'),
            delayWithPossibleError(1000, '작업 B', true), // 이 작업은 실패
            delayWithPossibleError(600, '작업 C')
        ];
        
        // 각 Promise의 결과를 저장할 배열
        const results = [];
        
        // 모든 Promise에 대해 결과 또는 에러 수집
        await Promise.all(
            promises.map(async (promise, index) => {
                try {
                    const result = await promise;
                    results[index] = { success: true, value: result };
                } catch (error) {
                    console.error(`Promise ${index} 에러:`, error.message);
                    results[index] = { success: false, error: error.message };
                }
            })
        );
        
        console.timeEnd('에러 처리 병렬 실행');
        return results;
    }
    
    const errorHandlingResults = await parallelWithErrorHandling();
    console.log('에러 처리 병렬 실행 결과:', errorHandlingResults);
    
    // 모든 예제 완료
    console.log('\n모든 실행 패턴 예제 완료');
}

/**
 * 순차 실행과 병렬 실행 선택 가이드:
 * 
 * 순차적 실행을 선택해야 하는 경우:
 * 1. 다음 작업이 이전 작업의 결과에 의존할 때
 * 2. 작업 간에 순서가 중요할 때
 * 3. 작업이 동시에 실행되면 충돌이 발생할 수 있을 때 (예: 동일 리소스 수정)
 * 
 * 병렬 실행을 선택해야 하는 경우:
 * 1. 작업들이 서로 독립적일 때
 * 2. 전체 실행 시간을 줄이고 싶을 때
 * 3. 여러 외부 리소스(API, 파일 등)에 동시에 접근할 때
 * 
 * 실제 애플리케이션에서는:
 * - 너무 많은 병렬 작업은 시스템 리소스를 과도하게 사용할 수 있으므로 주의
 * - 중요한 작업은 순차적으로, 독립적인 작업은 병렬로 처리하는 혼합 접근이 일반적
 * - 병렬 처리 중 일부 작업이 실패하더라도 전체 작업이 중단되지 않도록 에러 처리 구현
 */ 