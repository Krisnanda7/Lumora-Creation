import {
  Reporter,
  TestCase,
  TestResult,
  Suite,
} from "@playwright/test/reporter";
import * as fs from "fs";
import * as path from "path";

interface TestData {
  testName: string;
  status: string;
  duration: number;
  error?: string;
}

export default class TableReporter implements Reporter {
  private testResults: TestData[] = [];
  private outputDir = "test-results";

  onBegin() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const testName = test.title;
    const status = result.status;
    const duration = result.duration;
    const error = result.error?.message;

    this.testResults.push({
      testName,
      status: status.charAt(0).toUpperCase() + status.slice(1),
      duration,
      error,
    });
  }

  onEnd() {
    this.generateTableReport();
    this.generateCSVReport();
  }

  private generateTableReport() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(
      (t) => t.status === "Passed",
    ).length;
    const failedTests = this.testResults.filter(
      (t) => t.status === "Failed",
    ).length;

    let htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Testing - Lumora Creation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        .header p {
            font-size: 14px;
            opacity: 0.9;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 30px;
            background: #f8f9fa;
            border-bottom: 2px solid #e9ecef;
        }
        .summary-card {
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .summary-card h3 {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .summary-card .value {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .total { color: #667eea; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .content {
            padding: 30px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th {
            background: #f8f9fa;
            color: #333;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #dee2e6;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        td {
            padding: 15px;
            border-bottom: 1px solid #dee2e6;
            font-size: 14px;
        }
        tr:hover {
            background: #f8f9fa;
        }
        .status {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status.passed {
            background: #d4edda;
            color: #155724;
        }
        .status.failed {
            background: #f8d7da;
            color: #721c24;
        }
        .duration {
            color: #666;
            font-weight: 500;
        }
        .error-message {
            color: #dc3545;
            font-size: 12px;
            max-width: 400px;
            word-wrap: break-word;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 2px solid #dee2e6;
        }
        .chart {
            display: flex;
            margin-bottom: 20px;
            border-radius: 8px;
            overflow: hidden;
            height: 30px;
            background: #e9ecef;
        }
        .chart-segment {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
        }
        .chart-passed { background: #28a745; }
        .chart-failed { background: #dc3545; }
        .no-data {
            text-align: center;
            padding: 40px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Laporan Testing Navigasi</h1>
            <p>Lumora Creation - Website Testing Report</p>
            <p>Generated: ${new Date().toLocaleString("id-ID")}</p>
        </div>

        <div class="summary">
            <div class="summary-card">
                <h3>Total Tests</h3>
                <div class="value total">${totalTests}</div>
            </div>
            <div class="summary-card">
                <h3>Passed ✓</h3>
                <div class="value passed">${passedTests}</div>
            </div>
            <div class="summary-card">
                <h3>Failed ✗</h3>
                <div class="value failed">${failedTests}</div>
            </div>
            <div class="summary-card">
                <h3>Success Rate</h3>
                <div class="value total">${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0}%</div>
            </div>
        </div>

        <div class="content">
            ${
              totalTests > 0
                ? `
            <h3 style="margin-bottom: 20px; color: #333;">Progress Chart</h3>
            <div class="chart">
                ${passedTests > 0 ? `<div class="chart-segment chart-passed" style="width: ${(passedTests / totalTests) * 100}%">${passedTests > 0 ? `${((passedTests / totalTests) * 100).toFixed(0)}%` : ""}</div>` : ""}
                ${failedTests > 0 ? `<div class="chart-segment chart-failed" style="width: ${(failedTests / totalTests) * 100}%">${failedTests > 0 ? `${((failedTests / totalTests) * 100).toFixed(0)}%` : ""}</div>` : ""}
            </div>
            `
                : ""
            }

            <h3 style="margin-top: 30px; margin-bottom: 20px; color: #333;">📋 Detail Test Results</h3>
            ${
              this.testResults.length > 0
                ? `
            <table>
                <thead>
                    <tr>
                        <th style="width: 40%;">Test Name</th>
                        <th style="width: 15%;">Status</th>
                        <th style="width: 15%;">Duration (ms)</th>
                        <th style="width: 30%;">Details</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.testResults
                      .map(
                        (test, index) => `
                    <tr>
                        <td><strong>#${index + 1} ${test.testName}</strong></td>
                        <td>
                            <span class="status ${test.status.toLowerCase()}">
                                ${test.status === "Passed" ? "✓" : "✗"} ${test.status}
                            </span>
                        </td>
                        <td><span class="duration">${test.duration}ms</span></td>
                        <td>
                            ${test.error ? `<span class="error-message">⚠️ ${test.error}</span>` : `<span style="color: #28a745;">✓ Success</span>`}
                        </td>
                    </tr>
                    `,
                      )
                      .join("")}
                </tbody>
            </table>
            `
                : `
            <div class="no-data">
                <p>Tidak ada data testing</p>
            </div>
            `
            }
        </div>

        <div class="footer">
            <p>✅ Report generated by Playwright Test Reporter</p>
            <p>Lumora Creation © 2024 - Automated Testing Suite</p>
        </div>
    </div>
</body>
</html>
    `;

    const reportPath = path.join(this.outputDir, "test-report-table.html");
    fs.writeFileSync(reportPath, htmlContent);
    console.log(`\n✅ Laporan tabel tersimpan di: ${reportPath}`);
  }

  private generateCSVReport() {
    const headers = ["No.", "Test Name", "Status", "Duration (ms)", "Error"];
    const rows = this.testResults.map((test, index) => [
      index + 1,
      test.testName,
      test.status,
      test.duration,
      test.error || "-",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => {
            // Escape quotes and wrap cells with commas
            const cellStr = String(cell).replace(/"/g, '""');
            return cellStr.includes(",") || cellStr.includes("\n")
              ? `"${cellStr}"`
              : cellStr;
          })
          .join(","),
      ),
    ].join("\n");

    const csvPath = path.join(this.outputDir, "test-report.csv");
    fs.writeFileSync(csvPath, csvContent);
    console.log(`✅ CSV Report tersimpan di: ${csvPath}`);
  }
}
