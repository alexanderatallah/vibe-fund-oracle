
// Model definitions
export type ModelName = 'openai-o3' | 'claude-3.7-sonnet' | 'gemini-2.5-pro' | 'deepseek-r1';

export interface ModelInfo {
  id: ModelName;
  name: string;
  displayName: string;
  color: string;
  score: number;
  predictions: number;
  accuracy: number;
}

// Stock prediction types
export interface StockPrediction {
  modelId: ModelName;
  stockSymbol: string;
  date: string;
  predictedPrice: number;
  actualPrice: number | null;
  reasoning: string;
  error?: number;
  percentError?: number;
}

export interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  predictions: StockPrediction[];
}
