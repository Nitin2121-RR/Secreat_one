# 🚀 Deployment Instructions for Vercel

## Before Deploying - Add Your Images! ⚠️

**IMPORTANT:** You need to add your two images to this folder first:
- Save your first image as `image1.jpg`
- Save your second image as `image2.jpg`

The images you uploaded in the chat need to be saved in this folder with these exact names.

---

## Option 1: Deploy Using Vercel CLI (Fastest) ⚡

### First Time Setup:
```powershell
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel (opens browser)
vercel login
```

### Deploy:
```powershell
# Navigate to this folder in PowerShell, then run:
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? (press Enter or type a name)
# - In which directory is your code located? ./
# - Want to override settings? No

# Your site will be deployed and you'll get a URL!
```

### Deploy to Production:
```powershell
vercel --prod
```

---

## Option 2: Deploy Using Vercel Website 🌐

### Method A - Direct Upload (Easiest):
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Scroll down and click **"Browse"** or drag this folder
4. Click **"Deploy"**
5. Wait for deployment (usually 30-60 seconds)
6. Get your live URL! 🎉

### Method B - Via GitHub (Recommended for Updates):
1. Create a new repository on [GitHub](https://github.com)
2. In PowerShell in this folder, run:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com)
4. Click **"Add New..."** → **"Project"**
5. Import your GitHub repository
6. Click **"Deploy"**

**Advantage:** Every time you push to GitHub, Vercel auto-deploys! 🔄

---

## Option 3: Test Locally First 🧪

Before deploying, test the website locally:

1. Make sure `image1.jpg` and `image2.jpg` are in this folder
2. Double-click `index.html` to open in your browser
3. Test the buttons and interactions
4. If everything works, proceed with deployment!

---

## After Deployment 🎊

You'll receive a URL like: `https://your-project-name.vercel.app`

### Share Your Link:
- The website is live and can be shared with anyone!
- It's hosted on Vercel's global CDN (super fast)
- Free HTTPS included
- Mobile responsive

### Making Updates:
- Edit your files locally
- If using CLI: run `vercel --prod` again
- If using GitHub: just push changes and Vercel auto-deploys

---

## Customization Ideas 💡

1. **Change Colors:** Edit `style.css` gradients
2. **Add More Images:** Add more gallery items in `index.html`
3. **Change Text:** Edit messages in `index.html`
4. **Add Music:** Add background music on "Yes" click
5. **Custom Domain:** Add your own domain in Vercel dashboard

---

## Troubleshooting 🔧

**Images not showing?**
- Make sure `image1.jpg` and `image2.jpg` are in the root folder
- Check the file names are exactly correct (case-sensitive)

**Deployment failed?**
- Ensure you have a Vercel account
- Check your internet connection
- Try the website upload method instead

**"No" button not moving on mobile?**
- It should work! Make sure you're testing on the deployed version

---

## Need Help? 💬

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

**Enjoy your romantic website! 💕✨**
