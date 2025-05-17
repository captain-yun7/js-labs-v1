// practice.js - Async/Await 실습 문제

/**
 * Async/Await 실습 문제
 * 
 * 이 파일에서는 Async/Await를 연습할 수 있는 다양한 문제를 제공합니다.
 * 각 실습을 통해 Async/Await의 다양한 활용 방법을 배울 수 있습니다.
 */

console.log('==== Async/Await 실습 문제 ====');

// Promise 함수들 (API 요청 시뮬레이션)
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id <= 5) {
                resolve({
                    id: id,
                    name: `사용자${id}`,
                    email: `user${id}@example.com`
                });
            } else {
                reject(new Error(`ID가 ${id}인 사용자를 찾을 수 없습니다.`));
            }
        }, 500);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, userId: userId, title: '첫 번째 게시물' },
                { id: 2, userId: userId, title: '두 번째 게시물' },
                { id: 3, userId: userId, title: '세 번째 게시물' }
            ]);
        }, 500);
    });
}

function fetchPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, postId: postId, text: '좋은 게시물입니다!' },
                { id: 2, postId: postId, text: '잘 봤습니다.' }
            ]);
        }, 500);
    });
}

// 실습 1: 기본 Async/Await 사용하기
console.log('\n--- 실습 1: 기본 Async/Await 사용하기 ---');

/**
 * 문제 1: fetchUser 함수를 사용하여 사용자 정보를 가져오는 
 * async 함수를 작성하세요.
 */
console.log('문제 1: 사용자 정보 가져오기');

// 예시 답안
async function getUserInfo(userId) {
    try {
        const user = await fetchUser(userId);
        return user;
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error.message);
        return null;
    }
}

// 실행
getUserInfo(1).then(user => {
    console.log('사용자 정보:', user);
});

/**
 * 문제 2: 주어진 사용자 ID로 사용자 정보와 해당 사용자의 
 * 게시물을 함께 가져오는 async 함수를 작성하세요.
 */
console.log('문제 2: 사용자 정보와 게시물 가져오기');

async function getUserWithPosts(userId) {
    try {
        // 여기에 코드를 작성하세요.
        // 1. 사용자 정보 가져오기
        // 2. 사용자의 게시물 가져오기
        // 3. 사용자 정보와 게시물을 포함한 객체 반환
        
        // 예시 답안
        const user = await fetchUser(userId);
        const posts = await fetchUserPosts(userId);
        
        return {
            user,
            posts
        };
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error.message);
        return { error: error.message };
    }
}

// 실행
setTimeout(() => {
    getUserWithPosts(2).then(result => {
        console.log('사용자와 게시물:', result);
    });
}, 1500);

// 실습 2: 에러 처리
console.log('\n--- 실습 2: 에러 처리 ---');

/**
 * 문제 3: 존재하지 않는 사용자 ID에 대한 에러 처리를
 * 포함하는 async 함수를 작성하세요. 사용자가 없는 경우
 * 기본값을 반환하도록 합니다.
 */
console.log('문제 3: 에러 처리 및 기본값 설정');

async function getUserWithFallback(userId) {
    try {
        // 여기에 코드를 작성하세요.
        // 1. 사용자 정보 가져오기 시도
        // 2. 에러 발생 시 기본 사용자 정보 반환
        
        // 예시 답안
        const user = await fetchUser(userId);
        return user;
    } catch (error) {
        console.warn(`사용자 ${userId}를 찾을 수 없음, 기본값 사용`);
        return {
            id: userId,
            name: '게스트 사용자',
            email: 'guest@example.com',
            isDefaultUser: true
        };
    }
}

// 실행 - 정상 케이스와 에러 케이스 모두 테스트
setTimeout(() => {
    // 정상 케이스
    getUserWithFallback(3).then(user => {
        console.log('정상 사용자:', user);
    });
    
    // 에러 케이스
    getUserWithFallback(10).then(user => {
        console.log('존재하지 않는 사용자(기본값):', user);
    });
}, 3000);

// 실습 3: 병렬 처리
console.log('\n--- 실습 3: 병렬 처리 ---');

/**
 * 문제 4: 여러 사용자의 정보를 병렬로 가져오는
 * async 함수를 작성하세요.
 */
console.log('문제 4: 여러 사용자 정보 병렬 조회');

async function getMultipleUsers(userIds) {
    try {
        // 여기에 코드를 작성하세요.
        // 1. Promise.all과 map을 사용하여 여러 사용자 정보를 병렬로 가져오기
        
        // 예시 답안
        const userPromises = userIds.map(id => fetchUser(id));
        const users = await Promise.all(userPromises);
        return users;
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error.message);
        return [];
    }
}

// 실행
setTimeout(() => {
    getMultipleUsers([1, 2, 3]).then(users => {
        console.log('여러 사용자 정보:', users);
    });
}, 5000);

/**
 * 문제 5: 사용자 정보와 해당 사용자의 첫 번째 게시물의 댓글을
 * 병렬로 가져오는 async 함수를 작성하세요. (여러 API 호출 결합)
 */
console.log('문제 5: 사용자, 게시물, 댓글 정보 조합하기');

async function getUserPostAndComments(userId) {
    try {
        // 여기에 코드를 작성하세요.
        // 1. 사용자 정보 가져오기
        // 2. 사용자의 게시물 가져오기
        // 3. 첫 번째 게시물이 있으면 해당 게시물의 댓글 가져오기
        // 4. 모든 정보를 조합하여 반환
        
        // 예시 답안
        // 사용자 정보와 게시물을 병렬로 가져오기
        const [user, posts] = await Promise.all([
            fetchUser(userId),
            fetchUserPosts(userId)
        ]);
        
        // 게시물이 있는 경우에만 첫 번째 게시물의 댓글 가져오기
        let comments = [];
        if (posts.length > 0) {
            comments = await fetchPostComments(posts[0].id);
        }
        
        return {
            user,
            firstPost: posts.length > 0 ? posts[0] : null,
            comments
        };
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error.message);
        return { error: error.message };
    }
}

// 실행
setTimeout(() => {
    getUserPostAndComments(4).then(result => {
        console.log('사용자, 게시물, 댓글 정보:', result);
    });
}, 7000);

// 실습 4: 고급 패턴
console.log('\n--- 실습 4: 고급 패턴 ---');

/**
 * 문제 6: 제한 시간 내에 데이터를 가져오는 async 함수를 작성하세요.
 * 제한 시간이 지나면 타임아웃 에러를 발생시킵니다.
 */
console.log('문제 6: 타임아웃 처리');

// 느린 API 시뮬레이션
function slowFetchUser(id) {
    return new Promise((resolve) => {
        // 의도적으로 느린 응답
        setTimeout(() => {
            resolve({
                id: id,
                name: `느린사용자${id}`,
                email: `slowuser${id}@example.com`
            });
        }, 2000); // 2초 지연
    });
}

async function getUserWithTimeout(userId, timeoutMs = 1000) {
    // 여기에 코드를 작성하세요.
    // 1. Promise.race를 사용하여 타임아웃 처리
    // 2. 제한 시간 내에 응답이 오지 않으면 에러 발생
    
    // 예시 답안
    // 타임아웃 Promise 생성
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`타임아웃: ${timeoutMs}ms가 지났습니다.`));
        }, timeoutMs);
    });
    
    try {
        // Promise.race로 더 빨리 완료되는 Promise 처리
        const user = await Promise.race([
            slowFetchUser(userId),
            timeoutPromise
        ]);
        
        return user;
    } catch (error) {
        console.error('타임아웃 또는 에러 발생:', error.message);
        return { error: error.message };
    }
}

// 실행 (타임아웃 발생 케이스)
setTimeout(() => {
    getUserWithTimeout(5, 1000).then(result => {
        console.log('타임아웃 테스트 결과:', result);
    });
}, 9000);

/**
 * 문제 7: fetch 함수를 사용하여 실제 API에서 데이터를 가져오는
 * async 함수를 작성하세요. (Node.js 환경에서는 node-fetch 라이브러리 필요)
 */
console.log('문제 7: 실제 API 호출 (fetch 사용)');

async function fetchFromRealAPI(url) {
    try {
        // 여기에 코드를 작성하세요.
        // 1. fetch를 사용하여 API 호출
        // 2. JSON 형태로 파싱하여 반환
        
        // 예시 답안 (브라우저 환경 기준)
        // Node.js 환경에서는 import fetch from 'node-fetch'; 필요
        /*
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API 오류: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
        */
        
        // 시뮬레이션 데이터 (실제 fetch 대체)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    userId: 1,
                    id: 1,
                    title: 'JSON Placeholder API 응답',
                    body: '실제 API 호출을 시뮬레이션한 데이터입니다.'
                });
            }, 500);
        });
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error.message);
        return { error: error.message };
    }
}

// 실행 (JSONPlaceholder API 사용)
setTimeout(() => {
    // 실제 API URL (실행되지 않음)
    // fetchFromRealAPI('https://jsonplaceholder.typicode.com/posts/1')
    fetchFromRealAPI('simulate-url')
        .then(data => {
            console.log('API 응답 데이터:', data);
        });
}, 11000);

// 실습 5: 복합 문제
console.log('\n--- 실습 5: 복합 문제 ---');

/**
 * 문제 8: 비동기 반복 - 여러 사용자의 모든 게시물과 각 게시물의
 * 모든 댓글을 가져오는 async 함수를 작성하세요.
 */
console.log('문제 8: 비동기 반복 - 중첩된 데이터 가져오기');

async function getCompleteUserData(userIds) {
    try {
        // 여기에 코드를 작성하세요.
        // 1. 모든 사용자 정보 가져오기
        // 2. 각 사용자의 모든 게시물 가져오기
        // 3. 각 게시물의 모든 댓글 가져오기
        // 4. 계층 구조로 데이터 구성하기
        
        // 예시 답안
        // 모든 사용자 정보 병렬로 가져오기
        const userPromises = userIds.map(id => fetchUser(id));
        const users = await Promise.all(userPromises);
        
        // 각 사용자에 대해 게시물과 댓글 가져오기
        const usersWithData = await Promise.all(
            users.map(async (user) => {
                // 사용자 게시물 가져오기
                const posts = await fetchUserPosts(user.id);
                
                // 각 게시물에 대해 댓글 가져오기 (병렬로)
                const postsWithComments = await Promise.all(
                    posts.map(async (post) => {
                        const comments = await fetchPostComments(post.id);
                        return { ...post, comments };
                    })
                );
                
                // 사용자 정보와 게시물+댓글 정보 결합
                return {
                    ...user,
                    posts: postsWithComments
                };
            })
        );
        
        return usersWithData;
    } catch (error) {
        console.error('복합 데이터를 가져오는 중 오류 발생:', error.message);
        return { error: error.message };
    }
}

// 실행
setTimeout(() => {
    getCompleteUserData([1, 2]).then(result => {
        console.log('복합 사용자 데이터:');
        console.log(JSON.stringify(result, null, 2));
    });
}, 13000);

/**
 * 문제 9: 재시도 로직 - 에러 발생 시 지정된 횟수만큼
 * 재시도하는 async 함수를 작성하세요.
 */
console.log('문제 9: 재시도 로직 구현');

// 간헐적으로 실패하는 API 시뮬레이션
function unreliableAPI() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 75% 확률로 실패
            if (Math.random() < 0.75) {
                reject(new Error('일시적인 서버 오류'));
            } else {
                resolve({ status: 'success', data: '성공적으로 데이터를 가져왔습니다.' });
            }
        }, 300);
    });
}

async function fetchWithRetry(maxRetries = 3, delayMs = 500) {
    // 여기에 코드를 작성하세요.
    // 1. API 호출 시도
    // 2. 에러 발생 시 지정된 횟수만큼 재시도
    // 3. 지수 백오프 적용 (선택 사항)
    
    // 예시 답안
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`시도 ${attempt}/${maxRetries}`);
            const result = await unreliableAPI();
            console.log(`성공! (${attempt}번째 시도)`);
            return result;
        } catch (error) {
            lastError = error;
            console.error(`시도 ${attempt} 실패:`, error.message);
            
            if (attempt < maxRetries) {
                // 지수 백오프: 재시도 간격을 점점 늘림
                const waitTime = delayMs * Math.pow(2, attempt - 1);
                console.log(`${waitTime}ms 후 재시도...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }
    
    // 모든 재시도 실패
    console.error(`${maxRetries}번의 시도 모두 실패`);
    throw lastError;
}

// 실행
setTimeout(() => {
    fetchWithRetry(4, 300)
        .then(result => {
            console.log('최종 결과:', result);
        })
        .catch(error => {
            console.error('모든 재시도 실패:', error.message);
        });
}, 17000);

/**
 * 보너스 문제: 실제 프로젝트에 사용할 수 있는 async 유틸리티 함수들을
 * 직접 구현해보세요. (병렬 처리 제한, 순차 처리, 캐싱 등)
 */

console.log('\n모든 실습이 예약되었습니다. 각 실습은 순차적으로 실행됩니다.');
console.log('실습을 완료한 후 각자 실습 문제의 답안을 작성해보세요!');

/**
 * Async/Await 실습 요약:
 * 
 * 1. 기본 사용: async 함수 선언, await 키워드로 Promise 결과 기다리기
 * 2. 에러 처리: try-catch 블록 사용, 예외 상황 대응하기
 * 3. 병렬 처리: Promise.all을 활용한 병렬 작업 처리
 * 4. 고급 패턴: 타임아웃, API 호출 등 실제 상황 시뮬레이션
 * 5. 복합 문제: 중첩된 비동기 작업, 재시도 로직 등 
 */ 