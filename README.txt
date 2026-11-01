UROLL U — WEBSITE STARTER
==========================

WHAT'S INCLUDED
- index.html: website layout and content
- style.css: responsive styling and theme
- app.js: search, category filters, level filters and pose detail popups with real yoga photography loaded from Unsplash
- poses.json: yoga pose library (30 pose entries, with online photo URLs)
- assets/favicon.svg: simple brand icon
- Real yoga/wellness photographs: loaded from Unsplash over the internet and displayed on pose cards and detail popups (not included as local image files)
- manifest.webmanifest: basic installable web-app metadata

REQUIREMENTS
- A modern browser (Chrome, Edge, Firefox or Safari).
- For editing: Visual Studio Code is recommended, but optional.
- No npm, Node.js, Java, database or paid software is required for this version.
- Internet connection is needed for Google Fonts, yoga photographs hosted by Unsplash and YouTube video searches. The pose photographs are online images, not bundled offline files.

HOW TO RUN ON WINDOWS
1. Extract the ZIP folder.
2. Open the extracted folder in Visual Studio Code (optional).
3. Open Terminal > New Terminal in VS Code.
4. Run this command:
      py -m http.server 8000
   If 'py' is not available, try:
      python -m http.server 8000
5. Open this address in your browser:
      http://localhost:8000
6. To stop the server, return to the terminal and press Ctrl + C.

IMPORTANT
Do not double-click index.html to run the website. The pose library is loaded from poses.json,
so run it through the local server above.

HOW TO PUT IT ONLINE AND MAKE YOUR QR CODE
1. Deploy the extracted folder to a static hosting service such as Netlify or Vercel.
2. Test the live URL on a phone using mobile data.
3. Generate a QR code that points to the permanent live URL.
4. Print the QR code with a clear white border/quiet zone and test it on the actual mat material.

VIDEO NOTE
The Watch demonstration button opens a YouTube search for the relevant pose. This avoids embedding
a potentially unavailable or unlicensed video. Choose and embed specific instructor videos only
after checking their quality, suitability and reuse/embedding settings.

CONTENT & SAFETY NOTE
This is an educational yoga guide, not medical advice. Benefits vary by person. The pose instructions
and precautions are general starting points; they do not replace in-person guidance. Practise within
a comfortable range and stop if there is pain, dizziness or unusual discomfort. People who are pregnant,
injured or managing a medical condition should consult a qualified professional about modifications.

CUSTOMISATION
- Edit poses.json to add, remove or update poses.
- Add new pose objects using the same field structure as the existing entries.
- Edit colours and layout in style.css.
- Update the brand name, copy and sections in index.html.
