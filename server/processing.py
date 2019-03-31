import re
from flask import Flask, request

#ingest = "" # Set input to a blank variable

# Sample text varialbe to ensure that the santiation of code works without the necessity of OCR.
#text = "BAKERY\nAN 9 GRAIN BREAD\n3.99\n*\nDELI\nND HONEY CURED HAM\nTOI TURKEY\n2.54\n7.06\n*\nGROCERY\nDAN BPK ACTVIA ST/BL\nEGGLND LG WHT EGG\n4.49\n3.59\n**\nMEAT\nANG TOP RD LND BRL\n5.49\n*\n*\n*\n*\nPRODUCE\nTOTE GALA APPLES\n4.80 lb @ 0.99/ lb\nBANANAS\n2.18 lb @ 0.39/ lb\nGREEN CUCUMBERS\n2 @ 2 FOR 1.00\nBULK GARLIC\nRED TOMATOES ON VINE\n1.33 lb @ 1.59/ 1b\nYELLOW ONIONS\n0.37 16 @ 1.49/ lb\nYELLOW ONIONS\n1.26 lb @ 1.49/ 1b\nGREEN BELL PEPPERS\n0.63 lb @ 1.49/ lb\n4.75\n0.85\n1.00\n0.49\n2.11\n0.55\n1.88\n0.94\n*\n*\n*\nSEAFOOD\nFRESH TILAPIA FILLET\nTOTAL TAX\n4.13\n0.00\n*\n16 BALANCE DUE\n43.86\nDebit Card\n43.86\\"

app = Flask(__name__)
@app.route('/', methods=['POST'])
def result():
    text = request.form.get('ocrtext')
    print("Data recieved from client: " + text)
    #text = re.search("description\": \"(.*?)\"", data)[0].strip("description\": \"")
    
    try:
        text = text.lower()
        text = re.compile("^(.*?)total",re.S).match(text)[0]
        text = text.strip("total").replace("\\n","")
        text_list = re.findall("(\w\w\w\w\w.*?)\d[\d,\., @]", text, re.S)
        return str(text_list)
    
    except Exception as e:
        print("An error occured in sanitation!")
        print(e)
        return "Error!"

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True, port=80)