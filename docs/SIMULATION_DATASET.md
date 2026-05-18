# Simulation Dataset Strategy

## 데이터셋 단계

### Phase 1 — Mock Operational Dataset (현재)
- Simulation Runtime이 생성하는 완전 시뮬레이션 데이터
- 채널 계수, 피로도, CTA 반응, 승인 지연 패턴
- 용도: 운영 전략 실험, cadence 실험, CTA 비교

### Phase 2 — Semi-Real Dataset
- 실제 운영 + 시뮬레이션 혼합
- 실제 engagement 데이터 + 시뮬레이션 피로도 모델
- 용도: 모델 보정, 채널 계수 조정

### Phase 3 — Real Operational Dataset
- 완전한 실제 운영 데이터
- 실제 CTA 전환, 리드, 채널 성과
- 용도: 운영 최적화, 권장 정확도 향상

## 채널 계수 현황

| 채널 | engagementBase | ctaSensitivity | fatigueFactor | 특성 |
|------|---------------|---------------|--------------|------|
| LinkedIn | 4.2 | 0.7 (높음) | 0.12 | 전문성 중심, CTA 민감 |
| Facebook | 5.5 | 0.4 | 0.18 (높음) | 높은 반응, 빠른 피로 |
| Naver Blog | 3.0 | 0.3 | 0.05 (낮음) | SEO 지속성, 느린 피로 |
| Instagram | 6.0 | 0.3 | 0.22 (매우 높음) | 시각 영향 최대 |

## DB 테이블

| 테이블 | 용도 |
|--------|------|
| simulation_runs | 시뮬레이션 실행 기록 |
| simulation_events | 일별 이벤트 로그 |
| simulation_metrics | 집계 메트릭 |

## 활용

1. 캔페인 시작 전 cadence 실험
2. CTA 전략 비교 (Soft vs Hard)
3. 채널 군형 실험
4. 피로도 예측
5. Strategy Memory에 시뮬레이션 결과 저장
