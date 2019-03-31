Meet Garb
Garb is a waste management tool for groceries. By scanning their receipts each week, Garb users can cut down on their food waste and contribute to a sustainable, socially accountable future.

Features
Garb was built with React Native for both iOS and Android devices. It uses Optical Character Recognition (OCR) APIs to read text from images. To annotate food items, basic Natural Language Processing (NLP) tools were conceived and built into an API. Garb uses React Native's Async Storage systems to store data in between uses. Finally, Garb takes advantage of both user input and expiration date datasets to record waste usage, and display food waste amounts to the user.

Further Improvements
Garb represents images using a base-64 encoded string, and as such, the API takes a long time to process this data. Compression of this base-64 data into a more condensed format would speed up runtime considerably. Also, integration of the Natural Language Processing API into the system itself would speed up software further.

Credits
Garb was developed by Gideon Tong, Daisy Chen, Nora Zhou, and James Wang for LA Hacks 2019. Garb was submitted for the best sustainability hack, and the best use of the Google Cloud API.
