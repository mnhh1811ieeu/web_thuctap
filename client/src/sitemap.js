const { SitemapStream, streamToPromise , SitemapAndIndexStream } = require('sitemap');
const fs = require('fs');
const axios = require('axios');
const path = require('path');  // Để xử lý đường dẫn

const hostname = 'https://web-bhm-store.netlify.app/';  // Sửa hostname nếu cần

const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD") // Chuyển ký tự Unicode có dấu thành không dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    .replace(/[^a-z0-9 -]/g, "") // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, "-") // Chuyển khoảng trắng thành dấu gạch ngang
    .replace(/-+/g, "-"); // Xóa các dấu gạch ngang thừa
};

async function fetchProductUrls() {
  try {
    // Gọi API lấy danh sách sản phẩm
    const response = await axios.get(`https://webbhm-server.onrender.com/api/products`);
    const products = response.data.products;

    // Chuyển sản phẩm thành danh sách URL
    return products?.map((product) => ({
      url: `/product/${slugify(product.name)}-${product.id}.html`,
      changefreq: 'daily',
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function fetchCategoryUrls() {
  try {
    // Gọi API lấy danh sách sản phẩm
    const response = await axios.get('https://webbhm-server.onrender.com/api/category');
    const category = response.data.categoryList;

    // Chuyển sản phẩm thành danh sách URL
    return category?.map((cat) => ({
      url: `/product/${slugify(cat.name)}/${cat.id}`,
      changefreq: 'daily',
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function generateProductSitemap() {
    // Lấy danh sách URL động
    const productUrls = await fetchCategoryUrls();
  
    // Tạo sitemap
    const sitemap = new SitemapStream({ hostname });
    productUrls.forEach((url) => sitemap.write(url));
    sitemap.end();
    
  
    // Ghi file XML
    const xmlData = await streamToPromise(sitemap);
    fs.writeFileSync('./public/sitemaps/products.xml', xmlData);
  }

  async function generateCategorySitemap() {
    // Lấy danh sách URL động
    const catUrls = await fetchCategoryUrls();
  
    // Tạo sitemap
    const sitemap = new SitemapStream({ hostname });
    catUrls.forEach((url) => sitemap.write(url));
    sitemap.end();
    
  
    // Ghi file XML
    const xmlData = await streamToPromise(sitemap);
    fs.writeFileSync('./public/sitemaps/categories.xml', xmlData);
  }

const generateSitemapIndex = async ()  => {
  const sitemapIndex = new SitemapStream({ hostname, xmlns: { sitemapindex: true }, // Bắt buộc để tạo <sitemapindex> 
    });

  const sitemaps = [
    {
      loc: `${hostname}/sitemaps/products.xml`,
      lastmod: new Date().toISOString().split('T')[0],
    },
    {
      loc: `${hostname}/sitemaps/categories.xml`,
      lastmod: new Date().toISOString().split('T')[0],
    },
  ];

  // Ghi các sitemap con vào sitemap index
  sitemaps.map( (sitemap) => {
    sitemapIndex.write(sitemap);
    console.log(sitemap)
  });

  sitemapIndex.end();

  try {
    const xmlData = await streamToPromise(sitemapIndex).then((data) => data.toString());;
    const indexDataWithXMLNS = xmlData.replace(
      '<sitemapindex>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    );
    console.log('Generated XML Data:', xmlData.toString()); // Debug
    fs.writeFileSync(path.join('./public/sitemaps', 'main-index.xml'), indexDataWithXMLNS);
    console.log('Sitemap index generated successfully.');
  } catch (error) {
    console.error('Error writing sitemap index:', error);
  }
}


async function generateSitemaps() {
  await generateProductSitemap();
  await generateCategorySitemap();
  //await generateSitemapIndex();
}

generateSitemaps();
