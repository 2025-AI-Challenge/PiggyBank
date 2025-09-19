"""
Main pipeline for financial health prediction model
"""
import os
import pandas as pd
from data_load import load_kosis_data, add_derived_indicators, load_synthetic_data, preprocess_synthetic_data
from scoring import calculate_kosis_scores, add_financial_scores, get_persona_from_score, add_realistic_scores
from train import FinancialHealthModel
from evaluation import comprehensive_evaluation, plot_importance, plot_score_distribution
from utils import RANDOM_SEED

def main():
    """
    Main pipeline execution
    """
    print("=== 금융 건전성 예측 모델 파이프라인 ===\n")
    
    # 1. KOSIS 데이터 로드 및 전처리
    print("1. KOSIS 데이터 로드 중...")
    search_dirs = ["./data", "./data/가계재무데이터_v0"]
    kosis_df = load_kosis_data(search_dirs)
    
    if not kosis_df.empty:
        print(f"KOSIS 데이터 로드 완료: {kosis_df.shape}")
        kosis_df = add_derived_indicators(kosis_df)
        kosis_df = calculate_kosis_scores(kosis_df)
        
        # KOSIS 데이터 저장
        kosis_output_path = "./kosis_cleaned.csv"
        kosis_df.to_csv(kosis_output_path, index=False, encoding="euc-kr")
        print(f"KOSIS 데이터 저장: {kosis_output_path}")
    else:
        print("KOSIS 데이터를 찾을 수 없습니다.")
    
    # 2. 합성 데이터 로드 및 전처리
    print("\n2. 합성 데이터 로드 중...")
    synth_data_path = "./data/synth_finance_scored_realistic.csv"
    
    if os.path.exists(synth_data_path):
        synth_df = load_synthetic_data(synth_data_path)
        if not synth_df.empty:
            print(f"합성 데이터 로드 완료: {synth_df.shape}")
            synth_df = preprocess_synthetic_data(synth_df)
            synth_df = add_financial_scores(synth_df)
            
            # 페르소나 분포 출력
            persona_counts = synth_df['페르소나_레벨'].value_counts().sort_index()
            print(f"페르소나 레벨 분포: {dict(persona_counts)}")
            print("페르소나 정보:")
            for level in sorted(persona_counts.index):
                sample_row = synth_df[synth_df['페르소나_레벨'] == level].iloc[0]
                persona_info = get_persona_from_score(sample_row['재무건전_점수'])
                try:
                    print(f"  레벨 {level}: {persona_info['name']} {persona_info['emoji']} - {persona_info['description']}")
                except UnicodeEncodeError:
                    print(f"  레벨 {level}: {persona_info['name']} - {persona_info['description']}")

            print(synth_df[["total_spending", "n_transactions", "재무건전_점수", "페르소나_레벨", "페르소나_이름"]].head())
        else:
            print("합성 데이터 로드 실패")
            return
    else:
        print(f"합성 데이터 파일을 찾을 수 없습니다: {synth_data_path}")
        return
    
    # 3. 모델 훈련
    print("\n3. 모델 훈련 중...")
    from train import train_financial_model
    model, results = train_financial_model(synth_df, use_lightgbm=True, test_size=0.2)
    
    # 4. 모델 평가
    print("\n4. 모델 평가 중...")
    eval_results = comprehensive_evaluation(model, results['test_data'], plot_results=False)
    
    # 4.1. 모델 저장
    print("\n4.1. 모델 저장 중...")
    import pickle
    model_path = "./model/piggy_model.pkl"
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"모델 저장 완료: {model_path}")
    
    # 5. 결과 저장
    print("\n5. 결과 저장 중...")
    output_path = "./data/synth_finance_scored_final.csv"
    synth_df.to_csv(output_path, index=False)
    print(f"결과 저장 완료: {output_path}")
    
    # 6. 현실형 점수 저장
    print("\n6. 현실형 점수 저장 중...")
    realistic_output_path = "./data/synth_finance_realistic_scored.csv"
    synth_df.to_csv(realistic_output_path, index=False)
    print(f"현실형 점수 저장 완료: {realistic_output_path}")
    
    # 7. 현실형 점수 계산 (KOSIS 참조가 있는 경우)
    if not kosis_df.empty:
        print("\n7. 현실형 점수 계산 중...")
        # 소득분위 참조 테이블 생성
        ref_tbl = kosis_df[kosis_df["차원"] == "소득"].copy()
        if not ref_tbl.empty:
            # 소득분위 추정을 위한 더미 데이터 생성
            ref_tbl["소득분위"] = range(1, len(ref_tbl) + 1)
            
            # 합성 데이터에 현실형 점수 추가
            synth_df["est_income_만원"] = synth_df["total_spending"] * 1.5  # 추정 소득
            synth_df["DSR_ref"] = np.random.uniform(0.1, 0.5, len(synth_df))  # 더미 DSR
            synth_df["DebtAsset_ref"] = np.random.uniform(0.1, 0.8, len(synth_df))  # 더미 부채비율
            
            synth_df = add_realistic_scores(synth_df, ref_tbl)
            
            realistic_output_path = "./synth_finance_realistic_scored.csv"
            synth_df.to_csv(realistic_output_path, index=False)
            print(f"현실형 점수 결과 저장: {realistic_output_path}")
    
    print("\n=== 파이프라인 완료 ===")
    print(f"최종 데이터 크기: {synth_df.shape}")
    print(f"회귀 성능 - RMSE: {eval_results['regression_metrics']['rmse']:.3f}, R²: {eval_results['regression_metrics']['r2']:.3f}")
    print(f"분류 성능 - 정확도: {eval_results['classification_metrics']['accuracy']:.3f}")

def predict_new_data(model_path, new_data_path, output_path):
    """
    새로운 데이터에 대한 예측 수행
    
    Args:
        model_path (str): 저장된 모델 경로
        new_data_path (str): 새로운 데이터 경로
        output_path (str): 예측 결과 저장 경로
    """
    # 이 함수는 모델 저장/로드 기능이 구현된 후 사용 가능
    pass

if __name__ == "__main__":
    # numpy import 추가
    import numpy as np
    main()
