"""
Model evaluation and visualization module
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, auc
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.metrics import accuracy_score, roc_auc_score, confusion_matrix

def evaluate_regression_model(y_true, y_pred):
    """
    Evaluate regression model performance
    
    Args:
        y_true: True values
        y_pred: Predicted values
        
    Returns:
        dict: Regression metrics
    """
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    mae = mean_absolute_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)
    
    return {
        'rmse': rmse,
        'mae': mae,
        'r2': r2
    }

def evaluate_classification_model(y_true, y_pred, y_proba=None):
    """
    Evaluate classification model performance (supports multi-class)
    
    Args:
        y_true: True labels
        y_pred: Predicted labels
        y_proba: Predicted probabilities (optional)
        
    Returns:
        dict: Classification metrics
    """
    from sklearn.metrics import classification_report
    
    acc = accuracy_score(y_true, y_pred)
    cm = confusion_matrix(y_true, y_pred)
    
    results = {
        'accuracy': acc,
        'confusion_matrix': cm,
        'classification_report': classification_report(y_true, y_pred, output_dict=True)
    }
    
    if y_proba is not None:
        try:
            # For multi-class classification
            if len(np.unique(y_true)) > 2:
                auc_score = roc_auc_score(y_true, y_proba, multi_class='ovr', average='macro')
            else:
                auc_score = roc_auc_score(y_true, y_proba[:, 1])
            results['auc'] = auc_score
        except Exception:
            results['auc'] = np.nan
    
    return results

def plot_score_distribution(df, score_col='재무건전_점수', label_col='페르소나_레벨', figsize=(12, 8)):
    """
    Plot financial health score and label distributions
    
    Args:
        df (DataFrame): Data with scores and labels
        score_col (str): Score column name
        label_col (str): Label column name
        figsize (tuple): Figure size
    """
    fig, axes = plt.subplots(2, 2, figsize=figsize)
    
    # Score distribution
    axes[0, 0].hist(df[score_col], bins=20, alpha=0.7, color='skyblue', edgecolor='black')
    axes[0, 0].set_title('재무건전 점수 분포')
    axes[0, 0].set_xlabel('점수')
    axes[0, 0].set_ylabel('빈도')
    
    # Label distribution
    label_counts = df[label_col].value_counts().sort_index()
    colors = ['#FF6B6B', '#FFA726', '#FFEB3B', '#66BB6A', '#42A5F5']
    axes[0, 1].bar(label_counts.index, label_counts.values, color=colors[:len(label_counts)], alpha=0.7)
    axes[0, 1].set_title('페르소나 레벨 분포')
    axes[0, 1].set_xlabel('페르소나 레벨 (0=초급, 4=고급)')
    axes[0, 1].set_ylabel('개수')
    
    # Score by label
    for label in df[label_col].unique():
        subset = df[df[label_col] == label]
        axes[1, 0].hist(subset[score_col], alpha=0.6, 
                       label=f'라벨 {label}', bins=15)
    axes[1, 0].set_title('라벨별 점수 분포')
    axes[1, 0].set_xlabel('점수')
    axes[1, 0].set_ylabel('빈도')
    axes[1, 0].legend()
    
    # Box plot
    df.boxplot(column=score_col, by=label_col, ax=axes[1, 1])
    axes[1, 1].set_title('라벨별 점수 박스플롯')
    
    plt.tight_layout()
    plt.show()

def plot_regression_performance(y_true, y_pred, figsize=(10, 6)):
    """
    Plot regression model performance
    
    Args:
        y_true: True values
        y_pred: Predicted values
        figsize (tuple): Figure size
    """
    fig, axes = plt.subplots(1, 2, figsize=figsize)
    
    # Actual vs Predicted scatter plot
    axes[0].scatter(y_true, y_pred, alpha=0.6)
    axes[0].plot([y_true.min(), y_true.max()], [y_true.min(), y_true.max()], 'r--', lw=2)
    axes[0].set_xlabel('실제 값')
    axes[0].set_ylabel('예측 값')
    axes[0].set_title('실제 vs 예측 값')
    
    # Residuals plot
    residuals = y_true - y_pred
    axes[1].scatter(y_pred, residuals, alpha=0.6)
    axes[1].axhline(y=0, color='r', linestyle='--')
    axes[1].set_xlabel('예측 값')
    axes[1].set_ylabel('잔차')
    axes[1].set_title('잔차 플롯')
    
    plt.tight_layout()
    plt.show()

def plot_roc_curve(y_true, y_proba, figsize=(8, 6)):
    """
    Plot ROC curve for classification model
    
    Args:
        y_true: True labels
        y_proba: Predicted probabilities
        figsize (tuple): Figure size
    """
    try:
        fpr, tpr, _ = roc_curve(y_true, y_proba)
        roc_auc = auc(fpr, tpr)
        
        plt.figure(figsize=figsize)
        plt.plot(fpr, tpr, color='darkorange', lw=2, 
                label=f'ROC curve (AUC = {roc_auc:.3f})')
        plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
        plt.xlim([0.0, 1.0])
        plt.ylim([0.0, 1.05])
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('ROC Curve')
        plt.legend(loc="lower right")
        plt.show()
    except Exception as e:
        print(f"ROC plot skipped: {e}")

def plot_importance(model, names, title, topn=10, figsize=(8, 5)):
    """
    Plot feature importance
    
    Args:
        model: Trained model with feature_importances_
        names: Feature names
        title (str): Plot title
        topn (int): Number of top features to show
        figsize (tuple): Figure size
    """
    try:
        imp = pd.Series(model.feature_importances_, index=names).sort_values(ascending=False)
        
        plt.figure(figsize=figsize)
        imp.head(topn).plot(kind='barh')
        plt.title(title)
        plt.xlabel('Feature Importance')
        plt.tight_layout()
        plt.show()
    except Exception as e:
        print(f"Feature importance plot failed: {e}")

def comprehensive_evaluation(model, test_data, plot_results=True):
    """
    Perform comprehensive model evaluation
    
    Args:
        model: Trained FinancialHealthModel
        test_data (dict): Test data dictionary
        plot_results (bool): Whether to generate plots
        
    Returns:
        dict: Comprehensive evaluation results
    """
    X_test = test_data['X_test']
    y_reg_test = test_data['y_reg_test']
    y_cls_test = test_data['y_cls_test']
    
    # Make predictions
    predictions = model.predict(X_test)
    
    # Evaluate regression
    reg_metrics = evaluate_regression_model(y_reg_test, predictions['regression'])
    
    # Evaluate classification
    cls_metrics = evaluate_classification_model(
        y_cls_test, 
        predictions['classification'], 
        predictions['probabilities']
    )
    
    results = {
        'regression_metrics': reg_metrics,
        'classification_metrics': cls_metrics,
        'predictions': predictions
    }
    
    # Print results
    print("=== 회귀 모델 평가 ===")
    print(f"RMSE: {reg_metrics['rmse']:.3f}")
    print(f"MAE: {reg_metrics['mae']:.3f}")
    print(f"R²: {reg_metrics['r2']:.3f}")
    
    print("\n=== 분류 모델 평가 ===")
    print(f"정확도: {cls_metrics['accuracy']:.3f}")
    if 'auc' in cls_metrics:
        auc_str = f"{cls_metrics['auc']:.3f}" if not np.isnan(cls_metrics['auc']) else 'NA'
        print(f"AUC: {auc_str}")
    print(f"혼동행렬:\n{cls_metrics['confusion_matrix']}")
    
    # Generate plots if requested
    if plot_results:
        # Regression performance
        plot_regression_performance(y_reg_test, predictions['regression'])
        
        # ROC curve
        if predictions['probabilities'] is not None:
            plot_roc_curve(y_cls_test, predictions['probabilities'])
        
        # Feature importance
        if hasattr(model.regressor, 'feature_importances_'):
            plot_importance(model.regressor, model.feature_names, 
                          "회귀 모델 Feature Importance")
        
        if hasattr(model.classifier, 'feature_importances_'):
            plot_importance(model.classifier, model.feature_names, 
                          "분류 모델 Feature Importance")
    
    return results
