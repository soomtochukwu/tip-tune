import React, { useState, useCallback } from 'react';
import { useSpring, animated, useTrail } from 'react-spring';
import { useReducedMotion, getSpringConfig } from '../../utils/animationUtils';
import AssetToggle from './AssetToggle';

export interface AmountSelectorProps {
    presets?: number[];
    currency?: 'XLM' | 'USDC';
    xlmUsdRate?: number;
    value: number;
    onChange: (amount: number) => void;
    onCurrencyToggle?: (currency: 'XLM' | 'USDC') => void;
    showCustomInput?: boolean;
    showSlider?: boolean;
    walletBalance?: {
        xlm: number;
        usdc: number;
    };
}

const DEFAULT_PRESETS = [1, 5, 10, 25, 50];
const MAX_SLIDER_VALUE = 100; // Maximum value for slider

const AmountSelector: React.FC<AmountSelectorProps> = ({
    presets = DEFAULT_PRESETS,
    currency = 'XLM',
    xlmUsdRate = 0.11,
    value,
    onChange,
    onCurrencyToggle,
    showCustomInput = true,
    showSlider = true,
    walletBalance = { xlm: 1000, usdc: 100 },
}) => {
    const reducedMotion = useReducedMotion();
    const [activePreset, setActivePreset] = useState<number | null>(value);
    const [customValue, setCustomValue] = useState('');
    const [isDraggingSlider, setIsDraggingSlider] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [currencyFlipKey, setCurrencyFlipKey] = useState(0);
    const [pressedId, setPressedId] = useState<number | null>(null);

    // Staggered preset trail
    const trail = useTrail(presets.length, {
        from: { opacity: 0, y: 10, scale: 0.9 },
        to: { opacity: 1, y: 0, scale: 1 },
        config: getSpringConfig('gentle'),
        immediate: reducedMotion,
    });

    // Input focus spring
    const inputSpring = useSpring({
        scale: inputFocused ? 1.02 : 1,
        boxShadow: inputFocused
            ? '0 0 0 2px rgba(77,163,255,0.5)'
            : '0 0 0 1px rgba(77,163,255,0.15)',
        config: getSpringConfig('stiff'),
        immediate: reducedMotion,
    });

    const handleSliderChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newAmount = parseFloat(e.target.value);
            setActivePreset(null);
            setCustomValue('');
            onChange(newAmount);
        },
        [onChange]
    );

    const handleSliderDragStart = useCallback(() => {
        setIsDraggingSlider(true);
    }, []);

    const handleSliderDragEnd = useCallback(() => {
        setIsDraggingSlider(false);
    }, []);

    const handlePresetClick = useCallback((preset: number, idx: number) => {
        setActivePreset(preset);
        setCustomValue('');
        onChange(preset);

        // Bounce press
        if (!reducedMotion) {
            setPressedId(idx);
            setTimeout(() => setPressedId(null), 300);
        }
    }, [onChange, reducedMotion]);

    const handleCustomChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setCustomValue(raw);
        setActivePreset(null);
        const parsed = parseFloat(raw);
        if (!isNaN(parsed) && parsed > 0) onChange(parsed);
    }, [onChange]);
maxAmount = currency === 'XLM' ? walletBalance.xlm : walletBalance.usdc;

    const 
    const handleCurrencyToggle = useCallback(() => {
        setCurrencyFlipKey(k => k + 1);
        const next = currency === 'XLM' ? 'USDC' : 'XLM';
        onCurrencyToggle?.(next);
    }, [currency, onCurrencyToggle]);

    const usdEquivalent = currency === 'XLM'
        ? (value * xlmUsdRate).toFixed(2)
        : value.toFixed(2);
6" role="group" aria-label="Select tip amount">
            {/* Asset Toggle */}
            <AssetToggle
                currency={currency}
                onToggle={onCurrencyToggle || (() => {})}
                xlmUsdRate={xlmUsdRate}
                walletBalance={walletBalance}
                displayAmount={value}
            /   </svg>
                </button>
            </div>

            {/* Preset buttons */}
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Preset amounts">
                {trail.map((style, idx) => {
                    const preset = presets[idx];
                    const isActive = activePreset === preset;
                    const isPressed = pressedId === idx;

                    return (
                        <animated.button
                            key={preset}
                            type="button"
                            role="radio"
                Slider for custom amount */}
            {showSlider && (
                <div className="space-y-3">
                    <label htmlFor="amount-slider" className="text-xs text-gray-400 uppercase tracking-wider font-medium block">
                        Quick Adjust
                    </label>
                    <div className="relative">
                        <input
                            id="amount-slider"
                            type="range"
                            min="0"
                            max={maxAmount}
                            step={currency === 'XLM' ? 0.1 : 0.01}
                            value={value}
                            onChange={handleSliderChange}
                            onMouseDown={handleSliderDragStart}
                            onMouseUp={handleSliderDragEnd}
                            onTouchStart={handleSliderDragStart}
                            onTouchEnd={handleSliderDragEnd}
                            className="w-full h-2 rounded-full bg-navy appearance-none cursor-pointer
                            [background:linear-gradient(to_right,rgba(77,163,255,0.3)_0%,rgba(77,163,255,0.3)_var(--value),rgba(77,163,255,0.1)_var(--value),rgba(77,163,255,0.1)_100%)]
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                            [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-primary [&::-webkit-slider-thumb]:to-ice-blue
                            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-blue-primary/50 [&::-webkit-slider-thumb]:border-0
                            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-blue-primary [&::-moz-range-thumb]:to-ice-blue
                            [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:shadow-blue-primary/50
                            hover:[&::-webkit-slider-thumb]:shadow-blue-primary/70 hover:[&::-moz-range-thumb]:shadow-blue-primary/70
                            transition-all"
                            style={{
                                '--value': `${(value / maxAmount) * 100}%`,
                            } as React.CSSProperties}
                            aria-label="Tip amount slider"
                            aria-valuemin={0}
                            aria-valuemax={maxAmount}
                            aria-valuenow={value}
                            aria-valuetext={`${value.toFixed(2)} ${currency}`}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>0</span>
                        <span className={isDraggingSlider ? 'text-blue-primary font-semibold' : ''}>
                            {value.toFixed(2)} {currency}
                        </span>
                        <span>{maxAmount.toFixed(2)}</span>
                    </div>
                </div>
            )checked={isActive}
                            id={`preset-amount-${preset}`}
                            onClick={() => handlePresetClick(preset, idx)}
                            style={{
                                ...style,
                                scale: isPressed && !reducedMotion
                                    ? 0.88
                                    : isActive && !reducedMotion
                                        ? 1.08
                                        : 1,
                                transition: 'box-shadow 0.15s',
                            }}
                            className={`min-w-[52px] px-3 py-2 rounded-xl text-sm font-semibold transition-colors duration-150
                ${isActive
                                    ? 'bg-accent-gold text-gray-900 shadow-lg shadow-accent-gold/30'
                                    : 'bg-navy/40 border border-blue-primary/20 text-gray-300 hover:border-blue-primary/50 hover:text-white'}
              `}
                        >
                            {preset}
                        </animated.button>
                    );
                })}
            </div>

            {/* Custom input */}
            {showCustomInput && (
                <animated.div style={reducedMotion ? {} : inputSpring} className="rounded-xl overflow-hidden">
                    <div className="relative flex items-center bg-navy/40 border border-blue-primary/20 rounded-xl">
                        <span className="pl-4 text-gray-400 text-sm select-none">Custom</span>
                        <input
                            id="custom-tip-amount"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={customValue}
                            onChange={handleCustomChange}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            placeholder="0.00"
                            aria-label="Custom tip amount"
                            className="flex-1 bg-transparent text-right pr-3 py-3 text-white text-sm font-medium outline-none placeholder-gray-600
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="pr-4 text-gray-400 text-xs font-medium">{currency}</span>
                    </div>
                </animated.div>
            )}

            {/* USD equivalent */}
            <p className="text-xs text-gray-500 text-right">
                ≈ <span className="text-gray-300 font-medium">${usdEquivalent} USD</span>
            </p>
        </div>
    );
};

export default AmountSelector;
