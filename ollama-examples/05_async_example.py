#!/usr/bin/env python3
"""
Async Ollama Example

This script demonstrates how to use Ollama asynchronously,
which is useful for concurrent requests or integration with
async frameworks like FastAPI.

Usage:
    python 05_async_example.py
"""

import asyncio
import ollama
import time


async def async_chat(model: str, prompt: str) -> str:
    """
    Asynchronously chat with Ollama

    Args:
        model: The model to use
        prompt: The prompt/question

    Returns:
        The response content
    """
    client = ollama.AsyncClient()

    try:
        response = await client.chat(
            model=model,
            messages=[
                {
                    'role': 'user',
                    'content': prompt
                }
            ]
        )
        return response['message']['content']
    except Exception as e:
        return f"Error: {e}"


async def async_generate(model: str, prompt: str) -> str:
    """
    Asynchronously generate with Ollama

    Args:
        model: The model to use
        prompt: The prompt

    Returns:
        The generated response
    """
    client = ollama.AsyncClient()

    try:
        response = await client.generate(model=model, prompt=prompt)
        return response['response']
    except Exception as e:
        return f"Error: {e}"


async def demo_sequential():
    """Run requests sequentially (slower)"""

    print("=" * 60)
    print("Sequential Requests Demo")
    print("=" * 60)

    model = "llama3.1"
    prompts = [
        "What is 2+2?",
        "What is the capital of France?",
        "Name a primary color"
    ]

    start_time = time.time()

    for i, prompt in enumerate(prompts, 1):
        print(f"\nRequest {i}: {prompt}")
        response = await async_chat(model, prompt)
        print(f"Response: {response}")

    elapsed = time.time() - start_time
    print(f"\n{'=' * 60}")
    print(f"Sequential execution time: {elapsed:.2f} seconds")


async def demo_concurrent():
    """Run requests concurrently (faster)"""

    print("\n\n" + "=" * 60)
    print("Concurrent Requests Demo")
    print("=" * 60)

    model = "llama3.1"
    prompts = [
        "What is 2+2?",
        "What is the capital of France?",
        "Name a primary color"
    ]

    start_time = time.time()

    # Create all tasks
    tasks = [async_chat(model, prompt) for prompt in prompts]

    # Run concurrently
    responses = await asyncio.gather(*tasks)

    # Display results
    for i, (prompt, response) in enumerate(zip(prompts, responses), 1):
        print(f"\nRequest {i}: {prompt}")
        print(f"Response: {response}")

    elapsed = time.time() - start_time
    print(f"\n{'=' * 60}")
    print(f"Concurrent execution time: {elapsed:.2f} seconds")


async def demo_streaming():
    """Demo async streaming"""

    print("\n\n" + "=" * 60)
    print("Async Streaming Demo")
    print("=" * 60)

    client = ollama.AsyncClient()
    model = "llama3.1"
    prompt = "Write a short poem about coding"

    print(f"\nPrompt: {prompt}")
    print("\nResponse: ", end="", flush=True)

    try:
        stream = await client.chat(
            model=model,
            messages=[
                {
                    'role': 'user',
                    'content': prompt
                }
            ],
            stream=True
        )

        async for chunk in stream:
            content = chunk['message']['content']
            print(content, end='', flush=True)

        print("\n")

    except Exception as e:
        print(f"\nError: {e}")


async def demo_batch_processing():
    """Demo processing a batch of questions"""

    print("=" * 60)
    print("Batch Processing Demo")
    print("=" * 60)

    model = "llama3.1"

    # A batch of diverse questions
    questions = [
        "What is Python?",
        "What is machine learning?",
        "What is a database?",
        "What is version control?",
        "What is an API?",
    ]

    print(f"\nProcessing {len(questions)} questions concurrently...\n")

    start_time = time.time()

    # Process all questions concurrently
    tasks = [async_chat(model, q) for q in questions]
    responses = await asyncio.gather(*tasks)

    elapsed = time.time() - start_time

    # Display results
    for i, (question, response) in enumerate(zip(questions, responses), 1):
        print(f"{'-' * 60}")
        print(f"Q{i}: {question}")
        print(f"A{i}: {response[:100]}{'...' if len(response) > 100 else ''}")

    print(f"\n{'=' * 60}")
    print(f"Processed {len(questions)} questions in {elapsed:.2f} seconds")
    print(f"Average: {elapsed/len(questions):.2f} seconds per question")


async def main():
    """Run all demos"""

    # Note: Sequential vs Concurrent may not show huge difference
    # if OLLAMA_NUM_PARALLEL is set to 1 (default)
    # Set OLLAMA_NUM_PARALLEL=4 for better concurrent performance

    await demo_sequential()
    await demo_concurrent()
    await demo_streaming()
    await demo_batch_processing()


if __name__ == "__main__":
    asyncio.run(main())
