# Tractian FullStack Challenge

Este é o repositório do front-end do desafio para a Tractian. Se baseia em uma aplicação para fazer alguns registros e gerenciamento de dados. Irei descrever brevemente 
cada etapa da aplicação.
Foi desenvolvido com ReactJS + Typescript. Utilizei AntDesign, uma ferramenta completamente nova para mim, mas que gostei muito de ter aprendido e descoberto. 
Em próximas atualizações (pois desejo terminar esta aplicação pela grande afinidade que tive com o modelo e sistema rsrs) trabalharei com Highcharts, uma exigência da 
Tractian, mas que devido ao tempo, não consegui implementa-la. Mas será uma ótima oportunidade para aprender essa ferramenta, que no pouco que estudei sobre, é bem 
interessante para o desenvolvimento web.

O sistema inicia com a tela de login, onde eu escolhi usar as cores e design bem próximos ao do site da Tractian rsrs 👀. A aplicação da ao usuário a opção de logar com 
o Google, com uma conta já existente. Isso foi feito através da API chamada Google Login Button, que é livremente disponibilizado. Ou também realizar o login através de
uma conta criada no aplicativo.

## Login Page

![image](https://user-images.githubusercontent.com/78494604/208218606-951ded88-ddd6-4790-9b2a-cbb648309104.png)

## Home Screen
Ao entrar, podemos ver a tela principal, onde temos os usuários, unidades e usuarios. 

![image](https://user-images.githubusercontent.com/78494604/208218610-5080ad00-883d-4d3a-804d-01914c87cf31.png)

Para cada entidade, podemos buscar por nome, ou pelo atributo que está descrito no placeholder das barras de navegação das listas.

É possível visualizar as informações por unidades, filtrando no dropdown da navbar
na parte superior da página. Ao lado da imagem do usuário.

![image](https://user-images.githubusercontent.com/78494604/208219383-7037ab8f-82f2-4eb2-a3ed-8e1b63f1d540.png)

Ao selecionar a opção, o sistema filtra os registros para aqueles que correspondem somente a unidade específica.

![image](https://user-images.githubusercontent.com/78494604/208219424-3e2a36b0-e982-49b8-b3c3-41b55e118991.png)

A barra lateral conta com algumas opções de redirecionamento. Cada página é referente a uma entidade que, a principio, seria construido o CRUD. Então temos as companies,
units, users e assets. Sendo as units e users pertencentes a entidade de company, e assets pertencentes a units.

![image](https://user-images.githubusercontent.com/78494604/208219789-910e4154-9887-42f1-ada2-aba311252315.png)

## Company

Entrando na página de Companies, podemos ver a mensagem para selecionar uma compania. 

![image](https://user-images.githubusercontent.com/78494604/208219955-950f2edb-8c64-4284-b272-3a477de26187.png)

Ao clicar em editar, podemos ver as units e users respectivos à seleção.

![image](https://user-images.githubusercontent.com/78494604/208219981-a4b1170f-2675-420b-8ff7-751cd9bbde55.png)

É possível realizar a troca de companies entre as entidades. As informações de company relacionadas aos usuários e units só podem ser alteradas na página de companies.

![image](https://user-images.githubusercontent.com/78494604/208220043-153b7fe3-78a9-4272-baaa-6bc63f155bf8.png)

Utilizei o pacote SweetAlert para realizar o envio de pop ups para o usuário. 
Ao clicar na company de destino, uma mensagem aparece na tela do usuário confirmando a ação.

![image](https://user-images.githubusercontent.com/78494604/208220092-11f7447c-bb53-459d-9911-0cdf0bdfbad5.png)

Se tentarmos escolher a company em que o usuário já se encontra, a seguinte mensagem aparece na tela:

![image](https://user-images.githubusercontent.com/78494604/208220212-af8eebe8-368c-4346-8417-82b789528998.png)

Se quisermos cancelar a troca antes de clicar em alterar, o usuário também é notificado que nada foi alterado.

![image](https://user-images.githubusercontent.com/78494604/208220291-e901c902-d8cf-4a8d-95d4-89688f0bad18.png)

Se optarmos por realizar a troca de companies, essa é a mensagem que realiza o pop up na tela.

![image](https://user-images.githubusercontent.com/78494604/208220319-0252eccc-cde5-4451-a896-a58182b07cae.png)

É possível observar que apenas o admin está registrado na empresa Tractian.

![image](https://user-images.githubusercontent.com/78494604/208220346-583e781c-7a4e-4703-bce8-f181f46dd24a.png)

Agora está registrado na empresa Support.
![image](https://user-images.githubusercontent.com/78494604/208220364-b7646384-cac4-4b88-a0bc-580a46e6d514.png)

## Alteração de usuário

![image](https://user-images.githubusercontent.com/78494604/208220543-b4d8361e-b1b5-4010-8880-cbcfd03d3ada.png)






