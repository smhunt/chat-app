# Ollama LLM Wrapper - Complete Implementation Guide 2025

## Executive Summary

After comprehensive research of open-source LLM wrapper projects in 2025, **Ollama** has been selected as the most active and suitable project for local deployment based on the following criteria:

- **GitHub Stars**: ~154,000 (highest among all LLM wrapper projects)
- **Latest Release**: v0.12.5 (October 16, 2025) - actively maintained
- **Community**: Highly active with continuous development
- **Local-First**: Designed specifically for local deployment without API keys
- **Cross-Platform**: Full support for macOS and Linux
- **Ease of Use**: Simple installation and intuitive API

---

## 1. Research Summary

### Top LLM Wrapper Projects Comparison

| Project | GitHub Stars | Latest Release | Local Support | Active Development | Focus Area |
|---------|-------------|----------------|---------------|-------------------|------------|
| **Ollama** | ~154,000 | Oct 16, 2025 | Excellent | Very Active | Local model hosting |
| LangChain | ~100,000 | Ongoing | Limited | Very Active | LLM orchestration |
| LlamaIndex | ~44,600 | Ongoing | Limited | Very Active | Data indexing/RAG |
| LocalAI | ~35,700 | May 12, 2025 | Excellent | Active | OpenAI alternative |
| LiteLLM | ~30,200 | Oct 21, 2025 | Partial | Very Active | Multi-provider proxy |
| Haystack | ~21,100 | Ongoing | Limited | Active | Search/RAG |

### Selection Rationale: Why Ollama?

1. **Highest Community Engagement**: With ~154,000 GitHub stars and 13,430 forks, Ollama has the largest community among local LLM tools
2. **Active Development**: Most recent release just days ago (October 16, 2025)
3. **True Local-First Design**: Unlike LangChain or LlamaIndex which primarily rely on API providers, Ollama is built from the ground up for local model hosting
4. **Zero API Keys Required**: Run powerful LLMs entirely offline with complete privacy
5. **Hardware Efficiency**: Optimized for consumer-grade hardware with support for CPU, NVIDIA, AMD, and Apple Silicon
6. **Developer-Friendly**: Simple API with Python, REST, and CLI interfaces
7. **Production-Ready**: Used by thousands of developers and organizations in production

---

## 2. System Requirements

### Minimum Requirements

#### macOS
- **OS Version**: macOS 11 Big Sur or later (macOS 12 Monterey+ recommended)
- **Processor**: Intel Core i5 or Apple M1 chip
- **RAM**: 8 GB minimum
- **Disk Space**: 1 GB for installation + storage for models (10-50 GB recommended)

#### Linux
- **OS**: 64-bit Linux distribution
- **Processor**: 64-bit processor with at least 4 cores
- **RAM**: 8 GB minimum
- **Disk Space**: 10-12 GB minimum (50+ GB recommended for multiple models)

### Recommended Configuration

#### For Best Performance
- **Processor**: 8+ cores (Apple M1 Pro/Max/M2/M3 or AMD Ryzen 7/9, Intel Core i7/i9)
- **RAM**: 16 GB for 7B parameter models, 32 GB for 13B+ models
- **Storage**: SSD with 50+ GB free space
- **GPU** (Optional but recommended):
  - NVIDIA GPU with 8+ GB VRAM (CUDA support)
  - AMD GPU with ROCm support
  - Apple Silicon (M1/M2/M3) with Metal acceleration

### Model Size vs RAM Requirements

| Model Size | Minimum RAM | Recommended RAM | Example Models |
|------------|-------------|-----------------|----------------|
| 3B params  | 8 GB        | 16 GB          | Phi-4, Gemma 2B |
| 7B params  | 16 GB       | 32 GB          | Llama 3.1, Mistral |
| 13B params | 32 GB       | 64 GB          | Llama 3.1 13B, Qwen |
| 70B+ params| 64 GB+      | 128 GB+        | Llama 3.1 70B |

---

## 3. Installation Guide

### Step 1: Install Ollama

#### macOS Installation

**Option A: Using Homebrew (Recommended)**
```bash
brew install ollama
```

**Option B: Using Official Installer**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Option C: Download from Website**
- Visit https://ollama.com/download
- Download the macOS installer
- Double-click the .dmg file and drag Ollama to Applications

#### Linux Installation

**Official Installation Script**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

This script will:
- Detect your system architecture
- Install required dependencies
- Set up GPU drivers (if available)
- Configure the Ollama service
- Start Ollama automatically

**Manual Installation (Advanced)**
```bash
# Download the binary
curl -L https://ollama.com/download/ollama-linux-amd64 -o ollama

# Make it executable
chmod +x ollama

# Move to system path
sudo mv ollama /usr/local/bin/

# Create service user
sudo useradd -r -s /bin/false -m -d /usr/share/ollama ollama

# Create systemd service
sudo nano /etc/systemd/system/ollama.service
```

Service file content:
```ini
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
ExecStart=/usr/local/bin/ollama serve
User=ollama
Group=ollama
Restart=always
RestartSec=3

[Install]
WantedBy=default.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable ollama
sudo systemctl start ollama
```

### Step 2: Verify Installation

```bash
# Check if Ollama is running
ollama --version

# Check service status (Linux)
systemctl status ollama

# Test the service
curl http://localhost:11434
```

Expected output: `Ollama is running`

### Step 3: Download Your First Model

```bash
# Download a small model for testing (Gemma 2B - ~1.7 GB)
ollama pull gemma:2b

# Or download a more capable model (Llama 3.1 8B - ~4.7 GB)
ollama pull llama3.1

# List installed models
ollama list
```

Popular models to try:
- `gemma:2b` - Fast, lightweight (1.7 GB)
- `llama3.1` - Balanced performance (4.7 GB)
- `mistral` - Excellent for general tasks (4.1 GB)
- `phi3` - Compact and efficient (2.3 GB)
- `deepseek-r1:7b` - Advanced reasoning (4.7 GB)

---

## 4. Configuration for Local Use

### Basic Configuration

Ollama works out-of-the-box with sensible defaults. Configuration is done via environment variables.

#### Key Environment Variables

```bash
# Change the host and port (default: 127.0.0.1:11434)
export OLLAMA_HOST=0.0.0.0:11434

# Set model storage location (default: ~/.ollama/models)
export OLLAMA_MODELS=/path/to/models

# Set number of parallel requests (default: 1)
export OLLAMA_NUM_PARALLEL=4

# Set maximum loaded models (default: 1)
export OLLAMA_MAX_LOADED_MODELS=3

# Enable debug logging
export OLLAMA_DEBUG=1

# GPU configuration (NVIDIA)
export CUDA_VISIBLE_DEVICES=0

# Set GPU layers (for partial GPU offloading)
export OLLAMA_GPU_LAYERS=35
```

#### Configuration File (Linux)

Edit `/etc/systemd/system/ollama.service`:

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_MODELS=/var/ollama/models"
Environment="OLLAMA_NUM_PARALLEL=4"
```

Then reload:
```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### Configuration (macOS via launchd)

Create `~/Library/LaunchAgents/com.ollama.ollama.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.ollama.ollama</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/ollama</string>
        <string>serve</string>
    </array>
    <key>EnvironmentVariables</key>
    <dict>
        <key>OLLAMA_HOST</key>
        <string>0.0.0.0:11434</string>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

Load the service:
```bash
launchctl load ~/Library/LaunchAgents/com.ollama.ollama.plist
```

### GPU Acceleration Configuration

#### NVIDIA GPU (Linux)

```bash
# Install NVIDIA drivers
sudo apt install nvidia-driver-545  # Ubuntu/Debian

# Verify CUDA
nvidia-smi

# Ollama automatically detects and uses CUDA
```

#### AMD GPU (Linux)

```bash
# Install ROCm
# Follow AMD ROCm installation guide for your distribution

# Set environment variable
export HSA_OVERRIDE_GFX_VERSION=10.3.0  # Adjust for your GPU
```

#### Apple Silicon (macOS)

No configuration needed - Ollama automatically uses Metal acceleration on M1/M2/M3 chips.

### Advanced Model Configuration

Create a custom Modelfile for fine-tuned behavior:

```bash
# Create a custom model configuration
cat > Modelfile << EOF
FROM llama3.1

# Set temperature (creativity) - 0.0 to 1.0
PARAMETER temperature 0.7

# Set context window size
PARAMETER num_ctx 4096

# Set top-p sampling
PARAMETER top_p 0.9

# Set system prompt
SYSTEM You are a helpful AI assistant specialized in software development.
EOF

# Create the custom model
ollama create my-dev-assistant -f Modelfile
```

---

## 5. Usage Examples

### 5.1 Command Line Interface

#### Basic Chat

```bash
# Start an interactive chat session
ollama run llama3.1

# Chat with a specific model
ollama run mistral

# One-shot question
ollama run llama3.1 "Explain quantum computing in simple terms"
```

#### Model Management

```bash
# List all installed models
ollama list

# Show model details
ollama show llama3.1

# Delete a model
ollama rm gemma:2b

# Pull a specific version
ollama pull llama3.1:70b

# Copy a model
ollama cp llama3.1 my-llama-backup
```

### 5.2 Python API

#### Installation

```bash
pip install ollama
```

#### Basic Examples

**Simple Chat**

```python
import ollama

# Simple chat interaction
response = ollama.chat(
    model='llama3.1',
    messages=[
        {
            'role': 'user',
            'content': 'Why is the sky blue?'
        }
    ]
)

print(response['message']['content'])
```

**Streaming Responses**

```python
import ollama

# Stream responses for longer outputs
stream = ollama.chat(
    model='llama3.1',
    messages=[
        {
            'role': 'user',
            'content': 'Write a short story about AI'
        }
    ],
    stream=True
)

for chunk in stream:
    print(chunk['message']['content'], end='', flush=True)
```

**Conversation with Context**

```python
import ollama

messages = [
    {'role': 'system', 'content': 'You are a helpful coding assistant.'},
    {'role': 'user', 'content': 'How do I reverse a string in Python?'}
]

response = ollama.chat(model='llama3.1', messages=messages)
print(response['message']['content'])

# Continue the conversation
messages.append(response['message'])
messages.append({'role': 'user', 'content': 'Can you show me a more efficient way?'})

response = ollama.chat(model='llama3.1', messages=messages)
print(response['message']['content'])
```

**Generate Function (Simple Completion)**

```python
import ollama

response = ollama.generate(
    model='llama3.1',
    prompt='What is quantum computing?'
)

print(response['response'])
```

**Async Support**

```python
import asyncio
import ollama

async def chat_async():
    response = await ollama.AsyncClient().chat(
        model='llama3.1',
        messages=[
            {'role': 'user', 'content': 'Tell me a joke'}
        ]
    )
    print(response['message']['content'])

asyncio.run(chat_async())
```

### 5.3 REST API

#### Basic Request

```bash
# Generate a response
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1",
  "prompt": "What is the meaning of life?",
  "stream": false
}'
```

#### Chat Endpoint

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.1",
  "messages": [
    {
      "role": "user",
      "content": "Hello! How are you?"
    }
  ],
  "stream": false
}'
```

#### Python with Requests

```python
import requests
import json

url = "http://localhost:11434/api/chat"
data = {
    "model": "llama3.1",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Explain machine learning briefly."
        }
    ],
    "stream": False
}

response = requests.post(url, json=data)
result = response.json()
print(result['message']['content'])
```

### 5.4 Advanced Use Cases

#### RAG (Retrieval-Augmented Generation) Example

```python
import ollama

def rag_query(context: str, question: str, model: str = "llama3.1"):
    """
    Simple RAG implementation using Ollama
    """
    prompt = f"""
    Context: {context}

    Question: {question}

    Please answer the question based only on the context provided above.
    """

    response = ollama.generate(model=model, prompt=prompt)
    return response['response']

# Example usage
context = """
Ollama is a tool that allows you to run large language models locally.
It supports models like Llama, Mistral, and Gemma.
Models are stored in ~/.ollama/models by default.
"""

answer = rag_query(
    context=context,
    question="Where does Ollama store models by default?"
)
print(answer)
```

#### Multi-Turn Conversation Manager

```python
import ollama
from typing import List, Dict

class ConversationManager:
    def __init__(self, model: str = "llama3.1", system_prompt: str = None):
        self.model = model
        self.messages: List[Dict] = []

        if system_prompt:
            self.messages.append({
                'role': 'system',
                'content': system_prompt
            })

    def chat(self, user_message: str, stream: bool = False) -> str:
        """Send a message and get a response"""
        self.messages.append({
            'role': 'user',
            'content': user_message
        })

        response = ollama.chat(
            model=self.model,
            messages=self.messages,
            stream=stream
        )

        if stream:
            full_response = ""
            for chunk in response:
                content = chunk['message']['content']
                print(content, end='', flush=True)
                full_response += content
            print()  # New line

            self.messages.append({
                'role': 'assistant',
                'content': full_response
            })
            return full_response
        else:
            assistant_message = response['message']['content']
            self.messages.append(response['message'])
            return assistant_message

    def reset(self):
        """Clear conversation history"""
        self.messages = [msg for msg in self.messages if msg['role'] == 'system']

# Usage
conv = ConversationManager(
    model="llama3.1",
    system_prompt="You are a Python programming expert."
)

print(conv.chat("What is a list comprehension?"))
print(conv.chat("Can you show me an example?"))
print(conv.chat("How is it different from a for loop?"))
```

#### Code Generation with Validation

```python
import ollama
import subprocess

def generate_python_code(task: str, model: str = "llama3.1") -> str:
    """Generate Python code for a given task"""
    prompt = f"""
    Write Python code to accomplish the following task:
    {task}

    Return only the Python code, no explanations.
    """

    response = ollama.generate(model=model, prompt=prompt)
    code = response['response']

    # Extract code block if wrapped in markdown
    if "```python" in code:
        code = code.split("```python")[1].split("```")[0].strip()
    elif "```" in code:
        code = code.split("```")[1].split("```")[0].strip()

    return code

def validate_python_syntax(code: str) -> bool:
    """Check if Python code has valid syntax"""
    try:
        compile(code, '<string>', 'exec')
        return True
    except SyntaxError:
        return False

# Example
task = "Create a function that returns the fibonacci sequence up to n terms"
code = generate_python_code(task)

if validate_python_syntax(code):
    print("Generated valid Python code:")
    print(code)
else:
    print("Generated code has syntax errors")
```

---

## 6. Troubleshooting

### Common Issues and Solutions

#### Issue 1: Port 11434 Already in Use

**Error**: `Error: listen tcp 127.0.0.1:11434: bind: address already in use`

**Solutions**:

```bash
# Find what's using the port
sudo lsof -i :11434

# Kill the process
kill -9 <PID>

# OR change Ollama's port
export OLLAMA_HOST=localhost:11435
ollama serve
```

#### Issue 2: GPU Not Detected (NVIDIA)

**Error**: `CUDA initialization error` or `No GPU detected`

**Diagnostic Steps**:

```bash
# Check NVIDIA drivers
nvidia-smi

# Check CUDA version
nvcc --version

# Check Ollama logs
journalctl -u ollama -f  # Linux
```

**Solutions**:

```bash
# Install/Update NVIDIA drivers
sudo apt update
sudo apt install nvidia-driver-545

# Verify CUDA libraries
ldconfig -p | grep cuda

# Restart Ollama service
sudo systemctl restart ollama

# Set diagnostic level
export CUDA_ERROR_LEVEL=50
ollama serve
```

#### Issue 3: Out of Memory Errors

**Error**: `failed to load model: insufficient memory`

**Solutions**:

1. **Use a smaller model**:
```bash
ollama pull gemma:2b  # Instead of larger models
```

2. **Use quantized models**:
```bash
ollama pull llama3.1:8b-instruct-q4_0  # 4-bit quantization
```

3. **Reduce context window**:
```bash
# Create Modelfile with smaller context
cat > Modelfile << EOF
FROM llama3.1
PARAMETER num_ctx 2048
EOF

ollama create llama3.1-small -f Modelfile
```

4. **Enable partial GPU offloading**:
```bash
export OLLAMA_GPU_LAYERS=20  # Offload only 20 layers
```

#### Issue 4: Slow Performance

**Diagnostic**:

```bash
# Check if GPU is being used
nvidia-smi  # Should show ollama process

# Check system resources
htop
```

**Solutions**:

1. **Ensure GPU acceleration is enabled** (see GPU configuration above)

2. **Use appropriate model size** for your hardware

3. **Adjust parallel requests**:
```bash
export OLLAMA_NUM_PARALLEL=1  # Reduce if memory-constrained
```

4. **Use quantized models**:
```bash
ollama pull llama3.1:8b-instruct-q4_0
```

5. **Increase cache size**:
```bash
# In Modelfile
PARAMETER num_thread 8  # Match your CPU cores
```

#### Issue 5: Model Download Fails

**Error**: `error pulling model: connection timeout`

**Solutions**:

```bash
# Try with explicit model tag
ollama pull llama3.1:latest

# Check network connectivity
curl -I https://ollama.com

# Use a mirror (if available in your region)
export OLLAMA_MIRROR=https://mirror.ollama.com

# Resume interrupted download
ollama pull llama3.1  # Will resume if partial download exists
```

#### Issue 6: Connection Refused

**Error**: `Error: connect: connection refused`

**Solutions**:

```bash
# Check if Ollama service is running
systemctl status ollama  # Linux
ps aux | grep ollama     # macOS

# Start the service
systemctl start ollama              # Linux
ollama serve &                      # macOS (background)

# Check firewall (Linux)
sudo ufw allow 11434/tcp

# Verify listening
netstat -tlnp | grep 11434
```

#### Issue 7: Apple Silicon Performance Issues

**Problem**: Slow performance on M1/M2/M3 Macs

**Solutions**:

1. **Ensure latest version**: Ollama v0.8.0+ has improved Metal support
```bash
brew upgrade ollama
```

2. **Check unified memory allocation**:
- Close other memory-intensive apps
- Use Activity Monitor to check available memory

3. **Use optimized models**:
```bash
# Models optimized for Apple Silicon
ollama pull llama3.1  # Automatically uses Metal-optimized version
```

### Diagnostic Commands Reference

```bash
# System info
ollama show --modelfile llama3.1

# Test API endpoint
curl http://localhost:11434/api/tags

# Check running models
curl http://localhost:11434/api/ps

# View logs (Linux)
journalctl -u ollama -n 100 -f

# View logs (macOS)
log stream --predicate 'process == "ollama"' --level debug

# Memory usage
ollama ps

# Test model performance
time ollama run llama3.1 "Count to 10"
```

---

## 7. Best Practices

### Performance Optimization

#### 1. Choose the Right Model for Your Hardware

```python
# Hardware-to-Model mapping guide
hardware_recommendations = {
    "8GB RAM": ["gemma:2b", "phi3:mini"],
    "16GB RAM": ["llama3.1:8b", "mistral:7b", "gemma:7b"],
    "32GB RAM": ["llama3.1:13b", "mixtral:8x7b"],
    "64GB+ RAM": ["llama3.1:70b", "qwen2.5:72b"]
}
```

#### 2. Use Quantization Appropriately

| Quantization | Quality | Speed | Memory | Use Case |
|--------------|---------|-------|--------|----------|
| Q2_K | 70% | Fastest | Minimal | Testing/prototyping |
| Q4_0 | 85% | Fast | Low | General use (recommended) |
| Q4_K_M | 90% | Medium | Medium | Balanced quality/performance |
| Q5_K_M | 95% | Slow | High | High-quality tasks |
| Q8_0 | 99% | Slowest | Highest | Maximum quality |

```bash
# Pull specific quantization
ollama pull llama3.1:8b-instruct-q4_0  # 4-bit (recommended)
ollama pull llama3.1:8b-instruct-q8_0  # 8-bit (higher quality)
```

#### 3. Optimize Context Window

```python
# Adjust context based on use case
use_cases = {
    "short_qa": 1024,        # Quick questions
    "chat": 2048,            # Normal chat
    "document_analysis": 4096,  # RAG, summaries
    "code_generation": 8192,    # Complex coding tasks
}

# In Modelfile
# PARAMETER num_ctx 2048
```

#### 4. Batch Processing for Efficiency

```python
import ollama
from concurrent.futures import ThreadPoolExecutor

def process_batch(prompts: list, model: str = "llama3.1", max_workers: int = 3):
    """Process multiple prompts efficiently"""

    def generate_single(prompt):
        return ollama.generate(model=model, prompt=prompt)

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(generate_single, prompts))

    return [r['response'] for r in results]

# Example
prompts = [
    "What is Python?",
    "Explain machine learning",
    "What is a neural network?"
]

responses = process_batch(prompts)
```

### Security Best Practices

#### 1. Restrict Network Access

```bash
# Bind to localhost only (default)
export OLLAMA_HOST=127.0.0.1:11434

# If you need remote access, use authentication proxy
# (Ollama doesn't have built-in auth - use nginx/Caddy)
```

#### 2. Resource Limits (Linux systemd)

```ini
# /etc/systemd/system/ollama.service
[Service]
MemoryMax=16G
CPUQuota=400%
Nice=19
```

#### 3. Model Validation

```python
import ollama

def validate_model(model_name: str) -> bool:
    """Check if model is installed and valid"""
    try:
        models = ollama.list()
        return any(m['name'] == model_name for m in models['models'])
    except Exception as e:
        print(f"Error validating model: {e}")
        return False

# Use before running
if validate_model("llama3.1"):
    response = ollama.generate(model="llama3.1", prompt="test")
```

### Production Deployment

#### 1. Use Systemd for Auto-Restart

```ini
[Service]
Restart=always
RestartSec=3
StartLimitBurst=5
StartLimitIntervalSec=60
```

#### 2. Monitor Resource Usage

```python
import ollama
import psutil

def get_resource_usage():
    """Monitor Ollama resource usage"""
    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()

    return {
        "cpu_percent": cpu,
        "memory_used_gb": memory.used / (1024**3),
        "memory_available_gb": memory.available / (1024**3)
    }

# Check before making requests
resources = get_resource_usage()
if resources["memory_available_gb"] < 2:
    print("Warning: Low memory available")
```

#### 3. Implement Timeout Handling

```python
import ollama
import signal
from contextlib import contextmanager

class TimeoutException(Exception):
    pass

@contextmanager
def timeout(seconds):
    def timeout_handler(signum, frame):
        raise TimeoutException()

    original_handler = signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(seconds)
    try:
        yield
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, original_handler)

# Use with timeout
try:
    with timeout(30):  # 30 second timeout
        response = ollama.generate(model="llama3.1", prompt="Long task...")
except TimeoutException:
    print("Request timed out")
```

### Model Management

#### 1. Regular Cleanup

```bash
# List all models with sizes
ollama list

# Remove unused models
ollama rm old-model:tag

# Prune unused model data
rm -rf ~/.ollama/models/.cache
```

#### 2. Version Control for Custom Models

```bash
# Save Modelfile to version control
git add Modelfile
git commit -m "Add custom model configuration"

# Recreate on new system
ollama create my-model -f Modelfile
```

---

## 8. Quick Reference

### Essential Commands

```bash
# Installation
curl -fsSL https://ollama.com/install.sh | sh

# Start service
ollama serve

# Pull model
ollama pull llama3.1

# Run chat
ollama run llama3.1

# List models
ollama list

# Show model info
ollama show llama3.1

# Remove model
ollama rm llama3.1

# Check version
ollama --version
```

### Python Quick Start

```python
import ollama

# Simple generation
response = ollama.generate(model='llama3.1', prompt='Hello!')
print(response['response'])

# Chat
response = ollama.chat(
    model='llama3.1',
    messages=[{'role': 'user', 'content': 'Hi!'}]
)
print(response['message']['content'])

# List models
models = ollama.list()
print(models)
```

### Common Model Tags

- `latest` - Most recent version
- `8b` - 8 billion parameter version
- `70b` - 70 billion parameter version
- `q4_0` - 4-bit quantization
- `q8_0` - 8-bit quantization
- `instruct` - Instruction-tuned variant

### Useful Environment Variables

```bash
export OLLAMA_HOST=0.0.0.0:11434          # Network binding
export OLLAMA_MODELS=/path/to/models      # Model storage
export OLLAMA_NUM_PARALLEL=4              # Parallel requests
export OLLAMA_MAX_LOADED_MODELS=3         # Cached models
export OLLAMA_DEBUG=1                     # Debug logging
export OLLAMA_GPU_LAYERS=35               # GPU layer offloading
```

---

## 9. Additional Resources

### Official Documentation
- Website: https://ollama.com
- GitHub: https://github.com/ollama/ollama
- Documentation: https://github.com/ollama/ollama/tree/main/docs
- Model Library: https://ollama.com/library

### Community
- Discord: https://discord.gg/ollama
- GitHub Discussions: https://github.com/ollama/ollama/discussions
- Reddit: r/ollama

### Related Tools
- **Open WebUI**: Web interface for Ollama (https://github.com/open-webui/open-webui)
- **Ollama Python Library**: Official Python SDK (https://github.com/ollama/ollama-python)
- **LangChain Ollama Integration**: For complex workflows
- **LlamaIndex Ollama**: For RAG applications

### Model Sources
- Hugging Face: https://huggingface.co/models
- Ollama Library: https://ollama.com/library
- Model Cards: Check each model's page for capabilities and benchmarks

---

## Conclusion

Ollama stands out as the most active and production-ready open-source LLM wrapper for local deployment in 2025. With its:

- **Massive community** (~154,000 GitHub stars)
- **Active development** (latest release October 2025)
- **True local-first architecture** (no API keys needed)
- **Excellent hardware support** (CPU, NVIDIA, AMD, Apple Silicon)
- **Simple yet powerful API** (CLI, Python, REST)
- **Production-ready features** (streaming, multi-model, quantization)

Ollama enables developers and organizations to deploy powerful AI capabilities entirely on-premises with complete privacy and control.

This guide provides everything needed to get started with Ollama, from basic installation to advanced production deployment. Start with a simple model like `gemma:2b` or `llama3.1`, experiment with the examples, and scale up based on your requirements.

---

**Last Updated**: October 22, 2025
**Ollama Version**: v0.12.5
**Guide Version**: 1.0
