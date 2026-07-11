DEFY DESIGN — BEGINNER LAUNCH GUIDE

YOU DO NOT NEED A SEPARATE WEBSITE BUILDER.
GitHub Pages will host this website for free.
Namecheap controls the domain defydesign.store.

FILES IN THIS PACKAGE
- index.html
- styles.css
- script.js
- favicon.svg
- CNAME
- README-LAUNCH.txt

PART 1 — PUT THE WEBSITE ON GITHUB

1. Sign in to GitHub.
2. Click the + button in the upper-right corner.
3. Click "New repository."
4. Repository name: defydesign-website
5. Select "Public."
6. Click "Create repository."
7. On the next page, click "uploading an existing file."
8. Unzip this package on your computer.
9. Drag these files into GitHub:
   index.html
   styles.css
   script.js
   favicon.svg
   CNAME
10. Click "Commit changes."

PART 2 — TURN ON GITHUB PAGES

1. Open the repository.
2. Click Settings.
3. Click Pages in the left menu.
4. Under "Build and deployment":
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
5. Click Save.
6. In the Custom domain box, enter:
   defydesign.store
7. Click Save.

PART 3 — CONNECT NAMECHEAP

1. Sign in to Namecheap.
2. Open Domain List.
3. Click Manage beside defydesign.store.
4. Open Advanced DNS.
5. In Host Records, remove conflicting parking/redirect records.
6. Add these four A records:

Type: A Record | Host: @ | Value: 185.199.108.153 | TTL: Automatic
Type: A Record | Host: @ | Value: 185.199.109.153 | TTL: Automatic
Type: A Record | Host: @ | Value: 185.199.110.153 | TTL: Automatic
Type: A Record | Host: @ | Value: 185.199.111.153 | TTL: Automatic

7. Add this CNAME:

Type: CNAME Record
Host: www
Value: YOUR-GITHUB-USERNAME.github.io
TTL: Automatic

Replace YOUR-GITHUB-USERNAME with your exact GitHub username.

PART 4 — ENABLE SECURITY

After DNS finishes connecting:
1. Return to GitHub > repository > Settings > Pages.
2. Check "Enforce HTTPS" when it becomes available.

IMPORTANT ITEMS TO EDIT BEFORE SELLING

1. EMAIL
The current placeholder is:
orders@defydesign.store

Change it in index.html and script.js if you use a different address.

2. PRICING
The configurator contains placeholder prices in script.js:
50 cards: $129
100 cards: $189
250 cards: $389
500 cards: $679
1,000 cards: $1,199

Change these before treating the estimate as real pricing.

3. CONTACT FORM
The current form opens the customer's email app.
For direct web submissions, create a free Formspree account and replace the form action.

4. CHECKOUT
This version is quote-ready, not payment-ready.
GitHub Pages cannot securely store Stripe secret keys by itself.
A secure checkout can be added with Stripe Payment Links or a serverless backend.

HOW TO UPDATE THE WEBSITE LATER

1. Open the repository in GitHub.
2. Open the file you want to change.
3. Click the pencil icon.
4. Make the edit.
5. Click Commit changes.
The live website updates automatically.
