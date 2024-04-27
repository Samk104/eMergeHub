"use client";

import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface GraphSalesProps {
    data: any[];
};

export const GraphSales: React.FC<GraphSalesProps> = ({
    data
}) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis 
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="#3489db" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}