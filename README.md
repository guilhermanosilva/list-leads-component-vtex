# Componente VTEX para listagem de Leads

## Descrição

Tabela contento a listagem de todos os leads cadastrados em uma API da AWS.
O componente faz a requisição no end-point da API e lista e usuários.
Há a opção de atualizar os dados do lead ou deletar por completo.

&nbsp;
## Como usar

* Clonar esse repositório
* Alterar o edpoint de sua API no arquivo **./react/services/api.tsx**
* Alterar as rotas nos arquivos **./react/ListLeades.tsx** e **./react/components/UpdateForm/index.tsx**
* Linkar em sua conta VTEX
* No arquivo ***manifest.json*** da sua loja inserir a dependência ***"hiringcoders202106.list-leads": "0.x"***
* Usar o bloco ***list-leads*** em qualquer lugar da sua loja

&nbsp;
## Como estilizar

É possível estilizar com ***CSSHANDLES***. Para isso é necessário criar um arquivo ***hiringcoders202106.list-leads.css*** na pasta ***ccs*** que fica dentro da pasta ***styles*** da sua loja.

&nbsp;
### CSSHANDLES

**Classes para estilizar a tabela**
* leadFormContainer
* leadForm
* leadInputContainer
* leadInputLabel
* leadInput
* leadButtonContainer
* leadButton
* leadSuccessMsg

&nbsp;

**Classes para estilizar o formulário de atualização**

  * modalContainer
  * updateLeadFormContainer
  * updateFormTitle
  * updateLeadForm
  * updateLeadInputContainer
  * updateLeadInputLabel
  * updateLeadInput
  * updateLeadButton
  * updateLeadButtonContainer
  * successUpdateMsg
