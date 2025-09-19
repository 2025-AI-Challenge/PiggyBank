"""
Data loading and preprocessing module for financial health prediction
"""
import os
import glob
import numpy as np
import pandas as pd
from utils import read_csv_safely, clean_text, std_whitespace, pct_to_ratio

def normalize_kosis_table(df0, src_path=None):
    """
    Normalize KOSIS table format to standard structure
    
    Args:
        df0 (DataFrame): Raw KOSIS data
        src_path (str): Source file path for metadata
        
    Returns:
        DataFrame: Normalized KOSIS table
    """
    # 원본 보호
    df = df0.copy()
    
    # 텍스트 정리
    for col in df.columns:
        if df[col].dtype == 'object':
            df[col] = df[col].map(clean_text)
    
    # 차원 추출 (파일명 기반)
    dim = "기타"
    if src_path:
        fname = os.path.basename(src_path).lower()
        if "연령" in fname:
            dim = "연령"
        elif "소득" in fname:
            dim = "소득"
        elif "자산" in fname:
            dim = "자산"
        elif "종사" in fname:
            dim = "종사상지위"
    
    # 컬럼명 표준화
    rename_map_candidates = {
        "자산(전년도) (만원)": "자산_만원",
        "자산총액(전년도) (만원)": "자산_만원",
        "금융자산(전년도) (만원)": "금융자산_만원",
        "부채(전년도) (만원)": "부채_만원",
        "금융부채(전년도) (만원)": "금융부채_만원",
        "처분가능소득(전년도) (만원)": "처분가능소득_만원",
        "원리금상환액(전년도) (만원)": "원리금상환액_만원",
        "부채/자산 (%)": "부채_자산_퍼센트",
        "부채/자산총액 (%)": "부채_자산_퍼센트",
        "부채/금융자산 (%)": "부채_금융자산_퍼센트",
        "금융부채/금융자산 (%)": "금융부채_금융자산_퍼센트",
    }
    # 실제 존재하는 컬럼만 매핑
    rename_map = {k: v for k, v in rename_map_candidates.items() if k in df.columns}
    df = df.rename(columns=rename_map)
    
    # 표준 컬럼 집합
    value_cols = [
        "자산_만원", "금융자산_만원", "부채_만원", "금융부채_만원",
        "처분가능소득_만원", "원리금상환액_만원",
        "부채_자산_퍼센트", "부채_금융자산_퍼센트", "금융부채_금융자산_퍼센트"
    ]
    keep_cols = [df.columns[0], df.columns[1]] + [c for c in value_cols if c in df.columns]
    df = df[keep_cols].copy()
    
    # 표준 축 이름으로 변경
    df = df.rename(columns={
        df.columns[0]: "부채보유여부",
        df.columns[1]: "세부기준"
    })
    
    # 헤더 잔재 제거
    df["부채보유여부"] = df["부채보유여부"].map(std_whitespace)
    df = df[df["부채보유여부"] != "부채보유 여부별"]
    
    # 숫자형 변환
    for c in value_cols:
        if c in df.columns:
            ser = df[c].astype(str)
            ser = ser.str.replace(",", "", regex=False)
            ser = ser.str.replace(" ", "", regex=False)
            ser = ser.str.replace("\u00a0", "", regex=False)
            ser = ser.str.replace("−", "-", regex=False)
            df[c] = pd.to_numeric(ser, errors="coerce")
    
    # 차원/출처(선택) 추가
    df["차원"] = dim
    if src_path is not None:
        df["파일명"] = os.path.basename(src_path)
    
    # 최종 정렬
    ordered = ["차원", "부채보유여부", "세부기준"] + [c for c in value_cols if c in df.columns]
    if "파일명" in df.columns:
        ordered += ["파일명"]
    df = df[ordered].dropna(how="all")
    
    # 빈 DF 방지: 열만 있고 실데이터 없는 경우 제거
    if df.drop(columns=[c for c in ["파일명"] if c in df.columns]).dropna(how="all").shape[0] == 0:
        return pd.DataFrame()
    
    return df.reset_index(drop=True)

def load_kosis_data(search_dirs):
    """
    Load and integrate KOSIS CSV files from specified directories
    
    Args:
        search_dirs (list): List of directories to search for CSV files
        
    Returns:
        DataFrame: Integrated KOSIS data
    """
    found_files = []
    for d in search_dirs:
        if os.path.isdir(d):
            found_files += glob.glob(os.path.join(d, "*.csv"))
            found_files += glob.glob(os.path.join(d, "**/*.csv"), recursive=True)
    
    found_files = sorted(set(found_files))
    print("발견 CSV 수:", len(found_files))
    
    parts = []
    for p in found_files:
        try:
            raw, enc = read_csv_safely(p)
            out = normalize_kosis_table(raw, src_path=p)
            if out.shape[0] > 0:
                parts.append(out)
                print(f"[OK] {os.path.basename(p)} → rows={out.shape[0]} enc={enc}")
            else:
                print(f"[SKIP:empty] {os.path.basename(p)} enc={enc}")
        except Exception as e:
            print(f"[FAIL] {os.path.basename(p)} :: {e}")
    # Save cleaned data
    output_path = "./data/kosis_cleaned.csv"
    df = pd.concat(parts, ignore_index=True)
    df.to_csv(output_path, index=False)
    print(f"KOSIS 데이터 정제 완료: {output_path}")
    
    return df

def add_derived_indicators(df):
    """
    Add derived financial indicators to KOSIS data
    
    Args:
        df (DataFrame): KOSIS dataframe
        
    Returns:
        DataFrame: DataFrame with derived indicators
    """
    df = df.copy()
    
    # 상환부담비율 계산
    if "원리금상환액_만원" in df.columns and "처분가능소득_만원" in df.columns:
        denom = df["처분가능소득_만원"].replace({0: np.nan})
        df["상환부담비율"] = (df["원리금상환액_만원"] / denom).clip(lower=0)
    
    # 퍼센트를 비율로 변환
    if "부채_자산_퍼센트" in df.columns:
        df["부채_자산_ratio"] = pct_to_ratio(df["부채_자산_퍼센트"])
    if "부채_금융자산_퍼센트" in df.columns:
        df["부채_금융자산_ratio"] = pct_to_ratio(df["부채_금융자산_퍼센트"])
    if "금융부채_금융자산_퍼센트" in df.columns:
        df["금융부채_금융자산_ratio"] = pct_to_ratio(df["금융부채_금융자산_퍼센트"])
    
    # 누락된 컬럼 기본값 추가
    if "부채_자산_ratio" not in df.columns:
        df["부채_자산_ratio"] = 0.0
    if "부채_금융자산_ratio" not in df.columns:
        df["부채_금융자산_ratio"] = 0.0
    
    # 간단 라벨 생성
    cond_A = df.get("부채_자산_ratio", pd.Series(np.nan, index=df.index)) <= 0.25
    cond_B = df.get("부채_금융자산_ratio", pd.Series(np.nan, index=df.index)) <= 1.10
    cond_C = df.get("상환부담비율", pd.Series(np.nan, index=df.index)) <= 0.25
    df["재무건전_라벨"] = np.where(cond_A & cond_B & cond_C, 1, 0)
    
    return df

def load_synthetic_data(file_path):
    """
    Load synthetic financial data
    
    Args:
        file_path (str): Path to synthetic data CSV file
        
    Returns:
        DataFrame: Processed synthetic data (만원 단위)
    """
    try:
        df = pd.read_csv(file_path)
        print(f"합성 데이터 로드 완료: {df.shape}")
        
        # Convert spending to 만원 units (월 기준)
        if df['total_spending'].max() > 10000:  # 원 단위인 경우
            df['total_spending'] = df['total_spending'] / 10000
            df['mean_spending'] = df['mean_spending'] / 10000
            print("지출 데이터를 만원 단위로 변환했습니다.")
        
        # 소득도 만원 단위로 확인
        if 'est_income_만원' in df.columns:
            if df['est_income_만원'].max() < 100:  # 이미 만원 단위인 경우
                pass
            else:  # 원 단위인 경우
                df['est_income_만원'] = df['est_income_만원'] / 10000
                print("소득 데이터를 만원 단위로 변환했습니다.")
        
        return df
        
    except Exception as e:
        print(f"합성 데이터 로드 실패: {e}")
        return pd.DataFrame()

def preprocess_synthetic_data(df):
    """
    Preprocess synthetic financial data for modeling
    
    Args:
        df (DataFrame): Raw synthetic data
        
    Returns:
        DataFrame: Preprocessed synthetic data
    """
    df = df.copy()
    
    # Define ratio columns for spending categories
    ratio_cols = ["식료품음료", "주거", "교통", "오락문화", "교육육아", "보건의료", "기타소비"]
    
    # Normalize ratios
    df[ratio_cols] = df[ratio_cols].clip(lower=0).fillna(0)
    sum_ratio = df[ratio_cols].sum(axis=1)
    df.loc[sum_ratio == 0, "기타소비"] = 1.0
    df[ratio_cols] = df[ratio_cols].div(df[ratio_cols].sum(axis=1), axis=0)
    
    return df
