// Piggy 재무건전성 예측 웹사이트 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('financeForm');
    const resultsSection = document.getElementById('results');
    const analyzeBtn = document.querySelector('.analyze-btn');
    
    // 샘플 데이터 정의
    const sampleData = {
        excellent: {
            income: 800,
            total_spending: 300,
            mean_spending: 1.2,
            n_transactions: 250,
            housing: 18,
            food: 15,
            transport: 12,
            entertainment: 8,
            education: 15,
            medical: 10,
            other: 22
        },
        average: {
            income: 350,
            total_spending: 280,
            mean_spending: 1.8,
            n_transactions: 156,
            housing: 25,
            food: 18,
            transport: 15,
            entertainment: 12,
            education: 8,
            medical: 12,
            other: 10
        },
        needsImprovement: {
            income: 280,
            total_spending: 320,
            mean_spending: 2.5,
            n_transactions: 128,
            housing: 35,
            food: 20,
            transport: 18,
            entertainment: 15,
            education: 3,
            medical: 5,
            other: 4
        }
    };
    
    // 샘플 버튼 이벤트 리스너
    document.getElementById('sampleBtn1').addEventListener('click', () => fillSampleData(sampleData.excellent));
    document.getElementById('sampleBtn2').addEventListener('click', () => fillSampleData(sampleData.average));
    document.getElementById('sampleBtn3').addEventListener('click', () => fillSampleData(sampleData.needsImprovement));
    
    // 샘플 데이터 채우기 함수
    function fillSampleData(data) {
        document.getElementById('income').value = data.income;
        document.getElementById('total_spending').value = data.total_spending;
        document.getElementById('mean_spending').value = data.mean_spending;
        document.getElementById('n_transactions').value = data.n_transactions;
        document.getElementById('housing-amount').value = data.housing;
        document.getElementById('food-amount').value = data.food;
        document.getElementById('transport-amount').value = data.transport;
        document.getElementById('entertainment-amount').value = data.entertainment;
        document.getElementById('education-amount').value = data.education;
        document.getElementById('medical-amount').value = data.medical;
        document.getElementById('other-amount').value = data.other;
        
        // 애니메이션 효과
        const inputs = form.querySelectorAll('input');
        inputs.forEach((input, index) => {
            setTimeout(() => {
                input.style.transform = 'scale(1.05)';
                input.style.borderColor = '#667eea';
                setTimeout(() => {
                    input.style.transform = 'scale(1)';
                    input.style.borderColor = '#e2e8f0';
                }, 200);
            }, index * 50);
        });
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 버튼 로딩 상태로 변경
        analyzeBtn.classList.add('loading');
        
        // 폼 데이터 수집
        const formData = new FormData(form);
        const data = {};
        
        // 기본 데이터
        data.income = parseFloat(formData.get('income'));
        data.total_spending = parseFloat(formData.get('total_spending'));
        data.mean_spending = parseFloat(formData.get('mean_spending'));
        data.n_transactions = parseInt(formData.get('n_transactions'));
        
        // 카테고리 데이터 (비율로 변환)
        const categories = ['education', 'transport', 'other', 'medical', 'food', 'entertainment', 'housing'];
        categories.forEach(category => {
            const value = parseFloat(formData.get(category)) || 0;
            data[category] = value / 100; // 퍼센트를 비율로 변환
        });
        
        console.log('전송 데이터:', data);
        
        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('응답 데이터:', result);
            
            // 결과 표시
            displayResults(result);
            
        } catch (error) {
            console.error('예측 오류:', error);
            alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
            let errorMessage = '예측 중 오류가 발생했습니다: ' + error.message;
            if (error.name === 'TypeError') {
                errorMessage += '\n네트워크 연결을 확인해주세요.';
            }
            alert(errorMessage);
        } finally {
            // 버튼 로딩 상태 해제
            analyzeBtn.classList.remove('loading');
        }
    });

    function displayResults(result) {
        console.log('Displaying results:', result);
        
        // 결과 섹션 표시
        const resultSection = document.getElementById('results');
        if (resultSection) {
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // 분석 날짜 설정
        const now = new Date();
        const dateElement = document.getElementById('analysisDate');
        if (dateElement) {
            dateElement.textContent = 
                `분석일시: ${now.getFullYear()}.${(now.getMonth()+1).toString().padStart(2,'0')}.${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
        }
        
        // 점수 원형 차트 업데이트
        if (result.score !== undefined) {
            const scoreNumber = document.getElementById('scoreNumber');
            const scoreRing = document.getElementById('scoreRing');
            
            if (scoreNumber) {
                // 점수 애니메이션
                animateScore(0, result.score, scoreNumber);
            }
            
            if (scoreRing) {
                // 원형 차트 애니메이션
                const circumference = 2 * Math.PI * 50; // r=50
                const offset = circumference - (result.score / 100) * circumference;
                scoreRing.style.strokeDasharray = circumference;
                scoreRing.style.strokeDashoffset = offset;
                
                // 점수에 따른 색상
                let color = '#e53e3e'; // 빨강 (0-40)
                if (result.score >= 40 && result.score < 60) color = '#dd6b20'; // 주황 (40-60)
                else if (result.score >= 60 && result.score < 80) color = '#38a169'; // 초록 (60-80)
                else if (result.score >= 80) color = '#3182ce'; // 파랑 (80-100)
                
                scoreRing.style.stroke = color;
            }
        }
        
        // 페르소나 정보 업데이트
        if (result.persona) {
            const personaName = document.getElementById('personaName');
            const personaEmoji = document.getElementById('personaEmoji');
            const personaDesc = document.getElementById('personaDescription');
            const personaLevel = document.getElementById('personaLevel');
            
            if (personaName) personaName.textContent = result.persona.name || '';
            if (personaDesc) personaDesc.textContent = result.persona.description || '';
            if (personaLevel) personaLevel.textContent = `Lv.${result.persona.level || 1}`;
            
            // 이모지 매핑
            const emojiMap = {
                'lion': '🦁', 'koala': '🐨', 'rabbit': '🐰', 
                'dog': '🐶', 'fox': '🦊', 'tiger': '🐯',
                'elephant': '🐘', 'panda': '🐼', 'cat': '🐱',
                'squirrel': '🐿️', 'hamster': '🐹', 'wolf': '🐺'
            };
            
            if (personaEmoji) {
                const emoji = emojiMap[result.persona.emoji] || '🐱';
                personaEmoji.textContent = emoji;
            }
        }
        
        // 위험도 정보 업데이트
        if (result.risk_info) {
            const riskLevel = document.getElementById('riskLevel');
            const riskDesc = document.getElementById('riskDescription');
            const riskBadge = document.getElementById('riskBadge');
            
            if (riskLevel) riskLevel.textContent = result.risk_info.level || '';
            if (riskDesc) riskDesc.textContent = result.risk_info.description || '';
            
            // 위험도에 따른 배지 색상
            if (riskBadge) {
                riskBadge.className = `risk-badge ${result.risk_info.color || 'green'}`;
            }
        }
        
        // 재무 현황 정보 업데이트
        if (result.income !== undefined && result.total_spending !== undefined && result.savings !== undefined) {
            const incomeAmount = document.getElementById('incomeAmount');
            const spendingAmount = document.getElementById('spendingAmount');
            const savingsAmount = document.getElementById('savingsAmount');
            const savingsRate = document.getElementById('savingsRate');
            
            if (incomeAmount) incomeAmount.textContent = `${result.income}만원`;
            if (spendingAmount) spendingAmount.textContent = `${result.total_spending}만원`;
            if (savingsAmount) {
                savingsAmount.textContent = `${result.savings}만원`;
                // 저축액에 따른 색상
                savingsAmount.style.color = result.savings >= 0 ? '#4CAF50' : '#f44336';
            }
            if (savingsRate) {
                savingsRate.textContent = `${result.savings_rate}%`;
                savingsRate.style.color = result.savings_rate >= 0 ? '#4CAF50' : '#f44336';
            }
        }
        
        // 지출 분석 차트 업데이트
        updateSpendingChart(result);
        
        // 맞춤 조언 생성
        generateAdvice(result);
        
        // 개선 방안 생성
        generateRecommendations(result);
        
        console.log('Results displayed successfully');
    }
    
    // 점수 애니메이션 함수
    function animateScore(start, end, element) {
        const duration = 2000; // 2초
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * easeOutCubic(progress);
            element.textContent = Math.round(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // 이징 함수
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // 지출 분석 차트 업데이트
    function updateSpendingChart(result) {
        const canvas = document.getElementById('pieChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;
        
        // 현재 입력된 카테고리 데이터 사용
        const categories = ['housing', 'food', 'transport', 'entertainment', 'education', 'medical', 'other'];
        const categoryData = {};
        let total = 0;
        
        categories.forEach(category => {
            const input = document.getElementById(`${category}-amount`);
            const value = input ? parseFloat(input.value) || 0 : 0;
            categoryData[category] = value;
            total += value;
        });
        
        if (total > 0) {
            drawSpendingPieChart(ctx, centerX, centerY, radius, categoryData, total);
            updateChartLegend(categoryData, total);
        }
    }
    
    // 지출 파이 차트 그리기
    function drawSpendingPieChart(ctx, centerX, centerY, radius, data, total) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        const colors = {
            housing: '#FF6B6B',
            food: '#4ECDC4', 
            transport: '#45B7D1',
            entertainment: '#96CEB4',
            education: '#FFEAA7',
            medical: '#DDA0DD',
            other: '#98D8C8'
        };
        
        const labels = {
            housing: '주거',
            food: '식료품음료',
            transport: '교통',
            entertainment: '오락문화',
            education: '교육육아',
            medical: '보건의료',
            other: '기타소비'
        };
        
        let currentAngle = -Math.PI / 2; // 12시 방향부터 시작
        
        Object.keys(data).forEach(category => {
            if (data[category] > 0) {
                const sliceAngle = (data[category] / total) * 2 * Math.PI;
                
                // 파이 슬라이스 그리기
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                ctx.fillStyle = colors[category] || '#ccc';
                ctx.fill();
                
                // 테두리
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                currentAngle += sliceAngle;
            }
        });
    }
    
    // 차트 범례 업데이트
    function updateChartLegend(data, total) {
        const legendElement = document.getElementById('chartLegend');
        if (!legendElement) return;
        
        const labels = {
            housing: '주거',
            food: '식료품음료',
            transport: '교통',
            entertainment: '오락문화',
            education: '교육육아',
            medical: '보건의료',
            other: '기타소비'
        };
        
        const colors = {
            housing: '#FF6B6B',
            food: '#4ECDC4', 
            transport: '#45B7D1',
            entertainment: '#96CEB4',
            education: '#FFEAA7',
            medical: '#DDA0DD',
            other: '#98D8C8'
        };
        
        let legendHTML = '';
        Object.keys(data).forEach(category => {
            if (data[category] > 0) {
                const percentage = ((data[category] / total) * 100).toFixed(1);
                legendHTML += `
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: ${colors[category]}"></div>
                        <span class="legend-label">${labels[category]}</span>
                        <span class="legend-value">${percentage}%</span>
                    </div>
                `;
            }
        });
        
        legendElement.innerHTML = legendHTML;
    }
    
    // 맞춤 조언 생성
    function generateAdvice(result) {
        const analysisContent = document.getElementById('analysisContent');
        if (!analysisContent) return;
        
        const advice = getAdviceByScore(result.score, result.savings_rate, result.persona);
        
        analysisContent.innerHTML = `
            <div class="advice-section">
                <h4>💡 재무 상태 분석</h4>
                <p>${advice.analysis}</p>
            </div>
            <div class="advice-section">
                <h4>📈 개선 포인트</h4>
                <ul>
                    ${advice.improvements.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="advice-section">
                <h4>🎯 추천 행동</h4>
                <ul>
                    ${advice.actions.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // 점수별 조언 생성
    function getAdviceByScore(score, savingsRate, persona) {
        if (score >= 80) {
            return {
                analysis: `${persona.name} 타입으로 매우 우수한 재무 관리를 하고 계십니다. 현재 저축률 ${savingsRate}%로 안정적인 재무 상태를 유지하고 있습니다.`,
                improvements: [
                    '장기 투자 포트폴리오 다양화 검토',
                    '세금 최적화 전략 수립',
                    '부동산 투자 기회 탐색'
                ],
                actions: [
                    '월 투자금액을 소득의 10-15%로 늘려보세요',
                    '비상자금을 6개월 이상 유지하세요',
                    '재테크 교육에 투자하여 전문성을 높이세요'
                ]
            };
        } else if (score >= 60) {
            return {
                analysis: `${persona.name} 타입으로 양호한 재무 관리를 하고 계십니다. 저축률 ${savingsRate}%로 개선의 여지가 있습니다.`,
                improvements: [
                    '불필요한 지출 항목 식별 및 절약',
                    '저축률을 20% 이상으로 높이기',
                    '투자 상품 학습 및 포트폴리오 구성'
                ],
                actions: [
                    '가계부를 작성하여 지출 패턴을 분석하세요',
                    '고정비를 5-10% 줄여보세요',
                    '적금이나 펀드 투자를 시작하세요'
                ]
            };
        } else if (score >= 40) {
            return {
                analysis: `${persona.name} 타입으로 재무 관리에 주의가 필요합니다. 저축률 ${savingsRate}%로 개선이 시급합니다.`,
                improvements: [
                    '지출 구조 전면 재검토',
                    '비필수 지출 대폭 감소',
                    '수입 증대 방안 모색'
                ],
                actions: [
                    '모든 지출을 기록하고 분석하세요',
                    '외식, 쇼핑 등 변동비를 30% 줄이세요',
                    '부업이나 투잡을 고려해보세요'
                ]
            };
        } else {
            return {
                analysis: `${persona.name} 타입으로 재무 상황이 위험합니다. 저축률 ${savingsRate}%로 즉시 개선이 필요합니다.`,
                improvements: [
                    '긴급 가계 구조조정',
                    '부채 상환 계획 수립',
                    '전문가 상담 필요'
                ],
                actions: [
                    '모든 불필요한 지출을 즉시 중단하세요',
                    '부채 정리 계획을 세우세요',
                    '재무 상담사와 상담받으세요'
                ]
            };
        }
    }
    
    // 개선 방안 생성
    function generateRecommendations(result) {
        const recommendationsGrid = document.getElementById('recommendationsGrid');
        if (!recommendationsGrid) return;
        
        const recommendations = getRecommendationsByScore(result.score, result.savings_rate);
        
        let html = '';
        recommendations.forEach((rec, index) => {
            html += `
                <div class="recommendation-item priority-${rec.priority}">
                    <div class="rec-icon">${rec.icon}</div>
                    <div class="rec-content">
                        <h4>${rec.title}</h4>
                        <p>${rec.description}</p>
                        <div class="rec-impact">예상 효과: ${rec.impact}</div>
                    </div>
                </div>
            `;
        });
        
        recommendationsGrid.innerHTML = html;
    }
    
    // 점수별 개선 방안
    function getRecommendationsByScore(score, savingsRate) {
        const baseRecommendations = [
            {
                icon: '💰',
                title: '저축률 개선',
                description: '월 소득의 20% 이상 저축을 목표로 하세요',
                impact: '연간 재무 안정성 30% 향상',
                priority: 'high'
            },
            {
                icon: '📊',
                title: '가계부 작성',
                description: '모든 수입과 지출을 기록하여 패턴을 파악하세요',
                impact: '지출 효율성 25% 개선',
                priority: 'high'
            },
            {
                icon: '🎯',
                title: '목표 설정',
                description: '단기, 중기, 장기 재무 목표를 구체적으로 설정하세요',
                impact: '목표 달성률 40% 향상',
                priority: 'medium'
            }
        ];
        
        if (score < 40) {
            baseRecommendations.unshift({
                icon: '🚨',
                title: '긴급 개선',
                description: '즉시 지출을 줄이고 수입을 늘리는 방안을 찾으세요',
                impact: '재무 위험도 50% 감소',
                priority: 'urgent'
            });
        }
        
        if (savingsRate < 0) {
            baseRecommendations.unshift({
                icon: '⚠️',
                title: '적자 해결',
                description: '적자 상태를 즉시 해결하기 위한 계획을 수립하세요',
                impact: '재무 안정성 즉시 개선',
                priority: 'urgent'
            });
        }
        
        return baseRecommendations.slice(0, 4); // 최대 4개 표시
    }

    // 점수 원형 차트 그리기
    function drawScoreChart(score) {
        const canvas = document.getElementById('scoreChart');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 배경 원
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 12;
        ctx.stroke();
        
        // 점수 원호
        const angle = (score / 100) * 2 * Math.PI - Math.PI / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle);
        
        // 점수에 따른 색상
        let color = '#e53e3e'; // 빨강 (0-40)
        if (score >= 40 && score < 60) color = '#dd6b20'; // 주황 (40-60)
        else if (score >= 60 && score < 80) color = '#38a169'; // 초록 (60-80)
        else if (score >= 80) color = '#3182ce'; // 파랑 (80-100)
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    // 맞춤 조언 생성
    function getRecommendations(score, riskLevel) {
        if (score >= 80) {
            return [
                '현재 우수한 재무 상태를 유지하고 계십니다',
                '장기 투자 포트폴리오 다양화를 고려해보세요',
                '비상 자금을 소득의 6개월분 이상 유지하세요'
            ];
        } else if (score >= 60) {
            return [
                '안정적인 재무 관리를 하고 계십니다',
                '불필요한 지출을 줄여 저축률을 높여보세요',
                '투자 상품에 대한 학습을 시작해보세요'
            ];
        } else if (score >= 40) {
            return [
                '재무 관리에 더 신경 쓸 필요가 있습니다',
                '가계부 작성으로 지출 패턴을 파악하세요',
                '고정비 절약 방안을 찾아보세요'
            ];
        } else {
            return [
                '재무 상황 개선이 시급합니다',
                '부채 상환 계획을 수립하세요',
                '전문가 상담을 받아보시기 바랍니다'
            ];
        }
    }

    // 입력 검증 함수
    function validateRatios() {
        const ratioInputs = [
            'education', 'transport', 'other', 'medical', 
            'food', 'entertainment', 'housing'
        ];
        
        let sum = 0;
        ratioInputs.forEach(id => {
            const value = parseFloat(document.getElementById(id).value) || 0;
            sum += value;
        });
        
        if (Math.abs(sum - 1.0) > 0.1) {
            alert('지출 카테고리별 비율의 합이 1.0에 가까워야 합니다. 현재 합계: ' + sum.toFixed(3));
            return false;
        }
        
        return true;
    }

    // 파이 차트 관련 변수
    let pieChart;
    let pieData = {
        education: 0.102,
        transport: 0.185,
        other: 0.158,
        medical: 0.138,
        food: 0.159,
        entertainment: 0.093,
        housing: 0.164
    };
    
    let categoryAmounts = {
        education: 20,
        transport: 37,
        other: 32,
        medical: 28,
        food: 32,
        entertainment: 19,
        housing: 33
    };

    const pieColors = {
        education: '#FF6B6B',
        transport: '#4ECDC4',
        other: '#45B7D1',
        medical: '#96CEB4',
        food: '#FFEAA7',
        entertainment: '#DDA0DD',
        housing: '#98D8C8'
    };

    const pieLabels = {
        education: '교육육아',
        transport: '교통',
        other: '기타소비',
        medical: '보건의료',
        food: '식료품음료',
        entertainment: '오락문화',
        housing: '주거'
    };

    // 파이 차트 초기화
    function initPieChart() {
        const canvas = document.getElementById('pieChart');
        const ctx = canvas.getContext('2d');
        
        drawPieChart(ctx, canvas.width / 2, canvas.height / 2, 180);
        updateLegend();
        
        // 마우스 이벤트 리스너
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
    }

    let isDragging = false;
    let dragCategory = null;

    function drawPieChart(ctx, centerX, centerY, radius) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        let currentAngle = -Math.PI / 2; // 12시 방향부터 시작
        
        Object.keys(pieData).forEach(category => {
            const sliceAngle = pieData[category] * 2 * Math.PI;
            
            // 파이 슬라이스 그리기
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = pieColors[category];
            ctx.fill();
            
            // 테두리
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // 카테고리 이름을 원 안에 표시
            if (sliceAngle > 0.3) { // 충분히 큰 슬라이스에만 텍스트 표시
                const textAngle = currentAngle + sliceAngle / 2;
                const textRadius = radius * 0.7;
                const textX = centerX + Math.cos(textAngle) * textRadius;
                const textY = centerY + Math.sin(textAngle) * textRadius;
                
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(pieLabels[category], textX, textY);
            }
            
            currentAngle += sliceAngle;
        });
    }

    function getAngleFromMouse(mouseX, mouseY, centerX, centerY) {
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        let angle = Math.atan2(dy, dx) + Math.PI / 2; // 12시 방향을 0으로 조정
        if (angle < 0) angle += 2 * Math.PI;
        return angle;
    }

    function getCategoryFromAngle(angle) {
        let currentAngle = 0;
        for (const category of Object.keys(pieData)) {
            const sliceAngle = pieData[category] * 2 * Math.PI;
            if (angle >= currentAngle && angle < currentAngle + sliceAngle) {
                return category;
            }
            currentAngle += sliceAngle;
        }
        return null;
    }

    function handleMouseDown(e) {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
        if (distance <= 180) {
            const angle = getAngleFromMouse(mouseX, mouseY, centerX, centerY);
            dragCategory = getCategoryFromAngle(angle);
            if (dragCategory) {
                isDragging = true;
                canvas.style.cursor = 'grabbing';
            }
        }
    }

    function handleMouseMove(e) {
        if (!isDragging || !dragCategory) return;
        
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        const angle = getAngleFromMouse(mouseX, mouseY, centerX, centerY);
        const normalizedAngle = angle / (2 * Math.PI);
        
        // 드래그한 카테고리의 비율 조정
        const minValue = 0.01; // 최소 1%
        const maxValue = 0.8;  // 최대 80%
        
        let newValue = Math.max(minValue, Math.min(maxValue, normalizedAngle));
        
        // 다른 카테고리들의 비율을 비례적으로 조정
        const oldValue = pieData[dragCategory];
        const remainingOld = 1 - oldValue;
        const remainingNew = 1 - newValue;
        
        if (remainingOld > 0) {
            const scaleFactor = remainingNew / remainingOld;
            Object.keys(pieData).forEach(category => {
                if (category !== dragCategory) {
                    pieData[category] *= scaleFactor;
                }
            });
        }
        
        pieData[dragCategory] = newValue;
        
        // 정규화 (합이 1이 되도록)
        const sum = Object.values(pieData).reduce((a, b) => a + b, 0);
        Object.keys(pieData).forEach(category => {
            pieData[category] /= sum;
        });
        
        // 차트와 범례 업데이트
        const ctx = canvas.getContext('2d');
        drawPieChart(ctx, centerX, centerY, 180);
        updateLegend();
        updateHiddenInputs();
    }

    function handleMouseUp(e) {
        isDragging = false;
        dragCategory = null;
        e.target.style.cursor = 'pointer';
    }

    function updateLegend() {
        Object.keys(pieData).forEach(category => {
            const percentElement = document.getElementById(`${category}-percent`);
            if (percentElement) {
                percentElement.textContent = `${(pieData[category] * 100).toFixed(1)}%`;
            }
        });
    }

    function updateHiddenInputs() {
        Object.keys(pieData).forEach(category => {
            const input = document.getElementById(category);
            if (input) {
                input.value = pieData[category].toFixed(3);
            }
        });
    }

    // 카테고리 금액 입력 이벤트 리스너
    function setupCategoryInputs() {
        Object.keys(categoryAmounts).forEach(category => {
            const input = document.getElementById(`${category}-amount`);
            if (input) {
                input.addEventListener('input', function() {
                    const amount = parseFloat(this.value) || 0;
                    categoryAmounts[category] = amount;
                    updatePieFromAmounts();
                });
                // 초기값 설정
                input.value = categoryAmounts[category];
            }
        });
    }
    
    function updatePieFromAmounts() {
        const total = Object.values(categoryAmounts).reduce((sum, amount) => sum + amount, 0);
        
        // 총 지출액 업데이트 (항상)
        document.getElementById('total_spending').value = total;
        
        if (total > 0) {
            Object.keys(categoryAmounts).forEach(category => {
                pieData[category] = categoryAmounts[category] / total;
            });
            
            const canvas = document.getElementById('pieChart');
            const ctx = canvas.getContext('2d');
            drawPieChart(ctx, canvas.width / 2, canvas.height / 2, 200);
            updateLegend();
            updateHiddenInputs();
        } else {
            // 총액이 0이면 모든 비율을 0으로 설정
            Object.keys(categoryAmounts).forEach(category => {
                pieData[category] = 0;
            });
            updateLegend();
            updateHiddenInputs();
        }
    }
    
    // 예시 데이터 자동 입력 함수
    function fillExampleData() {
        document.getElementById('total_spending').value = '200';
        document.getElementById('mean_spending').value = '1.5';
        document.getElementById('n_transactions').value = '130';
        document.getElementById('income').value = '300';
        
        // 카테고리 금액 입력칸에도 예시 데이터 설정
        Object.keys(categoryAmounts).forEach(category => {
            const input = document.getElementById(`${category}-amount`);
            if (input) {
                input.value = categoryAmounts[category];
            }
        });
    }

    // 파이 차트 초기화
    initPieChart();
    
    // 카테고리 입력 설정
    setupCategoryInputs();

    // 예시 데이터 버튼 추가 (안전하게 처리)
    const submitBtn = document.querySelector('.analyze-btn');
    if (submitBtn && submitBtn.parentNode) {
        const exampleBtn = document.createElement('button');
        exampleBtn.type = 'button';
        exampleBtn.textContent = '✨ 예시 데이터로 체험해보기';
        exampleBtn.className = 'analyze-btn';
        exampleBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        exampleBtn.style.marginBottom = '10px';
        exampleBtn.onclick = fillExampleData;
        
        submitBtn.parentNode.insertBefore(exampleBtn, submitBtn);
    }
});
