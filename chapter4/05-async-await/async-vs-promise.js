// async-vs-promise.js - Promise와 Async/Await 비교

/**
 * Promise와 Async/Await 비교
 * 
 * Async/Await는 Promise를 기반으로 하지만, 비동기 코드를 더 읽기 쉽고 
 * 동기 코드처럼 작성할 수 있게 해줍니다. 이 파일에서는 두 방식의 차이점과 
 * 각각의 장단점을 비교합니다.
 */

console.log('==== Promise와 Async/Await 비교 ====');

// 기본 Promise 함수들
function fetchUser() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: 1, name: '홍길동' });
        }, 1000);
    });
}

function fetchPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, title: '첫 번째 게시물', userId },
                { id: 2, title: '두 번째 게시물', userId }
            ]);
        }, 1000);
    });
}

function fetchComments(postId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, text: '좋은 글이네요!', postId },
                { id: 2, text: '감사합니다.', postId }
            ]);
        }, 1000);
    });
}

// 1. 기본 작업: 사용자 데이터 -> 게시물 -> 댓글 순차적 가져오기
console.log('\n--- 기본 작업: 순차적 데이터 가져오기 ---');

// Promise 체인 방식
function getUserDataPromise() {
    console.log('Promise 체인 방식 시작');
    console.time('Promise 체인');
    
    return fetchUser()
        .then(user => {
            console.log('사용자 정보:', user);
            return fetchPosts(user.id);
        })
        .then(posts => {
            console.log('게시물 목록:', posts);
            return fetchComments(posts[0].id);
        })
        .then(comments => {
            console.log('댓글 목록:', comments);
            console.timeEnd('Promise 체인');
            return { comments };
        })
        .catch(error => {
            console.error('Promise 체인 에러:', error);
        });
}

// Async/Await 방식
async function getUserDataAsync() {
    console.log('Async/Await 방식 시작');
    console.time('Async/Await');
    
    try {
        const user = await fetchUser();
        console.log('사용자 정보:', user);
        
        const posts = await fetchPosts(user.id);
        console.log('게시물 목록:', posts);
        
        const comments = await fetchComments(posts[0].id);
        console.log('댓글 목록:', comments);
        
        console.timeEnd('Async/Await');
        return { comments };
    } catch (error) {
        console.error('Async/Await 에러:', error);
    }
}

// 각 방식 호출
getUserDataPromise();

setTimeout(() => {
    getUserDataAsync();
}, 4000);

// 2. 조건부 로직
console.log('\n--- 조건부 로직 ---');

// Promise 체인에서의 조건부 로직
function conditionalPromise(shouldFetchComments) {
    console.log('Promise 조건부 로직 시작');
    
    return fetchUser()
        .then(user => {
            console.log('사용자:', user.name);
            return fetchPosts(user.id);
        })
        .then(posts => {
            console.log('첫 번째 게시물:', posts[0].title);
            
            // 조건부 Promise 체인
            if (shouldFetchComments) {
                return fetchComments(posts[0].id)
                    .then(comments => {
                        return { posts, comments };
                    });
            } else {
                return { posts, comments: [] };
            }
        });
}

// Async/Await에서의 조건부 로직
async function conditionalAsync(shouldFetchComments) {
    console.log('Async/Await 조건부 로직 시작');
    
    const user = await fetchUser();
    console.log('사용자:', user.name);
    
    const posts = await fetchPosts(user.id);
    console.log('첫 번째 게시물:', posts[0].title);
    
    // 조건부 await
    let comments = [];
    if (shouldFetchComments) {
        comments = await fetchComments(posts[0].id);
    }
    
    return { posts, comments };
}

// 두 방식 테스트
setTimeout(() => {
    conditionalPromise(true)
        .then(data => console.log('Promise 조건부 결과:', data));
    
    conditionalAsync(false)
        .then(data => console.log('Async/Await 조건부 결과:', data));
}, 8000);

// 3. 병렬 작업 처리
console.log('\n--- 병렬 작업 처리 ---');

// Promise.all을 사용한 병렬 처리
function parallelPromise() {
    console.log('Promise 병렬 처리 시작');
    console.time('Promise 병렬');
    
    return fetchUser()
        .then(user => {
            console.log('사용자:', user.name);
            
            // 두 개의 Promise를 병렬로 실행
            return Promise.all([
                fetchPosts(user.id),
                fetchComments(1) // 임시로 postId 1 사용
            ]);
        })
        .then(([posts, comments]) => {
            console.log('게시물 수:', posts.length);
            console.log('댓글 수:', comments.length);
            
            console.timeEnd('Promise 병렬');
            return { posts, comments };
        });
}

// Async/Await에서의 병렬 처리
async function parallelAsync() {
    console.log('Async/Await 병렬 처리 시작');
    console.time('Async/Await 병렬');
    
    const user = await fetchUser();
    console.log('사용자:', user.name);
    
    // 두 개의 Promise를 병렬로 실행 (Promise.all과 함께 사용)
    const [posts, comments] = await Promise.all([
        fetchPosts(user.id),
        fetchComments(1) // 임시로 postId 1 사용
    ]);
    
    console.log('게시물 수:', posts.length);
    console.log('댓글 수:', comments.length);
    
    console.timeEnd('Async/Await 병렬');
    return { posts, comments };
}

// 병렬 처리 테스트
setTimeout(() => {
    parallelPromise().then(() => {
        setTimeout(() => {
            parallelAsync();
        }, 3000);
    });
}, 12000);

// 4. 에러 처리 비교
console.log('\n--- 에러 처리 비교 ---');

// 에러 발생 시뮬레이션 함수
function fetchWithError() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('데이터 가져오기 실패'));
        }, 1000);
    });
}

// Promise에서의 에러 처리
function promiseErrorHandling() {
    console.log('Promise 에러 처리');
    
    return fetchUser()
        .then(user => {
            console.log('사용자:', user);
            return fetchWithError(); // 에러 발생
        })
        .then(data => {
            console.log('이 부분은 실행되지 않음');
            return data;
        })
        .catch(error => {
            // 모든 에러가 여기서 처리됨
            console.error('Promise 에러 캐치:', error.message);
            return { error: true, message: error.message };
        })
        .finally(() => {
            console.log('Promise 체인 완료');
        });
}

// Async/Await에서의 에러 처리
async function asyncErrorHandling() {
    console.log('Async/Await 에러 처리');
    
    try {
        const user = await fetchUser();
        console.log('사용자:', user);
        
        const data = await fetchWithError(); // 에러 발생
        console.log('이 부분은 실행되지 않음');
        
        return data;
    } catch (error) {
        // try 블록 내의 모든 에러가 여기서 처리됨
        console.error('Async/Await 에러 캐치:', error.message);
        return { error: true, message: error.message };
    } finally {
        console.log('Async/Await 함수 완료');
    }
}

// 에러 처리 테스트
setTimeout(() => {
    promiseErrorHandling().then(result => {
        console.log('Promise 최종 결과:', result);
        
        setTimeout(() => {
            asyncErrorHandling().then(result => {
                console.log('Async/Await 최종 결과:', result);
            });
        }, 2000);
    });
}, 20000);

// 5. 복잡한 로직 비교
console.log('\n--- 복잡한 로직 비교 ---');

// Promise로 복잡한 로직 구현
function complexPromiseLogic() {
    let userId;
    let firstPostId;
    
    console.log('Promise 복잡한 로직 시작');
    
    return fetchUser()
        .then(user => {
            userId = user.id;
            console.log(`사용자 ${user.name} 로드됨`);
            
            return fetchPosts(userId);
        })
        .then(posts => {
            if (posts.length === 0) {
                throw new Error('게시물이 없습니다');
            }
            
            firstPostId = posts[0].id;
            console.log(`사용자의 첫 번째 게시물: ${posts[0].title}`);
            
            return fetchComments(firstPostId);
        })
        .then(comments => {
            console.log(`첫 번째 게시물의 댓글 수: ${comments.length}`);
            
            // 또 다른 작업 추가
            return fetchPosts(userId + 1); // 다른 사용자의 게시물
        })
        .then(otherUserPosts => {
            console.log(`다른 사용자의 게시물 수: ${otherUserPosts.length}`);
            
            // 최종 결과 반환
            return {
                userId,
                firstPostId,
                otherUserPosts
            };
        })
        .catch(error => {
            console.error('Promise 로직 에러:', error.message);
            return { error: true };
        });
}

// Async/Await로 복잡한 로직 구현
async function complexAsyncLogic() {
    let userId;
    let firstPostId;
    
    console.log('Async/Await 복잡한 로직 시작');
    
    try {
        const user = await fetchUser();
        userId = user.id;
        console.log(`사용자 ${user.name} 로드됨`);
        
        const posts = await fetchPosts(userId);
        if (posts.length === 0) {
            throw new Error('게시물이 없습니다');
        }
        
        firstPostId = posts[0].id;
        console.log(`사용자의 첫 번째 게시물: ${posts[0].title}`);
        
        const comments = await fetchComments(firstPostId);
        console.log(`첫 번째 게시물의 댓글 수: ${comments.length}`);
        
        // 또 다른 작업 추가
        const otherUserPosts = await fetchPosts(userId + 1); // 다른 사용자의 게시물
        console.log(`다른 사용자의 게시물 수: ${otherUserPosts.length}`);
        
        // 최종 결과 반환
        return {
            userId,
            firstPostId,
            otherUserPosts
        };
    } catch (error) {
        console.error('Async/Await 로직 에러:', error.message);
        return { error: true };
    }
}

// 복잡한 로직 테스트
setTimeout(() => {
    complexPromiseLogic().then(result => {
        console.log('Promise 복잡한 로직 결과:', result);
        
        setTimeout(() => {
            complexAsyncLogic().then(result => {
                console.log('Async/Await 복잡한 로직 결과:', result);
            });
        }, 5000);
    });
}, 25000);

/**
 * Promise와 Async/Await 비교 요약:
 * 
 * Promise 장점:
 * - 브라우저 지원이 더 넓음 (ES6/ES2015부터 지원)
 * - Promise.all, Promise.race 등 유용한 정적 메서드 제공
 * - 체이닝을 통한 파이프라인 구성이 직관적
 * 
 * Async/Await 장점:
 * - 더 읽기 쉽고 동기 코드와 유사한 구문
 * - 디버깅이 더 쉬움 (스택 추적 개선)
 * - try/catch를 통한 에러 처리가 직관적
 * - 조건문, 반복문 등 일반 JavaScript 구문과 쉽게 결합
 * 
 * 결론:
 * Async/Await는 Promise를 기반으로 하며, 더 깔끔하고 읽기 쉬운 코드를 작성할 수 있게 해줍니다.
 * 그러나 Promise의 정적 메서드와 함께 사용하면 더 강력한 비동기 코드를 작성할 수 있습니다.
 */ 