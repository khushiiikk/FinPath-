import math
from collections import Counter

# --- ML Core: Vector Space Model (Custom Implementation) ---
class SimpleVectorizer:
    """
    A lightweight Bag-of-Words Vectorizer (like sklearn's CountVectorizer)
    Implements TF (Term Frequency) logic.
    """
    def __init__(self):
        self.vocabulary = set()

    def fit(self, documents):
        """Builds vocabulary from list of text documents."""
        for doc in documents:
            words = self._tokenize(doc)
            self.vocabulary.update(words)
            
    def transform(self, documents):
        """Converts documents to vectors based on vocabulary."""
        vectors = []
        vocab_list = sorted(list(self.vocabulary))
        
        for doc in documents:
            words = self._tokenize(doc)
            word_count = Counter(words)
            vector = [word_count[word] for word in vocab_list]
            vectors.append(vector)
        return vectors

    def _tokenize(self, text):
        """Simple tokenizer: lowercase and remove punctuation."""
        return text.lower().replace('.', '').replace(',', '').split()

def cosine_similarity(vec1, vec2):
    """Calculates Cosine Similarity between two vectors."""
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    magnitude1 = math.sqrt(sum(a * a for a in vec1))
    magnitude2 = math.sqrt(sum(b * b for b in vec2))
    
    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0
    return dot_product / (magnitude1 * magnitude2)

# --- Recommender System ---

def get_recommendations(profile):
    """
    ML-Driven Recommendation Engine using Content-Based Filtering.
    Matches User Profile Vector against Scheme Vectors.
    """
    
    # 1. Expanded Database with Rich Text Descriptions
    # 1. Expanded Database with Real Government Scheme Data
    # 1. Expanded Database with Real Government Scheme Data
    schemes_db = [
        {
            "id": 1,
            "name": "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
            "text": "financial inclusion banking savings account zero balance insurance overdraft facility rupay debit card unbanked households social security poor rural women",
            "benefit": "Zero balance account, RuPay card with ₹2L accident cover, ₹10k overdraft facility.",
            "details": "Pradhan Mantri Jan Dhan Yojana (PMJDY) aims to ensure comprehensive financial inclusion of all households in the country by providing universal access to banking facilities with at least one basic bank account to every household, financial literacy, and social security cover. The Scheme offers: (1) Basic Savings Bank Deposit (BSBD) account without minimum balance. (2) Free RuPay debit card with in-built accident insurance cover of Rs. 2 lakh. (3) Access to overdraft facility of upto Rs. 10,000. (4) Easy access to banking services in rural areas through Bank Mitras.",
            "eligibility": ["all", "unbanked"],
            "min_age": 10,
            "max_age": 100,
            "gender": "all"
        },
        {
            "id": 2,
            "name": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
            "text": "accident insurance disability death cover low premium risk coverage 12 rupees per year safety security",
            "benefit": "Accidental death/disability cover of ₹2 Lakhs for just ₹20/year.",
            "details": "The Pradhan Mantri Suraksha Bima Yojana (PMSBY) is a one-year personal accident insurance Scheme, renewable from year to year. It offers coverage for death/disability due to an accident and is available to people in the age group of 18 to 70 years having a bank account. Annual premium is Rs 20 per year. Benefit of Rs. 2 Lakh payable on death or permanent total disability and Rs. 1 Lakh on partial disability.",
            "eligibility": ["all", "account holder"],
            "min_age": 18,
            "max_age": 70,
            "gender": "all"
        },
        {
            "id": 3,
            "name": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
            "text": "life insurance death cover term plan family security risk coverage 436 rupees per year",
            "benefit": "Life insurance cover of ₹2 Lakhs for ₹436/year.",
            "details": "The Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) is a one-year life insurance Scheme renewable from year to year. It offers coverage of Rs. Two lacs for death due to any reason and is available to people in the age group of 18 to 50 years having a bank account. Annual premium is Rs. 436 per year. It involves convenient bank account linked enrolment and premium payment through auto-debit.",
            "eligibility": ["all", "account holder"],
            "min_age": 18,
            "max_age": 50,
            "gender": "all"
        },
        {
            "id": 4,
            "name": "Atal Pension Yojana (APY)",
            "text": "pension retirement old age security monthly income unorganized sector workers laborers daily wage guarantee",
            "benefit": "Guaranteed pension of ₹1000-₹5000/month after age 60.",
            "details": "The Government launched the Atal Pension Yojana (APY) to encourage the workers in unorganized sector to voluntarily save for their retirement. The Scheme provides a defined pension, depending on the contribution and its period. Under APY, the subscribers would receive the fixed minimum pension of Rs. 1000 per month, Rs. 2000 per month, Rs. 3000 per month, Rs. 4000 per month and Rs. 5000 per month at the age of 60 years. Minimum age of joining is 18 years and maximum age is 40 years.",
            "eligibility": ["worker", "laborer", "unorganized", "all"],
            "min_age": 18,
            "max_age": 40,
            "gender": "all"
        },
        {
            "id": 5,
            "name": "Pradhan Mantri MUDRA Yojana (PMMY)",
            "text": "business loan startup entrepreneur small enterprise shopkeeper artisan weaver shishu kishore tarun collateral free credit msme manufacturing trading services",
            "benefit": "Collateral-free business loans up to ₹10 Lakhs (Shishu, Kishore, Tarun).",
            "details": "Pradhan Mantri MUDRA Yojana (PMMY) provides access to institutional collateral free credit to micro enterprises. Categories: (a) Shishu – upto Rs.50,000; (b) Kishore – Above Rs.50,000 and upto Rs.5 lakh; (c) Tarun – Above Rs.5 lakh and upto Rs.10 lakh. Purpose: Non-agricultural activities like poultry, dairy, shopkeeping, trading, etc.",
            "eligibility": ["entrepreneur", "shopkeeper", "business", "artisan", "weaver", "manufacturer", "trader"],
            "min_age": 18,
            "max_age": 65,
            "gender": "all"
        },
        {
            "id": 6,
            "name": "Stand Up India Scheme",
            "text": "entrepreneurship sc st women business loan greenfield project manufacturing services trading startup scheduled caste tribe bank loan 10 lakh to 1 crore",
            "benefit": "Loans ₹10L-₹1Cr for SC/ST or Women entrepreneurs for greenfield projects.",
            "details": "The Stand-up India Scheme promotes entrepreneurship among Scheduled Castes/Scheduled Tribes and Women. Features: Composite Loan between Rs.10 lakh and Rs.1 crore to entrepreneurs above 18 years of age. For setting up greenfield projects in manufacturing, services or trading sector. Repayment in upto seven years.",
            "eligibility": ["entrepreneur", "sc", "st", "woman", "business"],
            "min_age": 18,
            "max_age": 100,
            "gender": "female" 
        },
        {
            "id": 7,
            "name": "Sukanya Samriddhi Yojana",
            "text": "girl child daughter future education marriage savings high interest tax benefit beti bachao beti padhao",
            "benefit": "High-interest savings scheme for the girl child.",
            "details": "A small deposit scheme for the girl child launched as a part of the 'Beti Bachao Beti Padhao' campaign. High interest rate (currently approx 8.2%). Parents can open account for girl child up to age 10. Maturity at age 21 or marriage after 18.",
            "eligibility": ["parent", "guardian"],
            "min_age": 0,
            "max_age": 10,
            "gender": "female" 
        }
    ]

    # 2. Construct User Profile Text
    # Convert profile attributes into a "Search Query" document
    user_text = f"{profile.occupation} {profile.gender} {profile.location}"
    if profile.age > 55: user_text += " old retirement senior"
    if profile.income < 250000: user_text += " low income assistance support"
    if profile.occupation.lower() in ["farmer", "agri"]: user_text += " agriculture kisan cultivation"

    # 3. Vectorization (Training the Model on-the-fly)
    # Corpus = User Text + All Scheme Texts
    corpus = [user_text] + [s['text'] for s in schemes_db]
    
    vectorizer = SimpleVectorizer()
    vectorizer.fit(corpus)
    vectors = vectorizer.transform(corpus)
    
    user_vector = vectors[0] # First vector is user
    scheme_vectors = vectors[1:] # Rest are schemes
    
    # 4. Compute Similarity Scores
    scored_schemes = []
    
    for i, scheme in enumerate(schemes_db):
        # Hard Filter: Eligibility Check first
        age = int(profile.age) if profile.age else 0
        if scheme.get('min_age') and age < scheme['min_age']: continue
        if scheme.get('max_age') and age > scheme['max_age']: continue
        if scheme.get('gender') != 'all' and scheme.get('gender') != profile.gender: continue
        
        # Calculate ML Score
        similarity_score = cosine_similarity(user_vector, scheme_vectors[i])
        
        # Scale score to 0-100 for UI
        final_score = int(similarity_score * 100)
        
        # Boost for exact matches (Heuristic overlay on ML)
        if profile.occupation.lower() in scheme['text']:
            final_score += 20
            
        final_score = min(final_score, 100) # Cap at 100
        
        if final_score > 10: # Threshold
            scored_schemes.append({
                "name": scheme['name'],
                "benefit": scheme['benefit'],
                "score": final_score,
                "tags": [w for w in scheme['text'].split() if w in user_text.split()][:3] # Explainable AI: Show matching keywords
            })

    # 5. Sort & Return
    scored_schemes.sort(key=lambda x: x['score'], reverse=True)
    
    if not scored_schemes:
        return [{
            "name": "General Savings Account",
            "benefit": "Standard banking facilities for everyone.",
            "score": 50,
            "tags": ["savings"]
        }]
        
    return scored_schemes
