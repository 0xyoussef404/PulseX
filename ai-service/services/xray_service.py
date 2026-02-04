import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
from pathlib import Path
import io
import json

class XRayService:
    """Binary X-ray Classifier: Normal vs Abnormal (92.63% accuracy)"""
    
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = self._load_model()
        self.transform = self._get_transform()
        self.classes = ['abnormal', 'normal']
        self.metadata = self._load_metadata()
        
        print(f"✅ XRay Service initialized on {self.device}")
        print(f"   Model Accuracy: {self.metadata.get('accuracy', 0)*100:.2f}%")
    
    def _load_model(self):
        """Load trained binary classifier"""
        try:
            model = models.resnet50(pretrained=False)
            
            # Same architecture as training
            model.fc = nn.Sequential(
                nn.Dropout(0.5),
                nn.Linear(model.fc.in_features, 512),
                nn.ReLU(),
                nn.BatchNorm1d(512),
                nn.Dropout(0.4),
                nn.Linear(512, 256),
                nn.ReLU(),
                nn.BatchNorm1d(256),
                nn.Dropout(0.3),
                nn.Linear(256, 2)
            )
            
            model_path = Path(__file__).parent.parent / 'models' / 'xray_binary_model.pth'
            
            if model_path.exists():
                state_dict = torch.load(model_path, map_location=self.device)
                model.load_state_dict(state_dict)
                print(f"✅ Trained model loaded from {model_path}")
            else:
                raise FileNotFoundError(f"Model not found at {model_path}")
            
            model = model.to(self.device)
            model.eval()
            return model
            
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            raise
    
    def _load_metadata(self):
        """Load model metadata"""
        try:
            metadata_path = Path(__file__).parent.parent / 'models' / 'binary_metadata.json'
            if metadata_path.exists():
                with open(metadata_path, 'r') as f:
                    return json.load(f)
        except:
            pass
        return {'accuracy': 0.9263}  # Default from training
    
    def _get_transform(self):
        """Standard preprocessing - same as training validation"""
        return transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
    
    def analyze_xray(self, image_data, filename):
        """
        Binary X-ray classification
        
        Args:
            image_data: Image bytes or file path
            filename: Original filename
            
        Returns:
            Diagnosis with recommendations
        """
        try:
            # Load image
            if isinstance(image_data, bytes):
                image = Image.open(io.BytesIO(image_data)).convert('RGB')
            elif isinstance(image_data, str):
                image = Image.open(image_data).convert('RGB')
            else:
                raise ValueError("Invalid image format")
            
            # Predict
            image_tensor = self.transform(image).unsqueeze(0).to(self.device)
            
            with torch.no_grad():
                outputs = self.model(image_tensor)
                probabilities = torch.softmax(outputs, dim=1)
                confidence, predicted_idx = torch.max(probabilities, 1)
            
            predicted_idx = predicted_idx.item()
            predicted_class = self.classes[predicted_idx]
            confidence_score = confidence.item()
            
            # Binary diagnosis
            diagnosis = "Normal" if predicted_class == "normal" else "Abnormal"
            
            # Confidence level
            if confidence_score >= 0.90:
                conf_level = "High"
            elif confidence_score >= 0.75:
                conf_level = "Medium"
            else:
                conf_level = "Low"
            
            # Detailed probabilities
            normal_prob = probabilities[0][1].item()
            abnormal_prob = probabilities[0][0].item()
            
            # Generate recommendations
            recommendations = self._get_recommendations(diagnosis, confidence_score)
            
            return {
                "success": True,
                "diagnosis": diagnosis,
                "confidence": round(confidence_score * 100, 1),
                "confidence_level": conf_level,
                "probabilities": {
                    "normal": round(normal_prob * 100, 1),
                    "abnormal": round(abnormal_prob * 100, 1)
                },
                "model_accuracy": f"{self.metadata.get('accuracy', 0)*100:.1f}%",
                "recommendations": recommendations
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Analysis failed: {str(e)}",
                "diagnosis": None,
                "confidence": 0.0
            }
    
    def _get_recommendations(self, diagnosis, confidence):
        """Generate medical recommendations"""
        recs = []
        
        # Confidence warning
        if confidence < 0.75:
            recs.append("⚠️  CAUTION: Lower confidence - Radiologist review recommended")
        
        if diagnosis == "Normal":
            recs.append("✅ No significant abnormalities detected")
            recs.append("✅ Chest X-ray appears within normal limits")
            recs.append("📋 Continue routine health monitoring")
            recs.append("📋 Follow-up X-ray in 6-12 months if asymptomatic")
            recs.append("📋 Maintain healthy lifestyle and preventive care")
            
        else:  # Abnormal
            recs.append("🔴 ABNORMALITY DETECTED")
            recs.append("🔴 Immediate clinical correlation required")
            recs.append("🔴 Radiologist review mandatory")
            
            recs.append("\n📋 LIKELY FINDINGS:")
            recs.append("• Pneumonia or lung consolidation")
            recs.append("• Infectious/inflammatory process")
            recs.append("• Possible pleural involvement")
            
            recs.append("\n📋 RECOMMENDED ACTIONS:")
            recs.append("• Complete medical history and physical exam")
            recs.append("• Order: CBC, CRP, Blood cultures if febrile")
            recs.append("• Consider: Empirical antibiotic therapy")
            recs.append("• CT chest if diagnosis unclear")
            recs.append("• Follow-up CXR in 4-6 weeks")
            recs.append("• Pulmonology consult if severe")
        
        return recs