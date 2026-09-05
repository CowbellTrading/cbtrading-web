const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/resources');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const resources = [
  'Plastic Raw Materials Overview',
  'Recycled Polymer Guide',
  'Packaging Solutions Brochure',
  'Machinery Representation Overview',
  'Supply Chain Consulting Guide',
  'Sustainability Commitment Statement',
];

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.

Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nunc nulla. Aenean vitae metus. Nunc tristique tempus lectus.`;

function generatePDF(title) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const filePath = path.join(outputDir, `${title}.pdf`);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Cover Page
    doc.fontSize(24).font('Helvetica-Bold').fillColor('#0D3B2E').text('Cowbell Keystone', { align: 'center' });
    doc.fontSize(16).font('Helvetica').fillColor('#0D3B2E').text('Trading Ireland Limited', { align: 'center' });
    doc.moveDown(4);

    doc.fontSize(32).font('Helvetica-Bold').fillColor('#333333').text(title, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(18).font('Helvetica-Oblique').fillColor('#666666').text('Sample Document', { align: 'center' });

    doc.moveDown(10);
    doc.fontSize(12).font('Helvetica').fillColor('#999999').text(`Generated on ${new Date().toLocaleDateString()}`, { align: 'center' });

    doc.addPage();

    // Content Page 1
    doc.fontSize(20).font('Helvetica-Bold').fillColor('#0D3B2E').text('1. Introduction', { underline: true });
    doc.moveDown(1);
    doc.fontSize(12).font('Helvetica').fillColor('#333333').text(loremIpsum, { align: 'justify' });
    doc.moveDown(2);

    doc.fontSize(20).font('Helvetica-Bold').fillColor('#0D3B2E').text('2. Market Overview', { underline: true });
    doc.moveDown(1);
    doc.fontSize(12).font('Helvetica').fillColor('#333333').text(loremIpsum, { align: 'justify' });

    doc.addPage();

    // Content Page 2
    doc.fontSize(20).font('Helvetica-Bold').fillColor('#0D3B2E').text('3. Key Specifications', { underline: true });
    doc.moveDown(1);
    doc.fontSize(12).font('Helvetica').fillColor('#333333').text(loremIpsum, { align: 'justify' });
    doc.moveDown(2);

    doc.fontSize(14).font('Helvetica-Bold').fillColor('#0D3B2E').text('Contact Information:');
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').fillColor('#333333').text('Cowbell Keystone Trading Ireland Limited\nEmail: info@cb-trading.ie\nWebsite: www.cb-trading.ie');

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
}

async function main() {
  console.log('Generating PDFs...');
  for (const title of resources) {
    const filePath = await generatePDF(title);
    console.log(`Generated: ${filePath}`);
  }
  console.log('All PDFs generated successfully.');
}

main().catch(console.error);
