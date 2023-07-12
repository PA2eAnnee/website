function generateCertificate(nom, prenom) {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Export PDF Template</title>
          <style>
              @import url('https://fonts.googleapis.com/css?family=Open+Sans|Pinyon+Script|Rochester');
  
              /* Le reste du code CSS ici */
          </style>
      </head>
      <body>
          <div class="container">
              <div class="container pm-certificate-container">
                  <!-- Le reste du code HTML ici -->
  
                  <div class="pm-certificate-block">
                      <div class="col-xs-12">
                        <div class="row">
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                          <div class="pm-certificate-name underline margin-0 col-xs-8 text-center">
                            <span class="pm-name-text bold">${nom} ${prenom}</span>
                          </div>
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                        </div>
                      </div>
                      
                      <!-- Le reste du code HTML ici -->
                  </div>
  
                  <!-- Le reste du code HTML ici -->
  
              </div>
          </div>
      </body>
      </html>
    `;
  
    return htmlTemplate;
  }
  
  function generatePDF(html) {
    const element = document.createElement('div');
    element.innerHTML = html;
  
    html2pdf()
      .set({ filename: 'certificate.pdf', margin: [20, 20, 20, 20] })
      .from(element)
      .save();
  }
  
  const nom = 'Elliot';
  const prenom = 'Janin';
  
  const generatedHTML = generateCertificate(nom, prenom);
  generate
  