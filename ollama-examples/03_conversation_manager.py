#!/usr/bin/env python3
"""
Conversation Manager Example

This script demonstrates how to maintain conversation context
across multiple interactions, simulating a real chat session.

Usage:
    python 03_conversation_manager.py
"""

import ollama
from typing import List, Dict


class ConversationManager:
    """Manage multi-turn conversations with Ollama"""

    def __init__(self, model: str = "llama3.1", system_prompt: str = None):
        self.model = model
        self.messages: List[Dict] = []

        if system_prompt:
            self.messages.append({
                'role': 'system',
                'content': system_prompt
            })

    def chat(self, user_message: str, stream: bool = False) -> str:
        """
        Send a message and get a response

        Args:
            user_message: The user's message
            stream: Whether to stream the response

        Returns:
            The assistant's response
        """
        # Add user message to conversation history
        self.messages.append({
            'role': 'user',
            'content': user_message
        })

        try:
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

                # Add assistant response to history
                self.messages.append({
                    'role': 'assistant',
                    'content': full_response
                })
                return full_response
            else:
                assistant_message = response['message']['content']
                # Add assistant response to history
                self.messages.append(response['message'])
                return assistant_message

        except Exception as e:
            print(f"Error: {e}")
            # Remove the user message we just added since we got an error
            self.messages.pop()
            return None

    def reset(self):
        """Clear conversation history (keeping system prompt if any)"""
        self.messages = [msg for msg in self.messages if msg['role'] == 'system']

    def get_history(self) -> List[Dict]:
        """Get the full conversation history"""
        return self.messages.copy()

    def get_conversation_length(self) -> int:
        """Get the number of messages in the conversation"""
        return len(self.messages)


def demo_conversation():
    """Demonstrate a multi-turn conversation"""

    print("=" * 60)
    print("Conversation Manager Demo")
    print("=" * 60)

    # Create a conversation with a system prompt
    conv = ConversationManager(
        model="llama3.1",
        system_prompt="You are a helpful Python programming tutor. Keep responses concise and educational."
    )

    # Have a multi-turn conversation
    conversations = [
        ("What is a list comprehension in Python?", False),
        ("Can you show me an example?", False),
        ("How is it different from a regular for loop?", False),
        ("Give me a practical use case", True),  # Stream the last one
    ]

    for i, (question, stream) in enumerate(conversations, 1):
        print(f"\n{'-' * 60}")
        print(f"Turn {i}: {question}")
        print('-' * 60)
        print("Response: ", end="" if stream else "")

        response = conv.chat(question, stream=stream)

        if not stream:
            print(response)

    # Show conversation stats
    print(f"\n{'=' * 60}")
    print(f"Conversation Statistics:")
    print(f"  Total messages: {conv.get_conversation_length()}")
    print(f"  (Including 1 system message, {(conv.get_conversation_length() - 1) // 2} Q&A pairs)")


def demo_context_reset():
    """Demonstrate resetting conversation context"""

    print("\n\n" + "=" * 60)
    print("Context Reset Demo")
    print("=" * 60)

    conv = ConversationManager(model="llama3.1")

    # First conversation
    print("\n--- First conversation about Python ---")
    response1 = conv.chat("My name is Alice and I'm learning Python")
    print(f"Bot: {response1}")

    response2 = conv.chat("What's my name?")
    print(f"Bot: {response2}")

    # Reset context
    print("\n--- Resetting conversation ---")
    conv.reset()

    # New conversation - bot should not remember the name
    print("\n--- New conversation after reset ---")
    response3 = conv.chat("What's my name?")
    print(f"Bot: {response3}")


def main():
    demo_conversation()
    demo_context_reset()


if __name__ == "__main__":
    main()
