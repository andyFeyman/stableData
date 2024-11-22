import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import './StableChart.scss';

const StableChart = () => {
    const pieChartRef = useRef(null);
    const legendRef = useRef(null);

    const data = [
        { label: '分类A', value: 30, color: '#FF6384' },
        { label: '分类B', value: 100, color: '#36A2EB' },
    
    ];

    const calculateClipPath = (startAngle, endAngle) => {
        const center = { x: 50, y: 50 };
        const radius = 50;
        
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;
        
        const startX = center.x + radius * Math.cos(startRad);
        const startY = center.y + radius * Math.sin(startRad);
        const endX = center.x + radius * Math.cos(endRad);
        const endY = center.y + radius * Math.sin(endRad);
        
        return `polygon(50% 50%, ${startX}% ${startY}%, ${endX}% ${endY}%)`;
    };

    useEffect(() => {
        if (pieChartRef.current) {
            const total = data.reduce((sum, item) => sum + item.value, 0);
            
            let gradientString = '';
            let currentPercentage = 0;
            
            data.forEach(item => {
                const percentage = (item.value / total) * 100;
                const nextPercentage = currentPercentage + percentage;
                gradientString += `${item.color} ${currentPercentage}% ${nextPercentage}%${nextPercentage < 100 ? ',' : ''}`;
                currentPercentage = nextPercentage;
            });
            
            pieChartRef.current.style.background = `conic-gradient(${gradientString})`;

            // 清除现有的segments
            const segments = pieChartRef.current.querySelectorAll('.pie-segment');
            segments.forEach(segment => segment.remove());

            // 添加新的segments
            currentPercentage = 0;
            data.forEach(item => {
                const percentage = (item.value / total) * 100;
                const segment = document.createElement('div');
                segment.className = 'pie-segment';
                
                const startAngle = (currentPercentage / 100) * 360;
                const endAngle = ((currentPercentage + percentage) / 100) * 360;
                
                segment.style.clipPath = calculateClipPath(startAngle, endAngle);
                segment.setAttribute('data-percentage', `${percentage.toFixed(1)}%`);
                pieChartRef.current.appendChild(segment);
                
                currentPercentage += percentage;
            });
        }
    }, [data]);

    return (
        <Container>
            <div className="pie-chart" ref={pieChartRef}></div>
            <div className="legend" ref={legendRef}>
                {data.map((item, index) => (
                    <div className="legend-item" key={index}>
                        <div 
                            className="legend-color" 
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span>
                            {item.label} - {((item.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default StableChart;