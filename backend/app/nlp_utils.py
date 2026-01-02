import re

def text_to_num(text):
    """
    Robustly converts text description of numbers to integer.
    Handles: "2.5k", "one lakh fifty thousand", "twenty five hundred", "500"
    """
    text = text.lower().replace(',', '')
    
    # Quick Regex for explicit K/L notation (e.g. 2.5k, 10L)
    # This handles "2.5k" -> 2500
    if re.search(r'\d', text):
        multipliers = {'k': 1000, 'l': 100000, 'lakh': 100000, 'lakhs': 100000, 'cr': 10000000, 'm': 1000000}
        match = re.search(r'([\d\.]+)\s*([k|l|m|cr|lakh|lakhs]+)', text)
        if match:
            num = float(match.group(1))
            mult_key = match.group(2).strip()
            # fuzzy match multiplier key
            mult = 1
            for k, v in multipliers.items():
                if k in mult_key:
                    mult = v
                    break
            return int(num * mult)
        
        # Plain digit search (e.g., "500")
        # Find the largest number if multiple exist, assuming it's the amount
        digits = re.findall(r'\d+', text)
        if digits:
            numbers = [int(d) for d in digits]
            return max(numbers) 

    # Word-to-Number Logic
    units = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
        "sixteen", "seventeen", "eighteen", "nineteen",
    ]
    tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
    scales = ["hundred", "thousand", "lakh", "crore", "million", "billion"]

    word_map = {w: i for i, w in enumerate(units)}
    word_map.update({w: 10 * i for i, w in enumerate(tens)})
    scale_map = {
        "hundred": 100,
        "thousand": 1000,
        "lakh": 100000, "lakhs": 100000,
        "crore": 10000000, "crores": 10000000,
        "million": 1000000
    }

    current_chunk = 0
    final_number = 0
    words = text.split()
    
    found_number = False

    for word in words:
        if word in word_map:
            current_chunk += word_map[word]
            found_number = True
        elif word in scale_map:
            if current_chunk == 0: current_chunk = 1
            
            scale = scale_map[word]
            # Special handling for "hundred" which scales the current chunk but is part of a larger block
            if scale == 100:
                current_chunk *= scale
            else:
                final_number += current_chunk * scale
                current_chunk = 0
            found_number = True
    
    total = final_number + current_chunk
    return total if found_number else 0

def extract_expense_data(text):
    """
    Extracts amount, category, and description from natural language text.
    Input: "I spent 500 rupees on pizza"
    Output: { "amount": 500, "category": "Food", "description": "Pizza" }
    """
    text = text.lower()
    
    # 1. Extract Amount
    # We strip common non-numeric keywords to focus on the number part first?
    # No, text_to_num handles that.
    amount = text_to_num(text)

    # 2. Extract Description & Category
    # Strategy: Split by prepositions "on", "for", "buying" to find the object.
    # e.g. "Spent 500 *on* Pizza" -> Description is likely after "on".
    
    separators = [" on ", " for ", " buying ", " purchase of ", " gave ", " to "]
    raw_description = ""
    
    for sep in separators:
        if sep in text:
            parts = text.split(sep)
            if len(parts) > 1:
                # Take the part after the separator
                raw_description = parts[1]
                break
    
    if not raw_description:
        # Fallback: Remove known filler words and the amount word(s)
        # simplistic cleanup
        temp_text = text
        fillers = ["i", "spent", "paid", "rupees", "rs", "amount", "of", "approx", "money"]
        for f in fillers:
            temp_text = temp_text.replace(f, "")
        # Remove digits
        temp_text = re.sub(r'\d+', '', temp_text)
        # Remove num words (simple check)
        # This is hard to do perfectly without overlap, but acceptable for now
        raw_description = temp_text.strip()

    # Clean punctuation and extra spaces
    clean_desc = re.sub(r'[^\w\s]', '', raw_description).strip()
    
    # Capitalize
    description = clean_desc.capitalize() if clean_desc else "General Expense"

    # 3. Enhanced Category Mapping
    categories = {
        "Food": ["pizza", "burger", "lunch", "dinner", "breakfast", "coffee", "tea", "grocery", "vegetables", "milk", "fruits", "restaurant", "snack", "food", "cake", "chocolate"],
        "Transport": ["taxi", "cab", "uber", "ola", "bus", "train", "flight", "petrol", "diesel", "fuel", "ticket", "metro", "rickshaw", "auto"],
        "Bills": ["rent", "electricity", "water", "bill", "recharge", "mobile", "wifi", "internet", "gas", "cylinder", "maintenance"],
        "Entertainment": ["movie", "cinema", "netflix", "game", "book", "party", "trip", "vacation", "subscription", "hotstar", "amazon"],
        "Health": ["medicine", "doctor", "hospital", "checkup", "gym", "yoga", "fitness", "tablet", "pills", "medical"],
        "Shopping": ["clothes", "shirt", "shoe", "bag", "dress", "jeans", "watch", "electronics", "phone", "laptop", "amazon", "flipkart"],
        "Education": ["fees", "school", "college", "tuition", "books", "course", "stationery", "pen", "paper"]
    }
    
    category = "General"
    for cat, keywords in categories.items():
        # Check both the full text and the extracted description
        if any(k in description.lower() for k in keywords) or any(k in text for k in keywords):
            category = cat
            break
            
    return {
        "amount": amount,
        "category": category,
        "description": description if description else category
    }
