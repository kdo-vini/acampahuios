
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
      - F1: **Alergias**
      - G1: **Remédios**
      - H1: **Observações**

2.  **Abra o Apps Script (Código)**:
    - No menu, vá em: **Extensões** > **Apps Script**.

3.  **Cole o Código**:
    - Apague o código padrão (`function myFunction() {...}`) e cole isso:

    ```javascript
    function doPost(e) {
      try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        
        // Permite que o script receba dados como string, mesmo que venha como JSON
        var data = JSON.parse(e.postData.contents);
        
        var dateNow = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
        
        // Formata os campos adicionais
        var allergies = data.hasAllergy ? data.allergyDetails : "Não";
        var medicines = data.hasMedicine ? data.medicineDetails : "Não";
        var observations = data.observations || "-";

        sheet.appendRow([
          dateNow, 
          data.fullName, 
          data.cpf, 
          data.birthDate, 
          data.age,
          allergies,
          medicines,
          observations
        ]);
        
        return ContentService.createTextOutput(JSON.stringify({"result":"success", "data": data}))
          .setMimeType(ContentService.MimeType.JSON);
          
      } catch(error) {
        return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    ```

4.  **Implante o Script (IMPORTANTE: Atualizar Versão)**:
    - Se você já implantou antes, clique em **Gerenciar implantações** (Manage deployments).
    - Clique no ícone de lápis (Editar) ao lado da versão ativa.
    - Em "Versão", selecione **Nova versão**.
    - Clique em **Implantar**.
    - Copie a **URL do app da web**.
    - **Obs:** Se você apenas salvar o código sem criar uma NOVA VERSÃO na implantação, as mudanças NÃO funcionarão.

5.  **Copie a URL**:
    - Copie a **URL do app da web** gerada (algo como `https://script.google.com/macros/s/.../exec`).
    - **Me envie essa URL** logo abaixo (se ela mudou).

Assim que você atualizar o script e me mandar a URL (caso tenha mudado), eu finalizo a conexão! 🚀
