const APP_VERSION = '0.6.6';  // 현재 앱 버전

class VersionChecker {
    static check() {
        // 로컬 스토리지에서 마지막으로 확인한 버전 가져오기
        const lastVersion = localStorage.getItem('appVersion');
        console.log('Current stored version:', lastVersion);
        
        if (lastVersion === null) {
            // 최초 실행시
            localStorage.setItem('appVersion', APP_VERSION);
        } else if (lastVersion !== APP_VERSION) {
            // 버전이 다를 경우 업데이트 알림
            this.showUpdateNotification(lastVersion, APP_VERSION);
            localStorage.setItem('appVersion', APP_VERSION);
        }
    }

    static async clearCache() {
        try {
            // 현재 도메인의 캐시만 삭제
            const currentDomain = window.location.origin;
            const cacheNames = await caches.keys();
            const cacheDeletionPromises = cacheNames
                .filter(name => name.startsWith(currentDomain))
                .map(name => caches.delete(name));
            
            await Promise.all(cacheDeletionPromises);
            console.log('Cache cleared successfully');
            
            // 서비스 워커도 현재 도메인에 대해서만 해제
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                await Promise.all(
                    registrations.map(registration => registration.unregister())
                );
                console.log('Service workers unregistered');
            }
        } catch (error) {
            console.error('Cache clearing failed:', error);
        }
    }

    static showUpdateNotification(oldVersion, newVersion) {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <h3>✨ 업데이트 안내</h3>
                <p>새로운 버전이 적용되었습니다. (v${oldVersion} → v${newVersion})</p>
                <div class="update-content-buttons">
                    <button id="update-reload-btn">새로고침</button>
                    <button id="update-close-btn">닫기</button>
                </div>
            </div>
        `;
        document.body.appendChild(notification);

        // 새로고침 버튼 클릭 시
        document.getElementById('update-reload-btn').addEventListener('click', async () => {
            await this.clearCache();
            window.location.reload(true);
        });

        // 닫기 버튼 클릭 시
        document.getElementById('update-close-btn').addEventListener('click', () => {
            notification.remove();
        });
    }
} 