const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

// Using placeholder images from a reliable source
const images = [
  {
    name: 'filipiniana-dress.jpg',
    url: 'https://placehold.co/600x800/e9d5ca/703f37/png?text=Filipiniana+Dress'
  },
  {
    name: 'barong-slim.jpg',
    url: 'https://placehold.co/600x800/f5f5f5/333333/png?text=Barong+Tagalog'
  },
  {
    name: 'malong-skirt.jpg',
    url: 'https://placehold.co/600x800/b33771/ffffff/png?text=Malong+Skirt'
  },
  {
    name: 'inabel-blazer.jpg',
    url: 'https://placehold.co/600x800/2c3e50/ecf0f1/png?text=Inabel+Blazer'
  },
  {
    name: 'tnalak-tote.jpg',
    url: 'https://placehold.co/600x800/34495e/f1c40f/png?text=Tnalak+Tote'
  },
  {
    name: 'pina-gown.jpg',
    url: 'https://placehold.co/600x800/d1aa96/ffffff/png?text=Pina+Gown'
  },
  {
    name: 'abaca-sandals.jpg',
    url: 'https://placehold.co/600x800/8b7355/ffffff/png?text=Abaca+Sandals'
  },
  {
    name: 'mindanao-clutch.jpg',
    url: 'https://placehold.co/600x800/c0392b/f1c40f/png?text=Mindanao+Clutch'
  }
];

async function downloadAllImages() {
  const productsDir = path.join(process.cwd(), 'public', 'products');
  
  // Create the products directory if it doesn't exist
  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
  }

  for (const image of images) {
    const filepath = path.join(productsDir, image.name);
    try {
      await downloadImage(image.url, filepath);
      console.log(`Downloaded ${image.name}`);
    } catch (err) {
      console.error(`Error downloading ${image.name}:`, err.message);
    }
  }
}

downloadAllImages(); 