#!/usr/bin/env python3
"""
Basic Ollama Chat Example

This script demonstrates the simplest way to interact with Ollama.
Make sure Ollama is running and you have a model installed.

Usage:
    python 01_basic_chat.py
"""

import ollama


def main():
    print("=" * 60)
    print("Ollama Basic Chat Example")
    print("=" * 60)

    # Check if Ollama is accessible
    try:
        models = ollama.list()
        print(f"\nAvailable models: {len(models.get('models', []))}")
        for model in models.get('models', [])[:3]:
            print(f"  - {model['name']}")
    except Exception as e:
        print(f"\nError: Cannot connect to Ollama. Is it running?")
        print(f"Error details: {e}")
        print("\nTry running: ollama serve")
        return

    # Simple chat example
    model_name = "llama3.1"  # Change this to your installed model

    print(f"\n\nUsing model: {model_name}")
    print("-" * 60)

    question = "Why is the sky blue? Explain in 2-3 sentences."

    print(f"\nQuestion: {question}")
    print("\nAnswer: ", end="", flush=True)

    try:
        # Non-streaming response
        response = ollama.chat(
            model=model_name,
            messages=[
                {
                    'role': 'user',
                    'content': question
                }
            ]
        )

        answer = response['message']['content']
        print(answer)

    except Exception as e:
        print(f"\nError generating response: {e}")
        print(f"\nMake sure you have the '{model_name}' model installed.")
        print(f"Install it with: ollama pull {model_name}")


if __name__ == "__main__":
    main()
