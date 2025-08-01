import React from 'react';

interface TowerIconProps {
  type: string;
  size?: number;
  level?: number;
}

export const TowerIcon: React.FC<TowerIconProps> = ({ type, size = 24, level = 1 }) => {
  const iconSize = size + (level - 1) * 2;
  
  switch (type) {
    case 'paddy-losty':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className="drop-shadow-lg">
          {/* Beer mug */}
          <rect x="6" y="8" width="8" height="12" rx="1" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
          {/* Foam */}
          <ellipse cx="10" cy="8" rx="4" ry="2" fill="#FFFACD"/>
          {/* Handle */}
          <path d="M14 10 Q16 10 16 12 Q16 14 14 14" fill="none" stroke="#654321" strokeWidth="1.5"/>
          {/* Sparkles for upgraded */}
          {level > 1 && (
            <>
              <circle cx="4" cy="6" r="1" fill="#FFD700"/>
              <circle cx="18" cy="8" r="1" fill="#FFD700"/>
              <circle cx="16" cy="18" r="1" fill="#FFD700"/>
            </>
          )}
        </svg>
      );
      
    case 'maureen':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className="drop-shadow-lg">
          {/* Frying pan - larger and more realistic */}
          <circle cx="12" cy="12" r="9" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="1.5"/>
          {/* Inner pan surface - much closer to rim */}
          <circle cx="12" cy="12" r="8.5" fill="#333333" stroke="#1A1A1A" strokeWidth="0.5"/>
          {/* Handle */}
          <rect x="19" y="11" width="4" height="2" rx="1" fill="#654321" stroke="#4A3018" strokeWidth="0.5"/>
          
          {/* Full Irish Fry - MUCH LARGER food items to cover most of the pan */}
          
          {/* HUGE sausages - covering much more area */}
          <ellipse cx="8" cy="8" rx="3.5" ry="1.8" fill="#8B4513" stroke="#654321" strokeWidth="0.3" transform="rotate(25 8 8)"/>
          <ellipse cx="16" cy="9" rx="3.5" ry="1.8" fill="#A0522D" stroke="#654321" strokeWidth="0.3" transform="rotate(-15 16 9)"/>
          <ellipse cx="7" cy="15" rx="3.5" ry="1.8" fill="#8B4513" stroke="#654321" strokeWidth="0.3" transform="rotate(45 7 15)"/>
          <ellipse cx="15" cy="16" rx="3.5" ry="1.8" fill="#A0522D" stroke="#654321" strokeWidth="0.3" transform="rotate(-30 15 16)"/>
          
          {/* LARGE fried eggs - taking up much more space */}
          <ellipse cx="11" cy="11" rx="3.2" ry="2.8" fill="#FFFFFF" stroke="#F0F0F0" strokeWidth="0.2"/>
          <circle cx="11" cy="11" r="1.5" fill="#FFD700" stroke="#FFA500" strokeWidth="0.2"/>
          
          <ellipse cx="17" cy="14" rx="2.8" ry="2.3" fill="#FFFFFF" stroke="#F0F0F0" strokeWidth="0.2"/>
          <circle cx="17" cy="14" r="1.2" fill="#FFD700" stroke="#FFA500" strokeWidth="0.2"/>
          
          {/* LARGE grilled tomato halves - much more visible */}
          <ellipse cx="6" cy="11" rx="2.2" ry="1.8" fill="#DC143C" stroke="#B22222" strokeWidth="0.2"/>
          <path d="M4.8 11 Q6 10.2 7.2 11" stroke="#228B22" strokeWidth="0.4" fill="none"/>
          
          <ellipse cx="18" cy="7" rx="2" ry="1.5" fill="#DC143C" stroke="#B22222" strokeWidth="0.2"/>
          <path d="M17 7 Q18 6.4 19 7" stroke="#228B22" strokeWidth="0.4" fill="none"/>
          
          {/* LARGE mushrooms - much more detailed and bigger */}
          <ellipse cx="13" cy="7" rx="2" ry="1.6" fill="#8B7355" stroke="#654321" strokeWidth="0.2"/>
          <ellipse cx="13" cy="7.2" rx="1.4" ry="1.1" fill="#A0522D" stroke="#654321" strokeWidth="0.1"/>
          
          <ellipse cx="8" cy="17" rx="1.8" ry="1.4" fill="#8B7355" stroke="#654321" strokeWidth="0.2"/>
          <ellipse cx="8" cy="17.1" rx="1.2" ry="0.9" fill="#A0522D" stroke="#654321" strokeWidth="0.1"/>
          
          {/* LARGER baked beans - bigger clusters covering more area */}
          <circle cx="5" cy="7" r="0.7" fill="#FF6347"/>
          <circle cx="5.8" cy="6.3" r="0.5" fill="#FF6347"/>
          <circle cx="4.2" cy="6.6" r="0.5" fill="#FF6347"/>
          <circle cx="5.4" cy="7.8" r="0.5" fill="#FF6347"/>
          <circle cx="4.6" cy="7.4" r="0.4" fill="#FF6347"/>
          
          <circle cx="19" cy="16" r="0.7" fill="#FF6347"/>
          <circle cx="19.6" cy="15.3" r="0.5" fill="#FF6347"/>
          <circle cx="18.4" cy="15.6" r="0.5" fill="#FF6347"/>
          <circle cx="19.2" cy="16.8" r="0.5" fill="#FF6347"/>
          <circle cx="18.8" cy="16.4" r="0.4" fill="#FF6347"/>
          
          {/* LARGER bacon rashers - much more prominent */}
          <path d="M9 6 Q12 5.2 15 6 Q14.2 6.8 12 7.2 Q9.8 6.8 9 6" fill="#8B0000" stroke="#654321" strokeWidth="0.3"/>
          <path d="M7 13 Q10 12.5 13 13.5 Q12.2 14.3 10 14 Q7.8 14.3 7 13" fill="#8B0000" stroke="#654321" strokeWidth="0.3"/>
          <path d="M14 18 Q16 17.8 18 18.2 Q17.5 18.8 16 18.5 Q14.5 18.8 14 18" fill="#8B0000" stroke="#654321" strokeWidth="0.3"/>
          
          {/* Steam for upgraded - more realistic */}
          {level > 1 && (
            <>
              <path d="M8 5 Q9 3 8 1" stroke="#E0E0E0" strokeWidth="0.8" fill="none" opacity="0.7"/>
              <path d="M12 5 Q13 3 12 1" stroke="#E0E0E0" strokeWidth="0.8" fill="none" opacity="0.7"/>
              <path d="M16 5 Q17 3 16 1" stroke="#E0E0E0" strokeWidth="0.8" fill="none" opacity="0.7"/>
              <path d="M10 4 Q11 2 10 0" stroke="#E0E0E0" strokeWidth="0.6" fill="none" opacity="0.5"/>
              <path d="M14 4 Q15 2 14 0" stroke="#E0E0E0" strokeWidth="0.6" fill="none" opacity="0.5"/>
            </>
          )}
        </svg>
      );
      
    case 'fiddler':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className="drop-shadow-lg">
          {/* Meat cut */}
          <path d="M8 6 Q12 4 16 6 Q18 8 16 12 Q14 16 12 14 Q8 16 6 12 Q4 8 8 6" 
                fill="#CD5C5C" stroke="#8B0000" strokeWidth="1"/>
          {/* Marbling */}
          <path d="M10 8 Q12 9 14 8" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.7"/>
          <path d="M9 11 Q11 12 13 11" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.7"/>
          {/* Bone */}
          <ellipse cx="8" cy="8" rx="1.5" ry="0.8" fill="#F5F5DC" transform="rotate(45 8 8)"/>
          <ellipse cx="16" cy="14" rx="1.5" ry="0.8" fill="#F5F5DC" transform="rotate(45 16 14)"/>
          {/* Cream effects for upgraded */}
          {level > 1 && (
            <>
              <circle cx="6" cy="10" r="1" fill="#FFFACD" opacity="0.8"/>
              <circle cx="18" cy="12" r="1" fill="#FFFACD" opacity="0.8"/>
              <circle cx="12" cy="18" r="1" fill="#FFFACD" opacity="0.8"/>
            </>
          )}
        </svg>
      );
      
    case 'leprechaun':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className="drop-shadow-lg">
          {/* Whiskey glass */}
          <path d="M8 6 L16 6 L15 18 Q15 20 13 20 L11 20 Q9 20 9 18 L8 6" 
                fill="#8B4513" stroke="#654321" strokeWidth="1"/>
          {/* Whiskey liquid */}
          <path d="M8.5 8 L15.5 8 L14.8 16 Q14.8 17 13.5 17 L10.5 17 Q9.2 17 9.2 16 L8.5 8" 
                fill="#D2691E"/>
          {/* Glass rim */}
          <ellipse cx="12" cy="6" rx="4" ry="1" fill="#E6E6FA" stroke="#D3D3D3" strokeWidth="0.5"/>
          {/* Whiskey shine */}
          <ellipse cx="10.5" cy="10" rx="1" ry="2" fill="#F4A460" opacity="0.6"/>
          {/* Gold sparkles for upgraded */}
          {level > 1 && (
            <>
              <circle cx="6" cy="4" r="1" fill="#FFD700"/>
              <circle cx="18" cy="6" r="1" fill="#FFD700"/>
              <circle cx="16" cy="20" r="1" fill="#FFD700"/>
              <circle cx="4" cy="16" r="1" fill="#FFD700"/>
            </>
          )}
        </svg>
      );
      
    default:
      return <span style={{ fontSize: iconSize }}>{type === 'paddy-losty' ? '🍺' : type === 'maureen' ? '🍳' : type === 'fiddler' ? '🥩' : '🍀'}</span>;
  }
};

export const EnemyIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 16 }) => {
  switch (type) {
    case 'goblin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className="drop-shadow-sm">
          {/* Head */}
          <circle cx="12" cy="12" r="8" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
          {/* Eyes */}
          <circle cx="9" cy="10" r="1.5" fill="#FF0000"/>
          <circle cx="15" cy="10" r="1.5" fill="#FF0000"/>
          {/* Mouth */}
          <path d="M8 14 Q12 16 16 14" stroke="#000000" strokeWidth="1" fill="none"/>
          {/* Horns */}
          <path d="M8 6 L10 4" stroke="#654321" strokeWidth="2"/>
          <path d="M16 6 L14 4" stroke="#654321" strokeWidth="2"/>
        </svg>
      );
      
    case 'banshee':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className="drop-shadow-sm">
          {/* Ghost body */}
          <path d="M12 4 Q16 4 18 8 Q18 12 18 16 Q16 18 14 16 Q12 18 10 16 Q8 18 6 16 Q6 12 6 8 Q8 4 12 4" 
                fill="#E6E6FA" stroke="#D8BFD8" strokeWidth="1" opacity="0.9"/>
          {/* Eyes */}
          <circle cx="10" cy="10" r="1" fill="#000000"/>
          <circle cx="14" cy="10" r="1" fill="#000000"/>
          {/* Mouth */}
          <ellipse cx="12" cy="13" rx="2" ry="1" fill="#000000"/>
        </svg>
      );
      
    case 'troll':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className="drop-shadow-sm">
          {/* Body */}
          <ellipse cx="12" cy="14" rx="6" ry="8" fill="#556B2F" stroke="#2F4F2F" strokeWidth="1"/>
          {/* Head */}
          <circle cx="12" cy="8" r="5" fill="#556B2F" stroke="#2F4F2F" strokeWidth="1"/>
          {/* Eyes */}
          <circle cx="10" cy="7" r="1" fill="#FF4500"/>
          <circle cx="14" cy="7" r="1" fill="#FF4500"/>
          {/* Tusks */}
          <path d="M9 10 L8 12" stroke="#FFFACD" strokeWidth="2"/>
          <path d="M15 10 L16 12" stroke="#FFFACD" strokeWidth="2"/>
        </svg>
      );
      
    case 'dragon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className="drop-shadow-sm">
          {/* Body */}
          <ellipse cx="12" cy="12" rx="8" ry="6" fill="#8B0000" stroke="#654321" strokeWidth="1"/>
          {/* Head */}
          <ellipse cx="16" cy="10" rx="4" ry="3" fill="#8B0000" stroke="#654321" strokeWidth="1"/>
          {/* Wings */}
          <path d="M6 8 Q4 6 8 10 Q6 12 4 10" fill="#654321" opacity="0.8"/>
          <path d="M18 8 Q20 6 16 10 Q18 12 20 10" fill="#654321" opacity="0.8"/>
          {/* Eyes */}
          <circle cx="17" cy="9" r="1" fill="#FFD700"/>
          {/* Fire breath */}
          <path d="M20 10 Q22 9 24 11 Q22 13 20 12" fill="#FF4500" opacity="0.7"/>
        </svg>
      );
      
    default:
      return <span style={{ fontSize: size }}>{type === 'goblin' ? '👹' : type === 'banshee' ? '👻' : type === 'troll' ? '🧌' : '🐉'}</span>;
  }
};