# 📸 How to Add Your Images

## Current Status
The website currently uses placeholder images from Unsplash. To show YOUR photos, follow these simple steps:

## Method 1: Replace Placeholder Images (Recommended)

### Step 1: Save Your Images
Save your two photos in this folder with these exact names:
- `image1.jpg` - Your first photo (the portrait)
- `image2.jpg` - Your second photo (the couple photo)

### Step 2: Update the HTML
Open `index.html` and find these lines (around line 57 and 65):

**Line 57** - Change from:
```html
<img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=1000&fit=crop" alt="Beautiful moments" class="gallery-img" onerror="...">
```

**To:**
```html
<img src="image1.jpg" alt="Beautiful moments" class="gallery-img">
```

**Line 65** - Change from:
```html
<img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1000&fit=crop" alt="Forever together" class="gallery-img" onerror="...">
```

**To:**
```html
<img src="image2.jpg" alt="Forever together" class="gallery-img">
```

### Step 3: Test
Open `index.html` in your browser - your images should now appear!

## Method 2: Quick Find & Replace

1. Open `index.html` in any text editor
2. Find: `https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=1000&fit=crop`
3. Replace with: `image1.jpg`
4. Find: `https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1000&fit=crop`
5. Replace with: `image2.jpg`
6. Save the file

## Troubleshooting

### Images not showing?
- ✅ Check that your images are named exactly `image1.jpg` and `image2.jpg`
- ✅ Make sure they're in the same folder as `index.html`
- ✅ Try using lowercase file extensions (.jpg not .JPG)
- ✅ If your images are .png or .jpeg, either:
  - Rename them to .jpg OR
  - Update the HTML to use the correct extension

### Images too large?
Don't worry! The CSS automatically handles sizing. But if you want faster loading:
- Resize images to around 800-1000px width before adding them
- Use online tools like TinyPNG to compress them

### Want different image names?
You can use any names! Just update the `src="..."` in the HTML to match your filenames.

## After Adding Your Images

Once your images are added:
1. Test locally by opening `index.html` in your browser
2. Deploy to Vercel using the instructions in `DEPLOY_INSTRUCTIONS.md`
3. Share your romantic website! 💕

---

**Note:** The placeholder images are from Unsplash and show automatically if your images aren't found. Once you add your real images, the placeholders will be replaced.
