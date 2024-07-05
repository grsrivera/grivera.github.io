# Personal Photography Website
by G Rivera

## Intro
Link to website: https://grsrivera.github.io/

This website is a place for me to share my photography with friends and family. Photography is a hobby of mine, but without social media, I haven't had a place to share my photos until now. This repository can also be used as a template by anyone who wants to create their own website for their photos. In the following sections, you'll see a description of the website and then a how-to for anyone who wants to use the code.

## Description
Along with the home page, this website features pages with two different presentation formats: a captioned photo set (I'll refer to them as photo sets in the remainder of this write-up) and a photo gallery. I like to make photo sets documenting my travels. Generally, I'll pick about 15 photos that tell the story and write a few sentences per photo. I realized that by keeping the captioned photo sets concise, I leave out pictures that I like but may not be necessary to tell the story. I decided on the photo gallery format to share these–it's only pictures with no words.

**Home Page**:<br>The home page has a header, introductory section, and section for links to the photos. The header has a profile picture and my name. The introduction is a greeting with a quote about creativity by Shel Silverstein (R.I.P.). Each link in the final section is a photo from that particular photo set or gallery. Regarding the interface, the images will get box shadowing for a "pop out" effect and the name of the page it links to will be displayed. When users click on a link, the image will gray out, indicating it has been viewed. The layout of the links is responsive and will change based on the user's screen size or viewport dimensions.


**Photo Sets and Galleries**:<br>Both types are styled with CSS and include interactive controls made through JavaScript. The CSS and JS codes are universal– in other words, the photographer only has to edit the HTML, and the CSS and JS will automatically format the HTML regardless of the number of photos in the photo set or gallery. You'll notice that there is only an index.html file and photos in the folders for the pages. All of those files are linked to the same template.css and template.js files. I tried to keep it as hands-off as possible to make it quick for me to add new photos as well as easy for anyone who wants to use the code to build their website.

<div style="margin-left: 20px;">
<b>Photo Sets:</b><br>
Example: https://grsrivera.github.io/Antarctica_Photo_Set/
<br>These feature photos with captions. Below the slides is a set of dynamic radio buttons that move as the user clicks through the photo set. I took inspiration for these from the photo sliders on Reddit. In addition to the radio buttons are arrow buttons. If on mobile, the user can swipe left or right through the slides.
</div>    
<br>

<div style="margin-left: 20px;">
<b>Photo Gallery:</b><br>
Example: https://grsrivera.github.io/SA_2023_Gallery/ <br>These feature only pictures. When the user opens the page, all pictures will be presented. If the user clicks on a picture, the full image will display in a light box. In addition, that picture will gray out, indicating it has been viewed already. The light box has arrow buttons so the user can click through the gallery without returning to the main gallery.
</div>    

## How-to
To start, clone at least the following folders and files:<br>
1. index.html (in the root)
2. homepageStyles.css
3. homepageScript.js
4. Folder 0_html_Template
5. Folder 0_Gallery_Template
6. Folder 0_Photo_Set_Template

I recommend creating the photo set and gallery pages first. Create a new folder in the root, like "Amazon_Photo_Set" and copy the corresponding HTML template file from "0_html_Template" into it. Add your photos to that same folder. Open the HTML file and edit the applicable sections, annotated with square brackets. The CSS and JS files don't have to be modified at all. You'll notice that the HTML templates are already linked to the corresponding CSS and JS files.

Once you are satisfied with your photo sets and galleries, you can move to the home page. Open the root index.html and edit the applicable sections. If you would like to use a circular profile picture like mine, I used this site to crop out my face: https://iphonecrop.com/. The HTML will already be linked to its corresponding CSS and JS files, so no need to touch those either.

## Contact
Thanks for reading this. If you have issues or questions, please reach out at gerald.rivera@gmail.com
