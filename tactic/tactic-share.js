// Firebase 초기화
const firebaseConfig = {
    apiKey: "AIzaSyAfFJaJACzYqVRxm9JCo42pFnOvJanWIyw",
    authDomain: "lufelnet.firebaseapp.com",
    projectId: "lufelnet",
    storageBucket: "lufelnet.firebasestorage.app",
    messagingSenderId: "42431189158",
    appId: "1:42431189158:web:78a1fa5954d1c4183ee467",
    measurementId: "G-57DTGQ5TR7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class TacticShare {
    constructor() {
        this.currentPage = 1;
        this.postsPerPage = 20;
        this.lastDoc = null;
        this.firstDoc = null;
        this.userIP = '';
        this.likeDebounceMap = new Map(); // 좋아요 디바운스 맵
        this.likeCooldown = 10000; // 좋아요 쿨다운 10초
        this.dailyPostLimit = 10;
        this.POSTS_PER_CHUNK = 1000; // 청크당 게시물 수를 1000개로 증가
        
        this.getUserIP();
        this.initForm();
        this.loadPosts();
    }

    async handleLike(postId) {
        // postId 검증
        if (!/^[A-Za-z0-9-_]+$/.test(postId)) {
            console.error('잘못된 게시물 ID');
            return;
        }

        // 쿨다운 체크
        if (this.likeDebounceMap.has(postId)) {
            const lastLikeTime = this.likeDebounceMap.get(postId);
            const timeDiff = Date.now() - lastLikeTime;
            if (timeDiff < this.likeCooldown) {
                console.log('좋아요는 10초에 한 번만 가능합니다.');
                return;
            }
        }

        try {
            this.likeDebounceMap.set(postId, Date.now());
            const chunkNumber = Math.floor(parseInt(postId) / this.POSTS_PER_CHUNK);
            const chunkRef = db.collection('post_chunks').doc(`chunk_${chunkNumber}`);

            await db.runTransaction(async (transaction) => {
                const chunkDoc = await transaction.get(chunkRef);
                if (!chunkDoc.exists || !chunkDoc.data().posts[postId]) {
                    throw new Error('게시물을 찾을 수 없습니다.');
                }

                const post = chunkDoc.data().posts[postId];
                const likes = post.likes || { count: 0, recentIPs: [] };

                if (likes.recentIPs.includes(this.userIP)) {
                    throw new Error('이미 좋아요를 누르셨습니다!');
                }

                if (likes.recentIPs.length >= 1000) {
                    likes.recentIPs = likes.recentIPs.slice(-900);
                }

                likes.count++;
                likes.recentIPs.push(this.userIP);

                transaction.update(chunkRef, {
                    [`posts.${postId}.likes`]: likes
                });

                this.updateLikesDisplay(postId, likes);
            });

        } catch (error) {
            console.error('좋아요 실패:', error);
            if (error.message === '이미 좋아요를 누르셨습니다!') {
                const post = document.querySelector(`.post-item[data-post-id="${postId}"]`);
                if (post) {
                    const likeButton = post.querySelector('.like-button');
                    if (likeButton) {
                        likeButton.classList.add('liked');
                        likeButton.disabled = true;
                        likeButton.textContent = '❤️';
                    }
                }
            }
            alert(error.message || '좋아요 처리 중 오류가 발생했습니다.');
        }
    }

    async loadPosts(direction = 'next') {
        try {
            if (!this.tacticPreview) {
                this.tacticPreview = new TacticPreview();
            }

            // 현재 청크 번호 계산 (1000개 단위로)
            const currentChunk = Math.floor((this.currentPage - 1) / this.POSTS_PER_CHUNK);
            const chunkRef = db.collection('post_chunks').doc(`chunk_${currentChunk}`);
            
            const doc = await chunkRef.get();
            if (!doc.exists) {
                console.log('청크가 존재하지 않습니다.');
                this.renderPosts([]);
                return;
            }

            const chunkData = doc.data();
            console.log('청크 데이터:', chunkData); // 디버깅용

            const posts = Object.values(chunkData.posts || {})
                .sort((a, b) => {
                    const aTime = a.createdAt?.seconds || 0;
                    const bTime = b.createdAt?.seconds || 0;
                    return bTime - aTime;
                })
                .slice(
                    ((this.currentPage - 1) % this.POSTS_PER_CHUNK) * this.postsPerPage, 
                    (((this.currentPage - 1) % this.POSTS_PER_CHUNK) + 1) * this.postsPerPage
                )
                .map(post => ({
                    ...post,
                    likes: post.likes?.count || 0,
                    isLiked: post.likes?.recentIPs?.includes(this.userIP) || false
                }));

            console.log('처리된 게시물:', posts); // 디버깅용
            this.renderPosts(posts);
            
            // 페이지네이션 상태 업데이트
            const totalPosts = Object.keys(chunkData.posts || {}).length;
            const currentChunkPosition = ((this.currentPage - 1) % this.POSTS_PER_CHUNK) * this.postsPerPage;
            const hasNextPage = currentChunkPosition + this.postsPerPage < totalPosts || 
                              (await this.checkNextChunkExists(currentChunk));
            const hasPrevPage = this.currentPage > 1;
            
            this.updatePaginationButtons(hasNextPage, hasPrevPage);

        } catch (error) {
            console.error('게시물 로딩 실패:', error);
        }
    }

    renderPosts(posts) {
        const container = document.getElementById('postsList');
        if (!posts || posts.length === 0) {
            container.innerHTML = `
                <div class="post-item" style="text-align: center;">
                    <p>아직 공유된 택틱이 없습니다.</p>
                    <p>첫 번째 택틱을 공유해보세요!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = posts.map(post => `
            <div class="post-item" data-post-id="${escapeHtml(post.id)}">
                <h3>${escapeHtml(post.title)}</h3>
                <p>제작자: ${escapeHtml(post.author)}</p>
                <a href="${escapeHtml(post.query)}" target="_blank" rel="noopener noreferrer">택틱 보기</a>
                <div class="tactic-preview-container"></div>
                <div class="likes">
                    <span class="likes-count">좋아요: ${post.likes}</span>
                    <button 
                        onclick="tacticShare.handleLike('${post.id}')"
                        class="like-button ${post.isLiked ? 'liked' : ''}"
                        ${post.isLiked ? 'disabled' : ''}
                    >
                        ${post.isLiked ? '❤️' : '👍'}
                    </button>
                </div>
                <small>${this.formatDate(post.createdAt)}</small>
            </div>
        `).join('');

        // 각 게시물에 프리뷰 추가
        posts.forEach(post => {
            const postElement = container.querySelector(`[data-post-id="${post.id}"]`);
            if (postElement) {
                this.tacticPreview.addPreviewToPost(postElement, post.query);
            }
        });
    }

    formatDate(timestamp) {
        if (!timestamp) return '';
        // timestamp가 이미 객체인 경우 처리
        const seconds = timestamp.seconds || timestamp;
        const date = new Date(seconds * 1000);
        return date.toLocaleDateString('ko-KR');
    }

    updatePaginationButtons(hasNextPage, hasPrevPage) {
        const prevButton = document.getElementById('prevPage');
        const nextButton = document.getElementById('nextPage');
        
        if (prevButton) {
            prevButton.disabled = !hasPrevPage;
            prevButton.onclick = () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.loadPosts('prev');
                }
            };
        }
        
        if (nextButton) {
            nextButton.disabled = !hasNextPage;
            nextButton.onclick = () => {
                if (hasNextPage) {
                    this.currentPage++;
                    this.loadPosts('next');
                }
            };
        }
    }

    async checkLikeStatus(postId) {
        try {
            const statsDoc = await db.collection('post_stats').doc(postId).get();
            if (!statsDoc.exists) return false;

            const data = statsDoc.data();
            return data.likedIPs?.includes(this.userIP) || false;
        } catch (error) {
            console.error('좋아요 상태 확인 실패:', error);
            return false;
        }
    }

    async getUserIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            this.userIP = data.ip;
        } catch (error) {
            console.error('IP Load Error:', error);
            this.userIP = 'unknown';
        }
    }

    // URL 검증 함수 수정
    async validateTacticUrl(url) {
        const validPrefixes = [
            'lufelnet/tactic/tactic.html?data=',
            'lufelnet/tactic/?data=',
            'http://lufel.net/lufelnet/tactic/tactic.html?data=',
            'https://lufel.net/lufelnet/tactic/tactic.html?data=',
            'http://lufel.net/tactic/?data=',
            'https://lufel.net/tactic/?data='
        ];

        if (!validPrefixes.some(prefix => url.startsWith(prefix))) {
            throw new Error('올바른 택틱 URL 형식이 아니에요. 택틱 메이커에서 공유하기 기능을 통해 생성된 URL만 가능해요.');
        }

        // URL에서 data 파라미터 추출
        let sharedData;
        if (url.startsWith('@')) {
            url = url.substring(1);
        }
        
        try {
            const urlObj = new URL(url);
            sharedData = urlObj.searchParams.get('data');
        } catch (e) {
            const dataIndex = url.indexOf('data=');
            if (dataIndex !== -1) {
                sharedData = url.substring(dataIndex + 5);
            }
        }

        if (!sharedData) {
            throw new Error('택틱 데이터를 찾을 수 없습니다.');
        }

        try {
            // 데이터 구조 검증
            const decompressedData = LZString.decompressFromEncodedURIComponent(sharedData);
            if (!decompressedData) {
                throw new Error('택틱 데이터 압축 해제에 실패했습니다.');
            }

            const tacticData = JSON.parse(
                decompressedData
                .replace(/¶/g, 'm":1,"')
                .replace(/§6/g, '{"n":6,"a":[{"')
                .replace(/§5/g, '{"n":5,"a":[{"')
                .replace(/§4/g, '{"n":4,"a":[{"')
                .replace(/§3/g, '{"n":3,"a":[{"')
                .replace(/§2/g, '{"n":2,"a":[{"')
                .replace(/§1/g, '{"n":1,"a":[{"')
                .replace(/\$/g, '":"')
                .replace(/@/g, '","')
                .replace(/¤/g, '"},{"')
            );

            // 필수 데이터 구조 검증
            if (!tacticData.p || !Array.isArray(tacticData.p)) {
                throw new Error('잘못된 택틱 데이터 구조입니다.');
            }

            return true;
        } catch (error) {
            throw new Error('택틱 데이터 검증에 실패했습니다: ' + error.message);
        }
    }

    async checkDailyPostLimit() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        try {
            const chunks = await db.collection('post_chunks').get();
            let todayPosts = 0;
            
            for (const chunk of chunks.docs) {
                const posts = chunk.data().posts || {};
                todayPosts += Object.values(posts).filter(post => 
                    post.authorIP === this.userIP && 
                    post.createdAt?.seconds >= today.getTime() / 1000
                ).length;
                
                if (todayPosts >= this.dailyPostLimit) {
                    return true;
                }
            }
            
            return false;
        } catch (error) {
            console.error('일일 게시물 수 확인 실패:', error);
            return false;
        }
    }

    // 폼 초기화 함수 수정
    async initForm() {
        const form = document.getElementById('tacticForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                // 일일 게시물 제한 확인
                const limitReached = await this.checkDailyPostLimit();
                if (limitReached) {
                    alert('하루에 최대 10개의 택틱만 공유할 수 있어요.');
                    return;
                }

                const tacticUrl = document.getElementById('tacticUrl').value;
                const author = document.getElementById('author').value;
                const title = document.getElementById('title').value;

                // 길이 검증
                if (author.length > 12) {
                    alert('제작자 이름은 12자를 초과할 수 없습니다.');
                    return;
                }
                if (title.length > 50) {
                    alert('제목은 50자를 초과할 수 없습니다.');
                    return;
                }

                // URL 검증
                await this.validateTacticUrl(tacticUrl);

                // 새 게시물 ID 생성
                const postCount = await this.getNextPostId();
                const postId = postCount.toString();
                const chunkNumber = Math.floor(postCount / this.POSTS_PER_CHUNK);
                const chunkRef = db.collection('post_chunks').doc(`chunk_${chunkNumber}`);

                // 게시물 데이터 준비
                const postData = {
                    id: postId,
                    query: tacticUrl,
                    author: author.slice(0, 12),
                    title: title.slice(0, 50),
                    authorIP: this.userIP,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    likes: {
                        count: 0,
                        recentIPs: []
                    }
                };

                // 청크에 게시물 추가
                await chunkRef.set({
                    posts: {
                        [postId]: postData
                    }
                }, { merge: true });

                // UI 업데이트
                this.addNewPostToUI(postData);
                form.reset();

            } catch (error) {
                console.error('Write Post Error:', error);
                alert(error.message || '게시물 작성에 실패했습니다.');
            }
        });

        // 실시간 입력 제한 추가
        const authorInput = document.getElementById('author');
        const titleInput = document.getElementById('title');

        authorInput.addEventListener('input', function() {
            if (this.value.length > 12) {
                this.value = this.value.slice(0, 12);
            }
        });

        titleInput.addEventListener('input', function() {
            if (this.value.length > 50) {
                this.value = this.value.slice(0, 50);
            }
        });
    }

    async getNextPostId() {
        const counterRef = db.collection('counters').doc('posts');
        const res = await counterRef.update({
            count: firebase.firestore.FieldValue.increment(1)
        });
        const doc = await counterRef.get();
        return doc.data().count;
    }

    updateLikesDisplay(postId, likes) {
        const post = document.querySelector(`.post-item[data-post-id="${postId}"]`);
        if (post && likes) {
            const likesCount = post.querySelector('.likes-count');
            const likeButton = post.querySelector('.like-button');
            if (likesCount) {
                likesCount.textContent = `좋아요: ${likes.count}`;
            }
            if (likeButton && likes.recentIPs?.includes(this.userIP)) {
                likeButton.classList.add('liked');
                likeButton.disabled = true;
                likeButton.textContent = '❤️';
            }
        }
    }

    addNewPostToUI(postData) {
        const container = document.getElementById('postsList');
        const newPostHtml = `
            <div class="post-item" data-post-id="${escapeHtml(postData.id)}">
                <h3>${escapeHtml(postData.title)}</h3>
                <p>제작자: ${escapeHtml(postData.author)}</p>
                <a href="${escapeHtml(postData.query)}" target="_blank" rel="noopener noreferrer">택틱 보기</a>
                <div class="tactic-preview-container"></div>
                <div class="likes">
                    <span class="likes-count">좋아요: 0</span>
                    <button 
                        onclick="tacticShare.handleLike('${postData.id}')"
                        class="like-button"
                    >
                        👍
                    </button>
                </div>
                <small>${this.formatDate(postData.createdAt)}</small>
            </div>
        `;

        if (!container.querySelector('.post-item')?.textContent.includes('아직 공유된 택틱이 없습니다')) {
            container.insertAdjacentHTML('afterbegin', newPostHtml);
        } else {
            container.innerHTML = newPostHtml;
        }

        // 프리뷰 추가
        const postElement = container.querySelector(`[data-post-id="${postData.id}"]`);
        if (postElement) {
            this.tacticPreview.addPreviewToPost(postElement, postData.query);
        }
    }

    // 다음 청크 존재 여부 확인을 위한 새로운 메서드
    async checkNextChunkExists(currentChunk) {
        try {
            const nextChunkRef = db.collection('post_chunks').doc(`chunk_${currentChunk + 1}`);
            const nextChunkDoc = await nextChunkRef.get();
            return nextChunkDoc.exists;
        } catch (error) {
            console.error('다음 청크 확인 실패:', error);
            return false;
        }
    }
}

// 텍스트 이스케이프 함수 추가
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}