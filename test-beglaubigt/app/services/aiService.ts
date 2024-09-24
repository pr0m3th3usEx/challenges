import axios, { AxiosInstance } from 'axios';

type GetSuggestionResponse = {
  suggestion: string;
};

class AIService {
  private readonly apiService: AxiosInstance;

  constructor() {
    this.apiService = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 20000,
    });
  }

  async getSuggestion(prompt: string, text: string): Promise<GetSuggestionResponse> {
    const res = await this.apiService.post('/suggestion', {
      prompt,
      text,
    });

    return res.data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AIService();
