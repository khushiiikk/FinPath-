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
    schemes_db = [
        {
            "id": 1,
            "name": "PM Mudra Yojana (Shishu)",
            "text": "loans for shopkeepers artisans micro-entrepreneurs small business start new shop business loan 50000",
            "benefit": "Loans up to ₹50,000 for new businesses",
            "min_age": 18,
            "max_age": 60,
            "gender": "all"
        },
        {
            "id": 2,
            "name": "PM Mudra Yojana (Kishor)",
            "text": "loans for expansion business growth shopkeepers micro-entrepreneurs 5 lakhs loan funding",
            "benefit": "Loans ₹50k to ₹5 Lakhs for expanding businesses",
            "min_age": 21,
            "max_age": 60,
            "gender": "all"
        },
        {
            "id": 3,
            "name": "Atal Pension Yojana",
            "text": "pension retirement security old age monthly income laborers workers unorganized sector",
            "benefit": "Guaranteed pension after 60 years age",
            "min_age": 18,
            "max_age": 40,
            "gender": "all"
        },
        {
            "id": 4,
            "name": "Mahila Samman Savings Certificate",
            "text": "women female ladies savings high interest safe deposit girl child",
            "benefit": "7.5% interest specifically for women",
            "min_age": 0,
            "max_age": 100,
            "gender": "female"
        },
        {
            "id": 5,
            "name": "PM Kisan Samman Nidhi",
            "text": "farmers agriculture kisan land cultivation crops support money yearly assistance",
            "benefit": "₹6000/year support for farmers",
            "min_age": 18,
            "max_age": 100,
            "gender": "all"
        },
        {
            "id": 6,
            "name": "Stand Up India",
            "text": "women entrepreneur sc st scheduled caste tribe business loan 1 crore startup",
            "benefit": "Loans ₹10L-₹1Cr for SC/ST or Women entrepreneurs",
            "min_age": 18,
            "max_age": 65,
            "gender": "female"
        },
        {
            "id": 7,
            "name": "Sukanya Samriddhi Yojana",
            "text": "girl child daughter education marriage savings high interest future secure female",
            "benefit": "High interest savings for girl child education",
            "min_age": 0,
            "max_age": 100, # Parent applies
            "gender": "female" # For girl child
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
