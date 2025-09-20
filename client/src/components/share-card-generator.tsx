import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2, Copy, Trophy, Users, Star, Calendar, MapPin } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ShareCardData {
  type: 'team' | 'player' | 'match' | 'tournament';
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  stats?: Array<{ label: string; value: string; icon?: React.ReactNode }>;
  colors?: {
    primary: string;
    secondary: string;
    background: string;
  };
}

interface ShareCardGeneratorProps {
  data: ShareCardData;
  onClose?: () => void;
}

export default function ShareCardGenerator({ data, onClose }: ShareCardGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `copa-tomatao-${data.type}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareToSocial = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        });
      });

      if (navigator.share && navigator.canShare({ files: [new File([blob], 'copa-tomatao-card.png', { type: 'image/png' })] })) {
        await navigator.share({
          title: 'Copa Tomatão - Card Compartilhável',
          text: `Confira meu card da Copa Tomatão! 🏆`,
          files: [new File([blob], 'copa-tomatao-card.png', { type: 'image/png' })]
        });
      } else {
        // Fallback: copiar para clipboard
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        alert('Card copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  const getCardColors = () => {
    if (data.colors) return data.colors;
    
    switch (data.type) {
      case 'team':
        return { primary: '#10B981', secondary: '#059669', background: '#064E3B' };
      case 'player':
        return { primary: '#3B82F6', secondary: '#1D4ED8', background: '#1E3A8A' };
      case 'match':
        return { primary: '#F59E0B', secondary: '#D97706', background: '#92400E' };
      case 'tournament':
        return { primary: '#8B5CF6', secondary: '#7C3AED', background: '#5B21B6' };
      default:
        return { primary: '#EF4444', secondary: '#DC2626', background: '#991B1B' };
    }
  };

  const colors = getCardColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-card max-w-2xl w-full rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-white">Gerar Card Compartilhável</h2>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <span className="sr-only">Fechar</span>
              ×
            </Button>
          )}
        </div>

        {/* Card Preview */}
        <div className="mb-6 flex justify-center">
          <div
            ref={cardRef}
            className="relative w-80 h-[420px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.primary} 100%)`
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  {data.image ? (
                    <img src={data.image} alt={data.title} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <Trophy className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{data.title}</h3>
                  {data.subtitle && (
                    <p className="text-white/80 text-sm">{data.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              {data.description && (
                <p className="text-white/90 text-sm mb-4 leading-relaxed">{data.description}</p>
              )}

              {/* Stats */}
              {data.stats && (
                <div className="flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-3">
                    {data.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          {stat.icon || <Star className="w-6 h-6 text-white" />}
                        </div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-white/70 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto pt-3 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/80 text-sm font-semibold">Copa Tomatão</span>
                  </div>
                  <div className="text-white/60 text-xs">
                    {new Date().toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={generateImage}
            disabled={isGenerating}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGenerating ? 'Gerando...' : 'Baixar Imagem'}
          </Button>
          <Button
            onClick={shareToSocial}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white glow-hover border-0"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
        </div>
      </div>
    </div>
  );
}
