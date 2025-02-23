const APP_VERSION = '1.0.4';  // 현재 앱 버전

class VersionChecker {
    static check() {
        // 로컬 스토리지에서 마지막으로 확인한 버전 가져오기
        const lastVersion = localStorage.getItem('appVersion');
        console.log(lastVersion);
        
        if (lastVersion === null) {
            // 최초 실행시
            localStorage.setItem('appVersion', APP_VERSION);
        } else if (lastVersion !== APP_VERSION) {
            // 버전이 다를 경우 업데이트 알림
            this.showUpdateNotification(lastVersion, APP_VERSION);
            localStorage.setItem('appVersion', APP_VERSION);
        }
    }

    static showUpdateNotification(oldVersion, newVersion) {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <h3>✨ 업데이트 안내</h3>
                <p>새로운 버전이 적용되었습니다. (v${oldVersion} → v${newVersion})</p>
                <button id="update-reload-btn">새로고침</button>
                <button id="update-close-btn">닫기</button>
            </div>
        `;
        document.body.appendChild(notification);

        // 새로고침 버튼 클릭 시
        document.getElementById('update-reload-btn').addEventListener('click', () => {
            // 캐시 초기화 후 새로고침
            if ('caches' in window) {
                caches.keys().then(function(names) {
                    for (let name of names) {
                        caches.delete(name);
                    }
                    window.location.reload(true);
                });
            } else {
                window.location.reload(true);
            }
        });

        // 닫기 버튼 클릭 시
        document.getElementById('update-close-btn').addEventListener('click', () => {
            notification.remove();
        });
    }
} 