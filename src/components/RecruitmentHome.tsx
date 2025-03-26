"use client"

import { JSX, ReactNode, useState } from "react"
import Head from "next/head"


type NextPageWithLayout<P = object> = {
  (props: P): JSX.Element
  getLayout?: (page: ReactNode) => ReactNode
}

// Custom SVG Icons
const UserIcon = () => (
  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Stat Card Component
const StatCard = ({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-md bg-blue-50 p-3">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
          <dd className="flex items-baseline">
            <div className="text-2xl font-semibold text-gray-900">{value}</div>
            <div
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? (
                <svg
                  className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="sr-only">{trend === "up" ? "Increased" : "Decreased"} by</span>
              {change}
            </div>
          </dd>
        </div>
      </div>
    </div>
  )
}

// Custom Bar Chart Component
const BarChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const maxValue = Math.max(...data.map((item) => item.value))
  const minValue = Math.min(...data.map((item) => item.value))
  const range = maxValue - minValue

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${data.length * 40} 250`} className="w-full h-full">
        {/* X-axis */}
        <line x1="20" y1="220" x2={data.length * 40 - 20} y2="220" stroke="#D1D5DB" strokeWidth="1" />
        
        {/* Y-axis */}
        <line x1="20" y1="20" x2="20" y2="220" stroke="#D1D5DB" strokeWidth="1" />
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <g key={ratio}>
            <text x="15" y={20 + (1 - ratio) * 200} textAnchor="end" fill="#6B7280" fontSize="12">
              {Math.round(minValue + range * ratio)}
            </text>
            <line x1="20" y1={20 + (1 - ratio) * 200} x2={data.length * 40 - 20} y2={20 + (1 - ratio) * 200} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2,2" />
          </g>
        ))}
        
        {/* Bars */}
        {data.map((item, index) => {
          const height = ((item.value - minValue) / range) * 180
          return (
            <g key={index} transform={`translate(${index * 40 + 30}, 0)`}>
              <rect
                y={220 - height}
                width="20"
                height={height}
                fill="#3B82F6"
                rx="2"
              />
              <text
                x="10"
                y="235"
                textAnchor="middle"
                fill="#6B7280"
                fontSize="10"
              >
                {item.label.split(' ')[0]}
              </text>
              <text
                x="10"
                y={210 - height}
                textAnchor="middle"
                fill="#111827"
                fontSize="10"
              >
                {item.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// Custom Pie Chart Component
const PieChart = ({ data }: { data: { label: string; value: number; color: string }[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercent = 0

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        {data.map((item, index) => {
          const percent = item.value / total
          const startX = 100 + 100 * Math.cos(2 * Math.PI * cumulativePercent)
          const startY = 100 + 100 * Math.sin(2 * Math.PI * cumulativePercent)
          cumulativePercent += percent
          const endX = 100 + 100 * Math.cos(2 * Math.PI * cumulativePercent)
          const endY = 100 + 100 * Math.sin(2 * Math.PI * cumulativePercent)

          // Large arc flag
          const largeArcFlag = percent > 0.5 ? 1 : 0

          const pathData = [
            `M 100 100`,
            `L ${startX} ${startY}`,
            `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 100 100`,
          ].join(' ')

          // Position for label
          const labelAngle = 2 * Math.PI * (cumulativePercent - percent / 2)
          const labelX = 100 + 60 * Math.cos(labelAngle)
          const labelY = 100 + 60 * Math.sin(labelAngle)

          return (
            <g key={index}>
              <path d={pathData} fill={item.color} />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
              >
                {Math.round(percent * 100)}%
              </text>
            </g>
          )
        })}
        <circle cx="100" cy="100" r="30" fill="white" />
        <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="#4B5563" fontSize="12">
          {total} Total
        </text>
      </svg>
      
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-1 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Recent Applications Table Component
const RecentApplicationsTable = () => {
  const applications = [
    { id: 1, name: "John Smith", position: "Frontend Developer", date: "2023-05-15", status: "Interview", stage: 3 },
    { id: 2, name: "Sarah Johnson", position: "UX Designer", date: "2023-05-14", status: "Screening", stage: 2 },
    { id: 3, name: "Michael Brown", position: "Backend Developer", date: "2023-05-13", status: "Applied", stage: 1 },
    { id: 4, name: "Emily Davis", position: "Product Manager", date: "2023-05-12", status: "Assessment", stage: 4 },
    { id: 5, name: "Robert Wilson", position: "DevOps Engineer", date: "2023-05-11", status: "Offer", stage: 5 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied": return "bg-blue-100 text-blue-800"
      case "Screening": return "bg-green-100 text-green-800"
      case "Interview": return "bg-amber-100 text-amber-800"
      case "Assessment": return "bg-indigo-100 text-indigo-800"
      case "Offer": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Candidate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Position
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Applied Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Stage
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                      <span className="text-sm font-medium text-gray-700">{app.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{app.name}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">{app.position}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-500">{new Date(app.date).toLocaleDateString()}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${(app.stage / 5) * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{app.stage}/5</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Dashboard Layout Component
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar would go here */}
      <div className="lg:pl-64">
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

const RecruitmentHome: NextPageWithLayout = () => {
    const [activeTab, setActiveTab] = useState("overview")

  // Sample data for charts
  const applicationData = [
    { label: "Jan 1", value: 45 },
    { label: "Jan 5", value: 38 },
    { label: "Jan 10", value: 52 },
    { label: "Jan 15", value: 61 },
    { label: "Jan 20", value: 49 },
    { label: "Jan 25", value: 65 },
    { label: "Jan 30", value: 87 },
    { label: "Feb 5", value: 91 },
    { label: "Feb 10", value: 72 },
    { label: "Feb 15", value: 64 },
    { label: "Feb 20", value: 55 },
    { label: "Feb 25", value: 67 },
  ]

  const pipelineData = [
    { label: "Applied", value: 400, color: "#3B82F6" },
    { label: "Screening", value: 250, color: "#10B981" },
    { label: "Interview", value: 150, color: "#F59E0B" },
    { label: "Assessment", value: 100, color: "#6366F1" },
    { label: "Offer", value: 50, color: "#8B5CF6" },
  ]

  return (
    <>
      <Head>
        <title>Recruitment Dashboard</title>
        <meta name="description" content="Monitor your recruitment pipeline and candidate applications" />
      </Head>

      <div className="px-4 py-6 sm:px-6 lg:px-8 bg-white">
        <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-500 flex items-center">
  {/* <Image src={logo} alt="Logo" width={40} height={40} /> */}
  <span className="ml-2">Recruitment Dashboard</span>
</h1>
          <p className="mt-1 text-sm text-gray-500">Monitor your recruitment pipeline and candidate applications</p>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("candidates")}
              className={`${
                activeTab === "candidates"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              Candidates
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`${
                activeTab === "jobs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              Jobs
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`${
                activeTab === "analytics"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Applications"
                value="2,853"
                change="+12.5%"
                trend="up"
                icon={<UserIcon />}
              />
              <StatCard
                title="Open Positions"
                value="42"
                change="+7"
                trend="up"
                icon={<BriefcaseIcon />}
              />
              <StatCard
                title="Time to Hire"
                value="28 days"
                change="-3 days"
                trend="down"
                icon={<ClockIcon />}
              />
              <StatCard
                title="Offer Acceptance"
                value="87%"
                change="+2.3%"
                trend="up"
                icon={<CheckCircleIcon />}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-7">
              <div className="lg:col-span-4">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Application Overview</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Application trends over the last 30 days</p>
                      </div>
                    </div>
                    <div className="mt-4 h-80">
                      <BarChart data={applicationData} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Candidate Pipeline</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Current candidates by stage</p>
                      </div>
                    </div>
                    <div className="mt-4 h-80">
                      <PieChart data={pipelineData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Applications</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Latest candidates who applied to your open positions
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <RecentApplicationsTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "candidates" && (
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-medium text-gray-900">Candidates</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your candidate pipeline</p>
            <div className="mt-4 h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Candidates content will appear here</p>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-medium text-gray-900">Jobs</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your job listings</p>
            <div className="mt-4 h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Jobs content will appear here</p>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-medium text-gray-900">Analytics</h2>
            <p className="mt-1 text-sm text-gray-500">Track your recruitment metrics</p>
            <div className="mt-4 h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Analytics content will appear here</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

RecruitmentHome.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default RecruitmentHome
