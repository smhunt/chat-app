#!/usr/bin/env python3
"""
Model Comparison Example

This script demonstrates how to compare different models
on the same task to find the best one for your use case.

Usage:
    python 06_model_comparison.py
"""

import ollama
import time
from typing import List, Dict, Any


def compare_models_on_task(
    models: List[str],
    prompt: str,
    show_responses: bool = True
) -> Dict[str, Any]:
    """
    Compare multiple models on the same task

    Args:
        models: List of model names to compare
        prompt: The prompt/task to test
        show_responses: Whether to print the responses

    Returns:
        Dictionary with comparison results
    """
    results = {}

    print(f"\nTask: {prompt}")
    print("=" * 60)

    for model in models:
        print(f"\nTesting {model}...", end=" ", flush=True)

        try:
            start_time = time.time()

            response = ollama.generate(
                model=model,
                prompt=prompt
            )

            elapsed = time.time() - start_time
            response_text = response['response']
            response_length = len(response_text)

            results[model] = {
                'success': True,
                'response': response_text,
                'time': elapsed,
                'length': response_length,
                'tokens_per_second': response.get('eval_count', 0) / elapsed if elapsed > 0 else 0
            }

            print(f"✓ ({elapsed:.2f}s)")

            if show_responses:
                print(f"\nResponse:\n{response_text}\n")
                print('-' * 60)

        except Exception as e:
            results[model] = {
                'success': False,
                'error': str(e),
                'time': 0,
                'length': 0
            }
            print(f"✗ Error: {e}")

    return results


def print_comparison_table(results: Dict[str, Any]):
    """
    Print a comparison table of results

    Args:
        results: Results dictionary from compare_models_on_task
    """
    print("\n" + "=" * 60)
    print("COMPARISON RESULTS")
    print("=" * 60)

    print(f"\n{'Model':<20} {'Time (s)':<12} {'Length':<10} {'Tokens/s':<12} {'Status'}")
    print("-" * 70)

    for model, data in results.items():
        if data['success']:
            print(
                f"{model:<20} "
                f"{data['time']:<12.2f} "
                f"{data['length']:<10} "
                f"{data.get('tokens_per_second', 0):<12.1f} "
                f"✓"
            )
        else:
            print(f"{model:<20} {'N/A':<12} {'N/A':<10} {'N/A':<12} ✗ {data['error']}")


def demo_simple_comparison():
    """Compare models on a simple task"""

    print("=" * 60)
    print("Simple Comparison: Math Question")
    print("=" * 60)

    # Models to compare - adjust based on what you have installed
    models = [
        "llama3.1:latest",
        "gemma:2b",
        # "mistral:latest",
        # "phi3:latest",
    ]

    prompt = "What is 25 * 34? Provide just the answer and a brief calculation."

    results = compare_models_on_task(models, prompt, show_responses=True)
    print_comparison_table(results)


def demo_reasoning_comparison():
    """Compare models on a reasoning task"""

    print("\n\n" + "=" * 60)
    print("Reasoning Comparison: Logic Problem")
    print("=" * 60)

    models = [
        "llama3.1:latest",
        "gemma:2b",
    ]

    prompt = """If it takes 5 machines 5 minutes to make 5 widgets,
how long would it take 100 machines to make 100 widgets?
Think through this step by step."""

    results = compare_models_on_task(models, prompt, show_responses=True)
    print_comparison_table(results)


def demo_coding_comparison():
    """Compare models on a coding task"""

    print("\n\n" + "=" * 60)
    print("Coding Comparison: Python Function")
    print("=" * 60)

    models = [
        "llama3.1:latest",
        "gemma:2b",
    ]

    prompt = """Write a Python function that checks if a string is a palindrome.
Include a docstring and handle edge cases. Keep it concise."""

    results = compare_models_on_task(models, prompt, show_responses=True)
    print_comparison_table(results)


def get_available_models() -> List[str]:
    """
    Get list of available models

    Returns:
        List of model names
    """
    try:
        models_data = ollama.list()
        return [model['name'] for model in models_data.get('models', [])]
    except Exception as e:
        print(f"Error getting models: {e}")
        return []


def main():
    """Run all comparison demos"""

    # First, check what models are available
    print("Checking available models...")
    available_models = get_available_models()

    if not available_models:
        print("\nNo models found. Please install models first:")
        print("  ollama pull llama3.1")
        print("  ollama pull gemma:2b")
        return

    print(f"\nAvailable models ({len(available_models)}):")
    for model in available_models:
        print(f"  - {model}")

    # Run comparisons
    demo_simple_comparison()
    demo_reasoning_comparison()
    demo_coding_comparison()


if __name__ == "__main__":
    main()
