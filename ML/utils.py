"""
Utility functions for financial health prediction model
"""
import warnings
import os
import re
import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")

# Constants
RANDOM_SEED = 42
np.random.seed(RANDOM_SEED)

def read_csv_safely(path):
    """
    Read CSV file with encoding detection (EUC-KR first, then UTF-8)
    
    Args:
        path (str): Path to CSV file
        
    Returns:
        tuple: (DataFrame, encoding_used)
    """
    enc_tried = []
    for enc in ["euc-kr", "utf-8"]:
        try:
            df = pd.read_csv(path, encoding=enc)
            return df, enc
        except Exception as e:
            enc_tried.append(f"{enc}:{e}")
            continue
    raise ValueError(f"인코딩 실패: {path} (tried {enc_tried})")

def clean_text(s):
    """
    Clean text by removing special characters and normalizing spaces
    
    Args:
        s: Input string or value
        
    Returns:
        str: Cleaned string
    """
    if pd.isna(s): 
        return s
    s = str(s)
    return (s.replace("\u00a0", "")  # NBSP
            .replace("−", "-")      # 음수기호 통일
            .strip())

def std_whitespace(s):
    """
    Standardize whitespace in string
    
    Args:
        s: Input string or value
        
    Returns:
        str: String with normalized whitespace
    """
    if pd.isna(s): 
        return s
    return re.sub(r"\s+", " ", str(s)).strip()

def pct_to_ratio(s):
    """
    Convert percentage to ratio (divide by 100)
    
    Args:
        s: Percentage values
        
    Returns:
        Series: Ratio values
    """
    return pd.to_numeric(s, errors="coerce") / 100.0

def safe_fill(x, fill=0.0):
    """
    Safely fill NaN values
    
    Args:
        x: Input series
        fill: Fill value (default 0.0)
        
    Returns:
        Series: Series with NaN values filled
    """
    return x.fillna(fill)

def normalize_ratios(df, ratio_cols):
    """
    Normalize ratio columns to sum to 1
    
    Args:
        df (DataFrame): Input dataframe
        ratio_cols (list): List of ratio column names
        
    Returns:
        DataFrame: DataFrame with normalized ratios
    """
    df = df.copy()
    df[ratio_cols] = df[ratio_cols].clip(lower=0).fillna(0)
    s = df[ratio_cols].sum(axis=1)
    df.loc[s == 0, ratio_cols[0]] = 1.0  # Set first column to 1 if all are 0
    df[ratio_cols] = df[ratio_cols].div(df[ratio_cols].sum(axis=1), axis=0)
    return df

def show_importance(model, names, topn=10):
    """
    Display feature importance from trained model
    
    Args:
        model: Trained model with feature_importances_ attribute
        names: Feature names
        topn (int): Number of top features to show
    """
    try:
        imp = pd.Series(model.feature_importances_, index=names).sort_values(ascending=False)
        print(f"\nTop {topn} feature importances:")
        print(imp.head(topn))
    except Exception as e:
        print(f"Could not display feature importance: {e}")
