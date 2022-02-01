import React from "react";
import AdminDashboard from "../../layouts/AdminDashboard";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Index(props) {
    const { candidates } = props;

    const datasets = candidates?.map((i) => ({
        label: i.name,
        data: [i.voter_count],
        backgroundColor: i.color_hex,
    }));

    return (
        <>
            <div className="py-5">
                <p className="text-lg font-medium leading-6 tracking-wide text-gray-700">
                    Grafik Pemilihan Pilketos
                </p>
                <div className="px-3 py-2 border rounded">
                    <Bar
                        options={{
                            responsive: true,
                        }}
                        data={{
                            labels: [""],
                            datasets,
                        }}
                    />
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => (
    <AdminDashboard children={page} title="Admin Dashboard" />
);
