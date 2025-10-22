# LLM Wrapper Research Project - Ollama Implementation

## Overview

This repository contains comprehensive research and implementation guidance for **Ollama**, the most active open-source LLM wrapper project as of October 2025.

## What is Ollama?

Ollama is a tool that allows you to run large language models (LLMs) locally on your own hardware without requiring API keys or internet connectivity. With ~154,000 GitHub stars and active development, it's the leading solution for local AI deployment.

## Repository Contents

### 📚 Documentation
- **[OLLAMA_IMPLEMENTATION_GUIDE.md](./OLLAMA_IMPLEMENTATION_GUIDE.md)** - Complete implementation guide including:
  - Research summary and project comparison
  - System requirements
  - Installation instructions (macOS & Linux)
  - Configuration guide
  - Troubleshooting section
  - Best practices

### 💻 Working Examples
- **[ollama-examples/](./ollama-examples/)** - Ready-to-run Python scripts:
  - `01_basic_chat.py` - Simple chat interaction
  - `02_streaming_chat.py` - Streaming responses
  - `03_conversation_manager.py` - Multi-turn conversations
  - `04_rag_example.py` - RAG (Retrieval-Augmented Generation)
  - `05_async_example.py` - Async/concurrent processing
  - `06_model_comparison.py` - Compare different models

## Quick Start

### 1. Install Ollama

**macOS:**
```bash
brew install ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Start Ollama

```bash
ollama serve
```

### 3. Download a Model

```bash
# Small, fast model (~1.7 GB)
ollama pull gemma:2b

# Or more capable model (~4.7 GB)
ollama pull llama3.1
```

### 4. Try the Examples

```bash
# Install Python dependencies
cd ollama-examples
pip install -r requirements.txt

# Run basic example
python 01_basic_chat.py
```

## Why Ollama?

After evaluating major LLM wrapper projects (LangChain, LlamaIndex, Haystack, LocalAI, LiteLLM, etc.), Ollama was selected because:

| Criteria | Ollama | Others |
|----------|--------|--------|
| **GitHub Stars** | ~154,000 | 20k-100k |
| **Local-First** | ✅ Designed for it | ⚠️ Primarily API-focused |
| **API Keys Required** | ❌ No | ✅ Yes (for most features) |
| **Latest Activity** | Oct 16, 2025 | Varies |
| **Hardware Support** | CPU, NVIDIA, AMD, Apple Silicon | Limited |
| **Ease of Use** | Simple CLI + API | Complex setup |

## Key Features

- **100% Local** - No internet required, complete privacy
- **No API Keys** - No costs, no rate limits
- **Cross-Platform** - macOS, Linux, Windows
- **GPU Accelerated** - NVIDIA CUDA, AMD ROCm, Apple Metal
- **Multiple Models** - Llama, Mistral, Gemma, Phi, and more
- **Simple API** - CLI, Python, REST, JavaScript
- **Active Community** - 154k+ stars, constant updates

## System Requirements

### Minimum
- **RAM:** 8 GB (for small 3B models)
- **Disk:** 10-50 GB for models
- **OS:** macOS 11+ or 64-bit Linux

### Recommended
- **RAM:** 16-32 GB (for 7B-13B models)
- **GPU:** NVIDIA/AMD/Apple Silicon (optional but faster)
- **SSD:** 50+ GB free space

## Common Use Cases

1. **Local Chatbot** - Build ChatGPT-like apps that run offline
2. **RAG Systems** - Answer questions about your documents
3. **Code Assistant** - Generate and explain code locally
4. **Privacy-First AI** - Process sensitive data without cloud APIs
5. **Development/Testing** - Test AI features without API costs
6. **Edge Deployment** - Run AI on-premise or edge devices

## Example Usage

### CLI
```bash
ollama run llama3.1 "Explain quantum computing"
```

### Python
```python
import ollama

response = ollama.chat(
    model='llama3.1',
    messages=[{'role': 'user', 'content': 'Hello!'}]
)
print(response['message']['content'])
```

### REST API
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1",
  "prompt": "Why is the sky blue?"
}'
```

## Available Models

Popular models you can run locally:

| Model | Size | RAM Needed | Best For |
|-------|------|------------|----------|
| gemma:2b | 1.7 GB | 8 GB | Fast testing |
| phi3 | 2.3 GB | 8 GB | Compact & efficient |
| mistral | 4.1 GB | 16 GB | General tasks |
| llama3.1 | 4.7 GB | 16 GB | Balanced performance |
| llama3.1:70b | 40 GB | 64 GB | Maximum quality |

View all models: https://ollama.com/library

## Project Structure

```
.
├── OLLAMA_IMPLEMENTATION_GUIDE.md  # Complete guide
├── README_OLLAMA_RESEARCH.md       # This file
└── ollama-examples/                 # Python examples
    ├── README.md
    ├── requirements.txt
    ├── 01_basic_chat.py
    ├── 02_streaming_chat.py
    ├── 03_conversation_manager.py
    ├── 04_rag_example.py
    ├── 05_async_example.py
    └── 06_model_comparison.py
```

## Troubleshooting

### Port already in use
```bash
# Kill process on port 11434
sudo lsof -i :11434
kill -9 <PID>
```

### GPU not detected
```bash
# Check NVIDIA GPU
nvidia-smi

# Restart Ollama
sudo systemctl restart ollama
```

### Out of memory
```bash
# Use smaller model
ollama pull gemma:2b

# Or quantized version
ollama pull llama3.1:8b-instruct-q4_0
```

See the full guide for complete troubleshooting.

## Resources

- **Full Documentation**: See [OLLAMA_IMPLEMENTATION_GUIDE.md](./OLLAMA_IMPLEMENTATION_GUIDE.md)
- **Official Site**: https://ollama.com
- **GitHub**: https://github.com/ollama/ollama
- **Models**: https://ollama.com/library
- **Community**: https://discord.gg/ollama

## Contributing

This is a research project documenting Ollama implementation. To contribute:

1. Test the examples and report issues
2. Suggest additional examples or use cases
3. Share optimization tips
4. Report outdated information

## License

This documentation and examples are provided as-is for educational purposes.

Ollama itself is licensed under the MIT License - see the [Ollama repository](https://github.com/ollama/ollama) for details.

---

**Research Date**: October 22, 2025
**Ollama Version**: v0.12.5
**Status**: Active Development

## Next Steps

1. ✅ Read the [Implementation Guide](./OLLAMA_IMPLEMENTATION_GUIDE.md)
2. ✅ Install Ollama following the quick start above
3. ✅ Run the [example scripts](./ollama-examples/)
4. ✅ Integrate into your own projects
5. ✅ Explore advanced features (RAG, async, model comparison)

Happy building with local AI! 🚀
