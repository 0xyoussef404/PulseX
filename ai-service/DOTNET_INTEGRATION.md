# .NET Integration Guide for PulseX AI Service

This guide shows how to integrate the PulseX AI Service with your .NET backend.

## Prerequisites

- .NET 6.0 or higher
- PulseX AI Service running (see QUICKSTART.md)

## Step 1: Create AI Service Client in .NET

### Install Required NuGet Packages

```bash
dotnet add package System.Net.Http.Json
dotnet add package Microsoft.Extensions.Http
```

### Create the Client Interface

```csharp
// IAIServiceClient.cs
using System.Threading.Tasks;

namespace PulseX.Services
{
    public interface IAIServiceClient
    {
        Task<XRayAnalysisResult> AnalyzeXRayAsync(byte[] imageBytes, string fileName);
        Task<LabTestAnalysisResult> AnalyzeLabTestAsync(byte[] imageBytes, string fileName);
        Task<ComprehensiveRecommendations> GetRecommendationsAsync(
            byte[] xrayBytes = null, 
            string xrayFileName = null,
            byte[] labTestBytes = null, 
            string labTestFileName = null
        );
        Task<HealthStatus> CheckHealthAsync();
    }
}
```

### Create the Client Implementation

```csharp
// AIServiceClient.cs
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace PulseX.Services
{
    public class AIServiceClient : IAIServiceClient
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<AIServiceClient> _logger;

        public AIServiceClient(HttpClient httpClient, ILogger<AIServiceClient> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<HealthStatus> CheckHealthAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("/health");
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadFromJsonAsync<HealthStatus>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Health check failed");
                throw;
            }
        }

        public async Task<XRayAnalysisResult> AnalyzeXRayAsync(byte[] imageBytes, string fileName)
        {
            try
            {
                using var content = new MultipartFormDataContent();
                var fileContent = new ByteArrayContent(imageBytes);
                fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
                content.Add(fileContent, "file", fileName);

                var response = await _httpClient.PostAsync("/api/xray/analyze", content);
                response.EnsureSuccessStatusCode();

                return await response.Content.ReadFromJsonAsync<XRayAnalysisResult>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "X-ray analysis failed for {FileName}", fileName);
                throw;
            }
        }

        public async Task<LabTestAnalysisResult> AnalyzeLabTestAsync(byte[] imageBytes, string fileName)
        {
            try
            {
                using var content = new MultipartFormDataContent();
                var fileContent = new ByteArrayContent(imageBytes);
                content.Add(fileContent, "file", fileName);

                var response = await _httpClient.PostAsync("/api/lab-test/analyze", content);
                response.EnsureSuccessStatusCode();

                return await response.Content.ReadFromJsonAsync<LabTestAnalysisResult>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lab test analysis failed for {FileName}", fileName);
                throw;
            }
        }

        public async Task<ComprehensiveRecommendations> GetRecommendationsAsync(
            byte[] xrayBytes = null, 
            string xrayFileName = null,
            byte[] labTestBytes = null, 
            string labTestFileName = null)
        {
            try
            {
                using var content = new MultipartFormDataContent();

                if (xrayBytes != null && !string.IsNullOrEmpty(xrayFileName))
                {
                    var xrayContent = new ByteArrayContent(xrayBytes);
                    xrayContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
                    content.Add(xrayContent, "xray_file", xrayFileName);
                }

                if (labTestBytes != null && !string.IsNullOrEmpty(labTestFileName))
                {
                    var labContent = new ByteArrayContent(labTestBytes);
                    content.Add(labContent, "lab_test_file", labTestFileName);
                }

                var response = await _httpClient.PostAsync("/api/recommendations", content);
                response.EnsureSuccessStatusCode();

                return await response.Content.ReadFromJsonAsync<ComprehensiveRecommendations>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Getting recommendations failed");
                throw;
            }
        }
    }
}
```

## Step 2: Create Response Models

```csharp
// Models/AIServiceModels.cs
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PulseX.Models
{
    public class HealthStatus
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("services")]
        public Dictionary<string, string> Services { get; set; }
    }

    public class XRayAnalysisResult
    {
        [JsonPropertyName("filename")]
        public string FileName { get; set; }

        [JsonPropertyName("prediction")]
        public string Prediction { get; set; }

        [JsonPropertyName("confidence")]
        public double Confidence { get; set; }

        [JsonPropertyName("probabilities")]
        public Dictionary<string, double> Probabilities { get; set; }

        [JsonPropertyName("risk_level")]
        public string RiskLevel { get; set; }

        [JsonPropertyName("recommendations")]
        public List<string> Recommendations { get; set; }
    }

    public class BloodPressure
    {
        [JsonPropertyName("systolic")]
        public int Systolic { get; set; }

        [JsonPropertyName("diastolic")]
        public int Diastolic { get; set; }
    }

    public class ParsedValues
    {
        [JsonPropertyName("total_cholesterol")]
        public double? TotalCholesterol { get; set; }

        [JsonPropertyName("ldl")]
        public double? Ldl { get; set; }

        [JsonPropertyName("hdl")]
        public double? Hdl { get; set; }

        [JsonPropertyName("triglycerides")]
        public double? Triglycerides { get; set; }

        [JsonPropertyName("blood_pressure")]
        public BloodPressure BloodPressure { get; set; }

        [JsonPropertyName("blood_sugar")]
        public double? BloodSugar { get; set; }

        [JsonPropertyName("heart_rate")]
        public double? HeartRate { get; set; }

        [JsonPropertyName("hemoglobin")]
        public double? Hemoglobin { get; set; }
    }

    public class Analysis
    {
        [JsonPropertyName("normal")]
        public List<string> Normal { get; set; }

        [JsonPropertyName("abnormal")]
        public List<string> Abnormal { get; set; }

        [JsonPropertyName("risk_factors")]
        public List<string> RiskFactors { get; set; }

        [JsonPropertyName("risk_level")]
        public string RiskLevel { get; set; }
    }

    public class LabTestAnalysisResult
    {
        [JsonPropertyName("filename")]
        public string FileName { get; set; }

        [JsonPropertyName("extracted_text")]
        public string ExtractedText { get; set; }

        [JsonPropertyName("parsed_values")]
        public ParsedValues ParsedValues { get; set; }

        [JsonPropertyName("analysis")]
        public Analysis Analysis { get; set; }

        [JsonPropertyName("risk_factors")]
        public List<string> RiskFactors { get; set; }

        [JsonPropertyName("risk_level")]
        public string RiskLevel { get; set; }

        [JsonPropertyName("recommendations")]
        public List<string> Recommendations { get; set; }

        [JsonPropertyName("confidence")]
        public double Confidence { get; set; }
    }

    public class ComprehensiveResults
    {
        [JsonPropertyName("xray")]
        public XRayAnalysisResult XRay { get; set; }

        [JsonPropertyName("lab_test")]
        public LabTestAnalysisResult LabTest { get; set; }
    }

    public class ComprehensiveRecommendations
    {
        [JsonPropertyName("risk_level")]
        public string RiskLevel { get; set; }

        [JsonPropertyName("recommendations")]
        public List<string> Recommendations { get; set; }

        [JsonPropertyName("results")]
        public ComprehensiveResults Results { get; set; }

        [JsonPropertyName("summary")]
        public string Summary { get; set; }
    }
}
```

## Step 3: Register the Service in Program.cs

```csharp
// Program.cs
using PulseX.Services;

var builder = WebApplication.CreateBuilder(args);

// Add HttpClient for AI Service
builder.Services.AddHttpClient<IAIServiceClient, AIServiceClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["AIService:BaseUrl"] ?? "http://localhost:8000");
    client.Timeout = TimeSpan.FromSeconds(60); // AI processing may take time
});

var app = builder.Build();
```

## Step 4: Configure appsettings.json

```json
{
  "AIService": {
    "BaseUrl": "http://localhost:8000"
  }
}
```

## Step 5: Use in Controllers

```csharp
// Controllers/MedicalRecordsController.cs
using Microsoft.AspNetCore.Mvc;
using PulseX.Services;
using System.Threading.Tasks;

namespace PulseX.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalRecordsController : ControllerBase
    {
        private readonly IAIServiceClient _aiService;
        private readonly ILogger<MedicalRecordsController> _logger;

        public MedicalRecordsController(
            IAIServiceClient aiService, 
            ILogger<MedicalRecordsController> logger)
        {
            _aiService = aiService;
            _logger = logger;
        }

        [HttpPost("upload-xray")]
        public async Task<IActionResult> UploadXRay(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            try
            {
                // Read file bytes
                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                var fileBytes = memoryStream.ToArray();

                // Analyze with AI service
                var result = await _aiService.AnalyzeXRayAsync(fileBytes, file.FileName);

                // Save to database (your logic here)
                // ...

                return Ok(new
                {
                    success = true,
                    analysis = result,
                    message = "X-ray uploaded and analyzed successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing X-ray");
                return StatusCode(500, "Error processing X-ray");
            }
        }

        [HttpPost("upload-lab-test")]
        public async Task<IActionResult> UploadLabTest(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            try
            {
                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                var fileBytes = memoryStream.ToArray();

                var result = await _aiService.AnalyzeLabTestAsync(fileBytes, file.FileName);

                return Ok(new
                {
                    success = true,
                    analysis = result,
                    message = "Lab test uploaded and analyzed successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing lab test");
                return StatusCode(500, "Error processing lab test");
            }
        }

        [HttpPost("comprehensive-analysis")]
        public async Task<IActionResult> GetComprehensiveAnalysis(
            IFormFile xrayFile = null, 
            IFormFile labTestFile = null)
        {
            if (xrayFile == null && labTestFile == null)
                return BadRequest("At least one file must be provided");

            try
            {
                byte[] xrayBytes = null;
                string xrayFileName = null;
                byte[] labTestBytes = null;
                string labTestFileName = null;

                if (xrayFile != null)
                {
                    using var ms = new MemoryStream();
                    await xrayFile.CopyToAsync(ms);
                    xrayBytes = ms.ToArray();
                    xrayFileName = xrayFile.FileName;
                }

                if (labTestFile != null)
                {
                    using var ms = new MemoryStream();
                    await labTestFile.CopyToAsync(ms);
                    labTestBytes = ms.ToArray();
                    labTestFileName = labTestFile.FileName;
                }

                var result = await _aiService.GetRecommendationsAsync(
                    xrayBytes, xrayFileName, 
                    labTestBytes, labTestFileName
                );

                return Ok(new
                {
                    success = true,
                    analysis = result,
                    message = "Comprehensive analysis completed"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in comprehensive analysis");
                return StatusCode(500, "Error processing analysis");
            }
        }
    }
}
```

## Step 6: Frontend Integration

Your React frontend can call the .NET endpoints:

```javascript
// Example: Upload X-ray from React
async function uploadXRay(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://your-api.com/api/medicalrecords/upload-xray', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const result = await response.json();
  return result;
}
```

## Architecture Overview

```
React Frontend
     ↓
.NET Backend API
     ↓
PulseX AI Service (Python/FastAPI)
     ↓
AI Models (DenseNet121, EasyOCR)
```

## Testing

```csharp
// Test the health check
var health = await _aiService.CheckHealthAsync();
Console.WriteLine($"AI Service Status: {health.Status}");
```

## Production Considerations

1. **Error Handling**: Implement retry logic and circuit breakers
2. **Caching**: Cache results for identical files
3. **Async Processing**: For large files, consider background processing
4. **Security**: Validate file types and sizes
5. **Monitoring**: Log all AI service calls for debugging

## Environment Variables

```bash
# Development
AIService__BaseUrl=http://localhost:8000

# Production
AIService__BaseUrl=https://ai-service.pulsex.com
```

---

For more information, see the main AI service README.md
