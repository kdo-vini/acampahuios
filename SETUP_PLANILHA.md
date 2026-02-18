
# 📋 INSTRUÇÕES: CONFIGURAR PLANILHA GOOGLE SHEETS

Para receber as inscrições diretamente na sua planilha com "Nome", "CPF", "Data de Nascimento" e "Idade", siga este passo a passo rápido:

1.  **Crie a Planilha**:
    - Vá para [Google Sheets](https://sheets.new).
    - Dê um nome para a planilha (ex: **Inscrições Acampamento**).
    - Na **linha 1**, preencha os cabeçalhos:
      - A1: **Data de Inscrição**
      - B1: **Nome Completo**
      - C1: **CPF**
      - D1: **Data de Nascimento**
      - E1: **Idade**

2.  **Abra o Apps Script (Código)**:
    - No menu, vá em: **Extensões** > **Apps Script**.

3.  **Cole o Código**:
    - Apague o código padrão (`function myFunction() {...}`) e cole isso:

    ```javascript
    function doPost(e) {
      try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var data = JSON.parse(e.postData.contents);
        
        var dateNow = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
        
        sheet.appendRow([dateNow, data.fullName, data.cpf, data.birthDate, data.age]);
        
        return ContentService.createTextOutput(JSON.stringify({"result":"success", "data": data}))
          .setMimeType(ContentService.MimeType.JSON);
          
      } catch(error) {
        return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    ```

4.  **Implante o Script**:
    - No topo direito, clique em **Implantar** (Deploy) > **Nova implantação** (New deployment).
    - Clique no ícone de engrenagem à esquerda de "Selecione o tipo" > **App da Web**.
    - Preencha:
      - **Descrição**: "API Inscrição"
      - **Executar como**: "Eu" (seu e-mail)
      - **Quem pode acessar**: **Qualquer pessoa** (IMPORTANTE! Para o site conseguir enviar).
    - Clique em **Implantar**.
    - Autorize o acesso (talvez apareça "App não verificado", clique em Avançado > Acessar (não seguro)).

5.  **Copie a URL**:
    - Copie a **URL do app da web** gerada (algo como `https://script.google.com/macros/s/.../exec`).
    - **Me envie essa URL** logo abaixo.

Assim que você me mandar a URL, eu finalizo a conexão! 🚀
