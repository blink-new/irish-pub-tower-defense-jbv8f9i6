// Simple interface for special attack effects (emoji splash system)
export interface SpecialAttackEffect {
  id: string;
  type: 'peanuts' | 'shirt';
  x: number;
  y: number;
  startTime: number;
}