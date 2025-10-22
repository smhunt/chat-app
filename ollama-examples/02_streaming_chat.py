#!/usr/bin/env python3
"""
Streaming Chat Example

This script demonstrates how to stream responses from Ollama,
which is useful for long responses where you want to see output
as it's generated.

Usage:
    python 02_streaming_chat.py
"""

import ollama
import sys


def streaming_chat(model: str, prompt: str):
    """
    Generate a streaming response from Ollama

    Args:
        model: Name of the model to use
        prompt: The user's question/prompt
    """
    print(f"\nQuestion: {prompt}")
    print("\nAnswer: ", end="", flush=True)

    try:
        stream = ollama.chat(
            model=model,
            messages=[
                {
                    'role': 'user',
                    'content': prompt
                }
            ],
            stream=True
        )

        full_response = ""
        for chunk in stream:
            content = chunk['message']['content']
            print(content, end='', flush=True)
            full_response += content

        print("\n")  # New line after response
        return full_response

    except Exception as e:
        print(f"\n\nError: {e}")
        return None


def main():
    print("=" * 60)
    print("Ollama Streaming Chat Example")
    print("=" * 60)

    model_name = "llama3.1"  # Change to your model

    # Example prompts
    prompts = [
        "Write a haiku about programming",
        "Explain what a neural network is in simple terms",
        "List 3 benefits of using local LLMs"
    ]

    for i, prompt in enumerate(prompts, 1):
        print(f"\n{'=' * 60}")
        print(f"Example {i}/{len(prompts)}")
        print('=' * 60)
        streaming_chat(model_name, prompt)


if __name__ == "__main__":
    main()
