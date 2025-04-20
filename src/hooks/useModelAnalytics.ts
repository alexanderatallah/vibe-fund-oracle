
import { useState, useEffect } from "react";
import { StockPrediction, ModelInfo } from "@/lib/types";
import { MODELS } from "@/lib/constants";

export const useModelAnalytics = (predictions: StockPrediction[]) => {
  const [modelStats, setModelStats] = useState<ModelInfo[]>(MODELS);
  
  useEffect(() => {
    // Only count predictions with actual prices for scoring
    const completedPredictions = predictions.filter(p => p.actualPrice !== null);
    
    if (!completedPredictions.length) return;
    
    const newModelStats = MODELS.map(model => {
      // Get all predictions for this model
      const modelPredictions = completedPredictions.filter(p => p.modelId === model.id);
      const predictionCount = modelPredictions.length;
      
      if (predictionCount === 0) {
        return { ...model };
      }
      
      // Calculate average error percentage
      const totalError = modelPredictions.reduce((sum, pred) => {
        return sum + (pred.percentError || 0);
      }, 0);
      
      const avgError = totalError / predictionCount;
      
      // Calculate score (100 - average error percentage, with min value of 0)
      const score = Math.max(0, 100 - avgError);
      
      return {
        ...model,
        score,
        predictions: predictionCount,
        accuracy: avgError // Store as error percentage
      };
    });
    
    setModelStats(newModelStats);
    
  }, [predictions]);
  
  return modelStats;
};
