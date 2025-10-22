#!/usr/bin/env python3
"""
Simple RAG (Retrieval-Augmented Generation) Example

This script demonstrates how to use Ollama for RAG, where you
provide context/documents and ask questions about them.

Usage:
    python 04_rag_example.py
"""

import ollama


def simple_rag(context: str, question: str, model: str = "llama3.1") -> str:
    """
    Perform RAG using Ollama

    Args:
        context: The context/document to use for answering
        question: The question to answer
        model: The model to use

    Returns:
        The answer based on the context
    """
    prompt = f"""Based on the following context, please answer the question.
Only use information from the context provided. If the answer is not in the context, say so.

Context:
{context}

Question: {question}

Answer:"""

    try:
        response = ollama.generate(model=model, prompt=prompt)
        return response['response']
    except Exception as e:
        return f"Error: {e}"


def demo_company_info():
    """Demo RAG with company information"""

    print("=" * 60)
    print("RAG Example: Company Information")
    print("=" * 60)

    # Sample company context
    context = """
    TechCorp Inc. was founded in 2015 by Jane Smith and John Doe.
    The company specializes in cloud computing and AI solutions.
    TechCorp is headquartered in San Francisco, California, with
    additional offices in New York, London, and Tokyo.

    The company's flagship product is CloudAI, a machine learning
    platform that helps businesses deploy AI models at scale.

    TechCorp has 500 employees and serves over 1,000 enterprise
    customers worldwide. The company raised $50 million in Series B
    funding in 2023, led by Venture Capital Partners.

    Current CEO is Jane Smith, and the CTO is Michael Chen.
    """

    questions = [
        "Who founded TechCorp?",
        "What is TechCorp's flagship product?",
        "How many employees does TechCorp have?",
        "Where is TechCorp's headquarters located?",
        "What is TechCorp's revenue?",  # Not in context
    ]

    for i, question in enumerate(questions, 1):
        print(f"\n{'-' * 60}")
        print(f"Question {i}: {question}")
        print('-' * 60)
        answer = simple_rag(context, question)
        print(f"Answer: {answer}")


def demo_code_documentation():
    """Demo RAG with code documentation"""

    print("\n\n" + "=" * 60)
    print("RAG Example: Code Documentation")
    print("=" * 60)

    # Sample code documentation
    context = """
    Function: calculate_discount(price, discount_percent)

    Description:
    Calculates the final price after applying a percentage discount.

    Parameters:
    - price (float): The original price of the item
    - discount_percent (float): The discount percentage (0-100)

    Returns:
    - float: The final price after discount

    Raises:
    - ValueError: If discount_percent is not between 0 and 100
    - ValueError: If price is negative

    Example:
    >>> calculate_discount(100, 20)
    80.0

    >>> calculate_discount(50, 10)
    45.0

    Implementation:
    The function validates inputs, then calculates:
    discount_amount = price * (discount_percent / 100)
    final_price = price - discount_amount
    """

    questions = [
        "What does the calculate_discount function do?",
        "What parameters does it accept?",
        "What errors can it raise?",
        "Show me an example of using this function",
    ]

    for i, question in enumerate(questions, 1):
        print(f"\n{'-' * 60}")
        print(f"Question {i}: {question}")
        print('-' * 60)
        answer = simple_rag(context, question)
        print(f"Answer: {answer}")


def demo_multi_document():
    """Demo RAG with multiple documents"""

    print("\n\n" + "=" * 60)
    print("RAG Example: Multiple Documents")
    print("=" * 60)

    # Multiple document contexts
    documents = {
        "Python Basics": """
        Python is a high-level, interpreted programming language.
        It was created by Guido van Rossum and first released in 1991.
        Python uses indentation to define code blocks.
        Popular for data science, web development, and automation.
        """,
        "Python Data Types": """
        Python has several built-in data types:
        - Numeric: int, float, complex
        - Sequence: list, tuple, range
        - Text: str
        - Mapping: dict
        - Set: set, frozenset
        - Boolean: bool
        """,
        "Python Functions": """
        Functions in Python are defined using the 'def' keyword.
        They can accept parameters and return values.
        Functions support default arguments and variable-length arguments.
        Lambda functions provide a way to create anonymous functions.
        """
    }

    # Combine all documents
    combined_context = "\n\n".join([
        f"Document: {title}\n{content}"
        for title, content in documents.items()
    ])

    questions = [
        "Who created Python?",
        "What are the numeric data types in Python?",
        "How do you define a function in Python?",
    ]

    for i, question in enumerate(questions, 1):
        print(f"\n{'-' * 60}")
        print(f"Question {i}: {question}")
        print('-' * 60)
        answer = simple_rag(combined_context, question)
        print(f"Answer: {answer}")


def main():
    demo_company_info()
    demo_code_documentation()
    demo_multi_document()


if __name__ == "__main__":
    main()
