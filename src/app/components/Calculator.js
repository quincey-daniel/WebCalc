// Calculator.js
'use client'
import React, { useState } from 'react';

const Calculator = () => {
    // Initialize all state values explicitly
    const initialState = {
        guests: 0,
        foodQuality: 5,
        music: 5,
        drinks: 5,
        space: 5
    };
    
    const [inputs, setInputs] = useState(initialState);
    const [result, setResult] = useState('0%');

    const handleNumberInput = (e) => {
        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
        setInputs(prev => ({
            ...prev,
            guests: value
        }));
    };

    const handleSliderInput = (name, value) => {
        setInputs(prev => ({
            ...prev,
            [name]: parseInt(value, 10)
        }));
    };

    const calculateFunProbability = () => {
        const weights = {
            guests: 0.2,
            foodQuality: 0.2,
            music: 0.25,
            drinks: 0.2,
            space: 0.15
        };

        let guestScore;
        if (inputs.guests < 5) guestScore = 3;
        else if (inputs.guests < 15) guestScore = 7;
        else if (inputs.guests < 50) guestScore = 10;
        else if (inputs.guests < 100) guestScore = 8;
        else guestScore = 6;

        const totalScore = (
            guestScore * weights.guests +
            inputs.foodQuality * weights.foodQuality +
            inputs.music * weights.music +
            inputs.drinks * weights.drinks +
            inputs.space * weights.space
        ) * 10;

        setResult(`${Math.min(Math.round(totalScore), 100)}%`);
    };

    return (
        <div className="calculator">
            <h1>Party Fun Calculator</h1>
            <h2>Estimate Your Party&apos;s Fun Factor!</h2>

            <div className="input-section">
                <label>
                    Number of Guests:
                    <input 
                        type="number"
                        min="0"
                        value={inputs.guests}
                        onChange={handleNumberInput}
                        className="form-control mb-3"
                    />
                </label>

                <div className="slider-container">
                    <label>
                        Food Quality (1-10):
                        <input 
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.foodQuality}
                            onChange={(e) => handleSliderInput('foodQuality', e.target.value)}
                            className="slider"
                        />
                        <span>{inputs.foodQuality}</span>
                    </label>
                </div>

                <div className="slider-container">
                    <label>
                        Music (1-10):
                        <input 
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.music}
                            onChange={(e) => handleSliderInput('music', e.target.value)}
                            className="slider"
                        />
                        <span>{inputs.music}</span>
                    </label>
                </div>

                <div className="slider-container">
                    <label>
                        Drinks (1-10):
                        <input 
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.drinks}
                            onChange={(e) => handleSliderInput('drinks', e.target.value)}
                            className="slider"
                        />
                        <span>{inputs.drinks}</span>
                    </label>
                </div>

                <div className="slider-container">
                    <label>
                        Space (1-10):
                        <input 
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.space}
                            onChange={(e) => handleSliderInput('space', e.target.value)}
                            className="slider"
                        />
                        <span>{inputs.space}</span>
                    </label>
                </div>

                <button 
                    className="calculate-btn"
                    onClick={calculateFunProbability}
                >
                    Calculate Fun Probability!
                </button>

                <div className="result">
                    Fun Probability: <span className="probability">{result}</span>
                </div>
            </div>
        </div>
    );
};

export default Calculator;