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
            "launched": "28 August 2014",
            "category": "Financial Inclusion / Banking Access",
            "about": "PMJDY aims to provide universal access to banking facilities by ensuring that every unbanked adult has a basic savings bank account. It focuses on financial literacy, access to credit, insurance, and pension services, especially in rural and semi-urban areas.",
            "target": "Unbanked adults (18+ years), Rural and semi-urban population",
            "min_age": 18,
            "max_age": 100,
            "gender": "all",
            "benefits": "Zero balance Basic Savings Bank Deposit (BSBD) account, RuPay debit card with ₹2 lakh accident insurance cover, Overdraft facility up to ₹10,000 (subject to eligibility), Direct Benefit Transfer (DBT) of government subsidies",
            "documents": "Aadhaar Card (preferred), Voter ID / PAN / Driving License / NREGA Card (any one), Passport-size photograph",
            "features": "No minimum balance required, Banking access via Bank Mitras / BCs in villages, Financial literacy programs",
            "text": "financial inclusion banking savings account zero balance insurance overdraft facility rupay debit card unbanked households social security poor rural women"
        },
        {
            "id": 2,
            "name": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
            "launched": "9 May 2015",
            "category": "Accident Insurance",
            "about": "PMSBY provides affordable personal accident insurance coverage to protect individuals and families from financial distress due to accidental death or disability.",
            "target": "Bank account holders",
            "min_age": 18,
            "max_age": 70,
            "gender": "all",
            "benefits": "₹2 lakh for accidental death or permanent total disability, ₹1 lakh for permanent partial disability. Premium: ₹20 per year (auto-debit from bank account)",
            "documents": "Aadhaar Card, Bank account details, Consent for auto-debit",
            "features": "One-year renewable policy, Simple claim process, Bank-linked enrollment",
            "text": "accident insurance disability death cover low premium risk coverage 20 rupees per year safety security"
        },
        {
            "id": 3,
            "name": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
            "launched": "9 May 2015",
            "category": "Life Insurance",
            "about": "PMJJBY provides low-cost life insurance coverage to ensure financial security for the family in case of death of the insured person due to any reason.",
            "target": "Bank account holders",
            "min_age": 18,
            "max_age": 50,
            "gender": "all",
            "benefits": "₹2 lakh life insurance cover (death due to any cause). Premium: ₹436 per year (auto-debit)",
            "documents": "Aadhaar Card, Bank account details, Consent for auto-debit",
            "features": "One-year renewable, Offered by LIC and other approved insurers",
            "text": "life insurance death cover term plan family security risk coverage 436 rupees per year"
        },
        {
            "id": 4,
            "name": "Atal Pension Yojana (APY)",
            "launched": "2015",
            "category": "Pension / Social Security",
            "about": "APY encourages workers in the unorganized sector to save for retirement by offering guaranteed monthly pension after the age of 60.",
            "target": "Workers in unorganized sector",
            "min_age": 18,
            "max_age": 40,
            "gender": "all",
            "benefits": "Guaranteed monthly pension after 60 years of age: ₹1,000 / ₹2,000 / ₹3,000 / ₹4,000 / ₹5,000 (based on contribution)",
            "documents": "Aadhaar Card, Bank account details, Mobile number",
            "features": "Government guarantees minimum pension, Minimum contribution period: 20 years, Voluntary exit allowed under conditions",
            "text": "pension retirement old age security monthly income unorganized sector workers laborers daily wage guarantee"
        },
        {
            "id": 5,
            "name": "Pradhan Mantri MUDRA Yojana (PMMY)",
            "launched": "8 April 2015",
            "category": "Business Loan / Credit",
            "about": "PMMY provides collateral-free loans to micro and small enterprises to promote entrepreneurship, especially in rural and semi-urban areas.",
            "target": "Micro-entrepreneurs, Small business owners, Self-employed individuals",
            "min_age": 18,
            "max_age": 65,
            "gender": "all",
            "benefits": "Shishu: Up to ₹50,000, Kishore: ₹50,001 – ₹5 lakh, Tarun: ₹5 lakh – ₹10 lakh, Tarun Plus: ₹10 lakh – ₹20 lakh",
            "documents": "Aadhaar Card, PAN Card, Business proof / simple project report, Bank account details",
            "features": "No collateral required, Covers non-agricultural & allied activities, Loans via banks, NBFCs, MFIs",
            "text": "business loan startup entrepreneur small enterprise shopkeeper artisan weaver shishu kishore tarun collateral free credit msme manufacturing trading services"
        },
        {
            "id": 6,
            "name": "Stand Up India Scheme (SUPI)",
            "launched": "5 April 2016",
            "category": "Entrepreneurship Promotion",
            "about": "SUPI promotes entrepreneurship among Women, SC & ST communities by providing financial support for greenfield enterprises.",
            "target": "Women entrepreneurs, SC/ST entrepreneurs",
            "min_age": 18,
            "max_age": 100,
            "gender": "all",
            "benefits": "Composite loan from ₹10 lakh to ₹1 crore (Upcoming: up to ₹2 crore for first-time women/SC/ST entrepreneurs)",
            "documents": "Aadhaar Card, PAN Card, Caste certificate (for SC/ST), Business plan / project report, Bank account details",
            "features": "Repayment up to 7 years, Moratorium period: 18 months, Online guidance via standupmitra.in and jansamarth.in",
            "text": "entrepreneurship sc st women business loan greenfield project manufacturing services trading startup scheduled caste tribe bank loan 10 lakh to 1 crore"
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
                "launched": scheme.get('launched'),
                "category": scheme.get('category'),
                "about": scheme.get('about'),
                "target": scheme.get('target'),
                "benefits": scheme.get('benefits'),
                "documents": scheme.get('documents'),
                "features": scheme.get('features'),
                "matchScore": final_score,
                "tags": [w for w in scheme['text'].split() if w in user_text.split()][:3]
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
