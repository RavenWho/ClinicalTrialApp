import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";


import { 
  FileText,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  PieChart,
  FileBarChart
} from 'lucide-react';
import { format } from 'date-fns';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  dateScope: string;
  lastGenerated: string | null;
  status: 'available' | 'pending' | 'empty';
}

const reportCards: ReportCard[] = [
  {
    id: 'budget-vs-actual',
    title: 'Budget vs Actual',
    description: 'Comprehensive comparison of budgeted costs against actual expenditures across all categories and time periods.',
    icon: <DollarSign className="h-5 w-5" />,
    dateScope: 'FY 2025 Q1-Q4',
    lastGenerated: '2025-11-01T10:30:00',
    status: 'available',
  },
  {
    id: 'forecast-snapshot',
    title: 'Forecast Snapshot',
    description: 'Executive summary of current forecasting models, predictions, and confidence intervals for all key trial metrics.',
    icon: <TrendingUp className="h-5 w-5" />,
    dateScope: 'Next 90 Days',
    lastGenerated: '2025-11-01T14:23:00',
    status: 'available',
  },
  {
    id: 'cost-breakdown',
    title: 'Cost Breakdown',
    description: 'Detailed analysis of costs by category, vendor, and site with month-over-month trends and variance analysis.',
    icon: <PieChart className="h-5 w-5" />,
    dateScope: 'Oct 2025 - Nov 2025',
    lastGenerated: '2025-10-31T16:45:00',
    status: 'available',
  },
  {
    id: 'recruitment-summary',
    title: 'Recruitment Summary',
    description: 'Participant enrollment metrics, site performance, and recruitment velocity trends with projections.',
    icon: <FileBarChart className="h-5 w-5" />,
    dateScope: 'All Time',
    lastGenerated: null,
    status: 'pending',
  },
  {
    id: 'trial-performance',
    title: 'Trial Performance Dashboard',
    description: 'Holistic view of trial health including timelines, milestones, risks, and overall progress against plan.',
    icon: <FileText className="h-5 w-5" />,
    dateScope: 'Q4 2025',
    lastGenerated: null,
    status: 'pending',
  },
  {
    id: 'compliance-audit',
    title: 'Compliance & Audit Trail',
    description: 'Regulatory compliance status, audit logs, and documentation completeness across all trial activities.',
    icon: <FileText className="h-5 w-5" />,
    dateScope: 'Last 12 Months',
    lastGenerated: null,
    status: 'pending',
  },
];

export function ReportsView() {
  const [hasGeneratedReports, setHasGeneratedReports] = useState(true);

  const handleExportPDF = (reportId: string, reportTitle: string) => {
    // Mock PDF export
    alert(`Generating PDF export for: ${reportTitle}`);
  };

  const handleExportExcel = (reportId: string, reportTitle: string) => {
    // Mock Excel export
    alert(`Generating Excel export for: ${reportTitle}`);
  };

  const handleExportCSV = (reportId: string, reportTitle: string) => {
    // Mock CSV export
    alert(`Generating CSV export for: ${reportTitle}`);
  };

  const handleGenerateReport = (reportId: string) => {
    alert(`Starting report generation for: ${reportId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'empty':
        return <Badge className="bg-gray-100 text-gray-800">Not Generated</Badge>;
      default:
        return null;
    }
  };

  // Empty state when no reports have been generated
  if (!hasGeneratedReports) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2">Reports</h2>
          <p className="text-gray-600">Generate and export comprehensive trial reports</p>
        </div>

        <Card>
          <CardContent className="py-16">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-6">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">No Reports Generated Yet</h3>
              <p className="text-sm text-gray-600 mb-6">
                Reports provide comprehensive analysis and documentation for your clinical trials. 
                Get started by exploring the available report types below.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
                <h4 className="text-sm text-gray-900 mb-3">Available Report Types:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>Budget vs Actual:</strong> Compare planned budgets with actual expenditures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>Forecast Snapshot:</strong> View predictive models and future projections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>Cost Breakdown:</strong> Analyze detailed cost structures by category and vendor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>Recruitment Summary:</strong> Track participant enrollment and site performance</span>
                  </li>
                </ul>
              </div>

              <Button onClick={() => setHasGeneratedReports(true)}>
                <FileText className="h-4 w-4 mr-2" />
                View Available Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Reports</h2>
        <p className="text-gray-600">Generate and export comprehensive trial reports</p>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCards.map((report) => (
          <Card key={report.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 rounded-lg bg-blue-50">
                  {report.icon}
                </div>
                {getStatusBadge(report.status)}
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription className="text-sm">
                {report.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{report.dateScope}</span>
                </div>
                
                {report.lastGenerated && (
                  <div className="text-xs text-gray-500">
                    Last generated: {format(new Date(report.lastGenerated), 'MMM dd, yyyy HH:mm')}
                  </div>
                )}
                
                {!report.lastGenerated && report.status === 'pending' && (
                  <div className="text-xs text-yellow-600">
                    Ready to generate
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {report.status === 'available' ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleExportPDF(report.id, report.title)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleExportExcel(report.id, report.title)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleExportCSV(report.id, report.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleGenerateReport(report.id)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Report Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-2 text-gray-900 mb-1">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>PDF Export</span>
              </div>
              <p className="text-xs text-gray-600">
                Formatted report with charts and visualizations, ideal for presentations and sharing.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-900 mb-1">
                <FileText className="h-4 w-4 text-green-600" />
                <span>Excel Export</span>
              </div>
              <p className="text-xs text-gray-600">
                Spreadsheet format with raw data and pivot tables for advanced analysis.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-900 mb-1">
                <FileText className="h-4 w-4 text-purple-600" />
                <span>CSV Export</span>
              </div>
              <p className="text-xs text-gray-600">
                Raw data format compatible with any data analysis tool or database.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default ReportsView;
