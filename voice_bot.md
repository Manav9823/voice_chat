# 3 major steps for creating a voice bot

1. Use the Web Speech API’s SpeechRecognition interface to listen to the user’s voice.
2. Send the user’s message to a commercial natural-language-processing API as a text string.
3. Once API.AI returns the response text back, use the SpeechSynthesis interface to give it a synthetic voice.

# Results from recoganition API

e.results that return a object containing TRANSCRIPT and confidence 

1. transcript → The detected text (what you said).
2. confidence → How accurate the recognition is (0 to 1 scale).
3. The higher the confidence, the more accurate the transcript is.

# Important event listeners inside speech recoganition API

1. speechstart
2. result

# Used script tag to intialize socket instead of socket io client, easier as FE and BE are running on same origin
# FE and backend are running on the same origin no CORS issue



# DialogFlow workaround


1. Go to dialogFlow
2. Click on google project 
3. This will take you to console.google.cloud
4. Check whether dialog API is enabled or not, enable it 
5. Credentials ---> Service account 
6. Fill out all the necessary details that are required
7. Once created go on the keys section to get your json key 
