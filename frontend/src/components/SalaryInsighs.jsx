// SalaryInsighs.jsx - Earthy Theme
import React, { useState, useMemo, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Search, Download, TrendingUp, DollarSign, Briefcase, MapPin, Gauge, Target, Sigma, Lightbulb, Zap, Users, Code, Table as TableIcon } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, ArcElement);

// --- Chart Options ---
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: { color: "#ACBFA4", boxWidth: 10, padding: 20, font: { weight: 'bold', size: 10 } }
        },
        tooltip: {
            backgroundColor: 'rgba(38, 38, 38, 0.95)',
            titleColor: '#FF7F11',
            bodyColor: '#E2E8CE',
            borderWidth: 1,
            borderColor: '#444444',
            padding: 12,
            cornerRadius: 8,
            titleFont: { size: 13, weight: 'bold' },
            bodyFont: { size: 12 }
        }
    },
    scales: {
        x: { 
            ticks: { color: "#666666", font: { weight: 'bold' } },
            grid: { color: "rgba(68, 68, 68, 0.3)", drawBorder: false }
        },
        y: { 
            ticks: { color: "#666666", font: { weight: 'bold' } },
            grid: { color: "rgba(68, 68, 68, 0.3)", drawBorder: false }
        }
    }
};

const salaryDb = [
  { company: "Google", role: "SWE", industry: "Tech", yoe: 0, loc: "India", base: 22, stock: 15, bonus: 3 },
  { company: "Google", role: "SWE", industry: "Tech", yoe: 2, loc: "India", base: 32, stock: 20, bonus: 5 },
  { company: "Amazon", role: "SDE-1", industry: "E-commerce", yoe: 1, loc: "India", base: 18, stock: 12, bonus: 2 },
  { company: "Amazon", role: "SDE-2", industry: "E-commerce", yoe: 3, loc: "India", base: 28, stock: 18, bonus: 4 },
  { company: "Microsoft", role: "SWE", industry: "Tech", yoe: 1, loc: "India", base: 20, stock: 10, bonus: 3 },
  { company: "Microsoft", role: "SWE", industry: "Tech", yoe: 4, loc: "India", base: 35, stock: 18, bonus: 6 },
  { company: "JP Morgan", role: "Analyst", industry: "Finance", yoe: 1, loc: "USA", base: 100, stock: 10, bonus: 15 },
  { company: "Google", role: "SWE", industry: "Tech", yoe: 0, loc: "USA", base: 120, stock: 80, bonus: 20 },
  { company: "Google", role: "SWE", industry: "Tech", yoe: 3, loc: "USA", base: 160, stock: 120, bonus: 30 },
  { company: "Amazon", role: "SDE-1", industry: "E-commerce", yoe: 1, loc: "USA", base: 110, stock: 70, bonus: 18 },
  { company: "Amazon", role: "SDE-2", industry: "E-commerce", yoe: 4, loc: "USA", base: 150, stock: 110, bonus: 28 },
  { company: "Meta", role: "SWE", industry: "Social Media", yoe: 2, loc: "USA", base: 140, stock: 100, bonus: 25 },
];

const FilterInput = ({ icon: Icon, k, placeholder, filters, setFilters }) => (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-[#666666] group-focus-within:text-[#FF7F11] transition-colors" />
      </div>
      <input
        type="text"
        value={filters[k]}
        onChange={(e) => setFilters((f) => ({ ...f, [k]: e.target.value }))}
        className="block w-full pl-10 pr-3 py-3 border border-[#444444] rounded-xl leading-5 bg-[#333333] text-[#E2E8CE] placeholder-[#666666] focus:outline-none focus:bg-[#262626] focus:border-[#FF7F11] focus:ring-1 focus:ring-[#FF7F11] sm:text-sm transition-all shadow-inner font-medium"
        placeholder={placeholder}
      />
    </div>
);

const SalaryInsights = () => {
  const [filters, setFilters] = useState({ company: "", role: "", yoe: "", loc: "", industry: "" });
  const chartRef = useRef(null);

  const filtered = useMemo(() => {
    return salaryDb.filter((r) =>
      ['company', 'role', 'loc', 'industry'].every((k) => 
        !filters[k] || r[k].toString().toLowerCase().includes(filters[k].toLowerCase())
      ) && (!filters.yoe || r.yoe >= parseInt(filters.yoe, 10))
    );
  }, [filters]);

  const stats = useMemo(() => {
    if (!filtered.length) return null;
    const tc = filtered.map((r) => r.base + r.stock + r.bonus);
    const unit = filtered.some(r => r.loc.toLowerCase().includes('india')) ? 'LPA' : 'k $';
    const sortedTc = [...tc].sort((a, b) => a - b);
    const median = sortedTc.length % 2 === 0 ? (sortedTc[sortedTc.length/2 - 1] + sortedTc[sortedTc.length/2]) / 2 : sortedTc[Math.floor(sortedTc.length/2)];
    
    return {
      avg: (tc.reduce((a, b) => a + b, 0) / tc.length).toFixed(1) + unit,
      median: median.toFixed(1) + unit,
      min: Math.min(...tc).toFixed(1) + unit,
      max: Math.max(...tc).toFixed(1) + unit,
      count: filtered.length,
      unit
    };
  }, [filtered]);

  const barChartData = useMemo(() => {
    const grouped = filtered.reduce((acc, r) => {
        const key = r.role;
        if (!acc[key]) acc[key] = { base: [], stock: [], bonus: [] };
        acc[key].base.push(r.base);
        acc[key].stock.push(r.stock);
        acc[key].bonus.push(r.bonus);
        return acc;
    }, {});
    const labels = Object.keys(grouped);
    const getAvg = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0;

    return {
      labels,
      datasets: [
        { label: "Base", data: labels.map(l => getAvg(grouped[l].base)), backgroundColor: "#ACBFA4", borderRadius: 4 },
        { label: "Stock", data: labels.map(l => getAvg(grouped[l].stock)), backgroundColor: "#FF7F11", borderRadius: 4 },
        { label: "Bonus", data: labels.map(l => getAvg(grouped[l].bonus)), backgroundColor: "#E2E8CE", borderRadius: 4 },
      ],
    };
  }, [filtered]);

  const downloadPDF = async () => {
    const element = chartRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#262626" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Salary_Insights.pdf");
  };

  return (
    <div className="min-h-screen bg-[#262626] text-[#E2E8CE] font-sans selection:bg-[#FF7F11] selection:text-[#262626] p-6 lg:p-12 relative">
       
        {/* Background Ambience */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
             <div className="absolute top-[-20%] left-[20%] w-[50rem] h-[50rem] bg-[#FF7F11]/5 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[-20%] right-[20%] w-[50rem] h-[50rem] bg-[#ACBFA4]/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#444444] pb-8 gap-6">
                <div>
                     <div className="inline-block px-4 py-1.5 rounded-full border border-[#444444] bg-[#333333] text-[#ACBFA4] font-bold text-xs uppercase tracking-widest mb-4 shadow-md">
                        Market Intelligence
                    </div>
                    <h1 className="text-5xl font-black text-[#E2E8CE] tracking-tighter mb-2">Compensation <span className="text-[#FF7F11]">Radar</span></h1>
                    <p className="text-[#ACBFA4] font-medium text-lg">Real-time salary data to empower your negotiations.</p>
                </div>
                <button onClick={downloadPDF} className="flex items-center gap-2 px-6 py-3 bg-[#333333] border border-[#444444] text-[#E2E8CE] rounded-xl font-bold uppercase tracking-widest text-xs hover:border-[#FF7F11] hover:text-[#FF7F11] transition shadow-lg">
                    <Download className="w-4 h-4" /> Export Report
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10 p-6 bg-[#333333] rounded-[2rem] border border-[#444444] shadow-xl">
                 <FilterInput icon={Briefcase} k="company" placeholder="Company (e.g. Google)" filters={filters} setFilters={setFilters} />
                 <FilterInput icon={Code} k="role" placeholder="Role (e.g. SDE)" filters={filters} setFilters={setFilters} />
                 <FilterInput icon={MapPin} k="loc" placeholder="Location (e.g. India)" filters={filters} setFilters={setFilters} />
                 <FilterInput icon={Target} k="yoe" placeholder="Min YoE (e.g. 2)" filters={filters} setFilters={setFilters} />
                 <FilterInput icon={FactoryIcon} k="industry" placeholder="Industry (e.g. Tech)" filters={filters} setFilters={setFilters} />
            </div>

            {/* Stats Grid */}
            {stats ? (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                     <StatCard label="Data Points" value={stats.count} icon={Users} color="text-[#ACBFA4]" />
                     <StatCard label="Average TC" value={stats.avg} icon={Sigma} color="text-[#FF7F11]" />
                     <StatCard label="Median TC" value={stats.median} icon={Target} color="text-[#E2E8CE]" />
                     <StatCard label="Min TC" value={stats.min} icon={TrendingUp} color="text-[#666666]" />
                     <StatCard label="Max TC" value={stats.max} icon={Zap} color="text-[#FF7F11]" />
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-[#444444] rounded-[2rem] mb-12">
                    <Search className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                    <p className="text-[#ACBFA4] font-bold text-lg">No data found matching criteria.</p>
                </div>
            )}

            {/* Charts Section */}
            <div ref={chartRef} className="grid lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 bg-[#333333] p-8 rounded-[2.5rem] border border-[#444444] shadow-xl h-[500px] flex flex-col">
                    <h3 className="text-xl font-black text-[#E2E8CE] mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#FF7F11]" /> Role Breakdown
                    </h3>
                    <div className="flex-1 relative">
                        <Bar data={barChartData} options={chartOptions} />
                    </div>
                </div>
                
                <div className="bg-[#333333] p-8 rounded-[2.5rem] border border-[#444444] shadow-xl h-[500px] flex flex-col justify-center items-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7F11]/10 rounded-full blur-[60px] pointer-events-none"></div>
                     <h3 className="text-xl font-black text-[#E2E8CE] mb-6 absolute top-8 left-8">Distribution</h3>
                     <div className="w-full h-full flex items-center justify-center p-4">
                        <Pie 
                            data={{
                                labels: Object.keys(salaryDb.reduce((a,r)=>({...a, [r.industry]: (a[r.industry]||0)+1}), {})),
                                datasets: [{
                                    data: Object.values(salaryDb.reduce((a,r)=>({...a, [r.industry]: (a[r.industry]||0)+1}), {})),
                                    backgroundColor: ["#ACBFA4", "#FF7F11", "#E2E8CE", "#666666", "#333333"],
                                    borderWidth: 0
                                }]
                            }} 
                            options={{...chartOptions, plugins: { legend: { position: 'bottom', labels: { color: '#ACBFA4', font: { size: 10, weight: 'bold' }, padding: 20, boxWidth: 10 } } } }} 
                        />
                     </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#333333] rounded-[2.5rem] border border-[#444444] shadow-xl overflow-hidden">
                <div className="p-8 border-b border-[#444444] flex items-center gap-3">
                    <TableIcon className="w-6 h-6 text-[#FF7F11]" />
                    <h3 className="text-xl font-black text-[#E2E8CE] tracking-tight">Raw Data</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[#ACBFA4]">
                        <thead className="bg-[#262626] text-[#E2E8CE] uppercase tracking-wider font-black text-xs">
                            <tr>
                                <th className="px-8 py-5">Company</th>
                                <th className="px-8 py-5">Role</th>
                                <th className="px-8 py-5">Industry</th>
                                <th className="px-8 py-5">YoE</th>
                                <th className="px-8 py-5">Location</th>
                                <th className="px-8 py-5 text-right">Total Comp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#444444]">
                            {filtered.map((r, i) => (
                                <tr key={i} className="hover:bg-[#262626] transition-colors">
                                    <td className="px-8 py-5 font-bold text-[#E2E8CE]">{r.company}</td>
                                    <td className="px-8 py-5">{r.role}</td>
                                    <td className="px-8 py-5">{r.industry}</td>
                                    <td className="px-8 py-5">{r.yoe} y</td>
                                    <td className="px-8 py-5">{r.loc}</td>
                                    <td className="px-8 py-5 text-right font-black text-[#FF7F11]">{(r.base + r.stock + r.bonus).toFixed(1)} {stats.unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-[#333333] p-6 rounded-[2rem] border border-[#444444] shadow-lg hover:border-[#FF7F11] transition-all group">
        <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#666666]">{label}</span>
            <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
        </div>
        <div className={`text-2xl font-black ${color} tracking-tight`}>{value}</div>
    </div>
);

const FactoryIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
)

export default SalaryInsights;