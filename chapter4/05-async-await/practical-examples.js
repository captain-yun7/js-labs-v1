// practical-examples.js - Async/Await 실제 활용 예제

/**
 * Async/Await 실제 활용 예제
 * 
 * 이 파일에서는 Async/Await를 실제 상황에서 활용하는 다양한 예제를 제공합니다.
 * 실무에서 자주 마주치는 비동기 시나리오를 Async/Await로 어떻게 처리하는지 보여줍니다.
 */

console.log('==== Async/Await 실제 활용 예제 ====');

// API 호출 시뮬레이션을 위한 헬퍼 함수들
const mockDatabase = {
    users: [
        { id: 1, name: '홍길동', email: 'hong@example.com' },
        { id: 2, name: '김철수', email: 'kim@example.com' },
        { id: 3, name: '이영희', email: 'lee@example.com' }
    ],
    posts: [
        { id: 1, userId: 1, title: '첫 번째 글', content: '안녕하세요!' },
        { id: 2, userId: 1, title: '두 번째 글', content: '반갑습니다!' },
        { id: 3, userId: 2, title: '철수의 글', content: '안녕하세요, 철수입니다.' }
    ],
    comments: [
        { id: 1, postId: 1, userId: 2, text: '좋은 글이네요!' },
        { id: 2, postId: 1, userId: 3, text: '잘 보고 갑니다.' },
        { id: 3, postId: 2, userId: 2, text: '두 번째 글도 좋네요!' }
    ]
};

// API 호출 시뮬레이션 함수들
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockDatabase.users.find(user => user.id === userId);
            if (user) {
                resolve(user);
            } else {
                reject(new Error(`사용자 ID ${userId}를 찾을 수 없습니다.`));
            }
        }, 500);
    });
}

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const posts = mockDatabase.posts.filter(post => post.userId === userId);
            resolve(posts);
        }, 500);
    });
}

function fetchComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const comments = mockDatabase.comments.filter(comment => comment.postId === postId);
            resolve(comments);
        }, 500);
    });
}

// 1. 사용자 활동 요약 조회
console.log('\n--- 예제 1: 사용자 활동 요약 조회 ---');

async function getUserActivitySummary(userId) {
    try {
        console.log(`사용자 ID ${userId}의 활동 요약 조회 중...`);
        
        // 사용자 정보 가져오기
        const user = await fetchUser(userId);
        console.log(`사용자 정보 로드: ${user.name}`);
        
        // 사용자의 게시물 가져오기
        const posts = await fetchPosts(userId);
        console.log(`게시물 ${posts.length}개 로드됨`);
        
        // 첫 번째 게시물의 댓글 가져오기 (게시물이 있는 경우)
        let comments = [];
        if (posts.length > 0) {
            comments = await fetchComments(posts[0].id);
            console.log(`첫 번째 게시물의 댓글 ${comments.length}개 로드됨`);
        }
        
        // 활동 요약 반환
        return {
            user,
            postCount: posts.length,
            posts: posts.map(post => ({ id: post.id, title: post.title })),
            recentComments: comments.map(comment => ({ id: comment.id, text: comment.text }))
        };
    } catch (error) {
        console.error('사용자 활동 요약 조회 중 오류 발생:', error.message);
        throw error; // 에러를 상위로 전달
    }
}

// 사용자 활동 요약 조회 실행
getUserActivitySummary(1)
    .then(summary => {
        console.log('사용자 활동 요약:');
        console.log(JSON.stringify(summary, null, 2));
    })
    .catch(error => {
        console.error('최종 에러:', error.message);
    });

// 2. 여러 사용자 데이터 병렬 조회
console.log('\n--- 예제 2: 여러 사용자 데이터 병렬 조회 ---');

async function fetchMultipleUsers(userIds) {
    try {
        console.log(`${userIds.length}명의 사용자 정보 병렬 조회 중...`);
        
        // Promise.all을 사용하여 여러 사용자 정보를 병렬로 조회
        const userPromises = userIds.map(id => fetchUser(id));
        const users = await Promise.all(userPromises);
        
        console.log('모든 사용자 정보 로드 완료');
        return users;
    } catch (error) {
        console.error('사용자 정보 병렬 조회 중 오류 발생:', error.message);
        throw error;
    }
}

// 여러 사용자 데이터 병렬 조회 실행
setTimeout(() => {
    fetchMultipleUsers([1, 2, 3])
        .then(users => {
            console.log('조회된 사용자 목록:');
            users.forEach(user => console.log(`- ${user.name} (${user.email})`));
        })
        .catch(error => {
            console.error('사용자 목록 조회 실패:', error.message);
        });
}, 2000);

// 3. 데이터 캐싱을 활용한 API 호출 최적화
console.log('\n--- 예제 3: 데이터 캐싱을 활용한 API 호출 최적화 ---');

// 간단한 캐시 구현
const cache = new Map();

async function fetchUserWithCache(userId) {
    // 캐시 키 생성
    const cacheKey = `user-${userId}`;
    
    // 캐시에 데이터가 있으면 사용
    if (cache.has(cacheKey)) {
        console.log(`캐시에서 사용자 ID ${userId} 정보 로드`);
        return cache.get(cacheKey);
    }
    
    // 캐시에 없으면 API 호출
    console.log(`API에서 사용자 ID ${userId} 정보 로드 중...`);
    const user = await fetchUser(userId);
    
    // 응답을 캐시에 저장
    cache.set(cacheKey, user);
    console.log(`사용자 정보 캐시에 저장됨`);
    
    return user;
}

// 캐시 테스트 - 같은 사용자를 두 번 조회
setTimeout(() => {
    async function testCache() {
        // 첫 번째 호출 - API에서 로드
        const firstCall = await fetchUserWithCache(1);
        console.log('첫 번째 호출 결과:', firstCall.name);
        
        // 두 번째 호출 - 캐시에서 로드
        const secondCall = await fetchUserWithCache(1);
        console.log('두 번째 호출 결과:', secondCall.name);
        
        // 다른 사용자 - API에서 로드
        const thirdCall = await fetchUserWithCache(2);
        console.log('세 번째 호출 결과:', thirdCall.name);
    }
    
    testCache();
}, 4000);

// 4. 재시도 로직이 포함된 안정적인 API 호출
console.log('\n--- 예제 4: 재시도 로직이 포함된 안정적인 API 호출 ---');

// 불안정한 API 호출 시뮬레이션
function unstableAPI(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 50% 확률로 실패하는 API
            if (Math.random() < 0.5) {
                console.log(`unstableAPI: 사용자 ID ${userId} 조회 성공`);
                resolve({ id: userId, name: '테스트 사용자', status: 'success' });
            } else {
                console.log(`unstableAPI: 사용자 ID ${userId} 조회 실패`);
                reject(new Error('네트워크 오류'));
            }
        }, 300);
    });
}

// 재시도 로직이 포함된 안정적인 API 호출
async function fetchWithRetry(userId, maxRetries = 3, delay = 500) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`시도 ${attempt}/${maxRetries}: 사용자 ID ${userId} 조회 중...`);
            const data = await unstableAPI(userId);
            console.log(`시도 ${attempt} 성공!`);
            return data;
        } catch (error) {
            console.error(`시도 ${attempt} 실패:`, error.message);
            lastError = error;
            
            // 마지막 시도가 아니면 대기 후 재시도
            if (attempt < maxRetries) {
                const waitTime = delay * Math.pow(2, attempt - 1); // 지수 백오프
                console.log(`${waitTime}ms 후 재시도...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }
    
    // 모든 재시도 실패
    console.error(`${maxRetries}번의 시도 후 최종 실패`);
    throw lastError;
}

// 재시도 로직 테스트
setTimeout(() => {
    fetchWithRetry(999, 4, 300)
        .then(data => {
            console.log('최종 데이터:', data);
        })
        .catch(error => {
            console.error('최종 에러:', error.message);
        });
}, 7000);

// 5. 타임아웃 처리가 포함된 API 호출
console.log('\n--- 예제 5: 타임아웃 처리가 포함된 API 호출 ---');

// 매우 느린 API 호출 시뮬레이션
function slowAPI() {
    return new Promise(resolve => {
        // 매우 긴 대기 시간
        setTimeout(() => {
            resolve({ status: 'success', message: '처리 완료' });
        }, 5000);
    });
}

// 타임아웃 Promise 생성 함수
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`타임아웃: ${ms}ms 초과`));
        }, ms);
    });
}

// 타임아웃 처리가 포함된 API 호출
async function fetchWithTimeout(timeoutMs = 2000) {
    try {
        console.log(`API 호출 중 (타임아웃: ${timeoutMs}ms)...`);
        
        // Promise.race를 사용하여 API 호출과 타임아웃 중 먼저 완료되는 것 처리
        const result = await Promise.race([
            slowAPI(),
            timeout(timeoutMs)
        ]);
        
        console.log('API 호출 성공:', result);
        return result;
    } catch (error) {
        console.error('API 호출 실패:', error.message);
        throw error;
    }
}

// 타임아웃 테스트
setTimeout(() => {
    fetchWithTimeout(3000)
        .then(data => {
            console.log('타임아웃 테스트 결과:', data);
        })
        .catch(error => {
            console.error('타임아웃 테스트 에러:', error.message);
        });
}, 10000);

// 6. 사용자 인증 흐름
console.log('\n--- 예제 6: 사용자 인증 흐름 ---');

// 인증 관련 API 시뮬레이션
function login(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'user' && password === 'pass') {
                resolve({ 
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example',
                    userId: 1
                });
            } else {
                reject(new Error('사용자 이름 또는 비밀번호가 잘못되었습니다.'));
            }
        }, 500);
    });
}

function getUserProfile(userId, token) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 토큰 검증 (간단한 예시)
            if (!token || !token.startsWith('eyJ')) {
                reject(new Error('유효하지 않은 토큰'));
                return;
            }
            
            const user = mockDatabase.users.find(u => u.id === userId);
            if (user) {
                resolve({
                    ...user,
                    permissions: ['read', 'write'],
                    lastLogin: new Date().toISOString()
                });
            } else {
                reject(new Error('사용자를 찾을 수 없습니다.'));
            }
        }, 500);
    });
}

// 전체 인증 흐름
async function authenticateUser(username, password) {
    try {
        console.log('사용자 인증 시작...');
        
        // 1. 로그인
        const authData = await login(username, password);
        console.log('로그인 성공, 토큰 수신');
        
        // 2. 사용자 프로필 조회
        const userProfile = await getUserProfile(authData.userId, authData.token);
        console.log('사용자 프로필 로드 성공');
        
        // 3. 인증 결과 생성
        const authResult = {
            user: userProfile,
            token: authData.token,
            isAuthenticated: true,
            authenticatedAt: new Date().toISOString()
        };
        
        console.log('인증 완료!');
        return authResult;
    } catch (error) {
        console.error('인증 실패:', error.message);
        return {
            isAuthenticated: false,
            error: error.message
        };
    }
}

// 인증 테스트
setTimeout(() => {
    // 성공 케이스
    authenticateUser('user', 'pass').then(result => {
        console.log('인증 결과 (성공):', result.isAuthenticated);
        
        // 실패 케이스
        setTimeout(() => {
            authenticateUser('user', 'wrongpass').then(result => {
                console.log('인증 결과 (실패):', result.isAuthenticated);
                console.log('에러:', result.error);
            });
        }, 2000);
    });
}, 15000);

/**
 * 실제 활용 시 추가 고려사항:
 * 
 * 1. 에러 처리 전략
 *    - 일반적인 에러, 네트워크 에러, 유효성 검사 에러 등 다양한 에러 유형 처리
 *    - 사용자에게 적절한 에러 메시지 제공
 * 
 * 2. 성능 최적화
 *    - 필요한 경우에만 API 호출 (캐싱 활용)
 *    - 가능한 경우 병렬 요청 사용
 *    - 불필요한 await 중첩 피하기
 * 
 * 3. 상태 관리
 *    - 로딩, 에러, 성공 상태 관리
 *    - 사용자 인터페이스에 상태 반영
 * 
 * 4. 취소 처리
 *    - 사용자가 작업을 취소할 수 있는 방법 제공
 *    - AbortController 활용 (fetch API)
 */ 