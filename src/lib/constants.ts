
import { ModelInfo } from "./types";

// Top S&P 500 stocks
export const TOP_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. Class A' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc. Class B' },
  { symbol: 'UNH', name: 'UnitedHealth Group Incorporated' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
];

// LLM Models for predictions
export const MODELS: ModelInfo[] = [
  {
    id: 'openai-o3', 
    name: 'OpenAI o3',
    displayName: 'OpenAI o3',
    color: '#74aa9c',
    score: 0,
    predictions: 0,
    accuracy: 0
  },
  {
    id: 'claude-3.7-sonnet', 
    name: 'Claude 3.7 Sonnet',
    displayName: 'Claude 3.7',
    color: '#6f42c1',
    score: 0,
    predictions: 0,
    accuracy: 0
  },
  {
    id: 'gemini-2.5-pro', 
    name: 'Gemini 2.5 Pro',
    displayName: 'Gemini 2.5',
    color: '#4285f4',
    score: 0,
    predictions: 0,
    accuracy: 0
  },
  {
    id: 'deepseek-r1', 
    name: 'DeepSeek R1',
    displayName: 'DeepSeek R1',
    color: '#ff7043',
    score: 0,
    predictions: 0,
    accuracy: 0
  },
];

// Mock data for initial development (to be replaced with real API calls)
export const generateMockPredictions = (days = 30) => {
  const mockPredictions = [];
  const today = new Date();
  
  // Generate data for each model
  for (const model of MODELS) {
    // Generate data for each stock
    for (const stock of TOP_STOCKS) {
      // Starting price random between $100-$500
      let basePrice = 100 + Math.random() * 400;
      
      // Generate predictions for past days
      for (let i = days; i > 0; i--) {
        const predictionDate = new Date(today);
        predictionDate.setDate(today.getDate() - i);
        
        // Random daily fluctuation between -5% and +5%
        const dailyChange = (Math.random() - 0.5) * 0.1;
        basePrice = basePrice * (1 + dailyChange);
        
        // Model prediction (with varying accuracy)
        const accuracy = Math.random() * 0.05; // 0-5% error
        const direction = Math.random() > 0.5 ? 1 : -1;
        const predictedPrice = basePrice * (1 + direction * accuracy);
        
        mockPredictions.push({
          modelId: model.id,
          stockSymbol: stock.symbol,
          date: predictionDate.toISOString().split('T')[0],
          predictedPrice: Number(predictedPrice.toFixed(2)),
          actualPrice: Number(basePrice.toFixed(2)),
          reasoning: `Based on analysis of ${stock.name} fundamentals and recent market trends.`,
          error: Number((Math.abs(predictedPrice - basePrice)).toFixed(2)),
          percentError: Number((Math.abs((predictedPrice - basePrice) / basePrice) * 100).toFixed(2))
        });
      }
      
      // Add "today's" prediction with no actual price yet
      const todayPrediction = {
        modelId: model.id,
        stockSymbol: stock.symbol,
        date: today.toISOString().split('T')[0],
        predictedPrice: Number((basePrice * (1 + (Math.random() - 0.5) * 0.05)).toFixed(2)),
        actualPrice: null,
        reasoning: `Based on analysis of ${stock.name} fundamentals and recent market trends.`
      };
      
      mockPredictions.push(todayPrediction);
    }
  }
  
  return mockPredictions;
};
