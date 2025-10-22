# Ollama Python Examples

This directory contains working examples demonstrating various ways to use Ollama with Python.

## Prerequisites

1. **Install Ollama** (if not already installed):
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Pull at least one model**:
   ```bash
   ollama pull llama3.1
   # or
   ollama pull gemma:2b  # Smaller, faster model
   ```

4. **Ensure Ollama is running**:
   ```bash
   ollama serve
   # Or check if it's already running:
   curl http://localhost:11434
   ```

## Examples

### 01. Basic Chat (`01_basic_chat.py`)
The simplest way to interact with Ollama - send a question and get an answer.

```bash
python 01_basic_chat.py
```

**What it demonstrates:**
- Connecting to Ollama
- Checking available models
- Simple non-streaming chat
- Error handling

### 02. Streaming Chat (`02_streaming_chat.py`)
Shows how to stream responses as they're generated (like ChatGPT).

```bash
python 02_streaming_chat.py
```

**What it demonstrates:**
- Streaming responses
- Real-time output
- Multiple streaming examples

### 03. Conversation Manager (`03_conversation_manager.py`)
Maintains conversation context across multiple messages.

```bash
python 03_conversation_manager.py
```

**What it demonstrates:**
- Multi-turn conversations
- Conversation history management
- Context reset functionality
- System prompts

### 04. RAG Example (`04_rag_example.py`)
Retrieval-Augmented Generation - answer questions based on provided documents.

```bash
python 04_rag_example.py
```

**What it demonstrates:**
- RAG pattern implementation
- Context-based question answering
- Multiple document handling
- Handling questions outside the context

### 05. Async Example (`05_async_example.py`)
Asynchronous usage for better performance with concurrent requests.

```bash
python 05_async_example.py
```

**What it demonstrates:**
- Async/await with Ollama
- Concurrent request processing
- Async streaming
- Batch processing

**Note:** For better concurrent performance, set:
```bash
export OLLAMA_NUM_PARALLEL=4
```

### 06. Model Comparison (`06_model_comparison.py`)
Compare different models on the same tasks to find the best one.

```bash
python 06_model_comparison.py
```

**What it demonstrates:**
- Multi-model testing
- Performance benchmarking
- Response quality comparison
- Timing and metrics

## Customization

All examples use `llama3.1` by default. To use a different model:

1. **Edit the script** and change the `model_name` variable, or
2. **Pull the model you want**:
   ```bash
   ollama pull mistral
   ollama pull gemma:7b
   ollama pull phi3
   ```

## Common Issues

### "Cannot connect to Ollama"
- Make sure Ollama is running: `ollama serve`
- Check the service: `curl http://localhost:11434`

### "Model not found"
- Pull the model: `ollama pull llama3.1`
- Check installed models: `ollama list`

### Slow performance
- Use a smaller model: `ollama pull gemma:2b`
- Check if GPU is being used (NVIDIA): `nvidia-smi`
- Consider quantized models: `ollama pull llama3.1:8b-instruct-q4_0`

### Import error
- Install dependencies: `pip install ollama`

## Learn More

- See `../OLLAMA_IMPLEMENTATION_GUIDE.md` for complete documentation
- Official Ollama docs: https://github.com/ollama/ollama
- Ollama Python library: https://github.com/ollama/ollama-python

## Next Steps

After running these examples, try:

1. Integrating Ollama into your own applications
2. Building a chatbot with conversation history
3. Creating a RAG system with your own documents
4. Experimenting with different models and prompts
5. Building a web interface (e.g., with FastAPI + Ollama async)

Happy coding!
