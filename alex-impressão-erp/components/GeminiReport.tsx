import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Button, Card, Badge } from './UI';
import { Sparkles, FileText, AlertTriangle } from 'lucide-react';
import { Transaction, Product } from '../types';

interface GeminiReportProps {
  transactions: Transaction[];
  products: Product[];
}

export const GeminiReport: React.FC<GeminiReportProps> = ({ transactions, products }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async () => {
    if (!process.env.API_KEY) {
      setError("Chave de API não configurada no ambiente de demonstração.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prepare data summary
      const totalRevenue = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
      
      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

      const lowStockProducts = products.filter(p => p.stock <= p.minStock).map(p => p.name);

      const prompt = `
        Atue como um consultor financeiro sênior para a empresa "Alex Impressão".
        Analise os seguintes dados resumidos:
        - Receita Total: R$ ${totalRevenue.toFixed(2)}
        - Despesas Totais: R$ ${totalExpenses.toFixed(2)}
        - Saldo: R$ ${(totalRevenue - totalExpenses).toFixed(2)}
        - Produtos com estoque baixo: ${lowStockProducts.join(', ') || 'Nenhum'}
        - Total de transações: ${transactions.length}

        Forneça um relatório executivo curto (máximo 3 parágrafos) com:
        1. Análise de saúde financeira.
        2. Recomendações de ação imediata (focando em estoque ou corte de custos).
        3. Uma frase motivacional para a equipe.
        Use formatação Markdown simples.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setAnalysis(response.text || "Não foi possível gerar a análise.");

    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com a IA. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-6 border-blue-100 bg-gradient-to-br from-white to-blue-50/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Assistente Inteligente Alex</h3>
            <p className="text-sm text-slate-500">Análise de dados com IA</p>
          </div>
        </div>
        <Badge color="blue">BETA</Badge>
      </div>

      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-4">
          O assistente analisa suas transações e estoque para fornecer insights estratégicos sobre o seu negócio.
        </p>
        
        {!analysis && (
          <Button onClick={generateReport} isLoading={loading} className="w-full sm:w-auto">
            <Sparkles className="w-4 h-4 mr-2" />
            Gerar Relatório Financeiro
          </Button>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 text-sm mb-4">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      {analysis && (
        <div className="bg-white p-4 rounded-lg border border-slate-200 prose prose-sm max-w-none animate-in fade-in slide-in-from-bottom-2">
          <div className="whitespace-pre-wrap font-medium text-slate-700">
            {analysis}
          </div>
          <div className="mt-4 flex justify-end">
             <Button variant="ghost" onClick={() => setAnalysis('')} size="sm">Limpar</Button>
          </div>
        </div>
      )}
    </Card>
  );
};
