from pydantic import BaseModel

class Expense(BaseModel):
    category: str
    amount: float
    description: str

class UserProfile(BaseModel):
    income: float
    occupation: str
    location: str
    gender: str
    age: int
