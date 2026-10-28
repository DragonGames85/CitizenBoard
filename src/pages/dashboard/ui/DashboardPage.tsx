import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { buildDashboardStats, useCitizenStore } from '@/entities/citizen';

import { Panel } from '@/shared/ui/Panel';

const StatsColors = {
    stroke: '#1e293b',
    stroke2: '#94a3b8',
    barFill: '#22d3ee',
    nationalityBar: '#a3e635',
};

const tooltipStyle = {
    background: '#111827',
    border: '1px solid #1e293b',
    borderRadius: 8,
};

export function DashboardPage() {
    const citizens = useCitizenStore(state => state.citizens);
    const stats = buildDashboardStats(citizens);

    const headerStats = [
        { label: 'Всего граждан', value: stats.total, tone: 'text-neon' },
        { label: 'Работают', value: stats.employed, tone: 'text-lime' },
        { label: 'Безработные', value: stats.unemployed, tone: 'text-danger' },
        { label: 'С членами семьи', value: stats.withFamily, tone: 'text-main' },
    ];

    return (
        <div className="space-y-4">
            <header>
                <h1 className="text-main text-2xl font-medium">Dashboard</h1>
                <p className="text-secondary mt-1 text-sm">Статистика граждан</p>
            </header>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ключевые показатели">
                {headerStats.map(item => (
                    <article key={item.label} className="border-line bg-panel rounded-lg border px-4 py-4">
                        <h2 className="text-secondary text-xs uppercase">{item.label}</h2>
                        <p className={`mt-2 text-3xl font-medium ${item.tone}`}>{item.value.toLocaleString('ru-RU')}</p>
                    </article>
                ))}
            </section>

            <div className="grid gap-4 xl:grid-cols-2">
                <Panel title="Занятость">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.employmentChart}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={55}
                                    outerRadius={90}
                                    paddingAngle={3}
                                >
                                    {stats.employmentChart.map(item => (
                                        <Cell key={item.name} fill={item.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={tooltipStyle} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Panel>

                <Panel title="Возрастной рейтинг">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.ageChart}>
                                <CartesianGrid stroke={StatsColors.stroke} strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke={StatsColors.stroke2} fontSize={12} />
                                <YAxis stroke={StatsColors.stroke2} fontSize={12} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Bar dataKey="value" fill={StatsColors.barFill} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Panel>

                <Panel title="Гражданство">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.nationalityChart} layout="vertical" margin={{ left: 24 }}>
                                <CartesianGrid stroke={StatsColors.stroke} strokeDasharray="3 3" />
                                <XAxis type="number" stroke={StatsColors.stroke2} fontSize={12} />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    stroke={StatsColors.stroke2}
                                    fontSize={12}
                                    width={110}
                                />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Bar dataKey="value" fill={StatsColors.nationalityBar} radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Panel>

                <Panel title="Пол">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.genderChart}>
                                <CartesianGrid stroke={StatsColors.stroke} strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke={StatsColors.stroke2} fontSize={12} />
                                <YAxis stroke={StatsColors.stroke2} fontSize={12} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Bar dataKey="value" fill={StatsColors.barFill} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Panel>
            </div>
        </div>
    );
}
