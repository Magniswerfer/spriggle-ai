import os
from fastapi import FastAPI
from fastapi import Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# Load the API KEY from the .env file
load_dotenv()

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)


# Initialize FastAPI app
app = FastAPI()

# Setup CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin (use specific origins in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods, including OPTIONS
    allow_headers=["*"],  # Allow all headers
)

# Request model
class MessageRequest(BaseModel):
    message: str

# POST endpoint for /chat
@app.post("/chat")
async def chat_with_openai(request: MessageRequest):
    try:
        # Call the OpenAI Chat API using the provided message
        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": request.message}
            ],
            model="gpt-4o-mini"  # Replace with the correct model name
        )

        print(completion.choices[0].message)

        # Extract the response from OpenAI
        return {"response": completion.choices[0].message.content}

    except Exception as e:
        return {"error": str(e)}