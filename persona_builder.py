from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load model and tokenizer once
model_id = "deepseek-ai/deepseek-llm-7b-chat"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id, 
    torch_dtype=torch.float16, 
    device_map="auto"
)

def generate_persona(posts, comments):
    text_data = "\n\n".join(posts + comments)[:2000]  # Truncate for token limit

    prompt = f"""
You are an AI that builds detailed user personas based on Reddit activity.

Analyze the following Reddit posts and comments and return a persona that includes:
- Username
- Interests and Hobbies
- Beliefs or Opinions
- Writing Style or Tone
- Frequent Topics
- Any other useful traits

Cite specific lines or quotes from posts/comments that helped infer each trait.

--- START USER DATA ---
{text_data}
--- END USER DATA ---
"""

    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_new_tokens=1024, do_sample=True, top_p=0.9, temperature=0.7)
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return result
