from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from app.recommender import get_recommendations
from app.nlp_utils import extract_expense_data

load_dotenv()

app = FastAPI(title="FinPath API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:5179"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.finpath

# Models
class Expense(BaseModel):
    category: str
    amount: float
    description: str

class ParseRequest(BaseModel):
    text: str

class UserProfile(BaseModel):
    income: float
    occupation: str
    location: str
    gender: str
    age: int

@app.get("/")
async def read_root():
    return {"message": "Welcome to FinPath API"}

@app.post("/api/expenses")
async def log_expense(expense: Expense):
    new_expense = await db.expenses.insert_one(expense.model_dump())
    created_expense = await db.expenses.find_one({"_id": new_expense.inserted_id})
    return {"id": str(created_expense["_id"]), "status": "logged"}

@app.get("/api/expenses")
async def get_expenses():
    expenses = await db.expenses.find().to_list(100)
    for exp in expenses:
        exp["id"] = str(exp["_id"])
        del exp["_id"]
    return expenses

@app.post("/api/recommendCheck")
async def recommend_schemes(profile: UserProfile):
    recommendations = get_recommendations(profile)
    return {"recommendations": recommendations}

@app.post("/api/parse-expense")
async def parse_expense(request: ParseRequest):
    """
    NLP Endpoint: Converts natural language text into structured expense data.
    """
    data = extract_expense_data(request.text)
    return data
