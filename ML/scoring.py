"""
Scoring and labeling functions for financial health assessment
"""
import numpy as np
import pandas as pd
from utils import safe_fill

def score_row(r):
    """
    Calculate financial health score for a single row based on spending patterns
    
    Args:
        r (Series): Row containing spending data
        
    Returns:
        float: Financial health score (0-100)
    """
    ts = r["total_spending"]  # 만원 가정
    s_scale = 20 if ts <= 3000 else (10 if ts <= 5000 else 0)
    
    essential = r["식료품음료"] + r["주거"] + r["교육육아"] + r["보건의료"]
    luxury = r["오락문화"] + r["기타소비"]
    fixed = r["주거"] + r["교통"]
    health = r["보건의료"]
    
    s_essential = 20 if 0.50 <= essential <= 0.65 else (10 if (0.35 <= essential < 0.50) or (0.65 < essential <= 0.75) else 0)
    s_luxury = 20 if luxury <= 0.25 else (10 if luxury <= 0.40 else 0)
    s_balance = 10 if all(r[c] >= 0.05 for c in ["식료품음료", "주거", "교통", "오락문화", "교육육아", "보건의료", "기타소비"]) else 0
    s_trx = 10 if (200 <= r["n_transactions"] <= 600) else 0
    
    penalty = 0
    if fixed > 0.40: 
        penalty -= 10
    if health < 0.05: 
        penalty -= 5
    
    return max(0, min(100, s_scale + s_essential + s_luxury + s_balance + s_trx + penalty))

def get_persona_from_score(score):
    """
    Convert financial health score to persona level
    
    Args:
        score (float): Financial health score (0-100)
        
    Returns:
        dict: Persona information with level, name, emoji, and description
    """
    personas = {
        0: {"level": 1, "name": "아기달팽이", "emoji": "🐌", "description": "이제 막 출발! 지출 추적부터 차근차근"},
        1: {"level": 2, "name": "새싹두더지", "emoji": "🕳️", "description": "보이지 않는 새는 구멍부터 막자(고정비 점검)"},
        2: {"level": 3, "name": "콩돌고래", "emoji": "🐬", "description": "파도(변동비)에 흔들림, 작은 저축 습관 만들기"},
        3: {"level": 4, "name": "도토리햄스터", "emoji": "🐹", "description": "조금씩 모으는 중, 비상금 1개월 치 도전"},
        4: {"level": 5, "name": "체크펭귄", "emoji": "🐧", "description": "카드·구독 '체크'로 낭비 컷! 기본기 다지기"},
        5: {"level": 6, "name": "균형수달", "emoji": "🦦", "description": "수입·지출 밸런스 안정, 3개월 비상금 완성 가즈아"},
        6: {"level": 7, "name": "플랜여우", "emoji": "🦊", "description": "계획형 소비 + 자동저축, 투자 입문 준비"},
        7: {"level": 8, "name": "달토끼", "emoji": "🚀", "description": "공격·수비 조화, 장기 목표(차·전세) 로드맵 구축"},
        8: {"level": 9, "name": "부엉이", "emoji": "🦉", "description": "데이터로 소비 점검, 포트폴리오 분산/리밸런싱"},
        9: {"level": 10, "name": "고래백만장", "emoji": "🐳", "description": "현금흐름·리스크 완벽 관리, 목표 달성 모드 유지"}
    }
    
    if score < 10:
        return personas[0]
    elif score < 20:
        return personas[1]
    elif score < 30:
        return personas[2]
    elif score < 40:
        return personas[3]
    elif score < 50:
        return personas[4]
    elif score < 60:
        return personas[5]
    elif score < 70:
        return personas[6]
    elif score < 80:
        return personas[7]
    elif score < 90:
        return personas[8]
    else:
        return personas[9]

def get_persona_level_from_score(score):
    """
    Convert financial health score to 5-level classification (0-4)
    
    Args:
        score (float): Financial health score (0-100)
        
    Returns:
        int: Persona level (0-4)
    """
    if score < 20:
        return 0  # 초급 (아기달팽이, 새싹두더지)
    elif score < 40:
        return 1  # 초중급 (콩돌고래, 도토리햄스터)
    elif score < 60:
        return 2  # 중급 (체크펭귄, 균형수달)
    elif score < 80:
        return 3  # 중고급 (플랜여우, 달토끼)
    else:
        return 4  # 고급 (부엉이, 고래백만장)

def add_financial_scores(df):
    """
    Add financial health scores and persona-based labels to dataframe
    
    Args:
        df (DataFrame): Input dataframe with spending data
        
    Returns:
        DataFrame: DataFrame with added scores and persona labels
    """
    df = df.copy()
    
    df["재무건전_점수"] = df.apply(score_row, axis=1)
    df["페르소나_레벨"] = df["재무건전_점수"].apply(get_persona_level_from_score)
    
    # Add detailed persona information
    persona_info = df["재무건전_점수"].apply(get_persona_from_score)
    df["페르소나_이름"] = persona_info.apply(lambda x: x["name"])
    df["페르소나_이모지"] = persona_info.apply(lambda x: x["emoji"])
    df["페르소나_설명"] = persona_info.apply(lambda x: x["description"])
    
    # Keep binary label for compatibility
    df["재무건전_라벨"] = (df["재무건전_점수"] >= 60).astype(int)
    
    return df

def nearest_quintile(y, ref_incomes, ref_quints):
    """
    Find nearest income quintile for given income
    
    Args:
        y (float): Income value
        ref_incomes (array): Reference income values
        ref_quints (array): Reference quintile values
        
    Returns:
        int: Nearest quintile
    """
    idx = int(np.argmin(np.abs(ref_incomes - y)))
    return int(ref_quints[idx])

def realistic_score(r):
    """
    Calculate realistic financial score based on DSR and debt-to-asset ratios
    
    Args:
        r (Series): Row containing financial ratios
        
    Returns:
        float: Realistic financial score
    """
    DSR_warn, DSR_risk = 0.30, 0.40
    DA_warn, DA_risk = 0.50, 0.70
    
    dsr = float(r.get("DSR_ref", np.nan))
    da = float(r.get("DebtAsset_ref", np.nan))
    s_fin = 60.0
    
    if np.isfinite(dsr):
        if dsr >= DSR_risk:
            s_fin -= 30
        elif dsr >= DSR_warn:
            s_fin -= 15
    
    if np.isfinite(da):
        if da >= DA_risk:
            s_fin -= 25
        elif da >= DA_warn:
            s_fin -= 10
    
    # 소득분위 보정
    quint = r.get("est_quintile", 3)
    if quint <= 2:
        s_fin += 5  # 저소득층 완충
    elif quint >= 4:
        s_fin -= 5  # 고소득층 엄격
    
    return max(0, min(100, s_fin))

def realistic_label(r):
    """
    Generate realistic financial health label
    
    Args:
        r (Series): Row containing financial data
        
    Returns:
        int: Financial health label (0=risky, 1=healthy)
    """
    DSR_risk, DA_risk = 0.40, 0.70
    
    if (r["DSR_ref"] >= DSR_risk) or (r["DebtAsset_ref"] >= DA_risk):
        return 0
    return 1 if r["현실형_점수"] >= 60 else 0

def add_realistic_scores(df_real, ref_tbl):
    """
    Add realistic scores and labels based on reference table
    
    Args:
        df_real (DataFrame): Real financial data
        ref_tbl (DataFrame): Reference table for income quintiles
        
    Returns:
        DataFrame: DataFrame with realistic scores and labels
    """
    df_real = df_real.copy()
    
    # Estimate income quintiles
    ref_incomes = ref_tbl["처분가능소득_만원"].values
    ref_quints = ref_tbl["소득분위"].values
    df_real["est_quintile"] = df_real["est_income_만원"].apply(
        lambda y: nearest_quintile(y, ref_incomes, ref_quints)
    )
    
    # Calculate realistic scores
    df_real["현실형_점수"] = df_real.apply(realistic_score, axis=1)
    df_real["현실형_라벨"] = df_real.apply(realistic_label, axis=1)
    
    return df_real

def calculate_kosis_scores(df):
    """
    Calculate KOSIS-based financial health scores
    
    Args:
        df (DataFrame): KOSIS dataframe
        
    Returns:
        DataFrame: DataFrame with calculated scores
    """
    df = df.copy()
    
    # 점수 계산
    debt_asset_penalty = (safe_fill(df["부채_자산_ratio"]) * 400).clip(0, 100)
    repay_penalty = (safe_fill(df["상환부담비율"]) * 300).clip(0, 100)
    debt_fin_over_1 = (safe_fill(df["부채_금융자산_ratio"]) - 1.0).clip(lower=0)
    debt_fin_penalty = (debt_fin_over_1 * 200).clip(0, 100)
    
    df["재무건전_점수"] = (100 - debt_asset_penalty - repay_penalty - debt_fin_penalty).clip(0, 100)
    
    return df
