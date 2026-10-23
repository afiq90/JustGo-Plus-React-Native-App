import React from 'react';
import Svg, { Circle, Ellipse, G, Line, Path, Polygon, Rect, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import colors from '@/constants/colors';

const C = colors.light;

/** Decorative diagonal translucent bands seen in the top-right of every red header. */
export function HeaderBands({ width, height }: { width: number; height: number }) {
  return (
    <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }} pointerEvents="none">
      <Path d={`M${width - 40} ${-20} L${width + 60} ${-20} L${width - 30} ${height * 0.9} L${width - 130} ${height * 0.9} Z`} fill="#FFFFFF" opacity={0.07} />
      <Path d={`M${width + 10} ${height * 0.25} L${width + 90} ${height * 0.25} L${width + 10} ${height + 40} L${width - 70} ${height + 40} Z`} fill="#FFFFFF" opacity={0.08} />
    </Svg>
  );
}

export function JustGoLogo({ width = 140 }: { width?: number }) {
  const h = width * 0.3;
  return (
    <Svg width={width} height={h} viewBox="0 0 140 42">
      <Path d="M4 12 H22 M8 19 H18" stroke="#111" strokeWidth={4} strokeLinecap="round" />
      <SvgText x={14} y={33} fontSize={30} fontWeight="900" fontStyle="italic" fill="#FFFFFF" stroke="#111" strokeWidth={2.4} fontFamily="Inter_700Bold">JustGO</SvgText>
      <SvgText x={14} y={33} fontSize={30} fontWeight="900" fontStyle="italic" fill="#FFFFFF" fontFamily="Inter_700Bold">Just</SvgText>
      <SvgText x={81} y={33} fontSize={30} fontWeight="900" fontStyle="italic" fill={C.primary} fontFamily="Inter_700Bold">GO</SvgText>
    </Svg>
  );
}

export function PhoneArt({ size = 26 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Rect x={7} y={1} width={12} height={24} rx={2.5} fill="#E2363C" />
      <Rect x={8.5} y={4} width={9} height={17} rx={1} fill="#7FD6E8" />
      <Rect x={11} y={22.3} width={4} height={1.2} rx={0.6} fill="#FBD3D5" />
    </Svg>
  );
}

export function MailArt({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.75} viewBox="0 0 28 21">
      <Rect x={1} y={1} width={26} height={19} rx={1.5} fill="#E2363C" />
      <Path d="M1.5 2 L14 12 L26.5 2" stroke="#9E141A" strokeWidth={1.6} fill="none" />
    </Svg>
  );
}

export function IdCardArt({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.7} viewBox="0 0 28 20">
      <Rect x={0.5} y={0.5} width={27} height={19} rx={2} fill="#E2363C" />
      <Rect x={3} y={4} width={9} height={2} fill="#FFFFFF" />
      <Rect x={3} y={8} width={6} height={2} fill="#FFFFFF" opacity={0.8} />
      <Rect x={15} y={7} width={9} height={10} rx={1} fill="#FFFFFF" />
      <Circle cx={19.5} cy={10.5} r={1.8} fill="#222" />
      <Path d="M16.5 16 Q19.5 12 22.5 16 Z" fill="#222" />
    </Svg>
  );
}

export function CardArt({ size = 28, muted = false }: { size?: number; muted?: boolean }) {
  return (
    <Svg width={size} height={size * 0.7} viewBox="0 0 28 20">
      <Rect x={0.5} y={1} width={27} height={18} rx={2} fill={muted ? '#C8C8C8' : '#E2363C'} />
      <Rect x={0.5} y={5} width={27} height={3.5} fill={muted ? '#9A9A9A' : '#8F1218'} />
      <Rect x={3} y={12} width={6} height={3} rx={0.6} fill={muted ? '#EDEDED' : '#F7C948'} />
    </Svg>
  );
}

export function CarArt({ size = 30, muted = false }: { size?: number; muted?: boolean }) {
  const body = muted ? '#CFCFCF' : '#E2363C';
  return (
    <Svg width={size} height={size * 0.7} viewBox="0 0 30 21">
      <Path d="M5 9 L8 3.5 Q9 2 11 2 H19 Q21 2 22 3.5 L25 9 Z" fill={body} />
      <Path d="M8.5 8.5 L10.5 4.2 H19.5 L21.5 8.5 Z" fill={muted ? '#F2F2F2' : '#BFE7F2'} />
      <Rect x={2} y={8.5} width={26} height={8} rx={3} fill={body} />
      <Circle cx={7} cy={12.5} r={1.6} fill="#FFF3C4" />
      <Circle cx={23} cy={12.5} r={1.6} fill="#FFF3C4" />
      <Rect x={4} y={15.5} width={5} height={4} rx={1.2} fill="#333" />
      <Rect x={21} y={15.5} width={5} height={4} rx={1.2} fill="#333" />
    </Svg>
  );
}

export function BridgeArt({ width = 190, height = 152 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 190 152" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#C9E9EF" />
          <Stop offset="1" stopColor="#B7E0EA" />
        </LinearGradient>
        <LinearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={1} />
          <Stop offset="0.25" stopColor="#FFFFFF" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Rect width={190} height={152} fill="url(#sky)" />
      <Path d="M30 52 Q70 40 110 50 T190 46 V60 H30 Z" fill="#9CC6CF" opacity={0.7} />
      <Rect y={58} width={190} height={94} fill="#A8D8E6" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Line key={i} x1={20 + i * 26} y1={70 + (i % 3) * 18} x2={36 + i * 26} y2={70 + (i % 3) * 18} stroke="#FFFFFF" strokeWidth={1} opacity={0.6} />
      ))}
      <G stroke="#3C3C3C" strokeWidth={0.8}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Line key={'a' + i} x1={92} y1={32} x2={30 + i * 9} y2={120 - i * 5} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Line key={'b' + i} x1={92} y1={32} x2={100 + i * 8} y2={88 - i * 3} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Line key={'c' + i} x1={150} y1={36} x2={110 + i * 15} y2={86 - i * 2} />
        ))}
      </G>
      <Path d="M0 140 L190 70 L190 78 L0 152 Z" fill="#E8E8E8" stroke="#3C3C3C" strokeWidth={1.2} />
      <Polygon points="88,28 96,28 99,125 85,125" fill="#5A5A5A" />
      <Polygon points="147,34 153,34 155,95 145,95" fill="#5A5A5A" />
      <Rect x={84} y={70} width={16} height={3} fill="#3C3C3C" />
      <Rect x={144} y={60} width={12} height={3} fill="#3C3C3C" />
      <Rect width={190} height={152} fill="url(#fade)" />
    </Svg>
  );
}

export function MarketplaceArt({ width = 168, height = 150 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 168 150">
      <Ellipse cx={30} cy={150} rx={120} ry={60} fill="#E4E4E8" />
      <Rect x={100} y={62} width={44} height={28} rx={3} fill="#4B79C9" transform="rotate(-18 122 76)" />
      <Rect x={100} y={68} width={44} height={5} fill="#1E3E7A" transform="rotate(-18 122 76)" />
      <Rect x={68} y={100} width={88} height={60} fill="#B9D5EA" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Path key={i} d={`M${64 + i * 19} 92 h19 v10 q-9.5 8 -19 0 Z`} fill={i % 2 ? '#FFFFFF' : '#E2363C'} />
      ))}
      <Rect x={60} y={86} width={100} height={8} rx={2} fill="#E2363C" />
      <Rect x={84} y={110} width={52} height={40} fill="#E9F2F8" />
      <Path d="M20 104 L52 104 L56 150 L16 150 Z" fill="#C79A5E" />
      <Path d="M28 104 Q36 84 44 104" stroke="#333" strokeWidth={2} fill="none" />
      <Path d="M140 150 L142 120 Q146 112 152 120 L156 118 Q162 116 164 126 L168 150 Z" fill="#E7A88A" />
    </Svg>
  );
}

export function GiftArt({ width = 168, height = 150 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 168 150">
      <Ellipse cx={30} cy={150} rx={110} ry={60} fill="#E4E4E8" />
      <Circle cx={30} cy={84} r={5} fill="#B6C2D9" />
      <Circle cx={124} cy={44} r={3.5} fill="#B6C2D9" />
      <Rect x={30} y={118} width={44} height={32} fill="#7A3AA0" />
      <Rect x={46} y={118} width={10} height={32} fill="#3E6CC8" />
      <Rect x={66} y={78} width={102} height={72} fill="#C9861E" />
      <Rect x={60} y={68} width={110} height={16} fill="#D99A2B" />
      <Rect x={106} y={68} width={18} height={82} fill="#C2B24E" />
      <Path d="M115 68 Q90 30 80 52 Q78 66 115 68 Z" fill="none" stroke="#B42127" strokeWidth={5} />
      <Path d="M115 68 Q140 30 150 52 Q152 66 115 68 Z" fill="none" stroke="#B42127" strokeWidth={5} />
      <Path d="M115 68 Q100 30 92 46" stroke="#E8C64A" strokeWidth={8} fill="none" />
    </Svg>
  );
}

export function EmptyReceiptArt({ width = 200 }: { width?: number }) {
  const r = '#D86A70';
  return (
    <Svg width={width} height={width * 0.8} viewBox="0 0 200 160">
      <Ellipse cx={70} cy={148} rx={52} ry={6} fill="#DADADA" />
      <Ellipse cx={150} cy={146} rx={18} ry={5} fill="#DADADA" />
      <Path d="M30 14 H120 Q128 14 128 22 V122 H38 V22 Q38 14 30 14 Z" fill="#FFFFFF" stroke={r} strokeWidth={2.4} />
      <Path d="M30 14 Q22 14 22 22 V26 H38" fill="#FFFFFF" stroke={r} strokeWidth={2.4} />
      <Path d="M120 14 Q128 14 128 22 H134" stroke={r} strokeWidth={2.4} fill="none" />
      <Path d="M8 112 H118 Q114 128 126 132 H16 Q6 128 8 112 Z" fill={r} />
      {[30, 46, 62, 78, 94].map((y, i) => (
        <G key={y}>
          <Line x1={52} y1={y} x2={i % 2 ? 66 : 74} y2={y} stroke={r} strokeWidth={2.4} strokeLinecap="round" />
          <Line x1={i % 2 ? 72 : 80} y1={y} x2={i % 2 ? 108 : 100} y2={y} stroke={r} strokeWidth={2.4} strokeLinecap="round" />
        </G>
      ))}
      <Circle cx={138} cy={90} r={22} fill="#FBE7E8" stroke={r} strokeWidth={3} />
      <Path d="M126 84 Q130 74 140 72" stroke="#FFFFFF" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Line x1={154} y1={106} x2={172} y2={124} stroke={r} strokeWidth={6} strokeLinecap="round" />
    </Svg>
  );
}

export function PlusMilesMark({ height = 18 }: { height?: number }) {
  return (
    <Svg width={height * 5} height={height} viewBox="0 0 90 18">
      <Path d="M2 14 Q8 0 22 4 Q12 2 6 14 Z" fill="#1C4FA0" />
      <SvgText x={10} y={14} fontSize={13} fontStyle="italic" fontWeight="900" fill="#1C4FA0" fontFamily="Inter_700Bold">PLUS</SvgText>
      <SvgText x={46} y={14} fontSize={13} fontStyle="italic" fontWeight="700" fill="#1C4FA0" fontFamily="Inter_600SemiBold">Miles</SvgText>
    </Svg>
  );
}

export function MalaysiaFlag({ size = 26 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      <Circle cx={13} cy={13} r={12.5} fill="#FFFFFF" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Rect key={i} x={0} y={1 + i * 3.6} width={26} height={1.8} fill="#CC0001" />
      ))}
      <Path d="M0.5 13 A12.5 12.5 0 0 1 13 0.5 V13 Z" fill="#010066" />
      <Circle cx={6.5} cy={8} r={3.4} fill="#FFCC00" />
      <Circle cx={7.6} cy={8} r={2.9} fill="#010066" />
      <Circle cx={10.4} cy={8} r={1.3} fill="#FFCC00" />
    </Svg>
  );
}

export function MyDigitalIdMark({ size = 36 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36">
      <Rect width={36} height={36} rx={8} fill="#9AA3B5" />
      <Rect x={2} y={2} width={32} height={32} rx={7} fill="#C9CED9" />
      <SvgText x={7} y={14} fontSize={7} fill="#1F3E8C" fontFamily="Inter_600SemiBold">my</SvgText>
      <SvgText x={14} y={30} fontSize={17} fontWeight="900" fill="#1F3E8C" fontFamily="Inter_700Bold">ID</SvgText>
      <Rect x={9} y={16} width={3} height={14} fill="#3C6FD1" />
    </Svg>
  );
}

/* ---------- Tab icons (match original outline style) ---------- */
export function TabHome({ color, active }: { color: string; active: boolean }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Path d="M3 12 L14 3 L25 12 V25 H17.5 V18 H10.5 V25 H3 Z" fill={active ? color : '#FFFFFF'} />
    </Svg>
  );
}
export function TabTransactions({ color, active }: { color: string; active: boolean }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Rect x={2} y={2} width={24} height={24} rx={4} fill={active ? color : 'none'} stroke={active ? color : color} strokeWidth={2.2} />
      <Line x1={10} y1={18} x2={18} y2={10} stroke={active ? '#333333' : color} strokeWidth={2.2} strokeLinecap="round" />
      <Path d="M9 12 L12 9 M16 19 L19 16" stroke={active ? '#333333' : color} strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}
export function TabInvoice({ color, active }: { color: string; active: boolean }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Path d="M5 2 H18 L23 7 V26 H5 Z" fill={active ? color : 'none'} stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <SvgText x={10} y={20} fontSize={11} fontWeight="700" fill={active ? '#333333' : color} fontFamily="Inter_700Bold">$</SvgText>
      <Line x1={8} y1={9} x2={8} y2={9} stroke={color} />
    </Svg>
  );
}
export function TabMe({ color, active }: { color: string; active: boolean }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Circle cx={14} cy={8.5} r={5.5} fill={active ? color : 'none'} stroke={color} strokeWidth={2} />
      <Path d="M4 26 V23 Q4 16 14 16 Q24 16 24 23 V26 Z" fill={active ? color : 'none'} stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}
