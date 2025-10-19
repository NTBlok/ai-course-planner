from fastapi import FastAPI
from langchain.llms import Ollama
from langchain.prompts import ChatPromptTemplate

app = FastAPI()

llm = Ollama(model="mistral")

@app.post("/ask")
def ask_course_planner(prompt: str):
    template = ChatPromptTemplate.from_template("Given the user's preferences: {prompt}, suggest scheduling options.")
    response = llm.invoke(template.format(prompt=prompt))
    return {"response": response}

