"""
API Client Example for PulseX AI Service
Demonstrates how to interact with the AI service endpoints
"""

import requests
import json
from pathlib import Path
from typing import Optional, Dict


class PulseXAIClient:
    """Client for interacting with PulseX AI Service"""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        """
        Initialize the AI service client
        
        Args:
            base_url: Base URL of the AI service
        """
        self.base_url = base_url.rstrip('/')
        
    def health_check(self) -> Dict:
        """
        Check if the service is healthy
        
        Returns:
            Health status dictionary
        """
        response = requests.get(f"{self.base_url}/health")
        response.raise_for_status()
        return response.json()
    
    def analyze_xray(self, image_path: str) -> Dict:
        """
        Analyze chest X-ray image
        
        Args:
            image_path: Path to X-ray image file
            
        Returns:
            Analysis results dictionary
        """
        with open(image_path, 'rb') as f:
            files = {'file': (Path(image_path).name, f, 'image/jpeg')}
            response = requests.post(
                f"{self.base_url}/api/xray/analyze",
                files=files
            )
        response.raise_for_status()
        return response.json()
    
    def analyze_lab_test(self, image_path: str) -> Dict:
        """
        Analyze lab test image using OCR
        
        Args:
            image_path: Path to lab test image file
            
        Returns:
            OCR and analysis results dictionary
        """
        with open(image_path, 'rb') as f:
            files = {'file': (Path(image_path).name, f, 'image/jpeg')}
            response = requests.post(
                f"{self.base_url}/api/lab-test/analyze",
                files=files
            )
        response.raise_for_status()
        return response.json()
    
    def get_recommendations(
        self, 
        xray_path: Optional[str] = None, 
        lab_test_path: Optional[str] = None
    ) -> Dict:
        """
        Get comprehensive health recommendations
        
        Args:
            xray_path: Optional path to X-ray image
            lab_test_path: Optional path to lab test image
            
        Returns:
            Comprehensive recommendations dictionary
        """
        files = {}
        
        if xray_path:
            with open(xray_path, 'rb') as f:
                files['xray_file'] = (Path(xray_path).name, f.read(), 'image/jpeg')
        
        if lab_test_path:
            with open(lab_test_path, 'rb') as f:
                files['lab_test_file'] = (Path(lab_test_path).name, f.read(), 'image/jpeg')
        
        response = requests.post(
            f"{self.base_url}/api/recommendations",
            files=files
        )
        response.raise_for_status()
        return response.json()


def print_results(title: str, results: Dict):
    """Pretty print results"""
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)
    print(json.dumps(results, indent=2))
    print()


def main():
    """Example usage of the AI service client"""
    
    # Initialize client
    client = PulseXAIClient()
    
    print("\n🏥 PulseX AI Service - Client Example\n")
    
    # 1. Health Check
    print("1️⃣  Testing Health Check...")
    try:
        health = client.health_check()
        print(f"✅ Service Status: {health['status']}")
        print(f"   X-ray Service: {health['services']['xray']}")
        print(f"   OCR Service: {health['services']['ocr']}")
    except Exception as e:
        print(f"❌ Health check failed: {str(e)}")
        print("   Make sure the server is running!")
        return
    
    # 2. X-ray Analysis Example
    print("\n2️⃣  X-ray Analysis Example:")
    print("   To analyze an X-ray, use:")
    print("   client.analyze_xray('test_images/chest_xray.jpg')")
    print("\n   Example code:")
    print("""
    try:
        result = client.analyze_xray('test_images/chest_xray.jpg')
        print(f"Prediction: {result['prediction']}")
        print(f"Confidence: {result['confidence']:.2%}")
        print(f"Risk Level: {result['risk_level']}")
        print("Recommendations:")
        for rec in result['recommendations']:
            print(f"  - {rec}")
    except FileNotFoundError:
        print("X-ray image not found. Add test images to test_images/")
    except Exception as e:
        print(f"Error: {str(e)}")
    """)
    
    # 3. Lab Test Analysis Example
    print("\n3️⃣  Lab Test Analysis Example:")
    print("   To analyze a lab test, use:")
    print("   client.analyze_lab_test('test_images/lab_test.jpg')")
    print("\n   Example code:")
    print("""
    try:
        result = client.analyze_lab_test('test_images/lab_test.jpg')
        print(f"Extracted Text: {result['extracted_text'][:100]}...")
        print(f"Parsed Values: {result['parsed_values']}")
        print(f"Risk Level: {result['risk_level']}")
        print("Recommendations:")
        for rec in result['recommendations']:
            print(f"  - {rec}")
    except FileNotFoundError:
        print("Lab test image not found. Add test images to test_images/")
    except Exception as e:
        print(f"Error: {str(e)}")
    """)
    
    # 4. Combined Recommendations Example
    print("\n4️⃣  Combined Recommendations Example:")
    print("   To get combined analysis, use:")
    print("   client.get_recommendations(")
    print("       xray_path='test_images/chest_xray.jpg',")
    print("       lab_test_path='test_images/lab_test.jpg'")
    print("   )")
    
    print("\n" + "="*60)
    print("📚 For full API documentation, visit:")
    print("   http://localhost:8000/docs")
    print("="*60 + "\n")


if __name__ == "__main__":
    main()
