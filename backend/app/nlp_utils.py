import re

def text_to_num(text):
    """
    Converts text description of numbers to integer.
    Handles: "2k", "1.5 lakhs", "five hundred", "200"
    """
    text = text.lower()
    
    # Handle 'k' (thousand) and 'l' (lakh) suffixes
    # e.g. "2k" -> 2000, "1.5L" -> 150000
    if 'k' in text or 'l' in text:
        multipliers = {'k': 1000, 'l': 100000, 'lakh': 100000, 'lakhs': 100000}
        match = re.search(r'([\d\.]+)\s*([k|l|lakh|lakhs]+)', text)
        if match:
            num = float(match.group(1))
            mult = multipliers.get(match.group(2).strip(), 1)
            return int(num * mult)

    # Basic dictionary for small numbers
    units = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
        "sixteen", "seventeen", "eighteen", "nineteen",
    ]
    tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
    scales = ["hundred", "thousand", "lakh", "crore"]

    # Simple regex for finding raw digits
    digits = re.search(r'\d+', text)
    if digits:
        return int(digits.group())
    
    # (Simplified text-to-num logic for demo - converting "five hundred" requires more parsing 
    # but for brevity we'll handle common simple cases)
    word_map = {w: i for i, w in enumerate(units)}
    word_map.update({w: 10 * i for i, w in enumerate(tens)})
    word_map["hundred"] = 100
    word_map["thousand"] = 1000
    
    current = 0
    final = 0
    for word in text.split():
        if word in word_map:
            val = word_map[word]
            if val >= 100:
                if current == 0: current = 1
                final += current * val
                current = 0
            else:
                current += val
    
    return final + current if final + current > 0 else 0

def extract_expense_data(text):
    """
    Extracts amount, category, and description from natural language text.
    Input: "I spent 500 rupees on pizza"
    Output: { "amount": 500, "category": "Food", "description": "Pizza" }
    """
    text = text.lower()
    
    # 1. Extract Amount
    # Look for patterns like "500", "2k", "five hundred"
    amount = 0
    words = text.split()
    
    # Try finding amount via keywords
    for i, word in enumerate(words):
        if word.isdigit():
            amount = int(word)
            break
        # Handle '2k', '500rs'
        if re.match(r'\d+[k|l]', word):
            amount = text_to_num(word)
            break
        
    # If regex failed, try text parsing
    if amount == 0:
        amount = text_to_num(text)

    # 2. Extract Description/Category
    # Remove filler words and amount
    clean_text = text
    fillers = ["i", "spent", "paid", "gave", "rupees", "rs", "money", "on", "for", "the", "a", "an"]
    for filler in fillers:
        clean_text = re.sub(r'\b' + filler + r'\b', "", clean_text)
    
    # Remove parsing artifacts (digits)
    clean_text = re.sub(r'\d+[k|l]*', "", clean_text).strip()
    
    description = clean_text.capitalize() if clean_text else "General Expense"
    
    # Simple Category Mapping
    categories = {
        "Food": ["pizza", "burger", "lunch", "dinner", "breakfast", "coffee", "tea", "grocery", "vegetables", "milk", "fruits"],
        "Transport": ["taxi", "cab", "uber", "ola", "bus", "train", "flight", "petrol", "diesel", "fuel"],
        "Bills": ["rent", "electricity", "water", "bill", "recharge", "mobile", "wifi", "internet"],
        "Entertainment": ["movie", "cinema", "netflix", "game", "book", "party"],
        "Health": ["medicine", "doctor", "hospital", "checkup", "gym"],
        "Shopping": ["clothes", "shirt", "shoe", "bag", "dress"]
    }
    
    category = "General"
    for cat, keywords in categories.items():
        if any(k in description.lower() for k in keywords):
            category = cat
            break
            
    return {
        "amount": amount,
        "category": category,
        "description": description
    }
