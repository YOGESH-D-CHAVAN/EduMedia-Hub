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
            labels: { color: "#475569", boxWidth: 10, padding: 20, font: { weight: 'bold', size: 10 } }
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#2563EB',
            bodyColor: '#1E3A8A',
            borderWidth: 1,
            borderColor: '#E2E8F0',
            padding: 12,
            cornerRadius: 8,
            titleFont: { size: 13, weight: 'bold' },
            bodyFont: { size: 12 }
        }
    },
    scales: {
        x: { 
            ticks: { color: "#64748B", font: { weight: 'bold' } },
            grid: { color: "rgba(68, 68, 68, 0.3)", drawBorder: false }
        },
        y: { 
            ticks: { color: "#64748B", font: { weight: 'bold' } },
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
        <Icon className="h-5 w-5 text-[#64748B] group-focus-within:text-[#2563EB] transition-colors" />
      </div>
      <input
        type="text"
        value={filters[k]}
        onChange={(e) => setFilters((f) => ({ ...f, [k]: e.target.value }))}
        className="block w-full pl-10 pr-3 py-3 border border-[#E2E8F0] rounded-xl leading-5 bg-[#FFFFFF] text-[#1E3A8A] placeholder-[#64748B] focus:outline-none focus:bg-[#F0F9FF] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] sm:text-sm transition-all shadow-inner font-medium"
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
        { label: "Base", data: labels.map(l => getAvg(grouped[l].base)), backgroundColor: "#475569", borderRadius: 4 },
        { label: "Stock", data: labels.map(l => getAvg(grouped[l].stock)), backgroundColor: "#2563EB", borderRadius: 4 },
        { label: "Bonus", data: labels.map(l => getAvg(grouped[l].bonus)), backgroundColor: "#1E3A8A", borderRadius: 4 },
      ],
    };
  }, [filtered]);

  const downloadPDF = async () => {
    const element = chartRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#F0F9FF" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Salary_Insights.pdf");
  };

  return (
    <div className="w-full bg-[#F0F9FF] text-[#1E3A8A] font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF] p-4 md:p-6 lg:p-12 relative min-h-screen">
       
        {/* Background Ambience */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
             <div className="absolute top-[-20%] left-[20%] w-[20rem] md:w-[50rem] h-[20rem] md:h-[50rem] bg-[#2563EB]/5 rounded-full blur-[80px] md:blur-[120px]"></div>
             <div className="absolute bottom-[-20%] right-[20%] w-[20rem] md:w-[50rem] h-[20rem] md:h-[50rem] bg-[#475569]/5 rounded-full blur-[80px] md:blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 border-b border-[#E2E8F0] pb-6 md:pb-8 gap-4 md:gap-6">
                <div>
                     <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] text-[#475569] font-bold text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4 shadow-md">
                        Market Intelligence
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-[#1E3A8A] tracking-tighter mb-2">Compensation <span className="text-[#2563EB]">Radar</span></h1>
                    <p className="text-[#475569] font-medium text-sm md:text-lg">Real-time salary data to empower your negotiations.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-8 md:mb-10 p-4 md:p-6 bg-[#FFFFFF] rounded-[1.5rem] md:rounded-[2rem] border border-[#E2E8F0] shadow-xl">
                 <FilterInput icon={Briefcase} k="company" placeholder="Company" filters={filters} setFilters={setFilters} />
                 <FilterInput icon={Code} k="role" placeholder="Role" filters={filters} setFilters={setFilters} />
                 <FilterInput icon={MapPin} k="loc" placeholder="Location" filters={filters} setFilters={setFilters} />
                 <FilterInput icon={Target} k="yoe" placeholder="Min YoE" filters={filters} setFilters={setFilters} />
                 <FilterInput icon={FactoryIcon} k="industry" placeholder="Industry" filters={filters} setFilters={setFilters} />
            </div>

            {/* Stats Grid */}
            {stats ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 mb-8 md:mb-12">
                     <StatCard label="Data Points" value={stats.count} icon={Users} color="text-[#475569]" />
                     <StatCard label="Average TC" value={stats.avg} icon={Sigma} color="text-[#2563EB]" />
                     <StatCard label="Median TC" value={stats.median} icon={Target} color="text-[#1E3A8A]" />
                     <StatCard label="Min TC" value={stats.min} icon={TrendingUp} color="text-[#64748B]" />
                     <StatCard label="Max TC" value={stats.max} icon={Zap} color="text-[#2563EB]" />
                </div>
            ) : (
                <div className="text-center py-12 md:py-20 border-2 border-dashed border-[#E2E8F0] rounded-[2rem] mb-12">
                    <Search className="w-10 h-10 md:w-12 md:h-12 text-[#64748B] mx-auto mb-4" />
                    <p className="text-[#475569] font-bold text-base md:text-lg">No data found matching criteria.</p>
                </div>
            )}

            {/* Charts Section */}
            <div ref={chartRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                <div className="lg:col-span-2 bg-[#FFFFFF] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-[#E2E8F0] shadow-xl h-[400px] md:h-[500px] flex flex-col">
                    <h3 className="text-lg md:text-xl font-black text-[#1E3A8A] mb-4 md:mb-6 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#2563EB]" /> Role Breakdown
                    </h3>
                    <div className="flex-1 relative w-full h-full">
                        <Bar data={barChartData} options={chartOptions} />
                    </div>
                </div>
                
                <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-[#E2E8F0] shadow-xl h-[400px] md:h-[500px] flex flex-col justify-center items-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/10 rounded-full blur-[60px] pointer-events-none"></div>
                     <h3 className="text-lg md:text-xl font-black text-[#1E3A8A] mb-6 absolute top-6 left-6 md:top-8 md:left-8">Distribution</h3>
                     <div className="w-full h-full flex items-center justify-center p-2 md:p-4">
                        <Pie 
                            data={{
                                labels: Object.keys(salaryDb.reduce((a,r)=>({...a, [r.industry]: (a[r.industry]||0)+1}), {})),
                                datasets: [{
                                    data: Object.values(salaryDb.reduce((a,r)=>({...a, [r.industry]: (a[r.industry]||0)+1}), {})),
                                    backgroundColor: ["#475569", "#2563EB", "#1E3A8A", "#64748B", "#FFFFFF"],
                                    borderWidth: 0
                                }]
                            }} 
                            options={{...chartOptions, plugins: { legend: { position: 'bottom', labels: { color: '#475569', font: { size: 10, weight: 'bold' }, padding: 20, boxWidth: 10 } } } }} 
                        />
                     </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#FFFFFF] rounded-[2rem] md:rounded-[2.5rem] border border-[#E2E8F0] shadow-xl overflow-hidden">
                <div className="p-6 md:p-8 border-b border-[#E2E8F0] flex items-center gap-3">
                    <TableIcon className="w-5 h-5 md:w-6 md:h-6 text-[#2563EB]" />
                    <h3 className="text-lg md:text-xl font-black text-[#1E3A8A] tracking-tight">Raw Data</h3>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-xs md:text-sm text-[#475569] min-w-[800px]">
                        <thead className="bg-[#F0F9FF] text-[#1E3A8A] uppercase tracking-wider font-black text-[10px] md:text-xs">
                            <tr>
                                <th className="px-6 py-4 md:px-8 md:py-5">Company</th>
                                <th className="px-6 py-4 md:px-8 md:py-5">Role</th>
                                <th className="px-6 py-4 md:px-8 md:py-5">Industry</th>
                                <th className="px-6 py-4 md:px-8 md:py-5">YoE</th>
                                <th className="px-6 py-4 md:px-8 md:py-5">Location</th>
                                <th className="px-6 py-4 md:px-8 md:py-5 text-right">Total Comp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0]">
                            {filtered.map((r, i) => (
                                <tr key={i} className="hover:bg-[#F0F9FF] transition-colors">
                                    <td className="px-6 py-4 md:px-8 md:py-5 font-bold text-[#1E3A8A]">{r.company}</td>
                                    <td className="px-6 py-4 md:px-8 md:py-5">{r.role}</td>
                                    <td className="px-6 py-4 md:px-8 md:py-5">{r.industry}</td>
                                    <td className="px-6 py-4 md:px-8 md:py-5">{r.yoe} y</td>
                                    <td className="px-6 py-4 md:px-8 md:py-5">{r.loc}</td>
                                    <td className="px-6 py-4 md:px-8 md:py-5 text-right font-black text-[#2563EB]">{(r.base + r.stock + r.bonus).toFixed(1)} {stats.unit}</td>
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
    <div className="bg-[#FFFFFF] p-6 rounded-[2rem] border border-[#E2E8F0] shadow-lg hover:border-[#2563EB] transition-all group">
        <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#64748B]">{label}</span>
            <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
        </div>
        <div className={`text-2xl font-black ${color} tracking-tight`}>{value}</div>
    </div>
);

const FactoryIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
)

export default SalaryInsights;