import google.generativeai as genai
from flask import Flask,request,jsonify,render_template 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
genai.configure(api_key="AIzaSyCvKTX7Ty7CXbAXnV9IqaH7eRmlfmIBen8")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/study',methods=["POST"])
def myAI():
    user_query = request.json.get("query")
    if not user_query:
        return jsonify({"error":"Query is Reqd."}),400
    
    try:
        
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(user_query)
        
        return jsonify({"response":response.text}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
if __name__ == "__main__":
    app.run(debug=True)