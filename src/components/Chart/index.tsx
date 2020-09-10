import React from 'react'
import './index.css'

interface ChartProps {
    title: string,
    desc: string,
    pic?: string,
    songTitle: string,
}

const Chart: React.FC<ChartProps> = ({ title, desc, songTitle }) => {
    return (
        <div className="collection">
            <div className="chart">
                <img alt="Album" src=" https://images.genius.com/020b225d73b98b89d001ce4a5cdc8624.750x750x1.jpg" />
                <h4>{songTitle}</h4>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default Chart