      /* ========== 원더 설정 ========== */
      function setupWonderConfig() {
        const wonderConfigDiv = document.getElementById("wonder-config");
        
        // 무기 입력 필드 수정
        const weaponInput = wonderConfigDiv.querySelector(".wonder-weapon-input");
        const weaponContainer = weaponInput.parentElement;
        
        // input을 컨테이너로 감싸기
        const inputContainer = document.createElement("div");
        inputContainer.className = "input-container";
        
        // 기존 input을 새 컨테이너로 이동
        weaponInput.parentNode.insertBefore(inputContainer, weaponInput);
        inputContainer.appendChild(weaponInput);
        
        // clear 버튼 추가
        const clearBtn = document.createElement("button");
        clearBtn.className = "clear-input";
        clearBtn.textContent = "×";
        clearBtn.addEventListener("click", () => {
          weaponInput.value = "";
          weaponInput.focus();
        });
        inputContainer.appendChild(clearBtn);

        const inputs = wonderConfigDiv.querySelectorAll(".wonder-persona-input");
        
        const weaponList = document.getElementById("weapon-list");
        wonderWeapons.forEach(weapon => {
          const option = document.createElement("option");
          option.value = weapon;
          weaponList.appendChild(option);
        });

        // 디바운스 함수
        const debounce = (func, wait) => {
          let timeout;
          return function executedFunction(...args) {
            const later = () => {
              clearTimeout(timeout);
              func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
          };
        };
        
        // 업데이트 함수를 디바운스 처리
        const debouncedUpdate = debounce(() => {
          updateAutoActions();
          updatePartyImages();
          renderTurns();
        }, 300);
        
        inputs.forEach((input, idx) => {
          // input을 컨테이너로 감싸기
          const inputContainer = document.createElement("div");
          inputContainer.className = "input-container";
          
          // datalist 생성
          const datalistId = `persona-list-${idx}`;
          input.setAttribute("list", datalistId);
          input.placeholder = "선택 또는 입력";
          
          const datalist = document.createElement("datalist");
          datalist.id = datalistId;
          
          // 페르소나 옵션 추가
          Object.keys(personaData).forEach(persona => {
            const option = document.createElement("option");
            option.value = persona;
            datalist.appendChild(option);
          });
          
          // clear 버튼 추가
          const clearBtn = document.createElement("button");
          clearBtn.className = "clear-input";
          clearBtn.textContent = "×";
          clearBtn.addEventListener("click", () => {
            input.value = "";
            wonderPersonas[idx] = "";
            debouncedUpdate();
            input.focus();
          });
          
          // 요소들을 컨테이너에 추가
          input.parentNode.insertBefore(inputContainer, input);
          inputContainer.appendChild(input);
          inputContainer.appendChild(clearBtn);
          inputContainer.parentNode.appendChild(datalist);
          
          // input 이벤트 리스너 수정
          input.addEventListener("change", (e) => {
            const oldPersona = wonderPersonas[idx];
            const newPersona = e.target.value;
            wonderPersonas[idx] = newPersona;
            
            // 고유 스킬 설정
            const uniqueSkillInput = wonderConfigDiv.querySelector(
                `.persona-skill-input[data-persona-index="${idx}"][data-skill-slot="0"]`
            );
            
            if (newPersona && personaData[newPersona]) {
                // 고유 스킬 설정 및 비활성화
                uniqueSkillInput.value = personaData[newPersona].uniqueSkill.name;
                uniqueSkillInput.disabled = true;
                uniqueSkillInput.classList.add('unique-skill');
                
                // 턴 데이터에서 해당 페르소나 업데이트 및 액션 메모 설정
                turns.forEach(turn => {
                    turn.actions.forEach(action => {
                        if (action.character === "원더" && action.wonderPersona === oldPersona) {
                            action.wonderPersona = newPersona;
                            // 스킬1이 있으면 스킬1을, 없으면 고유스킬을 메모에 설정
                            const skill1Input = wonderConfigDiv.querySelector(
                                `.persona-skill-input[data-persona-index="${idx}"][data-skill-slot="1"]`
                            );
                            action.memo = skill1Input?.value || uniqueSkillInput.value || "";
                        }
                    });
                });
            } else {
                // 페르소나가 선택되지 않은 경우 초기화
                uniqueSkillInput.value = '';
                uniqueSkillInput.disabled = false;
                uniqueSkillInput.classList.remove('unique-skill');
            }
            
            debouncedUpdate();
          });

          // input 직접 입력 이벤트도 추가
          input.addEventListener("input", (e) => {
            const oldPersona = wonderPersonas[idx];
            const newPersona = e.target.value;
            wonderPersonas[idx] = newPersona;
            
            // 고유 스킬 설정
            const uniqueSkillInput = wonderConfigDiv.querySelector(
                `.persona-skill-input[data-persona-index="${idx}"][data-skill-slot="0"]`
            );
            
            if (newPersona && personaData[newPersona]) {
                // 고유 스킬 설정 및 비활성화
                uniqueSkillInput.value = personaData[newPersona].uniqueSkill.name;
                uniqueSkillInput.disabled = true;
                uniqueSkillInput.classList.add('unique-skill');
                
                // 턴 데이터에서 해당 페르소나 업데이트 및 액션 메모 설정
                turns.forEach(turn => {
                    turn.actions.forEach(action => {
                        if (action.character === "원더" && action.wonderPersona === oldPersona) {
                            action.wonderPersona = newPersona;
                            // 스킬1이 있으면 스킬1을, 없으면 고유스킬을 메모에 설정
                            const skill1Input = wonderConfigDiv.querySelector(
                                `.persona-skill-input[data-persona-index="${idx}"][data-skill-slot="1"]`
                            );
                            action.memo = skill1Input?.value || uniqueSkillInput.value || "";
                        }
                    });
                });
            } else {
                // 페르소나가 선택되지 않은 경우 초기화
                uniqueSkillInput.value = '';
                uniqueSkillInput.disabled = false;
                uniqueSkillInput.classList.remove('unique-skill');
            }
            
            debouncedUpdate();
          });
        });

        // 무기 입력 필드 이벤트 리스너 수정
        weaponInput.addEventListener("change", (e) => {
          updatePartyImages();
        });

        weaponInput.addEventListener("input", (e) => {
          updatePartyImages();
        });

        // 페르소나 스킬 datalist 생성
        const skillsDatalist = document.createElement("datalist");
        skillsDatalist.id = "persona-skills-list";
        
        // 스킬 옵션 추가
        Object.values(personaData).forEach(persona => {
            // 고유 스킬 추가
            if (persona.uniqueSkill) {
                const option = document.createElement("option");
                option.value = persona.uniqueSkill.name;
                skillsDatalist.appendChild(option);
            }
            // HIGHLIGHT 추가
            if (persona.highlight) {
                const option = document.createElement("option");
                option.value = "HIGHLIGHT";
                skillsDatalist.appendChild(option);
            }
        });
        
        document.body.appendChild(skillsDatalist);

        // 페르소나 스킬 입력 필드 설정
        const skillInputs = wonderConfigDiv.querySelectorAll(".persona-skill-input");
        skillInputs.forEach((input) => {
            const inputContainer = document.createElement("div");
            inputContainer.className = "input-container";
            
            input.parentNode.insertBefore(inputContainer, input);
            inputContainer.appendChild(input);

            // 입력 이벤트 리스너
            input.addEventListener("change", () => {
                debouncedUpdate();
                updateActionMemos();
            });
            input.addEventListener("input", () => {
                debouncedUpdate();
                updateActionMemos();
            });
        });
      }
      
      // 액션 메모 자동 업데이트 함수 추가
      function updateActionMemos() {
        turns.forEach(turn => {
          turn.actions.forEach(action => {
            if (action.character === "원더" && action.wonderPersona) {
              // 선택된 페르소나의 인덱스 찾기
              const personaIndex = wonderPersonas.indexOf(action.wonderPersona);
              if (personaIndex !== -1) {
                // 해당 페르소나의 스킬 입력값 가져오기
                const skillInputs = document.querySelectorAll(
                  `.persona-skill-input[data-persona-index="${personaIndex}"]`
                );
                
                // 스킬1이 있으면 스킬1 사용, 없으면 고유스킬 사용
                const skill1 = skillInputs[1]?.value;
                const uniqueSkill = skillInputs[0]?.value;
                
                // 스킬1이 있으면 스킬1을, 없으면 고유스킬을 메모에 설정
                action.memo = skill1 || uniqueSkill || "";
              }
            }
          });
        });
        renderTurns();
      }
      