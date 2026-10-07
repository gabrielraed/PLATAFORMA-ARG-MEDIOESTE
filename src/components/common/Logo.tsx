import React, { useState } from 'react';

// ==========================================
// HIGH-FIDELITY VECTOR SVG NATIONAL FLAGS
// ==========================================

export const ArgentinaFlag: React.FC<{ className?: string; title?: string }> = ({
  className = 'w-5 h-3.5',
  title = 'República Argentina',
}) => (
  <svg
    viewBox="0 0 768 512"
    className={`rounded-[2px] shadow-sm border border-slate-700/60 shrink-0 overflow-hidden ${className}`}
  >
    {title && <title>{title}</title>}
    <rect width="768" height="512" fill="#74ACDF" />
    <rect width="768" height="170.66" y="170.66" fill="#FFFFFF" />
    {/* Sol de Mayo */}
    <g transform="translate(384, 256)">
      {/* 16 straight rays & 16 flame/wavy rays */}
      <circle cx="0" cy="0" r="36" fill="#F6B40E" stroke="#A86208" strokeWidth="2.5" />
      <circle cx="0" cy="0" r="24" fill="#F8C738" />
      {/* Sun rays */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle})`}>
          <line x1="0" y1="-38" x2="0" y2={idx % 2 === 0 ? '-68' : '-58'} stroke="#F6B40E" strokeWidth={idx % 2 === 0 ? '5' : '3.5'} strokeLinecap="round" />
        </g>
      ))}
      {/* Sun facial features */}
      <circle cx="-10" cy="-6" r="3" fill="#853407" />
      <circle cx="10" cy="-6" r="3" fill="#853407" />
      <path d="M-8 8 Q0 15 8 8" stroke="#853407" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

export const SaudiArabiaFlag: React.FC<{ className?: string; title?: string }> = ({
  className = 'w-5 h-3.5',
  title = 'Reino de Arabia Saudita (المملكة العربية السعودية)',
}) => (
  <svg
    viewBox="0 0 768 512"
    className={`rounded-[2px] shadow-sm border border-slate-700/60 shrink-0 overflow-hidden ${className}`}
  >
    {title && <title>{title}</title>}
    <rect width="768" height="512" fill="#006C35" />
    {/* Calligraphic Shahada inscription representation */}
    <g fill="#FFFFFF" stroke="#FFFFFF" strokeLinecap="round">
      <path
        d="M230 200 C260 185 290 185 320 200 C345 185 375 185 405 200 C435 185 465 185 495 200 C525 185 545 190 555 205"
        strokeWidth="10"
        fill="none"
      />
      <path d="M260 225 L530 225 M280 210 L280 235 M320 210 L320 235 M360 210 L360 235 M410 210 L410 235 M460 210 L460 235 M500 210 L500 235" strokeWidth="6" />
      <path d="M250 250 C290 240 490 240 535 250" strokeWidth="7" fill="none" />
      {/* Ceremonial Sword */}
      <line x1="255" y1="290" x2="520" y2="290" strokeWidth="8" />
      <polygon points="535,290 515,284 515,296" strokeWidth="1" />
      <line x1="260" y1="277" x2="260" y2="303" strokeWidth="8" />
      <circle cx="246" cy="290" r="5.5" />
    </g>
  </svg>
);

export const UAEFlag: React.FC<{ className?: string; title?: string }> = ({
  className = 'w-5 h-3.5',
  title = 'Emiratos Árabes Unidos (الإمارات العربية المتحدة)',
}) => (
  <svg
    viewBox="0 0 768 512"
    className={`rounded-[2px] shadow-sm border border-slate-700/60 shrink-0 overflow-hidden ${className}`}
  >
    {title && <title>{title}</title>}
    <rect width="768" height="170.66" fill="#00732F" />
    <rect width="768" height="170.66" y="170.66" fill="#FFFFFF" />
    <rect width="768" height="170.66" y="341.33" fill="#000000" />
    {/* Hoist red bar */}
    <rect width="192" height="512" fill="#CE1126" />
  </svg>
);

export const QatarFlag: React.FC<{ className?: string; title?: string }> = ({
  className = 'w-5 h-3.5',
  title = 'Estado de Catar (دولة قطر)',
}) => (
  <svg
    viewBox="0 0 768 512"
    className={`rounded-[2px] shadow-sm border border-slate-700/60 shrink-0 overflow-hidden ${className}`}
  >
    {title && <title>{title}</title>}
    <rect width="768" height="512" fill="#8D1B3D" />
    {/* 9 white serrated points */}
    <path
      d="M0 0 L210 0 
      L255 28.4 L210 56.8 
      L255 85.3 L210 113.7 
      L255 142.2 L210 170.6 
      L255 199.1 L210 227.5 
      L255 256 L210 284.4 
      L255 312.8 L210 341.3 
      L255 369.7 L210 398.2 
      L255 426.6 L210 455.1 
      L255 483.5 L210 512 L0 512 Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const KuwaitFlag: React.FC<{ className?: string; title?: string }> = ({
  className = 'w-5 h-3.5',
  title = 'Estado de Kuwait (دولة الكويت)',
}) => (
  <svg
    viewBox="0 0 768 512"
    className={`rounded-[2px] shadow-sm border border-slate-700/60 shrink-0 overflow-hidden ${className}`}
  >
    {title && <title>{title}</title>}
    <rect width="768" height="170.66" fill="#007A3D" />
    <rect width="768" height="170.66" y="170.66" fill="#FFFFFF" />
    <rect width="768" height="170.66" y="341.33" fill="#CE1126" />
    {/* Hoist black trapezoid */}
    <polygon points="0,0 210,170.66 210,341.33 0,512" fill="#000000" />
  </svg>
);

export const BahrainFlag: React.FC<{ className?: string; title?: string }> = ({
  className = 'w-5 h-3.5',
  title = 'Reino de Bahréin (مملكة البحرين)',
}) => (
  <svg
    viewBox="0 0 768 512"
    className={`rounded-[2px] shadow-sm border border-slate-700/60 shrink-0 overflow-hidden ${className}`}
  >
    {title && <title>{title}</title>}
    <rect width="768" height="512" fill="#CE1126" />
    {/* 5 white serrated points */}
    <path
      d="M0 0 L195 0 
      L255 51.2 L195 102.4 
      L255 153.6 L195 204.8 
      L255 256 L195 307.2 
      L255 358.4 L195 409.6 
      L255 460.8 L195 512 L0 512 Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const OmanFlag: React.FC<{ className?: string; title?: string }> = ({
  className = 'w-5 h-3.5',
  title = 'Sultanato de Omán (سلطنة عمان)',
}) => (
  <svg
    viewBox="0 0 768 512"
    className={`rounded-[2px] shadow-sm border border-slate-700/60 shrink-0 overflow-hidden ${className}`}
  >
    {title && <title>{title}</title>}
    <rect width="768" height="170.66" fill="#FFFFFF" />
    <rect width="768" height="170.66" y="170.66" fill="#DB161B" />
    <rect width="768" height="170.66" y="341.33" fill="#008000" />
    <rect width="192" height="512" fill="#DB161B" />
    {/* Khanjar dagger emblem */}
    <g stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" fill="none">
      <line x1="55" y1="45" x2="135" y2="125" />
      <line x1="135" y1="45" x2="55" y2="125" />
      <path d="M95 40 L95 120 M95 120 Q95 145 120 150" strokeWidth="8" />
    </g>
  </svg>
);

// Bilateral Countries Data
export interface BilateralCountry {
  code: string;
  nameEs: string;
  nameEn: string;
  nameAr: string;
  bloc: 'ARGENTINA' | 'GCC';
  Flag: React.FC<{ className?: string; title?: string }>;
}

export const ARAB_GCC_COUNTRIES: BilateralCountry[] = [
  { code: 'SA', nameEs: 'Arabia Saudita', nameEn: 'Saudi Arabia', nameAr: 'السعودية', bloc: 'GCC', Flag: SaudiArabiaFlag },
  { code: 'AE', nameEs: 'Emiratos Árabes Unidos', nameEn: 'UAE', nameAr: 'الإمارات', bloc: 'GCC', Flag: UAEFlag },
  { code: 'QA', nameEs: 'Catar', nameEn: 'Qatar', nameAr: 'قطر', bloc: 'GCC', Flag: QatarFlag },
  { code: 'KW', nameEs: 'Kuwait', nameEn: 'Kuwait', nameAr: 'الكويت', bloc: 'GCC', Flag: KuwaitFlag },
  { code: 'BH', nameEs: 'Bahréin', nameEn: 'Bahrain', nameAr: 'البحرين', bloc: 'GCC', Flag: BahrainFlag },
  { code: 'OM', nameEs: 'Omán', nameEn: 'Oman', nameAr: 'عُمان', bloc: 'GCC', Flag: OmanFlag },
];

export const ARGENTINA_COUNTRY: BilateralCountry = {
  code: 'AR',
  nameEs: 'Argentina',
  nameEn: 'Argentina',
  nameAr: 'الأرجنتين',
  bloc: 'ARGENTINA',
  Flag: ArgentinaFlag,
};

// ==========================================
// BILATERAL FLAGS STRIP COMPONENT
// ==========================================

export const BilateralFlagsStrip: React.FC<{
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  showLabels?: boolean;
}> = ({ size = 'sm', className = '', showLabels = false }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const flagSizes = {
    xs: 'w-3.5 h-2.5',
    sm: 'w-4.5 h-3',
    md: 'w-6 h-4',
  };

  return (
    <div
      className={`relative inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/90 border border-amber-500/30 backdrop-blur-sm shadow-sm ${className}`}
    >
      {/* Argentina */}
      <div
        className="flex items-center gap-1 group cursor-pointer relative"
        onMouseEnter={() => setActiveTooltip('Argentina')}
        onMouseLeave={() => setActiveTooltip(null)}
      >
        <ArgentinaFlag className={`${flagSizes[size]} transition-transform group-hover:scale-110 shadow-xs`} />
        {showLabels && <span className="text-[9px] font-bold text-sky-300">AR</span>}
      </div>

      {/* Gold Bilateral Divider Link */}
      <span className="text-[10px] text-amber-400 font-bold px-0.5 leading-none">❖</span>

      {/* Arab GCC Flags Corridor */}
      <div className="flex items-center gap-1">
        {ARAB_GCC_COUNTRIES.map((country) => {
          const FlagComp = country.Flag;
          return (
            <div
              key={country.code}
              className="group cursor-pointer relative"
              onMouseEnter={() => setActiveTooltip(`${country.nameEs} (${country.nameAr})`)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <FlagComp
                className={`${flagSizes[size]} transition-transform group-hover:scale-110 shadow-xs`}
                title={`${country.nameEs} - ${country.nameAr}`}
              />
            </div>
          );
        })}
      </div>

      {/* Dynamic Hover Tooltip */}
      {activeTooltip && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-950 text-amber-300 text-[10px] font-sans rounded border border-amber-500/40 whitespace-nowrap shadow-xl z-50 pointer-events-none animate-in fade-in duration-150">
          {activeTooltip}
        </div>
      )}
    </div>
  );
};

// ==========================================
// MAIN LOGO COMPONENT
// ==========================================

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showArabicConcept?: boolean;
  showFlags?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  showArabicConcept = false,
  showFlags = true,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-15 h-15',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-xs tracking-[0.16em]',
    md: 'text-sm sm:text-base tracking-[0.2em]',
    lg: 'text-xl sm:text-2xl tracking-[0.22em]',
    xl: 'text-2xl sm:text-3xl tracking-[0.25em]',
  };

  const connectSizes = {
    sm: 'text-[9px] tracking-[0.35em]',
    md: 'text-[11px] tracking-[0.45em]',
    lg: 'text-xs tracking-[0.55em]',
    xl: 'text-sm tracking-[0.6em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 8-pointed geometric gold star / rosette emblem with Bilateral Halo */}
      <div className={`relative shrink-0 ${iconSizes[size]}`}>
        {/* Subtle bilateral halo glow (celeste Argentina + esmeralda GCC) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/20 via-amber-500/25 to-emerald-500/20 blur-[6px] pointer-events-none" />

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_2px_10px_rgba(197,160,89,0.4)]"
        >
          {/* Outer compass rays & petals */}
          <path
            d="M50 4 L57 33 L86 26 L69 49 L96 50 L69 51 L86 74 L57 67 L50 96 L43 67 L14 74 L31 51 L4 50 L31 49 L14 26 L43 33 Z"
            fill="url(#goldGradient)"
            stroke="#C5A059"
            strokeWidth="1.2"
          />
          {/* Bilateral Heraldic Ring */}
          <circle cx="50" cy="50" r="34" stroke="url(#bilateralRing)" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />

          {/* Inner 8-pointed star */}
          <polygon
            points="50,22 56,38 72,38 59,48 64,64 50,54 36,64 41,48 28,38 44,38"
            fill="#070D18"
            stroke="#DFBA73"
            strokeWidth="1.5"
          />
          {/* Center diamond jewel */}
          <polygon
            points="50,38 58,50 50,62 42,50"
            fill="url(#goldCore)"
            stroke="#FFE6A3"
            strokeWidth="1"
          />

          <defs>
            <linearGradient id="goldGradient" x1="4" y1="4" x2="96" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE094" />
              <stop offset="0.45" stopColor="#C5A059" />
              <stop offset="1" stopColor="#8A6726" />
            </linearGradient>
            <linearGradient id="goldCore" x1="42" y1="38" x2="58" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF2C6" />
              <stop offset="0.7" stopColor="#DFBA73" />
              <stop offset="1" stopColor="#A37E34" />
            </linearGradient>
            <linearGradient id="bilateralRing" x1="16" y1="50" x2="84" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#74ACDF" />
              <stop offset="0.5" stopColor="#E5C158" />
              <stop offset="1" stopColor="#007A3D" />
            </linearGradient>
          </defs>
        </svg>

        {/* Micro Argentina & GCC Flag Emblem in corner of Star */}
        {showFlags && size === 'xl' && (
          <div className="absolute -bottom-1 -right-1 flex -space-x-1">
            <ArgentinaFlag className="w-4 h-3 rounded-full border border-slate-900 shadow" />
            <SaudiArabiaFlag className="w-4 h-3 rounded-full border border-slate-900 shadow" />
          </div>
        )}
      </div>

      <div className="flex flex-col text-left">
        {/* Title Bar */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className={`font-serif font-bold text-white uppercase ${titleSizes[size]}`}>
            ARGENTINA–GCC
          </span>
        </div>

        {/* Brand Subtitle & Acronym */}
        <div className="flex items-center gap-1.5">
          <span className={`font-sans font-bold text-ambc-gold uppercase ${connectSizes[size]}`}>
            CONNECT
          </span>
          <span className="text-[8px] font-mono uppercase tracking-widest text-slate-300 font-semibold px-1 py-0.2 rounded bg-slate-800/90 border border-slate-700/80">
            AGBIC
          </span>
        </div>

        {/* Official Subtitle */}
        {showSubtitle && size !== 'sm' && (
          <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-300 font-medium mt-0.5 whitespace-nowrap">
            Business & Investment Council
          </span>
        )}

        {/* Integrated Flags Strip */}
        {showFlags && (
          <div className="mt-1.5">
            <BilateralFlagsStrip size={size === 'sm' ? 'xs' : 'sm'} />
          </div>
        )}

        {/* Arabic Motto / Concept */}
        {showArabicConcept && (
          <span className="text-xs text-ambc-gold-light font-arabic font-bold tracking-wide mt-1.5">
            فرص بلا حدود · شراكات استراتيجية (الأرجنتين والخليج العربي)
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
