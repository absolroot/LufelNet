class DefenseCalc {
    constructor() {
        this.tableBody = document.getElementById('defenseTableBody');
        this.totalValue = document.querySelector('.total-value');
        this.selectedItems = new Set();
        this.initializeTable();
        this.initializeBossSelect();
    }

    initializeTable() {
        defenseCalcData.forEach(data => {
            const row = this.createTableRow(data);
            this.tableBody.appendChild(row);
        });
    }

    createTableRow(data) {
        const row = document.createElement('tr');
        
        // 괴도 이름이 비어있는 경우 클래스 추가
        if (!data.charName && data.id !== 1) {  // id가 1이 아니고 charName이 비어있는 경우
            row.className = 'empty-char';
        }
        
        // 체크박스 열
        const checkCell = document.createElement('td');
        checkCell.className = 'check-column';
        const checkbox = document.createElement('img');
        checkbox.src = '../img/ui/check-off.png';
        checkbox.onclick = () => this.toggleCheck(checkbox, data);
        checkCell.appendChild(checkbox);
        row.appendChild(checkCell);
        
        // 캐릭터 이미지 열
        const charImgCell = document.createElement('td');
        charImgCell.className = 'char-img-column';
        if (data.charImage) {
            const charImg = document.createElement('img');
            charImg.src = `../img/character-half/${data.charImage}`;
            charImgCell.appendChild(charImg);
        }
        row.appendChild(charImgCell);
        
        // 괴도 이름 열
        const charNameCell = document.createElement('td');
        charNameCell.className = 'char-name-column';
        charNameCell.textContent = data.charName;
        row.appendChild(charNameCell);
        
        // 분류 열
        const typeCell = document.createElement('td');
        typeCell.className = 'type-column';
        typeCell.textContent = data.type;
        row.appendChild(typeCell);
        
        // 목표 열
        const targetCell = document.createElement('td');
        targetCell.className = 'target-column';
        targetCell.textContent = data.target;
        targetCell.setAttribute('data-target', data.target);
        row.appendChild(targetCell);
        
        // 스킬 아이콘 열
        const skillIconCell = document.createElement('td');
        skillIconCell.className = 'skill-icon-column';
        if (data.skillIcon) {
            const skillIcon = document.createElement('img');
            skillIcon.src = data.skillIcon;
            
            // 스킬 관련 타입인 경우 skill-icon 클래스 추가
            if (data.type.includes('스킬') || 
                data.type === '하이라이트' || 
                data.type === '패시브' ||
                data.type === '총격') {
                skillIcon.className = 'skill-icon';
            }
            
            skillIconCell.appendChild(skillIcon);
        }
        row.appendChild(skillIconCell);
        
        // 스킬 이름 열
        const skillNameCell = document.createElement('td');
        skillNameCell.className = 'skill-name-column';
        skillNameCell.textContent = data.skillName;
        row.appendChild(skillNameCell);
        
        // 옵션 열
        const optionCell = document.createElement('td');
        optionCell.className = 'option-column';
        if (data.options && data.options.length > 0) {
            const select = document.createElement('select');
            data.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                if (data.defaultOption && option === data.defaultOption) {
                    optionElement.selected = true;
                }
                select.appendChild(optionElement);
            });
            // 옵션 변경 시 수치 업데이트
            select.onchange = () => {
                const selectedOption = select.value;
                if (data.values && data.values[selectedOption]) {
                    data.value = data.values[selectedOption];
                    valueCell.textContent = `${data.value}%`;
                    if (this.selectedItems.has(data.id)) {
                        this.updateTotal();
                    }
                }
            };
            optionCell.appendChild(select);
        }
        row.appendChild(optionCell);
        
        // 수치 열
        const valueCell = document.createElement('td');
        valueCell.className = 'value-column';
        valueCell.textContent = `${data.value}%`;
        row.appendChild(valueCell);
        
        // 지속시간 열
        const durationCell = document.createElement('td');
        durationCell.className = 'duration-column';
        durationCell.textContent = data.duration;
        row.appendChild(durationCell);
        
        // 비고 열
        const noteCell = document.createElement('td');
        noteCell.className = 'note-column';
        noteCell.textContent = data.note;
        row.appendChild(noteCell);
        
        return row;
    }

    toggleCheck(checkbox, data) {
        const isChecked = checkbox.src.includes('check-on');
        checkbox.src = `../img/ui/check-${isChecked ? 'off' : 'on'}.png`;
        
        // 행 요소 찾기
        const row = checkbox.closest('tr');
        
        if (isChecked) {
            this.selectedItems.delete(data.id);
            row.classList.remove('selected');
        } else {
            this.selectedItems.add(data.id);
            row.classList.add('selected');
        }
        
        this.updateTotal();
    }

    updateTotal() {
        const total = Array.from(this.selectedItems)
            .map(id => defenseCalcData.find(d => d.id === id))
            .reduce((sum, item) => sum + item.value, 0);
            
        this.totalValue.textContent = `${total.toFixed(1)}%`;
        this.updateDamageCalculation();
    }

    initializeBossSelect() {
        this.bossSelect = document.getElementById('bossSelect');
        this.baseDefenseSpan = document.getElementById('baseDefense');
        this.defenseCoefSpan = document.getElementById('defenseCoef');
        this.damageIncreaseDiv = document.querySelector('.damage-increase');
        this.noDefReduceSpan = document.getElementById('noDefReduce');
        this.withDefReduceSpan = document.getElementById('withDefReduce');

        // 보스 선택 옵션 추가
        bossData.forEach(boss => {
            const option = document.createElement('option');
            option.value = boss.id;
            option.textContent = boss.name;
            if (boss.id === 1) {  // id가 1인 보스를 기본 선택
                option.selected = true;
            }
            this.bossSelect.appendChild(option);
        });

        this.bossSelect.addEventListener('change', () => this.updateDamageCalculation());
        
        // 초기 계산 실행
        this.updateDamageCalculation();
    }

    updateDamageCalculation() {
        const selectedBossId = this.bossSelect.value;
        if (!selectedBossId) {
            this.resetDamageDisplay();
            return;
        }

        const boss = bossData.find(b => b.id === parseInt(selectedBossId));
        if (!boss) {
            this.resetDamageDisplay();
            return;
        }

        // 기본 방어력과 방어 계수 표시 처리
        this.baseDefenseSpan.textContent = boss.baseDefense === '-' ? '미확인' : boss.baseDefense;
        this.defenseCoefSpan.textContent = boss.defenseCoef === '-' ? '미확인' : `${boss.defenseCoef}%`;

        // 기본 방어력이 미확인인 경우 계산 중단
        if (boss.baseDefense === '-') {
            this.damageIncreaseDiv.textContent = '-';
            this.noDefReduceSpan.textContent = '-';
            this.withDefReduceSpan.textContent = '-';
            return;
        }

        const baseDefense = parseFloat(boss.baseDefense);
        const defenseCoef = parseFloat(boss.defenseCoef);
        const defenseReduce = parseFloat(this.totalValue.textContent);
        
        // 방어력 감소 미적용
        const noReduceDamage = this.calculateDamage(baseDefense, defenseCoef);
        
        // 방어력 감소 적용
        const finalDefenseCoef = defenseCoef - defenseReduce;
        const withReduceDamage = this.calculateDamage(baseDefense, finalDefenseCoef);
        
        // 최종 대미지 증가율
        const damageIncrease = ((withReduceDamage / noReduceDamage) - 1) * 100;

        // 화면 업데이트
        this.damageIncreaseDiv.textContent = `+${damageIncrease.toFixed(1)}%`;
        this.noDefReduceSpan.textContent = noReduceDamage.toFixed(3);
        this.withDefReduceSpan.textContent = withReduceDamage.toFixed(3);
    }

    calculateDamage(baseDefense, defenseCoef) {
        const numerator = baseDefense * (defenseCoef / 100);
        const denominator = numerator + 1400;
        return numerator / denominator;
    }

    resetDamageDisplay() {
        this.baseDefenseSpan.textContent = '-';
        this.defenseCoefSpan.textContent = '-';
        this.damageIncreaseDiv.textContent = '-';
        this.noDefReduceSpan.textContent = '-';
        this.withDefReduceSpan.textContent = '-';
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new DefenseCalc();
}); 